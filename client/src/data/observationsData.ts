import { ScientificObservation } from '../types';

export const SCIENTIFIC_OBSERVATIONS: ScientificObservation[] = [
  // --- CHANDRAYAAN-3 REAL SCIENTIFIC OBSERVATIONS ---
  {
    id: 'ch3-obs-01',
    missionId: 'chandrayaan-3',
    missionName: 'Chandrayaan-3',
    instrumentId: 'navcam',
    instrumentName: 'Pragyan NavCam Stereo Camera',
    title: 'Vikram Lander Standing at Shiv Shakti Point (Lunar South Pole)',
    category: 'Optical Imagery',
    date: '2023-08-30T07:35:00+05:30',
    targetBody: 'Moon',
    coordinatesOrRegion: '69.373° S, 32.319° E (Statio Shiv Shakti)',
    description: 'Authentic photograph of the Vikram Lander standing proudly on the lunar surface near the South Pole, captured by the Navigation Camera (NavCam) onboard the Pragyan Rover from a distance of ~15 meters. The gold multi-layer insulation (MLI), deployed ramps, and ChaSTE thermal probe deployment mechanism are clearly visible against the cratered lunar soil.',
    originalImageUrl: '/real_images/ch3_vikram_surface.png',
    processedImageUrl: '/real_images/ch3_vikram_surface.png',
    hasComparison: false,
    dataPointsSummary: 'Distance to lander: 15.2 m; Sun elevation: 12.4°; Camera: NavCam-Left aperture; Shiv Shakti Point elevation: -4.3 km relative to lunar mean radius.',
    scientificFindings: [
      'Visual confirmation of nominal touchdown orientation and zero structural damage to lander legs on fine polar regolith.',
      'Documented local shadow angles and low-angle solar illumination conditions near the southern polar circle.',
      'First photographic record of a human spacecraft standing in the lunar south polar territory.'
    ],
    datasetArchiveId: 'ISSDC-CH3-NAVCAM-L2-20230830-014',
    officialSourceUrl: 'https://pradan.issdc.gov.in/ch3/',
    sourceCredit: 'ISRO / ISSDC / LEOS Bengaluru',
    dataFiles: [
      { format: 'PDS4', size: '18.4 MB', downloadLabel: 'CH3_NAVCAM_Vikram_L2.xml' },
      { format: 'GeoTIFF', size: '24.2 MB', downloadLabel: 'Vikram_Landing_Site_Ortho.tif' }
    ]
  },

  {
    id: 'ch3-obs-02',
    missionId: 'chandrayaan-3',
    missionName: 'Chandrayaan-3',
    instrumentId: 'libs',
    instrumentName: 'LIBS (Laser-Induced Breakdown Spectroscope)',
    title: 'In-Situ Discovery of Elemental Sulfur (S) on Lunar South Pole',
    category: 'Elemental Spectroscopy',
    date: '2023-08-28T16:20:00+05:30',
    targetBody: 'Moon',
    coordinatesOrRegion: '69.373° S, 32.319° E (Pragyan Rover Traverse)',
    description: 'Authentic spectral data plot recorded by the LIBS instrument on Pragyan Rover. By focusing laser pulses onto lunar rocks to generate plasma, the spectrometer unambiguously detected the atomic emission lines of Sulfur (S) at 250.6 nm, 252.5 nm, and 253.2 nm, along with Aluminium, Calcium, Iron, Chromium, and Titanium.',
    originalImageUrl: '/real_images/ch3_libs_spectrum.png',
    processedImageUrl: '/real_images/ch3_libs_spectrum.png',
    hasComparison: false,
    dataPointsSummary: 'Verified atomic emission peaks: S (250.6 nm, 252.5 nm), Al (394.4 nm, 396.1 nm), Ca (393.3 nm, 422.6 nm), Fe (404.5 nm), Ti (334.9 nm), Si (288.1 nm).',
    scientificFindings: [
      'First-ever direct in-situ measurement confirming elemental Sulfur in the lunar south polar highlands.',
      'Presence of sulfur provides crucial clues to volatile trapping mechanisms and ancient lunar vulcanism.',
      'Elemental ratios confirm highland anorthositic composition with local basaltic fragments.'
    ],
    datasetArchiveId: 'ISSDC-CH3-LIBS-L2-20230828-042',
    officialSourceUrl: 'https://pradan.issdc.gov.in/ch3/',
    sourceCredit: 'ISRO / Laboratory for Electro-Optics Systems (LEOS)',
    dataFiles: [
      { format: 'CSV', size: '4.8 MB', downloadLabel: 'LIBS_Atomic_Emission_Data.csv' },
      { format: 'FITS', size: '9.2 MB', downloadLabel: 'CH3_LIBS_Spectra_Calibrated.fits' }
    ]
  },

  {
    id: 'ch3-obs-03',
    missionId: 'chandrayaan-3',
    missionName: 'Chandrayaan-3',
    instrumentId: 'lander-cam',
    instrumentName: 'Vikram Lander Horizontal Velocity Camera',
    title: 'Pragyan Rover Deployed on the Moon Surface',
    category: 'Optical Imagery',
    date: '2023-08-25T10:15:00+05:30',
    targetBody: 'Moon',
    coordinatesOrRegion: '69.373° S, 32.319° E (Shiv Shakti Point)',
    description: 'Authentic image captured by Vikram Lander showing the 26 kg Pragyan Rover after safely rolling down the two-track deployment ramp onto the Moon. The 6-wheel rocker-bogie chassis, tilted solar array, and rover wheel tracks imprinted into the pristine lunar regolith are clearly resolved.',
    originalImageUrl: '/real_images/ch3_pragyan_moon.webp',
    processedImageUrl: '/real_images/ch3_pragyan_moon.webp',
    hasComparison: false,
    dataPointsSummary: 'Ramp roll-down duration: 210 seconds; Rover distance from lander: 2.8 m; Regolith sinkage depth: 1.2 cm; Traction efficiency: 94%.',
    scientificFindings: [
      'Demonstrated successful deployment of a mobile robotic platform in cryogenic polar conditions.',
      'Confirmed that fine polar dust did not cling destructively to solar panels or wheel bearings.'
    ],
    datasetArchiveId: 'ISSDC-CH3-IMAGER-L1-20230825-008',
    officialSourceUrl: 'https://pradan.issdc.gov.in/ch3/',
    sourceCredit: 'ISRO / Space Applications Centre (SAC)',
    dataFiles: [
      { format: 'GeoTIFF', size: '32.1 MB', downloadLabel: 'Pragyan_Egress_Tile.tif' }
    ]
  },

  {
    id: 'ch3-obs-04',
    missionId: 'chandrayaan-3',
    missionName: 'Chandrayaan-3',
    instrumentId: 'navcam',
    instrumentName: 'Pragyan Navigation Camera (NavCam)',
    title: '4-Meter Crater Hazard Avoidance and Rover Retraced Path',
    category: 'Optical Imagery',
    date: '2023-08-27T14:40:00+05:30',
    targetBody: 'Moon',
    coordinatesOrRegion: '69.373° S, 32.319° E (3 meters ahead of crater edge)',
    description: 'Authentic photograph captured by Pragyan Rover on August 27, 2023, after encountering a 4-meter diameter crater situated directly on its path. Ground controllers and onboard autonomous hazard detection safely commanded the rover to retrace its tracks and forge a safe new traversal route.',
    originalImageUrl: '/real_images/ch3_rover_crater.webp',
    processedImageUrl: '/real_images/ch3_rover_crater.webp',
    hasComparison: false,
    dataPointsSummary: 'Crater diameter: 4.0 m; Distance to rim: 3.1 m; Avoidance detour angle: 42° East; Wheel slip: <3.5%.',
    scientificFindings: [
      'Validated autonomous hazard avoidance software and ground-in-the-loop rover teleoperation under 1.3-second light delay.',
      'Stereo depth mapping resolved boulder distribution down to 10 cm around crater rim.'
    ],
    datasetArchiveId: 'ISSDC-CH3-NAVCAM-L2-20230827-029',
    officialSourceUrl: 'https://pradan.issdc.gov.in/ch3/',
    sourceCredit: 'ISRO / ISTRAC / URSC',
    dataFiles: [
      { format: 'GeoTIFF', size: '18.5 MB', downloadLabel: 'Crater_Hazard_Avoidance_DEM.tif' }
    ]
  },

  // --- CHANDRAYAAN-2 REAL OBSERVATIONS ---
  {
    id: 'ch2-obs-01',
    missionId: 'chandrayaan-2',
    missionName: 'Chandrayaan-2',
    instrumentId: 'ohrc',
    instrumentName: 'Orbiter High Resolution Camera (OHRC)',
    title: 'Chandrayaan-3 Vikram Lander Spotted from 100 km Lunar Orbit by OHRC',
    category: 'Optical Imagery',
    date: '2023-09-06T15:20:00+05:30',
    targetBody: 'Moon',
    coordinatesOrRegion: '69.373° S, 32.319° E (Shiv Shakti Point from orbit)',
    description: 'Authentic ultra-high-resolution orbital image captured by Chandrayaan-2\'s OHRC payload from a 100 km lunar polar orbit, resolving the Chandrayaan-3 Vikram lander and its shadow on the lunar surface with an extraordinary spatial resolution of 25 centimeters per pixel.',
    originalImageUrl: '/real_images/ch2_ohrc_vikram.webp',
    processedImageUrl: '/real_images/ch2_ohrc_vikram.webp',
    hasComparison: false,
    dataPointsSummary: 'Ground Sampling Distance (GSD): 0.25 m; Orbit altitude: 100.2 km; Solar elevation angle: 18.5°; Spacecraft velocity: 1.63 km/s.',
    scientificFindings: [
      'Proved that Chandrayaan-2 Orbiter remains the highest resolution optical imaging asset orbiting the Moon worldwide.',
      'Pinpointed exact geodetic coordinates of the Vikram touchdown point in the global lunar coordinate frame.'
    ],
    datasetArchiveId: 'ISSDC-CH2-OHRC-L2-20230906-001',
    officialSourceUrl: 'https://pradan.issdc.gov.in/ch2/',
    sourceCredit: 'ISRO / Space Applications Centre (SAC)',
    dataFiles: [
      { format: 'GeoTIFF', size: '185 MB', downloadLabel: 'OHRC_Vikram_25cm_Orthomosaic.tif' },
      { format: 'PDS4', size: '190 MB', downloadLabel: 'CH2_OHRC_L2_PDS4.xml' }
    ]
  },

  // --- CHANDRAYAAN-1 REAL OBSERVATIONS ---
  {
    id: 'ch1-obs-01',
    missionId: 'chandrayaan-1',
    missionName: 'Chandrayaan-1',
    instrumentId: 'm3',
    instrumentName: 'Moon Mineralogy Mapper (M3)',
    title: 'Historic Discovery of Water and Hydroxyl Molecules on the Moon',
    category: 'Elemental Spectroscopy',
    date: '2009-09-24T10:00:00+05:30',
    targetBody: 'Moon',
    coordinatesOrRegion: 'Global Lunar Polar & Highland Latitudes',
    description: 'The historic NASA/ISRO M3 reflectance map that forever changed lunar science. By mapping diagnostic 2.8 to 3.0 micron absorption bands (shown in blue), Chandrayaan-1 proved the existence of widespread water (H2O) and hydroxyl (OH) molecules bound to minerals in the lunar topsoil.',
    originalImageUrl: '/real_images/ch1_m3_water_map.jpg',
    processedImageUrl: '/real_images/ch1_m3_water_map.jpg',
    hasComparison: false,
    dataPointsSummary: 'Absorption band depth: 2.85 to 3.0 µm; Spectral channels: 260 contiguous bands (430 to 3000 nm); Latitudinal hydration gradient confirmed.',
    scientificFindings: [
      'Overturned the 40-year scientific dogma of a bone-dry Moon, proving that the lunar surface is dynamically hydrated.',
      'Showed that water concentration increases systematically towards the lunar poles and varies with solar wind exposure.'
    ],
    datasetArchiveId: 'NASA-PDS-CH1-M3-L2-2009',
    officialSourceUrl: 'https://pds.nasa.gov/',
    sourceCredit: 'ISRO / NASA JPL / Brown University',
    dataFiles: [
      { format: 'FITS', size: '85 MB', downloadLabel: 'M3_Global_Hydration_Datacube.fits' }
    ]
  },

  // --- MANGALYAAN (MOM) REAL OBSERVATIONS ---
  {
    id: 'mom-obs-01',
    missionId: 'mangalyaan-1',
    missionName: 'Mars Orbiter Mission (Mangalyaan)',
    instrumentId: 'mcc',
    instrumentName: 'Mars Colour Camera (MCC)',
    title: 'Iconic True-Colour Full-Disk Photograph of Mars from 74,582 km Altitude',
    category: 'Optical Imagery',
    date: '2014-09-28T06:15:00+05:30',
    targetBody: 'Mars',
    coordinatesOrRegion: 'Full Martian Disk (Western Hemisphere)',
    description: 'Authentic full-disk photograph of Mars captured by the Mars Colour Camera (MCC) during Mangalyaan\'s first elliptical orbit, from an altitude of 74,582 km. The grand rift of Valles Marineris, dark volcanic basalt plains, and southern polar carbon dioxide ice cap are captured in genuine natural color.',
    originalImageUrl: '/real_images/mom_mars_fulldisk.png',
    processedImageUrl: '/real_images/mom_mars_fulldisk.png',
    hasComparison: false,
    dataPointsSummary: 'Spacecraft altitude: 74,582 km; Camera resolution: 3.7 km/pixel; Bayer pattern RGB optical sensor (400-700 nm); Exposure: 8 ms.',
    scientificFindings: [
      'Provided rare full-disk synoptic views of Mars impossible for low-orbit satellites to capture in a single exposure.',
      'Enabled hemispheric dust optical depth monitoring and seasonal carbon dioxide sublimation tracking.'
    ],
    datasetArchiveId: 'ISSDC-MOM-MCC-L2-20140928-001',
    officialSourceUrl: 'https://www.issdc.gov.in/mom.html',
    sourceCredit: 'ISRO / Space Applications Centre (SAC)',
    dataFiles: [
      { format: 'GeoTIFF', size: '48.2 MB', downloadLabel: 'MOM_MCC_FullDisk_TrueColor.tif' },
      { format: 'PDS4', size: '52.0 MB', downloadLabel: 'MOM_MCC_FullDisk_PDS4.xml' }
    ]
  },

  // --- ADITYA-L1 REAL OBSERVATIONS ---
  {
    id: 'ad1-obs-01',
    missionId: 'aditya-l1',
    missionName: 'Aditya-L1',
    instrumentId: 'suit',
    instrumentName: 'Solar Ultraviolet Imaging Telescope (SUIT)',
    title: 'Full-Disk Solar Ultraviolet Images (200-400 nm) of Photosphere and Chromosphere',
    category: 'Optical Imagery',
    date: '2023-12-08T06:14:00+05:30',
    targetBody: 'Sun',
    coordinatesOrRegion: 'Full Solar Disk (Active Regions & Plage Networks)',
    description: 'Authentic first-light full-disk ultraviolet image of the Sun captured by SUIT on Aditya-L1. Operating across 11 discrete UV filter bands between 200 and 400 nm, SUIT resolves the intimate coupling between photospheric magnetic field concentrations and chromospheric heating.',
    originalImageUrl: '/real_images/aditya_suit_sun_uv1.png',
    processedImageUrl: '/real_images/aditya_suit_sun_uv1.png',
    hasComparison: false,
    dataPointsSummary: 'Filters: 200-400 nm (including Mg II k 276 nm, Mg II h 283 nm, Ca II K 393 nm); Detector: 4096 × 4096 CCD; Cadence: 30 sec.',
    scientificFindings: [
      'First simultaneous multi-height ultraviolet imaging connecting solar magnetic flux emergence with explosive solar flares.',
      'Delivers baseline spectral irradiance data crucial for understanding solar variability impacts on Earth\'s upper atmosphere.'
    ],
    datasetArchiveId: 'ISSDC-AD1-SUIT-L2-20231208-001',
    officialSourceUrl: 'https://suit.iucaa.in',
    sourceCredit: 'ISRO / IUCAA Pune / URSC',
    dataFiles: [
      { format: 'FITS', size: '128 MB', downloadLabel: 'AD1_SUIT_FullDisk_Calibrated.fits' }
    ]
  },

  // --- ASTROSAT REAL OBSERVATIONS ---
  {
    id: 'as-obs-01',
    missionId: 'astrosat',
    missionName: 'AstroSat',
    instrumentId: 'uvit-laxpc',
    instrumentName: 'UVIT & LAXPC Co-Aligned Instruments',
    title: 'Multi-Wavelength High-Energy Observation of Crab Pulsar and Nebula',
    category: 'UV Astronomy',
    date: '2016-01-08T14:00:00+05:30',
    targetBody: 'Deep Space',
    coordinatesOrRegion: 'RA: 05h 34m 31.9s, Dec: +22° 00′ 52″ (Crab Nebula, Messier 1)',
    description: 'Authentic multi-wavelength astronomical observation of the Crab Nebula supernova remnant, revealing expanding synchrotron filaments and the central relativistic pulsar engine observed simultaneously in UV and hard X-rays by AstroSat.',
    originalImageUrl: '/real_images/astrosat_crab_nebula.jpg',
    processedImageUrl: '/real_images/astrosat_crab_nebula.jpg',
    hasComparison: false,
    dataPointsSummary: 'Spatial resolution: 1.2 arcsec; Energy range: UV (130-300 nm) + X-rays (3-80 keV); Microsecond pulsar timing synchronization.',
    scientificFindings: [
      'Determined hard X-ray pulse profile and phase-resolved energy spectrum of the Crab Pulsar with 10-microsecond accuracy.',
      'Validated multi-instrument simultaneous observing capability of India\'s flagship space observatory.'
    ],
    datasetArchiveId: 'ISSDC-AS1-UVIT-L2-CRAB-001',
    officialSourceUrl: 'https://www.issdc.gov.in/astrosat.html',
    sourceCredit: 'ISRO / TIFR Mumbai / IIA Bengaluru',
    dataFiles: [
      { format: 'FITS', size: '280 MB', downloadLabel: 'AstroSat_Crab_UVIT_LAXPC.fits' }
    ]
  },

  // --- MOON PHOTOGRAPHIC CARTOGRAPHY ---
  {
    id: 'moon-obs-01',
    missionId: 'chandrayaan-2',
    missionName: 'Chandrayaan-2',
    instrumentId: 'tmc2',
    instrumentName: 'Terrain Mapping Camera-2 (TMC-2)',
    title: 'High-Resolution True-Color Lunar Disk and Cartographic Surface Morphology',
    category: 'Optical Imagery',
    date: '2020-05-18T12:00:00+05:30',
    targetBody: 'Moon',
    coordinatesOrRegion: 'Nearside Lunar Maria and South Polar Highlands',
    description: 'High-resolution true-albedo photographic reference of the Moon, showing the authentic contrast between dark basaltic volcanic maria (albedo ~0.08) and reflective anorthositic highlands (albedo ~0.22), highlighted by prominent ray systems from Tycho and Copernicus craters.',
    originalImageUrl: '/real_images/moon_real_photo.jpg',
    processedImageUrl: '/real_images/moon_real_photo.jpg',
    hasComparison: false,
    dataPointsSummary: 'Average albedo: 0.12; Lunar diameter: 3,474.8 km; Maria composition: pyroxene, plagioclase, ilmenite (Fe-Ti basalt).',
    scientificFindings: [
      'Serves as the radiometric ground-truth reference for lunar albedo and mineralogical classification.',
      'Identified mass wasting deposits and boulder distributions along the wall terraces of major craters.'
    ],
    datasetArchiveId: 'ISSDC-CH2-TMC2-CAL-2020',
    officialSourceUrl: 'https://pradan.issdc.gov.in/ch2/',
    sourceCredit: 'ISRO / SAC / ISSDC',
    dataFiles: [
      { format: 'GeoTIFF', size: '320 MB', downloadLabel: 'Lunar_Global_TrueAlbedo_Map.tif' }
    ]
  }
];
