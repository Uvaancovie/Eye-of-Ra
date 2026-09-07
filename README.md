# Eye of Ra: Pharaoh's Gold Slot & Jackpot

A feature-rich, high-performance **5-reel × 3-row Ancient Egyptian mythology slot game** built with **React 19, TypeScript, Tailwind CSS v4, Motion, and HTML5 Canvas**. 

Featuring server/client-authoritative slot mathematics, progressive multi-tier jackpots, interactive Egyptian deity companions (**Ra, Anubis, and Cleopatra**), mini-games (**Tomb of Treasures & Wheel of Ra**), interactive quests, and a 60fps particle physics engine.

---

## 🏛️ Key Highlights & Features

### 1. 5-Reel × 3-Row Slot Engine
- **20 Fixed Ancient Paylines**: Left-to-right evaluation across 20 distinct payline vectors with SVG laser trace overlays on wins.
- **Dynamic Symbols & Multipliers**:
  - 👁️ **Eye of Ra (Wild)**: Substitutes for all regular pay symbols and doubles payline wins.
  - 🪲 **Scarab of Gold (Bonus)**: 3+ triggers the interactive **Tomb of Treasures** mini-game.
  - 🔺 **Golden Pyramid (Scatter)**: 3+ awards up to 20 **Free Spins** with escalating multipliers (up to 10x).
  - 👑 **High-Tier Mythological Artifacts**: Pharaoh Mask, Anubis Figurine, Bastet Cat, Horus Falcon, Ankh of Life.
  - 🔤 **Low-Tier Hieroglyphs**: A, K, Q, J, 10.
- **Configurable Stakes**: Coin values from 1 to 100 with 1–10 bet levels (20 to 20,000 pts per spin).
- **Turbo Mode & Staggered Stops**: Smooth simulated reel deceleration with realistic tension anticipation.

### 2. Interactive Egyptian Character Pantheon & Realms
Players can dynamically toggle between deity realms via the top realm carousel:
- ☀️ **Ra · Sun Sovereign**: Radiant golden solar ambience with warm embers and sunbeam backdrops.
- 🐺 **Anubis · Jackal Lord**: Amethyst underworld crypt with glowing cyan spirit runes.
- 👑 **Cleopatra · Queen of the Nile**: Emerald & turquoise royal palace aura with shimmering dynasty gold.
- 👁️ **Max Reels Focus (Solo Mode)**: Expanded, distraction-free panoramic slot stage.
- **Interactive Speech & Audio**: Clicking characters triggers voice lines and royal decrees with custom sound effects.

### 3. 4-Tier Progressive Jackpots
Real-time ticking jackpot pools dynamically seeded from spin wagers:
- 👑 **Pharaoh Grand**: Major jackpot pool (starts at 250,000 pts).
- 💎 **Royal Major**: Mid-tier high payout (starts at 50,000 pts).
- ⚡ **Solar Minor**: Rapid-cycle jackpot (starts at 10,000 pts).
- 🌟 **Desert Mini**: High-frequency reward (starts at 2,500 pts).

### 4. Interactive Bonus Mini-Games
- 🏺 **Tomb of Treasures (Scarab Bonus)**: Pick sacred Egyptian urns to uncover hidden multiplier treasures, instant credits, and jackpot keys before hitting the cursed trap.
- 🎡 **Wheel of Ra**: Daily spin & bonus wheel with guaranteed credit prizes, extra multipliers, and free spins.

### 5. Particle Effects & Visual Polish
- **60fps HTML5 Canvas Particle Engine**:
  - **3D Tumbling Gold Coins**: Realistic tumbling physics with lighting highlights.
  - **Faceted Gem Shards**: Rubies, emeralds, sapphires, amethysts, and topaz crystals bursting in radial vectors.
  - **Sacred Solar Embers & Glyphs**: Turquoise scarabs, solar rays, and expanding shockwave rings.
  - **Dynamic Escalation**: Tailored particle fountains for **Big Win (10x)**, **Mega Win (20x)**, **Legendary Win (50x)**, and **Jackpots**.

### 6. Player Progression & Retention
- 📜 **Daily Quests & Challenges**: 3 daily objectives with rewards and timer resets.
- 🏆 **Global & VIP Leaderboard**: Real-time rank tracking with avatar badges and win statistics.
- 📊 **Analytics Dashboard**: Comprehensive metrics for RTP, spin counts, hit frequency, biggest wins, and session summaries.
- 🎁 **Daily Login Rewards**: 7-day progressive streak calendar.
- 🌍 **Localization (i18n)**: Multi-language support (English, Arabic, isiZulu, Spanish, French, German, Japanese, Chinese) with RTL layout handling.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript (ESM) |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 (with `@tailwindcss/vite`) |
| **Animations** | Motion (`motion/react`) |
| **Graphics & FX** | HTML5 Canvas 2D + `canvas-confetti` |
| **Icons** | Lucide React |
| **Audio Engine** | Web Audio API Synthesizer & Audio FX |
| **Data & Math** | Pure TypeScript mathematical paytable and RNG models |

---

## 📂 Project Structure

```
├── metadata.json               # App metadata, permissions, and capabilities
├── package.json                # Project dependencies and scripts
├── index.html                  # HTML entry point with Egyptian typography
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Core game orchestrator & state manager
│   ├── index.css               # Global Tailwind styles & Egyptian design tokens
│   ├── types.ts                # TypeScript interfaces, enums, and paytable types
│   ├── components/
│   │   ├── SlotMachine.tsx            # 5x3 Animated reel container & controls
│   │   ├── SymbolCell.tsx             # Individual animated symbol cell
│   │   ├── WinParticleCanvas.tsx      # High-performance Canvas particle engine
│   │   ├── DeityThemeCarousel.tsx     # Character selector & realm switcher
│   │   ├── RaSideCharacter.tsx        # Ra interactive animated character
│   │   ├── AnubisSideCharacter.tsx    # Anubis interactive animated character
│   │   ├── CleopatraSideCharacter.tsx # Cleopatra interactive animated character
│   │   ├── JackpotBar.tsx             # 4-tier live progressive ticker
│   │   ├── PharaohRaBanner.tsx        # Top golden temple crest & Free Spins status
│   │   ├── FreeSpinsOverlay.tsx       # Free spins multiplier banner & counter
│   │   ├── BonusTombModal.tsx         # Pick-a-chest Tomb mini-game
│   │   ├── WheelOfRaModal.tsx         # Wheel of Ra daily spin modal
│   │   ├── PaytableModal.tsx          # Payline guides, rules & symbol values
│   │   ├── LeaderboardModal.tsx       # VIP rankings & tournament stats
│   │   ├── DailyRewardsModal.tsx      # Quests & 7-day streak calendar
│   │   ├── AnalyticsDashboardModal.tsx# RTP, hit rate & player session telemetry
│   │   ├── AuthAndProfileModal.tsx    # Profile customizer, avatar & theme settings
│   │   ├── HolidayEventBanner.tsx     # Seasonal / holiday bonus event banner
│   │   ├── NotificationCenter.tsx     # In-game notification drawer
│   │   └── SocialShareModal.tsx       # Win card generator & share system
│   ├── data/
│   │   ├── egyptianSymbols.ts         # Symbol IDs, assets, and base paytables
│   │   ├── paylines.ts                # 20 standard payline coordinate maps
│   │   ├── holidayEvents.ts           # Timed seasonal events & multipliers
│   │   └── localization.ts            # Translation dictionaries (8+ languages)
│   └── utils/
│       ├── slotMath.ts                # RNG evaluation, line wins & RTP calculation
│       ├── audio.ts                   # WebAudio sound generator & SFX
│       └── storage.ts                 # LocalStorage state persistence
```

---

## 🎰 Slot Mechanics & Mathematics

- **Reels × Rows**: 5 × 3
- **Paylines**: 20 fixed lines
- **Volatility**: Medium-High
- **Theoretical RTP**: ~96.5%
- **Hit Frequency**: ~28.4%
- **Scatter Trigger**: 3+ Pyramids → 10, 15, or 20 Free Spins with 2x–10x escalating multipliers
- **Bonus Trigger**: 3+ Scarabs → Tomb of Treasures pick-and-win bonus
- **Jackpot Mechanism**: Random bonus roll on winning spins, scaled by total bet level

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start the Vite development server (Port 3000)
npm run dev
```

### Production Build

```bash
# Build optimized static assets for production
npm run build

# Preview production build
npm run preview
```

---

## 📜 Compliance & Disclaimers

- **Free-Play / Social Demo**: This application is a demo slot machine designed for entertainment, UI/UX demonstration, and portfolio integration.
- **No Real-Money Wagering**: No real currency deposits, withdrawals, or licensed gambling functionality exist in this codebase.
- **18+ Responsible Gaming**: Built with responsible gaming limits and session timers.
