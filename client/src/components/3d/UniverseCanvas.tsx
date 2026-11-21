import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
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
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  missions,
  selectedId,
  selectedType,
  onSelect,
  timeScale,
}) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [25, 32, 65], fov: 45, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#030712']} />

        {/* Photorealistic Lighting: Vibrant ambient light so textures are rich & visible from all angles */}
        <ambientLight intensity={0.75} color="#ffffff" />
        
        {/* Soft directional fill light */}
        <directionalLight position={[0, 20, 10]} intensity={0.4} color="#f8fafc" />

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
          />

          {/* Earth Planetary System & LEO/GEO Satellites */}
          <EarthSystem
            position={[36, 0, 0]}
            missions={missions}
            selectedId={selectedId}
            onSelect={onSelect}
            timeScale={timeScale}
          />

          {/* Moon System orbiting Earth & Polar Lunar Orbiters */}
          <MoonSystem
            earthPosition={[36, 0, 0]}
            missions={missions}
            selectedId={selectedId}
            onSelect={onSelect}
            timeScale={timeScale}
          />

          {/* Mars Planetary System & Mangalyaan Elliptical Orbit */}
          <MarsSystem
            position={[56, 0, 18]}
            missions={missions}
            selectedId={selectedId}
            onSelect={onSelect}
            timeScale={timeScale}
          />

          {/* Camera Animation & Interaction Controller */}
          <CameraController
            selectedId={selectedId}
            selectedType={selectedType}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
