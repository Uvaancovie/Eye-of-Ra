import { Payline } from '../types';

export const PAYLINES: Payline[] = [
  // Line 1: Center Horizontal
  { id: 1, name: 'Line 1 (Center)', color: '#eab308', coordinates: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]] },
  // Line 2: Top Horizontal
  { id: 2, name: 'Line 2 (Top)', color: '#3b82f6', coordinates: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] },
  // Line 3: Bottom Horizontal
  { id: 3, name: 'Line 3 (Bottom)', color: '#ef4444', coordinates: [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]] },
  // Line 4: V-Shape
  { id: 4, name: 'Line 4 (V-Shape)', color: '#10b981', coordinates: [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]] },
  // Line 5: Inverted V-Shape
  { id: 5, name: 'Line 5 (Inverted V)', color: '#a855f7', coordinates: [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]] },
  // Line 6: Step Down Top
  { id: 6, name: 'Line 6 (Top-Mid Slope)', color: '#f97316', coordinates: [[0, 0], [1, 0], [2, 1], [3, 2], [4, 2]] },
  // Line 7: Step Up Bottom
  { id: 7, name: 'Line 7 (Bottom-Mid Slope)', color: '#06b6d4', coordinates: [[0, 2], [1, 2], [2, 1], [3, 0], [4, 0]] },
  // Line 8: Valley
  { id: 8, name: 'Line 8 (Valley)', color: '#ec4899', coordinates: [[0, 1], [1, 2], [2, 2], [3, 2], [4, 1]] },
  // Line 9: Peak
  { id: 9, name: 'Line 9 (Peak)', color: '#84cc16', coordinates: [[0, 1], [1, 0], [2, 0], [3, 0], [4, 1]] },
  // Line 10: Step Mid-Top-Mid
  { id: 10, name: 'Line 10 (Arch)', color: '#14b8a6', coordinates: [[0, 1], [1, 0], [2, 1], [3, 0], [4, 1]] },
  // Line 11: Step Mid-Bottom-Mid
  { id: 11, name: 'Line 11 (Catenary)', color: '#6366f1', coordinates: [[0, 1], [1, 2], [2, 1], [3, 2], [4, 1]] },
  // Line 12: Top Zig-Zag
  { id: 12, name: 'Line 12 (Top ZigZag)', color: '#fbbf24', coordinates: [[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]] },
  // Line 13: Bottom Zig-Zag
  { id: 13, name: 'Line 13 (Bottom ZigZag)', color: '#d946ef', coordinates: [[0, 2], [1, 1], [2, 2], [3, 1], [4, 2]] },
  // Line 14: Center Step Up
  { id: 14, name: 'Line 14 (Mid-Top-Top)', color: '#f43f5e', coordinates: [[0, 1], [1, 1], [2, 0], [3, 0], [4, 0]] },
  // Line 15: Center Step Down
  { id: 15, name: 'Line 15 (Mid-Bot-Bot)', color: '#22c55e', coordinates: [[0, 1], [1, 1], [2, 2], [3, 2], [4, 2]] },
  // Line 16: Top Slope Down Flat
  { id: 16, name: 'Line 16 (Top-Mid-Mid)', color: '#38bdf8', coordinates: [[0, 0], [1, 1], [2, 1], [3, 1], [4, 2]] },
  // Line 17: Bottom Slope Up Flat
  { id: 17, name: 'Line 17 (Bot-Mid-Mid)', color: '#e11d48', coordinates: [[0, 2], [1, 1], [2, 1], [3, 1], [4, 0]] },
  // Line 18: Snake 1
  { id: 18, name: 'Line 18 (Snake Down)', color: '#8b5cf6', coordinates: [[0, 0], [1, 1], [2, 0], [3, 2], [4, 2]] },
  // Line 19: Snake 2
  { id: 19, name: 'Line 19 (Snake Up)', color: '#eab308', coordinates: [[0, 2], [1, 1], [2, 2], [3, 0], [4, 0]] },
  // Line 20: Crown Pattern
  { id: 20, name: 'Line 20 (Pharaoh Crown)', color: '#f59e0b', coordinates: [[0, 0], [1, 2], [2, 0], [3, 2], [4, 0]] },
];
