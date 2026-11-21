import React, { useEffect } from 'react';
import { X, Calendar, Flag, Sparkles, CheckCircle2, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MissionMilestone } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface MilestoneModalProps {
  milestone: MissionMilestone | null;
  onClose: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  milestone,
  onClose,
}) => {
  useEffect(() => {
    if (milestone?.isKeyMilestone) {
      spaceAudio.playMilestoneChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ff6600', '#ffffff', '#047857', '#06b6d4', '#f59e0b'],
      });
    }
  }, [milestone]);

  if (!milestone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg glass-panel border border-isro-cyan/50 rounded-xl overflow-hidden shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-isro-amber/20 border border-isro-amber/40 text-isro-amber">
              <Rocket className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono text-isro-cyan uppercase tracking-wider font-bold">
                Phase: {milestone.phase}
              </span>
              <h2 className="text-base sm:text-lg font-bold font-sans text-white">
                {milestone.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-space-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timestamp */}
        <div className="flex items-center space-x-2 text-xs font-mono text-isro-gold p-2 rounded bg-space-900 border border-space-800">
          <Calendar className="w-4 h-4 text-isro-amber" />
          <span>Timestamp: {milestone.date}</span>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {milestone.description}
        </p>

        {/* Key Milestone Tag */}
        {milestone.isKeyMilestone && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center space-x-2.5 text-xs text-emerald-300 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Landmark Indian Space Exploration Achievement</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="w-full py-2 rounded-lg bg-isro-cyan/20 hover:bg-isro-cyan/30 border border-isro-cyan/40 text-isro-cyan text-xs font-bold transition-colors font-mono"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
