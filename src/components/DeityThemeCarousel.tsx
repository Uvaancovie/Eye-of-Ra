import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Sun, Moon, Crown, Eye } from 'lucide-react';
import { RA_IMAGE_URL } from './RaSideCharacter';
import { ANUBIS_IMAGE_URL } from './AnubisSideCharacter';
import { CLEOPATRA_IMAGE_URL } from './CleopatraSideCharacter';
import { audioEngine } from '../utils/audio';

export type DeityThemeId = 'ra_solar' | 'anubis_crypt' | 'cleopatra_nile' | 'solo_slot';

export interface DeityThemeConfig {
  id: DeityThemeId;
  name: string;
  shortName: string;
  role: string;
  badge: string;
  icon: React.ReactNode;
  themeColor: string;
  bgGradient: string;
  ambientGlow: string;
  casingBorder: string;
  avatarUrl?: string;
  description: string;
}

export const DEITY_THEMES: Record<DeityThemeId, DeityThemeConfig> = {
  ra_solar: {
    id: 'ra_solar',
    name: 'Ra · Sun Sovereign',
    shortName: 'Ra',
    role: 'God of the Sun',
    badge: 'SOLAR REALM',
    icon: <Sun className="w-4 h-4 text-amber-400" />,
    themeColor: '#f59e0b',
    bgGradient: 'from-[#1c1003] via-[#0d0701] to-[#040200]',
    ambientGlow: 'rgba(245, 158, 11, 0.22)',
    casingBorder: 'border-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.25)]',
    avatarUrl: RA_IMAGE_URL,
    description: 'Bask in the golden sun of Ra. Solar blessings flow through the reels.',
  },
  anubis_crypt: {
    id: 'anubis_crypt',
    name: 'Anubis · Jackal Lord',
    shortName: 'Anubis',
    role: 'Guardian of the Crypts',
    badge: 'SHADOW CRYPT',
    icon: <Moon className="w-4 h-4 text-purple-400" />,
    themeColor: '#a855f7',
    bgGradient: 'from-[#170724] via-[#0a0314] to-[#030107]',
    ambientGlow: 'rgba(168, 85, 247, 0.25)',
    casingBorder: 'border-purple-500/80 shadow-[0_0_50px_rgba(168,85,247,0.25)]',
    avatarUrl: ANUBIS_IMAGE_URL,
    description: 'Weigh your heart in the sacred tombs. Mystical treasures unlock.',
  },
  cleopatra_nile: {
    id: 'cleopatra_nile',
    name: 'Cleopatra · Queen of the Nile',
    shortName: 'Cleopatra',
    role: 'Empress of Egypt',
    badge: 'ROYAL DYNASTY',
    icon: <Crown className="w-4 h-4 text-emerald-400" />,
    themeColor: '#10b981',
    bgGradient: 'from-[#041d15] via-[#020e0a] to-[#010604]',
    ambientGlow: 'rgba(16, 185, 129, 0.25)',
    casingBorder: 'border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.25)]',
    avatarUrl: CLEOPATRA_IMAGE_URL,
    description: 'Reign with the Empress. The royal wealth of the Nile flows to you.',
  },
  solo_slot: {
    id: 'solo_slot',
    name: 'Max Reels Focus',
    shortName: 'Solo Reels',
    role: 'Expanded Stage',
    badge: 'STAGE FOCUS',
    icon: <Eye className="w-4 h-4 text-cyan-400" />,
    themeColor: '#06b6d4',
    bgGradient: 'from-[#08121d] via-[#04080e] to-[#010306]',
    ambientGlow: 'rgba(6, 182, 212, 0.16)',
    casingBorder: 'border-cyan-500/80 shadow-[0_0_50px_rgba(6,182,212,0.25)]',
    description: 'Maximum expanded slot table without side character.',
  },
};

const THEME_KEYS: DeityThemeId[] = ['ra_solar', 'anubis_crypt', 'cleopatra_nile', 'solo_slot'];

interface DeityThemeCarouselProps {
  currentTheme: DeityThemeId;
  onSelectTheme: (themeId: DeityThemeId) => void;
}

export const DeityThemeCarousel: React.FC<DeityThemeCarouselProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const currentIndex = THEME_KEYS.indexOf(currentTheme);

  const handlePrev = () => {
    try {
      audioEngine.playButtonClick();
    } catch {}
    const nextIdx = (currentIndex - 1 + THEME_KEYS.length) % THEME_KEYS.length;
    onSelectTheme(THEME_KEYS[nextIdx]);
  };

  const handleNext = () => {
    try {
      audioEngine.playButtonClick();
    } catch {}
    const nextIdx = (currentIndex + 1) % THEME_KEYS.length;
    onSelectTheme(THEME_KEYS[nextIdx]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-2 px-2 select-none">
      <div className="relative flex items-center justify-between gap-2 p-2 rounded-2xl bg-black/70 border border-amber-500/50 backdrop-blur-md shadow-2xl">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          title="Previous Character"
          className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1c1205] hover:bg-amber-600/30 border border-amber-500/60 text-amber-300 flex items-center justify-center transition-all active:scale-90 hover:scale-105 shadow-md flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Character Selector Tabs */}
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
          {THEME_KEYS.map((themeId) => {
            const cfg = DEITY_THEMES[themeId];
            const isSelected = currentTheme === themeId;

            return (
              <motion.button
                key={themeId}
                onClick={() => {
                  if (!isSelected) {
                    try {
                      audioEngine.playButtonClick();
                    } catch {}
                    onSelectTheme(themeId);
                  }
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2.5 transition-all whitespace-nowrap border relative overflow-hidden ${
                  isSelected
                    ? themeId === 'ra_solar'
                      ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 border-yellow-200 shadow-[0_0_20px_rgba(245,158,11,0.7)] font-black'
                      : themeId === 'anubis_crypt'
                      ? 'bg-gradient-to-r from-purple-700 via-indigo-500 to-purple-700 text-white border-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.7)] font-black'
                      : themeId === 'cleopatra_nile'
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600 text-slate-950 border-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.7)] font-black'
                      : 'bg-gradient-to-r from-cyan-600 via-sky-400 to-cyan-600 text-slate-950 border-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.7)] font-black'
                    : 'bg-black/50 hover:bg-white/10 text-amber-200/80 border-amber-900/60 hover:border-amber-500/60'
                }`}
              >
                {/* Character Thumbnail / Icon */}
                {cfg.avatarUrl ? (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 border border-current flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={cfg.avatarUrl}
                      alt={cfg.shortName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 border border-current flex items-center justify-center flex-shrink-0">
                    {cfg.icon}
                  </div>
                )}

                <div className="flex flex-col items-start leading-tight text-left">
                  <span className="text-xs sm:text-sm font-bold tracking-wide">{cfg.shortName}</span>
                  <span
                    className={`text-[9px] uppercase tracking-wider ${
                      isSelected ? 'opacity-90' : 'text-amber-400/60'
                    }`}
                  >
                    {cfg.badge}
                  </span>
                </div>

                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse ml-1" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          title="Next Character"
          className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1c1205] hover:bg-amber-600/30 border border-amber-500/60 text-amber-300 flex items-center justify-center transition-all active:scale-90 hover:scale-105 shadow-md flex-shrink-0"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};
