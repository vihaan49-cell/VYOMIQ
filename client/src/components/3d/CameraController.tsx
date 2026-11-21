import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface CameraControllerProps {
  selectedId: string | null;
  selectedType: 'planet' | 'spacecraft' | 'all' | null;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedId,
  selectedType,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Target camera position and lookAt vectors
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(25, 30, 60));
  const targetLook = useRef<THREE.Vector3>(new THREE.Vector3(25, 0, 8));
  const isTransitioning = useRef<boolean>(true);

  useEffect(() => {
    isTransitioning.current = true;

    if (!selectedId || selectedType === 'all') {
      // Full Solar System Overview
      targetPos.current.set(25, 32, 65);
      targetLook.current.set(25, 0, 8);
    } else if (selectedId === 'sun') {
      targetPos.current.set(0, 5, 20);
      targetLook.current.set(0, 0, 0);
    } else if (selectedId === 'aditya-l1') {
      targetPos.current.set(23, 2, 5);
      targetLook.current.set(22, 0, 0);
    } else if (selectedId === 'earth') {
      targetPos.current.set(36, 3, 7);
      targetLook.current.set(36, 0, 0);
    } else if (selectedId === 'moon') {
      targetPos.current.set(45.5, 2.5, 4.5);
      targetLook.current.set(45.5, 0, 0);
    } else if (selectedId === 'chandrayaan-3') {
      // Close up of South Pole / Shiv Shakti Point
      targetPos.current.set(45.8, -0.4, 2.0);
      targetLook.current.set(45.7, -0.7, 0.3);
    } else if (selectedId === 'chandrayaan-2' || selectedId === 'chandrayaan-1' || selectedId === 'chandrayaan-4') {
      targetPos.current.set(45.5, 3, 5);
      targetLook.current.set(45.5, 0, 0);
    } else if (selectedId === 'mars') {
      targetPos.current.set(56, 4, 24);
      targetLook.current.set(56, 0, 18);
    } else if (selectedId === 'mangalyaan-1') {
      targetPos.current.set(57, 4, 23);
      targetLook.current.set(56, 0, 18);
    } else {
      // Default Earth Orbiting Satellites (AstroSat, XPoSat, Cartosat, etc.)
      targetPos.current.set(37.5, 2.5, 5.5);
      targetLook.current.set(36, 0, 0);
    }
  }, [selectedId, selectedType]);

  useFrame((_, delta) => {
    if (controlsRef.current && isTransitioning.current) {
      // Smooth damp lerp towards target
      camera.position.lerp(targetPos.current, delta * 3.0);
      controlsRef.current.target.lerp(targetLook.current, delta * 3.0);
      controlsRef.current.update();

      // End auto-transition when camera is close to destination
      if (
        camera.position.distanceTo(targetPos.current) < 0.2 &&
        controlsRef.current.target.distanceTo(targetLook.current) < 0.1
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.8}
      zoomSpeed={1.0}
      panSpeed={0.8}
      minDistance={1.2}
      maxDistance={180}
      onStart={() => {
        // If user manually grabs controls, pause transition
        isTransitioning.current = false;
      }}
    />
  );
};
