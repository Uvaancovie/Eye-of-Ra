import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown, Zap, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audio';
import { MainPharaohAvatar } from './MainPharaohAvatar';

interface PharaohRaBannerProps {
  freeSpinsRemaining?: number;
  isFreeSpins?: boolean;
  isSpinning?: boolean;
  lastWinAmount?: number;
  customAvatarUrl?: string;
  onOpenFreeSpinsInfo?: () => void;
}

export const PharaohRaBanner: React.FC<PharaohRaBannerProps> = ({
  freeSpinsRemaining = 0,
  isFreeSpins = false,
  isSpinning = false,
  lastWinAmount = 0,
  customAvatarUrl,
  onOpenFreeSpinsInfo,
}) => {
  const [speechIndex, setSpeechIndex] = useState(0);
  const [showPharaohAura, setShowPharaohAura] = useState(true);

  const PHARAOH_QUOTES = [
    "By the divine light of Ra, fortune favors the bold!",
    "Spin the sacred reels and claim the lost gold of Egypt!",
    "My winged scepter commands the reels to align!",
    "The glowing scarab bestows royal blessings upon you!",
    "May the golden sands overflow your treasury!"
  ];

  const handlePharaohClick = () => {
    setSpeechIndex((prev) => (prev + 1) % PHARAOH_QUOTES.length);
    audioEngine.playJackpotChime();
  };

  const currentSpeech = isFreeSpins
    ? `⚡ ASCENDED FREE SPINS ACTIVE! (${freeSpinsRemaining} LEFT) MULTIPLIERS SURGING!`
    : lastWinAmount > 0
    ? `👑 THE GODS HAVE BLESSED YOU WITH A SPLENDID WIN OF R${(lastWinAmount / 100).toFixed(2)}!`
    : isSpinning
    ? "⚡ SPINNING THE SACRED WHEELS OF FORTUNE..."
    : PHARAOH_QUOTES[speechIndex];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 pt-1 pb-1 flex flex-col md:flex-row items-center justify-between gap-3 select-none">
      {/* LEFT: Large 3D Embossed "PHARAOH RA'S RICHES" Title */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative group cursor-pointer"
        >
          {/* Main Title 3D Engraved Gold Typography */}
          <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fffbeb] via-[#fcd34d] to-[#b45309] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] filter">
            PHARAOH
          </h1>
          <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fffbeb] via-[#fbbf24] to-[#78350f] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            RA'S RICHES
          </h2>

          {/* Underline Winged Gold Accent */}
          <div className="flex items-center gap-2 mt-0.5 justify-center md:justify-start">
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-amber-600" />
            <div className="w-2 h-2 rotate-45 bg-amber-400 border border-yellow-100 shadow-[0_0_8px_#f59e0b]" />
            <div className="w-10 h-0.5 bg-gradient-to-l from-transparent via-amber-400 to-amber-600" />
          </div>
        </motion.div>
      </div>

      {/* CENTER: THE MAIN GUY — SUPREME GOD-PHARAOH HERO BADGE & LIVE SPEECH */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handlePharaohClick}
        className="cursor-pointer relative flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#180d04]/90 via-[#271708]/90 to-[#0e172a]/90 border border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:border-amber-400 transition-all group max-w-md w-full justify-between"
      >
        {/* Divine Background Fire/Glow shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none rounded-2xl" />

        {/* Mini Portrait of the Main Character */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center">
          {/* Pulsing Aura Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 opacity-40 blur-md group-hover:opacity-75 transition-opacity animate-pulse" />
          
          <div className="relative w-full h-full rounded-full border-2 border-amber-400 overflow-hidden bg-gradient-to-b from-[#1e1b4b] to-[#020617] p-0.5 shadow-[0_0_10px_#f59e0b]">
            <MainPharaohAvatar size="full" customUrl={customAvatarUrl} />
          </div>
          
          <div className="absolute -bottom-1 -right-1 bg-amber-500 text-[9px] font-black text-slate-950 px-1 rounded-full border border-amber-300">
            MAIN
          </div>
        </div>

        {/* Dynamic Speech & Status */}
        <div className="flex-1 flex flex-col justify-center min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cinzel text-xs font-black text-amber-300 uppercase tracking-wide truncate">
              Supreme God-Pharaoh
            </span>
            <span className="text-[9px] text-amber-400/70 font-mono hidden sm:inline">(Tap to consult)</span>
          </div>
          <p className="text-[11px] sm:text-xs text-amber-100/90 font-medium leading-tight mt-0.5 line-clamp-2">
            "{currentSpeech}"
          </p>
        </div>
      </motion.div>

      {/* RIGHT: Golden Pyramid "FREE SPINS" Showcase Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        onClick={onOpenFreeSpinsInfo}
        className="cursor-pointer relative overflow-hidden bg-gradient-to-b from-[#081224] via-[#040813] to-[#01040a] border-2 border-amber-500/70 rounded-2xl p-2.5 sm:p-3 w-full max-w-[280px] sm:max-w-[300px] shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.3)] group flex-shrink-0"
      >
        {/* Divine Light Sunburst Rays behind pyramid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/25 via-cyan-500/10 to-transparent pointer-events-none" />

        {/* Top Header Label */}
        <div className="relative z-10 flex items-center justify-between pb-1 mb-1 border-b border-amber-500/30">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-cinzel text-xs sm:text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400">
              FREE SPINS
            </span>
          </div>
          {isFreeSpins ? (
            <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
              ACTIVE ({freeSpinsRemaining})
            </span>
          ) : (
            <span className="text-[10px] font-bold text-amber-400/80 font-cinzel">
              3+ SCATTERS
            </span>
          )}
        </div>

        {/* Radiant Golden Pyramid with Treasure Chests & Beams */}
        <div className="relative w-full h-16 sm:h-20 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#0b1528] to-[#02050c] border border-amber-500/30">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <defs>
              <linearGradient id="pyramidGoldSideL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="30%" stopColor="#fde047" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <linearGradient id="pyramidGoldSideR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <radialGradient id="pyramidDoorGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#fde047" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              <radialGradient id="sunburstBeams" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="rgba(253, 224, 71, 0.7)" />
                <stop offset="50%" stopColor="rgba(245, 158, 11, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Radiant Sunburst Rays */}
            <circle cx="100" cy="40" r="70" fill="url(#sunburstBeams)" />

            {/* Left & Right Temple Pillars */}
            <rect x="15" y="10" width="12" height="100" fill="#1e293b" stroke="#ca8a04" strokeWidth="1" />
            <rect x="12" y="8" width="18" height="6" fill="#ca8a04" />
            <rect x="173" y="10" width="12" height="100" fill="#1e293b" stroke="#ca8a04" strokeWidth="1" />
            <rect x="170" y="8" width="18" height="6" fill="#ca8a04" />

            {/* Central Radiant Golden Pyramid */}
            {/* Left Face */}
            <polygon points="100,15 45,95 100,95" fill="url(#pyramidGoldSideL)" stroke="#fef08a" strokeWidth="0.8" />
            {/* Right Face */}
            <polygon points="100,15 155,95 100,95" fill="url(#pyramidGoldSideR)" stroke="#fef08a" strokeWidth="0.8" />

            {/* Pyramid Glowing Golden Gateway / Portal */}
            <polygon points="100,45 80,95 120,95" fill="url(#pyramidDoorGlow)" filter="drop-shadow(0 0 10px #f59e0b)" />

            {/* Floating Golden Coin Orbs */}
            <circle cx="65" cy="45" r="4" fill="#fde047" stroke="#b45309" strokeWidth="1" className="animate-bounce" style={{ animationDuration: '2.5s' }} />
            <circle cx="135" cy="50" r="4.5" fill="#fde047" stroke="#b45309" strokeWidth="1" className="animate-bounce" style={{ animationDuration: '3s' }} />
            <circle cx="150" cy="35" r="3" fill="#fde047" stroke="#b45309" strokeWidth="1" className="animate-bounce" style={{ animationDuration: '2s' }} />

            {/* Open Jeweled Treasure Chests spilling gold coins */}
            {/* Left Chest */}
            <rect x="35" y="85" width="24" height="16" rx="2" fill="#78350f" stroke="#fde047" strokeWidth="1.5" />
            <ellipse cx="47" cy="85" rx="12" ry="5" fill="#e11d48" stroke="#fde047" strokeWidth="1" />
            <circle cx="47" cy="85" r="3" fill="#fde047" />

            {/* Center Main Treasure Chest */}
            <rect x="85" y="82" width="30" height="20" rx="3" fill="#881337" stroke="#fde047" strokeWidth="2" />
            <ellipse cx="100" cy="82" rx="15" ry="6" fill="#fbbf24" stroke="#fff" strokeWidth="1" />
            <circle cx="100" cy="82" r="3.5" fill="#e11d48" filter="drop-shadow(0 0 3px #f43f5e)" />

            {/* Right Chest */}
            <rect x="140" y="85" width="24" height="16" rx="2" fill="#78350f" stroke="#fde047" strokeWidth="1.5" />
            <ellipse cx="152" cy="85" rx="12" ry="5" fill="#0284c7" stroke="#fde047" strokeWidth="1" />
            <circle cx="152" cy="85" r="3" fill="#fde047" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

