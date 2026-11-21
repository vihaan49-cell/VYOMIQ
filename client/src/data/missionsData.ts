import { Mission } from '../types';

export const MISSIONS_DATA: Mission[] = [
  // --- LUNAR EXPLORATION ---
  {
    id: 'chandrayaan-3',
    name: 'Chandrayaan-3',
    codeName: 'CH-3 Lunar South Pole Explorer',
    category: 'lunar',
    destination: 'Moon',
    status: 'success',
    statusBadge: 'Historic Success (South Pole)',
    launchDate: '2023-07-14T14:35:17+05:30',
    launchSite: 'Satish Dhawan Space Centre (SDSC-SHAR), Sriharikota',
    launchVehicle: 'LVM3-M4 (Fat Boy)',
    duration: '1 Lunar Day (14 Earth days) primary surface ops; Propulsion Module active',
    tagline: 'First human spacecraft to soft-land near the Lunar South Pole (Shiv Shakti Point).',
    description: 'Chandrayaan-3 is India\'s third lunar exploration mission, making India the fourth country to achieve a soft lunar landing and the very first to land in the southern polar region. It comprised the Vikram Lander, Pragyan Rover, and an orbiting Propulsion Module carrying Earth-observation payload SHAPE.',
    primaryObjectives: [
      'Demonstrate safe and soft landing on lunar south polar region.',
      'Demonstrate rover roving operations on the rugged lunar surface.',
      'Conduct in-situ scientific experiments on lunar regolith thermophysical properties, elemental composition, and seismic activity.',
      'Operate experimental Earth spectral polarimetry payload (SHAPE) from lunar orbit.'
    ],
    keyDiscoveries: [
      'In-situ elemental confirmation of Sulfur (S) near the South Pole by LIBS and APXS.',
      'First-ever vertical temperature profile of lunar polar regolith by ChaSTE (-8°C at 10cm depth vs +54°C at surface, revealing ultra-low thermal conductivity).',
      'First lunar seismic event recorded near South Pole by ILSA MEMS sensor.',
      'Low plasma density near the south polar surface (~5 to 30 million electrons per cubic meter) measured by Langmuir Probe.',
      'Successful lunar surface hop experiment demonstrating vertical take-off and re-landing for future sample return missions.'
    ],
    specs: {
      craftType: 'Lander',
      dryMassKg: 1752,
      launchMassKg: 3900,
      payloadMassKg: 175,
      dimensionsMeters: 'Lander: 2.0 × 2.0 × 1.17 m; Rover: 0.91 × 0.75 × 0.39 m',
      powerSource: 'Deployable Solar Panels (Vikram: 738W, Pragyan: 50W, PM: 758W)',
      powerOutputWatts: 738,
      propulsion: 'Bi-propellant Liquid Apogee Motor (700N throttlable thrusters × 4)',
      stabilization: '3-axis stabilized using reaction wheels and cold gas thrusters',
      communicationBands: 'X-band, S-band with Deep Space Network & Chandrayaan-2 Orbiter relay',
      operationalLifetime: '14 Earth days surface ops (exceeded with hop & hop-back tests)',
      orbitType: 'Landed at 69.373° S, 32.319° E (Shiv Shakti Point)',
      periapsisKm: 0,
      apoapsisKm: 0,
      inclinationDeg: 69.373,
      orbitalPeriodMin: 0
    },
    instruments: [
      {
        id: 'chaste',
        name: 'ChaSTE',
        fullName: 'Chandra\'s Surface Thermophysical Experiment',
        leadInstitution: 'Space Physics Laboratory (SPL) / VSSC, Thiruvananthapuram',
        massKg: 3.5,
        powerWatts: 12,
        principle: 'Penetration probe equipped with 10 precision platinum RTD temperature sensors inserted up to 10 cm into regolith.',
        howItWorks: 'A motorized drive forces a thermal needle probe into the lunar topsoil. It measures regolith thermal conductivity by applying controlled heating pulses and recording thermal dissipation over depth.',
        dataProduced: 'Vertical temperature gradient profiles (°C vs depth in mm) and thermal conductivity (W/m·K).',
        scientificSignificance: 'Revealed that lunar top regolith is an extraordinary thermal insulator, protecting sub-surface volatile ices from extreme space temperatures.',
        sampleObservationsCount: 142,
        officialRefUrl: 'https://www.isro.gov.in/Chaste_first_observations.html'
      },
      {
        id: 'libs',
        name: 'LIBS',
        fullName: 'Laser-Induced Breakdown Spectroscope',
        leadInstitution: 'Laboratory for Electro-Optics Systems (LEOS), Bengaluru',
        massKg: 1.2,
        powerWatts: 5,
        principle: 'High-energy pulsed Nd:YAG laser generates localized micro-plasma; spectrometer captures atomic emission lines.',
        howItWorks: 'A 1064nm laser fires onto the lunar rock or soil ~20 cm away. As the localized rock vaporizes into glowing plasma, a diffraction grating spectrometer records characteristic wavelength emission peaks.',
        dataProduced: 'Atomic emission intensity spectra from 200 nm to 800 nm with elemental identification peaks.',
        scientificSignificance: 'Unambiguously identified elemental Sulfur (S) on the lunar surface for the first time in-situ, alongside Al, Ca, Fe, Cr, Ti, Mn, and Si.',
        sampleObservationsCount: 88,
        officialRefUrl: 'https://www.isro.gov.in/LIBS_detects_Sulfur.html'
      },
      {
        id: 'apxs',
        name: 'APXS',
        fullName: 'Alpha Particle X-ray Spectrometer',
        leadInstitution: 'Physical Research Laboratory (PRL), Ahmedabad',
        massKg: 1.5,
        powerWatts: 4,
        principle: 'Curium-244 radioactive source excites characteristic X-ray fluorescence and alpha backscattering.',
        howItWorks: 'Mounted on Pragyan rover\'s robotic contact arm, placed directly against lunar soil for 2-4 hour integration sessions.',
        dataProduced: 'X-ray energy spectrum (0.5 keV to 25 keV) quantified into oxide weight percentages.',
        scientificSignificance: 'Quantified mineralogical ferroan anorthosite composition of the ancient lunar magma ocean near the south pole.',
        sampleObservationsCount: 46,
        officialRefUrl: 'https://www.prl.res.in/prl-eng/apxs'
      },
      {
        id: 'ilsa',
        name: 'ILSA',
        fullName: 'Instrument for Lunar Seismic Activity',
        leadInstitution: 'Laboratory for Electro-Optics Systems (LEOS), Bengaluru',
        massKg: 2.8,
        powerWatts: 8,
        principle: 'High-sensitivity MEMS-based 3-axis accelerometer cluster deployed on lunar ground.',
        howItWorks: 'Measures minute ground vibrations down to micro-g range caused by micrometeorite impacts, thermal quakes, and rover movement.',
        dataProduced: 'Three-component acceleration waveforms (micro-m/s² vs time) sampled at 100 Hz.',
        scientificSignificance: 'Recorded natural lunar tectonic/impact seismic events, providing baseline data for lunar interior crustal velocity modeling.',
        sampleObservationsCount: 65,
        officialRefUrl: 'https://www.isro.gov.in/ILSA_seismic_data.html'
      },
      {
        id: 'shape',
        name: 'SHAPE',
        fullName: 'Spectro-polarimetry of Habitable Planet Earth',
        leadInstitution: 'U R Rao Satellite Centre (URSC), Bengaluru',
        massKg: 14.0,
        powerWatts: 25,
        principle: 'AOTF-based spectro-polarimeter analyzing Earth as an exoplanet proxy from lunar orbit.',
        howItWorks: 'Observes disk-integrated polarized light reflected from Earth across NIR wavelengths (1.0 - 1.7 µm) to characterize biosignatures.',
        dataProduced: 'Degree of Linear Polarization (DoLP) and Stokes parameters (I, Q, U) vs wavelength.',
        scientificSignificance: 'Establishes benchmark polarimetric signatures of life-bearing habitable exoplanets for future space telescopes.',
        sampleObservationsCount: 310,
        officialRefUrl: 'https://www.isro.gov.in/SHAPE_observations.html'
      }
    ],
    milestones: [
      { id: 'm1', date: '2023-07-14', title: 'Flawless LVM3 Launch', description: 'Injected into 170 × 36,500 km Earth parking orbit.', phase: 'Launch', isKeyMilestone: true },
      { id: 'm2', date: '2023-08-01', title: 'Trans-Lunar Injection (TLI)', description: 'Engine fired for 1,120 seconds, placing craft on trajectory towards Moon.', phase: 'Trajectory' },
      { id: 'm3', date: '2023-08-05', title: 'Lunar Orbit Insertion (LOI)', description: 'Retro-burn entered elliptical 164 × 18,074 km lunar orbit.', phase: 'Insertion' },
      { id: 'm4', date: '2023-08-17', title: 'Lander Separation', description: 'Vikram Lander safely separated from Propulsion Module in 153 × 163 km orbit.', phase: 'Insertion' },
      { id: 'm5', date: '2023-08-23 18:04 IST', title: 'Historic Touchdown (Shiv Shakti)', description: 'Soft-landing accomplished at 69.3676°S 32.3481°E, making India 1st to land near lunar south pole.', phase: 'Landing', isKeyMilestone: true },
      { id: 'm6', date: '2023-08-24', title: 'Pragyan Rover Egress', description: 'Rover rolled down ramp onto lunar soil; Indian flag and ISRO logo embossed in tracks.', phase: 'Operation', isKeyMilestone: true },
      { id: 'm7', date: '2023-08-28', title: 'In-situ Sulfur Detection', description: 'LIBS and APXS payload confirmed elemental sulfur on lunar south pole.', phase: 'Science', isKeyMilestone: true },
      { id: 'm8', date: '2023-09-03', title: 'Vikram Surface Hop Test', description: 'Lander fired thrusters, lifted 40 cm vertically, and landed 30-40 cm away for sample return proof.', phase: 'Milestone', isKeyMilestone: true }
    ],
    targetBody: 'Moon',
    color: '#06b6d4',
    orbitRadius: 2.5,
    orbitInclination: 69.37,
    issdcPortalUrl: 'https://www.issdc.gov.in',
    pradanPortalUrl: 'https://pradan.issdc.gov.in/ch3/',
    publicationsCount: 38,
    datasetSizeGb: 420.5,
    signatureImages: [
      {
        id: 'ch3_sig1',
        url: '/real_images/ch3_pragyan_moon.webp',
        title: 'Pragyan Rover on the Lunar Surface',
        instrument: 'Vikram Lander Ramp Camera (NavCam)',
        date: '2023-08-24',
        brief: 'First image of the Pragyan rover captured moments after it rolled off the Vikram Lander ramp onto the ancient regolith of the lunar south polar region at Shiv Shakti Point.',
        credit: 'ISRO / ISSDC'
      },
      {
        id: 'ch3_sig2',
        url: '/real_images/ch3_vikram_surface.png',
        title: 'Vikram Lander on Lunar Surface',
        instrument: 'Pragyan Rover NavCam',
        date: '2023-08-30',
        brief: 'Pragyan rover turned its navigation camera backward to photograph the Vikram Lander standing silently on the Moon — the first image of an Indian lander taken from the surface of another world.',
        credit: 'ISRO / ISSDC'
      },
      {
        id: 'ch3_sig3',
        url: '/real_images/ch3_rover_crater.webp',
        title: 'Pragyan Navigates Around Crater',
        instrument: 'Vikram Lander NavCam / Rover Telemetry',
        date: '2023-08-27',
        brief: 'Ground controllers commanded Pragyan to retrace its path after a 4-metre-wide crater was detected ahead, capturing this iconic image of the rover silhouette against the stark polar landscape.',
        credit: 'ISRO / ISSDC'
      },
      {
        id: 'ch3_sig4',
        url: '/real_images/ch3_libs_spectrum.png',
        title: 'LIBS Elemental Spectrum — Sulfur Detected',
        instrument: 'LIBS (Laser-Induced Breakdown Spectroscope)',
        date: '2023-08-28',
        brief: 'The spectral output from LIBS confirming the in-situ detection of elemental Sulfur (S) on the lunar south polar surface — a world first. The characteristic emission line at 921.3 nm is unmistakable.',
        credit: 'ISRO / LEOS Bengaluru'
      }
    ]
  },

  {
    id: 'chandrayaan-2',
    name: 'Chandrayaan-2',
    codeName: 'CH-2 Lunar High-Resolution Orbiter',
    category: 'lunar',
    destination: 'Moon',
    status: 'active',
    statusBadge: 'Active Orbiter (100km Orbit)',
    launchDate: '2019-07-22T14:43:12+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'GSLV Mk III-M1',
    duration: 'Orbiter operational (design life 7+ years)',
    tagline: 'Highest resolution lunar imaging orbiter with sub-meter OHRC and 3D radar mapper.',
    description: 'Chandrayaan-2 launched with an Orbiter, Vikram Lander, and Pragyan Rover. While the lander suffered a hard impact during final descent, the Orbiter was inserted into an ideal 100 km polar orbit and continues to produce world-leading lunar science datasets with sub-meter imaging and unambiguous water ice detections.',
    primaryObjectives: [
      'Topographic mapping with highest resolution lunar camera (OHRC at 25 cm/pixel).',
      'Unambiguous mapping of water ice and OH absorption signatures at 3-micron band.',
      'Surface mineralogy and elemental abundance mapping using X-ray spectrometers.',
      'Subsurface radar probing with L & S band dual-frequency SAR.'
    ],
    keyDiscoveries: [
      'Unambiguous mapping of H2O and OH molecules across sunlit lunar latitudes using IIRS 3.0 µm absorption feature.',
      'Highest-resolution optical images of lunar surface ever obtained (25 cm ground sampling distance by OHRC).',
      'Discovery of subsurface radar backscatter anomalies indicating buried water-ice in permanently shadowed craters (PSRs) by DFSAR.',
      'First unambiguous detection of Argon-40 in lunar exosphere from a 100 km orbit by CHACE-2.',
      'Solar flare monitoring in soft X-rays by XSM, providing absolute solar spectral irradiance calibration.'
    ],
    specs: {
      craftType: 'Orbiter',
      dryMassKg: 998,
      launchMassKg: 2379,
      payloadMassKg: 280,
      dimensionsMeters: '3.2 × 5.8 × 2.1 m (with solar arrays deployed)',
      powerSource: 'Single solar array wing generating 1000W; Li-ion battery backup',
      powerOutputWatts: 1000,
      propulsion: '440N Liquid Apogee Motor (LAM) + 8 × 22N RCS thrusters',
      stabilization: '3-axis body stabilized with star sensors and gyro reference',
      communicationBands: 'X-band data downlink (up to 32 Mbps), S-band telemetry',
      operationalLifetime: '7+ years (active currently)',
      orbitType: 'Circular Lunar Polar Orbit (100 km altitude)',
      periapsisKm: 100,
      apoapsisKm: 100,
      inclinationDeg: 90.0,
      orbitalPeriodMin: 118
    },
    instruments: [
      {
        id: 'ohrc',
        name: 'OHRC',
        fullName: 'Orbiter High Resolution Camera',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 24.5,
        powerWatts: 45,
        wavelengthOrBand: '450 - 900 nm (Panchromatic)',
        principle: 'Time Delay Integration (TDI) optical telescope providing 0.25 m resolution from 100 km.',
        howItWorks: 'Uses folded Cassegrain optics with a 30 cm aperture to image lunar features with extraordinary detail, tracking surface speed via TDI electronics.',
        dataProduced: 'Uncompressed raw TIFF imagery with 25 cm/pixel GSD and stereo pairs for Digital Elevation Models.',
        scientificSignificance: 'World\'s highest resolution lunar orbiter camera. Imaged Chandrayaan-3 Vikram lander on the Moon and resolved boulder distributions.',
        sampleObservationsCount: 1850,
        officialRefUrl: 'https://pradan.issdc.gov.in/ch2/'
      },
      {
        id: 'tmc2',
        name: 'TMC-2',
        fullName: 'Terrain Mapping Camera-2',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 12.0,
        powerWatts: 30,
        wavelengthOrBand: 'Panchromatic (500 - 850 nm)',
        principle: 'Triplet stereo imaging camera (fore, aft, and nadir viewing) for 3D elevation maps.',
        howItWorks: 'Captures images looking ahead (+25°), straight down (0°), and behind (-25°) along track to construct photogrammetric 3D surface models.',
        dataProduced: '5m spatial resolution 3D Digital Elevation Models (DEM) of craters, rilles, and volcanic domes.',
        scientificSignificance: 'Provides global 3D morphological context for lunar volcanic structures, collapse pits, and crater impact kinematics.',
        sampleObservationsCount: 4200,
        officialRefUrl: 'https://www.issdc.gov.in'
      },
      {
        id: 'iirs',
        name: 'IIRS',
        fullName: 'Imaging Infrared Spectrometer',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 16.5,
        powerWatts: 35,
        wavelengthOrBand: '0.8 - 5.0 µm (256 spectral bands)',
        principle: 'Hyperspectral imaging spectrometer with active Stirling cooler.',
        howItWorks: 'Captures reflected and thermally emitted NIR radiance to measure hydration features, specifically the 2.8 - 3.2 µm band.',
        dataProduced: 'Hyperspectral datacubes measuring reflectance vs wavelength at 80 m spatial resolution.',
        scientificSignificance: 'Provided first unambiguous discrimination between OH (hydroxyl) and molecular H2O across wide lunar latitudes.',
        sampleObservationsCount: 950,
        officialRefUrl: 'https://pradan.issdc.gov.in/ch2/'
      },
      {
        id: 'dfsar',
        name: 'DFSAR',
        fullName: 'Dual Frequency Synthetic Aperture Radar',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 85.0,
        powerWatts: 250,
        wavelengthOrBand: 'L-band (1.25 GHz) and S-band (2.5 GHz)',
        principle: 'Polarimetric active radar sounding penetrating up to 5 meters into lunar regolith.',
        howItWorks: 'Transmits microwave pulses and measures backscattered polarimetric return in both circular and linear modes.',
        dataProduced: 'Circular Polarization Ratio (CPR) maps identifying roughness vs volume scattering from subsurface ice.',
        scientificSignificance: 'Unprecedented penetration into permanently shadowed regions (PSRs) at lunar poles to map subsurface water ice.',
        sampleObservationsCount: 620,
        officialRefUrl: 'https://www.isro.gov.in/chandrayaan2_dfsar.html'
      }
    ],
    milestones: [
      { id: 'cm1', date: '2019-07-22', title: 'Launch on GSLV Mk III', description: 'Injected into 170 × 45,475 km orbit with pinpoint accuracy.', phase: 'Launch' },
      { id: 'cm2', date: '2019-08-20', title: 'Lunar Orbit Insertion', description: 'Orbiter entered 114 × 18,072 km lunar orbit after 1730s burn.', phase: 'Insertion' },
      { id: 'cm3', date: '2019-09-01', title: '100 km Circular Orbit', description: 'Final orbit circularization achieved at 100 × 100 km polar orbit.', phase: 'Operation', isKeyMilestone: true },
      { id: 'cm4', date: '2021-08-01', title: 'Public Data Release', description: 'Over 25,000 scientific observation products released on PRADAN portal.', phase: 'Science', isKeyMilestone: true },
      { id: 'cm5', date: '2023-09-01', title: 'Imaging Chandrayaan-3 Landing', description: 'OHRC successfully captured Vikram lander and Pragyan rover on lunar surface.', phase: 'Science', isKeyMilestone: true }
    ],
    targetBody: 'Moon',
    color: '#38bdf8',
    orbitRadius: 2.2,
    orbitInclination: 90,
    issdcPortalUrl: 'https://www.issdc.gov.in',
    pradanPortalUrl: 'https://pradan.issdc.gov.in/ch2/',
    publicationsCount: 64,
    datasetSizeGb: 1250.0,
    signatureImages: [
      {
        id: 'ch2_sig1',
        url: '/real_images/ch2_ohrc_vikram.webp',
        title: 'Chandrayaan-3 Lander Imaged from Orbit',
        instrument: 'OHRC (Orbiter High Resolution Camera)',
        date: '2023-09-01',
        brief: 'The OHRC camera aboard Chandrayaan-2, orbiting 100 km above the Moon, captured this remarkable image of the Chandrayaan-3 Vikram Lander resting on the lunar south polar surface — 25 cm resolution from space.',
        credit: 'ISRO / SAC Ahmedabad'
      },
      {
        id: 'ch2_sig2',
        url: '/real_images/moon_real_photo.jpg',
        title: 'High-Resolution Lunar Polar Region',
        instrument: 'TMC-2 (Terrain Mapping Camera-2)',
        date: '2021-04-10',
        brief: 'A mosaic of the lunar south polar region composed from multiple TMC-2 stereo passes, revealing the complex interplay of permanently shadowed craters and sunlit ridges that define this scientifically precious terrain.',
        credit: 'ISRO / SAC Ahmedabad / ISSDC'
      }
    ]
  },

  {
    id: 'chandrayaan-1',
    name: 'Chandrayaan-1',
    codeName: 'CH-1 India\'s Maiden Lunar Quest',
    category: 'lunar',
    destination: 'Moon',
    status: 'completed',
    statusBadge: 'Mission Completed (Historic)',
    launchDate: '2008-10-22T06:22:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-C11',
    duration: '312 days (October 2008 – August 2009)',
    tagline: 'Discovered widespread water molecules on the Moon, reshaping planetary science forever.',
    description: 'India\'s historic first deep-space mission launched in 2008 carrying 11 scientific instruments from ISRO, NASA, and ESA. It permanently overturned the centuries-old dogma that the Moon was bone-dry, proving the existence of lunar water and hydroxyl molecules and releasing the Moon Impact Probe (MIP) bearing the Indian tricolor.',
    primaryObjectives: [
      'Chemical, mineralogical, and photo-geological mapping of lunar surface.',
      'Search for water-ice in lunar polar regions.',
      'Surface elemental abundance mapping with X-ray fluorescence.',
      'Release Moon Impact Probe (MIP) with Indian flag onto lunar South Pole.'
    ],
    keyDiscoveries: [
      'Discovery of widespread water molecules (H2O) and hydroxyl (OH) on the lunar surface by NASA\'s M3 payload and ISRO\'s MIP.',
      'Detection of sub-surface water signatures directly above Shackleton Crater by MIP CHACE mass spectrometer.',
      'First discovery of lunar caves (lava tubes) in Oceanus Procellarum, viable shelters for future human habitats.',
      'Detection of Magnesium, Aluminium, Silicon, and Iron in lunar highlands using C1XS X-ray spectrometer.'
    ],
    specs: {
      craftType: 'Orbiter',
      dryMassKg: 523,
      launchMassKg: 1380,
      payloadMassKg: 110,
      dimensionsMeters: '1.5 × 1.5 × 1.5 m cube',
      powerSource: 'Single solar array wing (700W) and Li-ion battery',
      powerOutputWatts: 700,
      propulsion: '440N Liquid Apogee Motor (LAM) + 8 × 22N RCS',
      stabilization: '3-axis stabilized using reaction wheels and star sensors',
      communicationBands: 'X-band, S-band',
      operationalLifetime: '312 days (completed 3,400+ lunar orbits)',
      orbitType: 'Circular Lunar Polar Orbit (100 km / 200 km)',
      periapsisKm: 100,
      apoapsisKm: 100,
      inclinationDeg: 90.0,
      orbitalPeriodMin: 118
    },
    instruments: [
      {
        id: 'm3',
        name: 'M3',
        fullName: 'Moon Mineralogy Mapper (ISRO / NASA payload)',
        leadInstitution: 'NASA JPL / Brown University / ISRO',
        wavelengthOrBand: '430 - 3000 nm (260 spectral bands)',
        principle: 'High-resolution imaging spectrometer measuring absorption characteristics of lunar minerals.',
        howItWorks: 'Analyzed sunlight reflected from lunar surface, discovering diagnostic absorption band at 2.8 - 3.0 microns indicating O-H and H-O-H bonds.',
        dataProduced: 'Hyperspectral datacubes proving water and hydroxyl distribution on sunlit Moon.',
        scientificSignificance: 'Overturned 40 years of scientific consensus, confirming lunar surface hydration.',
        sampleObservationsCount: 1200,
        officialRefUrl: 'https://pds.nasa.gov/'
      },
      {
        id: 'mip',
        name: 'MIP',
        fullName: 'Moon Impact Probe',
        leadInstitution: 'ISRO VSSC, Thiruvananthapuram',
        massKg: 34.0,
        powerWatts: 15,
        principle: 'Separable impact probe deployed from 100 km orbit to strike South Pole near Shackleton crater.',
        howItWorks: 'Descended over 25 minutes, capturing 3,100 video frames and sampling lunar exosphere with CHACE quadrupole mass spectrometer before impact.',
        dataProduced: 'Continuous mass spectra (amu 1 to 100) along vertical descent path.',
        scientificSignificance: 'Recorded water vapor mass signature (amu 18) directly above the lunar south pole prior to impact.',
        sampleObservationsCount: 310,
        officialRefUrl: 'https://www.isro.gov.in'
      }
    ],
    milestones: [
      { id: 'ch1_m1', date: '2008-10-22', title: 'Launch on PSLV-C11', description: 'Maiden lunar liftoff from Sriharikota.', phase: 'Launch' },
      { id: 'ch1_m2', date: '2008-11-08', title: 'Lunar Orbit Insertion', description: 'India entered lunar orbit for the first time.', phase: 'Insertion', isKeyMilestone: true },
      { id: 'ch1_m3', date: '2008-11-14', title: 'MIP Strikes Lunar South Pole', description: 'Moon Impact Probe landed with Indian flag near Shackleton crater (Jawahar Point).', phase: 'Landing', isKeyMilestone: true },
      { id: 'ch1_m4', date: '2009-09-24', title: 'Water on Moon Announcement', description: 'ISRO and NASA officially announced discovery of water molecules on the Moon.', phase: 'Science', isKeyMilestone: true }
    ],
    targetBody: 'Moon',
    color: '#94a3b8',
    orbitRadius: 2.8,
    orbitInclination: 90,
    issdcPortalUrl: 'https://www.issdc.gov.in',
    publicationsCount: 110,
    datasetSizeGb: 315.0,
    signatureImages: [
      {
        id: 'ch1_sig1',
        url: '/real_images/ch1_m3_water_map.jpg',
        title: 'Water Molecule Distribution Map — The Moon',
        instrument: "M3 — Moon Mineralogy Mapper (NASA/ISRO)",
        date: '2009-09-24',
        brief: 'The historic false-color M3 map showing widespread distribution of water molecules (H₂O) and hydroxyl (OH) groups across the sunlit lunar surface, overturning four decades of scientific consensus that the Moon was completely dry.',
        credit: 'NASA / ISRO / Brown University'
      },
      {
        id: 'ch1_sig2',
        url: '/real_images/moon_real_photo.jpg',
        title: 'Lunar Polar Craters — M3 Mapping Survey',
        instrument: "M3 / TMC Chandrayaan-1",
        date: '2008-12-15',
        brief: 'High-resolution imaging of the lunar polar region from Chandrayaan-1 during its 100 km mapping orbit, capturing permanently shadowed craters that harbor the water ice later confirmed by M3 spectroscopy.',
        credit: 'ISRO / ISSDC'
      }
    ]
  },

  {
    id: 'chandrayaan-4',
    name: 'Chandrayaan-4 (LUPEX / Sample Return)',
    codeName: 'CH-4 Lunar Sample Return Architecture',
    category: 'lunar',
    destination: 'Moon',
    status: 'planned',
    statusBadge: 'Planned (Approved by Union Cabinet)',
    launchDate: '2028-09-01T00:00:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'LVM3 (Two Launches + Space Docking)',
    duration: 'Multi-phase mission: Surface drilling, sample collection, lunar ascent, docking & return',
    tagline: 'Ambitious 5-module lunar sample return mission to bring south pole regolith to Earth.',
    description: 'Officially approved by the Union Cabinet in September 2024, Chandrayaan-4 will perform autonomous drilling and collect lunar samples near the South Pole, launch an Ascender Module from the Moon, autonomously dock in lunar orbit, and return lunar regolith safely to Earth in a Re-entry Module.',
    primaryObjectives: [
      'Perform safe, soft landing on lunar south polar region with sub-surface coring drill.',
      'Collect, hermetically seal, and store 2 to 3 kg of pristine lunar polar regolith and ice.',
      'Perform first-ever Indian rocket ascent from the lunar surface.',
      'Demonstrate autonomous rendezvous and docking in lunar orbit.',
      'Safe atmospheric re-entry and touchdown of the Sample Return Capsule in India.'
    ],
    keyDiscoveries: [
      'PLANNED: Direct geochemical and isotopic laboratory analysis of cryogenic lunar south polar ice.',
      'PLANNED: Verification of volatile trapped gases and primordial Solar System history.'
    ],
    specs: {
      craftType: 'Lander',
      dryMassKg: 2850,
      launchMassKg: 8500,
      payloadMassKg: 350,
      dimensionsMeters: '5 Modular assemblies: Descender, Ascender, Transfer, Re-entry, Propulsion Modules',
      powerSource: 'Advanced high-efficiency triple-junction solar panels + regenerative fuel cell backup',
      powerOutputWatts: 1500,
      propulsion: 'Bi-propellant MMH/MON3 throttlable lander engines + Ascender hypergolic engine',
      stabilization: 'Autonomous optical terrain relative navigation (TRN) + LIDAR guidance',
      communicationBands: 'X-band, Ka-band high-throughput links with IDSN Byalalu',
      operationalLifetime: '1 Lunar Day surface collection + 6-month return transit',
      orbitType: 'Polar lunar landing site at ~89° S near permanently shadowed craters',
      periapsisKm: 0,
      apoapsisKm: 0,
      inclinationDeg: 89.0,
      orbitalPeriodMin: 0
    },
    instruments: [
      {
        id: 'coring-drill',
        name: 'CRYO-DRILL',
        fullName: 'Cryogenic Sub-surface Core Drill & Caching System',
        leadInstitution: 'ISRO URSC / LEOS',
        principle: 'Rotary-percussive drill penetrating up to 2 meters while maintaining cryogenic temperatures.',
        howItWorks: 'Drills into consolidated polar regolith, collects stratified core samples, and transfers them into vacuum-sealed canisters.',
        dataProduced: 'Drilling torque, resistance telemetry, and sample volume quantification.',
        scientificSignificance: 'Ensures volatile water-ice and organic compounds do not sublime during extraction.',
        sampleObservationsCount: 0,
        officialRefUrl: 'https://www.isro.gov.in'
      }
    ],
    milestones: [
      { id: 'ch4_m1', date: '2024-09-18', title: 'Cabinet Approval Granted', description: 'Government of India sanctioned ₹2,104 crore budget for Chandrayaan-4.', phase: 'Milestone', isKeyMilestone: true },
      { id: 'ch4_m2', date: '2028-09-01 (Target)', title: 'Target Launch', description: 'Two LVM3 launches carrying Descender/Ascender and Transfer/Re-entry modules.', phase: 'Launch' }
    ],
    targetBody: 'Moon',
    color: '#a855f7',
    orbitRadius: 3.2,
    orbitInclination: 89,
    publicationsCount: 8,
    datasetSizeGb: 0
  },

  // --- MARS EXPLORATION ---
  {
    id: 'mangalyaan-1',
    name: 'Mars Orbiter Mission (Mangalyaan)',
    codeName: 'MOM-1 India\'s Red Planet Odyssey',
    category: 'mars',
    destination: 'Mars',
    status: 'completed',
    statusBadge: 'Historic Success (8 Years of Data)',
    launchDate: '2013-11-05T14:38:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-XL C25',
    duration: '8 years (September 2014 – April 2022; designed for 6 months)',
    tagline: 'First Asian nation to reach Mars, and first in the world to succeed on its maiden attempt.',
    description: 'The Mars Orbiter Mission (MOM), unofficially known as Mangalyaan, was India\'s first interplanetary mission. Achieving Mars Orbit Insertion on 24 September 2014 on its first attempt, it operated for an astonishing 8 years in an elliptical orbit, beaming back thousands of high-resolution full-disk colour images and atmospheric measurements.',
    primaryObjectives: [
      'Design and realize an interplanetary spacecraft capable of surviving 300-day deep space transit.',
      'Demonstrate deep space autonomous navigation, orbit insertion burn, and contingency recovery.',
      'Explore Martian surface morphology, mineralogy, and atmospheric composition using 5 indigenous payloads.',
      'Image Mars global surface and moons Phobos and Deimos from high-apocentre vantage.'
    ],
    keyDiscoveries: [
      'Full-disk true-colour global maps of Mars captured from MOM\'s unique high-apocentre elliptical orbit.',
      'First discovery of supersonic solar wind escape and exospheric neutral density variation via MENA.',
      'Comprehensive imaging of massive Olympus Mons caldera and Valles Marineris canyon complex.',
      'Observation of dynamic regional dust storms on Mars and their impact on atmospheric thermal structure.',
      'High-resolution imaging of Martian moon Phobos far side and transit across Mars.'
    ],
    specs: {
      craftType: 'Orbiter',
      dryMassKg: 475,
      launchMassKg: 1337,
      payloadMassKg: 15,
      dimensionsMeters: '1.5 × 1.5 × 1.5 m cube with 3 solar panels (total span 4.2 m)',
      powerSource: 'Three solar array panels generating 840W at Mars; 36 Ah Li-ion battery',
      powerOutputWatts: 840,
      propulsion: '440N Liquid Apogee Motor (LAM) + 8 × 22N RCS bipropellant thrusters',
      stabilization: '3-axis stabilized using 4 reaction wheels and 2 star sensors',
      communicationBands: 'S-band telemetry, X-band science data via 2.2 m high-gain parabolic antenna',
      operationalLifetime: '8 years (exceeded 6-month design life by 16x!)',
      orbitType: 'Highly elliptical Mars orbit (periapsis 421 km, apoapsis 76,993 km)',
      periapsisKm: 421,
      apoapsisKm: 76993,
      inclinationDeg: 150.0,
      orbitalPeriodMin: 4368
    },
    instruments: [
      {
        id: 'mcc',
        name: 'MCC',
        fullName: 'Mars Colour Camera',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 1.4,
        powerWatts: 4,
        wavelengthOrBand: 'RGB Bayer pattern (400 - 700 nm)',
        principle: 'Tri-colour optical camera with 2048 × 2048 pixel detector and wide-angle optics.',
        howItWorks: 'Takes snapshots ranging from 19 m/pixel resolution at periapsis to 4 km/pixel at apoapsis, capturing both macro dust storms and micro gullies.',
        dataProduced: 'Full-disk Mars images, regional geological mosaics, and Phobos/Deimos stereo images.',
        scientificSignificance: 'Produced the most visually stunning global images of Mars ever published, featuring on National Geographic covers worldwide.',
        sampleObservationsCount: 1100,
        officialRefUrl: 'https://www.issdc.gov.in/mom.html'
      },
      {
        id: 'mena',
        name: 'MENA',
        fullName: 'Mars Exospheric Neutral Analyser',
        leadInstitution: 'Space Physics Laboratory (SPL) / VSSC, Thiruvananthapuram',
        massKg: 4.0,
        powerWatts: 6,
        principle: 'Time-of-flight mass spectrometer measuring energetic neutral atoms (ENAs).',
        howItWorks: 'Detects hydrogen and oxygen atoms escaping the upper atmosphere of Mars due to solar wind stripping.',
        dataProduced: 'Neutral exospheric density vs altitude profiles and atom flux energy distributions.',
        scientificSignificance: 'Revealed that neutral hydrogen escape rate is strongly correlated with Martian dust storm cycles.',
        sampleObservationsCount: 380,
        officialRefUrl: 'https://www.issdc.gov.in'
      },
      {
        id: 'lap',
        name: 'LAP',
        fullName: 'Lyman Alpha Photometer',
        leadInstitution: 'Laboratory for Electro-Optics Systems (LEOS), Bengaluru',
        massKg: 1.5,
        powerWatts: 3,
        wavelengthOrBand: '121.6 nm (Hydrogen) and 121.5 nm (Deuterium)',
        principle: 'Pure UV photometer with magnesium fluoride optics measuring D/H ratio in upper atmosphere.',
        howItWorks: 'Measures resonance scattering of solar Lyman-alpha radiation by atomic hydrogen and deuterium.',
        dataProduced: 'Deuterium to Hydrogen (D/H) isotopic ratio in Mars exosphere.',
        scientificSignificance: 'Helps determine the total quantity of water lost by Mars over its 4-billion-year geological evolution.',
        sampleObservationsCount: 420,
        officialRefUrl: 'https://www.isro.gov.in'
      },
      {
        id: 'tis',
        name: 'TIS',
        fullName: 'Thermal Infrared Imaging Spectrometer',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 3.2,
        powerWatts: 6,
        wavelengthOrBand: '7 - 13 µm',
        principle: 'Microbolometer array measuring thermal emission from the Martian surface.',
        howItWorks: 'Measures diurnal thermal inertia of surface rocks, distinguishing loose dust from consolidated bedrock.',
        dataProduced: 'Surface temperature maps (Kelvin) and thermal inertia distributions.',
        scientificSignificance: 'Enabled mineralogical mapping of volcanic basalt deposits and clay minerals across Martian craters.',
        sampleObservationsCount: 510,
        officialRefUrl: 'https://www.issdc.gov.in'
      }
    ],
    milestones: [
      { id: 'mom_m1', date: '2013-11-05', title: 'Launch on PSLV-XL C25', description: 'Flawless injection into Earth elliptical orbit.', phase: 'Launch' },
      { id: 'mom_m2', date: '2013-11-30', title: 'Trans-Mars Injection (TMI)', description: '440N engine fired to slingshot Mangalyaan out of Earth gravity towards Mars.', phase: 'Trajectory', isKeyMilestone: true },
      { id: 'mom_m3', date: '2014-09-24 07:17 IST', title: 'Mars Orbit Insertion (MOI)', description: 'Historic 1,388-second burn inserted craft into Mars elliptical orbit on first attempt.', phase: 'Insertion', isKeyMilestone: true },
      { id: 'mom_m4', date: '2014-10-19', title: 'Comet Siding Spring Flyby', description: 'Safely observed close flyby of Comet C/2013 A1 near Mars.', phase: 'Science' },
      { id: 'mom_m5', date: '2018-09-24', title: '4 Years in Mars Orbit', description: 'Completed 1,000+ orbits and released Mars Atlas containing 980+ images.', phase: 'Milestone', isKeyMilestone: true },
      { id: 'mom_m6', date: '2022-10-02', title: 'Mission Officially Concluded', description: 'Contact lost after 8 years of operation following eclipse passage.', phase: 'Milestone' }
    ],
    targetBody: 'Mars',
    color: '#ef4444',
    orbitRadius: 4.8,
    orbitInclination: 150,
    orbitEccentricity: 0.88,
    issdcPortalUrl: 'https://www.issdc.gov.in/mom.html',
    publicationsCount: 92,
    datasetSizeGb: 780.0,
    signatureImages: [
      {
        id: 'mom_sig1',
        url: '/real_images/mom_mars_fulldisk.png',
        title: 'Full Disk of Mars — MOM Global View',
        instrument: 'MCC (Mars Colour Camera)',
        date: '2015-09-28',
        brief: 'One of the most iconic full-disk colour images of Mars ever published, captured by MOM\'s Mars Colour Camera from its unique high-apocentre vantage point at 76,993 km — no other spacecraft provided this synoptic global view in 2014-2022.',
        credit: 'ISRO / SAC Ahmedabad / ISSDC'
      }
    ]
  },

  // --- SOLAR EXPLORATION ---
  {
    id: 'aditya-l1',
    name: 'Aditya-L1',
    codeName: 'First Indian Sun Observatory at L1',
    category: 'solar',
    destination: 'Sun-Earth L1',
    status: 'active',
    statusBadge: 'Active at Lagrange Point 1',
    launchDate: '2023-09-02T11:50:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-C57 (XL Configuration)',
    duration: '5+ years nominal mission life (active currently)',
    tagline: 'Continuous, unocculted vantage point of the Sun from 1.5 million km Sun-ward halo orbit.',
    description: 'Aditya-L1 is India\'s first dedicated solar observatory mission. Orbiting around the first Sun-Earth Lagrangian Point (L1), 1.5 million km from Earth, it enjoys an uninterrupted, 24/7 view of the Sun without eclipses, studying coronal mass ejections, solar flares, solar wind acceleration, and space weather dynamics.',
    primaryObjectives: [
      'Observe solar dynamics: Coronal Mass Ejections (CMEs), solar flares, and chromospheric eruptions.',
      'Solve the coronal heating paradox: Why the Sun\'s corona is over 1 million Kelvin while its surface is 6,000 Kelvin.',
      'Perform in-situ particle and magnetic field measurements of the solar wind in interplanetary space.',
      'Provide early warning alerts for severe geomagnetic storms approaching Earth.'
    ],
    keyDiscoveries: [
      'Captured first full-disk solar ultraviolet images (200-400 nm) showing magnetic active regions and plage networks by SUIT.',
      'Observed May 2024 severe geomagnetic superstorms (G5 class), recording solar wind speed jumps exceeding 750 km/s and intense coronal plasma compression.',
      'Continuous spectroscopy and spectropolarimetry of the solar corona down to 1.05 solar radii by VELC.',
      'High-cadence monitoring of solar flare hard and soft X-ray emissions by HEL1OS and SoLEXS.',
      'In-situ detection of high-energy interplanetary proton flux events during X-class solar flares by ASPEX.'
    ],
    specs: {
      craftType: 'Solar Observatory',
      dryMassKg: 780,
      launchMassKg: 1475,
      payloadMassKg: 244,
      dimensionsMeters: '3.6 × 2.0 × 2.0 m with two steerable solar array wings',
      powerSource: 'Dual solar array wings generating 1600W; 48 Ah Li-ion batteries',
      powerOutputWatts: 1600,
      propulsion: '440N Liquid Apogee Motor + 8 × 22N RCS bipropellant thrusters for halo orbit maintenance',
      stabilization: 'High-precision 3-axis stabilized (0.1 arcsec pointing jitter for solar telescope)',
      communicationBands: 'X-band data downlink (up to 40 Mbps), S-band telemetry with IDSN and NASA DSN',
      operationalLifetime: '5+ years (active currently)',
      orbitType: 'Halo orbit around Sun-Earth Lagrangian Point L1 (~1.5M km from Earth)',
      periapsisKm: 1450000,
      apoapsisKm: 1550000,
      inclinationDeg: 12.5,
      orbitalPeriodMin: 256320 // ~178 days halo period
    },
    instruments: [
      {
        id: 'velc',
        name: 'VELC',
        fullName: 'Visible Emission Line Coronagraph',
        leadInstitution: 'Indian Institute of Astrophysics (IIA), Bengaluru',
        massKg: 170.0,
        powerWatts: 110,
        wavelengthOrBand: '530.3 nm (Green line Fe XIV), 637.4 nm (Red line Fe X), 1074.7 nm (Fe XIII)',
        principle: 'Internally occulted coronagraph creating artificial solar eclipse inside the telescope.',
        howItWorks: 'Blocks the blinding light of the solar disk with high-precision occulting cones, allowing ultra-sensitive imaging and spectroscopy of the faint corona from 1.05 to 3.0 solar radii.',
        dataProduced: 'High-cadence corona movies, line profiles, and coronal magnetic field measurements.',
        scientificSignificance: 'Closest coronal observation to the solar limb of any operating space coronagraph worldwide.',
        sampleObservationsCount: 4500,
        officialRefUrl: 'https://www.iiap.res.in/velc'
      },
      {
        id: 'suit',
        name: 'SUIT',
        fullName: 'Solar Ultraviolet Imaging Telescope',
        leadInstitution: 'Inter-University Centre for Astronomy and Astrophysics (IUCAA), Pune',
        massKg: 35.0,
        powerWatts: 42,
        wavelengthOrBand: '200 - 400 nm (11 narrowband and broadband filters)',
        principle: 'Off-axis Ritchey-Chrétien UV telescope with ultra-clean filters and 4K × 4K CCD.',
        howItWorks: 'Takes full-disk images of the Sun across 11 discrete UV wavelengths, revealing the connection between the photosphere and chromosphere.',
        dataProduced: '2048 × 2048 and 4096 × 4096 calibrated UV solar disk images and radiance maps.',
        scientificSignificance: 'Measures solar spectral irradiance variations that drive photochemistry in Earth\'s ozone layer.',
        sampleObservationsCount: 7800,
        officialRefUrl: 'https://suit.iucaa.in'
      },
      {
        id: 'aspex',
        name: 'ASPEX',
        fullName: 'Aditya Solar wind Particle Experiment',
        leadInstitution: 'Physical Research Laboratory (PRL), Ahmedabad',
        massKg: 18.0,
        powerWatts: 25,
        principle: 'Dual sensor electrostatic analyzer (SWIS) + energetic particle spectrometer (STEPS).',
        howItWorks: 'Measures solar wind protons and alpha particles from 100 eV up to 5 MeV, quantifying flux, velocity, and temperature anisotropy.',
        dataProduced: 'Proton and alpha particle energy distribution spectra, bulk velocity (km/s), and density (#/cm³).',
        scientificSignificance: 'Directly samples coronal mass ejection plasma gusts hitting the spacecraft before reaching Earth.',
        sampleObservationsCount: 12500,
        officialRefUrl: 'https://www.prl.res.in'
      },
      {
        id: 'solexs',
        name: 'SoLEXS',
        fullName: 'Solar Low Energy X-ray Spectrometer',
        leadInstitution: 'U R Rao Satellite Centre (URSC), Bengaluru',
        massKg: 8.5,
        powerWatts: 14,
        wavelengthOrBand: '1 - 22 keV (Soft X-rays)',
        principle: 'Silicon drift detector with high energy resolution (<160 eV at 5.9 keV).',
        howItWorks: 'Measures full-disk soft X-ray flux of solar flares without saturation even during extreme X-class flares.',
        dataProduced: 'X-ray flare light curves (counts/sec) and thermal coronal spectra.',
        scientificSignificance: 'Quantifies coronal elemental abundances (Mg, Si, S, Ar, Ca, Fe) during flare plasma heating.',
        sampleObservationsCount: 3100,
        officialRefUrl: 'https://www.isro.gov.in'
      },
      {
        id: 'hel1os',
        name: 'HEL1OS',
        fullName: 'High Energy L1 Orbiting X-ray Spectrometer',
        leadInstitution: 'U R Rao Satellite Centre (URSC), Bengaluru',
        massKg: 12.0,
        powerWatts: 18,
        wavelengthOrBand: '10 - 150 keV (Hard X-rays)',
        principle: 'Cadmium Zinc Telluride (CZT) and Cadmium Telluride (CdTe) semiconductor detectors.',
        howItWorks: 'Captures non-thermal bremsstrahlung radiation emitted by relativistic electrons accelerated during solar flares.',
        dataProduced: 'Hard X-ray energy spectra and millisecond timing light curves.',
        scientificSignificance: 'Pinpoints the exact time and energy distribution of particle acceleration in solar magnetic reconnection.',
        sampleObservationsCount: 2200,
        officialRefUrl: 'https://www.isro.gov.in'
      },
      {
        id: 'mag',
        name: 'MAG',
        fullName: 'Fluxgate Magnetometer',
        leadInstitution: 'Laboratory for Electro-Optics Systems (LEOS), Bengaluru',
        massKg: 4.5,
        powerWatts: 6,
        principle: 'Dual fluxgate sensors mounted on a 6-meter deployable boom.',
        howItWorks: 'Measures magnitude and vector direction of interplanetary magnetic field (IMF) in nanotesla (nT).',
        dataProduced: '3-axis magnetic field components (Bx, By, Bz) sampled at 8 Hz.',
        scientificSignificance: 'Detects IMF southward orientation (Bz < 0) that triggers severe magnetic reconnection with Earth\'s magnetosphere.',
        sampleObservationsCount: 98000,
        officialRefUrl: 'https://www.isro.gov.in'
      }
    ],
    milestones: [
      { id: 'ad1_m1', date: '2023-09-02', title: 'Launch on PSLV-C57', description: 'Liftoff from Sriharikota into 235 × 19,500 km elliptical orbit.', phase: 'Launch' },
      { id: 'ad1_m2', date: '2023-09-19', title: 'Trans-Lagrangian 1 Injection', description: 'Spacecraft fired thrusters, leaving Earth gravity bound for Sun-Earth L1.', phase: 'Trajectory' },
      { id: 'ad1_m3', date: '2024-01-06 16:17 IST', title: 'Halo Orbit Insertion at L1', description: 'Successfully inserted into halo orbit around L1 point, 1.5 million km from Earth.', phase: 'Insertion', isKeyMilestone: true },
      { id: 'ad1_m4', date: '2024-05-10', title: 'Historic Solar Superstorm Capture', description: 'Recorded intense X-flares and coronal ejection during the historic May 2024 solar storm.', phase: 'Science', isKeyMilestone: true }
    ],
    targetBody: 'Sun',
    color: '#f59e0b',
    orbitRadius: 1.5,
    orbitInclination: 12.5,
    issdcPortalUrl: 'https://www.issdc.gov.in/aditya-l1.html',
    publicationsCount: 24,
    datasetSizeGb: 920.0,
    signatureImages: [
      {
        id: 'adl1_sig1',
        url: '/real_images/aditya_suit_sun_uv1.png',
        title: 'First Full-Disk Solar UV Image',
        instrument: 'SUIT (Solar Ultraviolet Imaging Telescope)',
        date: '2023-12-06',
        brief: 'The very first full-disk solar image in the ultraviolet band captured by SUIT — India\'s first space-based UV image of the Sun. The image reveals bright chromospheric plages, active magnetic regions, and dark sunspot umbrae in unprecedented UV detail.',
        credit: 'IUCAA Pune / ISRO / Aditya-L1 Mission'
      },
      {
        id: 'adl1_sig2',
        url: '/real_images/aditya_suit_sun_uv2.png',
        title: 'Solar Active Region in Near-UV',
        instrument: 'SUIT (Solar Ultraviolet Imaging Telescope)',
        date: '2024-02-14',
        brief: 'A zoomed SUIT observation of a complex solar active region (NOAA AR3576) showing coronal bright points, chromospheric fibrils, and a sunspot group — the magnetic architecture responsible for eruptions observed during the May 2024 superstorm.',
        credit: 'IUCAA Pune / ISRO / Aditya-L1 Mission'
      }
    ]
  },

  // --- SPACE ASTRONOMY ---
  {
    id: 'astrosat',
    name: 'AstroSat',
    codeName: 'India\'s Multi-Wavelength Space Observatory',
    category: 'astronomy',
    destination: 'Earth Orbit',
    status: 'active',
    statusBadge: 'Active Space Observatory (9+ Years)',
    launchDate: '2015-09-28T10:00:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-C30',
    duration: '9+ years operational (designed for 5 years; active currently)',
    tagline: 'India\'s first dedicated multi-wavelength space telescope observing from optical to hard X-rays.',
    description: 'AstroSat is India\'s premier dedicated multi-wavelength space observatory. It enables simultaneous observations of celestial bodies across ultraviolet, optical, soft X-ray, and hard X-ray bands using five co-aligned instruments, revolutionizing studies of black hole binaries, neutron stars, pulsars, and starburst galaxies.',
    primaryObjectives: [
      'Multi-wavelength simultaneous observation of active galactic nuclei, binary pulsars, and supernova remnants.',
      'Measure magnetic fields of neutron stars through cyclotron absorption line features.',
      'Perform high-energy X-ray timing studies to measure black hole spin rates.',
      'High-resolution ultraviolet deep sky imaging of star formation in nearby and distant galaxies.'
    ],
    keyDiscoveries: [
      'Measured near-maximal spin rate of the stellar-mass black hole in 4U 1630-47 (~0.98 of maximum possible rate).',
      'Discovered extreme-UV emission from a starburst galaxy 9.3 billion light-years away (AUDFs01) using UVIT.',
      'Discovered high-energy polarization and cyclotron resonance features in Crab Pulsar and binary pulsar Hercules X-1.',
      'Simultaneous multi-band coverage of black hole binary Cygnus X-1 revealing relativistic jet ejection physics.'
    ],
    specs: {
      craftType: 'Space Telescope',
      dryMassKg: 780,
      launchMassKg: 1513,
      payloadMassKg: 750,
      dimensionsMeters: '1.96 × 1.75 × 1.30 m with deployable solar arrays',
      powerSource: 'Two solar panels producing 2100W; dual 36 Ah Li-ion batteries',
      powerOutputWatts: 2100,
      propulsion: 'RCS mono-propellant hydrazine thrusters for momentum unloading',
      stabilization: 'High-precision 3-axis stabilization (pointing accuracy <0.05 arcsec)',
      communicationBands: 'X-band science downlink (105 Mbps), S-band telemetry',
      operationalLifetime: '9+ years (active currently)',
      orbitType: 'Low Earth Orbit (650 km altitude, 6° inclination)',
      periapsisKm: 650,
      apoapsisKm: 650,
      inclinationDeg: 6.0,
      orbitalPeriodMin: 97.7
    },
    instruments: [
      {
        id: 'uvit',
        name: 'UVIT',
        fullName: 'Ultraviolet Imaging Telescope',
        leadInstitution: 'IIA Bengaluru / IUCAA Pune / TIFR Mumbai',
        massKg: 230.0,
        powerWatts: 90,
        wavelengthOrBand: 'FUV (130-180 nm), NUV (200-300 nm), Visible (320-550 nm)',
        principle: 'Twin Ritchey-Chrétien telescopes with photon-counting MCP detectors.',
        howItWorks: 'Images celestial objects simultaneously in Far-UV, Near-UV, and Visible bands with spatial resolution of ~1.2 arcseconds.',
        dataProduced: 'Deep-sky UV calibrated photon lists and astrometric FITS image files.',
        scientificSignificance: 'Superior spatial resolution to NASA\'s GALEX telescope; resolved star-forming clusters in Andromeda (M31).',
        sampleObservationsCount: 3400,
        officialRefUrl: 'https://uvit.iiap.res.in'
      },
      {
        id: 'laxpc',
        name: 'LAXPC',
        fullName: 'Large Area X-ray Proportional Counter',
        leadInstitution: 'Tata Institute of Fundamental Research (TIFR), Mumbai',
        massKg: 414.0,
        powerWatts: 65,
        wavelengthOrBand: '3 - 80 keV (X-rays)',
        principle: 'Three identical multi-layer proportional counters filled with Xenon-Methane gas.',
        howItWorks: 'Provides massive collecting area (~6000 cm²) and microsecond timing resolution to track rapid periodic pulses and quasi-periodic oscillations (QPOs).',
        dataProduced: 'High-resolution light curves, fast Fourier transform power spectra, and energy spectra.',
        scientificSignificance: 'World\'s highest effective area for hard X-ray timing in 30-80 keV band.',
        sampleObservationsCount: 5200,
        officialRefUrl: 'https://www.tifr.res.in/~laxpc'
      },
      {
        id: 'czti',
        name: 'CZTI',
        fullName: 'Cadmium Zinc Telluride Imager',
        leadInstitution: 'Tata Institute of Fundamental Research (TIFR), Mumbai',
        massKg: 56.0,
        powerWatts: 45,
        wavelengthOrBand: '10 - 150 keV (Hard X-rays)',
        principle: 'Solid-state CZT semiconductor pixel array with coded aperture mask.',
        howItWorks: 'Measures X-ray emission and Compton scattering polarization of Gamma-Ray Bursts (GRBs) and pulsars.',
        dataProduced: 'Hard X-ray images, GRB localization alerts, and polarization percentage.',
        scientificSignificance: 'Detected over 600 cosmic Gamma-Ray Bursts and measured hard X-ray polarization of the Crab Nebula.',
        sampleObservationsCount: 12000,
        officialRefUrl: 'http://astrosat.iucaa.in/czti'
      }
    ],
    milestones: [
      { id: 'as_m1', date: '2015-09-28', title: 'Liftoff on PSLV-C30', description: 'Injected into 650 km, 6° inclination equatorial orbit.', phase: 'Launch' },
      { id: 'as_m2', date: '2015-10-06', title: 'First Light for CZTI', description: 'CZTI detected first Crab Nebula X-ray photons.', phase: 'Science' },
      { id: 'as_m3', date: '2020-09-28', title: '5 Years of Discoveries', description: 'Over 1,500 celestial targets observed, exceeding mission life.', phase: 'Milestone', isKeyMilestone: true }
    ],
    targetBody: 'Earth',
    color: '#818cf8',
    orbitRadius: 1.3,
    orbitInclination: 6,
    issdcPortalUrl: 'https://www.issdc.gov.in/astrosat.html',
    publicationsCount: 310,
    datasetSizeGb: 2850.0,
    signatureImages: [
      {
        id: 'astro_sig1',
        url: '/real_images/astrosat_crab_nebula.jpg',
        title: 'Crab Nebula — Multi-Wavelength X-ray Portrait',
        instrument: 'CZTI / LAXPC (Cadmium Zinc Telluride Imager / LAXPC)',
        date: '2015-10-06',
        brief: 'AstroSat\'s first-light image of the iconic Crab Nebula pulsar wind nebula, the remnant of a supernova recorded by Chinese astronomers in 1054 AD. CZTI detected hard X-ray polarization of the pulsar beam — a world-class measurement for Indian astronomy.',
        credit: 'TIFR Mumbai / ISRO / AstroSat Science Working Group'
      }
    ]
  },

  {
    id: 'xposat',
    name: 'XPoSat',
    codeName: 'X-ray Polarimeter Satellite',
    category: 'astronomy',
    destination: 'Earth Orbit',
    status: 'active',
    statusBadge: 'Active Science Mission (Polarimetry)',
    launchDate: '2024-01-01T09:10:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-C58',
    duration: '5 years nominal lifetime (active currently)',
    tagline: 'World\'s second dedicated space telescope for polarimetric measurements of cosmic X-ray sources.',
    description: 'XPoSat is India\'s pioneering dedicated space observatory to study the polarization of intense cosmic X-ray sources in the 8-30 keV energy band. Polarimetry adds two crucial new physical dimensions—polarization degree and polarization angle—to conventional timing and spectroscopy, revealing the geometry and magnetic fields of extreme cosmic accelerators.',
    primaryObjectives: [
      'Measure X-ray polarization degree (PD) and angle (PA) of cosmic sources in 8-30 keV range.',
      'Perform simultaneous broad-band temporal and spectral studies in 0.8-15 keV range.',
      'Investigate emission mechanisms and magnetic field geometries in neutron stars, magnetars, and black holes.'
    ],
    keyDiscoveries: [
      'First Indian polarimetric measurements of the Crab Pulsar in the medium-energy X-ray band (8-30 keV).',
      'Observation of bright X-ray transients and measurement of degree of polarization in black hole accretion disk coronae.',
      'Simultaneous timing and polarization variability analysis of binary pulsar GX 1+4.'
    ],
    specs: {
      craftType: 'Space Telescope',
      dryMassKg: 260,
      launchMassKg: 469,
      payloadMassKg: 144,
      dimensionsMeters: '1.3 × 1.3 × 1.2 m cuboid with 2 deployable solar panels',
      powerSource: 'Deployable solar arrays delivering 650W; 24 Ah battery backup',
      powerOutputWatts: 650,
      propulsion: 'Cold-gas reaction control system',
      stabilization: '3-axis stabilized with high-precision star sensors',
      communicationBands: 'X-band science downlink (20 Mbps), S-band telemetry',
      operationalLifetime: '5 years (active currently)',
      orbitType: 'Circular Low Earth Orbit (650 km, 6° inclination)',
      periapsisKm: 650,
      apoapsisKm: 650,
      inclinationDeg: 6.0,
      orbitalPeriodMin: 97.7
    },
    instruments: [
      {
        id: 'polix',
        name: 'POLIX',
        fullName: 'Polarimeter Instrument in X-rays',
        leadInstitution: 'Raman Research Institute (RRI), Bengaluru',
        massKg: 125.0,
        powerWatts: 50,
        wavelengthOrBand: '8 - 30 keV (Medium X-rays)',
        principle: 'Thomson scattering polarimeter with low-Z metallic beryllium scatterer and proportional counters.',
        howItWorks: 'Incoming X-ray photons scatter off an anisotropic beryllium cylinder. Four surrounding proportional counters record azimuthally asymmetric scattering distributions to determine polarization degree and angle.',
        dataProduced: 'Azimuthal scattering modulation curves, Polarization Degree (%), and Polarization Angle (°).',
        scientificSignificance: 'Unique 8-30 keV energy range bridges gap above NASA\'s IXPE (2-8 keV), measuring high-energy non-thermal polarization.',
        sampleObservationsCount: 180,
        officialRefUrl: 'https://www.rri.res.in/POLIX'
      },
      {
        id: 'xspect',
        name: 'XSPECT',
        fullName: 'X-ray Spectroscopy and Timing',
        leadInstitution: 'Space Astronomy Group (SAG) / URSC, Bengaluru',
        massKg: 19.0,
        powerWatts: 15,
        wavelengthOrBand: '0.8 - 15 keV (Soft X-rays)',
        principle: 'Swept Charge Device (SCD) silicon detector with energy resolution <200 eV at 6 keV.',
        howItWorks: 'Observes source simultaneously with POLIX to provide simultaneous spectral parameters (photon index, iron line emission) and timing.',
        dataProduced: '0.8-15 keV energy spectra and light curves with millisecond timing.',
        scientificSignificance: 'Unlocks simultaneous spectral state transitions while polarimetric measurements are integrating.',
        sampleObservationsCount: 320,
        officialRefUrl: 'https://www.isro.gov.in'
      }
    ],
    milestones: [
      { id: 'xp_m1', date: '2024-01-01', title: 'New Year Launch on PSLV-C58', description: 'Flawless launch into 650 km 6-degree orbit.', phase: 'Launch', isKeyMilestone: true },
      { id: 'xp_m2', date: '2024-01-10', title: 'POLIX High Voltage Turned On', description: 'Science operations commenced successfully on Crab Nebula.', phase: 'Science' }
    ],
    targetBody: 'Earth',
    color: '#c084fc',
    orbitRadius: 1.35,
    orbitInclination: 6,
    issdcPortalUrl: 'https://www.issdc.gov.in',
    publicationsCount: 14,
    datasetSizeGb: 190.0
  },

  // --- HUMAN SPACEFLIGHT ---
  {
    id: 'gaganyaan',
    name: 'Gaganyaan',
    codeName: 'India\'s Human Spaceflight Programme',
    category: 'human',
    destination: 'Earth Orbit',
    status: 'planned',
    statusBadge: 'Crewed Flight Planned (2025/2026)',
    launchDate: '2025-12-15T09:00:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'Human-Rated LVM3 (HLVM3)',
    duration: '3 days in 400 km LEO orbit; ocean splashdown & recovery',
    tagline: 'Demonstrating human spaceflight capability to low Earth orbit and safe return to Indian waters.',
    description: 'Gaganyaan is India\'s national human spaceflight program designed to carry 3 Indian astronauts (Gaganyatris) to a 400 km Low Earth Orbit for a 3-day mission and return them safely to Earth via splashdown in the Arabian Sea or Bay of Bengal. Test vehicles TV-D1 have already validated supersonic crew escape systems.',
    primaryObjectives: [
      'Demonstrate human spaceflight capability to a 400 km Low Earth Orbit.',
      'Ensure crew safety through high-reliability environmental control and life support systems (ECLSS).',
      'Validate multi-stage abort systems from pad abort to in-flight supersonic ejection (TV-D1).',
      'Execute precision re-entry, decelerate using parachute cluster, and perform rapid naval recovery.'
    ],
    keyDiscoveries: [
      'Successful supersonic in-flight crew escape validation during Test Vehicle D1 (TV-D1) at Mach 1.2.',
      'Development of indigenous Environmental Control and Life Support System (ECLSS) testbed.',
      'Establishment of Indian Astronaut Training Facility at Bengaluru.'
    ],
    specs: {
      craftType: 'Crew Module',
      dryMassKg: 4200,
      launchMassKg: 8200,
      payloadMassKg: 500,
      dimensionsMeters: 'Orbital Module: 3.5 m diameter × 7.0 m height (Crew + Service Module)',
      powerSource: 'Deployable solar arrays (3000W) + redundancy silver-zinc / Li-ion batteries',
      powerOutputWatts: 3000,
      propulsion: 'Bi-propellant thrusters on Service Module (5 × 440N LAM + 16 × 100N RCS)',
      stabilization: 'Fault-tolerant quad-redundant flight control computers with reaction wheels and RCS',
      communicationBands: 'Dual-redundant S-band crew voice, HD video, and real-time telemetry via IDSS & TDRSS relay',
      operationalLifetime: '3 to 7 days crewed mission',
      orbitType: 'Circular Low Earth Orbit (400 km, 51.6° inclination)',
      periapsisKm: 400,
      apoapsisKm: 400,
      inclinationDeg: 51.6,
      orbitalPeriodMin: 92.5
    },
    instruments: [
      {
        id: 'eclss',
        name: 'ECLSS',
        fullName: 'Environmental Control and Life Support System',
        leadInstitution: 'VSSC / URSC / DRDO DEBEL',
        principle: 'Regulates atmospheric cabin pressure (101.3 kPa), 21% O2 / 79% N2 composition, temperature (20-25°C), humidity, and scrubbed CO2.',
        howItWorks: 'Active LiOH carbon dioxide scrubbers, oxygen gas injection, thermal radiators, and humidity condensation loops.',
        dataProduced: 'Continuous cabin atmospheric telemetry (pO2, pCO2, pressure, temperature, VOC trace gas levels).',
        scientificSignificance: 'Ensures astronaut survival and mission autonomy for long-duration Indian space station (BAS) plans.',
        sampleObservationsCount: 150,
        officialRefUrl: 'https://www.isro.gov.in'
      },
      {
        id: 'ces',
        name: 'CES / APM',
        fullName: 'Crew Escape System & Apex Parachute Module',
        leadInstitution: 'VSSC Thiruvananthapuram / ADRDE Agra',
        principle: 'High-thrust solid rocket motors capable of pulling crew module away from rocket within 50 milliseconds.',
        howItWorks: 'Four quick-reacting solid motors ignite on abort detection, accelerating module at 10g to safe distance followed by 3-stage parachute deployment.',
        dataProduced: 'G-load acceleration profiles, ejection trajectory kinematics, and sea-recovery beacons.',
        scientificSignificance: 'Guarantees 0-0 pad abort up to transonic maximum dynamic pressure abort safety.',
        sampleObservationsCount: 8,
        officialRefUrl: 'https://www.isro.gov.in'
      }
    ],
    milestones: [
      { id: 'gag_m1', date: '2014-12-18', title: 'CARE Experimental Re-entry', description: 'Crew module atmospheric re-entry experiment validated heat shield and recovery.', phase: 'Milestone' },
      { id: 'gag_m2', date: '2023-10-21', title: 'TV-D1 Abort Flight Success', description: 'In-flight abort demonstrated at Mach 1.2 at 12 km altitude; crew module recovered from sea.', phase: 'Milestone', isKeyMilestone: true },
      { id: 'gag_m3', date: '2024-02-27', title: 'Astronauts Revealed', description: 'PM Narendra Modi presented astronaut wings to 4 designated IAF test pilots.', phase: 'Milestone', isKeyMilestone: true }
    ],
    targetBody: 'Earth',
    color: '#10b981',
    orbitRadius: 1.25,
    orbitInclination: 51.6,
    publicationsCount: 45,
    datasetSizeGb: 120.0
  },

  {
    id: 'vyommitra',
    name: 'Vyommitra Robot Astronaut',
    codeName: 'AI-Enabled Half-Humanoid Spacefarer',
    category: 'human',
    destination: 'Earth Orbit',
    status: 'planned',
    statusBadge: 'Uncrewed Flight Ready (2025)',
    launchDate: '2025-06-01T09:00:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'HLVM3',
    duration: 'Uncrewed orbital test flight',
    tagline: 'Half-humanoid space robot capable of switch operations, monitoring life support, and conversational AI.',
    description: 'Vyommitra (meaning "Space Friend" in Sanskrit) is an indigenously developed female-attired half-humanoid robot designed to fly on uncrewed Gaganyaan test missions. Equipped with articulated arms, speech recognition, and facial expressions, she will monitor environmental parameters, operate control panel switches, and test life-support survival before human astronauts board.',
    primaryObjectives: [
      'Simulate human astronaut functions inside Gaganyaan crew module during uncrewed orbital tests.',
      'Monitor life support parameters, cabin pressure drops, and gas composition.',
      'Operate physical switches, switchboards, and display alerts.',
      'Demonstrate bilingual speech recognition and natural voice interaction with mission controllers.'
    ],
    keyDiscoveries: [
      'Successful validation of robotic dexterous manipulation under microgravity vibration profiles.',
      'Integration of multi-sensor environmental sensing array.'
    ],
    specs: {
      craftType: 'Crew Module',
      dryMassKg: 45,
      launchMassKg: 45,
      payloadMassKg: 45,
      dimensionsMeters: '0.8 m height (half-humanoid torso and head)',
      powerSource: 'Internal Li-ion battery + crew module power bus link',
      powerOutputWatts: 250,
      propulsion: 'None (rides securely seated inside Crew Module)',
      stabilization: 'Active neck and torso robotic servo stabilization',
      communicationBands: 'Internal MIL-STD-1553 data bus + telemetry uplink',
      operationalLifetime: 'Multiple mission cycles',
      orbitType: 'Inside Gaganyaan Crew Module (400 km LEO)',
      periapsisKm: 400,
      apoapsisKm: 400,
      inclinationDeg: 51.6,
      orbitalPeriodMin: 92.5
    },
    instruments: [
      {
        id: 'vyom-ai',
        name: 'V-BRAIN & SENSORS',
        fullName: 'Vyommitra Robotic Control & Sensor Suite',
        leadInstitution: 'ISRO IISU, Thiruvananthapuram',
        principle: 'Bilingual voice recognition, vision camera feedback, and multi-axis motorized actuator control.',
        howItWorks: 'Uses stereoscopic cameras to identify switch status on the cockpit panel and operates manual levers with robotic fingers.',
        dataProduced: 'Robot arm kinematics, speech audio logs, and cabin sensor feedback.',
        scientificSignificance: 'Ensures zero human risk during maiden orbital test flight validation of Gaganyaan.',
        sampleObservationsCount: 40,
        officialRefUrl: 'https://www.isro.gov.in'
      }
    ],
    milestones: [
      { id: 'vy_m1', date: '2020-01-22', title: 'Unveiled at Human Space Flight Symposium', description: 'First public demonstration of Vyommitra answering questions.', phase: 'Milestone', isKeyMilestone: true },
      { id: 'vy_m2', date: '2024-02-05', title: 'Flight Qualification Testing', description: 'Completed vibration, acoustic, and vacuum chamber qualification tests.', phase: 'Milestone' }
    ],
    targetBody: 'Earth',
    color: '#ec4899',
    orbitRadius: 1.25,
    orbitInclination: 51.6,
    publicationsCount: 12,
    datasetSizeGb: 45.0
  },

  // --- EARTH OBSERVATION & CONSTELLATIONS ---
  {
    id: 'cartosat-3',
    name: 'Cartosat-3',
    codeName: 'Sub-Meter Optical Eye in the Sky',
    category: 'earth_observation',
    destination: 'Earth Orbit',
    status: 'active',
    statusBadge: 'Active High-Resolution Imaging',
    launchDate: '2019-11-27T09:28:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-C47',
    duration: '5+ years (active currently)',
    tagline: 'World-class 0.28-meter ground resolution optical imaging satellite for urban planning and cartography.',
    description: 'Cartosat-3 is a third-generation agile advanced Earth-observation satellite featuring the highest spatial resolution civilian optical imaging system ever developed by ISRO, with an extraordinary ground resolution of 28 centimeters panchromatic and 1.12 meters multispectral.',
    primaryObjectives: [
      'High-resolution large-scale urban mapping, rural resource and infrastructure planning.',
      'Coastal land-use classification and utility management.',
      'Disaster monitoring, flood inundation tracking, and landslide mapping.'
    ],
    keyDiscoveries: [
      'Sub-meter urban 3D footprint modeling and land parcel boundary cadastral mapping.',
      'Rapid optical damage assessment during coastal cyclones (Amphan, Biparjoy).'
    ],
    specs: {
      craftType: 'Earth Observation',
      dryMassKg: 750,
      launchMassKg: 1625,
      payloadMassKg: 420,
      dimensionsMeters: '3.1 × 2.0 × 1.8 m',
      powerSource: 'Dual solar arrays generating 2000W; 48 Ah Li-ion batteries',
      powerOutputWatts: 2000,
      propulsion: 'Hydrazine mono-propellant thrusters with control moment gyros (CMGs) for rapid slewing',
      stabilization: 'High agility 3-axis stabilized platform allowing rapid off-nadir tilt up to ±45°',
      communicationBands: 'Dual-polarization X-band downlink (800 Mbps), S-band TTC',
      operationalLifetime: '5 years (active currently)',
      orbitType: 'Sun-synchronous Polar Orbit (505 km altitude, 97.5° inclination)',
      periapsisKm: 505,
      apoapsisKm: 505,
      inclinationDeg: 97.5,
      orbitalPeriodMin: 94.7
    },
    instruments: [
      {
        id: 'carto-pan',
        name: 'PAN & MX-3',
        fullName: 'Cartosat-3 High Resolution Panchromatic and Multispectral Imager',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 350.0,
        powerWatts: 250,
        wavelengthOrBand: 'PAN: 450 - 900 nm (0.28m GSD); MX: 4 bands visible & NIR (1.12m GSD)',
        principle: 'Three-mirror anastigmat (TMA) optical telescope with lightweight SiC mirrors and TDI sensors.',
        howItWorks: 'High-speed pushbroom scan along 16 km swath width, resolving vehicles, trees, and small buildings.',
        dataProduced: 'Level-1B and Level-2 georeferenced orthorectified GeoTIFF tiles.',
        scientificSignificance: 'Puts India in elite league of countries with sub-30cm spaceborne optical reconnaissance.',
        sampleObservationsCount: 18500,
        officialRefUrl: 'https://bhuvan.nrsc.gov.in'
      }
    ],
    milestones: [
      { id: 'c3_m1', date: '2019-11-27', title: 'Launch on PSLV-C47', description: 'Injected into 509 km Sun-synchronous orbit along with 13 commercial cubesats.', phase: 'Launch', isKeyMilestone: true }
    ],
    targetBody: 'Earth',
    color: '#14b8a6',
    orbitRadius: 1.2,
    orbitInclination: 97.5,
    publicationsCount: 52,
    datasetSizeGb: 4120.0
  },

  {
    id: 'oceansat-3',
    name: 'EOS-06 (Oceansat-3)',
    codeName: 'Global Ocean Color & Wind Monitor',
    category: 'earth_observation',
    destination: 'Earth Orbit',
    status: 'active',
    statusBadge: 'Active Ocean Monitoring',
    launchDate: '2022-11-26T11:56:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-C54',
    duration: '5 years nominal life (active currently)',
    tagline: 'Tracking ocean biology, potential fishing zones, cyclones, and global sea surface temperature.',
    description: 'EOS-06 (Oceansat-3) is an advanced third-generation satellite in the Oceansat series. It provides continuous ocean colour data, sea surface temperature, and surface wind vector fields to assist the fishery sector, ocean circulation research, climate modeling, and cyclone path forecasting.',
    primaryObjectives: [
      'Identify Potential Fishing Zones (PFZ) for coastal fishermen using ocean chlorophyll and SST.',
      'Provide daily wind speed and vector direction measurements for marine navigation.',
      'Monitor marine phytoplankton blooms, coastal sediment dynamics, and global carbon cycle.'
    ],
    keyDiscoveries: [
      'Accurate identification of harmful algal blooms (red tides) along the Indian coastline.',
      'Real-time ocean wind scatterometer tracking of tropical cyclone intensification in North Indian Ocean.'
    ],
    specs: {
      craftType: 'Earth Observation',
      dryMassKg: 520,
      launchMassKg: 1117,
      payloadMassKg: 280,
      dimensionsMeters: '2.5 × 1.8 × 1.5 m',
      powerSource: 'Dual solar array wings generating 1300W; Li-ion battery',
      powerOutputWatts: 1300,
      propulsion: 'Monopropellant hydrazine RCS',
      stabilization: '3-axis stabilized using reaction wheels and magnetic torquers',
      communicationBands: 'X-band science downlink, S-band TTC',
      operationalLifetime: '5 years (active currently)',
      orbitType: 'Sun-synchronous Polar Orbit (740 km, 98.28° inclination)',
      periapsisKm: 740,
      apoapsisKm: 740,
      inclinationDeg: 98.28,
      orbitalPeriodMin: 99.6
    },
    instruments: [
      {
        id: 'ocm3',
        name: 'OCM-3',
        fullName: 'Ocean Colour Monitor-3',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 110.0,
        powerWatts: 95,
        wavelengthOrBand: '13 spectral bands (400 nm to 1010 nm)',
        principle: 'Multi-spectral pushbroom radiometer with 360 m spatial resolution and 1400 km swath.',
        howItWorks: 'Measures water-leaving radiance to quantify chlorophyll-a concentrations and suspended particulate matter.',
        dataProduced: 'Global ocean chlorophyll concentration maps (mg/m³) and diffused attenuation coefficients.',
        scientificSignificance: 'Empowers millions of traditional fishermen with daily advisories on fish school aggregations.',
        sampleObservationsCount: 14200,
        officialRefUrl: 'https://incois.gov.in'
      },
      {
        id: 'scat3',
        name: 'OSCAT-3',
        fullName: 'Ocean Surface Wind Scatterometer',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 120.0,
        powerWatts: 180,
        wavelengthOrBand: 'Ku-band (13.515 GHz)',
        principle: 'Rotating pencil-beam active radar measuring ocean surface capillary wave roughness.',
        howItWorks: 'Scans conical beam across ocean surface; calculates wind speed (4 to 24 m/s) and direction (0 to 360°).',
        dataProduced: 'Wind vector grids at 25 km and 12.5 km resolution across open oceans.',
        scientificSignificance: 'Crucial for numerical weather prediction models and early cyclone alerts.',
        sampleObservationsCount: 22000,
        officialRefUrl: 'https://mosdac.gov.in'
      }
    ],
    milestones: [
      { id: 'oc_m1', date: '2022-11-26', title: 'Launch on PSLV-C54', description: 'Injected into 740 km orbit along with 8 co-passenger nanosatellites.', phase: 'Launch', isKeyMilestone: true }
    ],
    targetBody: 'Earth',
    color: '#0284c7',
    orbitRadius: 1.28,
    orbitInclination: 98.28,
    issdcPortalUrl: 'https://mosdac.gov.in',
    publicationsCount: 36,
    datasetSizeGb: 2450.0
  },

  {
    id: 'risat-2b',
    name: 'RISAT-2B (EOS-01 / Radar)',
    codeName: 'All-Weather Day/Night Radar Sentinel',
    category: 'earth_observation',
    destination: 'Earth Orbit',
    status: 'active',
    statusBadge: 'Active Radar Imaging (SAR)',
    launchDate: '2019-05-22T05:30:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV-C46',
    duration: '5+ years (active currently)',
    tagline: 'X-band Synthetic Aperture Radar seeing through thick clouds, rain, and nighttime darkness.',
    description: 'RISAT-2B is an advanced radar Earth-observation satellite equipped with an indigenous X-band Synthetic Aperture Radar (SAR) featuring a 3.6-meter radial rib deployable reflector antenna. Unlike optical satellites, radar can pierce through monsoon clouds, dense haze, and darkness to deliver high-resolution radar imagery 24/7.',
    primaryObjectives: [
      'All-weather day-and-night surveillance of national borders and maritime zones.',
      'Disaster management support during severe monsoon floods and cyclones.',
      'Agricultural crop yield estimation and forestry biomass monitoring.'
    ],
    keyDiscoveries: [
      'First real-time flood inundation maps during the Assam and Kerala monsoons when cloud cover blinded optical satellites.',
      'High-precision monitoring of Himalayan glacier lake outbursts and landslide movements.'
    ],
    specs: {
      craftType: 'Earth Observation',
      dryMassKg: 310,
      launchMassKg: 615,
      payloadMassKg: 200,
      dimensionsMeters: '3.6 m deployed parabolic radial rib mesh antenna',
      powerSource: 'Deployable solar arrays delivering 1500W; 36 Ah Li-ion battery',
      powerOutputWatts: 1500,
      propulsion: 'Hydrazine mono-propellant thrusters',
      stabilization: '3-axis stabilized with reaction wheels for quick spotlight steering',
      communicationBands: 'Dual polarization X-band science downlink (640 Mbps), S-band TTC',
      operationalLifetime: '5 years (active currently)',
      orbitType: 'Circular Low Earth Orbit (555 km altitude, 37° inclination)',
      periapsisKm: 555,
      apoapsisKm: 555,
      inclinationDeg: 37.0,
      orbitalPeriodMin: 95.7
    },
    instruments: [
      {
        id: 'x-sar',
        name: 'X-SAR',
        fullName: 'X-band Synthetic Aperture Radar',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 180.0,
        powerWatts: 1200,
        wavelengthOrBand: 'X-band (5.35 GHz, 5.6 cm wavelength)',
        principle: 'Active coherent pulsed radar synthesizing a large virtual antenna aperture along flight track.',
        howItWorks: 'Transmits high-power microwave pulses and processes phase delay and Doppler shifts to achieve 0.5 to 3 meter resolution.',
        dataProduced: 'Single-look complex (SLC) and ground range detected (GRD) radar images in spotlight, stripmap, and scanSAR modes.',
        scientificSignificance: 'Ensures round-the-clock disaster response capability regardless of monsoon cloud cover.',
        sampleObservationsCount: 8900,
        officialRefUrl: 'https://bhuvan.nrsc.gov.in'
      }
    ],
    milestones: [
      { id: 'r2_m1', date: '2019-05-22', title: 'Launch on PSLV-C46', description: 'Flawless injection into 555 km orbit; 3.6m mesh antenna successfully deployed.', phase: 'Launch', isKeyMilestone: true }
    ],
    targetBody: 'Earth',
    color: '#eab308',
    orbitRadius: 1.22,
    orbitInclination: 37,
    publicationsCount: 28,
    datasetSizeGb: 3100.0
  },

  {
    id: 'insat-3dr',
    name: 'INSAT-3DR',
    codeName: 'Geostationary Weather Eye & SAR Beacon',
    category: 'earth_observation',
    destination: 'Earth Orbit',
    status: 'active',
    statusBadge: 'Active Geostationary Sentinel (36,000 km)',
    launchDate: '2016-09-08T16:50:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'GSLV-F05 (Indigenous Cryogenic Upper Stage)',
    duration: '10 years design life (active currently at 74°E longitude)',
    tagline: 'Continuous meteorological monitoring and search-and-rescue satellite at 36,000 km geostationary orbit.',
    description: 'INSAT-3DR is an advanced meteorological satellite parked in geostationary orbit at 74° East longitude. It carries a 6-channel multispectral Imager and a 19-channel Sounder to continuously monitor the atmosphere, providing vertical profiles of temperature and humidity, sea surface temperatures, and satellite-aided search and rescue (SAS&R).',
    primaryObjectives: [
      'Continuous 24/7 monitoring of Earth weather systems, cloud dynamics, and monsoon depressions from 36,000 km.',
      'Atmospheric vertical profiles of temperature and moisture for numerical weather forecasting.',
      'Provide search-and-rescue distress signal relay for ships and aircraft in distress.'
    ],
    keyDiscoveries: [
      'Early pinpoint tracking of deadly cyclonic storms (Fani, Vayu, Amphan, Mocha) saving tens of thousands of lives.',
      'Measurement of nighttime fog formation and winter smog dispersion over the Indo-Gangetic Plains.'
    ],
    specs: {
      craftType: 'Earth Observation',
      dryMassKg: 955,
      launchMassKg: 2211,
      payloadMassKg: 350,
      dimensionsMeters: '2.4 × 1.6 × 1.5 m with single solar array panel (1.7 kW)',
      powerSource: 'Single solar array wing delivering 1700W; dual 90 Ah batteries',
      powerOutputWatts: 1700,
      propulsion: '440N Liquid Apogee Motor + bipropellant stationkeeping thrusters',
      stabilization: '3-axis stabilized using momentum wheels and magnetic torquers',
      communicationBands: 'C-band, S-band, and UHF transponder for Search & Rescue',
      operationalLifetime: '10 years (active currently)',
      orbitType: 'Geostationary Orbit (35,786 km altitude, 74° East slot)',
      periapsisKm: 35786,
      apoapsisKm: 35786,
      inclinationDeg: 0.1,
      orbitalPeriodMin: 1436 // 24 hours
    },
    instruments: [
      {
        id: 'insat-imager',
        name: '6-Channel Imager',
        fullName: 'Multispectral Meteorological Imager',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 135.0,
        powerWatts: 115,
        wavelengthOrBand: 'Visible (0.55-0.75 µm), Shortwave IR, Middle IR, Water Vapor (6.5-7.1 µm), Thermal IR1 & IR2',
        principle: 'Fast scanning mirror imaging full Earth disk every 26 minutes with 1 to 4 km resolution.',
        howItWorks: 'Scans Indian Ocean and South Asian landmass line-by-line, capturing cloud motion vectors and surface temperatures.',
        dataProduced: 'Full-disk cloud imagery, upper-tropospheric water vapor wind vectors, and rainfall rate estimates.',
        scientificSignificance: 'Forms the backbone of the India Meteorological Department\'s (IMD) daily weather bulletin.',
        sampleObservationsCount: 154000,
        officialRefUrl: 'https://mosdac.gov.in'
      },
      {
        id: 'insat-sounder',
        name: '19-Channel Sounder',
        fullName: 'Atmospheric Vertical Sounder',
        leadInstitution: 'Space Applications Centre (SAC), Ahmedabad',
        massKg: 145.0,
        powerWatts: 120,
        wavelengthOrBand: '18 IR bands + 1 Visible band (3.74 - 14.7 µm)',
        principle: 'Measures radiant energy in narrow infrared absorption bands of CO2, H2O, and O3.',
        howItWorks: 'Inverts spectral radiance measurements into vertical temperature and moisture profiles from ground up to 35 km altitude.',
        dataProduced: 'Vertical atmospheric sounding layers (Kelvin and g/kg at 40 pressure levels).',
        scientificSignificance: 'Greatly enhances accuracy of heavy rainfall and thunderstorm forecasts.',
        sampleObservationsCount: 78000,
        officialRefUrl: 'https://mosdac.gov.in'
      }
    ],
    milestones: [
      { id: 'i3dr_m1', date: '2016-09-08', title: 'Launch on GSLV-F05', description: 'Historic first operational launch of indigenous cryogenic upper stage.', phase: 'Launch', isKeyMilestone: true }
    ],
    targetBody: 'Earth',
    color: '#06b6d4',
    orbitRadius: 1.85,
    orbitInclination: 0.1,
    issdcPortalUrl: 'https://mosdac.gov.in',
    publicationsCount: 42,
    datasetSizeGb: 6800.0
  },

  {
    id: 'navic-constellation',
    name: 'NavIC (IRNSS Constellation)',
    codeName: 'Navigation with Indian Constellation',
    category: 'earth_observation',
    destination: 'Earth Orbit',
    status: 'active',
    statusBadge: 'Active Regional Constellation (7+ Satellites)',
    launchDate: '2013-07-01T23:41:00+05:30',
    launchSite: 'SDSC-SHAR, Sriharikota',
    launchVehicle: 'PSLV Family',
    duration: 'Operational constellation (12+ years continuous positioning)',
    tagline: 'Independent regional satellite navigation system providing sub-5-meter positioning accuracy over India.',
    description: 'NavIC (Navigation with Indian Constellation), previously known as IRNSS, is an autonomous regional satellite navigation system designed and operated by ISRO. Consisting of 7 satellites in geostationary and geosynchronous orbits, it delivers position accuracy better than 5 meters across India and up to 1,500 km around its borders on L5, S, and L1 civilian bands.',
    primaryObjectives: [
      'Provide accurate real-time positioning and timing services for civilian and strategic navigation.',
      'Deliver sub-5-meter positioning accuracy for smartphones, fleet management, and civil aviation.',
      'Ensure complete technological sovereignty in regional satellite navigation.'
    ],
    keyDiscoveries: [
      'Sub-5 meter position accuracy in dual-frequency civilian receivers across the subcontinent.',
      'Integration into 3GPP cellular standards and commercial 5G smartphone chipsets worldwide.'
    ],
    specs: {
      craftType: 'Constellation',
      dryMassKg: 614,
      launchMassKg: 1425,
      payloadMassKg: 200,
      dimensionsMeters: '1.58 × 1.50 × 1.50 m cuboid with 2 solar wings',
      powerSource: 'Dual solar array wings generating 1660W; 90 Ah Li-ion batteries',
      powerOutputWatts: 1660,
      propulsion: '440N Liquid Apogee Motor + 12 RCS thrusters',
      stabilization: '3-axis body stabilized platform with ultra-precise rubidium atomic clocks',
      communicationBands: 'L5 (1176.45 MHz), S-band (2492.028 MHz), and new L1 band (1575.42 MHz)',
      operationalLifetime: '12 years design life',
      orbitType: '3 in Geostationary Orbit (GEO) + 4 in Geosynchronous Orbit (GSO at 29° inclination)',
      periapsisKm: 35786,
      apoapsisKm: 35786,
      inclinationDeg: 29.0,
      orbitalPeriodMin: 1436
    },
    instruments: [
      {
        id: 'rafs-clock',
        name: 'RAFS Atomic Clocks',
        fullName: 'Rubidium Atomic Frequency Standard',
        leadInstitution: 'ISRO SAC Ahmedabad / SpectraTime',
        principle: 'Hyperfine microwave transition of rubidium-87 vapor cells providing timing stability to 10⁻¹³ s.',
        howItWorks: 'Transmits synchronized pseudorandom navigation codes used by receivers to trilaterate exact position.',
        dataProduced: 'Navigation ephemeris, almanac, clock corrections, and ionospheric delay parameters.',
        scientificSignificance: 'Core heartbeat ensuring centimeter-level ranging and sub-nanosecond time transfer.',
        sampleObservationsCount: 99999,
        officialRefUrl: 'https://www.isro.gov.in/irnss_programme.html'
      }
    ],
    milestones: [
      { id: 'nav_m1', date: '2013-07-01', title: 'First Satellite IRNSS-1A Launch', description: 'Initiated deployment of India\'s regional navigation constellation.', phase: 'Launch' },
      { id: 'nav_m2', date: '2018-04-12', title: 'Constellation Fully Operational', description: 'All 7 satellites operational in orbit, providing continuous positioning.', phase: 'Operation', isKeyMilestone: true },
      { id: 'nav_m3', date: '2023-05-29', title: 'Next-Gen NVS-01 Launch', description: 'Introduced indigenous atomic clock and civilian L1 navigation frequency band.', phase: 'Milestone', isKeyMilestone: true }
    ],
    targetBody: 'Earth',
    color: '#f97316',
    orbitRadius: 2.1,
    orbitInclination: 29.0,
    publicationsCount: 68,
    datasetSizeGb: 5400.0
  }
];
