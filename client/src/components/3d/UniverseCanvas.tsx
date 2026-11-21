import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Compass, Eye, Sparkles } from 'lucide-react';
import { SunBody } from './SunBody';
import { EarthSystem } from './EarthSystem';
import { MoonSystem } from './MoonSystem';
import { MarsSystem } from './MarsSystem';
import { Starfield } from './Starfield';
import { OrbitPath } from './OrbitPath';
import { CameraController } from './CameraController';
import { Mission } from '../../types';

interface UniverseCanvasProps {
  missions: Mission[];
  selectedId: string | null;
  selectedType: 'planet' | 'spacecraft' | 'all' | null;
  onSelect: (id: string, type: 'planet' | 'spacecraft') => void;
  timeScale: number;
  showTags?: boolean;
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  missions,
  selectedId,
  selectedType,
  onSelect,
  timeScale,
  showTags = true,
}) => {
  const activeMission = missions.find((m) => m.id === selectedId);

  const getTargetTitle = () => {
    if (!selectedId || selectedType === 'all') return 'Solar System Overview';
    if (selectedId === 'sun') return 'The Sun (Surya) • Aditya-L1 Halo';
    if (selectedId === 'earth') return 'Earth (Prithvi) • Orbital Constellation';
    if (selectedId === 'moon') return 'The Moon (Chandra) • Lunar Polar Orbit';
    if (selectedId === 'chandrayaan-3') return 'Chandrayaan-3 • Shiv Shakti Point';
    if (selectedId === 'mars') return 'Mars (Mangal) • Red Planet';
    if (selectedId === 'mangalyaan-1') return 'Mangalyaan (MOM) • Martian Orbit';
    if (activeMission) return `${activeMission.name} • ${activeMission.destination}`;
    return selectedId.toUpperCase();
  };

  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [25, 32, 65], fov: 45, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
          powerPreference: 'high-performance',
          alpha: false,
          depth: true,
          stencil: false,
        }}
      >
        <color attach="background" args={['#030712']} />

        {/* Photorealistic Lighting: Vibrant ambient light so textures are rich & visible from all angles */}
        <ambientLight intensity={0.85} color="#ffffff" />
        
        {/* Soft directional fill light and rim highlights for metallic spacecraft & planets */}
        <directionalLight position={[20, 25, 20]} intensity={0.9} color="#f8fafc" />
        <directionalLight position={[-20, -10, -15]} intensity={0.4} color="#7dd3fc" />

        <Suspense fallback={null}>
          {/* Deep Space Background Stars */}
          <Starfield />

          {/* Planetary Orbital Rings around Sun */}
          {/* Earth Orbit Ring around Sun (Radius 36) */}
          <OrbitPath radiusX={36} color="#06b6d4" opacity={0.25} />
          {/* Mars Orbit Ring around Sun (Radius ~58, slight eccentricity) */}
          <OrbitPath radiusX={58} radiusZ={56} color="#ef4444" opacity={0.22} />

          {/* Moon's Orbit Ring around Earth (Radius 9.5 centered at Earth position [36, 0, 0]) */}
          <group position={[36, 0, 0]}>
            <OrbitPath radiusX={9.5} color="#94a3b8" opacity={0.3} dashed />
          </group>

          {/* Central Sun & Aditya-L1 System */}
          <SunBody
            position={[0, 0, 0]}
            missions={missions}
            selectedId={selectedId}
            onSelect={onSelect}
            timeScale={timeScale}
            showTags={showTags}
          />

          {/* Earth Planetary System & LEO/GEO Satellites */}
          <EarthSystem
            position={[36, 0, 0]}
            missions={missions}
            selectedId={selectedId}
            onSelect={onSelect}
            timeScale={timeScale}
            showTags={showTags}
          />

          {/* Moon System orbiting Earth & Polar Lunar Orbiters */}
          <MoonSystem
            earthPosition={[36, 0, 0]}
            missions={missions}
            selectedId={selectedId}
            onSelect={onSelect}
            timeScale={timeScale}
            showTags={showTags}
          />

          {/* Mars Planetary System & Mangalyaan Elliptical Orbit */}
          <MarsSystem
            position={[56, 0, 18]}
            missions={missions}
            selectedId={selectedId}
            onSelect={onSelect}
            timeScale={timeScale}
            showTags={showTags}
          />

          {/* Camera Animation & Interaction Controller */}
          <CameraController
            selectedId={selectedId}
            selectedType={selectedType}
          />
        </Suspense>
      </Canvas>

      {/* Modern HUD Target Overlay - Visible in 3D Universe mode */}
      {showTags && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 hidden sm:flex flex-col items-center">
          <div className="flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-space-900/90 border border-isro-cyan/40 shadow-glow-cyan backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-isro-cyan animate-pulse" />
            <span className="text-[12px] font-sans font-bold tracking-tight text-white uppercase drop-shadow">
              {getTargetTitle()}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[11px] font-sans font-bold text-isro-amber uppercase tracking-tight flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              REAL-TIME EPHEMERIS
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans font-medium tracking-tight mt-1.5 drop-shadow">
            Left Click: Orbit • Right Click: Pan • Scroll: Zoom • Click any spacecraft or tag to lock
          </p>
        </div>
      )}
    </div>
  );
};
