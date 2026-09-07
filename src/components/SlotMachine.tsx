import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCcw,
  Zap,
  Play,
  Square,
  Plus,
  Minus,
  Sparkles,
  Share2,
  Crown,
  Sun,
  Info,
  Flame,
} from 'lucide-react';
import { SymbolId, SpinResult } from '../types';
import { SymbolCell } from './SymbolCell';
import { PAYLINES } from '../data/paylines';
import { audioEngine } from '../utils/audio';
import { WinParticleCanvas, ParticleWinType } from './WinParticleCanvas';

interface SlotMachineProps {
  grid: SymbolId[][];
  isSpinning: boolean;
  spinningReels: boolean[];
  lastResult: SpinResult | null;
  betPerLine: number;
  activeLines: number;
  totalBet: number;
  balance: number;
  turboMode: boolean;
  isAutoplay: boolean;
  autoplayCount: number;
  isFreeSpins: boolean;
  onSpin: () => void;
  onToggleAutoplay: () => void;
  onToggleTurbo: () => void;
  onChangeBetPerLine: (delta: number) => void;
  onChangeActiveLines: (lines: number) => void;
  onMaxBet: () => void;
  onOpenSocialShare: (win: number, mult: number) => void;
  onOpenWheelOfRa: () => void;
  onOpenPaytable?: () => void;
  languageStrings: any;
}

export const SlotMachine: React.FC<SlotMachineProps> = ({
  grid,
  isSpinning,
  spinningReels,
  lastResult,
  betPerLine,
  activeLines,
  totalBet,
  balance,
  turboMode,
  isAutoplay,
  autoplayCount,
  isFreeSpins,
  onSpin,
  onToggleAutoplay,
  onToggleTurbo,
  onChangeBetPerLine,
  onChangeActiveLines,
  onMaxBet,
  onOpenSocialShare,
  onOpenWheelOfRa,
  onOpenPaytable,
  languageStrings: t,
}) => {
  const [activeWinLineIndex, setActiveWinLineIndex] = useState<number | null>(null);
  const [showBetAdjuster, setShowBetAdjuster] = useState(false);
  const winCycleInterval = useRef<any>(null);

  // Cycle through winning paylines when not spinning
  useEffect(() => {
    if (winCycleInterval.current) {
      clearInterval(winCycleInterval.current);
      winCycleInterval.current = null;
    }

    if (
      !isSpinning &&
      lastResult &&
      lastResult.lineWins &&
      lastResult.lineWins.length > 0
    ) {
      let idx = 0;
      setActiveWinLineIndex(0);
      winCycleInterval.current = setInterval(() => {
        idx = (idx + 1) % lastResult.lineWins.length;
        setActiveWinLineIndex(idx);
      }, 2000);
    } else {
      setActiveWinLineIndex(null);
    }

    return () => {
      if (winCycleInterval.current) clearInterval(winCycleInterval.current);
    };
  }, [isSpinning, lastResult]);

  // Spacebar keyboard listener for instant spin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpinning && !isFreeSpins && balance >= totalBet) {
        e.preventDefault();
        onSpin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, isFreeSpins, balance, totalBet, onSpin]);

  // Check if a coordinate is winning in currently active line
  const isWinningCoord = (col: number, row: number): boolean => {
    if (isSpinning || !lastResult || !lastResult.lineWins || lastResult.lineWins.length === 0) {
      return false;
    }
    if (activeWinLineIndex !== null && lastResult.lineWins[activeWinLineIndex]) {
      return lastResult.lineWins[activeWinLineIndex].coordinates.some(
        ([c, r]) => c === col && r === row
      );
    }
    return lastResult.lineWins.some((lw) =>
      lw.coordinates.some(([c, r]) => c === col && r === row)
    );
  };

  const activeLineWin =
    activeWinLineIndex !== null && lastResult?.lineWins?.[activeWinLineIndex]
      ? lastResult.lineWins[activeWinLineIndex]
      : null;

  const activePaylineObj = activeLineWin
    ? PAYLINES.find((p) => p.id === activeLineWin.paylineId)
    : null;

  const winMultiplier =
    lastResult && lastResult.totalWin > 0 && totalBet > 0
      ? lastResult.totalWin / totalBet
      : 0;

  // Particle effect animation trigger for Jackpot and Big Wins (Big, Mega, Legendary)
  const particleWinType: ParticleWinType = (() => {
    if (isSpinning || !lastResult || lastResult.totalWin <= 0) return null;
    if (lastResult.jackpotTriggered) return 'jackpot';
    if (winMultiplier >= 50) return 'legendary';
    if (winMultiplier >= 20) return 'mega';
    if (winMultiplier >= 10) return 'big';
    return null;
  })();

  return (
    <div
      id="slot-machine-container"
      className="w-full max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center select-none"
    >
      {/* MAGNIFICENT ANCIENT ORNATE GOLDEN CASING FRAME */}
      <div className="relative w-full bg-gradient-to-b from-[#1c1307] via-[#0d0903] to-[#040301] border-[3px] border-amber-500/80 rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 shadow-[0_0_70px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] overflow-hidden">
        {/* BIG WIN & JACKPOT PARTICLE EFFECT CANVAS */}
        <WinParticleCanvas
          winType={particleWinType}
          winAmount={lastResult?.totalWin}
          jackpotName={lastResult?.jackpotTriggered || undefined}
        />
        {/* CORNER TURQUOISE & GOLD MOUNTS */}
        {/* Top-Left Gem Mount */}
        <div className="absolute top-2 left-2 w-4 h-4 z-20 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rotate-45 bg-[#06b6d4] border border-amber-300 shadow-[0_0_10px_#22d3ee]" />
        </div>
        {/* Top-Right Gem Mount */}
        <div className="absolute top-2 right-2 w-4 h-4 z-20 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rotate-45 bg-[#06b6d4] border border-amber-300 shadow-[0_0_10px_#22d3ee]" />
        </div>
        {/* Bottom-Left Gem Mount */}
        <div className="absolute bottom-2 left-2 w-4 h-4 z-20 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rotate-45 bg-[#06b6d4] border border-amber-300 shadow-[0_0_10px_#22d3ee]" />
        </div>
        {/* Bottom-Right Gem Mount */}
        <div className="absolute bottom-2 right-2 w-4 h-4 z-20 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rotate-45 bg-[#06b6d4] border border-amber-300 shadow-[0_0_10px_#22d3ee]" />
        </div>

        {/* SIDE TORCH FLAMES ALONG FRAME */}
        <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-14 z-20 hidden sm:block pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full blur-[1px] animate-pulse" />
        </div>
        <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-4 h-14 z-20 hidden sm:block pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full blur-[1px] animate-pulse" />
        </div>

        {/* ORNATE TOP FRAME HEADER: "PHARAOH RA'S RICHES" */}
        <div className="relative z-10 flex items-center justify-center pb-2.5 mb-2 border-b border-amber-600/40">
          {/* Winged Golden Flourish Left */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-10 md:w-20 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-2.5 h-2.5 rotate-45 bg-amber-400" />
          </div>

          {/* Centered Title with Ruby Crest */}
          <div className="flex items-center gap-2.5 px-4">
            <div className="w-3.5 h-3.5 rotate-45 bg-rose-600 border border-amber-300 shadow-[0_0_10px_#f43f5e]" />
            <h2 className="font-cinzel text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#fffbeb] via-[#fde047] to-[#d97706] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              PHARAOH RA'S RICHES
            </h2>
            <div className="w-3.5 h-3.5 rotate-45 bg-rose-600 border border-amber-300 shadow-[0_0_10px_#f43f5e]" />
          </div>

          {/* Winged Golden Flourish Right */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rotate-45 bg-amber-400" />
            <div className="w-10 md:w-20 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {/* 5-REELS ANIMATED GRID (Deep Obsidian Background & Spacious Heights) */}
        <div className="relative w-full aspect-[5/3.2] min-h-[280px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-[540px] max-h-[620px] bg-[#050811] border-2 border-amber-500/60 rounded-xl sm:rounded-2xl p-1.5 sm:p-3 grid grid-cols-5 gap-1.5 sm:gap-2.5 overflow-hidden shadow-2xl">
          {/* Active Payline Laser Overlay Lines */}
          {activePaylineObj && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 500 300"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {(() => {
                const points = activePaylineObj.coordinates.map(([col, row]) => {
                  const x = col * 100 + 50;
                  const y = row * 100 + 50;
                  return `${x},${y}`;
                });
                return (
                  <>
                    <polyline
                      points={points.join(' ')}
                      fill="none"
                      stroke={activePaylineObj.color}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#laserGlow)"
                      className="opacity-90"
                    />
                    {activePaylineObj.coordinates.map(([col, row], i) => (
                      <circle
                        key={i}
                        cx={col * 100 + 50}
                        cy={row * 100 + 50}
                        r="8"
                        fill="#fff"
                        stroke={activePaylineObj.color}
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    ))}
                  </>
                );
              })()}
            </svg>
          )}

          {/* 5 Vertical Reel Columns with Gold Dividers */}
          {grid.map((columnSymbols, colIndex) => {
            const isReelSpinning = spinningReels[colIndex];

            return (
              <div
                key={colIndex}
                id={`reel-column-${colIndex}`}
                className={`relative w-full h-full flex flex-col justify-between gap-1 sm:gap-1.5 rounded-lg bg-black/40 overflow-hidden border-r last:border-r-0 border-amber-600/30 ${
                  isReelSpinning ? 'ring-1 ring-amber-400/50' : ''
                }`}
              >
                {columnSymbols.map((symbolId, rowIndex) => {
                  const winning = isWinningCoord(colIndex, rowIndex);

                  return (
                    <div key={rowIndex} className="w-full h-1/3 p-0.5">
                      <SymbolCell
                        symbolId={symbolId}
                        isWinning={winning}
                        isBlurred={isReelSpinning}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* BURNING GOLDEN FLAMES ALONG THE BOTTOM RAIL */}
          <div className="absolute bottom-0 left-0 right-0 h-3 z-10 pointer-events-none flex items-center justify-around overflow-hidden opacity-80">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-4 bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent rounded-full blur-[1px] animate-pulse"
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: '1.2s' }}
              />
            ))}
          </div>
        </div>

        {/* WIN BANNER CELEBRATION OVERLAY */}
        <AnimatePresence>
          {!isSpinning && lastResult && lastResult.totalWin > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`mt-2 p-2 sm:p-3 rounded-xl border flex items-center justify-between gap-2 shadow-2xl relative overflow-hidden ${
                lastResult.jackpotTriggered
                  ? 'bg-gradient-to-r from-yellow-950 via-amber-900 to-yellow-950 border-yellow-300 shadow-[0_0_40px_rgba(234,179,8,0.8)]'
                  : winMultiplier >= 50
                  ? 'bg-gradient-to-r from-red-950 via-amber-950 to-red-950 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.6)]'
                  : winMultiplier >= 20
                  ? 'bg-gradient-to-r from-purple-950 via-amber-950 to-purple-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'bg-gradient-to-r from-amber-950/90 via-[#181106] to-amber-950/90 border-amber-500/50'
              }`}
            >
              {/* Particle Shine Glow Bar */}
              {particleWinType && (
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                />
              )}

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-1.5 text-amber-300">
                    {lastResult.jackpotTriggered ? (
                      <span className="text-yellow-300 font-extrabold animate-pulse">
                        👑 {lastResult.jackpotTriggered.toUpperCase()} JACKPOT HIT! 🪙
                      </span>
                    ) : winMultiplier >= 50 ? (
                      <span>👑 PHARAOH LEGENDARY WIN!</span>
                    ) : winMultiplier >= 20 ? (
                      <span>⚡ MEGA WIN!</span>
                    ) : winMultiplier >= 10 ? (
                      <span>🌟 BIG WIN!</span>
                    ) : (
                      <span>NICE WIN!</span>
                    )}
                  </div>
                  <div className="text-sm sm:text-lg font-black gold-text-gradient font-cinzel">
                    +{lastResult.totalWin.toLocaleString()} PTS ({winMultiplier.toFixed(1)}x Bet)
                  </div>
                </div>
              </div>

              <button
                id="share-win-banner-btn"
                onClick={() => onOpenSocialShare(lastResult.totalWin, winMultiplier)}
                className="cursor-pointer px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 font-cinzel shadow-md transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Win</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRIMARY CONTROL BUTTONS BAR (Level, Bet, Spin, Auto, Bet Max, Coin Value) */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 rounded-2xl bg-gradient-to-b from-[#140e06] to-[#080502] border border-amber-500/40 shadow-inner">
          {/* LEFT CONTROLS: (i) Info + LEVEL Stepper */}
          <div className="flex items-center gap-2">
            {/* (i) INFO BUTTON */}
            <button
              id="slot-info-btn"
              onClick={onOpenPaytable}
              title="Paytable & Game Rules"
              className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#2a1c09] via-[#1a1104] to-[#0d0902] border-2 border-amber-400/80 hover:border-amber-300 text-amber-300 flex items-center justify-center font-serif text-base font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <span className="italic font-bold">i</span>
            </button>

            {/* LEVEL STEPPER */}
            <div className="flex flex-col items-center bg-black/60 px-2 py-1 rounded-xl border border-amber-700/40">
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-400/90 font-cinzel">LEVEL</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <button
                  disabled={isSpinning || isFreeSpins || activeLines <= 1}
                  onClick={() => {
                    onChangeActiveLines(Math.max(1, activeLines - 5));
                    audioEngine.playButtonClick();
                  }}
                  className="cursor-pointer w-6 h-6 rounded-full bg-[#2a1b09] hover:bg-[#3d270c] border border-amber-500/60 text-amber-300 flex items-center justify-center font-bold text-xs active:scale-90 transition-all disabled:opacity-40"
                >
                  -
                </button>
                <span className="font-cinzel text-xs font-black text-white min-w-[20px] text-center">
                  {Math.round(activeLines / 4) || 1}
                </span>
                <button
                  disabled={isSpinning || isFreeSpins || activeLines >= 20}
                  onClick={() => {
                    onChangeActiveLines(Math.min(20, activeLines + 5));
                    audioEngine.playButtonClick();
                  }}
                  className="cursor-pointer w-6 h-6 rounded-full bg-[#2a1b09] hover:bg-[#3d270c] border border-amber-500/60 text-amber-300 flex items-center justify-center font-bold text-xs active:scale-90 transition-all disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* CENTER CONTROLS: AUTO + MAIN SPIN + BET MAX */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AUTO BUTTON */}
            <motion.button
              id="slot-auto-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={isSpinning && !isAutoplay}
              onClick={onToggleAutoplay}
              className={`cursor-pointer relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest font-cinzel shadow-[0_0_18px_rgba(225,29,72,0.6)] flex items-center justify-center gap-1.5 border-2 transition-all ${
                isAutoplay
                  ? 'bg-gradient-to-b from-[#fda4af] via-[#e11d48] to-[#881337] text-white border-rose-300 animate-pulse'
                  : 'bg-gradient-to-b from-[#e11d48] via-[#9f1239] to-[#4c0519] hover:from-[#f43f5e] hover:to-[#881337] text-amber-100 border-amber-400'
              }`}
            >
              <div className="absolute left-1.5 w-1.5 h-1.5 rotate-45 bg-amber-400 border border-yellow-100" />
              <div className="absolute right-1.5 w-1.5 h-1.5 rotate-45 bg-amber-400 border border-yellow-100" />
              {isAutoplay ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoplay ? `STOP (${autoplayCount})` : 'AUTO'}</span>
            </motion.button>

            {/* MAIN SPIN PILL BUTTON */}
            <motion.button
              id="slot-spin-btn"
              whileHover={!isSpinning ? { scale: 1.04 } : {}}
              whileTap={!isSpinning ? { scale: 0.95 } : {}}
              disabled={isSpinning || isFreeSpins || balance < totalBet}
              onClick={onSpin}
              className={`cursor-pointer relative px-6 sm:px-10 py-3 sm:py-3.5 rounded-full font-black text-sm sm:text-base uppercase tracking-widest font-cinzel shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 border-2 transition-all ${
                isSpinning
                  ? 'bg-amber-800/50 text-amber-300/50 border-amber-700/60 cursor-not-allowed'
                  : balance < totalBet
                  ? 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                  : 'bg-gradient-to-b from-[#fef08a] via-[#f59e0b] to-[#b45309] hover:from-[#fff] hover:to-[#d97706] text-slate-950 border-amber-200'
              }`}
            >
              <div className="absolute left-2 w-2 h-2 rotate-45 bg-rose-600 border border-amber-200 rounded-sm" />
              <div className="absolute right-2 w-2 h-2 rotate-45 bg-rose-600 border border-amber-200 rounded-sm" />
              <RotateCcw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? t.spinning || 'SPINNING...' : t.spin || 'SPIN'}</span>
            </motion.button>

            {/* BET MAX BUTTON */}
            <motion.button
              id="slot-bet-max-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={isSpinning || isFreeSpins}
              onClick={onMaxBet}
              className="cursor-pointer relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider font-cinzel bg-gradient-to-b from-[#2a1c09] via-[#1a1104] to-[#0d0902] hover:bg-[#38260e] text-amber-300 border-2 border-amber-500/80 hover:border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
            >
              <div className="absolute left-1.5 w-1.5 h-1.5 rotate-45 bg-[#06b6d4] border border-amber-200" />
              <div className="absolute right-1.5 w-1.5 h-1.5 rotate-45 bg-[#06b6d4] border border-amber-200" />
              <span>BET MAX</span>
            </motion.button>
          </div>

          {/* RIGHT CONTROLS: COIN VALUE Stepper + Turbo */}
          <div className="flex items-center gap-2">
            {/* COIN VALUE STEPPER */}
            <div className="flex flex-col items-center bg-black/60 px-2 py-1 rounded-xl border border-amber-700/40">
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-400/90 font-cinzel">COIN VALUE</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <button
                  disabled={isSpinning || isFreeSpins || betPerLine <= 5}
                  onClick={() => {
                    onChangeBetPerLine(-5);
                    audioEngine.playButtonClick();
                  }}
                  className="cursor-pointer w-6 h-6 rounded-full bg-[#2a1b09] hover:bg-[#3d270c] border border-amber-500/60 text-amber-300 flex items-center justify-center font-bold text-xs active:scale-90 transition-all disabled:opacity-40"
                >
                  -
                </button>
                <span className="font-cinzel text-xs font-black text-white min-w-[28px] text-center">
                  {betPerLine}
                </span>
                <button
                  disabled={isSpinning || isFreeSpins || betPerLine >= 500}
                  onClick={() => {
                    onChangeBetPerLine(5);
                    audioEngine.playButtonClick();
                  }}
                  className="cursor-pointer w-6 h-6 rounded-full bg-[#2a1b09] hover:bg-[#3d270c] border border-amber-500/60 text-amber-300 flex items-center justify-center font-bold text-xs active:scale-90 transition-all disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            {/* TURBO TOGGLE */}
            <button
              onClick={onToggleTurbo}
              title="Toggle Turbo Spin"
              className={`cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${
                turboMode
                  ? 'bg-amber-500 text-slate-950 border-amber-200 shadow-[0_0_12px_#f59e0b]'
                  : 'bg-black/60 text-amber-400 border-amber-800/60 hover:border-amber-500'
              }`}
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* OPTIONAL EXPANDABLE BET & TURBO ADJUSTER */}
        {showBetAdjuster && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 p-2 rounded-xl bg-black/60 border border-amber-800/40 flex flex-wrap items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400 font-cinzel font-bold">Line Bet:</span>
              <button
                disabled={isSpinning || isFreeSpins || betPerLine <= 5}
                onClick={() => onChangeBetPerLine(-5)}
                className="w-6 h-6 rounded bg-[#1a1205] border border-amber-600/40 text-amber-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-xs font-bold text-white">{betPerLine}</span>
              <button
                disabled={isSpinning || isFreeSpins || betPerLine >= 500}
                onClick={() => onChangeBetPerLine(5)}
                className="w-6 h-6 rounded bg-[#1a1205] border border-amber-600/40 text-amber-300 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400 font-cinzel font-bold">Lines:</span>
              <button
                disabled={isSpinning || isFreeSpins || activeLines <= 1}
                onClick={() => onChangeActiveLines(Math.max(1, activeLines - 5))}
                className="w-6 h-6 rounded bg-[#1a1205] border border-amber-600/40 text-amber-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-xs font-bold text-white">{activeLines}</span>
              <button
                disabled={isSpinning || isFreeSpins || activeLines >= 20}
                onClick={() => onChangeActiveLines(Math.min(20, activeLines + 5))}
                className="w-6 h-6 rounded bg-[#1a1205] border border-amber-600/40 text-amber-300 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={onToggleTurbo}
              className={`cursor-pointer px-2.5 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-1 border ${
                turboMode
                  ? 'bg-amber-500 text-slate-950 border-amber-300'
                  : 'bg-black/60 text-amber-300 border-amber-800'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Turbo</span>
            </button>

            <button
              onClick={onOpenWheelOfRa}
              className="cursor-pointer px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-gradient-to-r from-amber-600 to-yellow-600 text-white border border-amber-400 flex items-center gap-1"
            >
              <Sun className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Wheel of Ra</span>
            </button>
          </motion.div>
        )}

        {/* BOTTOM METERS BAR: BALANCE · WIN · BET (Exact Reference Layout) */}
        <div
          id="slot-meters-bar"
          className="mt-3 pt-2 border-t border-amber-900/40 grid grid-cols-3 gap-2 sm:gap-4 items-center text-center"
        >
          {/* BALANCE METER */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400/90 font-cinzel">
              BALANCE
            </span>
            <div className="w-full mt-1 py-1.5 px-2 rounded-full bg-[#050811] border border-amber-500/50 shadow-inner flex items-center justify-center">
              <span className="font-cinzel text-xs sm:text-sm md:text-base font-black text-amber-100 tracking-wider">
                {balance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* WIN METER */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400/90 font-cinzel">
              WIN
            </span>
            <div className="w-full mt-1 py-1.5 px-2 rounded-full bg-[#050811] border border-amber-500/50 shadow-inner flex items-center justify-center min-h-[32px]">
              <span className="font-sans text-xs sm:text-sm md:text-base font-black text-amber-300 tracking-wider">
                {lastResult && lastResult.totalWin > 0 ? `+${lastResult.totalWin.toLocaleString()}` : '0'}
              </span>
            </div>
          </div>

          {/* BET METER */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400/90 font-cinzel">
              BET
            </span>
            <div className="w-full mt-1 py-1.5 px-2 rounded-full bg-[#050811] border border-amber-500/50 shadow-inner flex items-center justify-center">
              <span className="font-cinzel text-xs sm:text-sm md:text-base font-black gold-text-gradient tracking-wider">
                {totalBet.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
