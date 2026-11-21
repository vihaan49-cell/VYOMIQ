export interface DepthTemperaturePoint {
  depthMm: number;
  temperatureC: number;
  sensorLabel: string;
}

export interface ElementalAbundancePoint {
  element: string;
  symbol: string;
  atomicNumber: number;
  weightPercent: number;
  wavelengthNm: number;
  detectedBy: 'LIBS' | 'APXS' | 'Both';
  significance: string;
}

export interface SolarWindTimePoint {
  timeHours: number;
  speedKmS: number;
  densityProtonsCm3: number;
  xrayFluxWm2: number;
  bZNanoTesla: number;
  eventPhase: string;
}

export interface EnergySpectrumPoint {
  energyKeV: number;
  fluxPhotons: number;
  modelFit: number;
  error: number;
}

export interface PolarimetryModulationPoint {
  azimuthDeg: number;
  normalizedCounts: number;
  theoreticalFit: number;
}

// 1. ChaSTE Lunar Regolith Temperature vs Depth
export const CHASTE_TEMPERATURE_DATA: DepthTemperaturePoint[] = [
  { depthMm: 0, temperatureC: 54.0, sensorLabel: 'Surface RTD-1' },
  { depthMm: -10, temperatureC: 46.2, sensorLabel: 'RTD-2 (-10mm)' },
  { depthMm: -20, temperatureC: 38.5, sensorLabel: 'RTD-3 (-20mm)' },
  { depthMm: -30, temperatureC: 29.8, sensorLabel: 'RTD-4 (-30mm)' },
  { depthMm: -40, temperatureC: 22.1, sensorLabel: 'RTD-5 (-40mm)' },
  { depthMm: -50, temperatureC: 14.6, sensorLabel: 'RTD-6 (-50mm)' },
  { depthMm: -60, temperatureC: 7.4, sensorLabel: 'RTD-7 (-60mm)' },
  { depthMm: -70, temperatureC: 1.2, sensorLabel: 'RTD-8 (-70mm)' },
  { depthMm: -80, temperatureC: -2.8, sensorLabel: 'RTD-9 (-80mm)' },
  { depthMm: -90, temperatureC: -5.9, sensorLabel: 'RTD-10 (-90mm)' },
  { depthMm: -100, temperatureC: -8.5, sensorLabel: 'Probe Tip (-100mm)' },
];

// 2. LIBS / APXS Elemental Abundance at Shiv Shakti Point
export const LUNAR_ELEMENTS_DATA: ElementalAbundancePoint[] = [
  { element: 'Oxygen', symbol: 'O', atomicNumber: 8, weightPercent: 44.5, wavelengthNm: 777.4, detectedBy: 'APXS', significance: 'Bound in silicates and metallic oxides' },
  { element: 'Silicon', symbol: 'Si', atomicNumber: 14, weightPercent: 21.2, wavelengthNm: 288.1, detectedBy: 'Both', significance: 'Primary silicate backbone' },
  { element: 'Aluminium', symbol: 'Al', atomicNumber: 13, weightPercent: 13.8, wavelengthNm: 396.1, detectedBy: 'Both', significance: 'Anorthositic plagioclase feldspar' },
  { element: 'Calcium', symbol: 'Ca', atomicNumber: 20, weightPercent: 8.9, wavelengthNm: 393.3, detectedBy: 'Both', significance: 'Highlands crust mineral indicator' },
  { element: 'Iron', symbol: 'Fe', atomicNumber: 26, weightPercent: 6.8, wavelengthNm: 404.5, detectedBy: 'Both', significance: 'Pyroxene and olivine minerals' },
  { element: 'Magnesium', symbol: 'Mg', atomicNumber: 12, weightPercent: 4.2, wavelengthNm: 285.2, detectedBy: 'Both', significance: 'Mantle-derived volcanic components' },
  { element: 'Titanium', symbol: 'Ti', atomicNumber: 22, weightPercent: 0.58, wavelengthNm: 334.9, detectedBy: 'Both', significance: 'Ilmenite mineral presence' },
  { element: 'Sulfur', symbol: 'S', atomicNumber: 16, weightPercent: 0.22, wavelengthNm: 250.6, detectedBy: 'Both', significance: 'HISTORIC FIRST: Confirms volatile cold traps' },
  { element: 'Chromium', symbol: 'Cr', atomicNumber: 24, weightPercent: 0.14, wavelengthNm: 425.4, detectedBy: 'LIBS', significance: 'Spinel phase indicator' },
  { element: 'Manganese', symbol: 'Mn', atomicNumber: 25, weightPercent: 0.09, wavelengthNm: 403.0, detectedBy: 'LIBS', significance: 'Fe/Mn ratio verifies lunar origin' },
];

// 3. Aditya-L1 Solar Storm Propagation Data (May 2024 Storm)
export const ADITYA_SOLAR_STORM_DATA: SolarWindTimePoint[] = [
  { timeHours: 0, speedKmS: 380, densityProtonsCm3: 4.5, xrayFluxWm2: 1.2e-6, bZNanoTesla: 2.1, eventPhase: 'Quiet Ambient' },
  { timeHours: 6, speedKmS: 395, densityProtonsCm3: 5.1, xrayFluxWm2: 3.5e-6, bZNanoTesla: 1.5, eventPhase: 'Pre-event' },
  { timeHours: 12, speedKmS: 410, densityProtonsCm3: 8.2, xrayFluxWm2: 8.8e-5, bZNanoTesla: -3.2, eventPhase: 'X-Flare Onset' },
  { timeHours: 18, speedKmS: 540, densityProtonsCm3: 22.0, xrayFluxWm2: 6.3e-4, bZNanoTesla: -12.4, eventPhase: 'CME Shock Arrival' },
  { timeHours: 24, speedKmS: 765, densityProtonsCm3: 49.5, xrayFluxWm2: 2.8e-4, bZNanoTesla: -24.8, eventPhase: 'Storm Peak (G5 Superstorm)' },
  { timeHours: 30, speedKmS: 720, densityProtonsCm3: 38.0, xrayFluxWm2: 9.4e-5, bZNanoTesla: -18.2, eventPhase: 'Main Phase' },
  { timeHours: 36, speedKmS: 640, densityProtonsCm3: 24.2, xrayFluxWm2: 4.1e-5, bZNanoTesla: -9.5, eventPhase: 'Recovery Phase 1' },
  { timeHours: 42, speedKmS: 530, densityProtonsCm3: 14.8, xrayFluxWm2: 1.8e-5, bZNanoTesla: -4.1, eventPhase: 'Recovery Phase 2' },
  { timeHours: 48, speedKmS: 450, densityProtonsCm3: 7.9, xrayFluxWm2: 5.2e-6, bZNanoTesla: 0.8, eventPhase: 'Post-Storm Baseline' },
];

// 4. AstroSat LAXPC Cygnus X-1 Energy Spectrum (3 - 80 keV)
export const ASTROSAT_ENERGY_SPECTRUM: EnergySpectrumPoint[] = [
  { energyKeV: 3.5, fluxPhotons: 1420, modelFit: 1410, error: 32 },
  { energyKeV: 4.8, fluxPhotons: 980, modelFit: 995, error: 25 },
  { energyKeV: 6.4, fluxPhotons: 1120, modelFit: 1115, error: 28 }, // Iron K-alpha emission line!
  { energyKeV: 8.5, fluxPhotons: 540, modelFit: 535, error: 18 },
  { energyKeV: 12.0, fluxPhotons: 280, modelFit: 275, error: 12 },
  { energyKeV: 18.0, fluxPhotons: 125, modelFit: 130, error: 8 },
  { energyKeV: 25.0, fluxPhotons: 58, modelFit: 56, error: 5 },
  { energyKeV: 35.0, fluxPhotons: 26, modelFit: 25, error: 3 },
  { energyKeV: 50.0, fluxPhotons: 11.2, modelFit: 11.0, error: 1.8 },
  { energyKeV: 65.0, fluxPhotons: 4.8, modelFit: 4.6, error: 0.9 },
  { energyKeV: 80.0, fluxPhotons: 2.1, modelFit: 2.0, error: 0.5 },
];

// 5. XPoSat POLIX Polarimetric Azimuth Modulation (Crab Pulsar)
export const XPOSAT_POLARIZATION_DATA: PolarimetryModulationPoint[] = Array.from({ length: 37 }, (_, i) => {
  const deg = i * 10;
  const rad = (deg * Math.PI) / 180;
  const paRad = (125.5 * Math.PI) / 180;
  // Modulation curve: N(phi) = A * (1 + mu * PD * cos(2 * (phi - PA)))
  const modulation = 1 + 0.38 * 0.327 * Math.cos(2 * (rad - paRad));
  const noise = (Math.sin(deg * 3) * 0.012);
  return {
    azimuthDeg: deg,
    normalizedCounts: +(modulation + noise).toFixed(4),
    theoreticalFit: +modulation.toFixed(4)
  };
});
