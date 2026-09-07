import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, Twitter, Send, Sparkles, X, Trophy, Crown } from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  winAmount: number;
  multiplier: number;
  username: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  winAmount,
  multiplier,
  username,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `🏺 I just hit a massive ${winAmount.toLocaleString()} PTS (${multiplier.toFixed(
    1
  )}x) legendary Pharaoh Win on Eye of Ra Slot! 𓂀 Can you beat my high score? Play now!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Eye of Ra: Pharaoh's Gold Slot",
          text: shareText,
          url: window.location.href,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText + ' ' + window.location.href
    )}`;
    window.open(url, '_blank');
  };

  const shareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div
        id="social-share-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#1c1306] via-[#100b04] to-[#070502] border-2 border-yellow-500 rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(234,179,8,0.5)] text-center text-amber-100 overflow-hidden"
        >
          <button
            id="close-social-share-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-1">
            <Share2 className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-black font-cinzel gold-text-gradient">
              SHARE PHARAOH VICTORY
            </h2>
          </div>
          <p className="text-xs text-amber-300/80 mb-4 font-serif">
            Brag to your friends, challenge rivals, and earn community prestige!
          </p>

          {/* Rendered Trophy Card */}
          <div
            id="pharaoh-trophy-card"
            className="relative bg-gradient-to-br from-[#2e1d08] via-[#180e03] to-[#0d0701] border-2 border-yellow-400 rounded-xl p-5 mb-5 shadow-2xl text-left overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="font-cinzel text-xs font-black gold-text-gradient uppercase">
                  Eye of Ra: Pharaoh's Gold
                </span>
              </div>
              <span className="text-[10px] text-amber-400/80 font-mono">
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <div className="text-center py-2">
              <div className="text-[11px] uppercase font-bold tracking-widest text-amber-300/80 mb-1">
                {username}'s Monumental Win
              </div>
              <div className="text-2xl sm:text-3xl font-black gold-text-gradient font-cinzel drop-shadow-md">
                {winAmount > 0 ? winAmount.toLocaleString() : '50,000'} PTS
              </div>
              <div className="text-xs font-bold text-yellow-300 mt-1">
                {multiplier > 0 ? `${multiplier.toFixed(1)}x Multiplier Payout` : '100x Solar Burst'}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-amber-500/30 flex items-center justify-between text-[10px] text-amber-400/80">
              <span>𓁿 Sacred Multiplier Active</span>
              <span className="font-bold text-yellow-400">#PharaohGold #SlotWin</span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <button
              id="share-twitter-btn"
              onClick={shareTwitter}
              className="cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1d9bf0]/20 hover:bg-[#1d9bf0]/30 border border-[#1d9bf0]/50 text-sky-200 text-xs font-bold transition-all"
            >
              <Twitter className="w-4 h-4 text-[#1d9bf0]" />
              <span>X / Twitter</span>
            </button>

            <button
              id="share-whatsapp-btn"
              onClick={shareWhatsApp}
              className="cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25d366]/20 hover:bg-[#25d366]/30 border border-[#25d366]/50 text-emerald-200 text-xs font-bold transition-all"
            >
              <Send className="w-4 h-4 text-[#25d366]" />
              <span>WhatsApp</span>
            </button>

            <button
              id="share-telegram-btn"
              onClick={shareTelegram}
              className="cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#229ed9]/20 hover:bg-[#229ed9]/30 border border-[#229ed9]/50 text-cyan-200 text-xs font-bold transition-all"
            >
              <Send className="w-4 h-4 text-[#229ed9]" />
              <span>Telegram</span>
            </button>
          </div>

          {/* 1-Click Copy Slip */}
          <div className="flex gap-2">
            <button
              id="copy-share-slip-btn"
              onClick={handleCopy}
              className="cursor-pointer flex-1 py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-yellow-400/60 text-yellow-300 font-bold text-xs flex items-center justify-center gap-2 transition-all font-cinzel"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Victory Slip Copied!' : 'Copy Win Slip'}</span>
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                id="native-share-device-btn"
                onClick={handleNativeShare}
                className="cursor-pointer py-2.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg font-cinzel"
              >
                <Share2 className="w-4 h-4" />
                <span>Device Share</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
