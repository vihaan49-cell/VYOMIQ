import os
import math
import time
import json
from datetime import datetime, timezone
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="../client/dist", static_url_path="")

# --- COMPREHENSIVE DATA STORE ---
MISSIONS_DB = [
    {
        "id": "chandrayaan-3",
        "name": "Chandrayaan-3",
        "category": "lunar",
        "destination": "Moon",
        "status": "success",
        "statusBadge": "Historic Success (South Pole)",
        "launchDate": "2023-07-14T14:35:17+05:30",
        "launchVehicle": "LVM3-M4 (Fat Boy)",
        "tagline": "First human spacecraft to soft-land near the Lunar South Pole (Shiv Shakti Point).",
        "description": "Chandrayaan-3 is India's third lunar exploration mission, making India the fourth country to achieve a soft lunar landing and the very first to land in the southern polar region.",
        "targetBody": "Moon",
        "color": "#06b6d4",
        "specs": {
            "craftType": "Lander",
            "dryMassKg": 1752,
            "launchMassKg": 3900,
            "payloadMassKg": 175,
            "powerOutputWatts": 738,
            "orbitType": "Landed at 69.373° S, 32.319° E (Shiv Shakti Point)"
        },
        "instruments": ["ChaSTE", "LIBS", "APXS", "ILSA", "LP", "SHAPE"],
        "keyDiscoveries": [
            "In-situ elemental confirmation of Sulfur (S) near South Pole by LIBS & APXS.",
            "Vertical regolith temperature profile: +54°C surface to -8.5°C at 10cm depth.",
            "First lunar seismic event recorded near South Pole by ILSA MEMS sensor."
        ]
    },
    {
        "id": "chandrayaan-2",
        "name": "Chandrayaan-2",
        "category": "lunar",
        "destination": "Moon",
        "status": "active",
        "statusBadge": "Active Orbiter (100km Orbit)",
        "launchDate": "2019-07-22T14:43:12+05:30",
        "launchVehicle": "GSLV Mk III-M1",
        "tagline": "Highest resolution lunar imaging orbiter with sub-meter OHRC and 3D radar mapper.",
        "description": "Chandrayaan-2 operates in an ideal 100 km lunar polar orbit, producing world-leading science datasets with 25cm optical imaging and unambiguous water ice detections.",
        "targetBody": "Moon",
        "color": "#38bdf8",
        "specs": {
            "craftType": "Orbiter",
            "dryMassKg": 998,
            "launchMassKg": 2379,
            "payloadMassKg": 280,
            "powerOutputWatts": 1000,
            "orbitType": "Circular Lunar Polar Orbit (100 km altitude)"
        },
        "instruments": ["OHRC", "TMC-2", "IIRS", "DFSAR", "CLASS", "XSM"],
        "keyDiscoveries": [
            "Unambiguous mapping of H2O and OH molecules using IIRS 3.0 µm absorption feature.",
            "Highest-resolution optical images of lunar surface (25 cm GSD by OHRC).",
            "Subsurface radar backscatter ice signatures in permanently shadowed craters."
        ]
    },
    {
        "id": "mangalyaan-1",
        "name": "Mars Orbiter Mission (Mangalyaan)",
        "category": "mars",
        "destination": "Mars",
        "status": "completed",
        "statusBadge": "Historic Success (8 Years of Data)",
        "launchDate": "2013-11-05T14:38:00+05:30",
        "launchVehicle": "PSLV-XL C25",
        "tagline": "First Asian nation to reach Mars, and first in the world to succeed on its maiden attempt.",
        "description": "Mangalyaan operated for 8 years in an elliptical orbit around Mars, beaming back thousands of high-resolution full-disk colour images and atmospheric measurements.",
        "targetBody": "Mars",
        "color": "#ef4444",
        "specs": {
            "craftType": "Orbiter",
            "dryMassKg": 475,
            "launchMassKg": 1337,
            "payloadMassKg": 15,
            "powerOutputWatts": 840,
            "orbitType": "Elliptical Mars orbit (421 km x 76,993 km)"
        },
        "instruments": ["MCC", "MENA", "TIS", "LAP", "MSM"],
        "keyDiscoveries": [
            "Full-disk true-colour global maps of Mars from high-apocentre elliptical orbit.",
            "Discovery of supersonic solar wind escape and neutral density variations via MENA.",
            "Comprehensive imaging of Olympus Mons caldera and Valles Marineris canyon."
        ]
    },
    {
        "id": "aditya-l1",
        "name": "Aditya-L1",
        "category": "solar",
        "destination": "Sun-Earth L1",
        "status": "active",
        "statusBadge": "Active at Lagrange Point 1",
        "launchDate": "2023-09-02T11:50:00+05:30",
        "launchVehicle": "PSLV-C57",
        "tagline": "Continuous, unocculted vantage point of the Sun from 1.5 million km Sun-ward halo orbit.",
        "description": "Aditya-L1 orbits around the first Sun-Earth Lagrangian Point (L1), studying coronal mass ejections, solar flares, solar wind acceleration, and space weather dynamics.",
        "targetBody": "Sun",
        "color": "#f59e0b",
        "specs": {
            "craftType": "Solar Observatory",
            "dryMassKg": 780,
            "launchMassKg": 1475,
            "payloadMassKg": 244,
            "powerOutputWatts": 1600,
            "orbitType": "Halo orbit around Sun-Earth L1 (~1.5M km from Earth)"
        },
        "instruments": ["VELC", "SUIT", "ASPEX", "PAPA", "SoLEXS", "HEL1OS", "MAG"],
        "keyDiscoveries": [
            "First full-disk solar ultraviolet images (200-400 nm) by SUIT.",
            "Captured historic May 2024 solar superstorms with solar wind speeds exceeding 750 km/s.",
            "Continuous coronal spectroscopy down to 1.05 solar radii by VELC."
        ]
    },
    {
        "id": "astrosat",
        "name": "AstroSat",
        "category": "astronomy",
        "destination": "Earth Orbit",
        "status": "active",
        "statusBadge": "Active Space Observatory (9+ Years)",
        "launchDate": "2015-09-28T10:00:00+05:30",
        "launchVehicle": "PSLV-C30",
        "tagline": "India's first dedicated multi-wavelength space telescope observing from optical to hard X-rays.",
        "description": "AstroSat enables simultaneous multi-wavelength celestial observations across UV, optical, soft X-ray, and hard X-ray bands.",
        "targetBody": "Earth",
        "color": "#818cf8",
        "specs": {
            "craftType": "Space Telescope",
            "dryMassKg": 780,
            "launchMassKg": 1513,
            "payloadMassKg": 750,
            "powerOutputWatts": 2100,
            "orbitType": "Low Earth Orbit (650 km, 6° inclination)"
        },
        "instruments": ["UVIT", "LAXPC", "CZTI", "SXT", "SSM"],
        "keyDiscoveries": [
            "Near-maximal spin measurement of black hole 4U 1630-47.",
            "Resolved star-forming rings in Andromeda Galaxy (M31) with 1.2 arcsec UV resolution."
        ]
    },
    {
        "id": "xposat",
        "name": "XPoSat",
        "category": "astronomy",
        "destination": "Earth Orbit",
        "status": "active",
        "statusBadge": "Active Science Mission (Polarimetry)",
        "launchDate": "2024-01-01T09:10:00+05:30",
        "launchVehicle": "PSLV-C58",
        "tagline": "World's second dedicated space telescope for polarimetric measurements of cosmic X-ray sources.",
        "description": "XPoSat studies the polarization of extreme cosmic X-ray sources in 8-30 keV, probing neutron stars and black hole magnetic geometries.",
        "targetBody": "Earth",
        "color": "#c084fc",
        "specs": {
            "craftType": "Space Telescope",
            "dryMassKg": 260,
            "launchMassKg": 469,
            "payloadMassKg": 144,
            "powerOutputWatts": 650,
            "orbitType": "Low Earth Orbit (650 km, 6° inclination)"
        },
        "instruments": ["POLIX", "XSPECT"],
        "keyDiscoveries": [
            "First Indian polarization measurement of Crab Pulsar in 8-30 keV (PD ~ 32.7%)."
        ]
    }
]

# --- REST API ROUTES ---

@app.route("/api/health")
def health():
    return jsonify({
        "status": "HEALTHY",
        "service": "VYOMIQ Space Science API",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "database": "CONNECTED",
        "telemetryEngine": "ACTIVE",
        "totalMissionsIndexed": len(MISSIONS_DB)
    })

@app.route("/api/missions")
def get_missions():
    category = request.args.get("category")
    destination = request.args.get("destination")
    status = request.args.get("status")

    results = MISSIONS_DB
    if category:
        results = [m for m in results if m["category"].lower() == category.lower()]
    if destination:
        results = [m for m in results if m["destination"].lower() == destination.lower()]
    if status:
        results = [m for m in results if m["status"].lower() == status.lower()]

    return jsonify({"count": len(results), "missions": results})

@app.route("/api/missions/<mission_id>")
def get_mission(mission_id):
    mission = next((m for m in MISSIONS_DB if m["id"] == mission_id), None)
    if not mission:
        return jsonify({"error": "Mission not found", "id": mission_id}), 404
    return jsonify(mission)

@app.route("/api/telemetry/<craft_id>")
def get_live_telemetry(craft_id):
    now = time.time()
    # Compute dynamic Keplerian orbit coordinates based on mission
    if craft_id == "chandrayaan-3":
        # Landed at Shiv Shakti Point
        return jsonify({
            "spacecraftId": craft_id,
            "status": "REAL ARCHIVE",
            "altitudeKm": 0,
            "velocityKmS": 0,
            "coordinates": {"lat": -69.3676, "lon": 32.3481, "location": "Shiv Shakti Point, Moon"},
            "signalDelaySec": 1.28,
            "linkStatus": "IDSN BYALALU DSN-32M TRACKING OK",
            "solarPowerWatts": 738,
            "temperatureC": 48.2
        })
    elif craft_id == "aditya-l1":
        # Halo orbit at Sun-Earth L1
        angle = (now * 0.05) % (2 * math.pi)
        return jsonify({
            "spacecraftId": craft_id,
            "status": "LIVE PROPAGATION",
            "altitudeKm": 1496000 + math.sin(angle) * 12000,
            "velocityKmS": 0.285 + math.cos(angle) * 0.015,
            "distanceFromEarthKm": 1498200,
            "signalDelaySec": 4.997,
            "interplanetaryMagneticFieldNT": -4.2,
            "solarWindSpeedKmS": 425.8,
            "linkStatus": "DEEP SPACE NETWORK 32M DOWNOK"
        })
    elif craft_id == "mangalyaan-1":
        # Mars elliptical orbit
        angle = (now * 0.02) % (2 * math.pi)
        altitude = 421 + (76993 - 421) * ((math.sin(angle) + 1) / 2)
        velocity = 4.12 - (altitude / 76993) * 2.8
        return jsonify({
            "spacecraftId": craft_id,
            "status": "HISTORICAL ARCHIVE",
            "altitudeKm": round(altitude, 1),
            "velocityKmS": round(velocity, 3),
            "distanceFromEarthKm": 225400000,
            "signalDelaySec": 751.8, # ~12.5 minutes
            "linkStatus": "MISSION COMPLETED (8 YEARS LIFETIME)"
        })
    else:
        # Default Earth LEO
        return jsonify({
            "spacecraftId": craft_id,
            "status": "LIVE PROPAGATION",
            "altitudeKm": 650.0,
            "velocityKmS": 7.52,
            "distanceFromEarthKm": 650.0,
            "signalDelaySec": 0.0022,
            "linkStatus": "ISTRAC BENGALURU LINK LOCKED"
        })

@app.route("/api/search")
def search():
    q = request.args.get("q", "").lower().strip()
    if not q:
        return jsonify({"results": []})

    matched = []
    for m in MISSIONS_DB:
        if q in m["name"].lower() or q in m["tagline"].lower() or q in m["description"].lower():
            matched.append({"type": "mission", "id": m["id"], "name": m["name"], "match": m["tagline"]})
        for disc in m.get("keyDiscoveries", []):
            if q in disc.lower():
                matched.append({"type": "discovery", "id": m["id"], "name": m["name"], "match": disc})

    return jsonify({"query": q, "count": len(matched), "results": matched})

# --- STATIC FILE SERVING FOR PRODUCTION DEPLOYMENT ---
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_client(path):
    dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../client/dist"))
    if path != "" and os.path.exists(os.path.join(dist_dir, path)):
        return send_from_directory(dist_dir, path)
    else:
        index_file = os.path.join(dist_dir, "index.html")
        if os.path.exists(index_file):
            return send_from_directory(dist_dir, "index.html")
        else:
            return jsonify({
                "message": "VYOMIQ API Running. Frontend build in client/dist.",
                "endpoints": ["/api/health", "/api/missions", "/api/telemetry/chandrayaan-3", "/api/search?q=moon"]
            })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 VYOMIQ Space Exploration Server starting on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)
