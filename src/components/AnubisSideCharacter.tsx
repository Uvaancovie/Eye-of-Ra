import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export const ANUBIS_IMAGE_URL = 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/anubis.png';

interface AnubisSideCharacterProps {
  isSpinning?: boolean;
  winAmount?: number;
  isFreeSpins?: boolean;
}

const ANUBIS_QUOTES = [
  'The Jackal Lord watches over the sacred scales of fortune!',
  'Ancient tombs unlock their deepest treasures for you!',
  'Fear not the shadows; gold glimmers in the sacred crypts!',
  'Weigh your heart with courage — the dynasty shall reward you!',
  'By the eternal realm, fortune bows before the bold!',
];

export const AnubisSideCharacter: React.FC<AnubisSideCharacterProps> = ({
  isSpinning = false,
  winAmount = 0,
  isFreeSpins = false,
}) => {
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [speechTimeout, setSpeechTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCharacterClick = () => {
    try {
      audioEngine.playJackpotChime();
    } catch {
      // Audio engine fallback
    }
    const randomQuote = ANUBIS_QUOTES[Math.floor(Math.random() * ANUBIS_QUOTES.length)];
    setSpeechText(randomQuote);

    if (speechTimeout) clearTimeout(speechTimeout);
    const timeout = setTimeout(() => {
      setSpeechText(null);
    }, 4000);
    setSpeechTimeout(timeout);
  };

  return (
    <div className="relative flex flex-col items-center justify-end select-none pointer-events-auto">
      {/* Speech Bubble */}
      <AnimatePresence>
        {speechText && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-16 z-30 max-w-[240px] px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-400 text-purple-200 text-xs font-semibold shadow-[0_0_20px_rgba(168,85,247,0.5)] text-center backdrop-blur-md"
          >
            <div className="flex items-center justify-center gap-1 text-purple-400 mb-0.5 font-cinzel text-[10px] tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>Anubis's Sacred Decree</span>
              <Sparkles className="w-3 h-3 text-cyan-300" />
            </div>
            {speechText}
            {/* Pointer arrow */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-purple-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mystical Underworld & Gold Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: isSpinning ? [1, 1.25, 1] : (winAmount > 0 ? [1.1, 1.35, 1.1] : [0.95, 1.08, 0.95]),
            opacity: isSpinning ? [0.6, 0.95, 0.6] : (winAmount > 0 ? [0.8, 1, 0.8] : [0.35, 0.55, 0.35]),
          }}
          transition={{
            repeat: Infinity,
            duration: isSpinning ? 0.6 : (winAmount > 0 ? 0.4 : 3),
            ease: 'easeInOut',
          }}
          className="w-96 h-[500px] sm:w-[480px] sm:h-[600px] lg:w-[600px] lg:h-[750px] rounded-full bg-gradient-to-t from-purple-600/40 via-amber-500/30 to-cyan-500/35 blur-3xl"
        />
      </div>

      {/* Main Anubis Character Image Container */}
      <motion.div
        onClick={handleCharacterClick}
        animate={{
          y: isSpinning ? [-12, 12, -12] : (winAmount > 0 ? [-16, 0, -16] : [0, -12, 0]),
          scale: winAmount > 0 ? 1.05 : (isSpinning ? 1.02 : 1),
          rotate: isSpinning ? [1.5, -1.5, 1.5] : 0,
        }}
        transition={{
          y: { repeat: Infinity, duration: isSpinning ? 0.4 : 3.8, ease: 'easeInOut' },
          scale: { duration: 0.3 },
          rotate: { repeat: isSpinning ? Infinity : 0, duration: 0.5 },
        }}
        className="group relative cursor-pointer flex items-end justify-center w-72 sm:w-96 md:w-[420px] lg:w-[480px] xl:w-[580px] 2xl:w-[650px] max-h-[700px] sm:max-h-[820px] lg:max-h-[920px] xl:max-h-[1050px]"
      >
        {/* Win / Free Spins Sparks */}
        {(isSpinning || winAmount > 0 || isFreeSpins) && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
            <motion.div
              animate={{ rotate: -360, scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-purple-400 drop-shadow-[0_0_15px_#c084fc]"
            >
              <Flame className="w-9 h-9 fill-purple-400" />
            </motion.div>
            {winAmount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="text-cyan-300 drop-shadow-[0_0_18px_#67e8f9]"
              >
                <Zap className="w-10 h-10 fill-cyan-300" />
              </motion.div>
            )}
          </div>
        )}

        {/* High-Quality Transparent Anubis Image */}
        <img
          src={ANUBIS_IMAGE_URL}
          alt="Anubis Lord"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain max-h-[680px] sm:max-h-[800px] lg:max-h-[900px] xl:max-h-[1000px] filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_0_40px_rgba(168,85,247,0.9)] transition-all duration-300 transform group-hover:scale-105"
        />

        {/* Mystical Base Stand / Pedestal Light */}
        <div className="absolute -bottom-2 w-4/5 h-5 rounded-[100%] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent blur-md pointer-events-none" />
      </motion.div>

      {/* Name Title Badge */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        onClick={handleCharacterClick}
        className="mt-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/95 via-slate-900 to-indigo-950/95 border border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center gap-2 cursor-pointer backdrop-blur-md"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
        <span className="text-xs sm:text-base font-bold font-cinzel text-purple-200 tracking-wider">
          ANUBIS · JACKAL LORD
        </span>
      </motion.div>
    </div>
  );
};
