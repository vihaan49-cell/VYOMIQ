import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { RotateCw, Maximize2, Compass, Eye } from 'lucide-react';
import { SpacecraftModel } from './SpacecraftModel';
import { Mission } from '../../types';

interface SpacecraftViewer3DProps {
  mission: Mission;
  height?: string;
  showExpandButton?: boolean;
  onExpand?: () => void;
}

export const SpacecraftViewer3D: React.FC<SpacecraftViewer3DProps> = ({
  mission,
  height = 'h-52',
  showExpandButton = false,
  onExpand,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`w-full ${height} relative rounded-xl overflow-hidden bg-gradient-to-b from-[#040817] to-[#02050e] border border-space-700/60 shadow-inner group select-none`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [2.2, 1.4, 2.5], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
      >
        <color attach="background" args={['#040817']} />

        {/* Studio High-Dynamic Range Lighting */}
        <ambientLight intensity={0.65} color="#ffffff" />
        <directionalLight position={[5, 6, 4]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-4, 2, -3]} intensity={0.9} color="#7dd3fc" />
        <directionalLight position={[0, -4, -3]} intensity={0.5} color="#f59e0b" />
        <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffffff" />

        {/* Spacecraft Assembly */}
        <group position={[0, -0.1, 0]}>
          <SpacecraftModel
            id={mission.id}
            specs={mission.specs}
            color={mission.color}
            scale={0.95}
            interactiveMode={true}
          />
        </group>

        {/* Orbit Interaction Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          minDistance={1.2}
          maxDistance={5.5}
          maxPolarAngle={Math.PI - 0.1}
          minPolarAngle={0.1}
        />
      </Canvas>

      {/* Top Overlay Badge */}
      <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-space-950/80 border border-space-700/70 text-[10px] font-mono text-slate-300 pointer-events-none">
        <Compass className="w-3 h-3 text-isro-cyan animate-spin-slow" />
        <span className="font-semibold text-white">3D Spacecraft Inspector</span>
        <span className="text-isro-gold text-[9px] uppercase">({mission.specs.craftType})</span>
      </div>

      {/* Bottom Floating Control Buttons */}
      <div className="absolute bottom-2 right-2 flex items-center space-x-1 z-10">
        <button
          onClick={() => setAutoRotate((prev) => !prev)}
          className={`p-1.5 rounded-md text-xs font-mono transition-colors border ${
            autoRotate
              ? 'bg-isro-cyan/20 border-isro-cyan/50 text-isro-cyan'
              : 'bg-space-900/90 border-space-700 text-slate-400 hover:text-white'
          }`}
          title={autoRotate ? 'Pause 360° Auto-Rotate' : 'Start 360° Auto-Rotate'}
        >
          <RotateCw className="w-3 h-3" />
        </button>

        <button
          onClick={handleResetCamera}
          className="p-1.5 rounded-md bg-space-900/90 hover:bg-space-800 border border-space-700 text-slate-400 hover:text-white text-xs transition-colors"
          title="Reset Camera View"
        >
          <Eye className="w-3 h-3" />
        </button>

        {showExpandButton && onExpand && (
          <button
            onClick={onExpand}
            className="p-1.5 rounded-md bg-space-900/90 hover:bg-space-800 border border-space-700 text-slate-400 hover:text-white text-xs transition-colors"
            title="Inspect in Fullscreen"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Bottom Left Gesture Hint */}
      <div className="absolute bottom-2 left-2.5 text-[9px] font-mono text-slate-400/80 pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};
