import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getMoonTexture } from '../../utils/textureGenerator';
import { SpacecraftModel } from './SpacecraftModel';
import { OrbitPath } from './OrbitPath';
import { Mission } from '../../types';

interface MoonSystemProps {
  earthPosition?: [number, number, number];
  missions: Mission[];
  selectedId: string | null;
  onSelect: (id: string, type: 'planet' | 'spacecraft') => void;
  timeScale: number;
}

export const MoonSystem: React.FC<MoonSystemProps> = ({
  earthPosition = [36, 0, 0],
  missions,
  selectedId,
  onSelect,
  timeScale,
}) => {
  const moonGroupRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);

  const moonTexture = useMemo(() => getMoonTexture(), []);

  // Filter lunar missions
  const lunarMissions = useMemo(
    () => missions.filter((m) => m.targetBody === 'Moon' || m.category === 'lunar'),
    [missions]
  );

  const ch3 = useMemo(() => missions.find((m) => m.id === 'chandrayaan-3'), [missions]);
  const isMoonSelected = selectedId === 'moon';

  // Refs for lunar orbiters
  const orbiterRefs = useRef<{ [key: string]: THREE.Group | null }>({});

  const getLunarOrbitRadius = (id: string) => {
    switch (id) {
      case 'chandrayaan-1': return 1.35;
      case 'chandrayaan-2': return 1.58;
      case 'chandrayaan-4': return 1.82;
      default: return 1.45;
    }
  };

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * timeScale;

    // Moon orbits around Earth at radius 9.5 units
    if (moonGroupRef.current) {
      const moonOrbitalTheta = elapsed * 0.08;
      const mx = earthPosition[0] + Math.cos(moonOrbitalTheta) * 9.5;
      const mz = earthPosition[2] + Math.sin(moonOrbitalTheta) * 9.5;
      moonGroupRef.current.position.set(mx, 0, mz);
    }

    // Moon tidally locked axial rotation
    if (moonMeshRef.current) {
      moonMeshRef.current.rotation.y = elapsed * 0.08;
    }

    // Lunar polar orbiters strictly on OrbitPath [Math.PI / 2, 0, 0] geometry
    lunarMissions.forEach((m, idx) => {
      const group = orbiterRefs.current[m.id];
      if (group && m.id !== 'chandrayaan-3') {
        const speed = 0.5 + idx * 0.12;
        const theta = elapsed * speed + (idx * Math.PI) / 2;
        const r = getLunarOrbitRadius(m.id);

        // Coordinates strictly tracking OrbitPath [inc=90°]
        // x = r * cos(theta), y = -r * sin(theta), z = 0
        const x = r * Math.cos(theta);
        const y = -r * Math.sin(theta);
        const z = 0;

        group.position.set(x, y, z);

        // Point spacecraft along orbital velocity tangent
        const vx = -r * Math.sin(theta);
        const vy = -r * Math.cos(theta);
        group.lookAt(x + vx, y + vy, z);
      }
    });
  });

  // Shiv Shakti Point exact coordinates on Moon sphere (R = 0.9):
  // Lat: 69.373° S, Lon: 32.319° E
  const sspX = 0.268;
  const sspY = -0.842;
  const sspZ = 0.169;

  return (
    <group ref={moonGroupRef} position={[earthPosition[0] + 9.5, 0, 0]}>
      {/* Moon Center Sphere with high-contrast authentic albedo */}
      <mesh
        ref={moonMeshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect('moon', 'planet');
        }}
      >
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshStandardMaterial
          map={moonTexture}
          roughness={0.78}
          metalness={0.04}
        />
      </mesh>

      {/* Moon Selection Ring */}
      {isMoonSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.15, 1.22, 36]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* SHIV SHAKTI POINT - Chandrayaan-3 Landing Site Marker */}
      <group position={[sspX, sspY, sspZ]}>
        {/* Glowing Pin Beacon */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect('chandrayaan-3', 'spacecraft');
          }}
        >
          <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        {/* Indian Flag Tricolor Marker Beacon */}
        <mesh
          position={[0, 0.14, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect('chandrayaan-3', 'spacecraft');
          }}
        >
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color="#ff6600" />
        </mesh>

        {/* Surface Vikram Lander & Pragyan Rover 3D Model */}
        {ch3 && (
          <group
            position={[0.04, 0.02, 0]}
            scale={0.15}
            onClick={(e) => {
              e.stopPropagation();
              onSelect('chandrayaan-3', 'spacecraft');
            }}
          >
            <SpacecraftModel
              id="chandrayaan-3"
              specs={ch3.specs}
              color={ch3.color}
              isSelected={selectedId === 'chandrayaan-3'}
            />
          </group>
        )}
      </group>

      {/* Lunar Orbiting Missions (Chandrayaan-1, Chandrayaan-2, Chandrayaan-4) */}
      {lunarMissions.map((m) => {
        if (m.id === 'chandrayaan-3') return null; // Landed on surface
        const isSelected = selectedId === m.id;
        const radius = getLunarOrbitRadius(m.id);

        return (
          <React.Fragment key={m.id}>
            {/* Polar Orbital Line (90° inclination) */}
            <OrbitPath
              radiusX={radius}
              inclinationDeg={90}
              color={m.color}
              opacity={isSelected ? 0.95 : 0.4}
              dashed={m.status === 'planned'}
            />

            {/* Spacecraft Model */}
            <group
              ref={(el) => (orbiterRefs.current[m.id] = el)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(m.id, 'spacecraft');
              }}
            >
              <SpacecraftModel
                id={m.id}
                specs={m.specs}
                color={m.color}
                isSelected={isSelected}
                scale={0.24}
              />
            </group>
          </React.Fragment>
        );
      })}
    </group>
  );
};
