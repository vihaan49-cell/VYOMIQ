import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getMarsTexture } from '../../utils/textureGenerator';
import { SpacecraftModel } from './SpacecraftModel';
import { OrbitPath } from './OrbitPath';
import { Mission } from '../../types';

interface MarsSystemProps {
  position?: [number, number, number];
  missions: Mission[];
  selectedId: string | null;
  onSelect: (id: string, type: 'planet' | 'spacecraft') => void;
  timeScale: number;
}

export const MarsSystem: React.FC<MarsSystemProps> = ({
  position = [56, 0, 18],
  missions,
  selectedId,
  onSelect,
  timeScale,
}) => {
  const marsMeshRef = useRef<THREE.Mesh>(null);
  const momRef = useRef<THREE.Group>(null);

  const marsTexture = useMemo(() => getMarsTexture(), []);
  const momMission = useMemo(() => missions.find((m) => m.id === 'mangalyaan-1'), [missions]);

  const isMarsSelected = selectedId === 'mars';
  const isMomSelected = selectedId === 'mangalyaan-1';

  // Highly elliptical orbit parameters for Mangalyaan (421 km x 76,993 km)
  const a = 2.75; // Semi-major axis
  const b = 1.45; // Semi-minor axis
  const incDeg = 150; // 150° retrograde inclination
  const incRad = (incDeg * Math.PI) / 180;

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * timeScale;

    // Mars axial rotation
    if (marsMeshRef.current) {
      marsMeshRef.current.rotation.y = elapsed * 0.11;
    }

    // Mangalyaan Keplerian Elliptical Orbit Animation strictly on OrbitPath geometry
    if (momRef.current) {
      // Kepler's speed variation: faster at periapsis, slower at apoapsis
      const meanAnomaly = elapsed * 0.32;
      const e = 0.55; // Eccentricity
      const E = meanAnomaly + e * Math.sin(meanAnomaly);

      // Coordinates strictly matching OrbitPath [incDeg=150]
      const x = a * Math.cos(E);
      const y = -b * Math.sin(E) * Math.sin(incRad);
      const z = b * Math.sin(E) * Math.cos(incRad);

      momRef.current.position.set(x, y, z);

      // Tangent velocity vector for forward pointing
      const vx = -a * Math.sin(E);
      const vy = -b * Math.cos(E) * Math.sin(incRad);
      const vz = b * Math.cos(E) * Math.cos(incRad);
      momRef.current.lookAt(x + vx, y + vy, z + vz);
    }
  });

  return (
    <group position={position}>
      {/* Mars Sphere with Photorealistic Butterscotch & Basalt Texture */}
      <mesh
        ref={marsMeshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect('mars', 'planet');
        }}
      >
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial
          map={marsTexture}
          roughness={0.82}
          metalness={0.06}
        />
      </mesh>

      {/* Thin Atmospheric Limb Haze (Pale azure/white scattering) */}
      <mesh>
        <sphereGeometry args={[1.56, 32, 32]} />
        <meshBasicMaterial
          color="#bfdbfe"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Mars Selection Ring */}
      {isMarsSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.85, 1.95, 48]} />
          <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Mangalyaan Highly Elliptical Orbit Trajectory */}
      <OrbitPath
        radiusX={a}
        radiusZ={b}
        inclinationDeg={incDeg}
        color="#ef4444"
        opacity={isMomSelected ? 0.95 : 0.45}
      />

      {/* Mangalyaan (MOM) Spacecraft Model */}
      {momMission && (
        <group
          ref={momRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect('mangalyaan-1', 'spacecraft');
          }}
        >
          <SpacecraftModel
            id="mangalyaan-1"
            specs={momMission.specs}
            color={momMission.color}
            isSelected={isMomSelected}
            scale={0.28}
          />
        </group>
      )}
    </group>
  );
};
