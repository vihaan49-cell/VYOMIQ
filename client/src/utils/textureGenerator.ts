import * as THREE from 'three';

// Cache generated textures so we only create them once
const textureCache: Record<string, THREE.CanvasTexture> = {};

// Helper: Pseudo-random noise function for realistic terrain fractals
function pseudoRandom(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

// ============================================================================
// 1. PHOTOREALISTIC REAL-COLOR EARTH TEXTURE (NASA Blue Marble True-Color 2048x1024)
// ============================================================================
export function getEarthTexture(): THREE.CanvasTexture {
  if (textureCache['earth_vibrant_real']) return textureCache['earth_vibrant_real'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep oceanic true-color gradient (Rich, radiant blue marble ocean)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#091f3d');
  oceanGrad.addColorStop(0.2, '#0c2e5b');
  oceanGrad.addColorStop(0.5, '#0f3a73'); // Equatorial ocean blue
  oceanGrad.addColorStop(0.8, '#0c2e5b');
  oceanGrad.addColorStop(1, '#091f3d');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Shallow continental shelves (Luminous turquoise/cyan coastal fringes)
  ctx.fillStyle = 'rgba(6, 182, 212, 0.55)';

  // Eurasia & India landmass shelf
  ctx.beginPath();
  ctx.ellipse(width * 0.66, height * 0.36, width * 0.21, height * 0.19, 0, 0, Math.PI * 2);
  ctx.fill();

  // Boreal forest / Taiga green (Siberia and northern Europe)
  ctx.fillStyle = '#1e5225';
  ctx.beginPath();
  ctx.ellipse(width * 0.67, height * 0.27, width * 0.19, height * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mediterranean & Middle East
  ctx.fillStyle = '#9e854d';
  ctx.beginPath();
  ctx.ellipse(width * 0.58, height * 0.38, width * 0.08, height * 0.05, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // INDIAN SUBCONTINENT (Vibrant lush green agricultural basin & Western Ghats)
  ctx.fillStyle = '#267332'; // Rich tropical green
  ctx.beginPath();
  ctx.moveTo(width * 0.67, height * 0.40);
  ctx.lineTo(width * 0.735, height * 0.40);
  ctx.lineTo(width * 0.702, height * 0.59); // Kanyakumari southern tip
  ctx.closePath();
  ctx.fill();

  // Sri Lanka island
  ctx.fillStyle = '#226b2d';
  ctx.beginPath();
  ctx.ellipse(width * 0.708, height * 0.615, 7, 11, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Coastal turquoise shallows around India (Gulf of Mannar, Sundarbans)
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(width * 0.67, height * 0.40);
  ctx.lineTo(width * 0.702, height * 0.59);
  ctx.lineTo(width * 0.735, height * 0.40);
  ctx.stroke();

  // Himalayan Snow Mountains (Brilliant white snowcaps)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(width * 0.70, height * 0.395, 26, Math.PI * 0.85, Math.PI * 1.35);
  ctx.stroke();

  // Tibetan Plateau (High altitude golden-brown steppe)
  ctx.fillStyle = '#8f7b47';
  ctx.beginPath();
  ctx.ellipse(width * 0.71, height * 0.37, 24, 12, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Thar Desert (Golden sand in Rajasthan)
  ctx.fillStyle = '#c7984f';
  ctx.beginPath();
  ctx.ellipse(width * 0.675, height * 0.43, 14, 10, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // AFRICA (Sahara golden sand + Congo equatorial rainforest + Savanna)
  // Sahara Desert
  ctx.fillStyle = '#d49b52';
  ctx.beginPath();
  ctx.ellipse(width * 0.52, height * 0.39, width * 0.09, height * 0.085, 0, 0, Math.PI * 2);
  ctx.fill();
  // Arabian Peninsula
  ctx.beginPath();
  ctx.ellipse(width * 0.61, height * 0.42, width * 0.038, height * 0.048, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // Central Congo Rainforest (Deep lush emerald green)
  ctx.fillStyle = '#144716';
  ctx.beginPath();
  ctx.ellipse(width * 0.53, height * 0.56, width * 0.07, height * 0.095, 0, 0, Math.PI * 2);
  ctx.fill();

  // Southern African savanna & grasslands
  ctx.fillStyle = '#806d3b';
  ctx.beginPath();
  ctx.ellipse(width * 0.54, height * 0.71, width * 0.048, height * 0.085, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // AMERICAS (North American forests & South American Amazon)
  ctx.fillStyle = '#26612a'; // North America
  ctx.beginPath();
  ctx.ellipse(width * 0.23, height * 0.34, width * 0.088, height * 0.16, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Amazon Rainforest (World's densest green jungle)
  ctx.fillStyle = '#0f3d12';
  ctx.beginPath();
  ctx.ellipse(width * 0.30, height * 0.65, width * 0.072, height * 0.17, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Andes Mountain spine along South America
  ctx.strokeStyle = '#6e5e48';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(width * 0.27, height * 0.52);
  ctx.lineTo(width * 0.28, height * 0.82);
  ctx.stroke();

  // AUSTRALIA (Outback rusty red-gold ochre)
  ctx.fillStyle = '#a6542d';
  ctx.beginPath();
  ctx.ellipse(width * 0.84, height * 0.72, width * 0.068, height * 0.082, 0, 0, Math.PI * 2);
  ctx.fill();

  // POLAR ICE CAPS (Pure brilliant white glacial sheets)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height * 0.085); // Arctic
  ctx.fillRect(0, height * 0.90, width, height * 0.10); // Antarctica

  // Add terrain elevation fractal noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const idx = (y * width + x) * 4;
      const noise = (pseudoRandom(x * 0.06, y * 0.06) - 0.5) * 20;
      data[idx] = Math.max(0, Math.min(255, data[idx] + noise));
      data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + noise));
      data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + noise));
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['earth_vibrant_real'] = texture;
  return texture;
}

// ============================================================================
// 1B. EARTH SPECULAR / ROUGHNESS MAP (Oceans glisten, continents are matte)
// ============================================================================
export function getEarthSpecularMap(): THREE.CanvasTexture {
  if (textureCache['earth_specular']) return textureCache['earth_specular'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Oceans are shiny specular (pure white in roughness mask = low roughness, high shine)
  ctx.fillStyle = '#101010'; // Low roughness for oceans (shiny water)
  ctx.fillRect(0, 0, width, height);

  // Land is rough / matte (high roughness in mask)
  ctx.fillStyle = '#d5d5d5';

  // Eurasia & India
  ctx.beginPath();
  ctx.ellipse(width * 0.66, height * 0.36, width * 0.20, height * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // India
  ctx.beginPath();
  ctx.moveTo(width * 0.67, height * 0.40);
  ctx.lineTo(width * 0.735, height * 0.40);
  ctx.lineTo(width * 0.702, height * 0.59);
  ctx.closePath();
  ctx.fill();

  // Africa
  ctx.beginPath();
  ctx.ellipse(width * 0.53, height * 0.50, width * 0.09, height * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Americas
  ctx.beginPath();
  ctx.ellipse(width * 0.23, height * 0.34, width * 0.085, height * 0.16, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(width * 0.30, height * 0.65, width * 0.07, height * 0.17, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  ctx.beginPath();
  ctx.ellipse(width * 0.84, height * 0.72, width * 0.065, height * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  // Polar Ice (Matte ice)
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(0, 0, width, height * 0.08);
  ctx.fillRect(0, height * 0.90, width, height * 0.10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['earth_specular'] = texture;
  return texture;
}

// ============================================================================
// 2. REAL-COLOR EARTH CLOUDS TEXTURE (Swirling Cyclonic Cloud Deck)
// ============================================================================
export function getEarthCloudTexture(): THREE.CanvasTexture {
  if (textureCache['clouds_vibrant_real']) return textureCache['clouds_vibrant_real'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, width, height);

  // Swirling white clouds with natural alpha
  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';

  // Equatorial Intertropical Convergence Zone (ITCZ) Cloud Bands
  for (let x = 0; x < width; x += 35) {
    const yCenter = height * 0.50 + Math.sin(x * 0.015) * 35;
    ctx.beginPath();
    ctx.ellipse(x, yCenter, 42, 14, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Northern & Southern Mid-Latitude Jetstream Swirls
  for (let x = 0; x < width; x += 45) {
    const yNorth = height * 0.32 + Math.sin(x * 0.02) * 50;
    const ySouth = height * 0.72 + Math.cos(x * 0.018) * 45;

    ctx.beginPath();
    ctx.ellipse(x, yNorth, 55, 18, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x, ySouth, 50, 16, 0.25, 0, Math.PI * 2);
    ctx.fill();
  }

  // Realistic Cyclonic Hurricanes / Spiral Depressions
  const spirals = [
    { x: width * 0.22, y: height * 0.36, r: 40 }, // Atlantic Hurricane
    { x: width * 0.76, y: height * 0.38, r: 48 }, // Pacific Typhoon
    { x: width * 0.69, y: height * 0.51, r: 35 }, // Bay of Bengal Cyclone
    { x: width * 0.45, y: height * 0.68, r: 38 }, // South Atlantic vortex
  ];

  spirals.forEach(s => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 0.45, 0, Math.PI * 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 0.9, 0, Math.PI * 1.7);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 1.35, 0, Math.PI * 1.3);
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['clouds_vibrant_real'] = texture;
  return texture;
}

// ============================================================================
// 3. PHOTOREALISTIC REAL-COLOR MOON TEXTURE (Authentic Lunar Albedo 2048x1024)
// ============================================================================
export function getMoonTexture(): THREE.CanvasTexture {
  if (textureCache['moon_vibrant_real']) return textureCache['moon_vibrant_real'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Baseline Lunar Regolith: Silver-grey anorthosite crust (#8e94a0 to #9da3ad)
  ctx.fillStyle = '#949aa5';
  ctx.fillRect(0, 0, width, height);

  // Heavily cratered lunar highlands (brighter feldspathic anorthosite rock, #b2b8c5)
  ctx.fillStyle = 'rgba(185, 192, 204, 0.45)';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.82, width * 0.48, height * 0.17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.15, width * 0.48, height * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Basaltic Lunar Maria (Dark volcanic plains, authentic charcoal basalt, #2c2f35 to #383c44)
  const maria = [
    { x: width * 0.33, y: height * 0.44, rx: 250, ry: 200, color: '#30333a' }, // Oceanus Procellarum
    { x: width * 0.53, y: height * 0.37, rx: 160, ry: 110, color: '#2b2e35' }, // Mare Imbrium
    { x: width * 0.67, y: height * 0.46, rx: 130, ry: 96, color: '#343840' },  // Mare Serenitatis
    { x: width * 0.74, y: height * 0.53, rx: 120, ry: 88, color: '#272b33' },  // Mare Tranquillitatis
    { x: width * 0.82, y: height * 0.50, rx: 96, ry: 80, color: '#2f3239' },   // Mare Crisium
    { x: width * 0.73, y: height * 0.63, rx: 104, ry: 76, color: '#353941' },  // Mare Nectaris
    { x: width * 0.80, y: height * 0.62, rx: 100, ry: 84, color: '#31343c' },  // Mare Fecunditatis
    { x: width * 0.42, y: height * 0.58, rx: 110, ry: 80, color: '#2f333a' },  // Mare Nubium
    { x: width * 0.46, y: height * 0.50, rx: 80, ry: 60, color: '#32363e' },   // Mare Vaporum
  ];

  maria.forEach(m => {
    ctx.fillStyle = m.color;
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, 0.08, 0, Math.PI * 2);
    ctx.fill();
  });

  // Fresh Impact Craters with Prominent Ejecta Rays (Brilliant high-albedo crushed rock, #f1f5fb)
  // 1. TYCHO CRATER (Spectacular southern ray system radiating across entire hemisphere)
  const tychoX = width * 0.51;
  const tychoY = height * 0.78;
  ctx.strokeStyle = 'rgba(241, 245, 251, 0.5)';
  ctx.lineWidth = 2.2;
  for (let a = 0; a < 36; a++) {
    const angle = (a * Math.PI) / 18;
    const rayLength = 160 + (a % 5) * 110;
    ctx.beginPath();
    ctx.moveTo(tychoX, tychoY);
    ctx.lineTo(tychoX + Math.cos(angle) * rayLength, tychoY + Math.sin(angle) * rayLength);
    ctx.stroke();
  }
  // Tycho Crater Rim, Central Peak & Shadow Floor
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(tychoX, tychoY, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1c1f24'; // Deep crater shadow
  ctx.beginPath();
  ctx.arc(tychoX + 2, tychoY + 2, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff'; // Central peak
  ctx.beginPath();
  ctx.arc(tychoX, tychoY, 5, 0, Math.PI * 2);
  ctx.fill();

  // 2. COPERNICUS CRATER (Bright rayed crater in Oceanus Procellarum)
  const copX = width * 0.46;
  const copY = height * 0.43;
  ctx.strokeStyle = 'rgba(238, 242, 250, 0.35)';
  ctx.lineWidth = 1.6;
  for (let a = 0; a < 20; a++) {
    const angle = (a * Math.PI) / 10;
    ctx.beginPath();
    ctx.moveTo(copX, copY);
    ctx.lineTo(copX + Math.cos(angle) * 85, copY + Math.sin(angle) * 85);
    ctx.stroke();
  }
  ctx.fillStyle = '#eef2fa';
  ctx.beginPath();
  ctx.arc(copX, copY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22252a';
  ctx.beginPath();
  ctx.arc(copX + 1.5, copY + 1.5, 13, 0, Math.PI * 2);
  ctx.fill();

  // 3. KEPLER & ARISTARCHUS CRATERS
  const ariX = width * 0.28;
  const ariY = height * 0.38;
  ctx.fillStyle = '#ffffff'; // Brightest crater on Moon
  ctx.beginPath();
  ctx.arc(ariX, ariY, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e2126';
  ctx.beginPath();
  ctx.arc(ariX + 1, ariY + 1, 9, 0, Math.PI * 2);
  ctx.fill();

  // 4. SHIV SHAKTI POINT / SOUTH POLE CRATER BASINS (69.37° S)
  const sspX = width * 0.58;
  const sspY = height * 0.89;
  ctx.fillStyle = '#101216'; // Cold trap shadow
  ctx.beginPath();
  ctx.arc(sspX, sspY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b'; // Sunlit golden rim
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(sspX, sspY, 22, Math.PI * 0.7, Math.PI * 1.5);
  ctx.stroke();

  // Scatter hundreds of realistic micro-craters across the lunar surface
  for (let i = 0; i < 400; i++) {
    const cx = pseudoRandom(i * 1.3, i * 7.1) * width;
    const cy = pseudoRandom(i * 4.2, i * 3.7) * height;
    const cr = 2 + pseudoRandom(i * 8.5, i * 2.1) * 7;
    // Bright sunlit rim
    ctx.fillStyle = 'rgba(235, 240, 250, 0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, cr + 1, 0, Math.PI * 2);
    ctx.fill();
    // Shadow interior
    ctx.fillStyle = 'rgba(25, 28, 33, 0.7)';
    ctx.beginPath();
    ctx.arc(cx + 0.6, cy + 0.6, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  // High-frequency regolith micro-texture
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 16;
    data[i] = Math.max(0, Math.min(255, data[i] + grain));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['moon_vibrant_real'] = texture;
  return texture;
}

// ============================================================================
// 3B. MOON BUMP / NORMAL HEIGHT MAP (2048x1024 Physical Crater Relief)
// ============================================================================
export function getMoonBumpMap(): THREE.CanvasTexture {
  if (textureCache['moon_bump']) return textureCache['moon_bump'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Mid-gray baseline
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, width, height);

  // Depressed maria basins (darker in bump map = lower elevation)
  ctx.fillStyle = '#505050';
  ctx.beginPath();
  ctx.ellipse(width * 0.33, height * 0.44, 125, 100, 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(width * 0.53, height * 0.37, 80, 55, 0.08, 0, Math.PI * 2);
  ctx.fill();

  // Raised highlands (lighter in bump map = higher elevation)
  ctx.fillStyle = '#a5a5a5';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.82, width * 0.48, height * 0.17, 0, 0, Math.PI * 2);
  ctx.fill();

  // Raised crater rims with depressed floors
  const craters = [
    { x: width * 0.51, y: height * 0.78, r: 14 }, // Tycho
    { x: width * 0.46, y: height * 0.43, r: 12 }, // Copernicus
    { x: width * 0.28, y: height * 0.38, r: 9 },  // Aristarchus
    { x: width * 0.58, y: height * 0.89, r: 11 }, // South Pole
  ];

  craters.forEach(c => {
    // Raised rim (white)
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r + 2, 0, Math.PI * 2);
    ctx.fill();
    // Depressed floor (dark)
    ctx.fillStyle = '#202020';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r - 2, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['moon_bump'] = texture;
  return texture;
}

// ============================================================================
// 4. PHOTOREALISTIC REAL-COLOR MARS TEXTURE (ISRO Mangalyaan MOM Palette 2048x1024)
// ============================================================================
export function getMarsTexture(): THREE.CanvasTexture {
  if (textureCache['mars_vibrant_real']) return textureCache['mars_vibrant_real'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Authentic Mars butterscotch / ferric-oxide golden-brown gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#a14820');
  grad.addColorStop(0.3, '#bf622d');
  grad.addColorStop(0.6, '#c96c34');
  grad.addColorStop(1, '#9b431c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Basaltic Volcanic Dark Albedo Regions (#3d261c to #28160f)
  ctx.fillStyle = '#3a2318';

  // SYRTIS MAJOR PLANUM (Iconic dark triangular shield volcano province)
  ctx.beginPath();
  ctx.moveTo(width * 0.65, height * 0.38);
  ctx.lineTo(width * 0.75, height * 0.53);
  ctx.lineTo(width * 0.60, height * 0.56);
  ctx.closePath();
  ctx.fill();

  // ACIDALIA PLANITIA & MARE ERYTHRAEUM
  ctx.beginPath();
  ctx.ellipse(width * 0.36, height * 0.62, width * 0.16, height * 0.13, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // HELLAS PLANITIA (Vast southern impact basin)
  ctx.beginPath();
  ctx.ellipse(width * 0.78, height * 0.68, width * 0.08, height * 0.065, 0, 0, Math.PI * 2);
  ctx.fill();

  // VALLES MARINERIS (Grand Canyon of Mars, 4000 km grand rift valley system)
  ctx.strokeStyle = '#221109';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(width * 0.22, height * 0.55);
  ctx.lineTo(width * 0.45, height * 0.58);
  ctx.stroke();

  // OLYMPUS MONS (Largest volcano in Solar System, 22 km summit caldera)
  const olyX = width * 0.18;
  const olyY = height * 0.42;
  ctx.fillStyle = '#7d3818';
  ctx.beginPath();
  ctx.arc(olyX, olyY, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2d140a';
  ctx.beginPath();
  ctx.arc(olyX, olyY, 20, 0, Math.PI * 2);
  ctx.fill();

  // THARSIS MONTES (Trio of giant shield volcanoes)
  [
    { x: width * 0.24, y: height * 0.38 }, // Ascraeus Mons
    { x: width * 0.22, y: height * 0.47 }, // Pavonis Mons
    { x: width * 0.20, y: height * 0.56 }, // Arsia Mons
  ].forEach(v => {
    ctx.fillStyle = '#6e3014';
    ctx.beginPath();
    ctx.arc(v.x, v.y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#261108';
    ctx.beginPath();
    ctx.arc(v.x, v.y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Polar Ice Caps (Brilliant pure white carbon dioxide & water-ice frost)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height * 0.068); // Planum Boreum (North)
  ctx.fillRect(0, height * 0.935, width, height * 0.065); // Planum Australe (South)

  // Surface ferric oxide dust noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 18;
    data[i] = Math.max(0, Math.min(255, data[i] + grain));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain * 0.8));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain * 0.6));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['mars_vibrant_real'] = texture;
  return texture;
}

// ============================================================================
// 4B. MARS BUMP / TOPOGRAPHY HEIGHT MAP (Olympus Mons & Valles Marineris)
// ============================================================================
export function getMarsBumpMap(): THREE.CanvasTexture {
  if (textureCache['mars_bump']) return textureCache['mars_bump'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#787878';
  ctx.fillRect(0, 0, width, height);

  // Olympus Mons (Massive white height bump = 22 km summit)
  const olyX = width * 0.18;
  const olyY = height * 0.42;
  const olyGrad = ctx.createRadialGradient(olyX, olyY, 5, olyX, olyY, 32);
  olyGrad.addColorStop(0, '#ffffff');
  olyGrad.addColorStop(0.7, '#c0c0c0');
  olyGrad.addColorStop(1, '#787878');
  ctx.fillStyle = olyGrad;
  ctx.beginPath();
  ctx.arc(olyX, olyY, 32, 0, Math.PI * 2);
  ctx.fill();

  // Valles Marineris (Deep dark rift trench)
  ctx.strokeStyle = '#202020';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(width * 0.22, height * 0.55);
  ctx.lineTo(width * 0.45, height * 0.58);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['mars_bump'] = texture;
  return texture;
}

// ============================================================================
// 5. PHOTOREALISTIC RADIANT SUN TEXTURE (5,778K Photosphere Solar Granulation)
// ============================================================================
export function getSunTexture(): THREE.CanvasTexture {
  if (textureCache['sun_vibrant_real']) return textureCache['sun_vibrant_real'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 5,778K thermal radiation gradient with physical solar limb darkening
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#ea580c');
  grad.addColorStop(0.18, '#f59e0b');
  grad.addColorStop(0.38, '#fef08a');
  grad.addColorStop(0.5, '#fffbeb'); // Intense white-gold thermal emission core
  grad.addColorStop(0.62, '#fef08a');
  grad.addColorStop(0.82, '#f59e0b');
  grad.addColorStop(1, '#ea580c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Convective Granulation Cells (plasma boiling surface)
  for (let i = 0; i < 700; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 3 + Math.random() * 16;
    ctx.fillStyle = Math.random() > 0.75 ? '#f59e0b' : '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Active Sunspot Magnetic Groups (Aditya-L1 SUIT & VELC Active Regions)
  const sunspots = [
    { x: width * 0.36, y: height * 0.44, r: 26 },
    { x: width * 0.40, y: height * 0.48, r: 16 },
    { x: width * 0.74, y: height * 0.52, r: 28 },
    { x: width * 0.79, y: height * 0.49, r: 15 },
    { x: width * 0.58, y: height * 0.41, r: 20 },
  ];

  sunspots.forEach(s => {
    // Penumbra (Cooler plasma ~4,500K)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    // Umbra (Strongest magnetic field, ~3,700K)
    ctx.fillStyle = '#180702';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 0.48, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['sun_vibrant_real'] = texture;
  return texture;
}

// ============================================================================
// 6. SPACECRAFT SOLAR ARRAY TEXTURE (Photorealistic Silicon Photovoltaic Cells)
// ============================================================================
export function getSolarPanelTexture(): THREE.CanvasTexture {
  if (textureCache['solar_panel']) return textureCache['solar_panel'];

  const width = 512;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep space-grade silicon cell background
  ctx.fillStyle = '#060d1f';
  ctx.fillRect(0, 0, width, height);

  const cols = 8;
  const rows = 8;
  const cellW = width / cols;
  const cellH = height / rows;
  const pad = 3;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW + pad;
      const y = r * cellH + pad;
      const w = cellW - pad * 2;
      const h = cellH - pad * 2;

      // Photovoltaic cell gradient (anti-reflective coating deep blue with subtle violet sheen)
      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, '#102a5c');
      grad.addColorStop(0.5, '#0b1d42');
      grad.addColorStop(1, '#071530');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Fine silver grid conductors (fingers)
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = 1;
      const fingerCount = 6;
      for (let f = 1; f < fingerCount; f++) {
        const fy = y + (h / fingerCount) * f;
        ctx.beginPath();
        ctx.moveTo(x + 2, fy);
        ctx.lineTo(x + w - 2, fy);
        ctx.stroke();
      }

      // Silver busbars (thick vertical contact strips)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.33, y);
      ctx.lineTo(x + w * 0.33, y + h);
      ctx.moveTo(x + w * 0.66, y);
      ctx.lineTo(x + w * 0.66, y + h);
      ctx.stroke();
    }
  }

  // Inter-cell panel border grid
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath();
    ctx.moveTo(c * cellW, 0);
    ctx.lineTo(c * cellW, height);
    ctx.stroke();
  }
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * cellH);
    ctx.lineTo(width, r * cellH);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache['solar_panel'] = texture;
  return texture;
}

// 7. EMBOSSED GOLD MLI FOIL TEXTURE (ISRO & NASA Kapton Multi-Layer Insulation)
export function getGoldFoilTexture(): THREE.CanvasTexture {
  if (textureCache['gold_foil_mli']) return textureCache['gold_foil_mli'];

  const width = 512;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Vibrant gold base
  ctx.fillStyle = '#d97706';
  ctx.fillRect(0, 0, width, height);

  // Embossed crinkle pattern simulation
  const tileSize = 32;
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      // Randomized crinkled facet
      const shade = pseudoRandom(x, y);
      const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
      if (shade > 0.6) {
        grad.addColorStop(0, '#fbbf24');
        grad.addColorStop(0.5, '#f59e0b');
        grad.addColorStop(1, '#b45309');
      } else if (shade > 0.3) {
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.5, '#d97706');
        grad.addColorStop(1, '#92400e');
      } else {
        grad.addColorStop(0, '#d97706');
        grad.addColorStop(0.5, '#b45309');
        grad.addColorStop(1, '#78350f');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

      // Crinkle crease highlights & seam lines
      ctx.strokeStyle = shade > 0.5 ? 'rgba(254, 240, 138, 0.45)' : 'rgba(120, 53, 15, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache['gold_foil_mli'] = texture;
  return texture;
}
