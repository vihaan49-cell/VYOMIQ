import React, { useState, useEffect } from 'react';
import { MISSIONS_DATA } from './data/missionsData';
import { SCIENTIFIC_OBSERVATIONS } from './data/observationsData';
import { Header } from './components/layout/Header';
import { LeftPanel } from './components/layout/LeftPanel';
import { RightPanel } from './components/layout/RightPanel';
import { BottomTimeline } from './components/layout/BottomTimeline';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { ObservationsView } from './components/views/ObservationsView';
import { ImageGalleryView } from './components/views/ImageGalleryView';
import { ScientificAnalyticsView } from './components/views/ScientificAnalyticsView';
import { AboutView } from './components/views/AboutView';
import { ObservationModal } from './components/modals/ObservationModal';
import { UniversalSearchModal } from './components/modals/UniversalSearchModal';
import { MilestoneModal } from './components/modals/MilestoneModal';
import { ScientificObservation, MissionMilestone } from './types';
import { spaceAudio } from './utils/audio';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    'universe' | 'missions' | 'observations' | 'gallery' | 'analytics' | 'about'
  >('universe');

  const [selectedId, setSelectedId] = useState<string | null>('chandrayaan-3');
  const [selectedType, setSelectedType] = useState<'planet' | 'spacecraft' | 'all' | null>(
    'spacecraft'
  );

  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState<boolean>(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [activePreset, setActivePreset] = useState<string | null>('moon');
  const [timeScale, setTimeScale] = useState<number>(1);

  const [modalObservation, setModalObservation] = useState<ScientificObservation | null>(null);
  const [modalMilestone, setModalMilestone] = useState<MissionMilestone | null>(null);

  // Global hotkeys (Cmd/Ctrl + K for search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setModalObservation(null);
        setModalMilestone(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle selection from 3D canvas or lists
  const handleSelect = (id: string, type: 'planet' | 'spacecraft') => {
    setSelectedId(id);
    setSelectedType(type);
    setIsRightPanelOpen(true);
    spaceAudio.playTargetLock();

    // Map presets
    if (id === 'sun' || id === 'aditya-l1') setActivePreset('sun');
    else if (id === 'earth' || id === 'astrosat' || id === 'xposat' || id === 'gaganyaan')
      setActivePreset('earth');
    else if (id.includes('chandrayaan') || id === 'moon') setActivePreset('moon');
    else if (id.includes('mangalyaan') || id === 'mars') setActivePreset('mars');
    else setActivePreset(null);
  };

  // Handle camera view preset buttons
  const handleCameraPreset = (preset: 'all' | 'sun' | 'earth' | 'moon' | 'mars') => {
    setActivePreset(preset);
    if (preset === 'all') {
      setSelectedId(null);
      setSelectedType('all');
      setIsRightPanelOpen(false);
    } else if (preset === 'sun') {
      setSelectedId('sun');
      setSelectedType('planet');
      setIsRightPanelOpen(true);
    } else if (preset === 'earth') {
      setSelectedId('earth');
      setSelectedType('planet');
      setIsRightPanelOpen(true);
    } else if (preset === 'moon') {
      setSelectedId('chandrayaan-3');
      setSelectedType('spacecraft');
      setIsRightPanelOpen(true);
    } else if (preset === 'mars') {
      setSelectedId('mangalyaan-1');
      setSelectedType('spacecraft');
      setIsRightPanelOpen(true);
    }
  };

  // Currently active mission object (for Right Panel)
  const activeMission = MISSIONS_DATA.find((m) => m.id === selectedId) || null;

  return (
    <div className="w-screen h-screen overflow-hidden bg-space-950 text-slate-100 flex flex-col relative select-none">
      {/* Top Header HUD Bar */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'universe') {
            setIsLeftPanelOpen(true);
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        timeScale={timeScale}
        setTimeScale={setTimeScale}
        onCameraPreset={handleCameraPreset}
        activePreset={activePreset}
      />

      {/* Main Center Area: 3D Universe Canvas or Sub-View */}
      <main className="flex-1 w-full h-[calc(100vh-4rem)] relative overflow-hidden">
        {/* Central 3D Interactive Solar System Canvas */}
        <UniverseCanvas
          missions={MISSIONS_DATA}
          selectedId={selectedId}
          selectedType={selectedType}
          onSelect={handleSelect}
          timeScale={timeScale}
        />

        {/* Left Mission Directory Panel (visible in universe view) */}
        {currentView === 'universe' && (
          <LeftPanel
            missions={MISSIONS_DATA}
            selectedId={selectedId}
            onSelectMission={(id) => handleSelect(id, 'spacecraft')}
            isOpen={isLeftPanelOpen}
            onToggle={() => setIsLeftPanelOpen((prev) => !prev)}
          />
        )}

        {/* Right Spacecraft Deep-Dive & Telemetry Panel (visible when object selected) */}
        {currentView === 'universe' && isRightPanelOpen && activeMission && (
          <RightPanel
            mission={activeMission}
            observations={SCIENTIFIC_OBSERVATIONS}
            onClose={() => setIsRightPanelOpen(false)}
            onOpenObservation={(obs) => setModalObservation(obs)}
          />
        )}

        {/* Bottom Interactive Mission Timeline */}
        {currentView === 'universe' && (
          <BottomTimeline
            selectedMission={activeMission}
            allMissions={MISSIONS_DATA}
            onSelectMilestone={(ms) => setModalMilestone(ms)}
          />
        )}

        {/* SUB-VIEW 1: OBSERVATIONS EXPLORER */}
        {currentView === 'observations' && (
          <ObservationsView
            observations={SCIENTIFIC_OBSERVATIONS}
            onOpenObservation={(obs) => setModalObservation(obs)}
          />
        )}

        {/* SUB-VIEW 2: REAL SPACE IMAGE GALLERY */}
        {currentView === 'gallery' && (
          <ImageGalleryView
            observations={SCIENTIFIC_OBSERVATIONS}
            onSelectObservation={(obs) => setModalObservation(obs)}
          />
        )}

        {/* SUB-VIEW 3: SCIENTIFIC DATA VISUALIZATION ANALYTICS */}
        {currentView === 'analytics' && <ScientificAnalyticsView />}

        {/* SUB-VIEW 4: ABOUT VYOMIQ */}
        {currentView === 'about' && <AboutView />}
      </main>

      {/* UNIVERSAL SEARCH MODAL (CMD + K) */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        missions={MISSIONS_DATA}
        observations={SCIENTIFIC_OBSERVATIONS}
        onSelectMission={(id) => {
          setCurrentView('universe');
          handleSelect(id, 'spacecraft');
        }}
        onSelectObservation={(obs) => {
          setModalObservation(obs);
        }}
      />

      {/* OBSERVATION DETAIL MODAL (RAW VS PROCESSED SLIDER) */}
      <ObservationModal
        observation={modalObservation}
        onClose={() => setModalObservation(null)}
      />

      {/* MILESTONE CELEBRATION MODAL */}
      <MilestoneModal
        milestone={modalMilestone}
        onClose={() => setModalMilestone(null)}
      />
    </div>
  );
};

export default App;
