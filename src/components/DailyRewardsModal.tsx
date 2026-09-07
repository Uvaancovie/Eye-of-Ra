import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, CheckCircle2, Trophy, Sparkles, X, Flame, Coins, Calendar } from 'lucide-react';
import { DailyQuest } from '../types';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface DailyRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginStreak: number;
  quests: DailyQuest[];
  onClaimDailyStreak: (day: number, rewardCoins: number) => void;
  onClaimQuest: (questId: string, rewardCoins: number, rewardVip: number) => void;
  hasClaimedToday: boolean;
}

const STREAK_DAYS = [
  { day: 1, coins: 1500, label: 'Day 1' },
  { day: 2, coins: 3000, label: 'Day 2' },
  { day: 3, coins: 5000, label: 'Day 3' },
  { day: 4, coins: 8000, label: 'Day 4' },
  { day: 5, coins: 12000, label: 'Day 5' },
  { day: 6, coins: 18000, label: 'Day 6' },
  { day: 7, coins: 35000, label: 'Day 7 (Grand Chest)' },
];

export const DailyRewardsModal: React.FC<DailyRewardsModalProps> = ({
  isOpen,
  onClose,
  loginStreak,
  quests,
  onClaimDailyStreak,
  onClaimQuest,
  hasClaimedToday,
}) => {
  if (!isOpen) return null;

  const currentStreakDay = ((loginStreak - 1) % 7) + 1;

  const handleClaimStreak = () => {
    const reward = STREAK_DAYS[currentStreakDay - 1];
    sound.playBigWin();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    onClaimDailyStreak(currentStreakDay, reward.coins);
  };

  const handleClaimQuestReward = (q: DailyQuest) => {
    sound.playCoin();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
    });
    onClaimQuest(q.id, q.rewardCoins, q.rewardVip);
  };

  return (
    <AnimatePresence>
      <div
        id="daily-rewards-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#1c1306] via-[#110c04] to-[#080502] border-2 border-yellow-500/80 rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(234,179,8,0.4)] text-amber-100 max-h-[90vh] flex flex-col"
        >
          <button
            id="close-daily-rewards-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gift className="w-6 h-6 text-yellow-400 animate-bounce" />
            <h2 className="text-xl sm:text-2xl font-black font-cinzel gold-text-gradient">
              DAILY GIFTS & QUESTS
            </h2>
            <Gift className="w-6 h-6 text-yellow-400 animate-bounce" />
          </div>
          <p className="text-xs text-center text-amber-300/70 mb-4">
            Login every single day to unlock multiplying treasures and complete royal challenges!
          </p>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* 7-Day Login Streak Ladder */}
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-cinzel">
                    7-Day Pharaoh Streak
                  </span>
                </div>
                <div className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" /> Streak: {loginStreak} Days
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 mb-3">
                {STREAK_DAYS.map((item) => {
                  const isPast = item.day < currentStreakDay;
                  const isCurrent = item.day === currentStreakDay;
                  return (
                    <div
                      key={item.day}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                        isCurrent
                          ? 'bg-amber-950/80 border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.5)] ring-1 ring-yellow-400'
                          : isPast
                          ? 'bg-black/60 border-emerald-500/40 opacity-70'
                          : 'bg-black/30 border-amber-500/20'
                      }`}
                    >
                      <span className="text-[9px] font-bold text-amber-300">
                        Day {item.day}
                      </span>
                      <Coins className="w-4 h-4 text-yellow-400 my-1" />
                      <span className="text-[10px] font-black font-cinzel gold-text-gradient">
                        +{item.coins.toLocaleString()}
                      </span>
                      {isPast && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 absolute top-1 right-1" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  id="claim-streak-reward-btn"
                  onClick={handleClaimStreak}
                  disabled={hasClaimedToday}
                  className={`cursor-pointer px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider font-cinzel transition-all ${
                    hasClaimedToday
                      ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 shadow-[0_0_15px_rgba(234,179,8,0.6)]'
                  }`}
                >
                  {hasClaimedToday ? 'Claimed Today' : `Claim Day ${currentStreakDay} (+${STREAK_DAYS[currentStreakDay - 1].coins.toLocaleString()} PTS)`}
                </button>
              </div>
            </div>

            {/* Daily Quests List */}
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-cinzel">
                  Daily Quests & Challenges
                </span>
              </div>

              <div className="space-y-2.5">
                {quests.map((quest) => {
                  const progressPct = Math.min(100, Math.round((quest.current / quest.target) * 100));
                  const isReady = quest.current >= quest.target && !quest.claimed;

                  return (
                    <div
                      key={quest.id}
                      id={`quest-card-${quest.id}`}
                      className="bg-[#140e06] border border-amber-500/20 rounded-lg p-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{quest.title}</span>
                          <span className="text-[10px] text-amber-400">
                            (+{quest.rewardCoins.toLocaleString()} PTS · +{quest.rewardVip} VIP)
                          </span>
                        </div>
                        <div className="text-[11px] text-amber-300/70 mb-1.5">
                          {quest.description}
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-amber-500/30">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <div className="text-[9px] text-right text-amber-400/80 mt-0.5">
                          {quest.current} / {quest.target} ({progressPct}%)
                        </div>
                      </div>

                      <div>
                        {quest.claimed ? (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                          </div>
                        ) : (
                          <button
                            id={`claim-quest-btn-${quest.id}`}
                            onClick={() => handleClaimQuestReward(quest)}
                            disabled={!isReady}
                            className={`cursor-pointer px-4 py-1.5 rounded-lg text-xs font-bold uppercase font-cinzel transition-all ${
                              isReady
                                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 shadow-[0_0_12px_rgba(234,179,8,0.7)] animate-pulse'
                                : 'bg-slate-800/80 text-slate-500 border border-slate-700 cursor-not-allowed'
                            }`}
                          >
                            Claim
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
