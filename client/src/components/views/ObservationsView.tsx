import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  ExternalLink,
  Layers,
  Sparkles,
  Calendar,
  Globe2,
} from 'lucide-react';
import { ScientificObservation } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface ObservationsViewProps {
  observations: ScientificObservation[];
  onOpenObservation: (obs: ScientificObservation) => void;
}

export const ObservationsView: React.FC<ObservationsViewProps> = ({
  observations,
  onOpenObservation,
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const targets = ['all', 'Moon', 'Mars', 'Sun', 'Earth', 'Deep Space'];
  const categories = [
    'all',
    'Optical Imagery',
    'Thermal Profile',
    'Elemental Spectroscopy',
    'Solar Wind & Particles',
    'X-ray Polarimetry',
    'UV Astronomy',
  ];

  const filteredObservations = useMemo(() => {
    return observations.filter((obs) => {
      const matchTarget = selectedTarget === 'all' || obs.targetBody === selectedTarget;
      const matchCategory = selectedCategory === 'all' || obs.category === selectedCategory;
      const matchSearch =
        obs.title.toLowerCase().includes(search.toLowerCase()) ||
        obs.missionName.toLowerCase().includes(search.toLowerCase()) ||
        obs.instrumentName.toLowerCase().includes(search.toLowerCase()) ||
        obs.description.toLowerCase().includes(search.toLowerCase());
      return matchTarget && matchCategory && matchSearch;
    });
  }, [observations, search, selectedTarget, selectedCategory]);

  return (
    <div className="absolute inset-0 top-16 bottom-0 z-10 overflow-y-auto bg-space-950/95 p-4 sm:p-8 select-none">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-700/60 pb-5">
          <div>
            <div className="flex items-center space-x-2.5">
              <Database className="w-6 h-6 text-isro-gold" />
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-wider text-white">
                SCIENTIFIC OBSERVATION EXPLORER
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Direct access to public observation records from ISRO, ISSDC, PRADAN & NASA scientific archives.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-space-900 border border-space-700 text-slate-300">
              Total Records: <strong className="text-isro-cyan">{observations.length}</strong>
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl glass-panel border border-space-700/60">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by mission, instrument, title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-space-950/80 border border-space-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-isro-cyan font-mono"
            />
          </div>

          {/* Celestial Body Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Target:</span>
            {targets.map((t) => (
              <button
                key={t}
                onClick={() => {
                  spaceAudio.playClick();
                  setSelectedTarget(t);
                }}
                className={`px-2.5 py-1 rounded text-xs transition-colors capitalize ${
                  selectedTarget === t
                    ? 'bg-isro-cyan text-slate-950 font-bold'
                    : 'bg-space-900 text-slate-300 hover:text-white border border-space-700/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-space-950 border border-space-700 text-white rounded px-2.5 py-1 text-xs focus:outline-none focus:border-isro-cyan"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Observation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredObservations.map((obs) => (
            <div
              key={obs.id}
              onClick={() => {
                spaceAudio.playClick();
                onOpenObservation(obs);
              }}
              className="rounded-xl glass-panel border border-space-700/60 hover:border-isro-cyan/60 transition-all cursor-pointer group flex flex-col overflow-hidden shadow-lg hover:shadow-glow-cyan"
            >
              {/* Card Image Preview */}
              <div className="relative h-48 w-full bg-black overflow-hidden">
                <img
                  src={obs.processedImageUrl || obs.originalImageUrl}
                  alt={obs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Target & Category Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white border border-white/20">
                    {obs.targetBody}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-isro-amber/80 text-black">
                    {obs.category}
                  </span>
                </div>

                {/* Has Comparison Indicator */}
                {obs.hasComparison && (
                  <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 px-2 py-0.5 rounded bg-space-950/80 backdrop-blur text-isro-cyan text-[10px] font-mono border border-isro-cyan/30">
                    <Layers className="w-3 h-3" />
                    <span>Raw/Processed Compare</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span className="text-isro-gold font-bold">{obs.missionName}</span>
                    <span>{new Date(obs.date).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-sm font-bold font-sans text-white group-hover:text-isro-cyan transition-colors line-clamp-2">
                    {obs.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {obs.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-space-800 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-400 truncate">
                    Payload: <strong className="text-slate-200">{obs.instrumentName.split(' ')[0]}</strong>
                  </span>
                  <span className="text-isro-cyan group-hover:underline flex items-center space-x-1 flex-shrink-0">
                    <span>Inspect Data</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredObservations.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-mono text-sm glass-panel rounded-xl">
            No observations matched the specified filters. Try resetting the search terms.
          </div>
        )}
      </div>
    </div>
  );
};
