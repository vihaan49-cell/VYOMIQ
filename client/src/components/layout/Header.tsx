import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  Search,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Database,
  BarChart3,
  Image as ImageIcon,
  Info,
  Maximize2,
  RotateCcw,
  Github,
} from 'lucide-react';
import { spaceAudio } from '../../utils/audio';

interface HeaderProps {
  currentView: 'home' | 'universe' | 'missions' | 'observations' | 'gallery' | 'analytics' | 'about';
  onNavigate: (view: 'home' | 'universe' | 'missions' | 'observations' | 'gallery' | 'analytics' | 'about') => void;
  onOpenSearch: () => void;
  timeScale: number;
  setTimeScale: (scale: number) => void;
  onCameraPreset: (preset: 'all' | 'sun' | 'earth' | 'moon' | 'mars') => void;
  activePreset: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  timeScale,
  setTimeScale,
  onCameraPreset,
  activePreset,
}) => {
  const [timeIST, setTimeIST] = useState<string>('');
  const [timeUTC, setTimeUTC] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Live clocks update every second
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeIST(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setTimeUTC(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const muted = spaceAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="h-16 w-full glass-panel border-b border-space-600/40 px-4 flex items-center justify-between z-30 select-none">
      {/* Left: Project Branding & Emblem */}
      <div className="flex items-center space-x-3.5">
        <div
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={() => {
            spaceAudio.playClick();
            onNavigate('universe');
            onCameraPreset('all');
          }}
        >
          {/* Animated Chakra / ISRO Orange Emblem */}
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-isro-amber to-isro-cyan p-[1.5px] shadow-glow-orange group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080e1e] rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-isro-saffron font-bold text-sm tracking-tighter">व्योम</span>
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-isro-cyan/50 animate-ping opacity-20 pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-white via-slate-200 to-isro-cyan bg-clip-text text-transparent font-mono">
                VYOMIQ
              </h1>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-isro-amber/20 text-isro-amber border border-isro-amber/30 uppercase tracking-wider">
                ISRO Unified
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              VISUALIZING YOUR MISSIONS, OBSERVATIONS & INSIGHTS
            </p>
          </div>
        </div>

        {/* Live Mission Control Telemetry Clocks */}
        <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-space-700/60 font-mono text-xs">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 tracking-wider">IST (BHARAT)</span>
            <span className="text-isro-gold font-semibold">{timeIST || '18:30:00'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 tracking-wider">UTC (ORBITAL)</span>
            <span className="text-isro-cyan font-semibold">{timeUTC || '13:00:00'}</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ISTRAC LINK OK</span>
          </div>
        </div>
      </div>

      {/* Center: Main Section Navigation Tabs */}
      <nav className="hidden md:flex items-center space-x-1 bg-space-900/80 p-1 rounded-lg border border-space-700/50">
        <button
          onClick={() => {
            spaceAudio.playClick();
            onNavigate('home');
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            currentView === 'home'
              ? 'bg-gradient-to-r from-isro-amber/20 to-isro-cyan/20 text-white border border-isro-amber/40 shadow-glow-orange'
              : 'text-slate-400 hover:text-white hover:bg-space-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-isro-amber" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            spaceAudio.playClick();
            onNavigate('universe');
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            currentView === 'universe'
              ? 'bg-gradient-to-r from-isro-cyan/20 to-isro-amber/20 text-white border border-isro-cyan/40 shadow-glow-cyan'
              : 'text-slate-400 hover:text-white hover:bg-space-800/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-isro-cyan" />
          <span>3D Universe</span>
        </button>

        <button
          onClick={() => {
            spaceAudio.playClick();
            onNavigate('observations');
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            currentView === 'observations'
              ? 'bg-isro-cyan/20 text-white border border-isro-cyan/40 shadow-glow-cyan'
              : 'text-slate-400 hover:text-white hover:bg-space-800/60'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-isro-gold" />
          <span>Observations</span>
        </button>

        <button
          onClick={() => {
            spaceAudio.playClick();
            onNavigate('gallery');
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            currentView === 'gallery'
              ? 'bg-isro-cyan/20 text-white border border-isro-cyan/40 shadow-glow-cyan'
              : 'text-slate-400 hover:text-white hover:bg-space-800/60'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
          <span>Space Gallery</span>
        </button>

        <button
          onClick={() => {
            spaceAudio.playClick();
            onNavigate('analytics');
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            currentView === 'analytics'
              ? 'bg-isro-cyan/20 text-white border border-isro-cyan/40 shadow-glow-cyan'
              : 'text-slate-400 hover:text-white hover:bg-space-800/60'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Science Analytics</span>
        </button>

        <button
          onClick={() => {
            spaceAudio.playClick();
            onNavigate('about');
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            currentView === 'about'
              ? 'bg-isro-cyan/20 text-white border border-isro-cyan/40 shadow-glow-cyan'
              : 'text-slate-400 hover:text-white hover:bg-space-800/60'
          }`}
        >
          <Info className="w-3.5 h-3.5 text-slate-300" />
          <span>About</span>
        </button>
      </nav>

      {/* Right: Quick Controls, Search, Camera Presets & Time Warp */}
      <div className="flex items-center space-x-2.5">
        {/* Universal Search Button */}
        <button
          onClick={() => {
            spaceAudio.playClick();
            onOpenSearch();
          }}
          className="flex items-center space-x-2 px-2.5 py-1.5 rounded-md bg-space-850 hover:bg-space-700/70 border border-space-600/50 text-slate-300 hover:text-white text-xs font-mono transition-all group"
          title="Universal Search (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-isro-cyan group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Search Data</span>
          <kbd className="hidden lg:inline text-[9px] bg-space-950 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700/60">
            ⌘K
          </kbd>
        </button>

        {/* Quick Camera Presets (when in 3D universe) */}
        {currentView === 'universe' && (
          <div className="hidden xl:flex items-center space-x-1 bg-space-900/90 px-1.5 py-1 rounded-md border border-space-700/60 font-mono text-[11px]">
            <span className="text-slate-400 text-[9px] px-1">VIEW:</span>
            {(['all', 'sun', 'earth', 'moon', 'mars'] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  spaceAudio.playClick();
                  onCameraPreset(preset);
                }}
                className={`px-2 py-0.5 rounded uppercase transition-colors ${
                  activePreset === preset
                    ? 'bg-isro-amber text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-space-800 hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        )}

        {/* Orbit Speed Multiplier / Time Scrubber */}
        {currentView === 'universe' && (
          <div className="flex items-center space-x-1 bg-space-900/90 px-2 py-1 rounded-md border border-space-700/60 font-mono text-xs">
            <button
              onClick={() => {
                spaceAudio.playClick();
                setTimeScale(timeScale === 0 ? 1 : 0);
              }}
              className="text-slate-300 hover:text-white p-0.5"
              title={timeScale === 0 ? 'Resume Orbit Motion' : 'Pause Orbit Motion'}
            >
              {timeScale === 0 ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
            </button>
            <button
              onClick={() => {
                spaceAudio.playClick();
                setTimeScale(timeScale === 1 ? 5 : timeScale === 5 ? 20 : 1);
              }}
              className="text-[11px] text-isro-cyan font-bold hover:underline px-1"
              title="Cycle Orbital Speed Multiplier"
            >
              {timeScale}x
            </button>
          </div>
        )}

        {/* Sound Toggle */}
        <button
          onClick={handleSoundToggle}
          className="p-1.5 rounded-md bg-space-850 hover:bg-space-700/70 border border-space-600/50 text-slate-300 hover:text-white transition-colors"
          title={isMuted ? 'Unmute Space Audio' : 'Mute Space Audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-isro-cyan" />}
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreenToggle}
          className="p-1.5 rounded-md bg-space-850 hover:bg-space-700/70 border border-space-600/50 text-slate-300 hover:text-white transition-colors hidden sm:block"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Developer GitHub Profile Link */}
        <a
          href="https://github.com/ishant25bce11024"
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-md bg-space-850 hover:bg-space-700/70 border border-space-600/50 text-slate-300 hover:text-white transition-colors flex items-center justify-center group"
          title="Developer GitHub: ishant25bce11024"
        >
          <Github className="w-3.5 h-3.5 group-hover:text-isro-cyan transition-colors" />
        </a>
      </div>
    </header>
  );
};
