import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Rocket,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Satellite,
  Globe,
  Sun,
  Radio,
  Eye,
} from 'lucide-react';
import { Mission, MissionCategory } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface LeftPanelProps {
  missions: Mission[];
  selectedId: string | null;
  onSelectMission: (missionId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  missions,
  selectedId,
  onSelectMission,
  isOpen,
  onToggle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Missions', icon: Globe },
    { id: 'lunar', label: 'Lunar (Moon)', icon: Radio },
    { id: 'mars', label: 'Mars (MOM)', icon: Rocket },
    { id: 'solar', label: 'Solar (Sun L1)', icon: Sun },
    { id: 'astronomy', label: 'Astronomy', icon: Eye },
    { id: 'human', label: 'Human Spaceflight', icon: Sparkles },
    { id: 'earth_observation', label: 'Earth Observation', icon: Satellite },
  ];

  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      const matchesCategory =
        selectedCategory === 'all' || m.category === selectedCategory;
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.launchVehicle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [missions, selectedCategory, searchQuery]);

  return (
    <aside
      className={`absolute top-16 bottom-14 left-0 z-20 transition-all duration-300 ease-in-out flex ${
        isOpen ? 'w-80 sm:w-96' : 'w-10'
      }`}
    >
      {/* Main Panel Content */}
      <div
        className={`w-full h-full glass-panel border-r border-space-600/40 flex flex-col backdrop-blur-xl overflow-hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Panel Header */}
        <div className="p-3.5 border-b border-space-700/60 bg-space-900/60">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center space-x-2">
              <Rocket className="w-4 h-4 text-isro-amber" />
              <h2 className="text-sm font-bold tracking-wider font-mono uppercase text-white">
                Mission Directory
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-space-800 px-2 py-0.5 rounded border border-space-700">
              {filteredMissions.length} Assets
            </span>
          </div>

          {/* Search Input */}
          <div className="relative mb-2.5">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by name, vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-space-950/80 border border-space-700/80 rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-isro-cyan transition-colors font-mono"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isCatActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    spaceAudio.playClick();
                    setSelectedCategory(cat.id as MissionCategory | 'all');
                  }}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition-all ${
                    isCatActive
                      ? 'bg-isro-amber text-slate-950 font-bold shadow-glow-orange'
                      : 'bg-space-850/80 text-slate-400 hover:text-white hover:bg-space-800 border border-space-700/40'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Mission Cards List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
          {filteredMissions.map((mission) => {
            const isSelected = selectedId === mission.id;
            return (
              <div
                key={mission.id}
                onClick={() => {
                  spaceAudio.playTargetLock();
                  onSelectMission(mission.id);
                }}
                className={`p-3 rounded-lg border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-space-800/90 border-isro-cyan shadow-glow-cyan'
                    : 'bg-space-900/50 hover:bg-space-850/80 border-space-700/50 hover:border-space-600'
                }`}
              >
                {/* Active selection accent line */}
                {isSelected && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                    style={{ backgroundColor: mission.color }}
                  />
                )}

                {/* Top Row: Mission Name + Status Badge */}
                <div className="flex items-start justify-between mb-1 pl-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: mission.color }}
                    />
                    <h3 className="text-xs font-bold font-mono text-white group-hover:text-isro-cyan transition-colors">
                      {mission.name}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border ${
                      mission.status === 'active'
                        ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                        : mission.status === 'success'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : mission.status === 'planned'
                        ? 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                        : 'bg-slate-800/80 text-slate-300 border-slate-600/40'
                    }`}
                  >
                    {mission.statusBadge}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-2 pl-1">
                  {mission.tagline}
                </p>

                {/* Specs Summary Row */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-space-800/80 text-[10px] font-mono text-slate-400 pl-1">
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase">Vehicle</span>
                    <span className="text-slate-200 truncate block">{mission.launchVehicle.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase">Destination</span>
                    <span className="text-isro-gold truncate block">{mission.destination}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase">Instruments</span>
                    <span className="text-isro-cyan block">{mission.instruments.length} Payloads</span>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredMissions.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No missions found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* Panel Footer / Quick Stats */}
        <div className="p-2.5 border-t border-space-700/60 bg-space-950/70 font-mono text-[10px] text-slate-400 flex items-center justify-between">
          <span>ISRO Space Program</span>
          <span className="text-isro-amber">100% Verified Telemetry Archives</span>
        </div>
      </div>

      {/* Toggle Button on Edge */}
      <button
        onClick={() => {
          spaceAudio.playClick();
          onToggle();
        }}
        className="w-6 h-12 my-auto -mr-3 bg-space-800 hover:bg-space-700 border border-space-600/70 rounded-r-md flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-md z-30"
        title={isOpen ? 'Collapse Mission Directory' : 'Expand Mission Directory'}
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </aside>
  );
};
