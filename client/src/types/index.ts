export type MissionCategory = 
  | 'lunar'
  | 'mars'
  | 'solar'
  | 'astronomy'
  | 'human'
  | 'earth_observation';

export type MissionStatus = 'active' | 'completed' | 'planned' | 'success';

export type DataStatus = 'REAL ARCHIVE' | 'SIMULATED' | 'HISTORICAL' | 'UNAVAILABLE';

export interface ScientificInstrument {
  id: string;
  name: string;
  fullName: string;
  leadInstitution: string;
  massKg?: number;
  powerWatts?: number;
  wavelengthOrBand?: string;
  principle: string;
  howItWorks: string;
  dataProduced: string;
  scientificSignificance: string;
  sampleObservationsCount: number;
  officialRefUrl?: string;
  imagePreview?: string;
}

export interface MissionMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  phase: 'Launch' | 'Trajectory' | 'Insertion' | 'Landing' | 'Operation' | 'Science' | 'Milestone';
  mediaUrl?: string;
  mediaType?: 'image' | 'telemetry' | 'announcement';
  isKeyMilestone?: boolean;
}

export interface SpacecraftSpec {
  craftType: 'Orbiter' | 'Lander' | 'Rover' | 'Space Telescope' | 'Crew Module' | 'Solar Observatory' | 'Earth Observation' | 'Constellation';
  dryMassKg: number;
  launchMassKg: number;
  payloadMassKg: number;
  dimensionsMeters: string;
  powerSource: string;
  powerOutputWatts: number;
  propulsion: string;
  stabilization: string;
  communicationBands: string;
  operationalLifetime: string;
  orbitType: string;
  periapsisKm?: number;
  apoapsisKm?: number;
  inclinationDeg?: number;
  orbitalPeriodMin?: number;
}

export interface Mission {
  id: string;
  name: string;
  codeName?: string;
  category: MissionCategory;
  destination: 'Earth Orbit' | 'Moon' | 'Mars' | 'Sun-Earth L1' | 'Deep Space';
  status: MissionStatus;
  statusBadge: string;
  launchDate: string;
  launchSite: string;
  launchVehicle: string;
  duration: string;
  tagline: string;
  description: string;
  primaryObjectives: string[];
  keyDiscoveries: string[];
  specs: SpacecraftSpec;
  instruments: ScientificInstrument[];
  milestones: MissionMilestone[];
  targetBody: 'Sun' | 'Earth' | 'Moon' | 'Mars';
  color: string;
  orbitRadius: number; // for 3D visualization relative scale
  orbitInclination?: number;
  orbitEccentricity?: number;
  officialLogoUrl?: string;
  issdcPortalUrl?: string;
  pradanPortalUrl?: string;
  publicationsCount: number;
  datasetSizeGb?: number;
}

export interface ScientificObservation {
  id: string;
  missionId: string;
  missionName: string;
  instrumentId: string;
  instrumentName: string;
  title: string;
  category: 'Optical Imagery' | 'Thermal Profile' | 'Elemental Spectroscopy' | 'Radar Backscatter' | 'Solar Wind & Particles' | 'X-ray Polarimetry' | 'UV Astronomy' | 'Atmospheric Profile';
  date: string;
  targetBody: 'Sun' | 'Earth' | 'Moon' | 'Mars' | 'Deep Space';
  coordinatesOrRegion: string;
  description: string;
  originalImageUrl: string;
  processedImageUrl?: string;
  hasComparison: boolean;
  dataPointsSummary?: string;
  scientificFindings: string[];
  datasetArchiveId: string;
  officialSourceUrl: string;
  sourceCredit: string;
  dataFiles?: {
    format: 'FITS' | 'PDS4' | 'CSV' | 'GeoTIFF' | 'JSON';
    size: string;
    downloadLabel: string;
  }[];
}

export interface LiveTelemetryState {
  spacecraftId: string;
  missionName: string;
  timestamp: string;
  altitudeKm: number;
  velocityKmS: number;
  distanceFromEarthKm: number;
  sunDistanceAu: number;
  subSatelliteLatitude: number;
  subSatelliteLongitude: number;
  signalLatencySec: number;
  telemetryMode: DataStatus;
  groundStationContact: string;
  solarArrayPowerWatts: number;
  uplinkFrequencyGhz: number;
  downlinkDataRateMbps: number;
  activeSensors: string[];
}
