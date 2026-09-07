import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Flame, Zap } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export const RA_GUARDIAN_IMAGE_URL = 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/ra.png';

export type GuardianCharacterId =
  | 'pharaoh_solar_flame'
  | 'ra_sun_god'
  | 'pharaoh_sun_guardian'
  | 'pharaoh_invoker'
  | 'pharaoh_ascended_winged'
  | 'pharaoh_sentry'
  | 'ra_falcon'
  | 'isis_priestess'
  | 'anubis_jackal'
  | 'warrior_champion'
  | 'hathor_goddess'
  | 'gold_sarcophagus';

export interface GuardianCharacterMeta {
  id: GuardianCharacterId;
  name: string;
  title: string;
  quote: string;
  themeColor: string;
  imageUrl?: string;
}

export const GUARDIAN_ROSTER: Record<GuardianCharacterId, GuardianCharacterMeta> = {
  pharaoh_solar_flame: {
    id: 'pharaoh_solar_flame',
    name: 'Ra The Sun Sovereign',
    title: 'Supreme Lord of Light & Golden Reels',
    quote: 'The sacred eternal flame of Ra blazes upon the temple! Boundless gold shall be yours!',
    themeColor: '#f59e0b',
    imageUrl: RA_GUARDIAN_IMAGE_URL,
  },
  ra_sun_god: {
    id: 'ra_sun_god',
    name: 'Ra Sun God',
    title: 'Wielder of the Winged Sun Scepter',
    quote: 'By the divine radiant power of Heliopolis, the reels bend to your destiny!',
    themeColor: '#f59e0b',
    imageUrl: RA_GUARDIAN_IMAGE_URL,
  },
  pharaoh_sun_guardian: {
    id: 'pharaoh_sun_guardian',
    name: 'Pharaoh Sun Guardian',
    title: 'Bearer of the Royal Scarab Amulet',
    quote: 'By the sacred scarab upon my breast, fortune bows before you!',
    themeColor: '#f59e0b',
    imageUrl: RA_GUARDIAN_IMAGE_URL,
  },
  pharaoh_invoker: {
    id: 'pharaoh_invoker',
    name: 'Pharaoh Staff Invoker',
    title: 'Summoner of Solar Rays',
    quote: 'Behold the blazing solar fury! The reels align with celestial destiny!',
    themeColor: '#fbbf24',
  },
  pharaoh_ascended_winged: {
    id: 'pharaoh_ascended_winged',
    name: 'Ascended Winged Pharaoh',
    title: 'Divine Lord of Golden Wings',
    quote: 'Ascend into immortality! Golden treasures shower across the temple!',
    themeColor: '#ef4444',
  },
  pharaoh_sentry: {
    id: 'pharaoh_sentry',
    name: 'Pharaoh Temple Sentry',
    title: 'Eternal Royal Vanguard',
    quote: 'No tomb robber shall pass. Only the worthy claim the pharaoh\'s gold.',
    themeColor: '#eab308',
  },
  ra_falcon: {
    id: 'ra_falcon',
    name: 'Ra Sun God',
    title: 'Supreme Lord of Heliopolis',
    quote: 'The Solar Fire of Ra blazes upon the golden reels!',
    themeColor: '#f59e0b',
  },
  isis_priestess: {
    id: 'isis_priestess',
    name: 'Isis High Priestess',
    title: 'Mistress of Magic & Stars',
    quote: 'By sacred incantations, the vaults of Osiris open for you!',
    themeColor: '#06b6d4',
  },
  anubis_jackal: {
    id: 'anubis_jackal',
    name: 'Anubis Jackal',
    title: 'Guardian of Sacred Tombs',
    quote: 'The scales of destiny balance in your favor. Spin with honor!',
    themeColor: '#38bdf8',
  },
  warrior_champion: {
    id: 'warrior_champion',
    name: 'Egyptian Champion',
    title: 'Vanguard of the Dynasty',
    quote: 'With spear and shield, we conquer the temple riches!',
    themeColor: '#e11d48',
  },
  hathor_goddess: {
    id: 'hathor_goddess',
    name: 'Hathor Goddess',
    title: 'Lady of Joy & Abundance',
    quote: 'May boundless joy and golden bounty overflow into your vault!',
    themeColor: '#ec4899',
  },
  gold_sarcophagus: {
    id: 'gold_sarcophagus',
    name: 'Royal Sarcophagus',
    title: 'Eternal Pharaonic Relic',
    quote: 'Ancient Pharaohs awaken with thousands of golden coins!',
    themeColor: '#eab308',
  },
};

// Reusable SVG defs for Pharaoh Gold, Scarab Turquoise, Jewels & Wings
const SVGDefs: React.FC = () => (
  <defs>
    {/* Rich Metallic 3D Gold */}
    <linearGradient id="pharaohGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fffdf0" />
      <stop offset="25%" stopColor="#fde047" />
      <stop offset="60%" stopColor="#d97706" />
      <stop offset="100%" stopColor="#78350f" />
    </linearGradient>

    {/* Lapis Lazuli Deep Blue */}
    <linearGradient id="pharaohLapis" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" />
      <stop offset="35%" stopColor="#0284c7" />
      <stop offset="70%" stopColor="#1e3a8a" />
      <stop offset="100%" stopColor="#0f172a" />
    </linearGradient>

    {/* Glowing Turquoise Scarab Chest Jewel */}
    <radialGradient id="scarabCyanGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#a5f3fc" />
      <stop offset="40%" stopColor="#22d3ee" />
      <stop offset="80%" stopColor="#0891b2" />
      <stop offset="100%" stopColor="#164e63" />
    </radialGradient>

    {/* Ruby Orb Glow */}
    <radialGradient id="rubyOrb" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#ffe4e6" />
      <stop offset="30%" stopColor="#f43f5e" />
      <stop offset="70%" stopColor="#be123c" />
      <stop offset="100%" stopColor="#4c0519" />
    </radialGradient>

    {/* Solar Burst Glow */}
    <radialGradient id="sunburstNova" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="25%" stopColor="#fef08a" />
      <stop offset="55%" stopColor="#f59e0b" />
      <stop offset="85%" stopColor="#ea580c" />
      <stop offset="100%" stopColor="transparent" />
    </radialGradient>

    {/* Wing Feather Gradients */}
    <linearGradient id="wingGoldFeather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fffbeb" />
      <stop offset="40%" stopColor="#fbbf24" />
      <stop offset="80%" stopColor="#b45309" />
      <stop offset="100%" stopColor="#78350f" />
    </linearGradient>

    <linearGradient id="wingBlueFeather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#67e8f9" />
      <stop offset="50%" stopColor="#0284c7" />
      <stop offset="100%" stopColor="#1e3a8a" />
    </linearGradient>

    <linearGradient id="wingCrimsonFeather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fecdd3" />
      <stop offset="40%" stopColor="#f43f5e" />
      <stop offset="80%" stopColor="#be123c" />
      <stop offset="100%" stopColor="#4c0519" />
    </linearGradient>

    {/* Divine Body Aura */}
    <radialGradient id="divineFireAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="rgba(254, 240, 138, 0.45)" />
      <stop offset="50%" stopColor="rgba(245, 158, 11, 0.28)" />
      <stop offset="80%" stopColor="rgba(234, 88, 12, 0.12)" />
      <stop offset="100%" stopColor="transparent" />
    </radialGradient>

    {/* Solar Flame Fire Gradients */}
    <linearGradient id="solarFireBackdrop" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#7c2d12" stopOpacity="0" />
      <stop offset="25%" stopColor="#ea580c" stopOpacity="0.85" />
      <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.95" />
      <stop offset="90%" stopColor="#fef08a" stopOpacity="1" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
    </linearGradient>

    <linearGradient id="solarFireInner" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#c2410c" />
      <stop offset="40%" stopColor="#f97316" />
      <stop offset="75%" stopColor="#fde047" />
      <stop offset="100%" stopColor="#ffffff" />
    </linearGradient>
  </defs>
);

// Render Individual Character SVG Graphics
const renderCharacterSVG = (id: GuardianCharacterId) => {
  switch (id) {
    // =========================================================================
    // 0. BLAZING SOLAR FLAME PHARAOH (Exact match to Artwork: Flames, Winged Ruby Scepter & Glowing Scarab)
    // =========================================================================
    case 'pharaoh_solar_flame':
      return (
        <svg viewBox="0 0 280 400" className="w-full h-full">
          <SVGDefs />

          {/* 1. BILLOWING BACKGROUND SACRED SOLAR FLAMES (Behind Head, Shoulders & Back) */}
          <g id="solar-fire-aura">
            {/* Soft Ambient Fire Glow */}
            <ellipse cx="140" cy="180" rx="110" ry="150" fill="url(#divineFireAura)" filter="blur(22px)" />

            {/* Outer Flame Tongues (Left Side) */}
            <path
              d="M 60 260 C 40 220 30 170 50 140 C 65 115 55 80 75 50 C 85 85 95 110 90 140 C 85 170 70 210 60 260 Z"
              fill="url(#solarFireBackdrop)"
              opacity="0.85"
              filter="drop-shadow(0 0 12px #ea580c)"
            />
            <path
              d="M 45 220 C 25 180 35 130 55 105 C 70 85 75 60 85 40 C 90 70 85 100 75 130 C 65 160 55 190 45 220 Z"
              fill="url(#solarFireInner)"
              opacity="0.9"
            />

            {/* Outer Flame Tongues (Right Side) */}
            <path
              d="M 210 260 C 230 220 245 170 225 140 C 210 115 220 80 200 50 C 190 85 180 110 185 140 C 190 170 200 210 210 260 Z"
              fill="url(#solarFireBackdrop)"
              opacity="0.85"
              filter="drop-shadow(0 0 12px #ea580c)"
            />
            <path
              d="M 225 220 C 245 180 235 130 215 105 C 200 85 195 60 185 40 C 180 70 185 100 195 130 C 205 160 215 190 225 220 Z"
              fill="url(#solarFireInner)"
              opacity="0.9"
            />

            {/* Central High Fire Corona Behind Nemes */}
            <path
              d="M 100 90 C 110 40 125 10 140 2 C 155 10 170 40 180 90 C 165 75 155 60 140 60 C 125 60 115 75 100 90 Z"
              fill="url(#solarFireInner)"
              filter="drop-shadow(0 0 16px #f59e0b)"
            />
            <circle cx="140" cy="80" r="50" fill="url(#sunburstNova)" opacity="0.45" filter="blur(14px)" />
          </g>

          {/* 2. GLORIOUS WINGED RUBY SOLAR SCEPTER (Held Diagonally in Left Hand) */}
          <g id="blazing-sun-scepter">
            {/* Long Burnished Golden Shaft */}
            <line x1="228" y1="50" x2="165" y2="395" stroke="url(#pharaohGoldLight)" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="228" y1="50" x2="165" y2="395" stroke="#451a03" strokeWidth="1" strokeDasharray="10 30" />
            <polygon points="165,398 159,380 171,380" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />

            {/* Scepter Top Collar & Mounting Jewels */}
            <g transform="translate(228, 50)">
              {/* Golden Base Cup Collar */}
              <path d="M -8 18 L 8 18 L 5 32 L -5 32 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />
              <circle cx="0" cy="25" r="3" fill="#e11d48" stroke="#fde047" strokeWidth="0.8" />

              {/* CURVED WINGED FALCON CRESCENT EMBRACING THE SUN */}
              {/* Left Wing Crescent */}
              <path
                d="M -5 18 C -22 14 -32 -8 -22 -35 C -18 -20 -10 -5 0 2 Z"
                fill="url(#pharaohGoldLight)"
                stroke="#78350f"
                strokeWidth="1.5"
                filter="drop-shadow(0 0 6px rgba(245,158,11,0.6))"
              />
              {/* Wing Feather Engravings */}
              <path d="M -24 -24 C -18 -12 -12 -2 -4 8" fill="none" stroke="#b45309" strokeWidth="1.2" />
              <path d="M -20 -10 C -14 -2 -8 5 -2 12" fill="none" stroke="#b45309" strokeWidth="1.2" />

              {/* Right Wing Crescent */}
              <path
                d="M 5 18 C 22 14 32 -8 22 -35 C 18 -20 10 -5 0 2 Z"
                fill="url(#pharaohGoldLight)"
                stroke="#78350f"
                strokeWidth="1.5"
                filter="drop-shadow(0 0 6px rgba(245,158,11,0.6))"
              />
              <path d="M 24 -24 C 18 -12 12 -2 4 8" fill="none" stroke="#b45309" strokeWidth="1.2" />
              <path d="M 20 -10 C 14 -2 8 5 2 12" fill="none" stroke="#b45309" strokeWidth="1.2" />

              {/* Central Golden Sun Mounting Ring */}
              <circle cx="0" cy="-6" r="16" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

              {/* GLOWING MOLTEN RUBY SOLAR SPHERE */}
              <circle cx="0" cy="-6" r="12" fill="url(#rubyOrb)" stroke="#fef08a" strokeWidth="2" filter="drop-shadow(0 0 14px #f43f5e)" />
              {/* Specular Highlight */}
              <ellipse cx="-3" cy="-9" rx="3.5" ry="2" fill="#ffffff" opacity="0.9" />
              <circle cx="2" cy="-4" r="1.5" fill="#fde047" opacity="0.8" />
            </g>
          </g>

          {/* 3. GOD-PHARAOH BODY & ARMOR */}
          <g id="god-pharaoh-figure">
            {/* Muscular Toned Golden Torso & Abdominals */}
            <path
              d="M 94 135 C 86 175 90 220 94 240 L 186 240 C 190 220 194 175 186 135 Z"
              fill="url(#pharaohGoldLight)"
              stroke="#451a03"
              strokeWidth="2"
            />
            {/* Abdominal 6-Pack Sculpting */}
            <path d="M 112 185 Q 140 192 168 185" fill="none" stroke="#78350f" strokeWidth="2" />
            <path d="M 116 210 Q 140 216 164 210" fill="none" stroke="#78350f" strokeWidth="2" />
            <line x1="140" y1="170" x2="140" y2="235" stroke="#78350f" strokeWidth="1.8" />

            {/* Lapis Side Torso Armor Inlays */}
            <path d="M 95 160 C 92 190 94 220 98 238 L 108 238 C 104 220 102 190 105 160 Z" fill="url(#pharaohLapis)" stroke="#451a03" strokeWidth="1" />
            <path d="M 185 160 C 188 190 186 220 182 238 L 172 238 C 176 220 178 190 175 160 Z" fill="url(#pharaohLapis)" stroke="#451a03" strokeWidth="1" />

            {/* RADIANT SACRED TURQUOISE SCARAB AMULET ON CHEST */}
            <g id="blazing-chest-scarab" transform="translate(140, 182)">
              {/* Celestial Cyan Glow Pulse */}
              <circle cx="0" cy="0" r="26" fill="url(#scarabCyanGlow)" opacity="0.6" filter="blur(8px)" />

              {/* Top Ruby Brooch Jewel */}
              <circle cx="0" cy="-22" r="5" fill="url(#rubyOrb)" stroke="#fde047" strokeWidth="1.5" filter="drop-shadow(0 0 6px #f43f5e)" />

              {/* Scarab Gold Base Ring with Radiating Claws */}
              <ellipse cx="0" cy="0" rx="18" ry="20" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              {/* Scarab Legs / Claws gripping chest */}
              <path d="M -16 -8 Q -24 -14 -20 -2" fill="none" stroke="url(#pharaohGoldLight)" strokeWidth="2" strokeLinecap="round" />
              <path d="M 16 -8 Q 24 -14 20 -2" fill="none" stroke="url(#pharaohGoldLight)" strokeWidth="2" strokeLinecap="round" />
              <path d="M -17 6 Q -25 12 -18 16" fill="none" stroke="url(#pharaohGoldLight)" strokeWidth="2" strokeLinecap="round" />
              <path d="M 17 6 Q 25 12 18 16" fill="none" stroke="url(#pharaohGoldLight)" strokeWidth="2" strokeLinecap="round" />

              {/* Turquoise Gemstone Shell Body */}
              <ellipse cx="0" cy="1" rx="12" ry="14" fill="url(#scarabCyanGlow)" stroke="#083344" strokeWidth="1.5" />
              {/* Wing Sheath Divider with Golden Inlay */}
              <line x1="0" y1="-12" x2="0" y2="15" stroke="#fde047" strokeWidth="1.5" />
              <path d="M -8 -3 Q 0 -6 8 -3" fill="none" stroke="#fde047" strokeWidth="1.2" />

              {/* Golden Head & Sun Horn */}
              <path d="M -5 -11 Q 0 -17 5 -11 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />

              {/* Bottom Ruby Teardrop Jewel */}
              <polygon points="0,17 -4,25 0,28 4,25" fill="#e11d48" stroke="#fde047" strokeWidth="1" filter="drop-shadow(0 0 4px #e11d48)" />
            </g>

            {/* BROAD MULTI-TIERED PHARAONIC BEADED COLLAR */}
            <g id="royal-collar">
              {/* Outer Golden Band */}
              <path d="M 82 125 Q 140 162 198 125 L 190 152 Q 140 185 90 152 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.8" />
              {/* Lapis Lazuli Inlay Tier */}
              <path d="M 92 132 Q 140 158 188 132" fill="none" stroke="url(#pharaohLapis)" strokeWidth="5" />
              {/* Turquoise & Ruby Beaded Dot Highlights */}
              <circle cx="115" cy="144" r="2.5" fill="#22d3ee" />
              <circle cx="127" cy="148" r="2.5" fill="#f43f5e" />
              <circle cx="153" cy="148" r="2.5" fill="#f43f5e" />
              <circle cx="165" cy="144" r="2.5" fill="#22d3ee" />
            </g>

            {/* ROYAL SHENDYT KILT & GOLDEN BELT */}
            <g id="royal-kilt">
              {/* Crisp Pleated White Linen Kilt with Golden Edge Contours */}
              <path d="M 94 250 L 86 390 L 194 390 L 186 250 Z" fill="#fffdfa" stroke="url(#pharaohGoldLight)" strokeWidth="2.5" />
              {/* Linen Pleat Lines */}
              <line x1="102" y1="250" x2="96" y2="390" stroke="#cbd5e1" strokeWidth="1.8" />
              <line x1="112" y1="250" x2="108" y2="390" stroke="#cbd5e1" strokeWidth="1.8" />
              <line x1="168" y1="250" x2="172" y2="390" stroke="#cbd5e1" strokeWidth="1.8" />
              <line x1="178" y1="250" x2="184" y2="390" stroke="#cbd5e1" strokeWidth="1.8" />

              {/* Central Royal Lapis Blue Shendyt Apron Tab */}
              <path d="M 128 245 L 122 385 L 158 385 L 152 245 Z" fill="url(#pharaohLapis)" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
              {/* Gold Embroidered Inlay Lines on Tab */}
              <line x1="140" y1="250" x2="140" y2="380" stroke="url(#pharaohGoldLight)" strokeWidth="3.5" />

              {/* Golden Royal Waistband Belt */}
              <rect x="92" y="238" width="96" height="16" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="2" />
              {/* Lapis Belt Trim */}
              <line x1="94" y1="246" x2="186" y2="246" stroke="url(#pharaohLapis)" strokeWidth="3" />

              {/* Diamond-Faceted Ruby Center Belt Buckle */}
              <polygon points="140,234 150,246 140,258 130,246" fill="#e11d48" stroke="#fde047" strokeWidth="2" filter="drop-shadow(0 0 6px #e11d48)" />
              <polygon points="140,238 146,246 140,254 134,246" fill="#f43f5e" />
            </g>

            {/* RIGHT ARM (Muscular Golden Arm + Feathered Winged Ruby Bracer + Clenched Fist) */}
            <g id="right-arm-blazing">
              {/* Golden Bicep with Double Armband */}
              <path d="M 90 135 L 62 180 L 70 220 L 84 222 L 94 180 Z" fill="#d97706" stroke="#451a03" strokeWidth="1.8" />
              {/* Bicep Armband (Lapis & Gold) */}
              <rect x="74" y="152" width="18" height="10" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />
              <line x1="74" y1="157" x2="92" y2="157" stroke="url(#pharaohLapis)" strokeWidth="3" />

              {/* MAGNIFICENT WINGED GOLDEN BRACER WITH RUBY */}
              <path
                d="M 58 180 C 36 170 38 200 48 225 L 70 222 L 68 185 Z"
                fill="url(#pharaohGoldLight)"
                stroke="#451a03"
                strokeWidth="1.5"
                filter="drop-shadow(0 0 6px rgba(245,158,11,0.5))"
              />
              {/* Wing Feather Ridges */}
              <path d="M 40 185 Q 52 195 62 205" fill="none" stroke="#78350f" strokeWidth="1.2" />
              <path d="M 44 202 Q 54 210 64 218" fill="none" stroke="#78350f" strokeWidth="1.2" />
              {/* Oval Faceted Ruby Gem in Bracer */}
              <ellipse cx="52" cy="198" rx="5" ry="7" fill="url(#rubyOrb)" stroke="#fde047" strokeWidth="1.5" filter="drop-shadow(0 0 6px #f43f5e)" />

              {/* Clenched Muscular Golden Fist */}
              <circle cx="76" cy="232" r="9" fill="#d97706" stroke="#451a03" strokeWidth="1.8" />
              <path d="M 70 230 Q 76 236 82 230" fill="none" stroke="#78350f" strokeWidth="1.5" />
            </g>

            {/* LEFT ARM (Reaching across gripping the Scepter) */}
            <g id="left-arm-scepter">
              <path d="M 190 135 L 218 175 L 235 210 L 244 202 L 208 155 Z" fill="#d97706" stroke="#451a03" strokeWidth="1.8" />
              {/* Bicep Armband */}
              <rect x="194" y="152" width="18" height="10" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />
              <line x1="194" y1="157" x2="212" y2="157" stroke="url(#pharaohLapis)" strokeWidth="3" />

              {/* Golden Forearm Bracer with Lapis inlays */}
              <rect x="216" y="180" width="18" height="14" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />
              <circle cx="225" cy="187" r="3" fill="url(#pharaohLapis)" />

              {/* Hand Gripping the Scepter */}
              <ellipse cx="236" cy="208" rx="8" ry="9" fill="#d97706" stroke="#451a03" strokeWidth="1.8" />
              <circle cx="236" cy="208" r="4" fill="#b45309" />
            </g>

            {/* HEAD & ROYAL STRIPED LAPIS NEMES HEADDRESS */}
            <g id="pharaoh-head-nemes">
              {/* Nemes Back Wings (Flared Golden & Lapis Structure) */}
              <path
                d="M 98 72 Q 140 45 182 72 L 206 142 L 180 155 L 168 100 L 112 100 L 100 155 L 74 142 Z"
                fill="url(#pharaohGoldLight)"
                stroke="#451a03"
                strokeWidth="2.5"
                filter="drop-shadow(0 4px 8px rgba(0,0,0,0.7))"
              />

              {/* Royal Lapis Lazuli Diagonal Stripes on Nemes Wings */}
              <path d="M 82 115 L 96 148" stroke="url(#pharaohLapis)" strokeWidth="7" strokeLinecap="round" />
              <path d="M 88 88 L 108 104" stroke="url(#pharaohLapis)" strokeWidth="6" strokeLinecap="round" />
              <path d="M 198 115 L 184 148" stroke="url(#pharaohLapis)" strokeWidth="7" strokeLinecap="round" />
              <path d="M 192 88 L 172 104" stroke="url(#pharaohLapis)" strokeWidth="6" strokeLinecap="round" />

              {/* Head Crown Stripes */}
              <path d="M 112 66 Q 140 56 168 66" fill="none" stroke="url(#pharaohLapis)" strokeWidth="4" />
              <path d="M 118 52 Q 140 44 162 52" fill="none" stroke="url(#pharaohLapis)" strokeWidth="3" />

              {/* Regal Golden Pharaoh Face */}
              <path
                d="M 118 72 Q 140 68 162 72 L 158 108 Q 140 122 122 108 Z"
                fill="#f59e0b"
                stroke="#451a03"
                strokeWidth="1.8"
              />

              {/* Royal Eyes with Heavy Kohl Winged Eyeliner */}
              {/* Left Eye */}
              <ellipse cx="128" cy="88" rx="5" ry="3" fill="#ffffff" />
              <circle cx="128" cy="88" r="2.2" fill="#083344" />
              <circle cx="127" cy="87" r="0.7" fill="#ffffff" />
              <path d="M 121 86 L 135 86 L 138 89" stroke="#090d16" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* Right Eye */}
              <ellipse cx="152" cy="88" rx="5" ry="3" fill="#ffffff" />
              <circle cx="152" cy="88" r="2.2" fill="#083344" />
              <circle cx="151" cy="87" r="0.7" fill="#ffffff" />
              <path d="M 145 86 L 159 86 L 162 89" stroke="#090d16" strokeWidth="1.6" fill="none" strokeLinecap="round" />

              {/* Golden Nose & Mouth */}
              <path d="M 140 84 L 140 96 L 144 98" fill="none" stroke="#78350f" strokeWidth="1.2" />
              <path d="M 134 104 Q 140 108 146 104" fill="none" stroke="#b45309" strokeWidth="1.6" />

              {/* BRAIDED GOLDEN OSIRIS BEARD TUBE */}
              <g id="pharaoh-braided-beard">
                <rect x="136" y="114" width="8" height="24" rx="3" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />
                {/* Cross-Hatch Braided Weave Lines */}
                <line x1="136" y1="120" x2="144" y2="124" stroke="#451a03" strokeWidth="1" />
                <line x1="144" y1="120" x2="136" y2="124" stroke="#451a03" strokeWidth="1" />
                <line x1="136" y1="127" x2="144" y2="131" stroke="#451a03" strokeWidth="1" />
                <line x1="144" y1="127" x2="136" y2="131" stroke="#451a03" strokeWidth="1" />
              </g>

              {/* FOREHEAD GOLDEN BAND & REARING URAEUS COBRA */}
              <path d="M 114 70 Q 140 64 166 70 L 164 78 Q 140 72 116 78 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="140" cy="74" r="2.5" fill="#06b6d4" />

              {/* Rearing Golden Cobra with Flared Hood */}
              <path
                d="M 140 66 Q 134 50 142 42 Q 146 50 140 58"
                fill="url(#pharaohGoldLight)"
                stroke="#dc2626"
                strokeWidth="2.2"
                filter="drop-shadow(0 0 4px #f59e0b)"
              />
              <circle cx="141" cy="45" r="1.5" fill="#fef08a" />
            </g>
          </g>
        </svg>
      );

    // =========================================================================
    // 1. PHARAOH SUN GUARDIAN (Standing with Staff & Winged Ruby Scepter)
    // =========================================================================
    case 'pharaoh_sun_guardian':
      return (
        <svg viewBox="0 0 260 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="125" cy="200" rx="95" ry="145" fill="url(#divineFireAura)" filter="blur(16px)" />

          {/* Golden Staff (held in left hand, standing tall) */}
          <g id="staff-standing">
            {/* Staff Shaft */}
            <rect x="212" y="55" width="7" height="340" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <polygon points="215.5,398 210,380 221,380" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />

            {/* Staff Winged Solar Headpiece */}
            {/* Left Falcon Wing on Staff */}
            <path d="M 213 85 C 190 75 192 48 205 32 C 208 45 212 60 213 85 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M 200 40 C 195 52 205 65 213 72" fill="none" stroke="#b45309" strokeWidth="1.5" />

            {/* Right Falcon Wing on Staff */}
            <path d="M 218 85 C 241 75 239 48 226 32 C 223 45 219 60 218 85 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M 231 40 C 236 52 226 65 218 72" fill="none" stroke="#b45309" strokeWidth="1.5" />

            {/* Center Ruby Orb in Staff */}
            <circle cx="215.5" cy="62" r="10" fill="url(#rubyOrb)" stroke="#fde047" strokeWidth="2" filter="drop-shadow(0 0 8px #f43f5e)" />
            <circle cx="213" cy="59" r="2.5" fill="#fff" opacity="0.85" />
          </g>

          {/* Pharaoh Figure */}
          <g id="pharaoh-warrior-body">
            {/* Legs & Armored Greaves */}
            {/* Left Leg */}
            <path d="M 98 290 L 88 375 L 108 375 L 112 290 Z" fill="#b45309" />
            {/* Left Greave Armor */}
            <path d="M 92 300 L 86 368 L 106 368 L 110 300 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="90" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <circle cx="97" cy="308" r="4.5" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
            {/* Left Sandal */}
            <path d="M 82 372 L 108 372 L 110 382 L 80 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            {/* Right Leg */}
            <path d="M 136 290 L 142 375 L 162 375 L 150 290 Z" fill="#b45309" />
            {/* Right Greave Armor */}
            <path d="M 138 300 L 140 368 L 160 368 L 152 300 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="144" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <circle cx="151" cy="308" r="4.5" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
            {/* Right Sandal */}
            <path d="M 138 372 L 164 372 L 168 382 L 138 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            {/* Pleated Royal Shendyt Kilt */}
            <path d="M 80 230 L 72 295 L 176 295 L 168 230 Z" fill="#fffdfa" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
            {/* Blue and Gold Stripes on Kilt */}
            <path d="M 88 230 L 82 295 L 94 295 L 98 230 Z" fill="url(#pharaohLapis)" />
            <path d="M 150 230 L 154 295 L 166 295 L 160 230 Z" fill="url(#pharaohLapis)" />
            {/* Center Hanging Sash */}
            <path d="M 115 225 L 110 310 L 138 310 L 133 225 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <line x1="124" y1="230" x2="124" y2="305" stroke="url(#pharaohLapis)" strokeWidth="5" />

            {/* Royal Gold Belt with Ruby Buckle */}
            <rect x="80" y="218" width="88" height="15" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.8" />
            <polygon points="124,215 133,225 124,235 115,225" fill="#e11d48" stroke="#fde047" strokeWidth="1.5" filter="drop-shadow(0 0 4px #e11d48)" />

            {/* Muscular Golden Torso & Cuirass */}
            <path d="M 82 118 C 76 160 80 200 84 220 L 164 220 C 168 200 172 160 166 118 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
            {/* Pectoral Muscle Contour */}
            <path d="M 94 150 Q 124 162 154 150" fill="none" stroke="#78350f" strokeWidth="2" />
            <path d="M 124 140 L 124 210" stroke="#78350f" strokeWidth="1.5" />

            {/* CENTER TURQUOISE SCARAB AMULET ON CHEST */}
            <g id="chest-scarab" transform="translate(124, 162)">
              {/* Scarab Outer Glow */}
              <circle cx="0" cy="0" r="18" fill="url(#scarabCyanGlow)" opacity="0.4" filter="blur(6px)" />
              {/* Gold Scarab Mount Base */}
              <ellipse cx="0" cy="0" rx="14" ry="16" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              {/* Turquoise Scarab Shell Body */}
              <ellipse cx="0" cy="1" rx="9" ry="11" fill="url(#scarabCyanGlow)" stroke="#083344" strokeWidth="1.2" />
              <line x1="0" y1="-9" x2="0" y2="11" stroke="#fde047" strokeWidth="1" />
              {/* Golden Scarab Head & Horn */}
              <path d="M -4 -8 Q 0 -13 4 -8 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="0.8" />
              <circle cx="0" cy="-3" r="2.5" fill="#f43f5e" stroke="#fff" strokeWidth="0.5" />
            </g>

            {/* Broad Pharaonic Pectoral Beaded Collar */}
            <path d="M 75 110 Q 124 145 173 110 L 166 135 Q 124 165 82 135 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />
            <path d="M 85 116 Q 124 140 163 116" fill="none" stroke="url(#pharaohLapis)" strokeWidth="3" />

            {/* Right Arm (Clenched Fist + Winged Ruby Bracer) */}
            <g id="right-arm-winged">
              {/* Bicep & Forearm */}
              <path d="M 78 122 L 56 168 L 62 208 L 74 210 L 80 168 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              {/* Winged Golden Bracer with Ruby */}
              <path d="M 52 170 C 35 160 38 185 46 205 L 62 208 L 60 175 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <circle cx="48" cy="184" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
              {/* Clenched Right Fist */}
              <circle cx="68" cy="214" r="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Left Arm (Gripping the Golden Staff) */}
            <g id="left-arm-holding">
              <path d="M 170 122 L 195 165 L 210 190 L 218 184 L 188 145 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              {/* Golden Armband */}
              <rect x="176" y="135" width="16" height="8" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
              {/* Golden Bracer */}
              <rect x="196" y="165" width="14" height="12" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
              {/* Hand Gripping Staff */}
              <ellipse cx="214" cy="186" rx="7" ry="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Pharaoh Head & Striped Nemes */}
            {/* Nemes Back Wings */}
            <path d="M 88 58 Q 124 35 160 58 L 182 120 L 160 130 L 148 85 L 100 85 L 88 130 L 66 120 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
            {/* Nemes Lapis Lazuli Stripes */}
            <path d="M 72 100 L 84 125" stroke="url(#pharaohLapis)" strokeWidth="6" />
            <path d="M 176 100 L 164 125" stroke="url(#pharaohLapis)" strokeWidth="6" />
            <path d="M 80 72 L 95 85" stroke="url(#pharaohLapis)" strokeWidth="5" />
            <path d="M 168 72 L 153 85" stroke="url(#pharaohLapis)" strokeWidth="5" />

            {/* Pharaoh Face */}
            <path d="M 104 60 Q 124 55 144 60 L 140 92 Q 124 105 108 92 Z" fill="#d97706" stroke="#451a03" strokeWidth="1.5" />
            {/* Eyes & Kohl */}
            <ellipse cx="114" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="114" cy="74" r="1.8" fill="#083344" />
            <path d="M 108 72 L 120 72 L 123 75" stroke="#0f172a" strokeWidth="1.2" fill="none" />

            <ellipse cx="134" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="134" cy="74" r="1.8" fill="#083344" />
            <path d="M 128 72 L 140 72 L 143 75" stroke="#0f172a" strokeWidth="1.2" fill="none" />

            {/* Golden Osiris Beard Tube */}
            <rect x="121" y="98" width="6" height="18" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
            <line x1="121" y1="104" x2="127" y2="104" stroke="#451a03" strokeWidth="1" />
            <line x1="121" y1="110" x2="127" y2="110" stroke="#451a03" strokeWidth="1" />

            {/* Golden Forehead Diadem & Uraeus Cobra */}
            <path d="M 100 58 Q 124 52 148 58 L 146 66 Q 124 60 102 66 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M 124 54 Q 122 42 126 36 Q 128 42 124 48" fill="url(#pharaohGoldLight)" stroke="#dc2626" strokeWidth="1.8" filter="drop-shadow(0 0 3px #f59e0b)" />
          </g>
        </svg>
      );

    // =========================================================================
    // 2. PHARAOH INVOKER (Staff Raised High + Radiating Chest Sunburst)
    // =========================================================================
    case 'pharaoh_invoker':
      return (
        <svg viewBox="0 0 280 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="130" cy="200" rx="100" ry="150" fill="url(#divineFireAura)" filter="blur(18px)" />

          {/* RADIATING SOLAR SUNBURST FLARE FROM CHEST */}
          <g id="solar-flare" transform="translate(130, 160)">
            <circle cx="0" cy="0" r="50" fill="url(#sunburstNova)" opacity="0.75" />
            {/* Sun Rays */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={Math.cos((i * Math.PI) / 6) * 75}
                y2={Math.sin((i * Math.PI) / 6) * 75}
                stroke="#fde047"
                strokeWidth={i % 2 === 0 ? 3 : 1.5}
                strokeLinecap="round"
                opacity="0.85"
              />
            ))}
          </g>

          {/* RAISED WINGED SOLAR SCEPTER (Held high diagonally) */}
          <g id="staff-raised" transform="rotate(-28 140 150)">
            <rect x="175" y="10" width="7" height="340" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <polygon points="178.5,355 173,338 184,338" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />

            {/* Staff Wings */}
            <path d="M 176 40 C 153 30 155 3 168 -13 C 171 0 175 15 176 40 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M 181 40 C 204 30 202 3 189 -13 C 186 0 182 15 181 40 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.2" />

            {/* Ruby Orb with Glow */}
            <circle cx="178.5" cy="18" r="11" fill="url(#rubyOrb)" stroke="#fde047" strokeWidth="2" filter="drop-shadow(0 0 12px #f43f5e)" />
            <circle cx="176" cy="15" r="2.5" fill="#fff" opacity="0.9" />
          </g>

          {/* Warrior Body in Invocation Pose */}
          <g id="pharaoh-invoker-body">
            {/* Legs & Greaves */}
            <path d="M 102 290 L 92 375 L 112 375 L 116 290 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="94" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <path d="M 86 372 L 112 372 L 114 382 L 84 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            <path d="M 144 290 L 150 375 L 170 375 L 158 290 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="152" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <path d="M 146 372 L 172 372 L 176 382 L 146 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            {/* Kilt */}
            <path d="M 86 230 L 78 295 L 182 295 L 174 230 Z" fill="#fffdfa" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
            <path d="M 94 230 L 88 295 L 100 295 L 104 230 Z" fill="url(#pharaohLapis)" />
            <path d="M 156 230 L 160 295 L 172 295 L 166 230 Z" fill="url(#pharaohLapis)" />
            <path d="M 121 225 L 116 310 L 144 310 L 139 225 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            {/* Belt */}
            <rect x="86" y="218" width="88" height="15" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.8" />
            <polygon points="130,215 139,225 130,235 121,225" fill="#e11d48" stroke="#fde047" strokeWidth="1.5" />

            {/* Torso */}
            <path d="M 88 118 C 82 160 86 200 90 220 L 170 220 C 174 200 178 160 172 118 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />

            {/* Glowing Chest Scarab with Extra Intensity */}
            <g id="invoker-chest-scarab" transform="translate(130, 160)">
              <circle cx="0" cy="0" r="22" fill="#22d3ee" opacity="0.6" filter="blur(8px)" />
              <ellipse cx="0" cy="0" rx="15" ry="17" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <ellipse cx="0" cy="1" rx="10" ry="12" fill="url(#scarabCyanGlow)" stroke="#083344" strokeWidth="1.2" />
              <circle cx="0" cy="-3" r="3" fill="#f43f5e" stroke="#fff" strokeWidth="0.8" />
            </g>

            {/* Collar */}
            <path d="M 81 110 Q 130 145 179 110 L 172 135 Q 130 165 88 135 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />

            {/* Right Arm with Winged Bracer */}
            <g id="right-arm-invoker">
              <path d="M 84 122 L 62 168 L 68 208 L 80 210 L 86 168 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              <path d="M 58 170 C 41 160 44 185 52 205 L 68 208 L 66 175 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <circle cx="54" cy="184" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
              <circle cx="74" cy="214" r="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Left Arm Raised High Holding Staff */}
            <g id="left-arm-raised">
              <path d="M 176 122 L 205 100 L 230 70 L 238 78 L 194 135 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              <rect x="210" y="78" width="16" height="12" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
              <ellipse cx="232" cy="74" rx="7" ry="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Head */}
            <path d="M 94 58 Q 130 35 166 58 L 188 120 L 166 130 L 154 85 L 106 85 L 94 130 L 72 120 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
            <path d="M 78 100 L 90 125" stroke="url(#pharaohLapis)" strokeWidth="6" />
            <path d="M 182 100 L 170 125" stroke="url(#pharaohLapis)" strokeWidth="6" />

            <path d="M 110 60 Q 130 55 150 60 L 146 92 Q 130 105 114 92 Z" fill="#d97706" stroke="#451a03" strokeWidth="1.5" />
            <ellipse cx="120" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="120" cy="74" r="1.8" fill="#083344" />
            <ellipse cx="140" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="140" cy="74" r="1.8" fill="#083344" />

            {/* Beard & Uraeus */}
            <rect x="127" y="98" width="6" height="18" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
            <path d="M 130 54 Q 128 42 132 36 Q 134 42 130 48" fill="url(#pharaohGoldLight)" stroke="#dc2626" strokeWidth="1.8" />
          </g>
        </svg>
      );

    // =========================================================================
    // 3. ASCENDED WINGED SOLAR PHARAOH (Multicolored Sun Wings + Fiery Halo)
    // =========================================================================
    case 'pharaoh_ascended_winged':
      return (
        <svg viewBox="0 0 320 400" className="w-full h-full">
          <SVGDefs />

          {/* EXPANSIVE RADIANT SOLAR FIRE HALO / AURA */}
          <ellipse cx="160" cy="190" rx="140" ry="170" fill="url(#divineFireAura)" filter="blur(22px)" />
          <circle cx="160" cy="180" r="130" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 8" opacity="0.4" />

          {/* MAGNIFICENT MULTI-LAYERED SOLAR WINGS */}
          {/* LEFT WING (Gold Base, Cyan/Lapis Mid, Crimson Tips) */}
          <g id="left-solar-wing">
            {/* Tier 1: Outer Crimson Tips */}
            <path d="M 120 160 C 90 90 40 60 20 85 C 45 105 75 140 100 185 Z" fill="url(#wingCrimsonFeather)" stroke="#78350f" strokeWidth="1" filter="drop-shadow(0 0 6px #e11d48)" />
            <path d="M 115 170 C 80 110 30 95 10 120 C 40 135 70 165 95 205 Z" fill="url(#wingCrimsonFeather)" stroke="#78350f" strokeWidth="1" />

            {/* Tier 2: Mid Lapis Lazuli / Cyan Feathers */}
            <path d="M 130 165 C 100 115 65 105 45 130 C 70 150 95 180 115 215 Z" fill="url(#wingBlueFeather)" stroke="#0f172a" strokeWidth="1" />
            <path d="M 135 175 C 110 130 80 125 60 150 C 85 170 105 195 125 230 Z" fill="url(#wingBlueFeather)" stroke="#0f172a" strokeWidth="1" />

            {/* Tier 3: Inner Golden Feathers */}
            <path d="M 140 180 C 120 145 95 145 80 170 C 100 190 120 215 135 245 Z" fill="url(#wingGoldFeather)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M 145 190 C 130 160 110 160 95 185 C 115 205 130 225 140 255 Z" fill="url(#wingGoldFeather)" stroke="#78350f" strokeWidth="1.2" />
          </g>

          {/* RIGHT WING (Mirrored) */}
          <g id="right-solar-wing">
            {/* Tier 1: Outer Crimson Tips */}
            <path d="M 200 160 C 230 90 280 60 300 85 C 275 105 245 140 220 185 Z" fill="url(#wingCrimsonFeather)" stroke="#78350f" strokeWidth="1" filter="drop-shadow(0 0 6px #e11d48)" />
            <path d="M 205 170 C 240 110 290 95 310 120 C 280 135 250 165 225 205 Z" fill="url(#wingCrimsonFeather)" stroke="#78350f" strokeWidth="1" />

            {/* Tier 2: Mid Lapis Lazuli / Cyan Feathers */}
            <path d="M 190 165 C 220 115 255 105 275 130 C 250 150 225 180 205 215 Z" fill="url(#wingBlueFeather)" stroke="#0f172a" strokeWidth="1" />
            <path d="M 185 175 C 210 130 240 125 260 150 C 235 170 215 195 195 230 Z" fill="url(#wingBlueFeather)" stroke="#0f172a" strokeWidth="1" />

            {/* Tier 3: Inner Golden Feathers */}
            <path d="M 180 180 C 200 145 225 145 240 170 C 220 190 200 215 185 245 Z" fill="url(#wingGoldFeather)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M 175 190 C 190 160 210 160 225 185 C 205 205 190 225 180 255 Z" fill="url(#wingGoldFeather)" stroke="#78350f" strokeWidth="1.2" />
          </g>

          {/* Ascended God-Pharaoh Body (Power Stance, Dual Clenched Fists) */}
          <g id="ascended-body">
            {/* Legs & Greaves */}
            <path d="M 132 290 L 120 375 L 140 375 L 146 290 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="124" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <path d="M 114 372 L 140 372 L 142 382 L 112 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            <path d="M 174 290 L 180 375 L 200 375 L 188 290 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="182" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <path d="M 176 372 L 202 372 L 206 382 L 176 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            {/* Kilt */}
            <path d="M 116 230 L 108 295 L 212 295 L 204 230 Z" fill="#fffdfa" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
            <path d="M 124 230 L 118 295 L 130 295 L 134 230 Z" fill="url(#pharaohLapis)" />
            <path d="M 186 230 L 190 295 L 202 295 L 196 230 Z" fill="url(#pharaohLapis)" />
            <path d="M 151 225 L 146 310 L 174 310 L 169 225 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            {/* Belt */}
            <rect x="116" y="218" width="88" height="15" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.8" />
            <polygon points="160,215 169,225 160,235 151,225" fill="#e11d48" stroke="#fde047" strokeWidth="1.5" filter="drop-shadow(0 0 6px #e11d48)" />

            {/* Torso */}
            <path d="M 118 118 C 112 160 116 200 120 220 L 200 220 C 204 200 208 160 202 118 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />

            {/* ASCENDED CHEST SCARAB WITH MAXIMUM RADIANCE */}
            <g id="ascended-scarab" transform="translate(160, 160)">
              <circle cx="0" cy="0" r="26" fill="#22d3ee" opacity="0.75" filter="blur(10px)" />
              <circle cx="0" cy="0" r="18" fill="#fde047" opacity="0.5" filter="blur(6px)" />
              <ellipse cx="0" cy="0" rx="16" ry="18" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <ellipse cx="0" cy="1" rx="11" ry="13" fill="url(#scarabCyanGlow)" stroke="#083344" strokeWidth="1.2" />
              <circle cx="0" cy="-3" r="3.5" fill="#f43f5e" stroke="#fff" strokeWidth="0.8" />
            </g>

            {/* Collar */}
            <path d="M 111 110 Q 160 145 209 110 L 202 135 Q 160 165 118 135 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />

            {/* Dual Power Arms with Clenched Fists */}
            {/* Left Arm */}
            <g id="power-left-arm">
              <path d="M 114 122 L 85 160 L 92 195 L 105 195 L 120 160 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              <path d="M 80 165 C 64 155 67 180 75 195 L 92 195 L 90 168 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <circle cx="78" cy="180" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
              <circle cx="98" cy="202" r="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Right Arm */}
            <g id="power-right-arm">
              <path d="M 206 122 L 235 160 L 228 195 L 215 195 L 200 160 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              <path d="M 240 165 C 256 155 253 180 245 195 L 228 195 L 230 168 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <circle cx="242" cy="180" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
              <circle cx="222" cy="202" r="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Head & Nemes */}
            <path d="M 124 58 Q 160 35 196 58 L 218 120 L 196 130 L 184 85 L 136 85 L 124 130 L 102 120 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
            <path d="M 108 100 L 120 125" stroke="url(#pharaohLapis)" strokeWidth="6" />
            <path d="M 212 100 L 200 125" stroke="url(#pharaohLapis)" strokeWidth="6" />

            <path d="M 140 60 Q 160 55 180 60 L 176 92 Q 160 105 144 92 Z" fill="#d97706" stroke="#451a03" strokeWidth="1.5" />

            {/* GLOWING DIVINE GOLDEN EYES */}
            <ellipse cx="150" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="150" cy="74" r="2.2" fill="#fde047" filter="drop-shadow(0 0 6px #fde047)" />

            <ellipse cx="170" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="170" cy="74" r="2.2" fill="#fde047" filter="drop-shadow(0 0 6px #fde047)" />

            {/* Beard & Uraeus */}
            <rect x="157" y="98" width="6" height="18" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
            <path d="M 160 54 Q 158 42 162 36 Q 164 42 160 48" fill="url(#pharaohGoldLight)" stroke="#dc2626" strokeWidth="1.8" filter="drop-shadow(0 0 6px #f59e0b)" />
          </g>
        </svg>
      );

    // =========================================================================
    // 4. PHARAOH SENTRY (Mirrored / Alert Guard Stance)
    // =========================================================================
    case 'pharaoh_sentry':
      return (
        <svg viewBox="0 0 260 400" className="w-full h-full transform scale-x-[-1]">
          <SVGDefs />
          <ellipse cx="125" cy="200" rx="95" ry="145" fill="url(#divineFireAura)" filter="blur(16px)" />

          {/* Golden Staff (held in left hand, standing tall) */}
          <g id="staff-sentry">
            <rect x="212" y="55" width="7" height="340" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <polygon points="215.5,398 210,380 221,380" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.2" />

            <path d="M 213 85 C 190 75 192 48 205 32 C 208 45 212 60 213 85 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M 218 85 C 241 75 239 48 226 32 C 223 45 219 60 218 85 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.2" />

            <circle cx="215.5" cy="62" r="10" fill="url(#rubyOrb)" stroke="#fde047" strokeWidth="2" filter="drop-shadow(0 0 8px #f43f5e)" />
            <circle cx="213" cy="59" r="2.5" fill="#fff" opacity="0.85" />
          </g>

          {/* Pharaoh Figure */}
          <g id="pharaoh-sentry-body">
            <path d="M 98 290 L 88 375 L 108 375 L 112 290 Z" fill="#b45309" />
            <path d="M 92 300 L 86 368 L 106 368 L 110 300 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="90" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <path d="M 82 372 L 108 372 L 110 382 L 80 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            <path d="M 136 290 L 142 375 L 162 375 L 150 290 Z" fill="#b45309" />
            <path d="M 138 300 L 140 368 L 160 368 L 152 300 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="144" y="318" width="14" height="38" fill="url(#pharaohLapis)" rx="2" />
            <path d="M 138 372 L 164 372 L 168 382 L 138 382 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            <path d="M 80 230 L 72 295 L 176 295 L 168 230 Z" fill="#fffdfa" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
            <path d="M 88 230 L 82 295 L 94 295 L 98 230 Z" fill="url(#pharaohLapis)" />
            <path d="M 150 230 L 154 295 L 166 295 L 160 230 Z" fill="url(#pharaohLapis)" />
            <path d="M 115 225 L 110 310 L 138 310 L 133 225 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />

            <rect x="80" y="218" width="88" height="15" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.8" />
            <polygon points="124,215 133,225 124,235 115,225" fill="#e11d48" stroke="#fde047" strokeWidth="1.5" />

            <path d="M 82 118 C 76 160 80 200 84 220 L 164 220 C 168 200 172 160 166 118 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />

            <g id="sentry-scarab" transform="translate(124, 162)">
              <circle cx="0" cy="0" r="18" fill="url(#scarabCyanGlow)" opacity="0.4" filter="blur(6px)" />
              <ellipse cx="0" cy="0" rx="14" ry="16" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <ellipse cx="0" cy="1" rx="9" ry="11" fill="url(#scarabCyanGlow)" stroke="#083344" strokeWidth="1.2" />
              <circle cx="0" cy="-3" r="2.5" fill="#f43f5e" stroke="#fff" strokeWidth="0.5" />
            </g>

            <path d="M 75 110 Q 124 145 173 110 L 166 135 Q 124 165 82 135 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />

            <g id="sentry-arm-winged">
              <path d="M 78 122 L 56 168 L 62 208 L 74 210 L 80 168 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              <path d="M 52 170 C 35 160 38 185 46 205 L 62 208 L 60 175 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
              <circle cx="48" cy="184" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
              <circle cx="68" cy="214" r="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            <g id="sentry-arm-holding">
              <path d="M 170 122 L 195 165 L 210 190 L 218 184 L 188 145 Z" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
              <ellipse cx="214" cy="186" rx="7" ry="8" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            </g>

            <path d="M 88 58 Q 124 35 160 58 L 182 120 L 160 130 L 148 85 L 100 85 L 88 130 L 66 120 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
            <path d="M 104 60 Q 124 55 144 60 L 140 92 Q 124 105 108 92 Z" fill="#d97706" stroke="#451a03" strokeWidth="1.5" />
            <ellipse cx="114" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="114" cy="74" r="1.8" fill="#083344" />
            <ellipse cx="134" cy="74" rx="4.5" ry="2.5" fill="#fff" />
            <circle cx="134" cy="74" r="1.8" fill="#083344" />
            <rect x="121" y="98" width="6" height="18" rx="2" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1" />
            <path d="M 124 54 Q 122 42 126 36 Q 128 42 124 48" fill="url(#pharaohGoldLight)" stroke="#dc2626" strokeWidth="1.8" />
          </g>
        </svg>
      );

    // =========================================================================
    // 5. RA SUN GOD
    // =========================================================================
    case 'ra_falcon':
      return (
        <svg viewBox="0 0 240 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="110" cy="180" rx="90" ry="140" fill="rgba(245, 158, 11, 0.18)" filter="blur(22px)" />
          <circle cx="110" cy="40" r="28" fill="url(#sunburstNova)" filter="drop-shadow(0 0 16px #f59e0b)" />
          <path d="M 100 45 Q 110 20 120 45" fill="none" stroke="#dc2626" strokeWidth="3" />
          <path d="M 90 70 Q 110 55 130 70 L 140 100 L 115 118 L 85 95 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <polygon points="120,95 138,102 120,108" fill="#451a03" />
          <circle cx="108" cy="80" r="4.5" fill="#06b6d4" stroke="#fff" strokeWidth="1" />
          <path d="M 75 80 Q 110 50 145 80 L 160 140 L 140 150 L 135 105 L 85 105 L 80 150 L 60 140 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
          <path d="M 68 145 C 65 190 70 250 75 290 L 145 290 C 150 250 155 190 152 145 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
          <rect x="70" y="285" width="80" height="15" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />
          <path d="M 75 300 L 60 390 L 160 390 L 145 300 Z" fill="#fffbeb" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
          <rect x="180" y="50" width="8" height="340" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="184" cy="65" r="14" fill="#06b6d4" stroke="#fde047" strokeWidth="2.5" filter="drop-shadow(0 0 10px #22d3ee)" />
        </svg>
      );

    // =========================================================================
    // 6. ISIS HIGH PRIESTESS
    // =========================================================================
    case 'isis_priestess':
      return (
        <svg viewBox="0 0 240 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="110" cy="180" rx="90" ry="140" fill="rgba(6, 182, 212, 0.18)" filter="blur(22px)" />
          <path d="M 85 45 C 80 15 95 10 100 45 Z" fill="url(#wingCrimsonFeather)" stroke="#fde047" strokeWidth="1" />
          <path d="M 110 40 C 110 5 118 5 118 40 Z" fill="#fff" stroke="#fde047" strokeWidth="1" />
          <path d="M 135 45 C 140 15 125 10 120 45 Z" fill="url(#wingBlueFeather)" stroke="#fde047" strokeWidth="1" />
          <path d="M 80 50 Q 110 35 140 50 L 135 68 L 85 68 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="110" cy="55" r="5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
          <path d="M 92 68 Q 110 65 128 68 L 122 105 Q 110 115 98 105 Z" fill="#d97706" />
          <path d="M 80 65 L 75 140 L 90 140 L 92 80 Z" fill="#0f172a" />
          <path d="M 140 65 L 145 140 L 130 140 L 128 80 Z" fill="#0f172a" />
          <path d="M 75 140 Q 110 165 145 140 L 140 190 Q 110 215 80 190 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="95" cy="170" r="6" fill="#06b6d4" stroke="#fde047" strokeWidth="1" />
          <circle cx="125" cy="170" r="6" fill="#06b6d4" stroke="#fde047" strokeWidth="1" />
          <path d="M 82 195 L 68 390 L 152 390 L 138 195 Z" fill="#f8fafc" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
          <rect x="175" y="45" width="6" height="345" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="178" cy="58" r="12" fill="#ec4899" stroke="#fde047" strokeWidth="2" filter="drop-shadow(0 0 8px #f43f5e)" />
        </svg>
      );

    // =========================================================================
    // 7. ANUBIS JACKAL GUARDIAN
    // =========================================================================
    case 'anubis_jackal':
      return (
        <svg viewBox="0 0 240 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="110" cy="180" rx="90" ry="140" fill="rgba(6, 182, 212, 0.18)" filter="blur(22px)" />
          <path d="M 85 20 L 105 70 L 75 70 Z" fill="#090d16" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
          <path d="M 86 30 L 98 65 L 80 65 Z" fill="#0284c7" opacity="0.8" />
          <path d="M 155 20 L 135 70 L 165 70 Z" fill="#090d16" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
          <path d="M 154 30 L 142 65 L 160 65 Z" fill="#0284c7" opacity="0.8" />
          <path d="M 80 65 Q 120 35 160 65 L 175 125 L 155 135 L 148 90 L 92 90 L 85 135 L 65 125 Z" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="2" />
          <path d="M 95 65 Q 120 60 145 65 L 138 105 L 120 120 L 102 105 Z" fill="#050811" stroke="url(#pharaohGoldLight)" strokeWidth="1.5" />
          <ellipse cx="108" cy="80" rx="5" ry="3" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
          <ellipse cx="132" cy="80" rx="5" ry="3" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
          <path d="M 78 135 C 75 180 80 240 85 280 L 155 280 C 160 240 165 180 162 135 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
          <rect x="80" y="275" width="80" height="15" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />
          <path d="M 85 290 L 70 380 L 170 380 L 155 290 Z" fill="#0f172a" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
          <rect x="45" y="40" width="8" height="340" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="49" cy="55" r="14" fill="#06b6d4" stroke="#fde047" strokeWidth="2.5" filter="drop-shadow(0 0 10px #22d3ee)" />
        </svg>
      );

    // =========================================================================
    // 8. EGYPTIAN CHAMPION WARRIOR
    // =========================================================================
    case 'warrior_champion':
      return (
        <svg viewBox="0 0 240 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="110" cy="180" rx="90" ry="140" fill="rgba(225, 29, 72, 0.18)" filter="blur(22px)" />
          <path d="M 110 15 C 80 15 70 45 105 50 C 130 50 140 15 110 15 Z" fill="#e11d48" stroke="#fde047" strokeWidth="1.5" />
          <path d="M 85 45 Q 110 30 135 45 L 140 85 L 125 105 L 95 105 L 80 85 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="2" />
          <path d="M 68 135 C 65 180 70 240 75 280 L 145 280 C 150 240 155 180 152 135 Z" fill="#d97706" stroke="#451a03" strokeWidth="2" />
          <path d="M 75 140 L 145 260" stroke="url(#pharaohGoldLight)" strokeWidth="6" />
          <path d="M 145 140 L 75 260" stroke="url(#pharaohGoldLight)" strokeWidth="6" />
          <circle cx="110" cy="200" r="8" fill="#e11d48" stroke="#fde047" strokeWidth="1.5" />
          <rect x="70" y="275" width="80" height="15" rx="3" fill="url(#pharaohGoldLight)" stroke="#78350f" strokeWidth="1.5" />
          <path d="M 75 290 L 60 380 L 160 380 L 145 290 Z" fill="#991b1b" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
          <rect x="180" y="30" width="6" height="355" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <polygon points="183,10 190,32 176,32" fill="#e11d48" stroke="#fde047" strokeWidth="1.5" />
        </svg>
      );

    // =========================================================================
    // 9. HATHOR GODDESS
    // =========================================================================
    case 'hathor_goddess':
      return (
        <svg viewBox="0 0 240 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="110" cy="180" rx="90" ry="140" fill="rgba(236, 72, 153, 0.18)" filter="blur(22px)" />
          <path d="M 80 55 C 65 30 75 10 90 20 C 85 35 90 50 95 60 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <path d="M 140 55 C 155 30 145 10 130 20 C 135 35 130 50 125 60 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="110" cy="35" r="16" fill="#fde047" stroke="#e11d48" strokeWidth="2" filter="drop-shadow(0 0 10px #f59e0b)" />
          <path d="M 95 65 Q 110 60 125 65 L 120 105 Q 110 115 100 105 Z" fill="#d97706" />
          <path d="M 85 65 L 75 150 L 92 150 L 95 80 Z" fill="#0284c7" />
          <path d="M 135 65 L 145 150 L 128 150 L 125 80 Z" fill="#0284c7" />
          <path d="M 75 130 Q 110 160 145 130 L 140 175 Q 110 200 80 175 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="1.5" />
          <path d="M 82 185 L 70 390 L 150 390 L 138 185 Z" fill="#0284c7" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
        </svg>
      );

    // =========================================================================
    // 10. GOLDEN SARCOPHAGUS
    // =========================================================================
    case 'gold_sarcophagus':
    default:
      return (
        <svg viewBox="0 0 240 400" className="w-full h-full">
          <SVGDefs />
          <ellipse cx="110" cy="180" rx="90" ry="140" fill="rgba(234, 179, 8, 0.2)" filter="blur(22px)" />
          <path d="M 70 45 Q 110 20 150 45 L 165 90 L 155 140 L 145 385 L 75 385 L 65 140 L 55 90 Z" fill="url(#pharaohGoldLight)" stroke="#451a03" strokeWidth="3" />
          <path d="M 90 55 Q 110 48 130 55 L 125 90 Q 110 100 95 90 Z" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
          <path d="M 80 145 L 140 190" stroke="#fde047" strokeWidth="4" strokeLinecap="round" />
          <path d="M 140 145 L 80 190" stroke="#fde047" strokeWidth="4" strokeLinecap="round" />
          <circle cx="110" cy="168" r="8" fill="#06b6d4" stroke="#fde047" strokeWidth="1.5" />
          <rect x="94" y="210" width="32" height="155" fill="#78350f" stroke="url(#pharaohGoldLight)" strokeWidth="2" />
          <line x1="110" y1="215" x2="110" y2="360" stroke="#fde047" strokeWidth="3" strokeDasharray="4 4" />
        </svg>
      );
  }
};

interface GuardianSideProps {
  side: 'left' | 'right';
  characterId: GuardianCharacterId;
  onChangeCharacter?: (newId: GuardianCharacterId) => void;
  isSpinning: boolean;
  winAmount: number;
  isFreeSpins: boolean;
}

export const RealisticTempleGuardian: React.FC<GuardianSideProps> = ({
  side,
  characterId,
  onChangeCharacter,
  isSpinning,
  winAmount,
  isFreeSpins,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showBlessing, setShowBlessing] = useState(false);
  const [showRoster, setShowRoster] = useState(false);

  // Dynamic automatic stance shifting for the Pharaoh God:
  // When FreeSpins or Big Win -> Ascend with multicolored wings!
  // When Spinning -> Raise staff in invocation!
  // Otherwise -> base selected character stance!
  let activeRenderId = characterId;
  if (
    characterId === 'pharaoh_solar_flame' ||
    characterId === 'pharaoh_sun_guardian' ||
    characterId === 'pharaoh_invoker' ||
    characterId === 'pharaoh_ascended_winged' ||
    characterId === 'pharaoh_sentry'
  ) {
    if (isFreeSpins || winAmount >= 500) {
      activeRenderId = 'pharaoh_ascended_winged';
    } else if (isSpinning) {
      activeRenderId = 'pharaoh_invoker';
    } else if (characterId === 'pharaoh_solar_flame') {
      activeRenderId = 'pharaoh_solar_flame';
    } else if (characterId === 'pharaoh_sentry' || side === 'right') {
      activeRenderId = characterId === 'pharaoh_sun_guardian' ? 'pharaoh_sun_guardian' : characterId;
    }
  }

  const charMeta = GUARDIAN_ROSTER[activeRenderId] || GUARDIAN_ROSTER.pharaoh_solar_flame;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-[480px] sm:h-[540px] flex items-center justify-center select-none group"
    >
      {/* Stone Temple Column Background */}
      <div
        className={`absolute inset-y-0 ${
          side === 'left' ? 'left-2 border-r' : 'right-2 border-l'
        } w-28 sm:w-36 bg-gradient-to-${side === 'left' ? 'r' : 'l'} from-[#17120c] via-[#241c14] to-[#120e0a] border-amber-900/40 rounded-lg opacity-80 pointer-events-none`}
      />

      {/* Flaming Torch on Stone Pillar with Particle Embers */}
      <div
        className={`absolute top-10 ${
          side === 'left' ? 'left-5' : 'right-5'
        } z-10 flex flex-col items-center pointer-events-none`}
      >
        <div className="relative w-8 h-12">
          <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full blur-[2px] animate-pulse" />
          <div className="absolute inset-1.5 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full blur-[1px]" />
          <div className="absolute -top-3 left-2 w-4 h-4 bg-yellow-300 rounded-full blur-[4px] animate-ping" style={{ animationDuration: '3s' }} />
        </div>
        <div className="w-6 h-10 bg-gradient-to-b from-[#78350f] via-[#451a03] to-[#1c0a00] border border-amber-700/60 rounded-b-md shadow-lg" />
      </div>

      {/* Floating Golden Orbs / Dust Motes */}
      <div className="absolute top-28 right-4 w-3 h-3 rounded-full bg-yellow-300/80 blur-[1px] shadow-[0_0_8px_#fde047] animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-48 left-8 w-2 h-2 rounded-full bg-amber-400/90 blur-[0.5px] shadow-[0_0_6px_#fbbf24] animate-bounce" style={{ animationDuration: '3.2s' }} />

      {/* Switch Character Button */}
      <button
        id={`switch-guardian-${side}`}
        onClick={() => setShowRoster(!showRoster)}
        title="Switch Guardian Character"
        className="cursor-pointer absolute top-2 right-2 sm:right-4 z-30 px-2 py-1 rounded-full bg-black/70 hover:bg-amber-950/80 border border-amber-500/60 text-amber-300 text-[10px] font-cinzel font-bold flex items-center gap-1 shadow-lg hover:scale-105 active:scale-95 transition-all opacity-80 hover:opacity-100"
      >
        <RefreshCw className="w-3 h-3" />
        <span className="hidden sm:inline">Change</span>
      </button>

      {/* Roster Character Selection Popup */}
      <AnimatePresence>
        {showRoster && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-12 z-40 w-52 sm:w-60 p-2 rounded-xl bg-gradient-to-b from-[#1c1308] to-[#0a0703] border-2 border-amber-400 shadow-2xl space-y-1.5"
          >
            <div className="text-[11px] font-black text-amber-300 uppercase font-cinzel border-b border-amber-600/40 pb-1 text-center flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>Choose Guardian</span>
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-56 overflow-y-auto pr-1">
              {(Object.keys(GUARDIAN_ROSTER) as GuardianCharacterId[]).map((rId) => {
                const item = GUARDIAN_ROSTER[rId];
                return (
                  <button
                    key={rId}
                    onClick={() => {
                      if (onChangeCharacter) onChangeCharacter(rId);
                      setShowRoster(false);
                      audioEngine.playButtonClick();
                    }}
                    className={`cursor-pointer w-full text-left px-2 py-1.5 rounded-lg text-xs font-cinzel flex items-center justify-between border transition-all ${
                      characterId === rId
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-200'
                        : 'bg-black/40 text-amber-200 hover:bg-amber-900/40 border-amber-800/40'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-[11px]">{item.name}</span>
                      <span className="text-[9px] opacity-75 font-serif line-clamp-1">{item.title}</span>
                    </div>
                    <span className="text-[9px] opacity-75">{characterId === rId ? '✓' : ''}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Parallax Character Render with Solar Halo */}
      <motion.div
        onClick={() => {
          setShowBlessing(true);
          audioEngine.playBigWin();
          setTimeout(() => setShowBlessing(false), 3500);
        }}
        animate={{
          rotateY: tilt.x,
          rotateX: tilt.y,
          y: isSpinning ? [-5, 5, -5] : [0, -6, 0],
          scale: winAmount > 0 ? 1.08 : 1,
        }}
        transition={{
          y: { repeat: Infinity, duration: isSpinning ? 0.35 : 3.5, ease: 'easeInOut' },
          scale: { duration: 0.3 },
        }}
        className="relative z-20 w-full h-full flex items-center justify-center cursor-pointer select-none"
      >
        {/* Divine Solar Halo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              scale: isSpinning ? [1, 1.2, 1] : [0.95, 1.05, 0.95],
              opacity: isSpinning ? [0.6, 0.9, 0.6] : (winAmount > 0 ? 0.85 : 0.4),
            }}
            transition={{ repeat: Infinity, duration: isSpinning ? 0.8 : 2.5, ease: 'easeInOut' }}
            className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-orange-500/30 blur-2xl"
          />
        </div>

        {charMeta.imageUrl ? (
          <div
            className={`relative w-full h-full flex items-center justify-center ${
              side === 'right' ? 'transform scale-x-[-1]' : ''
            }`}
          >
            <img
              src={charMeta.imageUrl}
              alt={charMeta.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all duration-300 pointer-events-none"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
            {renderCharacterSVG(activeRenderId)}
          </div>
        )}
      </motion.div>

      {/* Character Nameplate Banner */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 px-3 py-0.5 rounded-full bg-[#050811]/90 border border-amber-500/60 text-amber-300 text-[10px] sm:text-xs font-cinzel font-black tracking-wider uppercase shadow-md pointer-events-none whitespace-nowrap">
        {charMeta.name}
      </div>

      {/* Interactive Speech Blessing Bubble */}
      <AnimatePresence>
        {showBlessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute -top-8 ${
              side === 'left' ? 'left-4' : 'right-4'
            } z-30 w-56 p-2.5 rounded-xl bg-gradient-to-b from-[#1c1308] to-[#0a0703] border border-amber-400 text-amber-200 text-center font-cinzel text-xs font-bold shadow-[0_0_25px_rgba(245,158,11,0.7)]`}
          >
            "{charMeta.quote}"
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Default left and right guardians use the official Ra Sun Sovereign character image
export const PharaohLeftGuardian: React.FC<{
  isSpinning: boolean;
  winAmount: number;
  isFreeSpins: boolean;
}> = (props) => {
  const [charId, setCharId] = useState<GuardianCharacterId>('pharaoh_solar_flame');
  return (
    <RealisticTempleGuardian
      side="left"
      characterId={charId}
      onChangeCharacter={setCharId}
      {...props}
    />
  );
};

export const AnubisRightGuardian: React.FC<{
  isSpinning: boolean;
  winAmount: number;
  isFreeSpins: boolean;
}> = (props) => {
  const [charId, setCharId] = useState<GuardianCharacterId>('ra_sun_god');
  return (
    <RealisticTempleGuardian
      side="right"
      characterId={charId}
      onChangeCharacter={setCharId}
      {...props}
    />
  );
};

export const TempleGuardians: React.FC<any> = () => null;
