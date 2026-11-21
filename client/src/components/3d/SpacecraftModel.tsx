import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getSolarPanelTexture, getGoldFoilTexture } from '../../utils/textureGenerator';
import { SpacecraftSpec } from '../../types';
import { MISSIONS_DATA } from '../../data/missionsData';

interface SpacecraftModelProps {
  id: string;
  name?: string;
  specs?: SpacecraftSpec;
  color?: string;
  isSelected?: boolean;
  isHovered?: boolean;
  scale?: number;
  interactiveMode?: boolean;
  showTag?: boolean;
  onClick?: (e?: any) => void;
  onPointerOver?: (e: THREE.Event) => void;
  onPointerOut?: (e: THREE.Event) => void;
}

export const SpacecraftModel: React.FC<SpacecraftModelProps> = ({
  id,
  name,
  specs,
  color = '#06b6d4',
  isSelected = false,
  isHovered = false,
  scale = 1,
  showTag = true,
  interactiveMode = false,
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  // Clean, authentic satellite name label
  const tagLabel = useMemo(() => {
    if (name) return name;
    const mission = MISSIONS_DATA.find((m) => m.id === id);
    if (mission) {
      if (mission.id === 'mangalyaan-1') return 'Mangalyaan (MOM)';
      if (mission.id === 'chandrayaan-4') return 'Chandrayaan-4';
      if (mission.id === 'oceansat-3') return 'EOS-06 Oceansat';
      if (mission.id === 'navic-constellation') return 'NavIC IRNSS';
      if (mission.id === 'risat-2b') return 'RISAT-2B';
      return mission.name;
    }
    return id.toUpperCase();
  }, [id, name]);

  // Scaled height offset: floats consistently ~0.55 world units above satellite
  const tagY = useMemo(() => {
    const s = scale || 1;
    return 0.45 / s + 0.35;
  }, [scale]);

  const solarTexture = useMemo(() => getSolarPanelTexture(), []);
  const goldFoilTexture = useMemo(() => getGoldFoilTexture(), []);

  // 1. Authentic Embossed Gold MLI Thermal Foil Material
  const goldMliMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: goldFoilTexture,
        color: '#ffffff',
        metalness: 0.5,
        roughness: 0.3,
        emissive: '#b45309',
        emissiveIntensity: 0.18,
      }),
    [goldFoilTexture]
  );

  // 2. High-Grade Aerospace Titanium / Aluminium Alloy
  const silverMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f8fafc',
        metalness: 0.6,
        roughness: 0.25,
        emissive: '#475569',
        emissiveIntensity: 0.1,
      }),
    []
  );

  // 3. Photorealistic Silicon Photovoltaic Solar Array Material
  const solarPanelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: solarTexture,
        color: '#ffffff',
        roughness: 0.2,
        metalness: 0.5,
        emissive: '#0369a1',
        emissiveIntensity: 0.12,
      }),
    [solarTexture]
  );

  // 4. Graphite Carbon Composite (Nozzles, Baffles, Structural Trusses)
  const carbonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#334155',
        roughness: 0.6,
        metalness: 0.25,
      }),
    []
  );

  // 5. Optical Sapphire Glass & Sensor Aperture
  const opticMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        roughness: 0.05,
        metalness: 0.9,
        emissive: '#0284c7',
        emissiveIntensity: 0.45,
      }),
    []
  );

  // 6. Highly Reflective Silver Parabolic Dish Material
  const dishMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f1f5f9',
        metalness: 0.6,
        roughness: 0.22,
        emissive: '#64748b',
        emissiveIntensity: 0.1,
        side: THREE.DoubleSide,
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

  // Render authentic ISRO spacecraft geometries
  const renderCraft = () => {
    switch (id) {
      // ==========================================
      // 1. CHANDRAYAAN-3 (Vikram Lander & Pragyan Rover)
      // ==========================================
      case 'chandrayaan-3':
      case 'chandrayaan-4':
        return (
          <group>
            {/* Main Lander Body (Octagonal Box with Gold MLI) */}
            <mesh material={goldMliMaterial} position={[0, 0.42, 0]}>
              <cylinderGeometry args={[0.55, 0.65, 0.52, 8]} />
            </mesh>

            {/* Top Deck Equipment Platform */}
            <mesh material={silverMetalMaterial} position={[0, 0.70, 0]}>
              <cylinderGeometry args={[0.48, 0.52, 0.08, 8]} />
            </mesh>

            {/* Omni Communication Mast & Antennas */}
            <mesh material={silverMetalMaterial} position={[0.22, 0.88, 0.22]}>
              <cylinderGeometry args={[0.015, 0.015, 0.32, 8]} />
            </mesh>
            <mesh material={goldMliMaterial} position={[0.22, 1.05, 0.22]}>
              <sphereGeometry args={[0.045, 12, 12]} />
            </mesh>

            {/* ChaSTE Deployment Arm (Lunar Surface Thermophysical Probe) */}
            <group position={[0.52, 0.35, 0.15]}>
              <mesh material={silverMetalMaterial} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.012, 0.012, 0.35, 8]} />
              </mesh>
              <mesh material={carbonMaterial} position={[0.15, -0.15, 0]}>
                <boxGeometry args={[0.04, 0.12, 0.04]} />
              </mesh>
            </group>

            {/* ILSA (Seismic Activity Sensor Unit) */}
            <mesh material={silverMetalMaterial} position={[-0.45, 0.48, 0.2]}>
              <boxGeometry args={[0.12, 0.08, 0.12]} />
            </mesh>

            {/* Deployable Side Solar Wings (Left & Right) */}
            <mesh material={solarPanelMaterial} position={[0.62, 0.45, 0]} rotation={[0, 0, Math.PI / 4.5]}>
              <boxGeometry args={[0.02, 0.65, 0.75]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-0.62, 0.45, 0]} rotation={[0, 0, -Math.PI / 4.5]}>
              <boxGeometry args={[0.02, 0.65, 0.75]} />
            </mesh>

            {/* 4 Articulated Landing Struts with Shock Absorbers & Footpads */}
            {[
              [0.45, 0.45, 0.7],
              [-0.45, 0.45, 2.35],
              [-0.45, -0.45, 3.85],
              [0.45, -0.45, 5.45],
            ].map(([lx, lz, angle], idx) => (
              <group key={idx} position={[lx, 0.2, lz]} rotation={[0, angle, 0]}>
                {/* Main Upper Cantilever Leg */}
                <mesh material={silverMetalMaterial} position={[0.22, -0.18, 0]} rotation={[0, 0, -0.6]}>
                  <cylinderGeometry args={[0.025, 0.025, 0.55, 8]} />
                </mesh>
                {/* Cross Shock Absorber Strut */}
                <mesh material={silverMetalMaterial} position={[0.1, -0.05, 0]} rotation={[0, 0, 0.4]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
                </mesh>
                {/* Circular Gold Foil Footpad */}
                <mesh material={goldMliMaterial} position={[0.42, -0.38, 0]}>
                  <cylinderGeometry args={[0.11, 0.11, 0.03, 12]} />
                </mesh>
              </group>
            ))}

            {/* 4 Canted Throttlable 800N Liquid Thruster Nozzles at base */}
            {[
              [0.2, 0.2],
              [-0.2, 0.2],
              [-0.2, -0.2],
              [0.2, -0.2],
            ].map(([tx, tz], tidx) => (
              <mesh key={tidx} material={carbonMaterial} position={[tx, 0.12, tz]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.11, 0.18, 12]} />
              </mesh>
            ))}

            {/* Mini Pragyan Rover (6-wheel Chassis with Solar Wing) */}
            <group position={[0.95, 0.06, 0.3]}>
              {/* Rover Gold Warm-Box Body */}
              <mesh material={goldMliMaterial} position={[0, 0.08, 0]}>
                <boxGeometry args={[0.26, 0.12, 0.2]} />
              </mesh>
              {/* Tilted Rover Solar Panel */}
              <mesh material={solarPanelMaterial} position={[0, 0.18, 0]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.28, 0.015, 0.22]} />
              </mesh>
              {/* Stereo Navigation Cameras (NavCam mast) */}
              <mesh material={carbonMaterial} position={[0.1, 0.24, 0.08]}>
                <cylinderGeometry args={[0.01, 0.01, 0.1, 6]} />
              </mesh>
              <mesh material={opticMaterial} position={[0.1, 0.30, 0.08]}>
                <boxGeometry args={[0.06, 0.03, 0.03]} />
              </mesh>
              {/* 6 Wheels with Chevrons */}
              {[-0.11, 0, 0.11].map((wx, widx) => (
                <React.Fragment key={widx}>
                  <mesh material={carbonMaterial} position={[wx, 0.02, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.025, 10]} />
                  </mesh>
                  <mesh material={carbonMaterial} position={[wx, 0.02, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.025, 10]} />
                  </mesh>
                </React.Fragment>
              ))}
            </group>
          </group>
        );

      // ==========================================
      // 2. MANGALYAAN (Mars Orbiter Mission - MOM)
      // ==========================================
      case 'mangalyaan-1':
        return (
          <group>
            {/* Main Cubical Bus wrapped in Gold MLI */}
            <mesh material={goldMliMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[0.75, 0.75, 0.75]} />
            </mesh>

            {/* Top Deck Honeycomb Panel */}
            <mesh material={silverMetalMaterial} position={[0, 0.39, 0]}>
              <boxGeometry args={[0.72, 0.04, 0.72]} />
            </mesh>

            {/* Authentic 2.2-Meter High Gain Parabolic Dish Antenna */}
            <group position={[0, 0.52, 0]} rotation={[0.35, 0.2, 0]}>
              {/* Dish Reflector */}
              <mesh material={dishMaterial}>
                <sphereGeometry args={[0.62, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3]} />
              </mesh>
              {/* Sub-reflector feedhorn on tripod */}
              <mesh material={carbonMaterial} position={[0, 0.38, 0]}>
                <cylinderGeometry args={[0.025, 0.045, 0.18, 10]} />
              </mesh>
              {[-0.2, 0.2].map((fx, i) => (
                <mesh key={i} material={silverMetalMaterial} position={[fx, 0.2, 0]} rotation={[0, 0, fx * 0.8]}>
                  <cylinderGeometry args={[0.008, 0.008, 0.42, 6]} />
                </mesh>
              ))}
            </group>

            {/* 3-Panel Deployable Solar Wing (Silicon Blue Cells) */}
            <group position={[1.35, 0, 0]}>
              <mesh material={solarPanelMaterial}>
                <boxGeometry args={[1.75, 0.68, 0.025]} />
              </mesh>
              {/* Solar Array Drive Mechanism (SADM) Hinge */}
              <mesh material={silverMetalMaterial} position={[-0.92, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.035, 0.035, 0.12, 10]} />
              </mesh>
            </group>

            {/* 440N Liquid Apogee Motor (LAM) Graphite Nozzle (-Z) */}
            <mesh material={carbonMaterial} position={[0, 0, -0.48]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.22, 0.28, 16]} />
            </mesh>

            {/* Mars Colour Camera (MCC) Lens (+Z forward) */}
            <mesh material={silverMetalMaterial} position={[-0.2, -0.2, 0.40]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.08, 12]} />
            </mesh>
            <mesh material={opticMaterial} position={[-0.2, -0.2, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.055, 12]} />
            </mesh>

            {/* Thermal Infrared Imaging Spectrometer (TIS) */}
            <mesh material={carbonMaterial} position={[0.2, -0.2, 0.40]}>
              <boxGeometry args={[0.12, 0.12, 0.08]} />
            </mesh>

            {/* Reaction Control System (RCS) Thruster Blocks on Corners */}
            {[
              [0.38, 0.38, 0.38],
              [-0.38, 0.38, 0.38],
              [0.38, -0.38, 0.38],
              [-0.38, -0.38, 0.38],
            ].map(([rx, ry, rz], rIdx) => (
              <mesh key={rIdx} material={silverMetalMaterial} position={[rx, ry, rz]}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
              </mesh>
            ))}
          </group>
        );

      // ==========================================
      // 3. ADITYA-L1 (Solar Observatory)
      // ==========================================
      case 'aditya-l1':
        return (
          <group>
            {/* Main Solar Observatory Bus */}
            <mesh material={goldMliMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[0.82, 0.88, 0.82]} />
            </mesh>

            {/* VELC (Visible Emission Line Coronagraph) Primary Optical Barrel (+Z Sun-ward) */}
            <group position={[0, 0.12, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh material={carbonMaterial}>
                <cylinderGeometry args={[0.24, 0.27, 0.38, 20]} />
              </mesh>
              <mesh material={opticMaterial} position={[0, 0.20, 0]}>
                <circleGeometry args={[0.21, 20]} />
              </mesh>
            </group>

            {/* SUIT (Solar Ultraviolet Imaging Telescope) Module */}
            <mesh material={silverMetalMaterial} position={[0.26, 0.28, 0.48]}>
              <boxGeometry args={[0.24, 0.24, 0.26]} />
            </mesh>
            <mesh material={opticMaterial} position={[0.26, 0.28, 0.62]}>
              <circleGeometry args={[0.08, 12]} />
            </mesh>

            {/* ASPEX & PAPA Solar Wind Particle Detectors */}
            <mesh material={carbonMaterial} position={[-0.26, 0.28, 0.46]}>
              <boxGeometry args={[0.18, 0.18, 0.18]} />
            </mesh>

            {/* Dual Deployable Solar Wings (Wingspan 5.4m equivalent) */}
            <group position={[1.5, 0, 0]}>
              <mesh material={solarPanelMaterial}>
                <boxGeometry args={[1.9, 0.72, 0.025]} />
              </mesh>
            </group>
            <group position={[-1.5, 0, 0]}>
              <mesh material={solarPanelMaterial}>
                <boxGeometry args={[1.9, 0.72, 0.025]} />
              </mesh>
            </group>

            {/* 6-Meter Deployed Magnetometer Boom with Dual Sensor Pods */}
            <group position={[0, -0.85, -0.25]}>
              <mesh material={silverMetalMaterial}>
                <cylinderGeometry args={[0.015, 0.015, 1.3, 8]} />
              </mesh>
              {/* Middle Fluxgate Sensor Pod */}
              <mesh material={goldMliMaterial} position={[0, 0.1, 0]}>
                <sphereGeometry args={[0.055, 10, 10]} />
              </mesh>
              {/* Tip Fluxgate Sensor Pod */}
              <mesh material={goldMliMaterial} position={[0, -0.65, 0]}>
                <sphereGeometry args={[0.065, 10, 10]} />
              </mesh>
            </group>
          </group>
        );

      // ==========================================
      // 4. ASTROSAT & XPOSAT (Space Astronomy Telescopes)
      // ==========================================
      case 'astrosat':
      case 'xposat':
        return (
          <group>
            {/* Hexagonal Space Observatory Bus with Gold MLI */}
            <mesh material={goldMliMaterial} position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.62, 6]} />
            </mesh>

            {id === 'astrosat' ? (
              // AstroSat: Twin UVIT Telescope Optical Barrels + LAXPC
              <group position={[0, 0.35, 0]}>
                {/* Twin UVIT Telescope Barrels */}
                <mesh material={silverMetalMaterial} position={[0.16, 0, 0]}>
                  <cylinderGeometry args={[0.15, 0.15, 0.75, 18]} />
                </mesh>
                <mesh material={silverMetalMaterial} position={[-0.16, 0, 0]}>
                  <cylinderGeometry args={[0.15, 0.15, 0.75, 18]} />
                </mesh>
                <mesh material={opticMaterial} position={[0.16, 0.38, 0]}>
                  <circleGeometry args={[0.13, 18]} />
                </mesh>
                <mesh material={opticMaterial} position={[-0.16, 0.38, 0]}>
                  <circleGeometry args={[0.13, 18]} />
                </mesh>
                {/* LAXPC X-ray Counters Deck */}
                <mesh material={carbonMaterial} position={[0, -0.15, 0.35]}>
                  <boxGeometry args={[0.42, 0.18, 0.16]} />
                </mesh>
              </group>
            ) : (
              // XPoSat: POLIX X-ray Polarimeter Collimator Barrel
              <group position={[0, 0.32, 0]}>
                <mesh material={carbonMaterial}>
                  <cylinderGeometry args={[0.26, 0.28, 0.65, 18]} />
                </mesh>
                {/* Beryllium Scatterer Detector Core */}
                <mesh material={opticMaterial} position={[0, 0.33, 0]}>
                  <circleGeometry args={[0.23, 18]} />
                </mesh>
                {/* XSPECT Spectrometer Module */}
                <mesh material={silverMetalMaterial} position={[0.32, -0.1, 0]}>
                  <boxGeometry args={[0.16, 0.24, 0.16]} />
                </mesh>
              </group>
            )}

            {/* Deployable Dual Solar Array Wings */}
            <mesh material={solarPanelMaterial} position={[1.3, -0.22, 0]}>
              <boxGeometry args={[1.4, 0.58, 0.025]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-1.3, -0.22, 0]}>
              <boxGeometry args={[1.4, 0.58, 0.025]} />
            </mesh>
          </group>
        );

      // ==========================================
      // 5. EARTH OBSERVATION & LUNAR ORBITERS (Cartosat, Oceansat, RISAT, NavIC, CH-1/2)
      // ==========================================
      default:
        return (
          <group>
            {/* Main Satellite Bus Body with Gold MLI */}
            <mesh material={goldMliMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[0.7, 0.8, 0.7]} />
            </mesh>

            {id.includes('risat') ? (
              // RISAT: Deployable Parabolic Mesh Radar Antenna (C-Band SAR)
              <group position={[0, 0.55, 0]} rotation={[0.4, 0, 0]}>
                <mesh material={goldMliMaterial}>
                  <sphereGeometry args={[0.75, 24, 12, 0, Math.PI * 2, 0, Math.PI / 4]} />
                </mesh>
              </group>
            ) : (
              // High-Resolution Optical Earth Observation Camera Telescope (Cartosat / Oceansat)
              <group position={[0, 0, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh material={carbonMaterial}>
                  <cylinderGeometry args={[0.19, 0.22, 0.38, 16]} />
                </mesh>
                <mesh material={opticMaterial} position={[0, 0.20, 0]}>
                  <circleGeometry args={[0.16, 16]} />
                </mesh>
              </group>
            )}

            {/* Dual Deployable Solar Array Wings */}
            <mesh material={solarPanelMaterial} position={[1.35, 0, 0]}>
              <boxGeometry args={[1.6, 0.65, 0.025]} />
            </mesh>
            <mesh material={solarPanelMaterial} position={[-1.35, 0, 0]}>
              <boxGeometry args={[1.6, 0.65, 0.025]} />
            </mesh>

            {/* TTC Omni Antennas */}
            <mesh material={silverMetalMaterial} position={[0.25, 0.48, 0.25]}>
              <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
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
      {/* Spacecraft Assembly */}
      {renderCraft()}

      {/* Flashing Telemetry Beacon Light (hidden in interactive modal preview) */}
      {!interactiveMode && (
        <mesh ref={beaconRef} position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={1} />
        </mesh>
      )}

      {/* Floating 3D Satellite Name Tag */}
      {showTag && !interactiveMode && (
        <Html
          position={[0, tagY, 0]}
          center
          zIndexRange={[100, 0]}
          className="pointer-events-auto select-none"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick(e);
            }}
            className="flex flex-col items-center group cursor-pointer"
            title={`Click to focus on ${tagLabel}`}
          >
            {/* ISRO Telemetry Glassmorphic Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border backdrop-blur-md transition-all duration-200 shadow-lg ${
                isSelected
                  ? 'bg-slate-900/95 border-amber-400 text-amber-200 shadow-amber-500/30 ring-2 ring-amber-400/50 scale-110 font-bold z-50'
                  : 'bg-slate-950/80 border-slate-700/80 text-white hover:border-cyan-400 hover:text-cyan-200 hover:bg-slate-900/95 hover:scale-105'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{
                  backgroundColor: isSelected ? '#fbbf24' : color,
                  boxShadow: `0 0 6px ${isSelected ? '#fbbf24' : color}`,
                }}
              />
              <span className="text-[11px] font-sans font-bold tracking-tight text-white whitespace-nowrap drop-shadow">
                {tagLabel}
              </span>
            </div>

            {/* Connecting stem line pointing down to craft */}
            <div
              className={`w-[1px] h-2.5 transition-colors duration-200 ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-400/90 to-transparent'
                  : 'bg-gradient-to-b from-slate-400/60 to-transparent group-hover:from-cyan-400/80'
              }`}
            />
          </div>
        </Html>
      )}

      {/* Hover / Selected Glowing Target Reticle (only in universe mode) */}
      {!interactiveMode && (isSelected || isHovered) && (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.8, 1.88, 32]} />
            <meshBasicMaterial
              color={isSelected ? '#f97316' : '#06b6d4'}
              side={THREE.DoubleSide}
              transparent
              opacity={isSelected ? 0.9 : 0.6}
            />
          </mesh>
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
