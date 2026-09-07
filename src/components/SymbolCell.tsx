import React, { useState } from 'react';
import { SymbolId } from '../types';
import { EGYPTIAN_SYMBOLS } from '../data/egyptianSymbols';
import { motion } from 'motion/react';

interface SymbolCellProps {
  symbolId: SymbolId;
  isWinning?: boolean;
  isExpanding?: boolean;
  isBlurred?: boolean;
}

export const SymbolCell: React.FC<SymbolCellProps> = ({
  symbolId,
  isWinning = false,
  isExpanding = false,
  isBlurred = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const sym = EGYPTIAN_SYMBOLS[symbolId] || EGYPTIAN_SYMBOLS.royal_10;

  const renderIcon = () => {
    switch (symbolId) {
      // 1. MAJESTIC MYSTIC LION (Wild)
      case 'eye_of_ra':
        return (
          <div className="relative flex items-center justify-center w-full h-full p-0.5">
            <div className="relative w-full h-full max-w-[86px] max-h-[86px] rounded-lg overflow-hidden border-2 border-amber-400/90 shadow-[0_0_16px_rgba(245,158,11,0.85)] bg-black/80 flex items-center justify-center">
              <img
                src="https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/mystic-lion-symbol.jpg"
                alt="Majestic Lion Wild"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-md filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
              />
              {/* Golden Embossed WILD Badge Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-amber-950/95 via-yellow-500 to-amber-950/95 py-0.5 px-1 border-t border-amber-300 flex items-center justify-center shadow-md">
                <span className="text-[8px] sm:text-[9.5px] font-black text-slate-950 font-cinzel tracking-widest uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                  WILD
                </span>
              </div>
            </div>
          </div>
        );

      // 2. JEWELED TREASURE CHEST (Bonus)
      case 'scarab':
        return (
          <div className="relative flex items-center justify-center w-full h-full p-0.5">
            <div className="relative w-full h-full max-w-[86px] max-h-[86px] rounded-lg overflow-hidden border-2 border-rose-500/90 shadow-[0_0_16px_rgba(225,29,72,0.85)] bg-black/80 flex items-center justify-center">
              <img
                src="/symbols/bonus-treasure-chest.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/bonus-treasure-chest.jpg';
                }}
                alt="Bonus Treasure Chest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-md filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
              />
              {/* Embossed Ruby/Gold BONUS Banner */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-rose-950/95 via-rose-600 to-rose-950/95 py-0.5 px-1 border-t border-rose-300 flex items-center justify-center shadow-md">
                <span className="text-[8px] sm:text-[9.5px] font-black text-white font-cinzel tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  BONUS
                </span>
              </div>
            </div>
          </div>
        );

      // 3. HORUS GOLDEN FALCON WITH SPREAD WINGS - Reference Top Right
      case 'book_of_dead':
      case 'horus_falcon':
        return (
          <div className="relative flex items-center justify-center w-full h-full p-0.5">
            <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]">
              <defs>
                <linearGradient id="falconGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="30%" stopColor="#fde047" />
                  <stop offset="70%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#713f12" />
                </linearGradient>
                <linearGradient id="falconFeathersBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>

              {/* Majestic Sweeping Falcon Wings */}
              {/* Left Wing Outer Feathers */}
              <path d="M 50 42 C 30 18 12 25 10 48 C 18 55 35 48 50 52 Z" fill="url(#falconFeathersBlue)" stroke="url(#falconGold)" strokeWidth="1.5" />
              <path d="M 46 50 C 25 35 15 45 16 65 C 26 62 38 56 48 56 Z" fill="url(#falconGold)" stroke="#fde047" strokeWidth="1" />
              <path d="M 44 56 C 28 50 20 62 24 75 C 32 70 40 64 45 62 Z" fill="url(#falconFeathersBlue)" stroke="url(#falconGold)" strokeWidth="1" />

              {/* Right Wing Outer Feathers */}
              <path d="M 50 42 C 70 18 88 25 90 48 C 82 55 65 48 50 52 Z" fill="url(#falconFeathersBlue)" stroke="url(#falconGold)" strokeWidth="1.5" />
              <path d="M 54 50 C 75 35 85 45 84 65 C 74 62 62 56 52 56 Z" fill="url(#falconGold)" stroke="#fde047" strokeWidth="1" />
              <path d="M 56 56 C 72 50 80 62 76 75 C 68 70 60 64 55 62 Z" fill="url(#falconFeathersBlue)" stroke="url(#falconGold)" strokeWidth="1" />

              {/* Falcon Head & Beak */}
              <path d="M 44 32 Q 50 22 56 32 L 54 44 Q 50 46 46 44 Z" fill="url(#falconGold)" stroke="#451a03" strokeWidth="1.5" />
              <polygon points="50,42 54,45 46,45" fill="#451a03" />
              <ellipse cx="48" cy="35" rx="2" ry="1.5" fill="#06b6d4" />
              <ellipse cx="52" cy="35" rx="2" ry="1.5" fill="#06b6d4" />

              {/* Falcon Body & Tail Feathers */}
              <path d="M 44 46 Q 50 44 56 46 L 54 75 Q 50 88 46 75 Z" fill="url(#falconFeathersBlue)" stroke="url(#falconGold)" strokeWidth="1.5" />
              {/* Claws Holding Ruby Shen Rings */}
              <circle cx="40" cy="80" r="4.5" fill="#e11d48" stroke="url(#falconGold)" strokeWidth="1.5" />
              <circle cx="60" cy="80" r="4.5" fill="#e11d48" stroke="url(#falconGold)" strokeWidth="1.5" />
            </svg>
            <span className="absolute -bottom-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded shadow tracking-widest uppercase border border-cyan-300">
              SCATTER
            </span>
          </div>
        );

      // 4. GOLDEN SARCOPHAGUS (Grand Jackpot High Pay)
      case 'pharaoh_mask':
        return (
          <div className="relative flex items-center justify-center w-full h-full p-0.5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src="/symbols/golden-sarcophagus-symbol.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/golden-sarcophagus-symbol-bg-removebg-preview(1).png';
                }}
                alt="Golden Sarcophagus"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(250,204,21,0.9)] transition-transform duration-200"
              />
            </div>
          </div>
        );

      // 5. GOLDEN SPHINX (High Pay)
      case 'cleopatra':
        return (
          <div className="relative flex items-center justify-center w-full h-full p-0.5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src="/symbols/golden-sphinx-symbol.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/golden-sphinx-symbol.png';
                }}
                alt="Golden Sphinx"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(245,158,11,0.9)] transition-transform duration-200"
              />
            </div>
          </div>
        );

      // 6. GOLDEN PYRAMID WITH GLOWING APEX - Reference Golden Pyramid
      case 'anubis':
      case 'bastet_cat':
        return (
          <div className="relative flex items-center justify-center w-full h-full p-0.5">
            <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_16px_rgba(251,191,36,0.95)]">
              <defs>
                <linearGradient id="pyramidSideLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="pyramidSideRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="50%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>
                <radialGradient id="capstoneGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
              </defs>

              {/* Stepped Brick Textures */}
              {/* Left Sunlit Pyramid Face */}
              <polygon points="50,30 14,84 50,84" fill="url(#pyramidSideLeft)" stroke="#451a03" strokeWidth="1" />
              {/* Horizontal Brick Layer Lines on Left Face */}
              <line x1="42" y1="42" x2="22" y2="84" stroke="#ca8a04" strokeWidth="1" opacity="0.6" />
              <line x1="28" y1="64" x2="50" y2="64" stroke="#ca8a04" strokeWidth="1" opacity="0.6" />
              <line x1="20" y1="74" x2="50" y2="74" stroke="#ca8a04" strokeWidth="1" opacity="0.6" />

              {/* Right Shadowed Pyramid Face */}
              <polygon points="50,30 50,84 86,84" fill="url(#pyramidSideRight)" stroke="#451a03" strokeWidth="1" />
              <line x1="50" y1="64" x2="72" y2="64" stroke="#451a03" strokeWidth="1" opacity="0.6" />
              <line x1="50" y1="74" x2="80" y2="74" stroke="#451a03" strokeWidth="1" opacity="0.6" />

              {/* Glowing Radiant Golden Capstone at the Apex */}
              <polygon points="50,14 40,30 60,30" fill="url(#capstoneGlow)" filter="drop-shadow(0 0 8px #fde047)" stroke="#fff" strokeWidth="1" />
            </svg>
          </div>
        );

      // 7. GOLDEN ANKH (Medium Pay)
      case 'ankh':
        return (
          <div className="relative flex items-center justify-center w-full h-full p-0.5">
            <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_15px_rgba(234,179,8,0.9)]">
              <defs>
                <linearGradient id="ankhGold3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="25%" stopColor="#fde047" />
                  <stop offset="60%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#713f12" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="34" rx="14" ry="18" fill="none" stroke="url(#ankhGold3D)" strokeWidth="8" />
              <ellipse cx="50" cy="34" rx="10" ry="14" fill="none" stroke="#fef08a" strokeWidth="1.5" />
              <rect x="22" y="50" width="56" height="8" rx="2" fill="url(#ankhGold3D)" stroke="#fef08a" strokeWidth="1" />
              <circle cx="50" cy="54" r="4.5" fill="#06b6d4" stroke="#fef08a" strokeWidth="1" filter="drop-shadow(0 0 3px #38bdf8)" />
              <rect x="46" y="56" width="8" height="34" rx="2" fill="url(#ankhGold3D)" stroke="#fef08a" strokeWidth="1" />
            </svg>
          </div>
        );

      // 8. ROYAL A - Magenta Ruby Speckled Texture with Emerald/Cyan Center Diamond
      case 'royal_a':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_0_12px_rgba(244,63,94,0.9)]">
              <defs>
                <linearGradient id="goldBevelA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="bodyAColor" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>
              </defs>
              {/* Outer Golden Border & Magenta Body */}
              <path
                d="M 50 18 L 78 82 L 62 82 L 56 66 L 44 66 L 38 82 L 22 82 Z M 50 36 L 46 54 L 54 54 Z"
                fill="url(#bodyAColor)"
                stroke="url(#goldBevelA)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Center Emerald / Cyan Diamond Gem */}
              <polygon points="50,60 56,66 50,72 44,66" fill="#10b981" stroke="#fef08a" strokeWidth="1.5" filter="drop-shadow(0 0 4px #34d399)" />
            </svg>
          </div>
        );

      // 9. ROYAL K - Beveled Gold with Turquoise Stud
      case 'royal_k':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_0_12px_rgba(245,158,11,0.85)]">
              <defs>
                <linearGradient id="goldBevelK" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="bodyColorK" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
              <path
                d="M 28 20 L 42 20 L 42 46 L 62 20 L 78 20 L 54 50 L 78 82 L 62 82 L 42 54 L 42 82 L 28 82 Z"
                fill="url(#bodyColorK)"
                stroke="url(#goldBevelK)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <polygon points="35,14 40,20 35,26 30,20" fill="#06b6d4" stroke="#fef08a" strokeWidth="1.5" filter="drop-shadow(0 0 4px #22d3ee)" />
            </svg>
          </div>
        );

      // 10. ROYAL Q - Sculpted Solid Gold Loop with Turquoise Stud
      case 'royal_q':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_0_12px_rgba(234,179,8,0.85)]">
              <defs>
                <linearGradient id="goldBevelQ" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="bodyColorQ" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
              <path
                d="M 50 18 C 34 18 24 30 24 48 C 24 66 34 78 50 78 C 55 78 60 76 64 72 L 72 82 L 80 76 L 72 66 C 75 61 76 55 76 48 C 76 30 66 18 50 18 Z M 50 30 C 58 30 63 37 63 48 C 63 59 58 66 50 66 C 42 66 37 59 37 48 C 37 37 42 30 50 30 Z"
                fill="url(#bodyColorQ)"
                stroke="url(#goldBevelQ)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Turquoise Diamond Stud on Right Flank */}
              <polygon points="76,64 80,68 76,72 72,68" fill="#06b6d4" stroke="#fef08a" strokeWidth="1.5" filter="drop-shadow(0 0 4px #22d3ee)" />
            </svg>
          </div>
        );

      // 11. ROYAL J - Deep Lapis Blue with Gold Border and Turquoise Teardrop
      case 'royal_j':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]">
              <defs>
                <linearGradient id="goldBevelJ" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="bodyColorJ" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="40%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>
              <path
                d="M 52 20 L 66 20 L 66 60 C 66 74 56 82 42 82 C 28 82 22 74 22 66 L 36 66 C 36 69 38 72 42 72 C 48 72 52 68 52 60 Z"
                fill="url(#bodyColorJ)"
                stroke="url(#goldBevelJ)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Turquoise Teardrop Jewel on Left Wing of J */}
              <polygon points="34,34 38,40 34,46 30,40" fill="#06b6d4" stroke="#fef08a" strokeWidth="1.5" filter="drop-shadow(0 0 4px #22d3ee)" />
            </svg>
          </div>
        );

      // 12. ROYAL 10 - Rich Crimson Ruby Stippled Texture with Gold Bevel
      case 'royal_10':
      default:
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_0_12px_rgba(239,68,68,0.85)]">
              <defs>
                <linearGradient id="goldBevel10" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="bodyColor10" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="40%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>
              </defs>
              {/* Number 1 */}
              <path
                d="M 22 34 L 32 24 L 38 24 L 38 80 L 26 80 L 26 36 Z"
                fill="url(#bodyColor10)"
                stroke="url(#goldBevel10)"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Number 0 */}
              <path
                d="M 64 22 C 50 22 42 34 42 52 C 42 70 50 82 64 82 C 78 82 86 70 86 52 C 86 34 78 22 64 22 Z M 64 34 C 70 34 73 42 73 52 C 73 62 70 70 64 70 C 58 70 55 62 55 52 C 55 42 58 34 64 34 Z"
                fill="url(#bodyColor10)"
                stroke="url(#goldBevel10)"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      id={`symbol-cell-${symbolId}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 600 }}
      className={`relative w-full h-full flex flex-col items-center justify-center p-0.5 rounded-xl transition-all duration-300 ${
        isWinning
          ? 'bg-gradient-to-b from-amber-500/30 via-yellow-600/20 to-amber-950/60 ring-2 ring-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-[1.04] z-20'
          : 'bg-[#050811]/90 hover:bg-[#0a1020] border border-amber-500/20 hover:border-amber-400/60 shadow-inner'
      } ${isExpanding ? 'ring-4 ring-cyan-400 animate-pulse-glow' : ''} ${
        isBlurred ? 'filter blur-[1.5px] opacity-75' : ''
      }`}
    >
      {/* Ancient Gold Corner Accents */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-amber-400/70" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-amber-400/70" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-amber-400/70" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-amber-400/70" />

      {/* Symbol Graphics with 3D Hover & Celebration Animation */}
      <motion.div
        animate={
          isWinning
            ? { scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }
            : isHovered
            ? { scale: 1.1, y: -2 }
            : { scale: 1, rotate: 0, y: 0 }
        }
        transition={{
          scale: { duration: 0.2 },
          y: { duration: 0.2 },
          rotate: { repeat: isWinning ? Infinity : 0, duration: 1 },
        }}
        className="w-full h-full flex items-center justify-center cursor-pointer"
      >
        {renderIcon()}
      </motion.div>

      {/* Winning Gold Sparkle Sweep */}
      {isWinning && (
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-amber-300/35 to-transparent animate-gold-shine" />
        </div>
      )}
    </div>
  );
};

