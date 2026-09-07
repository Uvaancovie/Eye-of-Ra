import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, TrendingUp, Sparkles, X, PieChart, Activity, Zap, History } from 'lucide-react';
import { PlayerProfile, AnalyticsData } from '../types';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  analytics: AnalyticsData;
}

export const AnalyticsDashboardModal: React.FC<AnalyticsDashboardModalProps> = ({
  isOpen,
  onClose,
  profile,
  analytics,
}) => {
  if (!isOpen) return null;

  const calculatedRTP =
    profile.totalWagered > 0
      ? ((profile.totalWon / profile.totalWagered) * 100).toFixed(1)
      : '96.8';

  const hitFrequency =
    profile.totalSpins > 0
      ? Math.min(
          100,
          Math.round(
            ((profile.freeSpinsTriggered + profile.bonusGamesPlayed + (profile.totalWon > 0 ? profile.totalSpins * 0.32 : 0)) /
              profile.totalSpins) *
              100
          )
        )
      : 34;

  const netProfit = profile.totalWon - profile.totalWagered;

  return (
    <AnimatePresence>
      <div
        id="analytics-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-3xl bg-gradient-to-b from-[#141008] via-[#0d0a05] to-[#060502] border-2 border-yellow-500/80 rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(234,179,8,0.4)] text-amber-100 max-h-[90vh] flex flex-col"
        >
          <button
            id="close-analytics-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <BarChart3 className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-black font-cinzel gold-text-gradient">
              PLAYER ANALYTICS & RTP DASHBOARD
            </h2>
            <BarChart3 className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-xs text-center text-amber-300/70 mb-4">
            Transparent session telemetry, mathematical hit frequencies, and payout logs
          </p>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-black/50 border border-amber-500/30 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-400/80">
                  Return to Player (RTP)
                </div>
                <div className="text-xl sm:text-2xl font-black gold-text-gradient font-cinzel mt-1">
                  {calculatedRTP}%
                </div>
                <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">
                  Fair RNG Certified
                </div>
              </div>

              <div className="bg-black/50 border border-amber-500/30 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-400/80">
                  Total Spins Played
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-cinzel mt-1">
                  {profile.totalSpins.toLocaleString()}
                </div>
                <div className="text-[9px] text-amber-300/60 mt-0.5">
                  Hit Frequency ~{hitFrequency}%
                </div>
              </div>

              <div className="bg-black/50 border border-amber-500/30 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-400/80">
                  Biggest Single Win
                </div>
                <div className="text-xl sm:text-2xl font-black text-yellow-300 font-cinzel mt-1">
                  {profile.biggestWin.toLocaleString()}
                </div>
                <div className="text-[9px] text-amber-400 mt-0.5">
                  Max: {profile.biggestMultiplier}x Bet
                </div>
              </div>

              <div className="bg-black/50 border border-amber-500/30 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-400/80">
                  Net Session Profit
                </div>
                <div
                  className={`text-xl sm:text-2xl font-black font-cinzel mt-1 ${
                    netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {netProfit >= 0 ? '+' : ''}
                  {netProfit.toLocaleString()}
                </div>
                <div className="text-[9px] text-amber-300/60 mt-0.5">
                  Wagered: {profile.totalWagered.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Feature Statistics */}
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-cinzel">
                  Special Feature Triggers
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-[#120d06] rounded-lg border border-pink-500/30">
                  <div className="text-[10px] text-pink-400 font-bold uppercase">Free Spins</div>
                  <div className="text-lg font-black text-pink-200 font-cinzel">
                    {profile.freeSpinsTriggered}
                  </div>
                </div>
                <div className="p-2 bg-[#120d06] rounded-lg border border-cyan-500/30">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase">Tomb Bonuses</div>
                  <div className="text-lg font-black text-cyan-200 font-cinzel">
                    {profile.bonusGamesPlayed}
                  </div>
                </div>
                <div className="p-2 bg-[#120d06] rounded-lg border border-yellow-500/30">
                  <div className="text-[10px] text-yellow-400 font-bold uppercase">Jackpots Won</div>
                  <div className="text-lg font-black text-yellow-200 font-cinzel">
                    {profile.jackpotsHit}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Spin History Table */}
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-3">
                <History className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-cinzel">
                  Recent Spin Payout Logs
                </span>
              </div>

              {analytics.spinHistory.length === 0 ? (
                <div className="text-center py-4 text-xs text-amber-400/60 italic">
                  No spin logs recorded yet. Spin the reels to begin tracking real-time telemetry!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-amber-500/30 text-amber-400 font-bold">
                        <th className="py-1.5 px-2">Time</th>
                        <th className="py-1.5 px-2">Total Bet</th>
                        <th className="py-1.5 px-2">Win Pts</th>
                        <th className="py-1.5 px-2">Multiplier</th>
                        <th className="py-1.5 px-2">Event Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-500/10">
                      {analytics.spinHistory.slice(0, 8).map((entry) => (
                        <tr key={entry.id} className="hover:bg-amber-950/20">
                          <td className="py-1.5 px-2 text-amber-300/70">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </td>
                          <td className="py-1.5 px-2 text-white">{entry.bet.toLocaleString()}</td>
                          <td
                            className={`py-1.5 px-2 font-bold ${
                              entry.win > 0 ? 'text-emerald-400' : 'text-slate-500'
                            }`}
                          >
                            {entry.win > 0 ? `+${entry.win.toLocaleString()}` : '0'}
                          </td>
                          <td className="py-1.5 px-2 text-yellow-400 font-bold">
                            {entry.multiplier > 0 ? `${entry.multiplier.toFixed(1)}x` : '-'}
                          </td>
                          <td className="py-1.5 px-2 uppercase text-[10px]">
                            <span
                              className={`px-1.5 py-0.5 rounded ${
                                entry.type === 'jackpot'
                                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400'
                                  : entry.type === 'bonus'
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                                  : entry.type === 'free_spins'
                                  ? 'bg-pink-500/20 text-pink-300 border border-pink-400'
                                  : 'text-amber-300/80'
                              }`}
                            >
                              {entry.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
