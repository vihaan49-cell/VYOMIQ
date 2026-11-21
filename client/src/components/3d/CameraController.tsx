import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface CameraControllerProps {
  selectedId: string | null;
  selectedType: 'planet' | 'spacecraft' | 'all' | null;
}

// Camera offset vector relative to target world position
function getCameraOffset(id: string | null, type: string | null): THREE.Vector3 {
  if (!id || type === 'all') {
    return new THREE.Vector3(0, 34, 60);
  }
  if (id === 'sun') {
    return new THREE.Vector3(0, 8, 22);
  }
  if (id === 'earth') {
    return new THREE.Vector3(0, 3.5, 7.5);
  }
  if (id === 'moon') {
    return new THREE.Vector3(0, 2.2, 3.8);
  }
  if (id === 'chandrayaan-3') {
    return new THREE.Vector3(0.8, 0.6, 1.2);
  }
  if (id === 'mars') {
    return new THREE.Vector3(0, 3.5, 6.5);
  }
  if (id === 'aditya-l1') {
    return new THREE.Vector3(0.9, 0.8, 1.3);
  }
  if (id === 'mangalyaan-1') {
    return new THREE.Vector3(0.9, 0.8, 1.3);
  }
  // Lunar polar orbiters
  if (id === 'chandrayaan-1' || id === 'chandrayaan-2' || id === 'chandrayaan-4') {
    return new THREE.Vector3(0.9, 0.7, 1.4);
  }
  if (id.startsWith('chandrayaan')) {
    return new THREE.Vector3(0.8, 0.7, 1.1);
  }
  // Default Earth orbiting satellites
  return new THREE.Vector3(0.8, 0.7, 1.1);
}

// Fallback positions before Three.js scene tree is fully mounted
function getFallbackPosition(id: string | null): THREE.Vector3 {
  if (!id) return new THREE.Vector3(25, 0, 8);
  if (id === 'sun') return new THREE.Vector3(0, 0, 0);
  if (id === 'earth') return new THREE.Vector3(36, 0, 0);
  if (id === 'moon' || id.startsWith('chandrayaan')) return new THREE.Vector3(45.5, 0, 0);
  if (id === 'mars' || id === 'mangalyaan-1') return new THREE.Vector3(56, 0, 18);
  if (id === 'aditya-l1') return new THREE.Vector3(22, 0, 0);
  return new THREE.Vector3(36, 0, 0);
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedId,
  selectedType,
}) => {
  const { camera, scene } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const targetLook = useRef<THREE.Vector3>(new THREE.Vector3(25, 0, 8));
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(25, 34, 68));
  const isTransitioning = useRef<boolean>(true);
  const lastWorldPos = useRef<THREE.Vector3 | null>(null);

  // Trigger smooth transition whenever target changes
  useEffect(() => {
    isTransitioning.current = true;
    lastWorldPos.current = null;

    if (!selectedId || selectedType === 'all') {
      targetLook.current.set(25, 0, 8);
      targetPos.current.set(25, 34, 68);
    } else {
      const obj = scene.getObjectByName(selectedId);
      const pos = obj ? new THREE.Vector3() : getFallbackPosition(selectedId);
      if (obj) obj.getWorldPosition(pos);

      const offset = getCameraOffset(selectedId, selectedType);
      targetLook.current.copy(pos);
      targetPos.current.copy(pos).add(offset);
    }
  }, [selectedId, selectedType, scene]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (selectedId && selectedType !== 'all') {
      const obj = scene.getObjectByName(selectedId);
      if (obj) {
        const currentWorldPos = new THREE.Vector3();
        obj.getWorldPosition(currentWorldPos);

        const offset = getCameraOffset(selectedId, selectedType);

        if (isTransitioning.current) {
          // Dynamic tracking: update target vectors continuously while object orbits
          targetLook.current.copy(currentWorldPos);
          targetPos.current.copy(currentWorldPos).add(offset);

          const step = Math.min(delta * 4.0, 0.2);
          camera.position.lerp(targetPos.current, step);
          controlsRef.current.target.lerp(targetLook.current, step);
          controlsRef.current.update();

          if (
            camera.position.distanceTo(targetPos.current) < 0.25 &&
            controlsRef.current.target.distanceTo(targetLook.current) < 0.15
          ) {
            camera.position.copy(targetPos.current);
            controlsRef.current.target.copy(targetLook.current);
            controlsRef.current.update();
            isTransitioning.current = false;
          }
        } else {
          // Locked orbit tracking: adjust camera position & controls target by orbital translation delta
          if (lastWorldPos.current) {
            const deltaMove = currentWorldPos.clone().sub(lastWorldPos.current);
            if (deltaMove.length() < 6) {
              controlsRef.current.target.add(deltaMove);
              camera.position.add(deltaMove);
              controlsRef.current.update();
            }
          }
        }
        lastWorldPos.current = currentWorldPos;
      }
    } else {
      // Solar system overview mode
      if (isTransitioning.current) {
        const step = Math.min(delta * 3.5, 0.15);
        camera.position.lerp(targetPos.current, step);
        controlsRef.current.target.lerp(targetLook.current, step);

        if (
          camera.position.distanceTo(targetPos.current) < 0.3 &&
          controlsRef.current.target.distanceTo(targetLook.current) < 0.2
        ) {
          camera.position.copy(targetPos.current);
          controlsRef.current.target.copy(targetLook.current);
          isTransitioning.current = false;
        }
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
      minDistance={0.5}
      maxDistance={220}
      target={[25, 0, 8]}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
