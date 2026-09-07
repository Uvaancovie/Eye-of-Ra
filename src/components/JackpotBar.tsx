import React from 'react';
import { JackpotPool } from '../types';
import { Crown, Sparkles, Flame, Gem } from 'lucide-react';
import { motion } from 'motion/react';

interface JackpotBarProps {
  jackpots: JackpotPool;
  onJackpotClick?: (tier: string) => void;
}

export const JackpotBar: React.FC<JackpotBarProps> = ({ jackpots, onJackpotClick }) => {
  return (
    <div
      id="jackpot-bar-container"
      className="w-full max-w-5xl mx-auto mb-3 grid grid-cols-2 sm:grid-cols-4 gap-2 px-2"
    >
      {/* Mini Jackpot */}
      <div
        id="jackpot-mini-card"
        onClick={() => onJackpotClick?.('mini')}
        className="cursor-pointer relative overflow-hidden bg-gradient-to-b from-[#0e1622] to-[#060b12] border border-cyan-500/30 rounded-xl p-2 sm:p-2.5 text-center shadow-lg transition-transform hover:scale-[1.02]"
      >
        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-extrabold text-cyan-400 tracking-wider">
          <Gem className="w-3 h-3 text-cyan-300" />
          <span>MINI JACKPOT</span>
        </div>
        <div className="text-base sm:text-lg font-black text-cyan-100 font-cinzel mt-0.5">
          {jackpots.mini.toLocaleString()} <span className="text-[10px] text-cyan-400">PTS</span>
        </div>
        <div className="text-[9px] text-cyan-400/70 mt-0.5">Mystery Drop</div>
      </div>

      {/* Minor Jackpot */}
      <div
        id="jackpot-minor-card"
        onClick={() => onJackpotClick?.('minor')}
        className="cursor-pointer relative overflow-hidden bg-gradient-to-b from-[#180e22] to-[#0a0510] border border-purple-500/30 rounded-xl p-2 sm:p-2.5 text-center shadow-lg transition-transform hover:scale-[1.02]"
      >
        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-extrabold text-purple-400 tracking-wider">
          <Sparkles className="w-3 h-3 text-purple-300" />
          <span>MINOR JACKPOT</span>
        </div>
        <div className="text-base sm:text-lg font-black text-purple-100 font-cinzel mt-0.5">
          {jackpots.minor.toLocaleString()} <span className="text-[10px] text-purple-400">PTS</span>
        </div>
        <div className="text-[9px] text-purple-400/70 mt-0.5">Tomb Guardian</div>
      </div>

      {/* Major Jackpot */}
      <div
        id="jackpot-major-card"
        onClick={() => onJackpotClick?.('major')}
        className="cursor-pointer relative overflow-hidden bg-gradient-to-b from-[#221206] to-[#0e0702] border border-amber-600/40 rounded-xl p-2 sm:p-2.5 text-center shadow-lg transition-transform hover:scale-[1.02]"
      >
        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-extrabold text-amber-400 tracking-wider">
          <Flame className="w-3 h-3 text-amber-400 animate-flame" />
          <span>MAJOR JACKPOT</span>
        </div>
        <div className="text-base sm:text-lg font-black text-amber-100 font-cinzel mt-0.5">
          {jackpots.major.toLocaleString()} <span className="text-[10px] text-amber-400">PTS</span>
        </div>
        <div className="text-[9px] text-amber-400/70 mt-0.5">Solar Ray Burst</div>
      </div>

      {/* Grand Pharaoh Jackpot */}
      <div
        id="jackpot-grand-card"
        onClick={() => onJackpotClick?.('grand')}
        className="cursor-pointer relative overflow-hidden bg-gradient-to-b from-[#2a1604] via-[#170c02] to-[#0a0501] border-2 border-amber-400/80 rounded-xl p-2 sm:p-2.5 text-center shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-transform hover:scale-[1.03] ring-1 ring-amber-400/40"
      >
        <motion.div
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-black text-amber-300 tracking-widest"
        >
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>GRAND PHARAOH</span>
        </motion.div>
        <div className="text-lg sm:text-xl font-black gold-text-gradient font-cinzel mt-0.5 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
          {jackpots.grand.toLocaleString()} <span className="text-[10px] text-amber-400">PTS</span>
        </div>
        <div className="text-[9px] text-amber-400 font-semibold mt-0.5">5x Pharaoh on Line 1</div>
        {/* Shiny sweep animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-amber-200/15 to-transparent animate-gold-shine" />
        </div>
      </div>
    </div>
  );
};
