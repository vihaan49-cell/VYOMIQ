# 🚀 VYOMIQ — Visualizing Your Missions, Observations, Insights and Quantification
### Unified Indian Space Mission Data Explorer & 3D Interactive Cosmos

**VYOMIQ** is an interactive, scientifically authentic 3D space mission exploration platform showcasing India’s space exploration odyssey under the **Indian Space Research Organisation (ISRO)**. It combines the visual immersion of NASA’s Eyes on the Solar System with a futuristic mission-control telemetry dashboard and research-grade scientific observation archive.

---

## 🌟 Key Capabilities & Architectural Features

### 1. Interactive 3D Solar System Universe
- **Celestial Bodies**: Sun (with turbulent corona and prominence arcs), Earth (blue marble, day/night lighting, Rayleigh atmospheric rim scattering, rotating cloud layers), Moon (detailed basaltic maria, rayed craters, and **Shiv Shakti Point** marker), Mars (Olympus Mons caldera, Valles Marineris, polar ice caps).
- **Accurate Orbital Regimes**:
  - **Aditya-L1**: Halo orbit around the Sun-Earth Lagrange Point 1 (L1), 1.5 million km Sun-ward.
  - **Chandrayaan-3**: Vikram Lander and Pragyan Rover soft-landed at the Lunar South Pole (69.373° S, 32.319° E) with Indian tricolor beacon.
  - **Chandrayaan-2 & Chandrayaan-1**: Polar lunar orbiters (100 km).
  - **Chandrayaan-4**: Approved 5-module lunar sample return architecture (clearly labeled Planned).
  - **Mangalyaan (Mars Orbiter Mission - MOM)**: Authentic 150° inclined elliptical orbit (421 km × 76,993 km) obeying Kepler’s laws of planetary motion.
  - **AstroSat & XPoSat**: 650 km Low Earth Orbit (6° inclination).
  - **Gaganyaan & Vyommitra**: 400 km Low Earth Orbit crew orbital module.
  - **Earth Observation Satellites**: Cartosat-3 (0.28m GSD), Oceansat-3 (EOS-06), RISAT-2B (C-band SAR radar), INSAT-3DR (36,000 km Geostationary), and NavIC (IRNSS 7-satellite regional positioning constellation).
- **Interactions**: Mouse drag to orbit/rotate, mouse scroll to zoom, right-click to pan, click on any planet or spacecraft to smoothly fly the camera into target focus.
- **Orbital Controls**: 0.5x, 1x, 5x, 20x time-acceleration and pause controls.

### 2. Spacecraft Information System & Mission Directory
- Left collapsible HUD panel categorizing missions: *Lunar, Mars, Solar, Astronomy, Human Spaceflight, Earth Observation*.
- Operational badges: `Historic Success`, `Active Science Mission`, `Planned`.
- Deep-dive Right HUD panel with 5 distinct operational tabs:
  1. **Overview & Objectives**: Full narrative, launch profile, primary mission goals.
  2. **Specs & Subsystems**: Launch mass, dry mass, payload mass, power systems (solar arrays), propulsion, stabilization gyros, communication links, orbital parameters.
  3. **Scientific Instruments (Accordion)**: Over 35 payloads detailed individually with operating physical principles, sensor mechanics, data products, and scientific significance (e.g. ChaSTE, LIBS, APXS, ILSA, OHRC, TMC-2, IIRS, DFSAR, VELC, SUIT, ASPEX, SoLEXS, LAXPC, UVIT, POLIX, XSPECT).
  4. **Public Scientific Observations**: Filterable list of observations with direct links to ISSDC/PRADAN data products.
  5. **Telemetry Readout**: Live/historical telemetry engine calculating distance from Earth, altitude, orbital velocity, 1-way signal latency (e.g., Mars ~14 min, Moon ~1.3 sec), solar power generation, and transponder link status.

### 3. Scientific Observation Explorer & Image Gallery
- Searchable database of real observations from ISRO, ISSDC, PRADAN, and NASA archives.
- **Interactive Before/After Comparison Slider**: Compare raw detector feeds against calibrated/contrast-enhanced mineral maps and false-color scientific composites.
- Full provenance metadata: Instrument, Capture Date, Target, Coordinate/Region, Archive ID, and Source attribution.
- Direct links to downloadable dataset packages in FITS, PDS4, GeoTIFF, CSV, and JSON formats.

### 4. Interactive Scientific Data Visualization Suite
- **ChaSTE Temperature Gradient vs Depth**: Interactive chart showing the dramatic +54°C to -8.5°C temperature drop across the top 10 cm of lunar polar regolith.
- **LIBS & APXS Elemental Abundance**: Detected elements (O, Si, Al, Ca, Fe, Mg, Ti, and the historic first in-situ discovery of Sulfur) with emission wavelengths and oxide weight percentages.
- **Aditya-L1 May 2024 Solar Superstorm**: Solar wind speed surge (380 to 765 km/s), proton flux, and X-ray flare intensity time-series at L1.
- **AstroSat LAXPC Cygnus X-1 Energy Spectrum**: 3 to 80 keV photon counts highlighting iron K-alpha emission and power-law corona emission.
- **XPoSat POLIX Polarimetric Modulation**: Azimuthal scattering curve of Crab Pulsar proving synchrotron lepton emission (PD = 32.7%, PA = 125.5°).

### 5. Universal Quick Search (Cmd/Ctrl + K)
- Full-text search across all space assets, missions, instruments, planetary regions, and discoveries.

### 6. Synthesized Web Audio Space Sound FX
- Procedural audio synthesizer (deep-space ambient hum, UI chirps, telemetry pings, and milestone fanfares) created using the Web Audio API with zero external audio assets required.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti.
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei, Procedural Canvas Shader Textures.
- **Backend API**: Python 3, Flask, REST APIs, Static File Serving.
- **Tooling**: Vite 5, Node.js v20 LTS.

---

## 🚀 How to Run

### Option 1: Run the Unified Full-Stack Server (Recommended)
This runs the Python backend which simultaneously serves the REST APIs and the pre-built React 3D frontend:

```bash
python server/app.py
```
Open **`http://127.0.0.1:5000`** in your web browser.

### Option 2: Run in Vite Development Mode
To develop and hot-reload frontend components:

```bash
cd client
npm run dev
```
Open **`http://localhost:3000`** in your web browser (with automatic API proxy to `http://127.0.0.1:5000`).

---

## 🏛️ Scientific Integrity & Provenance
All mission metadata, orbital coordinates, and observation archives derive from official public records:
- **ISRO**: Indian Space Research Organisation (https://www.isro.gov.in)
- **ISSDC**: Indian Space Science Data Centre (https://www.issdc.gov.in)
- **PRADAN**: Planetary Data Archive (https://pradan.issdc.gov.in)
- **MOSDAC**: Meteorological & Oceanographic Satellite Data Archival Centre (https://mosdac.gov.in)
- **NASA PDS**: Planetary Data System (https://pds.nasa.gov)

---

## 👨‍💻 Developer & Author
- **GitHub**: [@ishant25bce11024](https://github.com/ishant25bce11024)

