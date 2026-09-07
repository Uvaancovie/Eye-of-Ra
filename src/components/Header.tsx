import React from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  Trophy,
  Gift,
  BarChart3,
  BookOpen,
  User,
  Sparkles,
  Wifi,
  WifiOff,
  Bell,
  Coins,
  Crown,
} from 'lucide-react';
import { PlayerProfile, AppNotification } from '../types';
import { MainPharaohAvatar } from './MainPharaohAvatar';

interface HeaderProps {
  profile: PlayerProfile;
  notifications: AppNotification[];
  isOffline: boolean;
  onOpenLeaderboard: () => void;
  onOpenDailyRewards: () => void;
  onOpenAnalytics: () => void;
  onOpenPaytable: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  hasUnclaimedDaily: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  notifications,
  isOffline,
  onOpenLeaderboard,
  onOpenDailyRewards,
  onOpenAnalytics,
  onOpenPaytable,
  onOpenProfile,
  onOpenNotifications,
  onToggleSound,
  onToggleMusic,
  hasUnclaimedDaily,
}) => {
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <header
      id="main-app-header"
      className="w-full bg-[#0a0a0c]/85 border-b border-amber-900/40 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 shadow-[0_4px_25px_rgba(0,0,0,0.7)]"
    >
      {/* Brand & Theme Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-yellow-300 via-amber-500 to-amber-800 p-0.5 shadow-[0_0_15px_rgba(217,119,6,0.35)] flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-[#0c0a07] rounded-[10px] flex items-center justify-center text-amber-400 font-cinzel font-black text-lg">
            𓂀
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-black font-cinzel gold-text-gradient tracking-wide leading-tight">
              PHARAOH RA'S RICHES
            </h1>
            <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-widest bg-amber-950/60 text-amber-300 border border-amber-600/40 px-1.5 py-0.2 rounded">
              Solar Empire
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-amber-400/70">
            {isOffline ? (
              <span className="flex items-center gap-1 text-amber-400">
                <WifiOff className="w-2.5 h-2.5" /> Offline Mode
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-400">
                <Wifi className="w-2.5 h-2.5" /> Cloud Connected
              </span>
            )}
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline text-amber-400 font-semibold">
              VIP {profile.vipTier}
            </span>
          </div>
        </div>
      </div>

      {/* Balance Pill */}
      <div
        id="player-balance-display"
        onClick={onOpenProfile}
        className="cursor-pointer bg-gradient-to-r from-[#1a1205] via-[#0d0902] to-[#1a1205] border border-amber-500/40 hover:border-amber-400/80 rounded-full px-3.5 sm:px-4 py-1.5 flex items-center gap-2 shadow-inner transition-all"
      >
        <div className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center">
          <Coins className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        </div>
        <div className="text-left">
          <div className="text-[9px] uppercase font-bold text-amber-400/80 leading-none">
            Demo Credits
          </div>
          <div className="text-xs sm:text-sm font-black gold-text-gradient font-cinzel leading-tight">
            {profile.balance.toLocaleString()} <span className="text-[10px]">PTS</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Daily Rewards Button */}
        <button
          id="header-daily-btn"
          onClick={onOpenDailyRewards}
          title="Daily Rewards & Quests"
          className="relative cursor-pointer p-2 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-500/50 text-amber-300 transition-all"
        >
          <Gift className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          {hasUnclaimedDaily && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>

        {/* Leaderboard Button */}
        <button
          id="header-leaderboard-btn"
          onClick={onOpenLeaderboard}
          title="Leaderboard & High Scores"
          className="cursor-pointer p-2 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-500/50 text-amber-300 transition-all"
        >
          <Trophy className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Analytics Button */}
        <button
          id="header-analytics-btn"
          onClick={onOpenAnalytics}
          title="Player Analytics & RTP"
          className="cursor-pointer p-2 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-500/50 text-amber-300 transition-all"
        >
          <BarChart3 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Paytable Button */}
        <button
          id="header-paytable-btn"
          onClick={onOpenPaytable}
          title="Paytable & Rules"
          className="cursor-pointer p-2 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-500/50 text-amber-300 transition-all"
        >
          <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Notifications Button */}
        <button
          id="header-notif-btn"
          onClick={onOpenNotifications}
          title="Notifications & Updates"
          className="relative cursor-pointer p-2 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-500/50 text-amber-300 transition-all"
        >
          <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          {unreadNotifs > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
              {unreadNotifs}
            </span>
          )}
        </button>

        {/* Sound FX Toggle */}
        <button
          id="header-sound-btn"
          onClick={onToggleSound}
          title={profile.soundEnabled ? 'Disable Sound Effects' : 'Enable Sound Effects'}
          className="cursor-pointer p-2 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-500/50 text-amber-300 transition-all"
        >
          {profile.soundEnabled ? (
            <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-500" />
          )}
        </button>

        {/* Ambient Music Toggle */}
        <button
          id="header-music-btn"
          onClick={onToggleMusic}
          title={profile.musicEnabled ? 'Disable Ambient Music' : 'Enable Ambient Music'}
          className="cursor-pointer p-2 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-500/50 text-amber-300 transition-all"
        >
          <Music
            className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
              profile.musicEnabled ? 'text-cyan-400 animate-pulse' : 'text-neutral-500'
            }`}
          />
        </button>

        {/* Profile / Settings Button with Main Avatar */}
        <button
          id="header-profile-btn"
          onClick={onOpenProfile}
          title="Account Profile & Cloud Sync"
          className="cursor-pointer p-1 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-neutral-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all ml-1 flex items-center justify-center overflow-hidden border border-amber-300"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#140e06] flex items-center justify-center overflow-hidden">
            <MainPharaohAvatar size="sm" customUrl={profile.customAvatarUrl} />
          </div>
        </button>
      </div>
    </header>
  );
};
