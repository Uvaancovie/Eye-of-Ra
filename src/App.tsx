/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SymbolId,
  SpinResult,
  JackpotPool,
  PlayerProfile,
  DailyQuest,
  AnalyticsData,
  AppNotification,
} from './types';
import { TRANSLATIONS } from './data/localization';
import { HOLIDAY_EVENTS } from './data/holidayEvents';
import {
  generateInitialGrid,
  evaluateSpin,
  getRandomSymbol,
} from './utils/slotMath';
import {
  loadPlayerProfile,
  savePlayerProfile,
  loadJackpots,
  saveJackpots,
  loadQuests,
  saveQuests,
  loadAnalytics,
  saveAnalytics,
  loadNotifications,
  saveNotifications,
  INITIAL_JACKPOTS,
} from './utils/storage';
import { sound } from './utils/audio';

// Components
import { Header } from './components/Header';
import { JackpotBar } from './components/JackpotBar';
import { HolidayEventBanner } from './components/HolidayEventBanner';
import { FreeSpinsOverlay } from './components/FreeSpinsOverlay';
import { SlotMachine } from './components/SlotMachine';
import { PharaohRaBanner } from './components/PharaohRaBanner';
import { RaSideCharacter } from './components/RaSideCharacter';
import { AnubisSideCharacter } from './components/AnubisSideCharacter';
import { CleopatraSideCharacter } from './components/CleopatraSideCharacter';
import { BonusTombModal } from './components/BonusTombModal';
import { WheelOfRaModal } from './components/WheelOfRaModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { DailyRewardsModal } from './components/DailyRewardsModal';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { SocialShareModal } from './components/SocialShareModal';
import { AuthAndProfileModal } from './components/AuthAndProfileModal';
import { NotificationCenter } from './components/NotificationCenter';
import { PaytableModal } from './components/PaytableModal';
import { DeityThemeCarousel, DeityThemeId, DEITY_THEMES } from './components/DeityThemeCarousel';

import confetti from 'canvas-confetti';

export default function App() {
  // 1. Core Persistent State
  const [profile, setProfile] = useState<PlayerProfile>(() => loadPlayerProfile());
  const [activeDeityTheme, setActiveDeityTheme] = useState<DeityThemeId>('ra_solar');
  const [jackpots, setJackpots] = useState<JackpotPool>(() => loadJackpots());
  const [quests, setQuests] = useState<DailyQuest[]>(() => loadQuests());
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => loadAnalytics());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => loadNotifications());

  // 2. Active Slot Game State
  const [grid, setGrid] = useState<SymbolId[][]>(() => generateInitialGrid());
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningReels, setSpinningReels] = useState<boolean[]>([false, false, false, false, false]);
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);

  // Wagering
  const [betPerLine, setBetPerLine] = useState<number>(10);
  const [activeLines, setActiveLines] = useState<number>(20);
  const totalBet = betPerLine * activeLines;

  // Autoplay & Turbo
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplayCount, setAutoplayCount] = useState<number>(10);
  const [turboMode, setTurboMode] = useState<boolean>(profile.turboMode || false);

  // Free Spins Mode
  const [isFreeSpins, setIsFreeSpins] = useState(false);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(0);
  const [totalFreeSpinsAwarded, setTotalFreeSpinsAwarded] = useState(0);
  const [freeSpinsMultiplier, setFreeSpinsMultiplier] = useState(1);
  const [accumulatedFreeSpinsWin, setAccumulatedFreeSpinsWin] = useState(0);
  const [chosenExpandingSymbol, setChosenExpandingSymbol] = useState<SymbolId | null>(null);

  // Modals & UI Viewers
  const [isBonusTombOpen, setIsBonusTombOpen] = useState(false);
  const [isWheelOfRaOpen, setIsWheelOfRaOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDailyRewardsOpen, setIsDailyRewardsOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isPaytableOpen, setIsPaytableOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [socialShareData, setSocialShareData] = useState<{ open: boolean; win: number; mult: number }>({
    open: false,
    win: 0,
    mult: 0,
  });

  // Offline / Network State
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [hasClaimedToday, setHasClaimedToday] = useState(false);

  // Active Holiday Event
  const currentHolidayEvent = HOLIDAY_EVENTS[0];

  // Translations
  const t = TRANSLATIONS[profile.language] || TRANSLATIONS.en;
  const isRTL = profile.language === 'ar';

  // Sync sound & music engine with player profile preferences
  useEffect(() => {
    sound.setSoundEnabled(profile.soundEnabled);
    sound.setMusicEnabled(profile.musicEnabled);
  }, [profile.soundEnabled, profile.musicEnabled]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync state to local storage on changes
  useEffect(() => {
    savePlayerProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveJackpots(jackpots);
  }, [jackpots]);

  useEffect(() => {
    saveQuests(quests);
  }, [quests]);

  useEffect(() => {
    saveAnalytics(analytics);
  }, [analytics]);

  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  // 3. Main Spin Execution Handler
  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    if (!isFreeSpins && profile.balance < totalBet) {
      // Prompt low balance warning / free demo reload
      alert('Your balance is low! We have granted you +25,000 Demo Gold to keep spinning.');
      setProfile((prev) => ({ ...prev, balance: prev.balance + 25000 }));
      return;
    }

    setIsSpinning(true);
    sound.playSpinStart();

    // Deduct bet if regular spin
    if (!isFreeSpins) {
      setProfile((prev) => ({
        ...prev,
        balance: prev.balance - totalBet,
        totalWagered: prev.totalWagered + totalBet,
        totalSpins: prev.totalSpins + 1,
        vipPoints: prev.vipPoints + Math.round(totalBet / 50),
      }));
    }

    // Set all 5 reels to spinning state
    setSpinningReels([true, true, true, true, true]);

    // Animate temporary rolling reel symbols
    const spinInterval = setInterval(() => {
      setGrid((prev) =>
        prev.map((col) => [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()])
      );
      sound.playReelTick();
    }, turboMode ? 50 : 80);

    // Evaluate outcome mathematically
    const { result, newJackpotPool } = evaluateSpin({
      betPerLine,
      activeLines,
      isFreeSpins,
      freeSpinsMultiplier: isFreeSpins ? freeSpinsMultiplier : 1,
      expandingSymbol: isFreeSpins ? chosenExpandingSymbol : null,
      jackpotPool: jackpots,
      eventMultiplierBoost: currentHolidayEvent.multiplierBoost,
      eventBonusBoost: currentHolidayEvent.bonusChanceBoost,
    });

    setJackpots(newJackpotPool);

    // Calculate staggered stop delay for each reel
    const baseDelay = turboMode ? 400 : 800;
    const reelStagger = turboMode ? 150 : 300;

    // Stop reels one by one
    for (let c = 0; c < 5; c++) {
      setTimeout(() => {
        setSpinningReels((prev) => {
          const next = [...prev];
          next[c] = false;
          return next;
        });
        sound.playReelStop(c);
      }, baseDelay + c * reelStagger);
    }

    // Final reel stop & payout processing
    const totalSpinTime = baseDelay + 4 * reelStagger + 100;
    setTimeout(() => {
      clearInterval(spinInterval);
      setGrid(result.grid);
      setIsSpinning(false);
      setLastResult(result);

      // Handle Wins
      if (result.totalWin > 0) {
        sound.playLineWin();
        const mult = result.totalWin / totalBet;

        if (mult >= 20 || result.jackpotTriggered) {
          sound.playBigWin();
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
          });
        }

        if (result.jackpotTriggered) {
          sound.playJackpotChime();
        }

        // Update profile stats & balance
        setProfile((prev) => {
          const newBal = prev.balance + result.totalWin;
          const newWon = prev.totalWon + result.totalWin;
          const newBiggestWin = Math.max(prev.biggestWin, result.totalWin);
          const newBiggestMult = Math.max(prev.biggestMultiplier, mult);
          const newJackpotsHit = result.jackpotTriggered ? prev.jackpotsHit + 1 : prev.jackpotsHit;

          return {
            ...prev,
            balance: newBal,
            totalWon: newWon,
            biggestWin: newBiggestWin,
            biggestMultiplier: newBiggestMult,
            jackpotsHit: newJackpotsHit,
          };
        });

        // If in Free Spins, escalate multiplier!
        if (isFreeSpins) {
          setAccumulatedFreeSpinsWin((prev) => prev + result.totalWin);
          setFreeSpinsMultiplier((prev) => Math.min(25, prev + 1));
        }
      }

      // Update Daily Quests progress
      setQuests((prev) =>
        prev.map((q) => {
          let add = 0;
          if (q.id === 'q_spin_50' || q.id === 'event_q1') add = 1;
          if (q.id === 'q_win_10x' && result.totalWin >= totalBet * 10) add = 1;
          if (q.id === 'q_eye_wild') {
            const wildCount = result.lineWins.filter((w) => w.isWildEnhanced).length;
            add = wildCount;
          }
          if (q.id === 'q_tomb_bonus' && (result.bonusTriggered || result.freeSpinsTriggered)) {
            add = 1;
          }
          const current = q.current + add;
          return {
            ...q,
            current,
            completed: current >= q.target,
          };
        })
      );

      // Record Analytics telemetry
      setAnalytics((prev) => ({
        ...prev,
        spinHistory: [
          {
            id: 'spin_' + Date.now(),
            timestamp: Date.now(),
            bet: totalBet,
            win: result.totalWin,
            multiplier: totalBet > 0 ? result.totalWin / totalBet : 0,
            type: result.jackpotTriggered
              ? 'jackpot'
              : result.bonusTriggered
              ? 'bonus'
              : isFreeSpins
              ? 'free_spins'
              : 'normal',
          },
          ...prev.spinHistory.slice(0, 49),
        ],
      }));

      // Trigger Bonus Chamber
      if (result.bonusTriggered) {
        sound.playBonusTrigger();
        setProfile((prev) => ({ ...prev, bonusGamesPlayed: prev.bonusGamesPlayed + 1 }));
        setTimeout(() => setIsBonusTombOpen(true), 1200);
      }

      // Trigger Free Spins
      if (result.freeSpinsTriggered && !isFreeSpins) {
        sound.playBonusTrigger();
        const awarded = result.freeSpinsAwarded;
        setIsFreeSpins(true);
        setFreeSpinsLeft(awarded);
        setTotalFreeSpinsAwarded(awarded);
        setFreeSpinsMultiplier(2);
        setAccumulatedFreeSpinsWin(result.totalWin);
        setChosenExpandingSymbol('pharaoh_mask');
        setProfile((prev) => ({ ...prev, freeSpinsTriggered: prev.freeSpinsTriggered + 1 }));
      }
    }, totalSpinTime);
  }, [
    isSpinning,
    isFreeSpins,
    profile.balance,
    totalBet,
    betPerLine,
    activeLines,
    turboMode,
    freeSpinsMultiplier,
    chosenExpandingSymbol,
    jackpots,
    currentHolidayEvent,
  ]);

  // Handle Free Spins chain
  useEffect(() => {
    if (isFreeSpins && !isSpinning && freeSpinsLeft > 0) {
      const timer = setTimeout(() => {
        setFreeSpinsLeft((prev) => prev - 1);
        handleSpin();
      }, turboMode ? 1000 : 2000);
      return () => clearTimeout(timer);
    } else if (isFreeSpins && !isSpinning && freeSpinsLeft === 0) {
      // Free Spins Finished!
      setIsFreeSpins(false);
      sound.playBigWin();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  }, [isFreeSpins, isSpinning, freeSpinsLeft, handleSpin, turboMode]);

  // Autoplay loop
  useEffect(() => {
    if (isAutoplay && !isSpinning && !isFreeSpins && autoplayCount > 0) {
      const timer = setTimeout(() => {
        setAutoplayCount((prev) => {
          const next = prev - 1;
          if (next <= 0) setIsAutoplay(false);
          return next;
        });
        handleSpin();
      }, turboMode ? 600 : 1200);
      return () => clearTimeout(timer);
    }
  }, [isAutoplay, isSpinning, isFreeSpins, autoplayCount, handleSpin, turboMode]);

  // Handlers for settings & controls
  const handleToggleAutoplay = () => {
    if (isAutoplay) {
      setIsAutoplay(false);
    } else {
      setAutoplayCount(25);
      setIsAutoplay(true);
    }
  };

  const handleToggleTurbo = () => {
    const next = !turboMode;
    setTurboMode(next);
    setProfile((prev) => ({ ...prev, turboMode: next }));
  };

  const handleChangeBetPerLine = (delta: number) => {
    setBetPerLine((prev) => Math.max(5, Math.min(500, prev + delta)));
  };

  const handleChangeActiveLines = (lines: number) => {
    setActiveLines(lines);
  };

  const handleMaxBet = () => {
    setBetPerLine(250);
    setActiveLines(20);
  };

  const handleToggleSound = () => {
    const next = !profile.soundEnabled;
    setProfile((prev) => ({ ...prev, soundEnabled: next }));
  };

  const handleToggleMusic = () => {
    const next = !profile.musicEnabled;
    setProfile((prev) => ({ ...prev, musicEnabled: next }));
  };

  const handleCompleteBonusTomb = (bonusWin: number) => {
    setIsBonusTombOpen(false);
    setProfile((prev) => ({
      ...prev,
      balance: prev.balance + bonusWin,
      totalWon: prev.totalWon + bonusWin,
      biggestWin: Math.max(prev.biggestWin, bonusWin),
    }));
  };

  const handleAwardWheelPrize = (winAmount: number, label: string) => {
    setProfile((prev) => ({
      ...prev,
      balance: prev.balance + winAmount,
      totalWon: prev.totalWon + winAmount,
    }));
  };

  const handleClaimDailyStreak = (day: number, coins: number) => {
    setHasClaimedToday(true);
    setProfile((prev) => ({
      ...prev,
      balance: prev.balance + coins,
      loginStreak: prev.loginStreak + 1,
    }));
  };

  const handleClaimQuest = (questId: string, rewardCoins: number, rewardVip: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q))
    );
    setProfile((prev) => ({
      ...prev,
      balance: prev.balance + rewardCoins,
      vipPoints: prev.vipPoints + rewardVip,
    }));
  };

  const handleRequestPushPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        new Notification("Eye of Ra: Pharaoh's Gold", {
          body: 'Push notifications enabled! You will be alerted for jackpot surges & daily gifts.',
        });
      }
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Theme styling based on active deity theme selection and player preference
  const dynamicBackgroundStyle = {
    backgroundImage:
      activeDeityTheme === 'ra_solar'
        ? `radial-gradient(circle at 50% 12%, rgba(245, 158, 11, 0.30) 0%, rgba(10, 7, 2, 0.98) 75%), radial-gradient(circle at 15% 85%, rgba(217, 119, 6, 0.35) 0%, transparent 60%)`
        : activeDeityTheme === 'anubis_crypt'
        ? `radial-gradient(circle at 50% 12%, rgba(168, 85, 247, 0.28) 0%, rgba(8, 3, 14, 0.98) 75%), radial-gradient(circle at 85% 85%, rgba(6, 182, 212, 0.28) 0%, transparent 60%)`
        : activeDeityTheme === 'cleopatra_nile'
        ? `radial-gradient(circle at 50% 12%, rgba(16, 185, 129, 0.28) 0%, rgba(3, 15, 11, 0.98) 75%), radial-gradient(circle at 20% 85%, rgba(6, 182, 212, 0.28) 0%, transparent 60%), radial-gradient(circle at 80% 85%, rgba(245, 158, 11, 0.22) 0%, transparent 60%)`
        : `radial-gradient(circle at 50% 25%, rgba(6, 182, 212, 0.18) 0%, rgba(4, 7, 12, 0.98) 80%)`,
  };

  return (
    <div
      id="app-root-container"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={dynamicBackgroundStyle}
      className={`min-h-screen bg-[#070609] text-[#f4e4bc] flex flex-col justify-between transition-all duration-700 relative overflow-x-hidden`}
    >
      {/* Top Navigation Header */}
      <Header
        profile={profile}
        notifications={notifications}
        isOffline={isOffline}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenDailyRewards={() => setIsDailyRewardsOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenPaytable={() => setIsPaytableOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onToggleSound={handleToggleSound}
        onToggleMusic={handleToggleMusic}
        hasUnclaimedDaily={!hasClaimedToday}
      />

      {/* Main Game Stage */}
      <main className="flex-1 w-full px-2 sm:px-4 py-2 sm:py-3 flex flex-col items-center justify-center max-w-[1920px] mx-auto">
        {/* Top Header: PHARAOH RA'S RICHES Title & FREE SPINS Golden Pyramid */}
        <PharaohRaBanner
          freeSpinsRemaining={freeSpinsLeft}
          isFreeSpins={isFreeSpins}
          isSpinning={isSpinning}
          lastWinAmount={lastResult?.totalWin || 0}
          customAvatarUrl={profile.customAvatarUrl}
          onOpenFreeSpinsInfo={() => setIsPaytableOpen(true)}
        />

        {/* 4-Tier Progressive Jackpot Ticker */}
        <div className="w-full max-w-6xl my-1">
          <JackpotBar
            jackpots={jackpots}
            onJackpotClick={() => setIsPaytableOpen(true)}
          />
        </div>

        {/* Deity / Character Realm Carousel */}
        <DeityThemeCarousel
          currentTheme={activeDeityTheme}
          onSelectTheme={(newTheme) => setActiveDeityTheme(newTheme)}
        />

        {/* Holiday Event Banner */}
        <div className="w-full max-w-6xl">
          <HolidayEventBanner
            event={currentHolidayEvent}
            onOpenQuests={() => setIsDailyRewardsOpen(true)}
          />
        </div>

        {/* Free Spins Escalating Multiplier Overlay */}
        {isFreeSpins && (
          <FreeSpinsOverlay
            currentSpin={totalFreeSpinsAwarded - freeSpinsLeft + 1}
            totalSpins={totalFreeSpinsAwarded}
            multiplier={freeSpinsMultiplier}
            accumulatedWin={accumulatedFreeSpinsWin}
            expandingSymbol={chosenExpandingSymbol}
          />
        )}

        {/* MAIN TEMPLE STAGE: CHOSEN CHARACTER (RA, ANUBIS, OR CLEOPATRA) + 5-REEL SLOT MACHINE */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 my-2 max-w-[1920px] px-1 sm:px-4">
          {/* Active Companion Character */}
          {activeDeityTheme !== 'solo_slot' && (
            <div className="order-2 lg:order-1 flex-shrink-0 flex items-center justify-center transition-all duration-500">
              {activeDeityTheme === 'ra_solar' && (
                <RaSideCharacter
                  isSpinning={isSpinning}
                  winAmount={lastResult?.totalWin || 0}
                  isFreeSpins={isFreeSpins}
                />
              )}
              {activeDeityTheme === 'anubis_crypt' && (
                <AnubisSideCharacter
                  isSpinning={isSpinning}
                  winAmount={lastResult?.totalWin || 0}
                  isFreeSpins={isFreeSpins}
                />
              )}
              {activeDeityTheme === 'cleopatra_nile' && (
                <CleopatraSideCharacter
                  isSpinning={isSpinning}
                  winAmount={lastResult?.totalWin || 0}
                  isFreeSpins={isFreeSpins}
                />
              )}
            </div>
          )}

          {/* Primary 5-Reel Slot Machine (Enlarged, Spacious & Comfortable) */}
          <div className="order-1 lg:order-2 flex-1 w-full max-w-5xl xl:max-w-6xl flex flex-col items-center">
            <SlotMachine
              grid={grid}
              isSpinning={isSpinning}
              spinningReels={spinningReels}
              lastResult={lastResult}
              betPerLine={betPerLine}
              activeLines={activeLines}
              totalBet={totalBet}
              balance={profile.balance}
              turboMode={turboMode}
              isAutoplay={isAutoplay}
              autoplayCount={autoplayCount}
              isFreeSpins={isFreeSpins}
              onSpin={handleSpin}
              onToggleAutoplay={handleToggleAutoplay}
              onToggleTurbo={handleToggleTurbo}
              onChangeBetPerLine={handleChangeBetPerLine}
              onChangeActiveLines={handleChangeActiveLines}
              onMaxBet={handleMaxBet}
              onOpenSocialShare={(win, mult) =>
                setSocialShareData({ open: true, win, mult })
              }
              onOpenWheelOfRa={() => setIsWheelOfRaOpen(true)}
              onOpenPaytable={() => setIsPaytableOpen(true)}
              languageStrings={t}
            />
          </div>
        </div>
      </main>

      {/* Footer / Responsible Gaming info */}
      <footer className="w-full text-center py-2.5 px-4 border-t border-amber-900/40 text-[10px] sm:text-xs text-amber-400/60 bg-black/60 backdrop-blur-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          <span className="font-bold text-amber-300">18+</span>
          <span>· Demo & Free-Play Experience · Fair Certified RNG (96.8% Target RTP)</span>
        </div>
        <div className="flex items-center gap-3 mx-auto sm:mx-0 font-cinzel">
          <span>Eye of Ra: Pharaoh's Gold v2.4</span>
          <span>· Cloud & PWA Offline Ready</span>
        </div>
      </footer>

      {/* Interactive Modals */}
      <BonusTombModal
        isOpen={isBonusTombOpen}
        totalBet={totalBet}
        onComplete={handleCompleteBonusTomb}
      />

      <WheelOfRaModal
        isOpen={isWheelOfRaOpen}
        totalBet={totalBet}
        onClose={() => setIsWheelOfRaOpen(false)}
        onAwardPrize={handleAwardWheelPrize}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        playerScore={profile.totalWon > 0 ? profile.totalWon : 50000}
        playerRank={14}
        playerUsername={profile.username}
      />

      <DailyRewardsModal
        isOpen={isDailyRewardsOpen}
        onClose={() => setIsDailyRewardsOpen(false)}
        loginStreak={profile.loginStreak}
        quests={quests}
        onClaimDailyStreak={handleClaimDailyStreak}
        onClaimQuest={handleClaimQuest}
        hasClaimedToday={hasClaimedToday}
      />

      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        profile={profile}
        analytics={analytics}
      />

      <PaytableModal
        isOpen={isPaytableOpen}
        onClose={() => setIsPaytableOpen(false)}
        betPerLine={betPerLine}
      />

      <AuthAndProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
        onReloadAllState={() => {
          setProfile(loadPlayerProfile());
          setJackpots(loadJackpots());
          setQuests(loadQuests());
          setAnalytics(loadAnalytics());
        }}
      />

      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onRequestPushPermission={handleRequestPushPermission}
      />

      <SocialShareModal
        isOpen={socialShareData.open}
        onClose={() => setSocialShareData({ open: false, win: 0, mult: 0 })}
        winAmount={socialShareData.win}
        multiplier={socialShareData.mult}
        username={profile.username}
      />
    </div>
  );
}
