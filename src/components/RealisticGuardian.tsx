import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Flame, Shield, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export type GuardianId = 'ra_sun_god' | 'anubis_guardian' | 'pharaoh_god' | 'centurion_commander';

export interface GuardianData {
  id: GuardianId;
  name: string;
  title: string;
  element: string;
  primaryColor: string;
  glowColor: string;
  blessing: string;
  blessingEffect: string;
  quote: string;
  imageUrl?: string;
}

export const RA_IMAGE_URL = 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/ra.png';

export const GUARDIANS: Record<GuardianId, GuardianData> = {
  ra_sun_god: {
    id: 'ra_sun_god',
    name: 'Ra The Sun Sovereign',
    title: 'Supreme Lord of Light',
    element: 'Solar Light',
    primaryColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.9)',
    blessing: 'Solar Radiance',
    blessingEffect: '+10% Wild Multiplier Chance',
    quote: '"Let the divine light of the sun reveal eternal fortunes!"',
    imageUrl: RA_IMAGE_URL,
  },
  anubis_guardian: {
    id: 'anubis_guardian',
    name: 'Anubis Tomb Guardian',
    title: 'Warden of the Sacred Underworld',
    element: 'Astral Cyan',
    primaryColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.9)',
    blessing: 'Soul Shield',
    blessingEffect: 'Bonus Tomb Re-pick Protection',
    quote: '"The scales of judgment weigh in your favor, mortal."',
  },
  pharaoh_god: {
    id: 'pharaoh_god',
    name: 'God-Pharaoh Amun',
    title: 'Bearer of the Crown of Eternity',
    element: 'Royal Gold',
    primaryColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.9)',
    blessing: 'Pharaoh\'s Treasury',
    blessingEffect: 'Escalates Progressive Jackpot Boosts',
    quote: '"My golden empire bestows boundless riches upon the worthy."',
  },
  centurion_commander: {
    id: 'centurion_commander',
    name: 'Centurion Aurelius',
    title: 'Imperial Guardian of Egypt',
    element: 'Crimson Fire',
    primaryColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.9)',
    blessing: 'Legion Valor',
    blessingEffect: 'Turbo Spin Combo Streak Amplifier',
    quote: '"Victory and honor to those who dare the reels of fortune!"',
  },
};

const GUARDIAN_KEYS: GuardianId[] = ['ra_sun_god', 'anubis_guardian', 'pharaoh_god', 'centurion_commander'];

interface RealisticGuardianProps {
  isSpinning?: boolean;
  winAmount?: number;
  isFreeSpins?: boolean;
  selectedGuardian?: GuardianId;
  onSelectGuardian?: (id: GuardianId) => void;
  position?: 'left' | 'right' | 'hero';
}

export const RealisticGuardian: React.FC<RealisticGuardianProps> = ({
  isSpinning = false,
  winAmount = 0,
  isFreeSpins = false,
  selectedGuardian = 'ra_sun_god',
  onSelectGuardian,
  position = 'left',
}) => {
  const [activeId, setActiveId] = useState<GuardianId>(selectedGuardian);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showBlessingBubble, setShowBlessingBubble] = useState(false);
  const [isEmpowered, setIsEmpowered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedGuardian) {
      setActiveId(selectedGuardian);
    }
  }, [selectedGuardian]);

  // Handle win reactions
  useEffect(() => {
    if (winAmount > 0) {
      setIsEmpowered(true);
      setShowBlessingBubble(true);
      const timer = setTimeout(() => {
        setIsEmpowered(false);
        setShowBlessingBubble(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [winAmount]);

  const guardian = GUARDIANS[activeId];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Normalized tilt
    setTilt({
      x: (y / rect.height) * -16,
      y: (x / rect.width) * 16,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleNextGuardian = (e: React.MouseEvent) => {
    e.stopPropagation();
    const curIdx = GUARDIAN_KEYS.indexOf(activeId);
    const nextIdx = (curIdx + 1) % GUARDIAN_KEYS.length;
    const nextId = GUARDIAN_KEYS[nextIdx];
    setActiveId(nextId);
    onSelectGuardian?.(nextId);
    audioEngine.playJackpotChime();
  };

  const handlePrevGuardian = (e: React.MouseEvent) => {
    e.stopPropagation();
    const curIdx = GUARDIAN_KEYS.indexOf(activeId);
    const prevIdx = (curIdx - 1 + GUARDIAN_KEYS.length) % GUARDIAN_KEYS.length;
    const prevId = GUARDIAN_KEYS[prevIdx];
    setActiveId(prevId);
    onSelectGuardian?.(prevId);
    audioEngine.playJackpotChime();
  };

  const handleGuardianClick = () => {
    setShowBlessingBubble(prev => !prev);
    setIsEmpowered(true);
    audioEngine.playBigWin();
    setTimeout(() => setIsEmpowered(false), 2000);
  };

  // Render SVG illustration representing realistic gaming character art
  const renderRealisticCharacterArt = () => {
    switch (activeId) {
      case 'ra_sun_god':
        return (
          <svg viewBox="0 0 300 420" className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="raArmorGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7b2" />
                <stop offset="30%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="raBeardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <radialGradient id="raCyanGem" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="40%" stopColor="#06b6d4" />
                <stop offset="80%" stopColor="#083344" />
              </radialGradient>
              <radialGradient id="raEyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="40%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <linearGradient id="sunWheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>

            {/* Back Sun Halo Wheel / Divine Ring */}
            <motion.g
              animate={{ rotate: isSpinning ? 360 : [0, 360] }}
              transition={{ repeat: Infinity, duration: isSpinning ? 6 : 25, ease: 'linear' }}
              style={{ transformOrigin: '150px 90px' }}
            >
              <circle cx="150" cy="90" r="75" fill="none" stroke="url(#sunWheelGrad)" strokeWidth="12" strokeDasharray="16 8" opacity="0.85" />
              <circle cx="150" cy="90" r="82" fill="none" stroke="#fef08a" strokeWidth="2" opacity="0.5" />
              {/* Gem crest at top */}
              <polygon points="150,4 162,20 150,28 138,20" fill="url(#raCyanGem)" stroke="#fef08a" strokeWidth="2" />
            </motion.g>

            {/* Golden Staff (Left Hand Side) */}
            <g className="cursor-pointer">
              {/* Staff Shaft */}
              <rect x="36" y="60" width="10" height="340" rx="4" fill="url(#raArmorGold)" stroke="#fef08a" strokeWidth="1.5" />
              {/* Staff Head - Winged Trident with Cyan Orb */}
              <path d="M 41 12 C 15 35 15 80 41 95 C 67 80 67 35 41 12 Z" fill="url(#raArmorGold)" stroke="#fef08a" strokeWidth="2.5" />
              <circle cx="41" cy="55" r="18" fill="url(#raCyanGem)" stroke="#fef08a" strokeWidth="2" />
              <motion.circle
                cx="41"
                cy="55"
                r="18"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="4"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ transformOrigin: '41px 55px' }}
              />
              <path d="M 41 8 L 34 32 L 41 24 L 48 32 Z" fill="#fef08a" />
            </g>

            {/* Main Character Body & Armor */}
            {/* Massive Golden Pauldrons (Shoulders) */}
            <path d="M 70 180 C 70 125 100 130 145 150 L 140 240 C 95 240 70 215 70 180 Z" fill="url(#raArmorGold)" stroke="#fef08a" strokeWidth="2" />
            <path d="M 230 180 C 230 125 200 130 155 150 L 160 240 C 205 240 230 215 230 180 Z" fill="url(#raArmorGold)" stroke="#fef08a" strokeWidth="2" />

            {/* Shoulder Cyan Gem Medallions */}
            <circle cx="95" cy="175" r="13" fill="url(#raCyanGem)" stroke="#fef08a" strokeWidth="2" />
            <circle cx="205" cy="175" r="13" fill="url(#raCyanGem)" stroke="#fef08a" strokeWidth="2" />

            {/* Chestplate Armor */}
            <path d="M 105 170 Q 150 185 195 170 L 210 290 Q 150 320 90 290 Z" fill="url(#raArmorGold)" stroke="#fef08a" strokeWidth="3" />
            {/* Chest Cyan Core Gem */}
            <circle cx="150" cy="235" r="16" fill="url(#raCyanGem)" stroke="#fef08a" strokeWidth="2.5" />
            {/* Segmented Abdominal plates */}
            <path d="M 115 285 L 185 285 L 180 340 L 120 340 Z" fill="url(#raArmorGold)" stroke="#92400e" strokeWidth="2" />
            <path d="M 120 340 L 180 340 L 175 400 L 125 400 Z" fill="url(#raArmorGold)" stroke="#92400e" strokeWidth="2" />

            {/* Arm & Vambraces holding the staff */}
            <path d="M 68 210 L 45 250 L 58 310 L 88 280 Z" fill="url(#raArmorGold)" stroke="#fef08a" strokeWidth="2" />
            <circle cx="58" cy="275" r="8" fill="url(#raCyanGem)" stroke="#fef08a" strokeWidth="1.5" />

            {/* Silver Flowing Beard & Hair */}
            <path d="M 120 135 C 100 190 120 260 145 295 C 160 260 190 200 180 135 Z" fill="url(#raBeardGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 130 150 Q 150 240 140 280" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M 160 150 Q 155 240 165 275" stroke="#94a3b8" strokeWidth="2" fill="none" />

            {/* Godly Face */}
            <path d="M 122 80 Q 150 78 178 80 L 175 140 Q 150 160 125 140 Z" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
            <path d="M 128 92 Q 150 90 172 92 L 170 130 Q 150 145 130 130 Z" fill="#f59e0b" />

            {/* Glowing Amber Godly Eyes */}
            <ellipse cx="138" cy="108" rx="6.5" ry="4.5" fill="url(#raEyeGlow)" filter="drop-shadow(0 0 6px #fbbf24)" />
            <ellipse cx="162" cy="108" rx="6.5" ry="4.5" fill="url(#raEyeGlow)" filter="drop-shadow(0 0 6px #fbbf24)" />
            {/* Eye Flare Energy */}
            <motion.line
              x1="130"
              y1="108"
              x2="146"
              y2="108"
              stroke="#ffffff"
              strokeWidth="2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.line
              x1="154"
              y1="108"
              x2="170"
              y2="108"
              stroke="#ffffff"
              strokeWidth="2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />

            {/* Winged Golden Headdress / Crown */}
            <path d="M 150 40 L 115 75 L 85 45 L 125 78 L 150 70 L 175 78 L 215 45 L 185 75 Z" fill="url(#raArmorGold)" stroke="#fef08a" strokeWidth="2.5" />
            {/* Wing Feathers extending up */}
            <path d="M 130 65 C 100 20 80 25 70 30 C 95 45 115 65 125 75 Z" fill="url(#raBeardGrad)" stroke="#fef08a" strokeWidth="2" />
            <path d="M 170 65 C 200 20 220 25 230 30 C 205 45 185 65 175 75 Z" fill="url(#raBeardGrad)" stroke="#fef08a" strokeWidth="2" />
            {/* Center Crown Cyan Diamond */}
            <polygon points="150,45 160,65 150,75 140,65" fill="url(#raCyanGem)" stroke="#fef08a" strokeWidth="2" />
          </svg>
        );

      case 'anubis_guardian':
        return (
          <svg viewBox="0 0 300 420" className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="anubisArmorGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3b0" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="75%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="anubisObsidian" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <radialGradient id="anubisCyanEye" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#38bdf8" />
                <stop offset="80%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </radialGradient>
              <linearGradient id="lapisStripe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>

            {/* Back Sun Disk & Solar Wings */}
            <g>
              <circle cx="150" cy="110" r="70" fill="none" stroke="url(#anubisArmorGold)" strokeWidth="6" opacity="0.6" />
              <path d="M 70 120 Q 150 80 230 120" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.7" />
            </g>

            {/* Right Hand Winged Sun Scepter */}
            <g>
              <rect x="238" y="40" width="8" height="360" rx="3" fill="url(#anubisArmorGold)" stroke="#fef08a" strokeWidth="1.5" />
              {/* Scepter Winged Disk */}
              <circle cx="242" cy="50" r="18" fill="url(#anubisCyanEye)" stroke="#fef08a" strokeWidth="2.5" />
              <path d="M 218 50 Q 242 30 266 50 L 260 62 Q 242 45 224 62 Z" fill="url(#anubisArmorGold)" stroke="#fef08a" strokeWidth="1.5" />
              <line x1="210" y1="50" x2="274" y2="50" stroke="#fef08a" strokeWidth="2" />
            </g>

            {/* Anubis Tall Pointed Jackal Ears */}
            <path d="M 112 18 L 138 95 L 98 95 Z" fill="url(#anubisObsidian)" stroke="url(#anubisArmorGold)" strokeWidth="2.5" />
            <path d="M 112 28 L 132 88 L 105 88 Z" fill="#0284c7" opacity="0.5" />
            <path d="M 188 18 L 162 95 L 202 95 Z" fill="url(#anubisObsidian)" stroke="url(#anubisArmorGold)" strokeWidth="2.5" />
            <path d="M 188 28 L 168 88 L 195 88 Z" fill="#0284c7" opacity="0.5" />

            {/* Nemes Headdress Gold & Blue Stripes Flanking Head */}
            <path d="M 90 95 L 68 185 L 105 195 L 115 115 Z" fill="url(#lapisStripe)" stroke="url(#anubisArmorGold)" strokeWidth="2" />
            <path d="M 210 95 L 232 185 L 195 195 L 185 115 Z" fill="url(#lapisStripe)" stroke="url(#anubisArmorGold)" strokeWidth="2" />

            {/* Jackal Head & Snout */}
            <path d="M 115 90 Q 150 80 185 90 L 175 145 L 150 178 L 125 145 Z" fill="url(#anubisObsidian)" stroke="url(#anubisArmorGold)" strokeWidth="2.5" />
            {/* Nose Tip */}
            <polygon points="150,165 142,154 158,154" fill="#000000" stroke="#38bdf8" strokeWidth="1" />

            {/* Glowing Cyan Blue Mystic Eyes */}
            <ellipse cx="132" cy="118" rx="7" ry="4" fill="url(#anubisCyanEye)" filter="drop-shadow(0 0 8px #06b6d4)" />
            <ellipse cx="168" cy="118" rx="7" ry="4" fill="url(#anubisCyanEye)" filter="drop-shadow(0 0 8px #06b6d4)" />

            {/* Glowing Eye Pupils */}
            <circle cx="132" cy="118" r="2" fill="#ffffff" />
            <circle cx="168" cy="118" r="2" fill="#ffffff" />

            {/* Massive Ornate Golden Armor Shoulders & Lion Crest */}
            <path d="M 60 190 Q 105 160 150 180 Q 195 160 240 190 L 225 260 Q 150 280 75 260 Z" fill="url(#anubisArmorGold)" stroke="#fef08a" strokeWidth="2.5" />
            {/* Left Lion Pauldron */}
            <circle cx="82" cy="205" r="16" fill="url(#anubisArmorGold)" stroke="#fef08a" strokeWidth="2" />
            <path d="M 75 200 Q 82 195 90 200 L 86 212 L 78 212 Z" fill="#92400e" />

            {/* Golden Collar with Hieroglyphic Inlays */}
            <path d="M 105 180 Q 150 215 195 180 L 185 240 Q 150 260 115 240 Z" fill="url(#lapisStripe)" stroke="#fef08a" strokeWidth="2" />

            {/* Ornate Gold Belt & Medallion */}
            <path d="M 95 280 L 205 280 L 195 380 L 105 380 Z" fill="url(#anubisArmorGold)" stroke="#78350f" strokeWidth="2" />
            <circle cx="150" cy="315" r="20" fill="url(#anubisArmorGold)" stroke="#fef08a" strokeWidth="3" />
            <circle cx="150" cy="315" r="10" fill="url(#anubisCyanEye)" />

            {/* Left Vambrace & Claws */}
            <path d="M 68 250 L 52 310 L 72 320 L 88 270 Z" fill="url(#anubisObsidian)" stroke="url(#anubisArmorGold)" strokeWidth="2" />
          </svg>
        );

      case 'pharaoh_god':
        return (
          <svg viewBox="0 0 300 420" className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="pharaohGoldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="35%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#713f12" />
              </linearGradient>
              <radialGradient id="rubyGlow" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="40%" stopColor="#e11d48" />
                <stop offset="80%" stopColor="#881337" />
              </radialGradient>
              <radialGradient id="pharaohEyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#ea580c" />
              </radialGradient>
            </defs>

            {/* Temple Backdrop Columns Flare */}
            <g opacity="0.7">
              <rect x="25" y="30" width="30" height="360" fill="url(#pharaohGoldMetal)" opacity="0.3" />
              <rect x="245" y="30" width="30" height="360" fill="url(#pharaohGoldMetal)" opacity="0.3" />
            </g>

            {/* Grand Nemes Headdress (Broad Gold & Dark Red Stripes) */}
            <path d="M 60 70 Q 150 15 240 70 L 265 210 L 225 230 L 210 130 L 90 130 L 75 230 L 35 210 Z" fill="url(#pharaohGoldMetal)" stroke="#78350f" strokeWidth="3" />
            {/* Headdress Stripes */}
            <path d="M 80 80 L 55 190" stroke="#7f1d1d" strokeWidth="8" />
            <path d="M 100 65 L 75 180" stroke="#7f1d1d" strokeWidth="8" />
            <path d="M 220 80 L 245 190" stroke="#7f1d1d" strokeWidth="8" />
            <path d="M 200 65 L 225 180" stroke="#7f1d1d" strokeWidth="8" />

            {/* Forehead Winged Crown & Royal Ruby */}
            <path d="M 115 50 Q 150 35 185 50 L 175 75 L 125 75 Z" fill="url(#pharaohGoldMetal)" stroke="#fef08a" strokeWidth="2" />
            {/* Crown Wings */}
            <path d="M 115 50 C 90 20 80 25 70 30 C 95 45 110 60 120 70 Z" fill="url(#pharaohGoldMetal)" stroke="#fef08a" strokeWidth="1.5" />
            <path d="M 185 50 C 210 20 220 25 230 30 C 205 45 190 60 180 70 Z" fill="url(#pharaohGoldMetal)" stroke="#fef08a" strokeWidth="1.5" />
            {/* Center Ruby Gem */}
            <polygon points="150,30 164,48 150,62 136,48" fill="url(#rubyGlow)" stroke="#fef08a" strokeWidth="2" />

            {/* Divine Face */}
            <path d="M 105 85 Q 150 82 195 85 L 188 155 Q 150 185 112 155 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
            {/* High Cheekbones */}
            <path d="M 112 95 Q 150 92 188 95 L 180 145 Q 150 170 120 145 Z" fill="#f59e0b" />

            {/* Glowing Golden Godly Eyes */}
            <ellipse cx="132" cy="115" rx="8" ry="4.5" fill="url(#pharaohEyeGlow)" filter="drop-shadow(0 0 8px #f59e0b)" />
            <ellipse cx="168" cy="115" rx="8" ry="4.5" fill="url(#pharaohEyeGlow)" filter="drop-shadow(0 0 8px #f59e0b)" />
            <circle cx="132" cy="115" r="2.5" fill="#ffffff" />
            <circle cx="168" cy="115" r="2.5" fill="#ffffff" />

            {/* Long Braided Ceremonial Gold & Lapis Beard */}
            <path d="M 144 175 L 156 175 L 153 255 L 147 255 Z" fill="url(#pharaohGoldMetal)" stroke="#1e3a8a" strokeWidth="2" />

            {/* Massive Gilded Broad Collar (Usekh) */}
            <path d="M 70 175 Q 150 230 230 175 L 245 285 Q 150 340 55 285 Z" fill="url(#pharaohGoldMetal)" stroke="#fef08a" strokeWidth="3" />
            <circle cx="150" cy="275" r="22" fill="url(#pharaohGoldMetal)" stroke="#fef08a" strokeWidth="2.5" />
            <polygon points="150,260 162,275 150,290 138,275" fill="url(#rubyGlow)" stroke="#fef08a" strokeWidth="1.5" />

            {/* Muscle-Curved Golden Breastplate */}
            <path d="M 85 280 Q 150 310 215 280 L 205 390 Q 150 410 95 390 Z" fill="url(#pharaohGoldMetal)" stroke="#78350f" strokeWidth="3" />
          </svg>
        );

      case 'centurion_commander':
        return (
          <svg viewBox="0 0 300 420" className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="centurionBronze" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="35%" stopColor="#ea580c" />
                <stop offset="70%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#431407" />
              </linearGradient>
              <linearGradient id="crimsonCape" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>
            </defs>

            {/* Flowing Crimson Cloak */}
            <path d="M 60 160 C 20 220 30 350 50 410 L 250 410 C 270 350 280 220 240 160 Z" fill="url(#crimsonCape)" stroke="#881337" strokeWidth="2" />

            {/* Roman Golden Plumed Helmet */}
            <path d="M 110 50 Q 150 30 190 50 L 195 125 L 105 125 Z" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="2.5" />
            {/* Red Helmet Plume Crest */}
            <path d="M 135 15 C 135 5 165 5 165 15 L 160 55 L 140 55 Z" fill="url(#crimsonCape)" stroke="#fef08a" strokeWidth="2" />
            {/* Helmet Forehead Brow */}
            <path d="M 105 75 Q 150 65 195 75 L 190 100 Q 150 90 110 100 Z" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="2" />

            {/* Commander Face */}
            <path d="M 118 90 Q 150 88 182 90 L 175 145 Q 150 165 125 145 Z" fill="#fb923c" stroke="#9a3412" strokeWidth="1.5" />
            {/* Confident Eyes */}
            <ellipse cx="138" cy="112" rx="5" ry="3" fill="#1e293b" />
            <ellipse cx="162" cy="112" rx="5" ry="3" fill="#1e293b" />
            <circle cx="137" cy="111" r="1.5" fill="#ffffff" />
            <circle cx="161" cy="111" r="1.5" fill="#ffffff" />
            {/* Commander Moustache & Jaw */}
            <path d="M 132 135 Q 150 142 168 135 Q 150 130 132 135 Z" fill="#431407" />

            {/* Layered Shoulder Pauldrons (Spalder / Segmentata) */}
            <g>
              <path d="M 65 160 L 115 155 L 110 195 L 60 190 Z" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="2" />
              <path d="M 55 190 L 105 185 L 100 225 L 50 220 Z" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="2" />
              <path d="M 185 155 L 235 160 L 240 190 L 190 195 Z" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="2" />
              <path d="M 195 185 L 245 190 L 250 220 L 200 225 Z" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="2" />
            </g>

            {/* Anatomical Golden Breastplate Cuirass */}
            <path d="M 105 160 Q 150 170 195 160 L 210 320 Q 150 350 90 320 Z" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="3" />
            {/* Embossed Lion Crest on Chest */}
            <circle cx="150" cy="225" r="16" fill="url(#centurionBronze)" stroke="#fef08a" strokeWidth="2" />
            <path d="M 142 220 Q 150 215 158 220 L 154 232 L 146 232 Z" fill="#78350f" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${position === 'hero' ? 'w-full max-w-sm' : 'w-56 sm:w-64'}`}>
      {/* 3D Perspective Card Container */}
      <div
        style={{ perspective: 1000 }}
        className="w-full"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            setIsHovered(true);
            audioEngine.playReelTick();
          }}
          onMouseLeave={handleMouseLeave}
          onClick={handleGuardianClick}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: isHovered ? 1.03 : 1,
            y: isSpinning ? [-4, 4, -4] : isHovered ? -6 : [0, -4, 0],
          }}
          transition={{
            y: { repeat: Infinity, duration: isSpinning ? 0.6 : 3, ease: 'easeInOut' },
            scale: { duration: 0.2 },
          }}
          className="relative cursor-pointer rounded-2xl p-3 sm:p-4 bg-gradient-to-b from-[#1c1307]/90 via-[#0e0a04]/95 to-[#060401] border-2 border-amber-500/60 shadow-[0_0_35px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.2)] overflow-hidden backdrop-blur-md group"
        >
          {/* Background Elemental Ambient Halo */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 35%, ${guardian.glowColor} 0%, transparent 70%)`,
            }}
          />

          {/* Floating Ember Particles Canvas overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [-10, -220], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="absolute bottom-2 left-6 w-1.5 h-1.5 rounded-full bg-amber-300 blur-[0.5px]"
            />
            <motion.div
              animate={{ y: [-10, -200], opacity: [0, 0.8, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 0.8, ease: 'linear' }}
              className="absolute bottom-2 right-8 w-2 h-2 rounded-full bg-yellow-400 blur-[0.5px]"
            />
            <motion.div
              animate={{ y: [-10, -180], opacity: [0, 0.9, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 1.4, ease: 'linear' }}
              className="absolute bottom-2 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px]"
            />
          </div>

          {/* Top Status & Name Badge */}
          <div className="relative z-10 flex items-center justify-between pb-1 border-b border-amber-900/50">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 font-cinzel">
                {guardian.element}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevGuardian}
                title="Previous Guardian"
                className="p-1 rounded bg-black/40 hover:bg-amber-950/60 border border-amber-900/50 text-amber-300"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={handleNextGuardian}
                title="Next Guardian"
                className="p-1 rounded bg-black/40 hover:bg-amber-950/60 border border-amber-900/50 text-amber-300"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Main Realistic Character Stage */}
          <div className="relative w-full aspect-[3/4] my-2 flex items-center justify-center">
            {/* Spinning/Power Surge Aura Ring */}
            {(isSpinning || isEmpowered) && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute inset-2 rounded-full border-2 border-amber-400 blur-sm pointer-events-none"
                style={{ borderColor: guardian.primaryColor }}
              />
            )}

            {/* The Gaming Realistic Character Vector or Image Art */}
            <motion.div
              animate={{
                scale: isSpinning ? [1, 1.05, 1] : 1,
              }}
              transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.5 }}
              className="w-full h-full flex items-center justify-center select-none"
            >
              {guardian.imageUrl ? (
                <div
                  className={`relative w-full h-full flex items-center justify-center ${
                    position === 'right' ? 'transform scale-x-[-1]' : ''
                  }`}
                >
                  <img
                    src={guardian.imageUrl}
                    alt={guardian.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all duration-300 pointer-events-none"
                  />
                </div>
              ) : (
                renderRealisticCharacterArt()
              )}
            </motion.div>
          </div>

          {/* Character Name & Blessing Stats */}
          <div className="relative z-10 text-center mt-1">
            <h3 className="text-sm font-black font-cinzel gold-text-gradient tracking-wide">
              {guardian.name}
            </h3>
            <p className="text-[10px] text-amber-300/80 font-medium">
              {guardian.title}
            </p>

            {/* Blessing Card Pill */}
            <div className="mt-2 py-1 px-2 rounded-lg bg-black/60 border border-amber-900/60 flex items-center justify-between text-[9px]">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Zap className="w-3 h-3 text-amber-400" />
                {guardian.blessing}
              </span>
              <span className="text-amber-200/90 font-semibold">{guardian.blessingEffect}</span>
            </div>
          </div>

          {/* Hover / Empowered Glow Border Sweep */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-amber-300/10 to-transparent group-hover:animate-gold-shine" />
          </div>
        </motion.div>
      </div>

      {/* Divine Speech / Blessing Bubble */}
      <AnimatePresence>
        {showBlessingBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="absolute -top-14 z-50 bg-[#160e04] border border-amber-400 text-amber-200 text-xs px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.9)] max-w-xs text-center font-cinzel"
          >
            <p className="italic">{guardian.quote}</p>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#160e04] border-r border-b border-amber-400 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
