import React from 'react';
import { Flag, Sparkles, ChevronRight, Rocket, CheckCircle2, Calendar } from 'lucide-react';
import { Mission, MissionMilestone } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface BottomTimelineProps {
  selectedMission: Mission | null;
  allMissions: Mission[];
  onSelectMilestone: (milestone: MissionMilestone) => void;
}

export const BottomTimeline: React.FC<BottomTimelineProps> = ({
  selectedMission,
  allMissions,
  onSelectMilestone,
}) => {
  // If a mission is selected, show its milestones; else show landmark milestones across all missions
  const milestones: { missionName: string; milestone: MissionMilestone; color: string }[] =
    selectedMission
      ? selectedMission.milestones.map((m) => ({
          missionName: selectedMission.name,
          milestone: m,
          color: selectedMission.color,
        }))
      : allMissions
          .flatMap((m) =>
            m.milestones
              .filter((ms) => ms.isKeyMilestone)
              .map((ms) => ({
                missionName: m.name,
                milestone: ms,
                color: m.color,
              }))
          )
          .sort(
            (a, b) =>
              new Date(a.milestone.date.split(' ')[0]).getTime() -
              new Date(b.milestone.date.split(' ')[0]).getTime()
          );

  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 glass-panel border-t border-space-600/40 px-4 flex items-center z-20 overflow-hidden select-none">
      {/* Label Badge */}
      <div className="flex items-center space-x-2 pr-3 mr-2 border-r border-space-700/60 flex-shrink-0">
        <Rocket className="w-3.5 h-3.5 text-isro-amber" />
        <span className="text-[10px] font-mono font-bold uppercase text-white tracking-wider hidden sm:inline">
          {selectedMission ? `${selectedMission.name} Timeline` : 'Historic Milestones'}
        </span>
      </div>

      {/* Horizontal Scrollable Timeline */}
      <div className="flex-1 flex items-center space-x-3 overflow-x-auto py-1 scrollbar-none">
        {milestones.map(({ missionName, milestone, color }, idx) => (
          <div
            key={milestone.id}
            onClick={() => {
              spaceAudio.playClick();
              onSelectMilestone(milestone);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-space-900/60 hover:bg-space-800 border border-space-700/50 hover:border-isro-cyan transition-all cursor-pointer flex-shrink-0 group"
          >
            {/* Phase Icon Pill */}
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono text-slate-400">
                  {milestone.date.split(' ')[0]}
                </span>
                {!selectedMission && (
                  <span className="text-[9px] font-mono text-isro-cyan font-bold">
                    • {missionName}
                  </span>
                )}
              </div>
              <h4 className="text-[11px] font-bold font-sans text-white group-hover:text-isro-cyan transition-colors whitespace-nowrap">
                {milestone.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
