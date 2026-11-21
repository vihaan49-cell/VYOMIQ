import React, { useState } from 'react';
import {
  BarChart3,
  Thermometer,
  Layers,
  Sun,
  Activity,
  Compass,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  CHASTE_TEMPERATURE_DATA,
  LUNAR_ELEMENTS_DATA,
  ADITYA_SOLAR_STORM_DATA,
  ASTROSAT_ENERGY_SPECTRUM,
  XPOSAT_POLARIZATION_DATA,
} from '../../data/scientificAnalyticsData';
import { spaceAudio } from '../../utils/audio';

export const ScientificAnalyticsView: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<
    'chaste' | 'libs' | 'aditya' | 'astrosat' | 'xposat'
  >('chaste');

  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  return (
    <div className="absolute inset-0 top-16 bottom-0 z-10 overflow-y-auto bg-space-950/95 p-4 sm:p-8 select-none">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-space-700/60 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-wider text-white">
                SCIENTIFIC DATA VISUALIZATION SUITE
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Interactive plots and quantitative analyses from verified ISRO scientific instruments.
            </p>
          </div>
        </div>

        {/* Dataset Selection Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {[
            { id: 'chaste', label: 'ChaSTE: Lunar Thermal Depth Profile', icon: Thermometer },
            { id: 'libs', label: 'LIBS / APXS: Lunar South Pole Chemistry', icon: Layers },
            { id: 'aditya', label: 'Aditya-L1: May 2024 Solar Storm', icon: Sun },
            { id: 'astrosat', label: 'AstroSat: Cygnus X-1 Energy Spectrum', icon: Activity },
            { id: 'xposat', label: 'XPoSat: Crab Pulsar Polarization', icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDataset === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  spaceAudio.playClick();
                  setActiveDataset(tab.id as typeof activeDataset);
                  setHoveredPoint(null);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-isro-cyan text-slate-950 font-bold shadow-glow-cyan'
                    : 'bg-space-900 text-slate-300 hover:text-white border border-space-700/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. CHASTE LUNAR TEMPERATURE GRADIENT */}
        {activeDataset === 'chaste' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-space-700 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-isro-amber uppercase">
                    CHANDRAYAAN-3 VIKRAM LANDER • SPL / VSSC
                  </span>
                  <h2 className="text-lg font-bold font-mono text-white mt-1">
                    Regolith Temperature vs Penetration Depth (°C vs mm)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Measured at Shiv Shakti Point (69.37° S). Demonstrates the extraordinary thermal insulation of lunar regolith: a 62°C drop across just 10 cm!
                  </p>
                </div>

                {hoveredPoint && (
                  <div className="p-2.5 rounded bg-space-900 border border-isro-cyan font-mono text-xs text-right">
                    <span className="text-slate-400 text-[10px] block">{hoveredPoint.sensorLabel}</span>
                    <span className="text-isro-cyan font-bold">{hoveredPoint.temperatureC}°C</span> at{' '}
                    <span className="text-white font-bold">{hoveredPoint.depthMm} mm</span>
                  </div>
                )}
              </div>

              {/* Interactive SVG Chart */}
              <div className="w-full h-80 bg-space-950/80 rounded-lg p-4 border border-space-800 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 240">
                  {/* Grid Lines */}
                  {[-10, 0, 10, 20, 30, 40, 50, 60].map((temp, i) => {
                    const y = 200 - ((temp + 15) / 80) * 180;
                    return (
                      <g key={i}>
                        <line x1="50" y1={y} x2="680" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                        <text x="40" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {temp}°C
                        </text>
                      </g>
                    );
                  })}

                  {/* Depth X-Axis */}
                  {CHASTE_TEMPERATURE_DATA.map((pt, i) => {
                    const x = 70 + i * 58;
                    return (
                      <g key={i}>
                        <line x1={x} y1="20" x2={x} y2="200" stroke="#1e293b" strokeDasharray="2 2" />
                        <text x={x} y="220" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {pt.depthMm}
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradient Area under Curve */}
                  <defs>
                    <linearGradient id="chasteGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Connecting Line and Dots */}
                  <path
                    d={CHASTE_TEMPERATURE_DATA.reduce((acc, pt, i) => {
                      const x = 70 + i * 58;
                      const y = 200 - ((pt.temperatureC + 15) / 80) * 180;
                      return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }, '')}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3.5"
                  />

                  {CHASTE_TEMPERATURE_DATA.map((pt, i) => {
                    const x = 70 + i * 58;
                    const y = 200 - ((pt.temperatureC + 15) / 80) * 180;
                    const isHovered = hoveredPoint?.depthMm === pt.depthMm;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={isHovered ? 7 : 4.5}
                        fill={pt.temperatureC > 0 ? '#f59e0b' : '#06b6d4'}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredPoint(pt)}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Explanatory Scientific Context */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs text-slate-300">
                <div className="p-3 rounded bg-space-900/60 border border-space-800">
                  <span className="text-[10px] text-isro-cyan block uppercase font-bold">Surface Heat</span>
                  <span>+54.0°C directly sunlit lunar top layer at Shiv Shakti Point.</span>
                </div>
                <div className="p-3 rounded bg-space-900/60 border border-space-800">
                  <span className="text-[10px] text-isro-amber block uppercase font-bold">100mm Subsurface</span>
                  <span>-8.5°C cryogenic chill just 10 centimeters below the surface!</span>
                </div>
                <div className="p-3 rounded bg-space-900/60 border border-space-800">
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">Thermal Insulation</span>
                  <span>Effective conductivity: 0.0018 W/m·K. Traps water-ice permanently.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. LIBS / APXS LUNAR SOUTH POLE ELEMENTAL ABUNDANCE */}
        {activeDataset === 'libs' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-space-700 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-isro-gold uppercase">
                    CHANDRAYAAN-3 PRAGYAN ROVER • LEOS / PRL
                  </span>
                  <h2 className="text-lg font-bold font-mono text-white mt-1">
                    Elemental Abundance at South Pole (Weight %)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Quantified in-situ by Laser-Induced Breakdown Spectroscopy (LIBS) and Alpha Particle X-ray Spectrometer (APXS).
                  </p>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="space-y-2.5">
                {LUNAR_ELEMENTS_DATA.map((el, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredPoint(el)}
                    className="p-2.5 rounded-lg bg-space-900/70 hover:bg-space-850 border border-space-800 hover:border-isro-cyan transition-all font-mono text-xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded bg-space-800 border border-space-700 flex items-center justify-center font-bold text-isro-cyan text-xs">
                          {el.symbol}
                        </span>
                        <span className="text-white font-bold">{el.element}</span>
                        <span className="text-[10px] text-slate-400">({el.detectedBy})</span>
                        {el.symbol === 'S' && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold animate-pulse">
                            HISTORIC 1st DETECTION
                          </span>
                        )}
                      </div>
                      <span className="text-isro-gold font-bold">{el.weightPercent}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-space-950 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (el.weightPercent / 45) * 100)}%`,
                          backgroundColor:
                            el.symbol === 'S' ? '#f59e0b' : el.symbol === 'O' ? '#38bdf8' : '#10b981',
                        }}
                      />
                    </div>

                    <div className="mt-1 text-[10px] text-slate-400 flex justify-between">
                      <span>Spectral Line: {el.wavelengthNm} nm</span>
                      <span className="text-slate-300 italic">{el.significance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. ADITYA-L1 MAY 2024 SOLAR SUPERSTORM */}
        {activeDataset === 'aditya' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-space-700 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-isro-amber uppercase">
                  ADITYA-L1 ASPEX & SOLEXS • SUN-EARTH L1 POINT
                </span>
                <h2 className="text-lg font-bold font-mono text-white mt-1">
                  Solar Wind Speed & Proton Flux During May 2024 G5 Superstorm
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Recorded in interplanetary space 1.5 million km from Earth as multiple Coronal Mass Ejections (CMEs) slammed into the spacecraft.
                </p>
              </div>

              {/* Data Table & Timeline */}
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-xs text-left">
                  <thead className="bg-space-900 border-b border-space-800 text-slate-400 text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">Elapsed (Hrs)</th>
                      <th className="p-2.5">Storm Phase</th>
                      <th className="p-2.5">Solar Wind Speed (km/s)</th>
                      <th className="p-2.5">Proton Density (#/cm³)</th>
                      <th className="p-2.5">X-ray Flux (W/m²)</th>
                      <th className="p-2.5">IMF Bz (nT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-space-850">
                    {ADITYA_SOLAR_STORM_DATA.map((row, i) => (
                      <tr
                        key={i}
                        className={`hover:bg-space-900/60 ${
                          row.speedKmS > 700 ? 'bg-amber-950/20 text-amber-200' : 'text-slate-300'
                        }`}
                      >
                        <td className="p-2.5 font-bold">{row.timeHours}h</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded bg-space-850 border border-space-700 text-[10px]">
                            {row.eventPhase}
                          </span>
                        </td>
                        <td className="p-2.5 font-bold text-isro-cyan">{row.speedKmS} km/s</td>
                        <td className="p-2.5">{row.densityProtonsCm3}</td>
                        <td className="p-2.5 font-mono text-isro-gold">{row.xrayFluxWm2.toExponential(2)}</td>
                        <td className="p-2.5 font-bold text-pink-400">{row.bZNanoTesla} nT</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. ASTROSAT CYGNUS X-1 ENERGY SPECTRUM */}
        {activeDataset === 'astrosat' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-space-700 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-isro-cyan uppercase">
                  ASTROSAT LAXPC • TIFR MUMBAI
                </span>
                <h2 className="text-lg font-bold font-mono text-white mt-1">
                  High-Energy X-ray Energy Spectrum of Black Hole Binary Cygnus X-1
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Photon count rate from 3 to 80 keV showing iron K-alpha emission at 6.4 keV and Comptonized power-law corona emission.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {ASTROSAT_ENERGY_SPECTRUM.map((pt, i) => (
                  <div key={i} className="p-3 rounded-lg bg-space-900/70 border border-space-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block">ENERGY: {pt.energyKeV} keV</span>
                    <span className="text-sm font-bold text-isro-gold">{pt.fluxPhotons}</span>
                    <span className="text-[9px] text-slate-500 block">Photons/cm²·s·keV</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. XPOSAT CRAB PULSAR POLARIMETRY */}
        {activeDataset === 'xposat' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-space-700 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                  XPOSAT POLIX • RAMAN RESEARCH INSTITUTE (RRI)
                </span>
                <h2 className="text-lg font-bold font-mono text-white mt-1">
                  Azimuthal Modulation Curve of Crab Pulsar (8 - 30 keV)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Thomson scattering off beryllium targets yields: Polarization Degree (PD) = 32.7% ± 2.2%, Polarization Angle (PA) = 125.5° ± 1.8°.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-lg bg-space-900/70 border border-space-800 space-y-2">
                  <span className="text-isro-cyan font-bold block text-sm">Polarization Parameters</span>
                  <div className="flex justify-between border-b border-space-800 py-1.5">
                    <span className="text-slate-400">Target Object:</span>
                    <span className="text-white font-bold">Crab Pulsar (PSR B0531+21)</span>
                  </div>
                  <div className="flex justify-between border-b border-space-800 py-1.5">
                    <span className="text-slate-400">Polarization Degree (PD):</span>
                    <span className="text-isro-amber font-bold">32.7% ± 2.2%</span>
                  </div>
                  <div className="flex justify-between border-b border-space-800 py-1.5">
                    <span className="text-slate-400">Electric Vector Angle (PA):</span>
                    <span className="text-isro-gold font-bold">125.5° ± 1.8°</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Detector Energy Band:</span>
                    <span className="text-white font-bold">8.5 to 28.0 keV</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-space-900/70 border border-space-800 space-y-2">
                  <span className="text-emerald-400 font-bold block text-sm">Astrophysical Impact</span>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">
                    Confirms that X-rays from the Crab Nebula are produced by synchrotron emission of ultra-relativistic electrons spinning in intense toroidal magnetic fields around the central pulsar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
