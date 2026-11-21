import * as THREE from 'three';

// Cache generated textures so we only create them once
const textureCache: Record<string, THREE.CanvasTexture> = {};

// Helper: Pseudo-random noise function for realistic terrain fractals
function pseudoRandom(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

// 1. PHOTOREALISTIC REAL-COLOR EARTH TEXTURE (NASA Blue Marble True-Color Palette)
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
  oceanGrad.addColorStop(0, '#0a2347');
  oceanGrad.addColorStop(0.2, '#0d3161');
  oceanGrad.addColorStop(0.5, '#103d78'); // Equatorial ocean blue
  oceanGrad.addColorStop(0.8, '#0d3161');
  oceanGrad.addColorStop(1, '#0a2347');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Shallow continental shelves (Luminous turquoise/cyan coastal fringes)
  ctx.fillStyle = 'rgba(14, 145, 175, 0.55)';

  // Eurasia & India landmass
  ctx.beginPath();
  ctx.ellipse(width * 0.66, height * 0.36, width * 0.20, height * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Boreal forest / Taiga green (Siberia and northern Europe)
  ctx.fillStyle = '#1e5225';
  ctx.beginPath();
  ctx.ellipse(width * 0.67, height * 0.27, width * 0.19, height * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  // INDIAN SUBCONTINENT (Vibrant lush green agricultural basin & Western Ghats)
  ctx.fillStyle = '#2e7535'; // Rich tropical green
  ctx.beginPath();
  ctx.moveTo(width * 0.67, height * 0.40);
  ctx.lineTo(width * 0.735, height * 0.40);
  ctx.lineTo(width * 0.702, height * 0.59); // Kanyakumari southern tip
  ctx.closePath();
  ctx.fill();

  // Sri Lanka island
  ctx.beginPath();
  ctx.ellipse(width * 0.708, height * 0.61, 8, 12, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Coastal turquoise shallows around India (Gulf of Mannar, Sundarbans)
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
  ctx.lineWidth = 6;
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
  // Sahara Desert & Arabian Peninsula
  ctx.fillStyle = '#d49b52';
  ctx.beginPath();
  ctx.ellipse(width * 0.52, height * 0.39, width * 0.09, height * 0.085, 0, 0, Math.PI * 2);
  ctx.fill();
  // Arabian Peninsula
  ctx.beginPath();
  ctx.ellipse(width * 0.61, height * 0.42, width * 0.038, height * 0.048, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // Central Congo Rainforest (Deep lush emerald green)
  ctx.fillStyle = '#164d18';
  ctx.beginPath();
  ctx.ellipse(width * 0.53, height * 0.56, width * 0.07, height * 0.095, 0, 0, Math.PI * 2);
  ctx.fill();

  // Southern African savanna & grasslands
  ctx.fillStyle = '#806d3b';
  ctx.beginPath();
  ctx.ellipse(width * 0.54, height * 0.71, width * 0.048, height * 0.085, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // AMERICAS (North American forests & South American Amazon)
  ctx.fillStyle = '#29632d'; // North America
  ctx.beginPath();
  ctx.ellipse(width * 0.23, height * 0.34, width * 0.085, height * 0.16, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Amazon Rainforest (World's densest green jungle)
  ctx.fillStyle = '#114414';
  ctx.beginPath();
  ctx.ellipse(width * 0.30, height * 0.65, width * 0.07, height * 0.17, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // AUSTRALIA (Outback rusty red-gold ochre)
  ctx.fillStyle = '#a6542d';
  ctx.beginPath();
  ctx.ellipse(width * 0.84, height * 0.72, width * 0.065, height * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  // POLAR ICE CAPS (Pure brilliant white glacial sheets)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height * 0.08); // Arctic
  ctx.fillRect(0, height * 0.90, width, height * 0.10); // Antarctica

  // Add terrain elevation fractal noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const idx = (y * width + x) * 4;
      const noise = (pseudoRandom(x * 0.06, y * 0.06) - 0.5) * 24;
      data[idx] = Math.max(0, Math.min(255, data[idx] + noise));
      data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + noise));
      data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + noise));
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache['earth_vibrant_real'] = texture;
  return texture;
}

// 2. REALISTIC TRANSLUCENT SWIRLING CLOUDS
export function getEarthCloudTexture(): THREE.CanvasTexture {
  if (textureCache['clouds_vibrant_real']) return textureCache['clouds_vibrant_real'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, width, height);

  // Soft atmospheric cloud bands
  ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
  for (let i = 0; i < 48; i++) {
    const x = Math.random() * width;
    const y = height * 0.16 + Math.random() * height * 0.68;
    const rx = 40 + Math.random() * 120;
    const ry = 8 + Math.random() * 24;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cyclonic spirals (Tropical monsoon depression over Bay of Bengal)
  const storms = [
    { x: width * 0.69, y: height * 0.44, r: 42 }, // Bay of Bengal depression
    { x: width * 0.28, y: height * 0.36, r: 44 }, // Atlantic hurricane
    { x: width * 0.86, y: height * 0.38, r: 40 }, // Pacific typhoon
  ];

  storms.forEach(s => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 0.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 1.35, 0, Math.PI * 1.3);
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['clouds_vibrant_real'] = texture;
  return texture;
}

// 3. PHOTOREALISTIC REAL-COLOR MOON TEXTURE (Authentic High-Contrast Lunar Albedo)
export function getMoonTexture(): THREE.CanvasTexture {
  if (textureCache['moon_vibrant_real']) return textureCache['moon_vibrant_real'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Baseline Lunar Regolith: Silver-grey anorthosite crust (#828894 to #9197a3)
  ctx.fillStyle = '#8a909d';
  ctx.fillRect(0, 0, width, height);

  // Basaltic Lunar Maria (Dark volcanic plains, authentic charcoal basalt, #282b31 to #383b43)
  const maria = [
    { x: width * 0.34, y: height * 0.44, rx: 125, ry: 100, color: '#30333a' }, // Oceanus Procellarum
    { x: width * 0.53, y: height * 0.37, rx: 78, ry: 54, color: '#2b2e35' },  // Mare Imbrium
    { x: width * 0.67, y: height * 0.46, rx: 65, ry: 48, color: '#343840' },  // Mare Serenitatis
    { x: width * 0.74, y: height * 0.53, rx: 60, ry: 44, color: '#272b33' },  // Mare Tranquillitatis (Titanium-rich dark slate)
    { x: width * 0.81, y: height * 0.50, rx: 48, ry: 40, color: '#2f3239' },  // Mare Crisium
    { x: width * 0.73, y: height * 0.63, rx: 52, ry: 38, color: '#353941' },  // Mare Nectaris
    { x: width * 0.80, y: height * 0.62, rx: 50, ry: 42, color: '#31343c' },  // Mare Fecunditatis
  ];

  maria.forEach(m => {
    ctx.fillStyle = m.color;
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, 0.08, 0, Math.PI * 2);
    ctx.fill();
  });

  // Lunar Highlands (Lighter feldspathic anorthosite rock, #a4abb8)
  ctx.fillStyle = 'rgba(172, 179, 192, 0.38)';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.82, width * 0.46, height * 0.17, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fresh Impact Craters with Prominent Ejecta Rays (Brilliant high-albedo crushed rock, #e8edf5)
  // 1. TYCHO CRATER (Spectacular southern ray system radiating across entire hemisphere)
  const tychoX = width * 0.51;
  const tychoY = height * 0.76;
  ctx.strokeStyle = 'rgba(238, 242, 250, 0.45)';
  ctx.lineWidth = 1.8;
  for (let a = 0; a < 28; a++) {
    const angle = (a * Math.PI) / 14;
    const rayLength = 90 + (a % 4) * 65;
    ctx.beginPath();
    ctx.moveTo(tychoX, tychoY);
    ctx.lineTo(tychoX + Math.cos(angle) * rayLength, tychoY + Math.sin(angle) * rayLength);
    ctx.stroke();
  }
  // Tycho Crater Rim, Central Peak & Shadow Floor
  ctx.fillStyle = '#f1f5fb';
  ctx.beginPath();
  ctx.arc(tychoX, tychoY, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1c1f24'; // Deep crater shadow
  ctx.beginPath();
  ctx.arc(tychoX + 1.5, tychoY + 1.5, 9.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff'; // Central peak
  ctx.beginPath();
  ctx.arc(tychoX, tychoY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // 2. COPERNICUS CRATER (Bright rayed crater in Oceanus Procellarum)
  const copX = width * 0.46;
  const copY = height * 0.43;
  ctx.fillStyle = '#e2e8f2';
  ctx.beginPath();
  ctx.arc(copX, copY, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22252a';
  ctx.beginPath();
  ctx.arc(copX + 1, copY + 1, 8.5, 0, Math.PI * 2);
  ctx.fill();

  // 3. KEPLER & ARISTARCHUS CRATERS
  const ariX = width * 0.28;
  const ariY = height * 0.38;
  ctx.fillStyle = '#ffffff'; // Brightest crater on Moon
  ctx.beginPath();
  ctx.arc(ariX, ariY, 11, 0, Math.PI * 2);
  ctx.fill();

  // 4. SHIV SHAKTI POINT / SOUTH POLE CRATER BASINS (69.37° S)
  const sspX = width * 0.58;
  const sspY = height * 0.88;
  // Deep permanently shadowed crater cold traps
  ctx.fillStyle = '#101216';
  ctx.beginPath();
  ctx.arc(sspX, sspY, 15, 0, Math.PI * 2);
  ctx.fill();
  // Illuminated sunlit golden rim
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sspX, sspY, 15, Math.PI * 0.7, Math.PI * 1.5);
  ctx.stroke();

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

// 4. PHOTOREALISTIC REAL-COLOR MARS TEXTURE (Authentic Butterscotch / Rust Iron-Oxide Palette)
export function getMarsTexture(): THREE.CanvasTexture {
  if (textureCache['mars_vibrant_real']) return textureCache['mars_vibrant_real'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Real Mars is butterscotch / rusty golden-brown (#ba5d2a to #cc6f38)
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#a64d23');
  grad.addColorStop(0.3, '#c26530');
  grad.addColorStop(0.6, '#cb7039');
  grad.addColorStop(1, '#9e461f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Basaltic Volcanic Dark Albedo Regions (#3d261c)
  ctx.fillStyle = '#3d261c';

  // SYRTIS MAJOR PLANUM (Iconic dark triangular shield volcano region)
  ctx.beginPath();
  ctx.moveTo(width * 0.65, height * 0.38);
  ctx.lineTo(width * 0.74, height * 0.52);
  ctx.lineTo(width * 0.61, height * 0.55);
  ctx.closePath();
  ctx.fill();

  // ACIDALIA PLANITIA & MARE ERYTHRAEUM
  ctx.beginPath();
  ctx.ellipse(width * 0.36, height * 0.62, width * 0.15, height * 0.12, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // VALLES MARINERIS (Grand Canyon of Mars, 4000 km grand rift valley)
  ctx.strokeStyle = '#24130c';
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(width * 0.22, height * 0.55);
  ctx.lineTo(width * 0.44, height * 0.58);
  ctx.stroke();

  // OLYMPUS MONS (Largest volcano in Solar System, 22 km summit caldera)
  const olyX = width * 0.18;
  const olyY = height * 0.42;
  ctx.fillStyle = '#823c1b';
  ctx.beginPath();
  ctx.arc(olyX, olyY, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#33190f';
  ctx.beginPath();
  ctx.arc(olyX, olyY, 12, 0, Math.PI * 2);
  ctx.fill();

  // Polar Ice Caps (Brilliant pure white carbon dioxide & water-ice frost)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height * 0.065); // Planum Boreum (North)
  ctx.fillRect(0, height * 0.94, width, height * 0.06); // Planum Australe (South)

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

// 5. PHOTOREALISTIC RADIANT SUN TEXTURE (5,778K Photosphere Thermal Emission)
export function getSunTexture(): THREE.CanvasTexture {
  if (textureCache['sun_vibrant_real']) return textureCache['sun_vibrant_real'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Brilliant 5,778K thermal radiation gradient (White-gold core with limb darkening)
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#f59e0b');
  grad.addColorStop(0.2, '#fef08a');
  grad.addColorStop(0.5, '#fffbeb'); // Intense white-gold thermal emission
  grad.addColorStop(0.8, '#fef08a');
  grad.addColorStop(1, '#f59e0b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Convective Granulation Cells
  for (let i = 0; i < 350; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 3 + Math.random() * 14;
    ctx.fillStyle = Math.random() > 0.8 ? '#f59e0b' : '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Active Sunspot Magnetic Regions (Dark central umbra + fibrous penumbra)
  const sunspots = [
    { x: width * 0.36, y: height * 0.44, r: 18 },
    { x: width * 0.40, y: height * 0.48, r: 12 },
    { x: width * 0.74, y: height * 0.52, r: 20 },
    { x: width * 0.78, y: height * 0.49, r: 10 },
  ];

  sunspots.forEach(s => {
    // Penumbra (Cooler plasma ~4,500K)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    // Umbra (Strongest magnetic field, ~3,700K)
    ctx.fillStyle = '#1e0c04';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 0.48, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache['sun_vibrant_real'] = texture;
  return texture;
}

// 6. SPACECRAFT SOLAR ARRAY TEXTURE
export function getSolarPanelTexture(): THREE.CanvasTexture {
  if (textureCache['solar_panel']) return textureCache['solar_panel'];

  const width = 256;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#1e3a8a';
  const cellSize = 32;
  for (let y = 2; y < height; y += cellSize) {
    for (let x = 2; x < width; x += cellSize) {
      ctx.fillRect(x, y, cellSize - 4, cellSize - 4);
    }
  }

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache['solar_panel'] = texture;
  return texture;
}
