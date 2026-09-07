export type SymbolId =
  | 'eye_of_ra'        // Wild & Multiplier
  | 'scarab'           // Bonus Chamber Scatter
  | 'book_of_dead'     // Free Spins Scatter
  | 'pharaoh_mask'     // Highest Regular Payout
  | 'cleopatra'        // High Payout
  | 'anubis'           // High Payout
  | 'horus_falcon'     // Medium Payout
  | 'ankh'             // Medium Payout
  | 'bastet_cat'       // Medium Payout
  | 'royal_a'          // Low
  | 'royal_k'          // Low
  | 'royal_q'          // Low
  | 'royal_j'          // Low
  | 'royal_10';        // Low

export interface SymbolDefinition {
  id: SymbolId;
  name: string;
  category: 'wild' | 'bonus_scatter' | 'free_scatter' | 'high' | 'medium' | 'low';
  payouts: {
    3: number; // 3 of a kind multiplier on line bet
    4: number; // 4 of a kind
    5: number; // 5 of a kind
  };
  color: string;
  glowColor: string;
  description: string;
  svgIcon: string;
  imageUrl?: string;
}

export interface Payline {
  id: number;
  name: string;
  color: string;
  coordinates: [number, number][]; // 5 points: [col, row] for col = 0..4, row = 0..2
}

export interface LineWin {
  paylineId: number;
  symbolId: SymbolId;
  count: number;
  winAmount: number;
  coordinates: [number, number][];
  isWildEnhanced: boolean;
  multiplier: number;
}

export interface SpinResult {
  grid: SymbolId[][]; // 5 columns, 3 rows: grid[col][row]
  lineWins: LineWin[];
  totalWin: number;
  betAmount: number;
  bonusTriggered: boolean;
  freeSpinsTriggered: boolean;
  freeSpinsAwarded: number;
  scatterCountScarab: number;
  scatterCountBook: number;
  jackpotTriggered?: 'mini' | 'minor' | 'major' | 'grand' | null;
  jackpotAmount?: number;
  expandingSymbol?: SymbolId | null;
  timestamp: number;
}

export interface JackpotPool {
  mini: number;
  minor: number;
  major: number;
  grand: number;
}

export interface PlayerProfile {
  id: string;
  username: string;
  avatar: string; // 'pharaoh' | 'cleopatra' | 'anubis' | 'ra' | 'horus' | 'bastet' | 'pharaoh_solar_flame'
  customAvatarUrl?: string; // Optional custom transparent user image avatar
  pin: string;
  vipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond Pharaoh';
  vipPoints: number;
  balance: number;
  totalSpins: number;
  totalWagered: number;
  totalWon: number;
  biggestWin: number;
  biggestMultiplier: number;
  bonusGamesPlayed: number;
  freeSpinsTriggered: number;
  jackpotsHit: number;
  cloudSyncKey: string;
  lastLoginDate: string;
  loginStreak: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  turboMode: boolean;
  theme: 'midnight' | 'royal_gold' | 'obsidian' | 'desert_sunset';
  language: 'en' | 'ar' | 'es' | 'fr' | 'de' | 'zu' | 'ja';
  offlineSpinsPending: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardCoins: number;
  rewardVip: number;
  completed: boolean;
  claimed: boolean;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  vipTier: string;
  multiplier: number;
  date: string;
  isCurrentUser?: boolean;
}

export interface HolidayEvent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  themeColor: string;
  endDate: string;
  multiplierBoost: number;
  bonusChanceBoost: number;
  specialSymbol: SymbolId;
  eventQuests: DailyQuest[];
}

export interface AnalyticsData {
  spinHistory: {
    id: string;
    timestamp: number;
    bet: number;
    win: number;
    multiplier: number;
    type: 'normal' | 'free_spins' | 'bonus' | 'jackpot';
  }[];
  hourlyStats: { hour: string; spins: number; netProfit: number }[];
  symbolHitCounts: Record<SymbolId, number>;
  returnToPlayerPercentage: number;
  longestWinStreak: number;
  longestLossStreak: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'jackpot' | 'daily' | 'event' | 'system' | 'vip';
  read: boolean;
}
