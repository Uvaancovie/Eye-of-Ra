import { PlayerProfile, JackpotPool, DailyQuest, AnalyticsData, AppNotification } from '../types';

const PROFILE_KEY = 'eye_of_ra_player_profile';
const JACKPOT_KEY = 'eye_of_ra_jackpot_pool';
const QUESTS_KEY = 'eye_of_ra_daily_quests';
const ANALYTICS_KEY = 'eye_of_ra_analytics_data';
const NOTIFICATIONS_KEY = 'eye_of_ra_notifications';

export const INITIAL_JACKPOTS: JackpotPool = {
  mini: 3250,
  minor: 14800,
  major: 68500,
  grand: 384500,
};

export function generateSyncCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'RA-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function getDefaultPlayerProfile(): PlayerProfile {
  return {
    id: 'pharaoh_' + Math.random().toString(36).substring(2, 9),
    username: 'Golden Pharaoh',
    avatar: 'pharaoh_solar_flame',
    pin: '1234',
    vipTier: 'Gold',
    vipPoints: 1250,
    balance: 50000, // 50,000 Starting Demo Gold
    totalSpins: 0,
    totalWagered: 0,
    totalWon: 0,
    biggestWin: 0,
    biggestMultiplier: 0,
    bonusGamesPlayed: 0,
    freeSpinsTriggered: 0,
    jackpotsHit: 0,
    cloudSyncKey: generateSyncCode(),
    lastLoginDate: new Date().toISOString().split('T')[0],
    loginStreak: 1,
    soundEnabled: true,
    musicEnabled: false,
    turboMode: false,
    theme: 'midnight',
    language: 'en',
    offlineSpinsPending: 0,
  };
}

export function getDefaultQuests(): DailyQuest[] {
  return [
    {
      id: 'q_spin_50',
      title: 'Sacred Ritual',
      description: 'Spin the reels 30 times',
      target: 30,
      current: 0,
      rewardCoins: 3000,
      rewardVip: 100,
      completed: false,
      claimed: false,
    },
    {
      id: 'q_win_10x',
      title: "Pharaoh's Blessing",
      description: 'Score a win of 10x your total bet or higher',
      target: 1,
      current: 0,
      rewardCoins: 5000,
      rewardVip: 200,
      completed: false,
      claimed: false,
    },
    {
      id: 'q_eye_wild',
      title: 'Vision of Ra',
      description: 'Hit 3 winning combinations with the Eye of Ra Wild',
      target: 3,
      current: 0,
      rewardCoins: 6000,
      rewardVip: 250,
      completed: false,
      claimed: false,
    },
    {
      id: 'q_tomb_bonus',
      title: 'Tomb Raider',
      description: 'Trigger the Tomb of Osiris Bonus or Free Spins',
      target: 1,
      current: 0,
      rewardCoins: 10000,
      rewardVip: 500,
      completed: false,
      claimed: false,
    },
  ];
}

export function getDefaultAnalytics(): AnalyticsData {
  return {
    spinHistory: [],
    hourlyStats: [
      { hour: '12:00', spins: 15, netProfit: 1200 },
      { hour: '13:00', spins: 28, netProfit: -400 },
      { hour: '14:00', spins: 42, netProfit: 3500 },
      { hour: '15:00', spins: 35, netProfit: 1800 },
    ],
    symbolHitCounts: {
      eye_of_ra: 8,
      scarab: 4,
      book_of_dead: 3,
      pharaoh_mask: 7,
      cleopatra: 11,
      anubis: 14,
      horus_falcon: 18,
      ankh: 22,
      bastet_cat: 26,
      royal_a: 38,
      royal_k: 45,
      royal_q: 50,
      royal_j: 58,
      royal_10: 64,
    },
    returnToPlayerPercentage: 96.8,
    longestWinStreak: 4,
    longestLossStreak: 6,
  };
}

export function getDefaultNotifications(): AppNotification[] {
  return [
    {
      id: 'notif_1',
      title: "⚡ Pharaoh's Grand Jackpot Surges!",
      message: 'The Grand Progressive Jackpot has crossed 380,000 Coins! Spin now for your chance to win.',
      time: 'Just now',
      type: 'jackpot',
      read: false,
    },
    {
      id: 'notif_2',
      title: '🎁 Daily Login Streak Ready',
      message: 'Day 1 reward claimed. Come back tomorrow for 2,500 Coins + Wheel of Horus spin!',
      time: '1h ago',
      type: 'daily',
      read: false,
    },
    {
      id: 'notif_3',
      title: '🌊 Festival of the Nile Live',
      message: 'Limited-time event: 2x Scarab bonus frequency & +25% free spin multipliers active!',
      time: '3h ago',
      type: 'event',
      read: false,
    },
  ];
}

// Local Storage Helpers
export function loadPlayerProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Check login streak
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastLoginDate !== today) {
        const lastDate = new Date(parsed.lastLoginDate);
        const currentDate = new Date(today);
        const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          parsed.loginStreak = (parsed.loginStreak % 7) + 1;
        } else if (diffDays > 1) {
          parsed.loginStreak = 1;
        }
        parsed.lastLoginDate = today;
      }
      return { ...getDefaultPlayerProfile(), ...parsed };
    }
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  return getDefaultPlayerProfile();
}

export function savePlayerProfile(profile: PlayerProfile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function loadJackpots(): JackpotPool {
  try {
    const raw = localStorage.getItem(JACKPOT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_JACKPOTS;
}

export function saveJackpots(pool: JackpotPool) {
  try {
    localStorage.setItem(JACKPOT_KEY, JSON.stringify(pool));
  } catch {}
}

export function loadQuests(): DailyQuest[] {
  try {
    const raw = localStorage.getItem(QUESTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultQuests();
}

export function saveQuests(quests: DailyQuest[]) {
  try {
    localStorage.setItem(QUESTS_KEY, JSON.stringify(quests));
  } catch {}
}

export function loadAnalytics(): AnalyticsData {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultAnalytics();
}

export function saveAnalytics(analytics: AnalyticsData) {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
  } catch {}
}

export function loadNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultNotifications();
}

export function saveNotifications(notifications: AppNotification[]) {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch {}
}

// Cloud Backup / Export Payload
export function exportCloudBackup(): string {
  const data = {
    profile: loadPlayerProfile(),
    jackpots: loadJackpots(),
    quests: loadQuests(),
    analytics: loadAnalytics(),
    exportedAt: new Date().toISOString(),
    version: '2.0',
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

export function importCloudBackup(encodedStr: string): boolean {
  try {
    const jsonStr = decodeURIComponent(escape(atob(encodedStr.trim())));
    const data = JSON.parse(jsonStr);
    if (data.profile) savePlayerProfile(data.profile);
    if (data.jackpots) saveJackpots(data.jackpots);
    if (data.quests) saveQuests(data.quests);
    if (data.analytics) saveAnalytics(data.analytics);
    return true;
  } catch {
    return false;
  }
}
