import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Starfield: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Astronomical star spectral color palette
    const spectralColors = [
      new THREE.Color('#93c5fd'), // O/B class blue giant
      new THREE.Color('#f8fafc'), // A/F class white
      new THREE.Color('#fef08a'), // G class yellow (like Sun)
      new THREE.Color('#fed7aa'), // K class orange
      new THREE.Color('#fca5a5'), // M class red dwarf
    ];

    for (let i = 0; i < count; i++) {
      // Distribute points on outer spherical shell
      const r = 250 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, []);

  // Subtle deep-space galactic rotation
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.6}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation={false}
      />
    </points>
  );
};
