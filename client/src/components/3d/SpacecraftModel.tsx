import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
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

  // Render specific geometries based on spacecraft type
  const renderCraftGeometry = () => {
    switch (id) {
      // 1. CHANDRAYAAN-3 (Vikram Lander + Pragyan Rover)
      case 'chandrayaan-3':
        return (
          <group>
            {/* Main Lander Body (Octagonal / Box with Gold MLI) */}
            <mesh material={goldMliMaterial} position={[0, 0.4, 0]}>
              <boxGeometry args={[0.9, 0.6, 0.9]} />
            </mesh>

            {/* Top Deck Equipment */}
            <mesh material={silverMetalMaterial} position={[0, 0.75, 0]}>
              <boxGeometry args={[0.7, 0.1, 0.7]} />
            </mesh>

            {/* Deployable Side Solar Panels */}
            <mesh material={solarPanelMaterial} position={[0.55, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.02, 0.7, 0.8]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-0.55, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.02, 0.7, 0.8]} />
            </mesh>

            {/* 4 Lander Shock-Absorbing Legs */}
            {[-0.5, 0.5].map((x) =>
              [-0.5, 0.5].map((z) => (
                <group key={`${x}-${z}`} position={[x, 0.1, z]}>
                  {/* Leg Strut */}
                  <mesh
                    material={silverMetalMaterial}
                    rotation={[z * 0.5, 0, -x * 0.5]}
                    position={[x * 0.3, -0.2, z * 0.3]}
                  >
                    <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
                  </mesh>
                  {/* Footpad */}
                  <mesh material={goldMliMaterial} position={[x * 0.45, -0.45, z * 0.45]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.03, 12]} />
                  </mesh>
                </group>
              ))
            )}

            {/* 4 Throttlable 800N Thruster Nozzles at base */}
            <mesh material={carbonMaterial} position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.12, 0.22, 0.2, 12]} />
            </mesh>

            {/* ChaSTE Probe deployment arm */}
            <mesh material={silverMetalMaterial} position={[0.48, 0.25, 0.3]}>
              <boxGeometry args={[0.1, 0.05, 0.05]} />
            </mesh>

            {/* Mini Pragyan Rover next to lander */}
            <group position={[1.2, -0.3, 0.4]}>
              {/* Rover body */}
              <mesh material={goldMliMaterial}>
                <boxGeometry args={[0.3, 0.15, 0.25]} />
              </mesh>
              {/* Rover solar panel tilted */}
              <mesh
                material={solarPanelMaterial}
                position={[0, 0.12, 0]}
                rotation={[0.3, 0, 0]}
              >
                <boxGeometry args={[0.35, 0.01, 0.28]} />
              </mesh>
              {/* 6 Wheels */}
              {[-0.15, 0, 0.15].map((rx, idx) => (
                <React.Fragment key={idx}>
                  <mesh
                    material={carbonMaterial}
                    position={[rx, -0.1, 0.15]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
                  </mesh>
                  <mesh
                    material={carbonMaterial}
                    position={[rx, -0.1, -0.15]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
                  </mesh>
                </React.Fragment>
              ))}
            </group>
          </group>
        );

      // 2. ADITYA-L1 (Solar Observatory)
      case 'aditya-l1':
        return (
          <group>
            {/* Main Cubical Bus */}
            <mesh material={goldMliMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.9, 0.8]} />
            </mesh>

            {/* VELC Solar Coronagraph Telescope Aperture pointing Sun-ward (+Z) */}
            <mesh material={silverMetalMaterial} position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.26, 0.4, 16]} />
            </mesh>
            <mesh material={opticMaterial} position={[0, 0, 0.76]}>
              <circleGeometry args={[0.18, 16]} />
            </mesh>

            {/* SUIT UV Telescope Baffle */}
            <mesh material={carbonMaterial} position={[0.25, 0.25, 0.5]}>
              <boxGeometry args={[0.2, 0.2, 0.3]} />
            </mesh>

            {/* Dual Deployable Solar Wings */}
            <mesh material={solarPanelMaterial} position={[1.4, 0, 0]}>
              <boxGeometry args={[1.8, 0.7, 0.02]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-1.4, 0, 0]}>
              <boxGeometry args={[1.8, 0.7, 0.02]} />
            </mesh>

            {/* 6-Meter Magnetometer Boom */}
            <mesh material={silverMetalMaterial} position={[0, -0.9, -0.2]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 1.4, 8]} />
            </mesh>
            {/* Fluxgate sensor pods */}
            <mesh material={goldMliMaterial} position={[0, -1.6, -0.2]}>
              <sphereGeometry args={[0.06, 12, 12]} />
            </mesh>
          </group>
        );

      // 3. MANGALYAAN (Mars Orbiter Mission)
      case 'mangalyaan-1':
        return (
          <group>
            {/* Main Cube Body with Gold MLI */}
            <mesh material={goldMliMaterial}>
              <boxGeometry args={[0.7, 0.7, 0.7]} />
            </mesh>

            {/* 2.2-Meter High Gain Parabolic Dish Antenna */}
            <group position={[0, 0.45, 0]} rotation={[0.4, 0.2, 0]}>
              {/* Parabolic dish */}
              <mesh material={silverMetalMaterial}>
                <sphereGeometry args={[0.55, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3]} />
              </mesh>
              {/* Feed horn */}
              <mesh material={carbonMaterial} position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.02, 0.04, 0.2, 8]} />
              </mesh>
            </group>

            {/* 3-Panel Solar Array Wing */}
            <mesh material={solarPanelMaterial} position={[1.3, 0, 0]}>
              <boxGeometry args={[1.7, 0.65, 0.02]} />
            </mesh>

            {/* 440N LAM Engine Nozzle (-Z) */}
            <mesh material={carbonMaterial} position={[0, 0, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.18, 0.25, 16]} />
            </mesh>

            {/* Mars Colour Camera (MCC) Lens */}
            <mesh material={opticMaterial} position={[-0.2, -0.2, 0.38]}>
              <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
            </mesh>
          </group>
        );

      // 4. ASTROSAT / XPOSAT (Space Astronomy Telescopes)
      case 'astrosat':
      case 'xposat':
        return (
          <group>
            {/* Hexagonal Bus */}
            <mesh material={goldMliMaterial} position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.45, 0.45, 0.6, 6]} />
            </mesh>

            {/* UVIT Twin Telescope Cylinders (AstroSat) or POLIX Cylinder (XPoSat) */}
            {id === 'astrosat' ? (
              <group position={[0, 0.35, 0]}>
                <mesh material={silverMetalMaterial} position={[0.15, 0, 0]}>
                  <cylinderGeometry args={[0.14, 0.14, 0.7, 16]} />
                </mesh>
                <mesh material={silverMetalMaterial} position={[-0.15, 0, 0]}>
                  <cylinderGeometry args={[0.14, 0.14, 0.7, 16]} />
                </mesh>
                <mesh material={opticMaterial} position={[0.15, 0.36, 0]}>
                  <circleGeometry args={[0.12, 16]} />
                </mesh>
                <mesh material={opticMaterial} position={[-0.15, 0.36, 0]}>
                  <circleGeometry args={[0.12, 16]} />
                </mesh>
              </group>
            ) : (
              <group position={[0, 0.3, 0]}>
                {/* POLIX Collimator Barrel */}
                <mesh material={carbonMaterial}>
                  <cylinderGeometry args={[0.25, 0.28, 0.6, 16]} />
                </mesh>
                {/* Beryllium scatterer / detector ring */}
                <mesh material={opticMaterial} position={[0, 0.31, 0]}>
                  <circleGeometry args={[0.22, 16]} />
                </mesh>
              </group>
            )}

            {/* Solar Arrays */}
            <mesh material={solarPanelMaterial} position={[1.1, -0.2, 0]}>
              <boxGeometry args={[1.2, 0.5, 0.02]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-1.1, -0.2, 0]}>
              <boxGeometry args={[1.2, 0.5, 0.02]} />
            </mesh>
          </group>
        );

      // 5. GAGANYAAN (Crew & Service Module)
      case 'gaganyaan':
      case 'vyommitra':
        return (
          <group>
            {/* Conical Crew Module (Capsule) */}
            <mesh material={silverMetalMaterial} position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.18, 0.55, 0.65, 24]} />
            </mesh>
            {/* Heat Shield base */}
            <mesh material={carbonMaterial} position={[0, 0.11, 0]}>
              <cylinderGeometry args={[0.56, 0.56, 0.06, 24]} />
            </mesh>
            {/* Windows / Hatches */}
            <mesh material={opticMaterial} position={[0, 0.48, 0.35]} rotation={[0.4, 0, 0]}>
              <circleGeometry args={[0.07, 12]} />
            </mesh>

            {/* Cylindrical Service Module */}
            <mesh material={goldMliMaterial} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.54, 0.54, 0.7, 24]} />
            </mesh>

            {/* Solar Wings */}
            <mesh material={solarPanelMaterial} position={[1.3, -0.3, 0]}>
              <boxGeometry args={[1.4, 0.6, 0.02]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-1.3, -0.3, 0]}>
              <boxGeometry args={[1.4, 0.6, 0.02]} />
            </mesh>
          </group>
        );

      // 6. DEFAULT / EARTH OBSERVATION SATELLITE (Cartosat, Oceansat, RISAT, INSAT)
      default:
        return (
          <group>
            {/* Satellite Body */}
            <mesh material={goldMliMaterial}>
              <boxGeometry args={[0.65, 0.75, 0.65]} />
            </mesh>

            {/* Optical Camera Cylinder / SAR Reflector */}
            {id.includes('risat') ? (
              // Radial Rib Parabolic Mesh Antenna for Radar
              <group position={[0, 0.5, 0]} rotation={[0.5, 0, 0]}>
                <mesh material={goldMliMaterial}>
                  <sphereGeometry args={[0.7, 16, 8, 0, Math.PI * 2, 0, Math.PI / 4]} />
                </mesh>
              </group>
            ) : (
              // Optical Telescope Barrel
              <mesh material={carbonMaterial} position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.18, 0.2, 0.35, 16]} />
              </mesh>
            )}

            {/* Solar Arrays */}
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

  return (
    <group
      ref={groupRef}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Spacecraft Geometry */}
      {renderCraftGeometry()}

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
