import React from 'react';

interface MainPharaohAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showStaff?: boolean;
  showGlow?: boolean;
  customUrl?: string;
  className?: string;
  onClick?: () => void;
}

export const DEFAULT_RA_IMAGE_URL = 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/ra.png';

export const MainPharaohAvatar: React.FC<MainPharaohAvatarProps> = ({
  size = 'md',
  showStaff = true,
  showGlow = true,
  customUrl = DEFAULT_RA_IMAGE_URL,
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-36 h-36 sm:w-44 sm:h-44',
    full: 'w-full h-full',
  }[size];

  if (customUrl) {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center justify-center overflow-hidden ${sizeClasses} ${className}`}
      >
        {showGlow && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 opacity-40 blur-md pointer-events-none" />
        )}
        <img
          src={customUrl}
          alt="Ra Sun God Avatar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]"
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
    >
      {/* Optional Solar Glow */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 opacity-30 blur-md pointer-events-none" />
      )}

      {/* Ultra-Crisp Transparent Vector Art matching user image */}
      <svg
        viewBox="0 0 280 340"
        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="phMainGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="phMainLapisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="70%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          <radialGradient id="phMainRubyGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fecdd3" />
            <stop offset="30%" stopColor="#f43f5e" />
            <stop offset="70%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#4c0519" />
          </radialGradient>

          <radialGradient id="phMainTurquoiseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="40%" stopColor="#22d3ee" />
            <stop offset="80%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#083344" />
          </radialGradient>

          <linearGradient id="phMainSkinGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>

        {/* 1. TALL GOLDEN WINGED RUBY SCEPTER (Held in Left Hand) */}
        {showStaff && (
          <g id="avatar-winged-scepter">
            {/* Long Burnished Golden Shaft */}
            <line
              x1="225"
              y1="40"
              x2="175"
              y2="335"
              stroke="url(#phMainGoldGrad)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="225"
              y1="40"
              x2="175"
              y2="335"
              stroke="#451a03"
              strokeWidth="1"
              strokeDasharray="8 24"
            />

            {/* Scepter Top Winged Crescent & Ruby Orb */}
            <g transform="translate(225, 40)">
              {/* Collar Mount */}
              <path
                d="M -7 16 L 7 16 L 4 28 L -4 28 Z"
                fill="url(#phMainGoldGrad)"
                stroke="#451a03"
                strokeWidth="1"
              />
              <circle cx="0" cy="22" r="2.5" fill="#e11d48" />

              {/* Curved Wing Crescent Embracing Sun */}
              {/* Left Feathered Crescent */}
              <path
                d="M -4 16 C -20 12 -30 -8 -20 -32 C -16 -18 -8 -4 0 2 Z"
                fill="url(#phMainGoldGrad)"
                stroke="#78350f"
                strokeWidth="1.2"
                filter="drop-shadow(0 0 5px rgba(245,158,11,0.6))"
              />
              <path d="M -22 -22 C -16 -10 -10 -1 -3 8" fill="none" stroke="#b45309" strokeWidth="1" />
              <path d="M -18 -8 C -12 -1 -6 5 0 11" fill="none" stroke="#b45309" strokeWidth="1" />

              {/* Right Feathered Crescent */}
              <path
                d="M 4 16 C 20 12 30 -8 20 -32 C 16 -18 8 -4 0 2 Z"
                fill="url(#phMainGoldGrad)"
                stroke="#78350f"
                strokeWidth="1.2"
                filter="drop-shadow(0 0 5px rgba(245,158,11,0.6))"
              />
              <path d="M 22 -22 C 16 -10 10 -1 3 8" fill="none" stroke="#b45309" strokeWidth="1" />
              <path d="M 18 -8 C 12 -1 6 5 0 11" fill="none" stroke="#b45309" strokeWidth="1" />

              {/* Central Golden Base Ring */}
              <circle cx="0" cy="-6" r="15" fill="url(#phMainGoldGrad)" stroke="#451a03" strokeWidth="1.2" />

              {/* GLOWING MOLTEN RUBY SOLAR SPHERE */}
              <circle
                cx="0"
                cy="-6"
                r="11.5"
                fill="url(#phMainRubyGrad)"
                stroke="#fef08a"
                strokeWidth="1.5"
                filter="drop-shadow(0 0 10px #f43f5e)"
              />
              {/* Highlight */}
              <ellipse cx="-3" cy="-9" rx="3" ry="1.8" fill="#ffffff" opacity="0.85" />
            </g>
          </g>
        )}

        {/* 2. GOD-PHARAOH BODY & ARMOR */}
        <g id="avatar-god-pharaoh">
          {/* Muscular Golden Torso */}
          <path
            d="M 94 135 C 86 175 90 220 94 240 L 186 240 C 190 220 194 175 186 135 Z"
            fill="url(#phMainSkinGold)"
            stroke="#451a03"
            strokeWidth="1.8"
          />
          {/* Abdominal 6-Pack Definition */}
          <path d="M 114 185 Q 140 192 166 185" fill="none" stroke="#78350f" strokeWidth="1.8" />
          <path d="M 118 210 Q 140 216 162 210" fill="none" stroke="#78350f" strokeWidth="1.8" />
          <line x1="140" y1="170" x2="140" y2="235" stroke="#78350f" strokeWidth="1.5" />

          {/* Lapis Torso Side Inlays */}
          <path
            d="M 95 160 C 92 190 94 220 98 238 L 108 238 C 104 220 102 190 105 160 Z"
            fill="url(#phMainLapisGrad)"
            stroke="#451a03"
            strokeWidth="1"
          />
          <path
            d="M 185 160 C 188 190 186 220 182 238 L 172 238 C 176 220 178 190 175 160 Z"
            fill="url(#phMainLapisGrad)"
            stroke="#451a03"
            strokeWidth="1"
          />

          {/* RADIANT SCARAB AMULET ON CHEST */}
          <g id="avatar-chest-scarab" transform="translate(140, 180)">
            <circle cx="0" cy="0" r="24" fill="url(#phMainTurquoiseGlow)" opacity="0.45" filter="blur(6px)" />
            {/* Top Ruby Brooch */}
            <circle
              cx="0"
              cy="-20"
              r="4.5"
              fill="url(#phMainRubyGrad)"
              stroke="#fde047"
              strokeWidth="1.2"
              filter="drop-shadow(0 0 4px #f43f5e)"
            />

            {/* Gold Scarab Base & Gripping Claws */}
            <ellipse cx="0" cy="0" rx="16" ry="18" fill="url(#phMainGoldGrad)" stroke="#451a03" strokeWidth="1.2" />
            <path d="M -14 -6 Q -22 -12 -18 -2" fill="none" stroke="url(#phMainGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 14 -6 Q 22 -12 18 -2" fill="none" stroke="url(#phMainGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M -15 6 Q -22 10 -16 14" fill="none" stroke="url(#phMainGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 15 6 Q 22 10 16 14" fill="none" stroke="url(#phMainGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />

            {/* Turquoise Gemstone Body */}
            <ellipse cx="0" cy="1" rx="11" ry="13" fill="url(#phMainTurquoiseGlow)" stroke="#083344" strokeWidth="1.2" />
            <line x1="0" y1="-10" x2="0" y2="13" stroke="#fde047" strokeWidth="1.2" />
            <path d="M -7 -2 Q 0 -5 7 -2" fill="none" stroke="#fde047" strokeWidth="1" />

            {/* Golden Scarab Head */}
            <path d="M -4 -10 Q 0 -15 4 -10 Z" fill="url(#phMainGoldGrad)" stroke="#451a03" strokeWidth="0.8" />
            {/* Bottom Ruby Teardrop */}
            <polygon points="0,15 -3.5,22 0,25 3.5,22" fill="#e11d48" stroke="#fde047" strokeWidth="0.8" />
          </g>

          {/* Broad Pharaonic Beaded Collar */}
          <g id="avatar-collar">
            <path
              d="M 84 125 Q 140 160 196 125 L 188 150 Q 140 182 92 150 Z"
              fill="url(#phMainGoldGrad)"
              stroke="#78350f"
              strokeWidth="1.5"
            />
            <path d="M 94 132 Q 140 156 186 132" fill="none" stroke="url(#phMainLapisGrad)" strokeWidth="4.5" />
            <circle cx="116" cy="143" r="2" fill="#22d3ee" />
            <circle cx="127" cy="147" r="2" fill="#f43f5e" />
            <circle cx="153" cy="147" r="2" fill="#f43f5e" />
            <circle cx="164" cy="143" r="2" fill="#22d3ee" />
          </g>

          {/* Royal Shendyt Kilt & Belt */}
          <g id="avatar-kilt">
            <path d="M 94 250 L 86 335 L 194 335 L 186 250 Z" fill="#fffdfa" stroke="url(#phMainGoldGrad)" strokeWidth="2" />
            <line x1="104" y1="250" x2="98" y2="335" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="176" y1="250" x2="182" y2="335" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Central Lapis Apron */}
            <path d="M 128 245 L 123 335 L 157 335 L 152 245 Z" fill="url(#phMainLapisGrad)" stroke="url(#phMainGoldGrad)" strokeWidth="1.8" />
            <line x1="140" y1="250" x2="140" y2="330" stroke="url(#phMainGoldGrad)" strokeWidth="3" />

            {/* Golden Belt */}
            <rect x="92" y="238" width="96" height="15" rx="3" fill="url(#phMainGoldGrad)" stroke="#78350f" strokeWidth="1.8" />
            <line x1="94" y1="245" x2="186" y2="245" stroke="url(#phMainLapisGrad)" strokeWidth="2.5" />

            {/* Faceted Ruby Buckle */}
            <polygon
              points="140,235 149,245 140,256 131,245"
              fill="#e11d48"
              stroke="#fde047"
              strokeWidth="1.8"
              filter="drop-shadow(0 0 5px #e11d48)"
            />
          </g>

          {/* Right Arm + Winged Falcon Ruby Bracer + Clenched Fist */}
          <g id="avatar-right-arm">
            <path d="M 90 135 L 64 180 L 72 220 L 84 222 L 94 180 Z" fill="url(#phMainSkinGold)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="76" y="152" width="16" height="9" rx="2" fill="url(#phMainGoldGrad)" stroke="#451a03" strokeWidth="1" />
            <line x1="76" y1="156" x2="92" y2="156" stroke="url(#phMainLapisGrad)" strokeWidth="2.5" />

            {/* Winged Bracer with Ruby */}
            <path
              d="M 60 180 C 40 170 42 200 50 224 L 72 222 L 70 185 Z"
              fill="url(#phMainGoldGrad)"
              stroke="#451a03"
              strokeWidth="1.2"
              filter="drop-shadow(0 0 5px rgba(245,158,11,0.5))"
            />
            <path d="M 43 186 Q 54 195 64 204" fill="none" stroke="#78350f" strokeWidth="1" />
            <ellipse cx="54" cy="198" rx="4.5" ry="6" fill="url(#phMainRubyGrad)" stroke="#fde047" strokeWidth="1.2" filter="drop-shadow(0 0 4px #f43f5e)" />

            {/* Clenched Fist */}
            <circle cx="78" cy="232" r="8" fill="url(#phMainSkinGold)" stroke="#451a03" strokeWidth="1.5" />
          </g>

          {/* Left Arm Gripping Staff */}
          <g id="avatar-left-arm">
            <path d="M 190 135 L 216 175 L 232 208 L 242 200 L 208 155 Z" fill="url(#phMainSkinGold)" stroke="#451a03" strokeWidth="1.5" />
            <rect x="194" y="152" width="16" height="9" rx="2" fill="url(#phMainGoldGrad)" stroke="#451a03" strokeWidth="1" />
            <line x1="194" y1="156" x2="210" y2="156" stroke="url(#phMainLapisGrad)" strokeWidth="2.5" />

            {/* Bracer */}
            <rect x="214" y="180" width="16" height="12" rx="2" fill="url(#phMainGoldGrad)" stroke="#451a03" strokeWidth="1" />
            {/* Gripping Hand */}
            <ellipse cx="233" cy="206" rx="7.5" ry="8.5" fill="url(#phMainSkinGold)" stroke="#451a03" strokeWidth="1.5" />
          </g>

          {/* HEAD & ROYAL STRIPED LAPIS NEMES HEADDRESS */}
          <g id="avatar-head">
            {/* Nemes Flared Wings */}
            <path
              d="M 98 72 Q 140 45 182 72 L 206 140 L 180 153 L 168 100 L 112 100 L 100 153 L 74 140 Z"
              fill="url(#phMainGoldGrad)"
              stroke="#451a03"
              strokeWidth="2"
            />
            {/* Lapis Stripes */}
            <path d="M 84 114 L 97 146" stroke="url(#phMainLapisGrad)" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M 90 88 L 108 104" stroke="url(#phMainLapisGrad)" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 196 114 L 183 146" stroke="url(#phMainLapisGrad)" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M 190 88 L 172 104" stroke="url(#phMainLapisGrad)" strokeWidth="5.5" strokeLinecap="round" />

            <path d="M 112 66 Q 140 56 168 66" fill="none" stroke="url(#phMainLapisGrad)" strokeWidth="3.5" />
            <path d="M 118 52 Q 140 44 162 52" fill="none" stroke="url(#phMainLapisGrad)" strokeWidth="2.8" />

            {/* Golden Regal Face */}
            <path
              d="M 118 72 Q 140 68 162 72 L 158 108 Q 140 122 122 108 Z"
              fill="#f59e0b"
              stroke="#451a03"
              strokeWidth="1.5"
            />

            {/* Kohl Lined Eyes */}
            <ellipse cx="129" cy="88" rx="4.5" ry="2.8" fill="#ffffff" />
            <circle cx="129" cy="88" r="2" fill="#083344" />
            <circle cx="128" cy="87" r="0.6" fill="#ffffff" />
            <path d="M 122 86 L 135 86 L 138 89" stroke="#090d16" strokeWidth="1.4" fill="none" strokeLinecap="round" />

            <ellipse cx="151" cy="88" rx="4.5" ry="2.8" fill="#ffffff" />
            <circle cx="151" cy="88" r="2" fill="#083344" />
            <circle cx="150" cy="87" r="0.6" fill="#ffffff" />
            <path d="M 145 86 L 158 86 L 161 89" stroke="#090d16" strokeWidth="1.4" fill="none" strokeLinecap="round" />

            {/* Nose & Lips */}
            <path d="M 140 85 L 140 96 L 144 98" fill="none" stroke="#78350f" strokeWidth="1.1" />
            <path d="M 134 104 Q 140 108 146 104" fill="none" stroke="#b45309" strokeWidth="1.4" />

            {/* Braided Osiris Beard */}
            <rect x="136" y="114" width="8" height="22" rx="2.5" fill="url(#phMainGoldGrad)" stroke="#451a03" strokeWidth="1" />
            <line x1="136" y1="120" x2="144" y2="124" stroke="#451a03" strokeWidth="0.9" />
            <line x1="144" y1="120" x2="136" y2="124" stroke="#451a03" strokeWidth="0.9" />
            <line x1="136" y1="126" x2="144" y2="130" stroke="#451a03" strokeWidth="0.9" />

            {/* Forehead Band & Rearing Uraeus Cobra */}
            <path d="M 114 70 Q 140 64 166 70 L 164 78 Q 140 72 116 78 Z" fill="url(#phMainGoldGrad)" stroke="#78350f" strokeWidth="1.2" />
            <circle cx="140" cy="74" r="2" fill="#06b6d4" />
            <path
              d="M 140 66 Q 134 50 142 42 Q 146 50 140 58"
              fill="url(#phMainGoldGrad)"
              stroke="#dc2626"
              strokeWidth="2"
              filter="drop-shadow(0 0 3px #f59e0b)"
            />
            <circle cx="141" cy="45" r="1.2" fill="#fef08a" />
          </g>
        </g>
      </svg>
    </div>
  );
};
