import React, { useMemo, useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { getSolarPanelTexture } from '../../utils/textureGenerator';
import { SpacecraftSpec } from '../../types';

interface SpacecraftModelProps {
  id: string;
  specs: SpacecraftSpec;
  color?: string;
  isSelected?: boolean;
  isHovered?: boolean;
  scale?: number;
  onClick?: (e: THREE.Event) => void;
  onPointerOver?: (e: THREE.Event) => void;
  onPointerOut?: (e: THREE.Event) => void;
}

// Model registry for authentic 3D GLB assets
const MODEL_MAPPING: Record<string, { path: string; targetSize: number }> = {
  'chandrayaan-3': { path: '/models/lander.glb', targetSize: 1.4 },
  'aditya-l1': { path: '/models/deepspace_probe.glb', targetSize: 1.5 },
  'mangalyaan-1': { path: '/models/deepspace_probe.glb', targetSize: 1.5 },
  'astrosat': { path: '/models/satellite.glb', targetSize: 1.3 },
  'xposat': { path: '/models/satellite.glb', targetSize: 1.3 },
  'cartosat-3': { path: '/models/earth_satellite.glb', targetSize: 1.3 },
  'oceansat-3': { path: '/models/earth_satellite.glb', targetSize: 1.3 },
  'risat-2b': { path: '/models/earth_satellite.glb', targetSize: 1.3 },
  'insat-3dr': { path: '/models/earth_satellite.glb', targetSize: 1.3 },
  'navic-constellation': { path: '/models/earth_satellite.glb', targetSize: 1.3 },
  'chandrayaan-1': { path: '/models/earth_satellite.glb', targetSize: 1.2 },
  'chandrayaan-2': { path: '/models/earth_satellite.glb', targetSize: 1.2 },
  'chandrayaan-4': { path: '/models/lander.glb', targetSize: 1.3 },
  'gaganyaan': { path: '/models/cubesat.glb', targetSize: 1.2 },
  'vyommitra': { path: '/models/cubesat.glb', targetSize: 1.2 },
};

// Pre-cache all models
try {
  useGLTF.preload('/models/lander.glb');
  useGLTF.preload('/models/deepspace_probe.glb');
  useGLTF.preload('/models/satellite.glb');
  useGLTF.preload('/models/earth_satellite.glb');
  useGLTF.preload('/models/cubesat.glb');
} catch {
  // Preload is non-blocking
}

// GLTF Loader Component with auto-centering and scale normalization
const RealisticGLTFModel: React.FC<{ path: string; targetSize: number }> = ({ path, targetSize }) => {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    // Compute exact bounding box and center pivot
    const box = new THREE.Box3().setFromObject(c);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    c.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      c.scale.setScalar(targetSize / maxDim);
    }
    return c;
  }, [scene, targetSize]);

  return <primitive object={cloned} />;
};

export const SpacecraftModel: React.FC<SpacecraftModelProps> = ({
  id,
  specs,
  color = '#06b6d4',
  isSelected = false,
  isHovered = false,
  scale = 1,
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  const solarTexture = useMemo(() => getSolarPanelTexture(), []);

  // Gold foil thermal insulation material
  const goldMliMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f59e0b',
        metalness: 0.85,
        roughness: 0.25,
      }),
    []
  );

  // Silver titanium structural material
  const silverMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e2e8f0',
        metalness: 0.9,
        roughness: 0.2,
      }),
    []
  );

  // Solar array material
  const solarPanelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: solarTexture,
        roughness: 0.2,
        metalness: 0.5,
      }),
    [solarTexture]
  );

  // Dark carbon composite material
  const carbonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1e293b',
        roughness: 0.7,
        metalness: 0.3,
      }),
    []
  );

  // Optical glass / sensor material
  const opticMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0284c7',
        roughness: 0.1,
        metalness: 0.95,
      }),
    []
  );

  // Flashing telemetry beacon animation
  useFrame(({ clock }) => {
    if (beaconRef.current) {
      const t = clock.getElapsedTime();
      const intensity = Math.sin(t * 5) > 0.5 ? 1 : 0.2;
      (beaconRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }
  });

  // Fallback procedural geometry
  const renderFallbackGeometry = () => {
    switch (id) {
      case 'chandrayaan-3':
        return (
          <group>
            <mesh material={goldMliMaterial} position={[0, 0.4, 0]}>
              <boxGeometry args={[0.9, 0.6, 0.9]} />
            </mesh>
            <mesh material={silverMetalMaterial} position={[0, 0.75, 0]}>
              <boxGeometry args={[0.7, 0.1, 0.7]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[0.55, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.02, 0.7, 0.8]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-0.55, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.02, 0.7, 0.8]} />
            </mesh>
          </group>
        );

      case 'aditya-l1':
        return (
          <group>
            <mesh material={goldMliMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.9, 0.8]} />
            </mesh>
            <mesh material={silverMetalMaterial} position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.26, 0.4, 16]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[1.4, 0, 0]}>
              <boxGeometry args={[1.8, 0.7, 0.02]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-1.4, 0, 0]}>
              <boxGeometry args={[1.8, 0.7, 0.02]} />
            </mesh>
          </group>
        );

      case 'mangalyaan-1':
        return (
          <group>
            <mesh material={goldMliMaterial}>
              <boxGeometry args={[0.7, 0.7, 0.7]} />
            </mesh>
            <group position={[0, 0.45, 0]} rotation={[0.4, 0.2, 0]}>
              <mesh material={silverMetalMaterial}>
                <sphereGeometry args={[0.55, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3]} />
              </mesh>
            </group>
            <mesh material={solarPanelMaterial} position={[1.3, 0, 0]}>
              <boxGeometry args={[1.7, 0.65, 0.02]} />
            </mesh>
          </group>
        );

      default:
        return (
          <group>
            <mesh material={goldMliMaterial}>
              <boxGeometry args={[0.65, 0.75, 0.65]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[1.2, 0, 0]}>
              <boxGeometry args={[1.5, 0.6, 0.02]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-1.2, 0, 0]}>
              <boxGeometry args={[1.5, 0.6, 0.02]} />
            </mesh>
          </group>
        );
    }
  };

  const modelInfo = MODEL_MAPPING[id] || { path: '/models/earth_satellite.glb', targetSize: 1.2 };

  return (
    <group
      ref={groupRef}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Authentic Realistic 3D Model with Graceful Fallback */}
      <Suspense fallback={renderFallbackGeometry()}>
        <RealisticGLTFModel path={modelInfo.path} targetSize={modelInfo.targetSize} />
      </Suspense>

      {/* Flashing Telemetry Beacon Light */}
      <mesh ref={beaconRef} position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={1} />
      </mesh>

      {/* Hover / Selected Glowing Target Reticle */}
      {(isSelected || isHovered) && (
        <group>
          {/* Target ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.8, 1.88, 32]} />
            <meshBasicMaterial
              color={isSelected ? '#f97316' : '#06b6d4'}
              side={THREE.DoubleSide}
              transparent
              opacity={isSelected ? 0.9 : 0.6}
            />
          </mesh>

          {/* Crosshairs */}
          {[-1.9, 1.9].map((offset, i) => (
            <React.Fragment key={i}>
              <mesh position={[offset, 0, 0]}>
                <boxGeometry args={[0.2, 0.02, 0.02]} />
                <meshBasicMaterial color={isSelected ? '#f97316' : '#06b6d4'} />
              </mesh>
              <mesh position={[0, 0, offset]}>
                <boxGeometry args={[0.02, 0.02, 0.2]} />
                <meshBasicMaterial color={isSelected ? '#f97316' : '#06b6d4'} />
              </mesh>
            </React.Fragment>
          ))}
        </group>
      )}
    </group>
  );
};
