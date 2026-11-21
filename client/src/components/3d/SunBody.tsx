import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSunTexture } from '../../utils/textureGenerator';
import { SpacecraftModel } from './SpacecraftModel';
import { Mission } from '../../types';

interface SunBodyProps {
  position?: [number, number, number];
  missions: Mission[];
  selectedId: string | null;
  onSelect: (id: string, type: 'planet' | 'spacecraft') => void;
  timeScale: number;
}

export const SunBody: React.FC<SunBodyProps> = ({
  position = [0, 0, 0],
  missions,
  selectedId,
  onSelect,
  timeScale,
}) => {
  const sunMeshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const adityaRef = useRef<THREE.Group>(null);

  const sunTexture = useMemo(() => getSunTexture(), []);
  const adityaMission = useMemo(() => missions.find((m) => m.id === 'aditya-l1'), [missions]);

  const isSunSelected = selectedId === 'sun';
  const isAdityaSelected = selectedId === 'aditya-l1';

  // L1 Halo Orbit Parameters (L1 point at x = 22 along Sun-Earth axis)
  const l1CenterX = 22;
  const haloRy = 1.35; // Semi-major axis in Y
  const haloRz = 1.05; // Semi-minor axis in Z

  // Points for Aditya-L1 Halo Orbit Trajectory Line (strictly in Y-Z plane at x = 22)
  const haloOrbitGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 96;
    for (let i = 0; i <= segments; i++) {
      const th = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          l1CenterX,
          Math.cos(th) * haloRy,
          Math.sin(th) * haloRz
        )
      );
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const lineDistances = new Float32Array(pts.length);
    let dist = 0;
    for (let i = 0; i < pts.length; i++) {
      if (i > 0) dist += pts[i].distanceTo(pts[i - 1]);
      lineDistances[i] = dist;
    }
    geom.setAttribute('lineDistance', new THREE.BufferAttribute(lineDistances, 1));
    return geom;
  }, [l1CenterX, haloRy, haloRz]);

  // Sun rotation & corona pulsing animation
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * timeScale;
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.y = elapsed * 0.05;
    }
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.035;
      coronaRef.current.scale.set(pulse, pulse, pulse);
    }

    // Aditya-L1 precisely tracking the Halo Orbit in Y-Z plane
    if (adityaRef.current) {
      const haloTheta = elapsed * 0.35;
      const hx = l1CenterX;
      const hy = Math.cos(haloTheta) * haloRy;
      const hz = Math.sin(haloTheta) * haloRz;
      adityaRef.current.position.set(hx, hy, hz);

      // Keep VELC solar coronagraph telescope aperture pointing Sun-ward (-X)
      adityaRef.current.lookAt(position[0], hy, hz);
    }
  });

  return (
    <group position={position}>
      {/* Central Sun Sphere with Photorealistic Radiant Surface */}
      <mesh
        ref={sunMeshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect('sun', 'planet');
        }}
      >
        <sphereGeometry args={[7, 64, 64]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>

      {/* Atmospheric Corona Glow Layers (Warm Gold & Amber Halos) */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[7.75, 40, 40]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[9.2, 36, 36]} />
        <meshBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Solar Prominence Flare Arcs */}
      {[0, 1.25, 2.75, 4.4].map((angle, idx) => (
        <group key={idx} rotation={[0, angle, 0.35]}>
          <mesh position={[7.15, 0, 0]}>
            <torusGeometry args={[0.95, 0.08, 12, 28, Math.PI]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.75} />
          </mesh>
        </group>
      ))}

      {/* Sun selection highlight */}
      {isSunSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[8.8, 9.1, 48]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Radiant Solar Light casting warm white sunlight across solar system */}
      <pointLight color="#fffdf0" intensity={4.5} distance={350} decay={0.6} />

      {/* Lagrange Point 1 (L1) & Aditya-L1 Halo Orbit */}
      <group>
        {/* Halo Orbit Path Line strictly matching spacecraft path */}
        <lineLoop geometry={haloOrbitGeometry}>
          <lineDashedMaterial
            color="#f59e0b"
            dashSize={0.4}
            gapSize={0.2}
            transparent
            opacity={isAdityaSelected ? 0.95 : 0.45}
            depthWrite={false}
          />
        </lineLoop>

        {/* Aditya-L1 Spacecraft */}
        {adityaMission && (
          <group
            ref={adityaRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect('aditya-l1', 'spacecraft');
            }}
          >
            <SpacecraftModel
              id="aditya-l1"
              specs={adityaMission.specs}
              color={adityaMission.color}
              isSelected={isAdityaSelected}
              scale={0.48}
            />
          </group>
        )}
      </group>
    </group>
  );
};
