import React, { useState } from 'react';
import {
  X,
  Radio,
  Cpu,
  Layers,
  Database,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Activity,
  Calendar,
  Compass,
  Zap,
  Globe2,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Mission, ScientificInstrument, ScientificObservation } from '../../types';
import { spaceAudio } from '../../utils/audio';
import { SpacecraftViewer3D } from '../3d/SpacecraftViewer3D';

interface RightPanelProps {
  mission: Mission | null;
  observations: ScientificObservation[];
  onClose: () => void;
  onOpenObservation: (obs: ScientificObservation) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  mission,
  observations,
  onClose,
  onOpenObservation,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'specs' | 'instruments' | 'observations' | 'telemetry'
  >('overview');
  const [expandedInstrumentId, setExpandedInstrumentId] = useState<string | null>(null);

  if (!mission) return null;

  const missionObservations = observations.filter(
    (obs) => obs.missionId === mission.id
  );

  const toggleInstrument = (id: string) => {
    spaceAudio.playClick();
    setExpandedInstrumentId(expandedInstrumentId === id ? null : id);
  };

  return (
    <aside className="absolute top-16 bottom-14 right-0 w-80 sm:w-[440px] z-20 glass-panel border-l border-space-600/40 flex flex-col backdrop-blur-2xl shadow-2xl animate-in slide-in-from-right duration-300 select-none">
      {/* Header with Mission Title, Status & Close button */}
      <div className="p-3.5 border-b border-space-700/60 bg-space-900/80 flex items-start justify-between">
        <div className="flex items-start space-x-2.5">
          <div
            className="w-3.5 h-3.5 rounded-full mt-1 flex-shrink-0 animate-pulse"
            style={{ backgroundColor: mission.color }}
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold font-mono text-white tracking-wide">
                {mission.name}
              </h2>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded font-semibold border ${
                  mission.status === 'active'
                    ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40'
                    : mission.status === 'success'
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                    : mission.status === 'planned'
                    ? 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-600'
                }`}
              >
                {mission.statusBadge}
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">
              Target: <span className="text-isro-gold">{mission.destination}</span> | Regime: {mission.specs.orbitType}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            spaceAudio.playClick();
            onClose();
          }}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-space-800 transition-colors"
          title="Close Spacecraft Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive 3D Model Inspector (360° Drag & Zoom) */}
      <div className="p-3 bg-space-950/70 border-b border-space-700/60">
        <SpacecraftViewer3D mission={mission} height="h-44" />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-5 border-b border-space-700/60 bg-space-950/60 font-mono text-[10px]">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'specs', label: 'Specs', icon: Cpu },
          { id: 'instruments', label: 'Payloads', icon: Layers },
          { id: 'observations', label: 'Science', icon: Database },
          { id: 'telemetry', label: 'Telemetry', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                spaceAudio.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`py-2 px-1 flex flex-col items-center justify-center space-y-1 transition-all ${
                isActive
                  ? 'border-b-2 border-isro-cyan text-white bg-space-850/80 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-space-900/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-isro-cyan' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: MISSION OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs">
            {/* Mission Tagline Quote */}
            <div className="p-3 rounded-lg bg-space-900/70 border border-isro-cyan/20">
              <p className="text-slate-200 italic font-serif leading-relaxed">
                "{mission.tagline}"
              </p>
            </div>

            {/* Comprehensive Description */}
            <div>
              <h3 className="text-slate-400 font-mono uppercase text-[10px] tracking-wider mb-1.5">
                Mission Description
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {mission.description}
              </p>
            </div>

            {/* Launch Profile */}
            <div className="p-3 rounded-lg bg-space-900/50 border border-space-700/50 space-y-2 font-mono">
              <h3 className="text-[10px] text-isro-amber uppercase tracking-wider font-bold">
                Launch Profile
              </h3>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 text-[10px] block">LAUNCH VEHICLE</span>
                  <span className="text-white font-semibold">{mission.launchVehicle}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">LAUNCH DATE</span>
                  <span className="text-white">{new Date(mission.launchDate).toLocaleDateString()}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 text-[10px] block">LAUNCH SITE</span>
                  <span className="text-slate-200">{mission.launchSite}</span>
                </div>
              </div>
            </div>

            {/* Primary Mission Objectives */}
            <div>
              <h3 className="text-slate-400 font-mono uppercase text-[10px] tracking-wider mb-2">
                Primary Objectives
              </h3>
              <ul className="space-y-1.5">
                {mission.primaryObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-slate-300">
                    <span className="text-isro-cyan font-mono font-bold">0{idx + 1}.</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Discoveries & Milestones */}
            <div>
              <h3 className="text-slate-400 font-mono uppercase text-[10px] tracking-wider mb-2 flex items-center justify-between">
                <span>Key Discoveries</span>
                <Sparkles className="w-3.5 h-3.5 text-isro-gold" />
              </h3>
              <ul className="space-y-2">
                {mission.keyDiscoveries.map((disc, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded bg-space-850/60 border border-space-700/40 text-slate-200 flex items-start space-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-isro-amber mt-1.5 flex-shrink-0" />
                    <span>{disc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: SPACECRAFT SPECIFICATIONS */}
        {activeTab === 'specs' && (
          <div className="space-y-4 font-mono text-xs">
            {/* 3D Blueprint Card */}
            <div className="p-3 rounded-lg bg-space-900/80 border border-space-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase">Spacecraft Class</span>
                <span className="text-isro-cyan font-bold">{mission.specs.craftType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase">Launch Mass</span>
                <span className="text-white font-bold">{mission.specs.launchMassKg.toLocaleString()} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase">Dry Mass</span>
                <span className="text-white">{mission.specs.dryMassKg.toLocaleString()} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase">Scientific Payload Mass</span>
                <span className="text-isro-amber font-bold">{mission.specs.payloadMassKg} kg</span>
              </div>
            </div>

            {/* Power & Propulsion */}
            <div className="p-3 rounded-lg bg-space-900/60 border border-space-700/50 space-y-2">
              <h3 className="text-isro-amber text-[10px] uppercase font-bold">Subsystems</h3>
              <div>
                <span className="text-slate-400 text-[10px] block">POWER SYSTEM</span>
                <span className="text-slate-200">{mission.specs.powerSource} ({mission.specs.powerOutputWatts}W)</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">PROPULSION</span>
                <span className="text-slate-200">{mission.specs.propulsion}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">ATTITUDE STABILIZATION</span>
                <span className="text-slate-200">{mission.specs.stabilization}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">COMMUNICATION LINKS</span>
                <span className="text-slate-200">{mission.specs.communicationBands}</span>
              </div>
            </div>

            {/* Orbit Metrics */}
            <div className="p-3 rounded-lg bg-space-900/60 border border-space-700/50 space-y-2">
              <h3 className="text-isro-cyan text-[10px] uppercase font-bold">Orbital Mechanics</h3>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 text-[9px] block">PERIAPSIS</span>
                  <span className="text-white">{mission.specs.periapsisKm?.toLocaleString() ?? 0} km</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block">APOAPSIS</span>
                  <span className="text-white">{mission.specs.apoapsisKm?.toLocaleString() ?? 0} km</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block">INCLINATION</span>
                  <span className="text-white">{mission.specs.inclinationDeg ?? 0}°</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block">PERIOD</span>
                  <span className="text-white">
                    {mission.specs.orbitalPeriodMin
                      ? `${(mission.specs.orbitalPeriodMin / 60).toFixed(1)} hrs`
                      : 'Stationary'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCIENTIFIC INSTRUMENTS ACCORDION */}
        {activeTab === 'instruments' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase pb-1 border-b border-space-800">
              <span>{mission.instruments.length} Scientific Payloads</span>
              <span className="text-isro-cyan">Click to expand details</span>
            </div>

            {mission.instruments.map((inst) => {
              const isExpanded = expandedInstrumentId === inst.id;
              return (
                <div
                  key={inst.id}
                  className={`rounded-lg border transition-all ${
                    isExpanded
                      ? 'bg-space-850/90 border-isro-cyan/50 shadow-glow-cyan'
                      : 'bg-space-900/50 hover:bg-space-850/60 border-space-700/50'
                  }`}
                >
                  <div
                    onClick={() => toggleInstrument(inst.id)}
                    className="p-3 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white text-isro-gold">
                          {inst.name}
                        </span>
                        {inst.massKg && (
                          <span className="text-[10px] text-slate-400 bg-space-800 px-1.5 py-0.5 rounded">
                            {inst.massKg} kg
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                        {inst.fullName}
                      </p>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-isro-cyan flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </div>

                  {/* Expanded Instrument Details */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-space-700/50 space-y-2 text-[11px] font-sans">
                      <div>
                        <span className="text-slate-400 font-mono text-[9px] uppercase block">
                          Lead Developing Institution
                        </span>
                        <span className="text-slate-200 font-medium">{inst.leadInstitution}</span>
                      </div>

                      {inst.wavelengthOrBand && (
                        <div>
                          <span className="text-slate-400 font-mono text-[9px] uppercase block">
                            Operating Wavelength / Band
                          </span>
                          <span className="text-isro-cyan font-mono">{inst.wavelengthOrBand}</span>
                        </div>
                      )}

                      <div>
                        <span className="text-slate-400 font-mono text-[9px] uppercase block">
                          Operating Principle
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {inst.principle}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-mono text-[9px] uppercase block">
                          How It Works
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {inst.howItWorks}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-mono text-[9px] uppercase block">
                          Data Products Produced
                        </span>
                        <p className="text-emerald-400 font-mono text-[11px]">
                          {inst.dataProduced}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-mono text-[9px] uppercase block">
                          Scientific Significance
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {inst.scientificSignificance}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: REAL OBSERVATIONS & DISCOVERIES */}
        {activeTab === 'observations' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase pb-1 border-b border-space-800">
              <span>Public Scientific Records</span>
              <span className="text-isro-amber font-bold">{missionObservations.length} Available</span>
            </div>

            {missionObservations.map((obs) => (
              <div
                key={obs.id}
                onClick={() => {
                  spaceAudio.playClick();
                  onOpenObservation(obs);
                }}
                className="p-3 rounded-lg bg-space-900/60 hover:bg-space-850/80 border border-space-700/60 hover:border-isro-cyan transition-all cursor-pointer group space-y-2"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-isro-gold px-1.5 py-0.5 rounded bg-isro-gold/10 border border-isro-gold/30">
                    {obs.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(obs.date).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-xs font-bold font-sans text-white group-hover:text-isro-cyan transition-colors">
                  {obs.title}
                </h4>

                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {obs.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-space-800 font-mono text-[10px] text-slate-400">
                  <span>Instrument: {obs.instrumentName.split(' ')[0]}</span>
                  <span className="text-isro-cyan group-hover:underline flex items-center space-x-1">
                    <span>View Data</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}

            {missionObservations.length === 0 && (
              <div className="p-8 text-center text-slate-500 font-mono text-xs">
                No observations currently indexed for this mission.
              </div>
            )}
          </div>
        )}

        {/* TAB 5: LIVE / HISTORICAL TELEMETRY HUD */}
        {activeTab === 'telemetry' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 flex items-center space-x-2 text-emerald-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {mission.status === 'active'
                  ? 'TELEMETRY STATUS: LIVE ORBITAL PROPAGATION'
                  : 'TELEMETRY STATUS: VERIFIED HISTORICAL ARCHIVE'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-space-900/70 border border-space-700/60">
                <span className="text-[9px] text-slate-400 uppercase block">ORBITAL ALTITUDE</span>
                <span className="text-sm font-bold text-white">
                  {mission.specs.periapsisKm
                    ? `${mission.specs.periapsisKm.toLocaleString()} km`
                    : 'Surface Landing'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-space-900/70 border border-space-700/60">
                <span className="text-[9px] text-slate-400 uppercase block">ORBITAL VELOCITY</span>
                <span className="text-sm font-bold text-isro-cyan">
                  {mission.destination === 'Moon'
                    ? '1.68 km/s'
                    : mission.destination === 'Mars'
                    ? '4.12 km/s'
                    : mission.destination === 'Sun-Earth L1'
                    ? '0.28 km/s (Halo)'
                    : '7.52 km/s'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-space-900/70 border border-space-700/60">
                <span className="text-[9px] text-slate-400 uppercase block">SIGNAL DELAY (1-WAY)</span>
                <span className="text-sm font-bold text-isro-gold">
                  {mission.destination === 'Moon'
                    ? '1.28 sec'
                    : mission.destination === 'Mars'
                    ? '14.2 min'
                    : mission.destination === 'Sun-Earth L1'
                    ? '5.01 sec'
                    : '2.2 ms'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-space-900/70 border border-space-700/60">
                <span className="text-[9px] text-slate-400 uppercase block">GROUND STATION</span>
                <span className="text-xs font-bold text-slate-200 truncate block">
                  ISTRAC / IDSN Byalalu
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-900/70 border border-space-700/60 space-y-1.5 text-[11px]">
              <span className="text-[9px] text-slate-400 uppercase block font-bold">
                Transponder Link Status
              </span>
              <div className="flex justify-between text-slate-300">
                <span>Uplink Frequency:</span>
                <span className="text-white font-mono">2095.4 MHz (S-band)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Downlink Carrier:</span>
                <span className="text-white font-mono">8420.5 MHz (X-band)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Bit Error Rate (BER):</span>
                <span className="text-emerald-400 font-mono">&lt; 10⁻⁸</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Solar Array Generation:</span>
                <span className="text-isro-gold font-mono">{mission.specs.powerOutputWatts} Watts</span>
              </div>
            </div>

            {/* Official ISRO / ISSDC Portal Link */}
            {mission.issdcPortalUrl && (
              <a
                href={mission.issdcPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-md bg-isro-cyan/20 hover:bg-isro-cyan/30 border border-isro-cyan/40 text-isro-cyan text-xs font-bold transition-colors"
              >
                <span>Access ISSDC Official Archive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
