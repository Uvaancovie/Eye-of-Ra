import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun, Zap, Flame } from 'lucide-react';
import { SymbolId } from '../types';
import { EGYPTIAN_SYMBOLS } from '../data/egyptianSymbols';

interface FreeSpinsOverlayProps {
  currentSpin: number;
  totalSpins: number;
  multiplier: number;
  accumulatedWin: number;
  expandingSymbol?: SymbolId | null;
}

export const FreeSpinsOverlay: React.FC<FreeSpinsOverlayProps> = ({
  currentSpin,
  totalSpins,
  multiplier,
  accumulatedWin,
  expandingSymbol,
}) => {
  const expSymDef = expandingSymbol ? EGYPTIAN_SYMBOLS[expandingSymbol] : null;

  return (
    <div
      id="free-spins-hud-banner"
      className="w-full max-w-5xl mx-auto mb-2 bg-gradient-to-r from-purple-950/90 via-pink-950/90 to-amber-950/90 border-2 border-pink-500/80 rounded-xl p-2.5 sm:p-3 shadow-[0_0_25px_rgba(236,72,153,0.5)] flex flex-wrap items-center justify-between gap-3 text-pink-100"
    >
      {/* Free Spin Title & Counter */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center animate-pulse">
          <Sun className="w-5 h-5 text-pink-300 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div>
          <div className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-pink-300">
            SACRED FREE SPINS
          </div>
          <div className="text-base sm:text-lg font-black font-cinzel text-white">
            SPIN <span className="text-pink-400">{currentSpin}</span> OF{' '}
            <span className="text-pink-400">{totalSpins}</span>
          </div>
        </div>
      </div>

      {/* Expanding Symbol */}
      {expSymDef && (
        <div className="flex items-center gap-2 bg-black/40 border border-pink-500/40 rounded-lg px-2.5 py-1">
          <Zap className="w-4 h-4 text-cyan-400" />
          <div className="text-[11px] font-bold">
            Expanding Symbol:{' '}
            <span className="text-amber-300 font-cinzel font-black">
              {expSymDef.name.split('(')[0]}
            </span>
          </div>
        </div>
      )}

      {/* Multiplier Escalator */}
      <div className="flex items-center gap-1.5 bg-purple-950/80 border border-amber-400/60 rounded-lg px-3 py-1">
        <Flame className="w-4 h-4 text-amber-400 animate-flame" />
        <span className="text-xs font-bold text-amber-200">SOLAR MULTIPLIER:</span>
        <motion.span
          key={multiplier}
          initial={{ scale: 1.4, color: '#fef08a' }}
          animate={{ scale: 1, color: '#fbbf24' }}
          className="text-base sm:text-lg font-black font-cinzel gold-text-gradient"
        >
          {multiplier}x
        </motion.span>
      </div>

      {/* Accumulated Win */}
      <div className="text-right">
        <div className="text-[10px] uppercase font-bold text-pink-300/80">
          Total Bonus Win
        </div>
        <div className="text-base sm:text-lg font-black gold-text-gradient font-cinzel">
          {accumulatedWin.toLocaleString()} <span className="text-[10px]">PTS</span>
        </div>
      </div>
    </div>
  );
};
