import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Sparkles, X, Gift, Zap, Crown } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onRequestPushPermission: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onRequestPushPermission,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="notification-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#181206] via-[#0e0a04] to-[#060402] border-2 border-yellow-500/80 rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(234,179,8,0.4)] text-amber-100 max-h-[90vh] flex flex-col"
        >
          <button
            id="close-notif-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-1">
            <Bell className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-black font-cinzel gold-text-gradient">
              SACRED UPDATES & ALERTS
            </h2>
          </div>
          <p className="text-xs text-center text-amber-300/70 mb-4">
            Push notifications for daily spins, cosmic jackpot surges, and holiday events
          </p>

          <div className="flex justify-between items-center mb-3">
            <button
              id="request-push-perm-btn"
              onClick={onRequestPushPermission}
              className="cursor-pointer text-[11px] font-bold text-cyan-300 hover:text-cyan-200 underline"
            >
              Enable Browser Push Notifications
            </button>
            <button
              id="mark-all-read-btn"
              onClick={onMarkAllAsRead}
              className="cursor-pointer text-[11px] font-bold text-amber-400 hover:text-yellow-300"
            >
              Mark all as read
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-xs text-amber-300/60">
                No active notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border transition-all ${
                    !notif.read
                      ? 'bg-amber-950/40 border-yellow-400/60 shadow-md'
                      : 'bg-black/40 border-amber-500/20 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      {notif.type === 'jackpot' ? (
                        <Crown className="w-4 h-4 text-yellow-400" />
                      ) : notif.type === 'daily' ? (
                        <Gift className="w-4 h-4 text-pink-400" />
                      ) : notif.type === 'event' ? (
                        <Zap className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white font-cinzel">
                          {notif.title}
                        </div>
                        <span className="text-[9px] text-amber-400/60">{notif.time}</span>
                      </div>
                      <div className="text-[11px] text-amber-200/80 mt-0.5 leading-relaxed">
                        {notif.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
