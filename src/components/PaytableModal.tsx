import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, X, Flame, Shield, Crown } from 'lucide-react';
import { EGYPTIAN_SYMBOLS } from '../data/egyptianSymbols';
import { PAYLINES } from '../data/paylines';
import { SymbolCell } from './SymbolCell';

interface PaytableModalProps {
  isOpen: boolean;
  onClose: () => void;
  betPerLine: number;
}

export const PaytableModal: React.FC<PaytableModalProps> = ({
  isOpen,
  onClose,
  betPerLine,
}) => {
  const [tab, setTab] = useState<'symbols' | 'features' | 'paylines'>('symbols');

  if (!isOpen) return null;

  const symbolList = Object.values(EGYPTIAN_SYMBOLS);

  return (
    <AnimatePresence>
      <div
        id="paytable-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-3xl bg-gradient-to-b from-[#181206] via-[#0d0903] to-[#060401] border-2 border-yellow-500/80 rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(234,179,8,0.4)] text-amber-100 max-h-[90vh] flex flex-col"
        >
          <button
            id="close-paytable-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-black font-cinzel gold-text-gradient">
              SACRED PAYTABLE & RULES
            </h2>
            <BookOpen className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-xs text-center text-amber-300/70 mb-3">
            Payout values shown below scale with your current line bet ({betPerLine.toLocaleString()} PTS)
          </p>

          {/* Navigation Tabs */}
          <div className="flex gap-2 p-1 bg-black/50 border border-amber-500/30 rounded-xl mb-3">
            <button
              id="tab-symbols-btn"
              onClick={() => setTab('symbols')}
              className={`flex-1 py-1.5 text-xs font-bold font-cinzel rounded-lg cursor-pointer transition-all ${
                tab === 'symbols'
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-amber-300/70 hover:text-amber-200'
              }`}
            >
              Symbol Payouts
            </button>
            <button
              id="tab-features-btn"
              onClick={() => setTab('features')}
              className={`flex-1 py-1.5 text-xs font-bold font-cinzel rounded-lg cursor-pointer transition-all ${
                tab === 'features'
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-amber-300/70 hover:text-amber-200'
              }`}
            >
              Bonus Features & Jackpots
            </button>
            <button
              id="tab-paylines-btn"
              onClick={() => setTab('paylines')}
              className={`flex-1 py-1.5 text-xs font-bold font-cinzel rounded-lg cursor-pointer transition-all ${
                tab === 'paylines'
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-amber-300/70 hover:text-amber-200'
              }`}
            >
              20 Paylines Guide
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {tab === 'symbols' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {symbolList.map((sym) => {
                  const isSarcophagus = sym.id === 'pharaoh_mask';
                  const isSphinx = sym.id === 'cleopatra';
                  const isWild = sym.id === 'eye_of_ra';
                  
                  return (
                    <div
                      key={sym.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isSarcophagus
                          ? 'col-span-1 sm:col-span-2 bg-gradient-to-r from-amber-950/70 via-yellow-950/50 to-amber-950/70 border-2 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.4)]'
                          : isSphinx || isWild
                          ? 'bg-gradient-to-r from-amber-950/40 to-black/60 border border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'bg-black/40 border border-amber-500/20'
                      }`}
                    >
                      <div className={`${isSarcophagus ? 'w-20 h-20 sm:w-24 sm:h-24' : isSphinx ? 'w-18 h-18 sm:w-20 sm:h-20' : 'w-16 h-16 sm:w-18 sm:h-18'} shrink-0`}>
                        <SymbolCell symbolId={sym.id} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`${isSarcophagus ? 'text-sm sm:text-base font-black text-yellow-300' : isSphinx ? 'text-xs sm:text-sm font-black text-amber-300' : 'text-xs font-bold text-white'} truncate font-cinzel`}>
                            {sym.name}
                          </span>
                          {isSarcophagus && (
                            <span className="text-[9px] font-black uppercase bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-1.5 py-0.5 rounded shadow">
                              GRAND JACKPOT TIER
                            </span>
                          )}
                          {isSphinx && (
                            <span className="text-[8.5px] font-black uppercase bg-gradient-to-r from-amber-600 to-amber-400 text-slate-950 px-1.5 py-0.5 rounded shadow">
                              HIGH TIER
                            </span>
                          )}
                        </div>
                        <div className={`${isSarcophagus ? 'text-[11px] text-amber-200' : isSphinx ? 'text-[10.5px] text-amber-200/90' : 'text-[10px] text-amber-300/70'} line-clamp-1 mb-1.5`}>
                          {sym.description}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-bold">
                          <span className={isSarcophagus || isSphinx ? 'text-yellow-300 font-black' : 'text-amber-400'}>
                            5x: {(sym.payouts[5] * betPerLine).toLocaleString()}
                          </span>
                          <span className="text-amber-400/90">
                            4x: {(sym.payouts[4] * betPerLine).toLocaleString()}
                          </span>
                          <span className="text-amber-400/70">
                            3x: {(sym.payouts[3] * betPerLine).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === 'features' && (
              <div className="space-y-3 text-xs text-amber-200/90 leading-relaxed">
                {/* Wild */}
                <div className="p-3 bg-amber-950/30 border border-yellow-500/40 rounded-xl">
                  <div className="flex items-center gap-2 text-yellow-300 font-bold font-cinzel mb-1 text-sm">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    Majestic Lion (Wild Multiplier)
                  </div>
                  <p>
                    The Majestic Lion Wild substitutes for all regular paying symbols to complete winning lines.
                    Whenever a Majestic Lion Wild participates in a payline win, it multiplies that line's
                    payout by 2x (or 3x during special cosmic events)!
                  </p>
                </div>

                {/* Bonus Chest */}
                <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-xl">
                  <div className="flex items-center gap-2 text-rose-300 font-bold font-cinzel mb-1 text-sm">
                    <Crown className="w-4 h-4 text-rose-400" />
                    Jeweled Treasure Chest (Bonus Game)
                  </div>
                  <p>
                    Landing 3 or more Jeweled Treasure Chest bonus scatters anywhere on the 5 reels triggers the
                    interactive Pharaoh Ra Pick & Win Golden Vault chamber. Pick ancient relics and chests to collect instant cash
                    multipliers, rare jewels, and sarcophagus treasures!
                  </p>
                </div>

                {/* Free Spins */}
                <div className="p-3 bg-pink-950/30 border border-pink-500/40 rounded-xl">
                  <div className="flex items-center gap-2 text-pink-300 font-bold font-cinzel mb-1 text-sm">
                    <Flame className="w-4 h-4 text-pink-400" />
                    Sacred Free Spins with Escalating Solar Multipliers
                  </div>
                  <p>
                    Landing 3+ Book of the Dead scatters awards 10 to 25 Free Spins. A special symbol is
                    chosen at random to expand across entire reels when 3+ appear, and each win increases
                    the Solar Multiplier (2x &rarr; 3x &rarr; 5x &rarr; 10x &rarr; 25x!).
                  </p>
                </div>

                {/* Progressive Jackpot */}
                <div className="p-3 bg-yellow-950/30 border border-yellow-400/60 rounded-xl">
                  <div className="flex items-center gap-2 text-yellow-300 font-bold font-cinzel mb-1 text-sm">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    4-Tier Progressive Jackpots (Mini, Minor, Major, Grand)
                  </div>
                  <p>
                    A fraction of every spin contributed across the realm feeds the 4 progressive pools.
                    Land 5 Golden Sarcophagi on Payline 1 to claim the monumental Grand Pharaoh Jackpot!
                  </p>
                </div>
              </div>
            )}

            {tab === 'paylines' && (
              <div className="space-y-2">
                <div className="text-xs text-amber-300/80 mb-2">
                  All 20 paylines pay from left-to-right starting from the leftmost reel (Reel 1).
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PAYLINES.map((line) => (
                    <div
                      key={line.id}
                      className="p-2 bg-black/40 border border-amber-500/20 rounded-lg flex items-center justify-between"
                    >
                      <span className="text-[11px] font-bold text-white">{line.name}</span>
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: line.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
