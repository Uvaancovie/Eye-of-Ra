import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Skull, Coins, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface BonusTombModalProps {
  isOpen: boolean;
  totalBet: number;
  onComplete: (bonusWin: number) => void;
}

interface RelicItem {
  id: number;
  type: 'coins' | 'multiplier' | 'gem' | 'curse';
  value: number;
  label: string;
  revealed: boolean;
}

const INITIAL_RELICS: RelicItem[] = [
  { id: 1, type: 'coins', value: 8, label: '8x Bet', revealed: false },
  { id: 2, type: 'multiplier', value: 15, label: '15x Bet', revealed: false },
  { id: 3, type: 'coins', value: 25, label: '25x Bet', revealed: false },
  { id: 4, type: 'gem', value: 50, label: 'Sacred Scarab Jewel (50x)', revealed: false },
  { id: 5, type: 'multiplier', value: 10, label: '10x Bet', revealed: false },
  { id: 6, type: 'coins', value: 35, label: '35x Bet', revealed: false },
  { id: 7, type: 'curse', value: 5, label: "Mummy's Curse (+5x Exit)", revealed: false },
  { id: 8, type: 'gem', value: 100, label: 'Pharaoh Sarcophagus Treasure (100x)', revealed: false },
];

export const BonusTombModal: React.FC<BonusTombModalProps> = ({
  isOpen,
  totalBet,
  onComplete,
}) => {
  const [relics, setRelics] = useState<RelicItem[]>(() =>
    [...INITIAL_RELICS].sort(() => Math.random() - 0.5)
  );
  const [accumulatedMultiplier, setAccumulatedMultiplier] = useState<number>(0);
  const [picksLeft, setPicksLeft] = useState<number>(4);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [lastRevealedText, setLastRevealedText] = useState<string>('');

  if (!isOpen) return null;

  const handlePick = (id: number) => {
    if (gameOver) return;
    const relic = relics.find((r) => r.id === id);
    if (!relic || relic.revealed) return;

    sound.playCoin();

    const updated = relics.map((r) => (r.id === id ? { ...r, revealed: true } : r));
    setRelics(updated);

    const newMult = accumulatedMultiplier + relic.value;
    setAccumulatedMultiplier(newMult);
    setLastRevealedText(relic.label);

    const newPicks = picksLeft - 1;
    setPicksLeft(newPicks);

    if (relic.type === 'curse' || newPicks <= 0) {
      setGameOver(true);
      sound.playBigWin();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#06b6d4', '#ec4899'],
      });
    }
  };

  const handleFinish = () => {
    const finalWin = Math.max(accumulatedMultiplier * totalBet, totalBet * 5);
    onComplete(finalWin);
  };

  const currentTotalWin = accumulatedMultiplier * totalBet;

  return (
    <AnimatePresence>
      <div
        id="bonus-tomb-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#1c1408] via-[#100b05] to-[#080502] border-2 border-yellow-500 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(234,179,8,0.5)] text-center text-amber-100 overflow-hidden"
        >
          {/* Ancient Flaming Torches background */}
          <div className="absolute top-2 left-3 flex items-center gap-1 text-amber-500 animate-flame">
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="absolute top-2 right-3 flex items-center gap-1 text-amber-500 animate-flame">
            <Flame className="w-5 h-5 text-amber-400" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h2 className="text-xl sm:text-3xl font-black font-cinzel gold-text-gradient">
              TOMB OF OSIRIS
            </h2>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm text-amber-300/80 mb-4 font-serif">
            Select sacred Relics & Canopic Jars to reveal ancient multipliers and treasures!
          </p>

          {/* Status HUD */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-5 bg-[#261b0c]/80 border border-amber-500/40 rounded-xl p-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                Picks Remaining
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-cinzel">
                {gameOver ? '0' : picksLeft}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                Accumulated Win
              </div>
              <div className="text-xl sm:text-2xl font-black gold-text-gradient font-cinzel">
                {currentTotalWin.toLocaleString()} <span className="text-xs">PTS</span>
              </div>
            </div>
          </div>

          {/* Relics Selection Grid */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mb-5 max-w-lg mx-auto">
            {relics.map((relic, idx) => (
              <motion.button
                key={relic.id}
                id={`bonus-relic-button-${idx}`}
                whileHover={!relic.revealed && !gameOver ? { scale: 1.05 } : {}}
                whileTap={!relic.revealed && !gameOver ? { scale: 0.95 } : {}}
                disabled={relic.revealed || gameOver}
                onClick={() => handlePick(relic.id)}
                className={`relative aspect-square rounded-xl p-2 flex flex-col items-center justify-center transition-all ${
                  relic.revealed
                    ? relic.type === 'curse'
                      ? 'bg-red-950/80 border-2 border-red-500 text-red-200'
                      : relic.type === 'gem'
                      ? 'bg-cyan-950/80 border-2 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                      : 'bg-amber-950/80 border-2 border-yellow-400 text-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                    : 'bg-gradient-to-b from-[#3a270f] to-[#1a1005] hover:from-[#4d3415] hover:to-[#2b1b0a] border-2 border-amber-600/70 shadow-lg cursor-pointer'
                }`}
              >
                {relic.revealed ? (
                  <div className="flex flex-col items-center">
                    {relic.type === 'curse' ? (
                      <Skull className="w-7 h-7 text-red-400 mb-1" />
                    ) : relic.type === 'gem' ? (
                      <Sparkles className="w-7 h-7 text-cyan-300 mb-1 animate-pulse" />
                    ) : (
                      <Coins className="w-7 h-7 text-yellow-400 mb-1" />
                    )}
                    <span className="text-[10px] sm:text-xs font-black font-cinzel">
                      +{relic.value}x
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mb-1">
                      <span className="text-amber-300 font-cinzel font-bold text-xs">
                        𓁿
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                      Relic {idx + 1}
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Last reveal note */}
          {lastRevealedText && (
            <div className="text-xs font-bold text-yellow-300 mb-3 animate-pulse">
              Found: {lastRevealedText}!
            </div>
          )}

          {/* Game Over Action */}
          {gameOver && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-4 pt-3 border-t border-amber-500/40 flex flex-col items-center"
            >
              <div className="text-lg sm:text-2xl font-black gold-text-gradient font-cinzel mb-2">
                TOTAL BONUS PRIZE: {currentTotalWin.toLocaleString()} PTS!
              </div>
              <button
                id="claim-bonus-button"
                onClick={handleFinish}
                className="cursor-pointer px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(234,179,8,0.8)] transition-all font-cinzel"
              >
                COLLECT BONUS TREASURE
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
