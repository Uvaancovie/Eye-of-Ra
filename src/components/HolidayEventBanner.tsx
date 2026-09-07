import React from 'react';
import { Sparkles, Zap, Flame, Clock } from 'lucide-react';
import { HolidayEvent } from '../types';

interface HolidayEventBannerProps {
  event: HolidayEvent;
  onOpenQuests: () => void;
}

export const HolidayEventBanner: React.FC<HolidayEventBannerProps> = ({
  event,
  onOpenQuests,
}) => {
  return (
    <div
      id="holiday-event-banner"
      onClick={onOpenQuests}
      className="cursor-pointer w-full max-w-5xl mx-auto mb-3 bg-gradient-to-r from-[#082f49]/80 via-[#1e1b4b]/80 to-[#3b0764]/80 border border-cyan-400/50 hover:border-cyan-300 rounded-xl p-2 sm:p-2.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
          <Zap className="w-4 h-4 text-cyan-300 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
              {event.badge}
            </span>
            <span className="text-xs font-bold text-white font-cinzel">{event.name}</span>
          </div>
          <div className="text-[10px] text-cyan-200/80 hidden sm:block">
            {event.tagline}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1 text-[10px] bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
          <Clock className="w-3 h-3" /> {event.endDate}
        </div>
        <button
          id="event-quests-btn"
          className="cursor-pointer text-[10px] font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-2.5 py-1 rounded-lg uppercase tracking-wider font-cinzel transition-all"
        >
          Event Quests
        </button>
      </div>
    </div>
  );
};
