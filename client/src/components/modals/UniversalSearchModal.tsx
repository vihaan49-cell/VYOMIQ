import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Rocket,
  Layers,
  Database,
  Globe2,
  Sparkles,
  ArrowRight,
  Radio,
} from 'lucide-react';
import { Mission, ScientificObservation } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  missions: Mission[];
  observations: ScientificObservation[];
  onSelectMission: (missionId: string) => void;
  onSelectObservation: (obs: ScientificObservation) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  missions,
  observations,
  onSelectMission,
  onSelectObservation,
}) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Suggested quick searches from user prompt
  const suggestedQueries = [
    'Chandrayaan-3 landing site',
    'Aditya-L1 solar flare',
    'Mars images Mangalyaan',
    'Water on the Moon',
    'XPoSat Crab pulsar polarization',
    'Sulfur detection',
    'ChaSTE temperature',
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) return { missions: [], observations: [], instruments: [] };
    const q = query.toLowerCase();

    // Matching Missions
    const matchedMissions = missions.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.destination.toLowerCase().includes(q) ||
        m.keyDiscoveries.some((d) => d.toLowerCase().includes(q))
    );

    // Matching Observations
    const matchedObservations = observations.filter(
      (obs) =>
        obs.title.toLowerCase().includes(q) ||
        obs.description.toLowerCase().includes(q) ||
        obs.instrumentName.toLowerCase().includes(q) ||
        obs.category.toLowerCase().includes(q) ||
        obs.scientificFindings.some((f) => f.toLowerCase().includes(q))
    );

    // Matching Instruments
    const matchedInstruments = missions
      .flatMap((m) =>
        m.instruments
          .filter(
            (inst) =>
              inst.name.toLowerCase().includes(q) ||
              inst.fullName.toLowerCase().includes(q) ||
              inst.dataProduced.toLowerCase().includes(q) ||
              inst.principle.toLowerCase().includes(q)
          )
          .map((inst) => ({ instrument: inst, mission: m }))
      );

    return {
      missions: matchedMissions,
      observations: matchedObservations,
      instruments: matchedInstruments,
    };
  }, [query, missions, observations]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-2xl glass-panel border border-isro-cyan/50 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-space-700/80 bg-space-900/90 flex items-center space-x-3">
          <Search className="w-5 h-5 text-isro-cyan flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search missions, instruments, discoveries, real observations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="px-2 py-1 rounded bg-space-800 text-slate-400 hover:text-white text-xs font-mono border border-space-700"
          >
            ESC
          </button>
        </div>

        {/* Suggested Queries Chips */}
        {!query && (
          <div className="p-4 border-b border-space-800/80 bg-space-950/60">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Recommended Search Queries:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQueries.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => {
                    spaceAudio.playClick();
                    setQuery(sq);
                  }}
                  className="px-2.5 py-1 rounded-md bg-space-900 hover:bg-space-800 border border-space-700/60 text-slate-300 hover:text-isro-cyan text-xs font-mono transition-colors"
                >
                  "{sq}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Missions Category */}
          {searchResults.missions.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-isro-amber uppercase tracking-wider flex items-center space-x-1.5">
                <Rocket className="w-3 h-3" />
                <span>Space Missions ({searchResults.missions.length})</span>
              </span>
              <div className="space-y-1.5">
                {searchResults.missions.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      spaceAudio.playTargetLock();
                      onSelectMission(m.id);
                      onClose();
                    }}
                    className="p-3 rounded-lg bg-space-900/60 hover:bg-space-800/80 border border-space-700/50 hover:border-isro-cyan transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold font-mono text-white group-hover:text-isro-cyan">
                          {m.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-space-800 text-isro-gold">
                          {m.destination}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {m.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-isro-cyan group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observations Category */}
          {searchResults.observations.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-isro-gold uppercase tracking-wider flex items-center space-x-1.5">
                <Database className="w-3 h-3" />
                <span>Scientific Observations ({searchResults.observations.length})</span>
              </span>
              <div className="space-y-1.5">
                {searchResults.observations.map((obs) => (
                  <div
                    key={obs.id}
                    onClick={() => {
                      spaceAudio.playClick();
                      onSelectObservation(obs);
                      onClose();
                    }}
                    className="p-3 rounded-lg bg-space-900/60 hover:bg-space-800/80 border border-space-700/50 hover:border-isro-cyan transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold font-sans text-white group-hover:text-isro-cyan">
                          {obs.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-space-800 text-emerald-400">
                          {obs.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {obs.missionName} • {obs.instrumentName} • {obs.coordinatesOrRegion}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-isro-cyan group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instruments Category */}
          {searchResults.instruments.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-isro-cyan uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-3 h-3" />
                <span>Scientific Payloads & Sensors ({searchResults.instruments.length})</span>
              </span>
              <div className="space-y-1.5">
                {searchResults.instruments.map(({ instrument, mission }) => (
                  <div
                    key={instrument.id}
                    onClick={() => {
                      spaceAudio.playTargetLock();
                      onSelectMission(mission.id);
                      onClose();
                    }}
                    className="p-3 rounded-lg bg-space-900/60 hover:bg-space-800/80 border border-space-700/50 hover:border-isro-cyan transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold font-mono text-white group-hover:text-isro-cyan">
                          {instrument.name} ({instrument.fullName})
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-space-800 text-isro-gold">
                          {mission.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {instrument.principle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-isro-cyan group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query.trim() &&
            searchResults.missions.length === 0 &&
            searchResults.observations.length === 0 &&
            searchResults.instruments.length === 0 && (
              <div className="p-8 text-center text-slate-500 font-mono text-xs">
                No matching results found for "{query}". Try checking the recommended queries above.
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
