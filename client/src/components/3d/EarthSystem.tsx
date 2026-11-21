import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getEarthTexture, getEarthCloudTexture } from '../../utils/textureGenerator';
import { SpacecraftModel } from './SpacecraftModel';
import { OrbitPath } from './OrbitPath';
import { Mission } from '../../types';

interface EarthSystemProps {
  position?: [number, number, number];
  missions: Mission[];
  selectedId: string | null;
  onSelect: (id: string, type: 'planet' | 'spacecraft') => void;
  timeScale: number;
}

export const EarthSystem: React.FC<EarthSystemProps> = ({
  position = [36, 0, 0],
  missions,
  selectedId,
  onSelect,
  timeScale,
}) => {
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);

  // Load NASA Visible Earth Blue Marble, Normal Map, Specular Map, and Clouds
  const { earthTexture, earthNormalMap, earthSpecularMap, cloudTexture } = useMemo(() => {
    const loader = new THREE.TextureLoader();
    try {
      const eTex = loader.load('/textures/earth_atmos_2048.jpg', undefined, undefined, () => getEarthTexture());
      eTex.colorSpace = THREE.SRGBColorSpace;

      const normTex = loader.load('/textures/earth_normal_2048.jpg');
      const specTex = loader.load('/textures/earth_specular_2048.jpg');

      const cTex = loader.load('/textures/earth_clouds_1024.png', undefined, undefined, () => getEarthCloudTexture());
      cTex.colorSpace = THREE.SRGBColorSpace;

      return {
        earthTexture: eTex,
        earthNormalMap: normTex,
        earthSpecularMap: specTex,
        cloudTexture: cTex,
      };
    } catch {
      return {
        earthTexture: getEarthTexture(),
        earthNormalMap: null,
        earthSpecularMap: null,
        cloudTexture: getEarthCloudTexture(),
      };
    }
  }, []);

  // Filter missions orbiting Earth
  const earthMissions = useMemo(
    () => missions.filter((m) => m.targetBody === 'Earth' && m.destination === 'Earth Orbit'),
    [missions]
  );

  const isEarthSelected = selectedId === 'earth';

  // Refs for orbital propagation of satellites
  const satRefs = useRef<{ [key: string]: THREE.Group | null }>({});

  // Defined non-overlapping orbital radii for Earth constellation
  const getMissionRadius = (id: string) => {
    switch (id) {
      case 'gaganyaan': return 2.65;
      case 'cartosat-3': return 2.82;
      case 'risat-2b': return 2.98;
      case 'astrosat': return 3.16;
      case 'xposat': return 3.32;
      case 'oceansat-3': return 3.52;
      case 'insat-3dr': return 4.25; // GEO
      case 'navic-constellation': return 4.75; // GSO
      default: return 3.0;
    }
  };

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * timeScale;

    // Earth axial rotation (23.5° axial tilt)
    if (earthMeshRef.current) {
      earthMeshRef.current.rotation.y = elapsed * 0.12;
    }
    // Clouds rotate slightly faster than surface for authentic atmospheric dynamics
    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y = elapsed * 0.14;
    }

    // Exact mathematical orbital propagation matching OrbitPath geometry
    earthMissions.forEach((m, idx) => {
      const group = satRefs.current[m.id];
      if (group) {
        const orbitalPeriod = m.specs.orbitalPeriodMin || 95;
        const speed = (180 / orbitalPeriod) * 0.45;
        const theta = elapsed * speed + (idx * Math.PI) / 3;

        const r = getMissionRadius(m.id);
        const incRad = ((m.orbitInclination || 0) * Math.PI) / 180;

        const x = r * Math.cos(theta);
        const y = -r * Math.sin(theta) * Math.sin(incRad);
        const z = r * Math.sin(theta) * Math.cos(incRad);

        group.position.set(x, y, z);

        const vx = -r * Math.sin(theta);
        const vy = -r * Math.cos(theta) * Math.sin(incRad);
        const vz = r * Math.cos(theta) * Math.cos(incRad);
        group.lookAt(x + vx, y + vy, z + vz);
      }
    });
  });

  return (
    <group position={position}>
      {/* Earth Center Sphere with 23.5° Axial Tilt */}
      <group rotation={[0.41, 0, 0]}>
        {/* Photorealistic Surface Mesh */}
        <mesh
          ref={earthMeshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect('earth', 'planet');
          }}
        >
          <sphereGeometry args={[2.2, 64, 64]} />
          <meshStandardMaterial
            map={earthTexture}
            normalMap={earthNormalMap || undefined}
            normalScale={new THREE.Vector2(0.85, 0.85)}
            roughnessMap={earthSpecularMap || undefined}
            roughness={0.65}
            metalness={0.08}
          />
        </mesh>

        {/* Rotating Atmospheric Clouds Layer */}
        <mesh ref={cloudsMeshRef}>
          <sphereGeometry args={[2.235, 64, 64]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.8}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Luminous Atmospheric Rayleigh Scattering Rim (Sky-blue glow) */}
        <mesh>
          <sphereGeometry args={[2.34, 48, 48]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.32}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Earth Selection Ring */}
      {isEarthSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.7, 2.8, 48]} />
          <meshBasicMaterial color="#06b6d4" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Earth Orbiting Satellites and Orbital Trails */}
      {earthMissions.map((m) => {
        const isSelected = selectedId === m.id;
        const radius = getMissionRadius(m.id);

        return (
          <React.Fragment key={m.id}>
            {/* Orbital Path Line strictly matching satellite coordinates */}
            <OrbitPath
              radiusX={radius}
              inclinationDeg={m.orbitInclination}
              color={m.color}
              opacity={isSelected ? 0.95 : 0.35}
              dashed={m.status === 'planned'}
            />

            {/* Spacecraft Node */}
            <group
              ref={(el) => (satRefs.current[m.id] = el)}
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
                scale={0.18}
              />
            </group>
          </React.Fragment>
        );
      })}
    </group>
  );
};
