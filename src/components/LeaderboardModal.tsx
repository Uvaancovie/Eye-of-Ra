import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Crown, Sparkles, X, Users, Flame } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerScore: number;
  playerRank: number;
  playerUsername: string;
}

const LEADERBOARD_DAILY: LeaderboardEntry[] = [
  { id: '1', username: 'RamsesTheGreat', avatar: 'pharaoh', score: 1450000, rank: 1, vipTier: 'Diamond Pharaoh', multiplier: 240, date: 'Today' },
  { id: '2', username: 'CleopatraQueen', avatar: 'cleopatra', score: 980500, rank: 2, vipTier: 'Platinum', multiplier: 180, date: 'Today' },
  { id: '3', username: 'AnubisSeeker', avatar: 'anubis', score: 672000, rank: 3, vipTier: 'Gold', multiplier: 120, date: 'Today' },
  { id: '4', username: 'HorusSkyGod', avatar: 'horus', score: 410000, rank: 4, vipTier: 'Gold', multiplier: 85, date: 'Today' },
  { id: '5', username: 'BastetLuckyCat', avatar: 'bastet', score: 325000, rank: 5, vipTier: 'Silver', multiplier: 65, date: 'Today' },
  { id: '6', username: 'NileDuneRider', avatar: 'pharaoh', score: 210000, rank: 6, vipTier: 'Silver', multiplier: 45, date: 'Today' },
];

const LEADERBOARD_WEEKLY: LeaderboardEntry[] = [
  { id: 'w1', username: 'Tutankhamun99', avatar: 'pharaoh', score: 4200000, rank: 1, vipTier: 'Diamond Pharaoh', multiplier: 500, date: 'This Week' },
  { id: 'w2', username: 'NefertitiGlow', avatar: 'cleopatra', score: 3100000, rank: 2, vipTier: 'Diamond Pharaoh', multiplier: 350, date: 'This Week' },
  { id: 'w3', username: 'OsirisReborn', avatar: 'anubis', score: 2450000, rank: 3, vipTier: 'Platinum', multiplier: 280, date: 'This Week' },
  { id: 'w4', username: 'SolarDiskRa', avatar: 'ra', score: 1890000, rank: 4, vipTier: 'Platinum', multiplier: 210, date: 'This Week' },
];

const LEADERBOARD_ALLTIME: LeaderboardEntry[] = [
  { id: 'a1', username: 'KingKhufuPyramids', avatar: 'pharaoh', score: 18500000, rank: 1, vipTier: 'Diamond Pharaoh', multiplier: 1200, date: 'All-Time' },
  { id: 'a2', username: 'DivineIsis', avatar: 'cleopatra', score: 14200000, rank: 2, vipTier: 'Diamond Pharaoh', multiplier: 950, date: 'All-Time' },
  { id: 'a3', username: 'SunGodAmun', avatar: 'ra', score: 11800000, rank: 3, vipTier: 'Diamond Pharaoh', multiplier: 800, date: 'All-Time' },
];

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  playerScore,
  playerRank,
  playerUsername,
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'alltime'>('daily');

  if (!isOpen) return null;

  const currentList =
    activeTab === 'daily'
      ? LEADERBOARD_DAILY
      : activeTab === 'weekly'
      ? LEADERBOARD_WEEKLY
      : LEADERBOARD_ALLTIME;

  return (
    <AnimatePresence>
      <div
        id="leaderboard-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#181206] via-[#0f0b04] to-[#080602] border-2 border-yellow-500/80 rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(234,179,8,0.4)] text-amber-100 max-h-[90vh] flex flex-col"
        >
          <button
            id="close-leaderboard-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-black font-cinzel gold-text-gradient">
              HALL OF PHARAOHS
            </h2>
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-xs text-center text-amber-300/70 mb-4">
            Global high scores, tournament champions, and multiplier masters
          </p>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-black/50 border border-amber-500/30 rounded-xl mb-4">
            <button
              id="tab-daily-btn"
              onClick={() => setActiveTab('daily')}
              className={`flex-1 py-1.5 text-xs font-bold font-cinzel rounded-lg cursor-pointer transition-all ${
                activeTab === 'daily'
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-amber-300/70 hover:text-amber-200'
              }`}
            >
              Today's High Rollers
            </button>
            <button
              id="tab-weekly-btn"
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 py-1.5 text-xs font-bold font-cinzel rounded-lg cursor-pointer transition-all ${
                activeTab === 'weekly'
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-amber-300/70 hover:text-amber-200'
              }`}
            >
              Weekly Pharaoh Cup
            </button>
            <button
              id="tab-alltime-btn"
              onClick={() => setActiveTab('alltime')}
              className={`flex-1 py-1.5 text-xs font-bold font-cinzel rounded-lg cursor-pointer transition-all ${
                activeTab === 'alltime'
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-amber-300/70 hover:text-amber-200'
              }`}
            >
              All-Time Legends
            </button>
          </div>

          {/* Current Player Rank Banner */}
          <div className="bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-amber-950/80 border border-yellow-400/60 rounded-xl p-3 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-400 flex items-center justify-center font-bold text-yellow-300 font-cinzel text-xs">
                #{playerRank}
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{playerUsername}</span>
                  <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded font-bold">
                    YOU
                  </span>
                </div>
                <div className="text-[10px] text-amber-300/80">VIP Gold Rank</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black gold-text-gradient font-cinzel">
                {playerScore.toLocaleString()} PTS
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 justify-end">
                <Flame className="w-3 h-3 text-emerald-400" /> In Top 5%
              </div>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {currentList.map((entry) => {
              const isTop3 = entry.rank <= 3;
              return (
                <div
                  key={entry.id}
                  id={`leaderboard-entry-${entry.id}`}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    entry.rank === 1
                      ? 'bg-gradient-to-r from-yellow-950/40 via-amber-900/30 to-yellow-950/40 border-yellow-400/80 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                      : entry.rank === 2
                      ? 'bg-slate-900/60 border-slate-400/50'
                      : entry.rank === 3
                      ? 'bg-amber-950/30 border-amber-600/40'
                      : 'bg-black/30 border-amber-500/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-cinzel font-black text-xs ${
                        entry.rank === 1
                          ? 'bg-yellow-400 text-slate-950 shadow-md'
                          : entry.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : entry.rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-black/60 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {entry.rank === 1 ? (
                        <Crown className="w-4 h-4" />
                      ) : (
                        entry.rank
                      )}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{entry.username}</span>
                        {isTop3 && (
                          <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                        )}
                      </div>
                      <div className="text-[10px] text-amber-400/80">
                        {entry.vipTier} · {entry.multiplier}x Max Multiplier
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-black gold-text-gradient font-cinzel">
                      {entry.score.toLocaleString()} PTS
                    </div>
                    <div className="text-[9px] text-amber-400/60">{entry.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
