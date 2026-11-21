import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Compass,
} from 'lucide-react';
import { ScientificObservation } from '../../types';
import { spaceAudio } from '../../utils/audio';

interface ImageGalleryViewProps {
  observations: ScientificObservation[];
  onSelectObservation: (obs: ScientificObservation) => void;
}

export const ImageGalleryView: React.FC<ImageGalleryViewProps> = ({
  observations,
  onSelectObservation,
}) => {
  const [selectedImageObs, setSelectedImageObs] = useState<ScientificObservation | null>(
    observations[0] || null
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showProcessed, setShowProcessed] = useState<boolean>(true);

  if (!selectedImageObs) return null;

  return (
    <div className="absolute inset-0 top-16 bottom-0 z-10 overflow-y-auto bg-space-950/95 p-4 sm:p-8 select-none">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-space-700/60 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-6 h-6 text-pink-400" />
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-wider text-white">
                INDIAN SPACE MISSION REAL IMAGE ARCHIVE
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              High-resolution planetary, lunar, solar, and astronomical observations captured by Indian space instruments.
            </p>
          </div>
        </div>

        {/* Featured Viewer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Large Display Canvas */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-xl overflow-hidden glass-panel border border-space-700/80 bg-black flex items-center justify-center">
              {/* Image with zoom transformation */}
              <img
                src={
                  showProcessed && selectedImageObs.processedImageUrl
                    ? selectedImageObs.processedImageUrl
                    : selectedImageObs.originalImageUrl
                }
                alt={selectedImageObs.title}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-w-full max-h-full object-contain transition-transform duration-200"
              />

              {/* Floating Zoom & Toggle Controls */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/75 backdrop-blur-md p-1.5 rounded-lg border border-space-700 font-mono text-xs">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.25))}
                  className="p-1.5 rounded hover:bg-space-800 text-slate-300 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-isro-cyan px-1">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(3.0, z + 0.25))}
                  className="p-1.5 rounded hover:bg-space-800 text-slate-300 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-2 py-1 rounded bg-space-800 text-slate-300 hover:text-white text-[10px]"
                >
                  Reset
                </button>
              </div>

              {/* Processed vs Raw Toggle Switch (if both available) */}
              {selectedImageObs.hasComparison && (
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-space-700 font-mono text-xs">
                  <button
                    onClick={() => {
                      spaceAudio.playClick();
                      setShowProcessed(false);
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      !showProcessed
                        ? 'bg-isro-amber text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Raw Detector Feed
                  </button>
                  <button
                    onClick={() => {
                      spaceAudio.playClick();
                      setShowProcessed(true);
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      showProcessed
                        ? 'bg-isro-cyan text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Calibrated Science View
                  </button>
                </div>
              )}
            </div>

            {/* Image Provenance Info Banner */}
            <div className="p-3.5 rounded-lg bg-space-900/80 border border-space-800 font-mono text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                  ✓ VERIFIED AUTHENTIC ARCHIVE
                </span>
                <span>
                  Archive ID: <span className="text-isro-gold">{selectedImageObs.datasetArchiveId}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-slate-300">{selectedImageObs.sourceCredit}</span>
                <a
                  href={selectedImageObs.originalImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-isro-cyan hover:underline flex items-center space-x-1 font-bold text-[11px]"
                >
                  <span>Open Full-Res</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Information & Provenance Details */}
          <div className="glass-panel p-5 rounded-xl border border-space-700/80 space-y-4 font-mono text-xs">
            <div>
              <span className="text-[10px] text-isro-amber font-bold uppercase tracking-wider block">
                {selectedImageObs.missionName}
              </span>
              <h2 className="text-base font-bold font-sans text-white mt-1">
                {selectedImageObs.title}
              </h2>
            </div>

            <div className="space-y-2 border-t border-b border-space-800 py-3">
              <div className="flex justify-between">
                <span className="text-slate-400">INSTRUMENT:</span>
                <span className="text-white font-bold">{selectedImageObs.instrumentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">TARGET:</span>
                <span className="text-isro-cyan">{selectedImageObs.targetBody}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">REGION:</span>
                <span className="text-white">{selectedImageObs.coordinatesOrRegion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">TIMESTAMP:</span>
                <span className="text-white">{new Date(selectedImageObs.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Observation Context</span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {selectedImageObs.description}
              </p>
            </div>

            <div>
              <span className="text-isro-gold text-[10px] uppercase block mb-1 font-bold">
                Scientific Discoveries
              </span>
              <ul className="space-y-1 font-sans text-[11px] text-slate-300">
                {selectedImageObs.scientificFindings.map((f, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-isro-cyan">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectObservation(selectedImageObs)}
                className="w-full py-2 px-3 rounded-lg bg-isro-cyan/20 hover:bg-isro-cyan/30 border border-isro-cyan/40 text-isro-cyan text-xs font-bold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Open Full Observation Record & Datasets</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails Filmstrip Carousel */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Select Observation Imagery ({observations.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {observations.map((obs) => {
              const isSelected = selectedImageObs.id === obs.id;
              return (
                <div
                  key={obs.id}
                  onClick={() => {
                    spaceAudio.playClick();
                    setSelectedImageObs(obs);
                    setZoomLevel(1);
                  }}
                  className={`relative h-28 rounded-lg overflow-hidden border cursor-pointer group transition-all ${
                    isSelected
                      ? 'border-isro-cyan shadow-glow-cyan scale-105'
                      : 'border-space-700/60 hover:border-slate-500 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={obs.processedImageUrl || obs.originalImageUrl}
                    alt={obs.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] font-mono font-bold text-white truncate">
                      {obs.missionName.split(' ')[0]} • {obs.instrumentName.split(' ')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
