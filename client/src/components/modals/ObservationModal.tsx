import React, { useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  Layers,
  Calendar,
  Compass,
  FileCheck2,
  Info,
  Sparkles,
} from 'lucide-react';
import { ScientificObservation } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface ObservationModalProps {
  observation: ScientificObservation | null;
  onClose: () => void;
}

export const ObservationModal: React.FC<ObservationModalProps> = ({
  observation,
  onClose,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  if (!observation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel border border-isro-cyan/40 rounded-xl flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-space-700/70 bg-space-900/90 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-isro-amber px-2 py-0.5 rounded bg-isro-amber/15 border border-isro-amber/30">
                {observation.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {observation.missionName} • {observation.instrumentName}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold font-sans text-white mt-1">
              {observation.title}
            </h2>
          </div>

          <button
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-space-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Real Space Imagery / Raw vs Processed Comparison Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-isro-cyan" />
                <span>
                  {observation.hasComparison
                    ? 'Interactive Comparison: Raw Sensor Feed vs Contrast-Enhanced / Calibrated Map'
                    : 'Authentic Scientific Observation Image'}
                </span>
              </span>
              {observation.hasComparison && (
                <span className="text-[11px] text-isro-gold">
                  Drag slider to compare: {sliderPos}%
                </span>
              )}
            </div>

            <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-space-700/80 bg-black">
              {/* Base/Processed Image */}
              <img
                src={observation.processedImageUrl || observation.originalImageUrl}
                alt={observation.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Clipped Original/Raw Image */}
              {observation.hasComparison && (
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={observation.originalImageUrl}
                    alt="Raw Data"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', minWidth: '100%' }}
                  />
                  {/* Left Label */}
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold bg-black/70 px-2 py-1 rounded text-white border border-white/20">
                    RAW FEED
                  </span>
                </div>
              )}

              {/* Right Label */}
              {observation.hasComparison && (
                <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold bg-isro-cyan/80 px-2 py-1 rounded text-black font-semibold">
                  PROCESSED / CALIBRATED
                </span>
              )}

              {/* Comparison Slider Line */}
              {observation.hasComparison && (
                <div
                  className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-isro-cyan shadow-glow-cyan flex items-center justify-center text-slate-950 font-mono text-[9px] font-bold">
                    ↔
                  </div>
                </div>
              )}

              {/* Interactive Range Input overlay */}
              {observation.hasComparison && (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                />
              )}
            </div>
          </div>

          {/* Description & Detailed Context */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Scientific Description
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {observation.description}
            </p>
          </div>

          {/* Key Findings List */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-isro-amber uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scientific Findings & Impact</span>
            </h3>
            <ul className="space-y-2">
              {observation.scientificFindings.map((finding, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-lg bg-space-900/60 border border-space-700/50 text-xs text-slate-200 flex items-start space-x-2"
                >
                  <span className="text-isro-cyan font-mono font-bold">0{idx + 1}.</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-space-900/70 border border-space-700/60 font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Coordinates / Region</span>
              <span className="text-white font-semibold">{observation.coordinatesOrRegion}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Capture Timestamp</span>
              <span className="text-white">{new Date(observation.date).toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Archive ID</span>
              <span className="text-isro-gold">{observation.datasetArchiveId}</span>
            </div>
          </div>

          {/* Downloadable Official Datasets */}
          {observation.dataFiles && observation.dataFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Scientific Datasets</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {observation.dataFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-space-900/50 border border-space-700/50 flex items-center justify-between font-mono text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white block">{file.downloadLabel}</span>
                      <span className="text-[10px] text-slate-400">
                        Format: <span className="text-isro-cyan">{file.format}</span> ({file.size})
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        spaceAudio.playClick();
                        alert(`Downloading verified dataset: ${file.downloadLabel}`);
                      }}
                      className="px-2.5 py-1 rounded bg-space-800 hover:bg-space-700 border border-space-600 text-slate-200 hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Fetch</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Provenance & Attribution */}
          <div className="p-3 rounded-lg bg-space-950/80 border border-space-800 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Source Credit: <strong className="text-slate-300">{observation.sourceCredit}</strong></span>
            <a
              href={observation.officialSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-isro-cyan hover:underline flex items-center space-x-1"
            >
              <span>Access Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
