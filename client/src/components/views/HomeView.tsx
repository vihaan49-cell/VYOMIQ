import React, { useState } from 'react';
import {
  Rocket,
  Compass,
  Database,
  BarChart3,
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  Radio,
  Globe2,
  Moon,
  Sun,
  Flame,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Mission } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface HomeViewProps {
  missions: Mission[];
  onEnterUniverse: (preset?: 'all' | 'sun' | 'earth' | 'moon' | 'mars', spacecraftId?: string) => void;
  onNavigate: (view: 'universe' | 'missions' | 'observations' | 'gallery' | 'analytics' | 'about') => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  missions,
  onEnterUniverse,
  onNavigate,
  onOpenSearch,
}) => {
  const [activeDestinationTab, setActiveDestinationTab] = useState<'moon' | 'mars' | 'sun' | 'earth'>('moon');

  // Featured flagship missions
  const featuredMissionIds = [
    'chandrayaan-3',
    'aditya-l1',
    'mangalyaan-1',
    'gaganyaan',
    'astrosat',
    'xposat',
  ];

  const featuredMissions = featuredMissionIds
    .map((id) => missions.find((m) => m.id === id))
    .filter(Boolean) as Mission[];

  const handleLaunch3D = (preset?: 'all' | 'sun' | 'earth' | 'moon' | 'mars', craftId?: string) => {
    spaceAudio.playTargetLock();
    onEnterUniverse(preset, craftId);
  };

  return (
    <div className="absolute inset-0 z-20 overflow-y-auto bg-space-950/85 backdrop-blur-xl text-slate-100 custom-scrollbar select-none">
      {/* Background Cosmic Lighting & Nebula Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-isro-cyan/15 via-isro-amber/10 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-isro-blue/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-0 w-[700px] h-[600px] bg-isro-saffron/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative pt-6 pb-12 flex flex-col items-center text-center">
          {/* Glowing Top Mission Control Badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-space-900/80 border border-isro-cyan/40 shadow-glow-cyan mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-isro-cyan animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-cyan-300 font-semibold uppercase">
              ISRO UNIFIED SPACE EXPLORATION SUITE • VYOMIQ V2.0
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[10px] font-mono text-isro-gold uppercase tracking-wider flex items-center">
              <Sparkles className="w-3 h-3 mr-1 text-isro-gold" />
              LIVE TELEMETRY
            </span>
          </div>

          {/* Futuristic Hero Logo & Animated Orbital Rings */}
          <div className="relative mb-8 group cursor-pointer" onClick={() => handleLaunch3D('all')}>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-isro-amber via-isro-saffron to-isro-cyan p-[2px] shadow-glow-orange group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full bg-[#060b18] rounded-full flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">
                <span className="text-isro-saffron font-bold text-3xl sm:text-4xl tracking-tighter drop-shadow-md">
                  व्योम
                </span>
                <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase mt-0.5">
                  BHARAT SPACE
                </span>
              </div>
            </div>
            {/* Concentric rotating orbital rings */}
            <div className="absolute -inset-4 rounded-full border border-isro-cyan/30 animate-orbit pointer-events-none" />
            <div className="absolute -inset-8 rounded-full border border-dashed border-isro-amber/25 animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-12 rounded-full border border-slate-700/30 pointer-events-none" />
          </div>

          {/* Main Title & Tagline */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-mono">
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                VYOMIQ
              </span>
            </h1>
            <p className="text-base sm:text-xl font-mono text-isro-amber tracking-wider font-semibold">
              VISUALIZING YOUR MISSIONS, OBSERVATIONS, INSIGHTS & QUANTIFICATION
            </p>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              India's first unified, interactive 3D space mission explorer. Journey across mathematically synchronized orbits of the Moon, Mars, Sun, and Earth with research-grade ISRO/PRADAN scientific datasets and live speed-of-light telemetry.
            </p>
          </div>

          {/* Hero Action CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleLaunch3D('all')}
              className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-isro-amber via-isro-saffron to-amber-600 text-white font-mono font-bold text-sm tracking-wider uppercase shadow-glow-orange hover:shadow-orange-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border border-amber-300/40"
            >
              <Rocket className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span>Launch 3D Universe</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                spaceAudio.playClick();
                onNavigate('observations');
              }}
              className="inline-flex items-center space-x-2.5 px-6 py-4 rounded-xl bg-space-900/80 hover:bg-space-800 text-slate-200 hover:text-white font-mono text-sm tracking-wider uppercase border border-space-600/60 hover:border-isro-cyan/50 backdrop-blur-md transition-all shadow-md"
            >
              <Database className="w-4 h-4 text-isro-cyan" />
              <span>Scientific Observations</span>
            </button>

            <button
              onClick={() => {
                spaceAudio.playClick();
                onNavigate('analytics');
              }}
              className="inline-flex items-center space-x-2.5 px-6 py-4 rounded-xl bg-space-900/80 hover:bg-space-800 text-slate-200 hover:text-white font-mono text-sm tracking-wider uppercase border border-space-600/60 hover:border-emerald-500/50 backdrop-blur-md transition-all shadow-md"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Science Analytics</span>
            </button>

            <button
              onClick={() => {
                spaceAudio.playClick();
                onOpenSearch();
              }}
              className="inline-flex items-center space-x-2 px-4 py-4 rounded-xl bg-space-900/60 hover:bg-space-800/80 text-slate-400 hover:text-cyan-300 font-mono text-xs tracking-wider border border-space-700/50 transition-all"
              title="Search Missions and Instruments (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-space-800 text-[10px] text-slate-400 border border-space-700">Ctrl+K</kbd>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. LIVE MISSION STATS STRIP (GLASS CARDS) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-interactive-card p-5 rounded-2xl relative overflow-hidden hud-corner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Missions Tracked</span>
              <Globe2 className="w-4 h-4 text-isro-cyan" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white tracking-tight">14+</div>
            <div className="text-xs text-slate-400 mt-1">Lunar, Mars, Solar, Astronomy & Earth Satellites</div>
          </div>

          <div className="glass-interactive-card p-5 rounded-2xl relative overflow-hidden hud-corner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Scientific Instruments</span>
              <Zap className="w-4 h-4 text-isro-gold" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-isro-gold tracking-tight">35+</div>
            <div className="text-xs text-slate-400 mt-1">Spectrometers, Radars, Cameras & Magnetometers</div>
          </div>

          <div className="glass-interactive-card p-5 rounded-2xl relative overflow-hidden hud-corner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Scientific Integrity</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">100%</div>
            <div className="text-xs text-slate-400 mt-1">Verified ISRO, ISSDC & PRADAN Datasets</div>
          </div>

          <div className="glass-interactive-card p-5 rounded-2xl relative overflow-hidden hud-corner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Historic Feat</span>
              <Award className="w-4 h-4 text-isro-amber" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-isro-amber tracking-tight">1st</div>
            <div className="text-xs text-slate-400 mt-1">Human Soft Landing at Lunar South Pole</div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CELESTIAL GATEWAY (EXPLORE BY DESTINATION) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-space-700/60 pb-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-isro-cyan text-xs font-mono font-semibold tracking-wider uppercase mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Planetary Navigation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                Explore by Celestial Destination
              </h2>
            </div>
            <div className="flex items-center space-x-1 bg-space-900/90 p-1 rounded-xl border border-space-700/60">
              <button
                onClick={() => setActiveDestinationTab('moon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeDestinationTab === 'moon'
                    ? 'bg-isro-cyan/20 text-white border border-isro-cyan/40 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Moon
              </button>
              <button
                onClick={() => setActiveDestinationTab('mars')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeDestinationTab === 'mars'
                    ? 'bg-rose-500/20 text-white border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mars
              </button>
              <button
                onClick={() => setActiveDestinationTab('sun')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeDestinationTab === 'sun'
                    ? 'bg-isro-amber/20 text-white border border-isro-amber/40 shadow-glow-orange'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sun (L1)
              </button>
              <button
                onClick={() => setActiveDestinationTab('earth')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeDestinationTab === 'earth'
                    ? 'bg-blue-500/20 text-white border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Earth Orbit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Moon Card */}
            <div
              onClick={() => handleLaunch3D('moon', 'chandrayaan-3')}
              className={`glass-interactive-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden transition-all ${
                activeDestinationTab === 'moon' ? 'border-isro-cyan/60 bg-space-900/80' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-600/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6 text-slate-200" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-isro-cyan transition-colors">
                The Moon
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Chandrayaan-1 water discovery, Chandrayaan-2 25cm high-res radar orbiter, and Chandrayaan-3 historic South Pole landing at Shiv Shakti Point.
              </p>
              <div className="mt-4 pt-4 border-t border-space-700/50 flex items-center justify-between text-xs font-mono text-isro-cyan">
                <span>4 Missions</span>
                <span className="flex items-center group-hover:translate-x-1 transition-transform">
                  Focus Orbit <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Mars Card */}
            <div
              onClick={() => handleLaunch3D('mars', 'mangalyaan-1')}
              className={`glass-interactive-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden transition-all ${
                activeDestinationTab === 'mars' ? 'border-rose-500/60 bg-space-900/80' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-rose-400 transition-colors">
                Mars (Mangalyaan)
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Maiden attempt triumph. 150° inclined Mars orbit with 8 years of operation, full-disk true color mosaics, and Olympus Mons caldera imagery.
              </p>
              <div className="mt-4 pt-4 border-t border-space-700/50 flex items-center justify-between text-xs font-mono text-rose-400">
                <span>MOM Odyssey</span>
                <span className="flex items-center group-hover:translate-x-1 transition-transform">
                  Focus Orbit <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Sun L1 Card */}
            <div
              onClick={() => handleLaunch3D('sun', 'aditya-l1')}
              className={`glass-interactive-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden transition-all ${
                activeDestinationTab === 'sun' ? 'border-isro-amber/60 bg-space-900/80' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-isro-amber/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sun className="w-6 h-6 text-isro-gold" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-isro-amber transition-colors">
                Sun-Earth L1 (Aditya)
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                1.5 million km Halo orbit at Lagrange Point 1. Continuous unocculted solar observation, coronal mass ejections, and solar superstorm tracking.
              </p>
              <div className="mt-4 pt-4 border-t border-space-700/50 flex items-center justify-between text-xs font-mono text-isro-amber">
                <span>Lagrange 1</span>
                <span className="flex items-center group-hover:translate-x-1 transition-transform">
                  Focus Orbit <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Earth Orbit Card */}
            <div
              onClick={() => handleLaunch3D('earth', 'astrosat')}
              className={`glass-interactive-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden transition-all ${
                activeDestinationTab === 'earth' ? 'border-blue-500/60 bg-space-900/80' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                Earth & Deep Space
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                AstroSat multi-wavelength telescope, XPoSat X-ray polarimeter, Gaganyaan crew module, Cartosat-3 sub-meter earth imaging, and NavIC constellation.
              </p>
              <div className="mt-4 pt-4 border-t border-space-700/50 flex items-center justify-between text-xs font-mono text-blue-400">
                <span>7+ Assets</span>
                <span className="flex items-center group-hover:translate-x-1 transition-transform">
                  Focus Orbit <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FEATURED FLAGSHIP MISSIONS (DETAILED GLASS CARDS) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-space-700/60 pb-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-isro-gold text-xs font-mono font-semibold tracking-wider uppercase mb-1">
                <Rocket className="w-3.5 h-3.5" />
                <span>Flagship Exploration Assets</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                Featured Spacecraft & Telescopes
              </h2>
            </div>
            <button
              onClick={() => handleLaunch3D('all')}
              className="text-xs font-mono text-isro-cyan hover:text-white flex items-center group"
            >
              <span>View All in 3D</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMissions.map((mission) => (
              <div
                key={mission.id}
                className="glass-interactive-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent top line matching mission color */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: mission.color || '#06b6d4' }}
                />

                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-space-800 border border-space-700 text-slate-300 uppercase tracking-wider">
                        {mission.specs.craftType}
                      </span>
                      <h3 className="text-xl font-bold font-mono text-white mt-1 group-hover:text-isro-cyan transition-colors">
                        {mission.name}
                      </h3>
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold"
                      style={{
                        backgroundColor: `${mission.color}20`,
                        color: mission.color,
                        border: `1px solid ${mission.color}40`,
                      }}
                    >
                      {mission.statusBadge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {mission.tagline}
                  </p>

                  {/* Quick specs pill */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-space-900/60 p-2.5 rounded-xl border border-space-800 mb-4">
                    <div>
                      <span className="text-slate-500">TARGET:</span>{' '}
                      <span className="text-slate-200 font-semibold">{mission.destination}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">ROCKET:</span>{' '}
                      <span className="text-slate-200 font-semibold">{mission.launchVehicle.split(' ')[0]}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500">PAYLOADS:</span>{' '}
                      <span className="text-cyan-300 font-medium">
                        {mission.instruments.map((i) => i.name).slice(0, 4).join(', ')}
                        {mission.instruments.length > 4 ? ` +${mission.instruments.length - 4}` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-2 border-t border-space-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    LAUNCH: {new Date(mission.launchDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => {
                      if (mission.targetBody === 'Moon') handleLaunch3D('moon', mission.id);
                      else if (mission.targetBody === 'Mars') handleLaunch3D('mars', mission.id);
                      else if (mission.targetBody === 'Sun') handleLaunch3D('sun', mission.id);
                      else handleLaunch3D('earth', mission.id);
                    }}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-isro-cyan/15 hover:bg-isro-cyan/30 text-isro-cyan border border-isro-cyan/30 text-xs font-mono font-medium transition-all group-hover:shadow-glow-cyan"
                  >
                    <span>Inspect in 3D</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SCIENTIFIC ARCHITECTURE & KEY PILLARS */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-isro-amber font-semibold uppercase tracking-widest">
              RESEARCH GRADE ENGINEERING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              Why VYOMIQ is Different
            </h2>
            <p className="text-sm text-slate-300">
              Unlike generic static models, VYOMIQ is built on authentic space physics, real telemetry equations, and officially archived ISRO scientific data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-interactive-card p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-isro-cyan/40 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-isro-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white">Zero-Drift Keplerian Orbits</h3>
                  <span className="text-[11px] font-mono text-cyan-400">Synchronized Coordinate Transformations</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Satellites and orbit curves share identical mathematical reference frames. Mangalyaan maintains its authentic 150° inclined Mars elliptical trajectory, Aditya-L1 traces its Sun-Earth L1 Halo orbit, and Chandrayaan stays fixed at the true coordinates of Shiv Shakti Point (69.373° S).
              </p>
            </div>

            <div className="glass-interactive-card p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-isro-amber/40 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-isro-amber" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white">Speed-of-Light Signal Delay</h3>
                  <span className="text-[11px] font-mono text-amber-400">Deep Space Telemetry Engine</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates real-world radio propagation delays: 1.28 seconds for lunar telemetry and ~12.5 minutes for Mars communication, with Deep Space Network IDSN-32M tracking status and solar power generation metrics.
              </p>
            </div>

            <div className="glass-interactive-card p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/40 flex items-center justify-center">
                  <Database className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white">Raw vs Calibrated Image Slider</h3>
                  <span className="text-[11px] font-mono text-pink-400">Authentic Observation Explorer</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interactive before/after comparative analysis slider comparing raw sensor captures with contrast-enhanced mineral maps and false-color scientific composites with direct links to ISSDC/PRADAN data products.
              </p>
            </div>

            <div className="glass-interactive-card p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white">In-Situ Scientific Data Analytics</h3>
                  <span className="text-[11px] font-mono text-emerald-400">ChaSTE, LIBS, Aditya-L1 & AstroSat</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interactive charts visualizing the lunar regolith thermal depth gradient (+54°C down to -8.5°C), the in-situ elemental discovery of lunar sulfur, the May 2024 solar superstorm plasma surge, and Crab Pulsar polarimetric curves.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. IMMERSIVE BOTTOM BANNER / READY TO EXPLORE */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-isro-cyan/40 bg-gradient-to-r from-space-900 via-[#0a142c] to-space-900 shadow-glow-cyan text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              Ready to Explore India's Cosmos?
            </h2>
            <p className="text-sm text-slate-300">
              Take complete control of the 3D solar system. Rotate planetary bodies, lock onto spacecraft trajectories, and discover India's scientific triumphs in space.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleLaunch3D('all')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-isro-amber to-isro-saffron text-white font-mono font-bold text-sm uppercase tracking-wider shadow-glow-orange hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Rocket className="w-4 h-4" />
                <span>Enter 3D Universe</span>
              </button>
              <button
                onClick={() => {
                  spaceAudio.playClick();
                  onNavigate('about');
                }}
                className="px-6 py-3.5 rounded-xl bg-space-800/80 hover:bg-space-700 text-slate-200 font-mono text-sm tracking-wider uppercase border border-space-600 transition-all"
              >
                About Project
              </button>
            </div>
          </div>
        </section>

        {/* Footer Attribution */}
        <footer className="pt-6 pb-10 border-t border-space-800 text-center font-mono text-xs text-slate-500 space-y-2">
          <p>
            VYOMIQ is built for educational & scientific exploration. Data and observations sourced from ISRO, ISSDC, PRADAN, and NASA PDS.
          </p>
          <p className="text-[11px] text-slate-600">
            ISRO • Indian Space Research Organisation • Government of India
          </p>
        </footer>
      </div>
    </div>
  );
};
