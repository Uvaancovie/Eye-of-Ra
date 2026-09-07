import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sparkles, Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface WheelOfRaModalProps {
  isOpen: boolean;
  totalBet: number;
  onClose: () => void;
  onAwardPrize: (amount: number, label: string) => void;
}

const SLICES = [
  { id: 1, multiplier: 10, label: '10x Bet', color: '#1e1b4b', textColor: '#a5f3fc' },
  { id: 2, multiplier: 25, label: '25x Bet', color: '#701a75', textColor: '#fbcfe8' },
  { id: 3, multiplier: 50, label: '50x Bet', color: '#854d0e', textColor: '#fef08a' },
  { id: 4, multiplier: 15, label: '15x Bet', color: '#1e293b', textColor: '#cbd5e1' },
  { id: 5, multiplier: 100, label: '100x Mega', color: '#991b1b', textColor: '#fecaca' },
  { id: 6, multiplier: 20, label: '20x Bet', color: '#064e3b', textColor: '#a7f3d0' },
  { id: 7, multiplier: 250, label: '250x Solar', color: '#7c2d12', textColor: '#fed7aa' },
  { id: 8, multiplier: 500, label: '500x Pharaoh', color: '#422006', textColor: '#fef08a' },
];

export const WheelOfRaModal: React.FC<WheelOfRaModalProps> = ({
  isOpen,
  totalBet,
  onClose,
  onAwardPrize,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonSlice, setWonSlice] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sound.playBonusTrigger();

    const selectedIndex = Math.floor(Math.random() * SLICES.length);
    const degreesPerSlice = 360 / SLICES.length;
    // Calculate final rotation (multiple full spins + align chosen slice with top pointer)
    const extraSpins = 360 * 5;
    const targetDegree = extraSpins + (360 - (selectedIndex * degreesPerSlice + degreesPerSlice / 2));
    
    setRotation(targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const chosen = SLICES[selectedIndex];
      setWonSlice(chosen);
      sound.playBigWin();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 4000);
  };

  const handleCollect = () => {
    if (wonSlice) {
      const win = wonSlice.multiplier * totalBet;
      onAwardPrize(win, wonSlice.label);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="wheel-of-ra-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#221708] via-[#140e04] to-[#0a0702] border-2 border-yellow-500 rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(234,179,8,0.6)] text-center text-amber-100 overflow-hidden"
        >
          <button
            id="close-wheel-modal-btn"
            onClick={onClose}
            disabled={isSpinning}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-1">
            <Sun className="w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
            <h2 className="text-2xl font-black font-cinzel gold-text-gradient">
              SOLAR WHEEL OF RA
            </h2>
          </div>
          <p className="text-xs text-amber-300/80 mb-4 font-serif">
            Spin the holy solar disk to unlock divine multiplier blessings!
          </p>

          {/* The Animated Wheel */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-5 flex items-center justify-center">
            {/* Top Pointer Indicator */}
            <div className="absolute -top-3 z-30 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-yellow-400 drop-shadow-[0_2px_8px_rgba(234,179,8,0.9)]" />
            </div>

            {/* Rotating Disk */}
            <motion.div
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
              }}
              className="relative w-full h-full rounded-full border-4 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.6)] overflow-hidden"
            >
              {SLICES.map((slice, i) => {
                const angle = i * (360 / SLICES.length);
                return (
                  <div
                    key={slice.id}
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                    className="absolute inset-0 flex items-start justify-center pt-2"
                  >
                    <div
                      style={{
                        backgroundColor: slice.color,
                        clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)',
                      }}
                      className="absolute inset-0 w-full h-full border-r border-yellow-500/30"
                    />
                    <span
                      style={{ color: slice.textColor }}
                      className="relative z-10 text-[11px] sm:text-xs font-black font-cinzel tracking-wider pt-2"
                    >
                      {slice.multiplier}x
                    </span>
                  </div>
                );
              })}

              {/* Wheel Center Hub */}
              <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-700 border-2 border-white shadow-xl flex items-center justify-center z-20">
                <Sun className="w-8 h-8 text-amber-950" />
              </div>
            </motion.div>
          </div>

          {/* Action / Result */}
          {!wonSlice ? (
            <button
              id="spin-wheel-of-ra-btn"
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className={`cursor-pointer px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(234,179,8,0.8)] font-cinzel transition-all ${
                isSpinning ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isSpinning ? 'SPINNING SOLAR DISK...' : 'SPIN WHEEL OF RA'}
            </button>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-xl font-black gold-text-gradient font-cinzel">
                WINNER: {wonSlice.label} ({(wonSlice.multiplier * totalBet).toLocaleString()} PTS)!
              </div>
              <button
                id="collect-wheel-prize-btn"
                onClick={handleCollect}
                className="cursor-pointer px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(234,179,8,0.8)] font-cinzel"
              >
                COLLECT REWARD
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
