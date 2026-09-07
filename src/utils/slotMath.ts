import { SymbolId, LineWin, SpinResult, JackpotPool } from '../types';
import { EGYPTIAN_SYMBOLS } from '../data/egyptianSymbols';
import { PAYLINES } from '../data/paylines';

// Weighted reel strip symbols for realistic slot math (~96.5% base RTP)
const REEL_STRIP_WEIGHTS: { symbol: SymbolId; weight: number }[] = [
  { symbol: 'royal_10', weight: 32 },
  { symbol: 'royal_j', weight: 28 },
  { symbol: 'royal_q', weight: 25 },
  { symbol: 'royal_k', weight: 22 },
  { symbol: 'royal_a', weight: 18 },
  { symbol: 'bastet_cat', weight: 14 },
  { symbol: 'ankh', weight: 12 },
  { symbol: 'horus_falcon', weight: 10 },
  { symbol: 'anubis', weight: 8 },
  { symbol: 'cleopatra', weight: 6 },
  { symbol: 'pharaoh_mask', weight: 4 },
  { symbol: 'eye_of_ra', weight: 5 },      // Wild
  { symbol: 'scarab', weight: 4 },         // Bonus Scatter
  { symbol: 'book_of_dead', weight: 4 },   // Free Spins Scatter
];

const TOTAL_WEIGHT = REEL_STRIP_WEIGHTS.reduce((acc, curr) => acc + curr.weight, 0);

export function getRandomSymbol(): SymbolId {
  let rand = Math.random() * TOTAL_WEIGHT;
  for (const item of REEL_STRIP_WEIGHTS) {
    if (rand < item.weight) {
      return item.symbol;
    }
    rand -= item.weight;
  }
  return 'royal_10';
}

export function generateInitialGrid(): SymbolId[][] {
  const grid: SymbolId[][] = [];
  for (let col = 0; col < 5; col++) {
    const colSymbols: SymbolId[] = [];
    for (let row = 0; row < 3; row++) {
      colSymbols.push(getRandomSymbol());
    }
    grid.push(colSymbols);
  }
  return grid;
}

export interface SpinOptions {
  betPerLine: number;
  activeLines: number;
  isFreeSpins?: boolean;
  freeSpinsMultiplier?: number;
  expandingSymbol?: SymbolId | null;
  jackpotPool: JackpotPool;
  eventMultiplierBoost?: number;
  eventBonusBoost?: number;
}

export function evaluateSpin(options: SpinOptions): { result: SpinResult; newJackpotPool: JackpotPool } {
  const {
    betPerLine,
    activeLines,
    isFreeSpins = false,
    freeSpinsMultiplier = 1,
    expandingSymbol = null,
    jackpotPool,
    eventMultiplierBoost = 1,
    eventBonusBoost = 1,
  } = options;

  const totalBet = betPerLine * activeLines;

  // 1. Generate 5x3 grid
  let grid: SymbolId[][] = [];
  for (let col = 0; col < 5; col++) {
    const colSymbols: SymbolId[] = [];
    for (let row = 0; row < 3; row++) {
      let sym = getRandomSymbol();
      
      // If seasonal holiday event boosts bonus scatters
      if (eventBonusBoost > 1 && (sym === 'royal_10' || sym === 'royal_j') && Math.random() < 0.05 * eventBonusBoost) {
        sym = Math.random() > 0.5 ? 'scarab' : 'eye_of_ra';
      }
      colSymbols.push(sym);
    }
    grid.push(colSymbols);
  }

  // 2. Handle Free Spins Expanding Symbol (if 3+ chosen expanding symbols appear)
  if (isFreeSpins && expandingSymbol) {
    let expandingCount = 0;
    const colsWithExpanding: number[] = [];
    for (let col = 0; col < 5; col++) {
      if (grid[col].includes(expandingSymbol)) {
        expandingCount++;
        colsWithExpanding.push(col);
      }
    }
    // If enough appear (3+), they expand to cover the whole reel!
    if (expandingCount >= 3) {
      colsWithExpanding.forEach((col) => {
        grid[col] = [expandingSymbol, expandingSymbol, expandingSymbol];
      });
    }
  }

  // 3. Evaluate active paylines
  const lineWins: LineWin[] = [];
  let totalWin = 0;

  const linesToEvaluate = PAYLINES.slice(0, activeLines);

  linesToEvaluate.forEach((line) => {
    // Get sequence of 5 symbols along this line
    const symbolsOnLine: { symbol: SymbolId; coord: [number, number] }[] = line.coordinates.map(([col, row]) => ({
      symbol: grid[col][row],
      coord: [col, row],
    }));

    // Find starting match from left (col 0)
    const firstNonWild = symbolsOnLine.find((s) => s.symbol !== 'eye_of_ra' && s.symbol !== 'scarab' && s.symbol !== 'book_of_dead');
    const targetSymbol = firstNonWild ? firstNonWild.symbol : 'eye_of_ra';

    // Scatters don't pay on paylines (they pay anywhere on screen)
    if (targetSymbol === 'scarab' || targetSymbol === 'book_of_dead') {
      return;
    }

    let matchCount = 0;
    let hasWild = false;
    const winningCoords: [number, number][] = [];

    for (let i = 0; i < 5; i++) {
      const sym = symbolsOnLine[i].symbol;
      if (sym === targetSymbol) {
        matchCount++;
        winningCoords.push(symbolsOnLine[i].coord);
      } else if (sym === 'eye_of_ra') {
        matchCount++;
        hasWild = true;
        winningCoords.push(symbolsOnLine[i].coord);
      } else {
        break; // Match interrupted
      }
    }

    if (matchCount >= 3) {
      const symDef = EGYPTIAN_SYMBOLS[targetSymbol];
      if (symDef && symDef.payouts) {
        const basePayoutMultiplier = (symDef.payouts as any)[matchCount] || 0;
        
        // Eye of Ra Wild multiplies line wins by 2x
        const wildMultiplier = hasWild ? 2 : 1;
        const currentMultiplier = isFreeSpins ? freeSpinsMultiplier : 1;
        const lineWinAmount = Math.round(
          betPerLine * basePayoutMultiplier * wildMultiplier * currentMultiplier * eventMultiplierBoost
        );

        if (lineWinAmount > 0) {
          lineWins.push({
            paylineId: line.id,
            symbolId: targetSymbol,
            count: matchCount,
            winAmount: lineWinAmount,
            coordinates: winningCoords,
            isWildEnhanced: hasWild,
            multiplier: wildMultiplier * currentMultiplier,
          });
          totalWin += lineWinAmount;
        }
      }
    }
  });

  // 4. Count Scatters anywhere on reels
  let scarabCount = 0;
  let bookCount = 0;
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 3; row++) {
      if (grid[col][row] === 'scarab') scarabCount++;
      if (grid[col][row] === 'book_of_dead') bookCount++;
    }
  }

  const bonusTriggered = scarabCount >= 3;
  const freeSpinsTriggered = bookCount >= 3;
  let freeSpinsAwarded = 0;
  if (freeSpinsTriggered) {
    freeSpinsAwarded = bookCount === 3 ? 10 : bookCount === 4 ? 15 : 25;
  }

  // Scatter payouts
  if (scarabCount >= 3) {
    const scarabPayout = (EGYPTIAN_SYMBOLS.scarab.payouts as any)[Math.min(scarabCount, 5)] || 15;
    totalWin += Math.round(totalBet * (scarabPayout / 20) * (isFreeSpins ? freeSpinsMultiplier : 1));
  }
  if (bookCount >= 3) {
    const bookPayout = (EGYPTIAN_SYMBOLS.book_of_dead.payouts as any)[Math.min(bookCount, 5)] || 20;
    totalWin += Math.round(totalBet * (bookPayout / 20) * (isFreeSpins ? freeSpinsMultiplier : 1));
  }

  // 5. Progressive Jackpot Increment & Trigger
  // Increment jackpots with a percentage of total bet
  const incrementFraction = totalBet * 0.03;
  const updatedJackpots: JackpotPool = {
    mini: Math.round(jackpotPool.mini + incrementFraction * 0.4),
    minor: Math.round(jackpotPool.minor + incrementFraction * 0.3),
    major: Math.round(jackpotPool.major + incrementFraction * 0.2),
    grand: Math.round(jackpotPool.grand + incrementFraction * 0.1),
  };

  let jackpotTriggered: 'mini' | 'minor' | 'major' | 'grand' | null = null;
  let jackpotAmount = 0;

  // Check 5 Pharaoh Masks on Line 1 (Grand Jackpot) or random mystery drop
  const line1 = PAYLINES[0];
  const isLine1FivePharaohs = line1.coordinates.every(([c, r]) => grid[c][r] === 'pharaoh_mask');

  if (isLine1FivePharaohs) {
    jackpotTriggered = 'grand';
    jackpotAmount = updatedJackpots.grand;
    updatedJackpots.grand = 250000; // Reset seed
  } else {
    // Mystery Jackpots with rare triggers
    const jackpotRoll = Math.random();
    if (jackpotRoll < 0.0001) {
      jackpotTriggered = 'major';
      jackpotAmount = updatedJackpots.major;
      updatedJackpots.major = 50000;
    } else if (jackpotRoll < 0.0006) {
      jackpotTriggered = 'minor';
      jackpotAmount = updatedJackpots.minor;
      updatedJackpots.minor = 10000;
    } else if (jackpotRoll < 0.002) {
      jackpotTriggered = 'mini';
      jackpotAmount = updatedJackpots.mini;
      updatedJackpots.mini = 2500;
    }
  }

  if (jackpotTriggered) {
    totalWin += jackpotAmount;
  }

  const result: SpinResult = {
    grid,
    lineWins,
    totalWin,
    betAmount: totalBet,
    bonusTriggered,
    freeSpinsTriggered,
    freeSpinsAwarded,
    scatterCountScarab: scarabCount,
    scatterCountBook: bookCount,
    jackpotTriggered,
    jackpotAmount: jackpotTriggered ? jackpotAmount : undefined,
    expandingSymbol: isFreeSpins ? expandingSymbol : undefined,
    timestamp: Date.now(),
  };

  return { result, newJackpotPool: updatedJackpots };
}
