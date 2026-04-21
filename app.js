const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");
const sceneFrame = document.querySelector(".scene-frame");

const presetSelect = document.getElementById("presetSelect");
const latInput = document.getElementById("latInput");
const lonInput = document.getElementById("lonInput");
const geolocateBtn = document.getElementById("geolocateBtn");
const shareBtn = document.getElementById("shareBtn");
const saveCardBtn = document.getElementById("saveCardBtn");
const nowBtn = document.getElementById("nowBtn");
const liveBtn = document.getElementById("liveBtn");
const timeLabel = document.getElementById("timeLabel");
const timezoneLabel = document.getElementById("timezoneLabel");
const dateInput = document.getElementById("dateInput");
const clockInput = document.getElementById("clockInput");
const selectionCard = document.getElementById("selectionCard");
const recommendationCard = document.getElementById("recommendationCard");
const seoHeadline = document.getElementById("seoHeadline");
const seoSummary = document.getElementById("seoSummary");
const seoBody = document.getElementById("seoBody");
const tipsBody = document.getElementById("tipsBody");
const faqBody = document.getElementById("faqBody");
const cityLinks = document.getElementById("cityLinks");
const eventsBody = document.getElementById("eventsBody");
const timesCard = document.getElementById("timesCard");
const metaDescription = document.getElementById("metaDescription");
const canonicalLink = document.getElementById("canonicalLink");
const speedButtons = [...document.querySelectorAll("[data-speed]")];
const toggleButtons = [...document.querySelectorAll("[data-toggle]")];
const beginnerModeBtn = document.getElementById("beginnerModeBtn");
const SPEED_MIN = -86400;
const SPEED_MAX = 86400;
const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const AFFILIATE_LINKS = {
  telescopes: "https://www.amazon.com/s?k=beginner+telescope",
  binoculars: "https://www.amazon.com/s?k=astronomy+binoculars",
  moon: "https://www.amazon.com/s?k=moon+filter+telescope",
  tracker: "https://www.amazon.com/s?k=star+tracker",
};

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;
const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
const MS_PER_DAY = 86400000;
const OBLIQUITY = 23.43928 * DEG;
const SUN_CONE_HALF_ANGLE = 30 * DEG;
const EARTH_ELEMENTS = {
  a: [1.00000261, 0.00000562],
  e: [0.01671123, -0.00004392],
  I: [-0.00001531, -0.01294668],
  L: [100.46457166, 35999.37244981],
  wBar: [102.93768193, 0.32327364],
  Omega: [0, 0],
};
const ANDROMEDA = {
  name: "Andromeda",
  ra: (0 + 42 / 60 + 44.3 / 3600) * 15 * DEG,
  dec: (41 + 16 / 60 + 9 / 3600) * DEG,
  color: "#b8a8ff",
};
const MOON_DISPLAY_SCALE_AU = 0.12;
const EARTH_DISPLAY = {
  name: "Earth",
  color: "#468dff",
  land: "#58d68d",
  size: 10,
  orbitScale: 1,
  doodle: "earth",
};

const places = {
  custom: { name: "Custom", lat: 50.8503, lon: 4.3517 },
  brussels: { name: "Brussels", lat: 50.8503, lon: 4.3517 },
  newyork: { name: "New York", lat: 40.7128, lon: -74.006 },
  tokyo: { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  sydney: { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  capeTown: { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
  saoPaulo: { name: "Sao Paulo", lat: -23.5505, lon: -46.6333 },
};

const planets = [
  {
    name: "Moon",
    color: "#d8d8d8",
    size: 5,
    orbitScale: 1.08,
    isMoon: true,
    doodle: "moon",
  },
  {
    name: "Mercury",
    color: "#bcbcbc",
    size: 6,
    orbitScale: 0.39,
    doodle: "mercury",
    elements: {
      a: [0.38709927, 0.00000037],
      e: [0.20563593, 0.00001906],
      I: [7.00497902, -0.00594749],
      L: [252.2503235, 149472.67411175],
      wBar: [77.45779628, 0.16047689],
      Omega: [48.33076593, -0.12534081],
    },
  },
  {
    name: "Venus",
    color: "#f2d9a0",
    size: 8,
    orbitScale: 0.72,
    doodle: "venus",
    elements: {
      a: [0.72333566, 0.0000039],
      e: [0.00677672, -0.00004107],
      I: [3.39467605, -0.0007889],
      L: [181.9790995, 58517.81538729],
      wBar: [131.60246718, 0.00268329],
      Omega: [76.67984255, -0.27769418],
    },
  },
  {
    name: "Mars",
    color: "#ff8a6b",
    size: 7,
    orbitScale: 1.52,
    doodle: "mars",
    elements: {
      a: [1.52371034, 0.00001847],
      e: [0.0933941, 0.00007882],
      I: [1.84969142, -0.00813131],
      L: [-4.55343205, 19140.30268499],
      wBar: [-23.94362959, 0.44441088],
      Omega: [49.55953891, -0.29257343],
    },
  },
  {
    name: "Jupiter",
    color: "#e2b38d",
    size: 12,
    orbitScale: 5.2,
    doodle: "jupiter",
    elements: {
      a: [5.202887, -0.00011607],
      e: [0.04838624, -0.00013253],
      I: [1.30439695, -0.00183714],
      L: [34.39644051, 3034.74612775],
      wBar: [14.72847983, 0.21252668],
      Omega: [100.47390909, 0.20469106],
    },
  },
  {
    name: "Saturn",
    color: "#ead7a1",
    size: 11,
    orbitScale: 9.58,
    doodle: "saturn",
    elements: {
      a: [9.53667594, -0.0012506],
      e: [0.05386179, -0.00050991],
      I: [2.48599187, 0.00193609],
      L: [49.95424423, 1222.49362201],
      wBar: [92.59887831, -0.41897216],
      Omega: [113.66242448, -0.28867794],
    },
  },
  {
    name: "Uranus",
    color: "#97ecf2",
    size: 9,
    orbitScale: 19.2,
    doodle: "uranus",
    elements: {
      a: [19.18916464, -0.00196176],
      e: [0.04725744, -0.00004397],
      I: [0.77263783, -0.00242939],
      L: [313.23810451, 428.48202785],
      wBar: [170.9542763, 0.40805281],
      Omega: [74.01692503, 0.04240589],
    },
  },
  {
    name: "Neptune",
    color: "#6ea4ff",
    size: 9,
    orbitScale: 30.05,
    doodle: "neptune",
    elements: {
      a: [30.06992276, 0.00026291],
      e: [0.00859048, 0.00005105],
      I: [1.77004347, 0.00035372],
      L: [-55.12002969, 218.45945325],
      wBar: [44.96476227, -0.32241464],
      Omega: [131.78422574, -0.00508664],
    },
  },
];

const state = {
  simulationTime: Date.now(),
  speed: 1,
  location: { ...places.brussels },
  lastFrame: performance.now(),
  showOrbits: true,
  showLabels: true,
  showHighlights: true,
  showAndromeda: true,
  showSunCone: true,
  liveMode: true,
  beginnerMode: false,
  hoveredBody: null,
  selectedBodyName: "Earth",
  drawnBodies: [],
  latestSnapshots: [],
  lastUrlKey: "",
};

function normalizeAngle(angle) {
  let value = angle % (Math.PI * 2);
  if (value < 0) {
    value += Math.PI * 2;
  }
  return value;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function daysSinceJ2000(timestamp) {
  return (timestamp - J2000) / MS_PER_DAY;
}

function centuriesSinceJ2000(timestamp) {
  return daysSinceJ2000(timestamp) / 36525;
}

function solveKepler(meanAnomaly, eccentricity) {
  let eccentricAnomaly = meanAnomaly;
  for (let i = 0; i < 8; i += 1) {
    const delta =
      (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) /
      (1 - eccentricity * Math.cos(eccentricAnomaly));
    eccentricAnomaly -= delta;
    if (Math.abs(delta) < 1e-6) {
      break;
    }
  }
  return eccentricAnomaly;
}

function orbitalElementsAtTime(elements, timestamp) {
  const T = centuriesSinceJ2000(timestamp);
  const valueAt = ([base, rate]) => base + rate * T;

  return {
    a: valueAt(elements.a),
    e: valueAt(elements.e),
    I: valueAt(elements.I) * DEG,
    L: valueAt(elements.L) * DEG,
    wBar: valueAt(elements.wBar) * DEG,
    Omega: valueAt(elements.Omega) * DEG,
  };
}

function heliocentricPosition(elements, timestamp) {
  const el = orbitalElementsAtTime(elements, timestamp);
  const argumentOfPerihelion = el.wBar - el.Omega;
  const meanAnomaly = normalizeAngle(el.L - el.wBar);
  const eccentricAnomaly = solveKepler(meanAnomaly, el.e);
  const xv = el.a * (Math.cos(eccentricAnomaly) - el.e);
  const yv = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(eccentricAnomaly);
  const trueAnomaly = Math.atan2(yv, xv);
  const radius = Math.sqrt(xv * xv + yv * yv);

  const cosOmega = Math.cos(el.Omega);
  const sinOmega = Math.sin(el.Omega);
  const cosI = Math.cos(el.I);
  const sinI = Math.sin(el.I);
  const cosVW = Math.cos(trueAnomaly + argumentOfPerihelion);
  const sinVW = Math.sin(trueAnomaly + argumentOfPerihelion);

  return {
    x: radius * (cosOmega * cosVW - sinOmega * sinVW * cosI),
    y: radius * (sinOmega * cosVW + cosOmega * sinVW * cosI),
    z: radius * (sinVW * sinI),
    radius,
  };
}

function geocentricEclipticPosition(planet, timestamp) {
  if (planet.isMoon) {
    return moonGeocentricPosition(timestamp);
  }

  const earth = heliocentricPosition(EARTH_ELEMENTS, timestamp);
  const other = heliocentricPosition(planet.elements, timestamp);

  return {
    x: other.x - earth.x,
    y: other.y - earth.y,
    z: other.z - earth.z,
  };
}

function moonGeocentricPosition(timestamp) {
  const d = daysSinceJ2000(timestamp);
  const ascendingNode = normalizeAngle((125.1228 - 0.0529538083 * d) * DEG);
  const inclination = 5.1454 * DEG;
  const argumentOfPerigee = normalizeAngle((318.0634 + 0.1643573223 * d) * DEG);
  const meanAnomaly = normalizeAngle((115.3654 + 13.0649929509 * d) * DEG);
  const semiMajorAxisAu = 384400 / 149597870.7;
  const eccentricity = 0.0549;
  const eccentricAnomaly = solveKepler(meanAnomaly, eccentricity);
  const xv = semiMajorAxisAu * (Math.cos(eccentricAnomaly) - eccentricity);
  const yv =
    semiMajorAxisAu * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(eccentricAnomaly);
  const trueAnomaly = Math.atan2(yv, xv);
  const radius = Math.sqrt(xv * xv + yv * yv);
  const angle = trueAnomaly + argumentOfPerigee;

  const cosNode = Math.cos(ascendingNode);
  const sinNode = Math.sin(ascendingNode);
  const cosInc = Math.cos(inclination);
  const sinInc = Math.sin(inclination);
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);

  return {
    x: radius * (cosNode * cosAngle - sinNode * sinAngle * cosInc),
    y: radius * (sinNode * cosAngle + cosNode * sinAngle * cosInc),
    z: radius * (sinAngle * sinInc),
  };
}

function eclipticToEquatorial({ x, y, z }) {
  return {
    x,
    y: y * Math.cos(OBLIQUITY) - z * Math.sin(OBLIQUITY),
    z: y * Math.sin(OBLIQUITY) + z * Math.cos(OBLIQUITY),
  };
}

function vectorToRaDec(vector) {
  const dist = Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
  return {
    ra: normalizeAngle(Math.atan2(vector.y, vector.x)),
    dec: Math.asin(vector.z / dist),
    dist,
  };
}

function gmstRadians(timestamp) {
  const jd = timestamp / MS_PER_DAY + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  const theta =
    280.46061837 +
    360.98564736629 * (jd - 2451545) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  return normalizeAngle(theta * DEG);
}

function localSiderealTime(timestamp, longitudeDeg) {
  return normalizeAngle(gmstRadians(timestamp) + longitudeDeg * DEG);
}

function altitudeAzimuth(ra, dec, timestamp, latitudeDeg, longitudeDeg) {
  const lat = latitudeDeg * DEG;
  const hourAngle = normalizeAngle(localSiderealTime(timestamp, longitudeDeg) - ra);
  const signedHourAngle = hourAngle > Math.PI ? hourAngle - Math.PI * 2 : hourAngle;

  const altitude = Math.asin(
    Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(signedHourAngle),
  );

  const azimuth = normalizeAngle(
    Math.atan2(
      Math.sin(signedHourAngle),
      Math.cos(signedHourAngle) * Math.sin(lat) - Math.tan(dec) * Math.cos(lat),
    ) + Math.PI,
  );

  return { altitude, azimuth, hourAngle: signedHourAngle };
}

function resizeCanvas() {
  const parent = canvas.parentElement;
  const size = Math.min(parent.clientWidth, parent.clientHeight);
  const pixelSize = Math.max(320, Math.floor(size));
  canvas.width = pixelSize;
  canvas.height = pixelSize;
}

function setLocation(location) {
  state.location = { ...location };
  latInput.value = location.lat.toFixed(4);
  lonInput.value = location.lon.toFixed(4);
}

function applyUiLanguage() {
  geolocateBtn.textContent = "Use My Location";
  shareBtn.textContent = "Copy Link";
  saveCardBtn.textContent = "Save Image";
  liveBtn.textContent = "Live Follow";
  beginnerModeBtn.textContent = "Beginner Mode";
  const pauseButton = speedButtons.find((button) => Number(button.dataset.speed) === 0);
  if (pauseButton) {
    pauseButton.textContent = "Pause";
  }
  nowBtn.textContent = "Now";
}

function compactTime(timestamp) {
  const value = formatDateTimeLocal(timestamp);
  return value.replace(/[-:]/g, "");
}

function expandCompactTime(value) {
  if (!value || value.length !== 13) {
    return null;
  }
  const iso = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(9, 11)}:${value.slice(11, 13)}`;
  const parsed = Date.parse(iso);
  return Number.isFinite(parsed) ? parsed : null;
}

function getLocationLabel() {
  if (presetSelect.value !== "custom" && places[presetSelect.value]) {
    return places[presetSelect.value].name;
  }
  return `${state.location.lat.toFixed(2)}, ${state.location.lon.toFixed(2)}`;
}

function setSpeed(speed) {
  state.speed = clamp(speed, SPEED_MIN, SPEED_MAX);
  speedButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.speed) === state.speed);
  });
  state.liveMode = state.speed !== 0;
  liveBtn.classList.toggle("is-active", state.liveMode);
}

function setToggleUI() {
  toggleButtons.forEach((button) => {
    button.classList.toggle("is-active", Boolean(state[button.dataset.toggle]));
  });
}

function updateUrlState() {
  const params = new URLSearchParams();

  if (presetSelect.value && presetSelect.value !== "custom") {
    params.set("p", presetSelect.value);
  } else {
    params.set("lat", state.location.lat.toFixed(2));
    params.set("lon", state.location.lon.toFixed(2));
  }

  if (!state.liveMode) {
    params.set("t", compactTime(state.simulationTime));
  }

  if (state.beginnerMode) {
    params.set("b", "1");
  }

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  if (state.lastUrlKey !== nextUrl) {
    window.history.replaceState({}, "", nextUrl);
    state.lastUrlKey = nextUrl;
  }
  canonicalLink.href = `${window.location.origin}${nextUrl}`;
}

function restoreFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const place = params.get("p");
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  const compact = params.get("t");
  const beginner = params.get("b");

  if (place && places[place]) {
    presetSelect.value = place;
    setLocation(places[place]);
  } else if (Number.isFinite(lat) && Number.isFinite(lon)) {
    presetSelect.value = "custom";
    setLocation({ name: "Custom", lat, lon });
  }

  if (compact) {
    const parsed = expandCompactTime(compact);
    if (Number.isFinite(parsed)) {
      state.simulationTime = parsed;
      state.liveMode = false;
    }
  }

  if (beginner === "1") {
    state.beginnerMode = true;
  }
}

function getPlanetSnapshots(timestamp) {
  const earth = heliocentricPosition(EARTH_ELEMENTS, timestamp);
  return planets.map((planet) => {
    const geocentric = geocentricEclipticPosition(planet, timestamp);
    const heliocentric = planet.isMoon
      ? {
          x: earth.x + geocentric.x * MOON_DISPLAY_SCALE_AU / (384400 / 149597870.7),
          y: earth.y + geocentric.y * MOON_DISPLAY_SCALE_AU / (384400 / 149597870.7),
          z: earth.z + geocentric.z * MOON_DISPLAY_SCALE_AU / (384400 / 149597870.7),
        }
      : heliocentricPosition(planet.elements, timestamp);
    const equatorial = eclipticToEquatorial(geocentric);
    const { ra, dec, dist } = vectorToRaDec(equatorial);
    const horizontal = altitudeAzimuth(
      ra,
      dec,
      timestamp,
      state.location.lat,
      state.location.lon,
    );
    const angle = Math.atan2(heliocentric.y, heliocentric.x);

    return {
      ...planet,
      distance: dist,
      angle,
      altitude: horizontal.altitude,
      azimuth: horizontal.azimuth,
      visible: horizontal.altitude > 0,
    };
  });
}

function getEarthSnapshot(timestamp) {
  const heliocentric = heliocentricPosition(EARTH_ELEMENTS, timestamp);
  return {
    ...EARTH_DISPLAY,
    x: heliocentric.x,
    y: heliocentric.y,
    z: heliocentric.z,
    angle: Math.atan2(heliocentric.y, heliocentric.x),
  };
}

function getAndromedaSnapshot(timestamp) {
  const horizontal = altitudeAzimuth(
    ANDROMEDA.ra,
    ANDROMEDA.dec,
    timestamp,
    state.location.lat,
    state.location.lon,
  );

  const ecliptic = {
    x: Math.cos(ANDROMEDA.dec) * Math.cos(ANDROMEDA.ra),
    y:
      Math.cos(ANDROMEDA.dec) * Math.sin(ANDROMEDA.ra) * Math.cos(-OBLIQUITY) -
      Math.sin(ANDROMEDA.dec) * Math.sin(-OBLIQUITY),
    z:
      Math.cos(ANDROMEDA.dec) * Math.sin(ANDROMEDA.ra) * Math.sin(-OBLIQUITY) +
      Math.sin(ANDROMEDA.dec) * Math.cos(-OBLIQUITY),
  };

  return {
    ...ANDROMEDA,
    angle: Math.atan2(ecliptic.y, ecliptic.x),
    altitude: horizontal.altitude,
    visible: horizontal.altitude > 0,
  };
}

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function formatDateTimeLocal(timestamp) {
  const date = new Date(timestamp);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(timestamp - offset * 60000);
  return localDate.toISOString().slice(0, 16);
}

function setTimeInputs(timestamp) {
  const localValue = formatDateTimeLocal(timestamp);
  const [datePart, timePart] = localValue.split("T");
  dateInput.value = datePart;
  clockInput.value = timePart;
}

function readTimeInputs() {
  if (!dateInput.value || !clockInput.value) {
    return null;
  }
  const parsed = Date.parse(`${dateInput.value}T${clockInput.value}`);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDistance(body) {
  if (body.name === "Moon") {
    return `${Math.round(body.distance * 149597870.7)} km`;
  }
  if (body.name === "Andromeda") {
    return "2.54 million ly";
  }
  if (body.name === "Sun") {
    return "1 AU center";
  }
  if (body.distance == null) {
    return "N/A";
  }
  return `${body.distance.toFixed(2)} AU`;
}

function localDateParts(timestamp) {
  const local = new Date(timestamp - new Date(timestamp).getTimezoneOffset() * 60000);
  return {
    year: local.getUTCFullYear(),
    month: local.getUTCMonth(),
    day: local.getUTCDate(),
  };
}

function startOfLocalDay(timestamp) {
  const { year, month, day } = localDateParts(timestamp);
  return new Date(year, month, day, 0, 0, 0, 0).getTime();
}

function formatShortTime(timestamp) {
  if (timestamp == null) {
    return "--";
  }
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
function updateTimesCard() {
  const utc = new Date(state.simulationTime);
  const utcHours =
    utc.getUTCHours() +
    utc.getUTCMinutes() / 60 +
    utc.getUTCSeconds() / 3600;
  const solarHours = ((utcHours + state.location.lon / 15) % 24 + 24) % 24;
  const solarHour = Math.floor(solarHours);
  const solarMinute = Math.floor((solarHours - solarHour) * 60);
  const earthLocalTime = `${String(solarHour).padStart(2, "0")}:${String(solarMinute).padStart(2, "0")}`;
  const dayPhase =
    solarHours >= 6 && solarHours < 12
      ? "Morning"
      : solarHours >= 12 && solarHours < 18
        ? "Afternoon"
        : solarHours >= 18 && solarHours < 22
          ? "Evening"
          : "Night";

  timesCard.innerHTML = `
    <div class="times-grid">
      <div class="selection-stat"><strong>Local Time</strong>${earthLocalTime}</div>
      <div class="selection-stat"><strong>Day Phase</strong>${dayPhase}</div>
    </div>
  `;
}

function updateCityLinks() {
  const links = Object.entries(places)
    .filter(([key]) => key !== "custom")
    .map(([key, place]) => {
      const params = new URLSearchParams({
        place: key,
        lat: place.lat.toFixed(4),
        lon: place.lon.toFixed(4),
        time: new Date(state.simulationTime).toISOString(),
        live: String(state.liveMode),
        beginner: String(state.beginnerMode),
      });
      return `<a href="?${params.toString()}">${place.name}</a>`;
    })
    .join("");
  cityLinks.innerHTML = `<div class="city-link-list">${links}</div>`;
}

function moonPhaseFromSnapshots(moonVector, sunVector) {
  const moonDistance = Math.sqrt(moonVector.x ** 2 + moonVector.y ** 2 + moonVector.z ** 2);
  const sunDistance = Math.sqrt(sunVector.x ** 2 + sunVector.y ** 2 + sunVector.z ** 2);
  const dot =
    moonVector.x * sunVector.x + moonVector.y * sunVector.y + moonVector.z * sunVector.z;
  const phaseAngle = Math.acos(clamp(dot / (moonDistance * sunDistance), -1, 1));
  const illumination = (1 - Math.cos(phaseAngle)) / 2;

  let phaseLabel = "New Moon";
  if (illumination > 0.97) {
    phaseLabel = "Full Moon";
  } else if (illumination > 0.55) {
    phaseLabel = moonVector.y > sunVector.y ? "Waxing Gibbous" : "Waning Gibbous";
  } else if (illumination > 0.47) {
    phaseLabel = moonVector.y > sunVector.y ? "First Quarter" : "Last Quarter";
  } else if (illumination > 0.03) {
    phaseLabel = moonVector.y > sunVector.y ? "Waxing Crescent" : "Waning Crescent";
  }

  return {
    illumination,
    phaseLabel,
  };
}

function updateSelectionCard() {
  const selected = state.drawnBodies.find((body) => body.name === state.selectedBodyName) ?? state.drawnBodies[0];
  if (!selected) {
    selectionCard.innerHTML = '<p class="helper-text">Move over a body to inspect it.</p>';
    return;
  }

  const altitudeText =
    selected.altitude == null ? "N/A" : `${Math.round(selected.altitude * RAD)}deg`;
  const visibilityText =
    selected.visible == null ? "Reference" : selected.visible ? "Above horizon" : "Below horizon";
  const beginnerCopy = state.beginnerMode
    ? `<div class="selection-meta">Easy view: ${
        selected.visible == null
          ? "This is a reference body on the map."
          : selected.visible
            ? `${selected.name} is currently visible from your position.`
            : `${selected.name} is currently below your horizon.`
      }</div>`
    : `<div class="selection-meta">${selected.kind}</div>`;
  const extra =
    selected.phaseLabel != null
      ? `<div class="selection-stat"><strong>Moon Phase</strong>${selected.phaseLabel} (${Math.round(
          selected.illumination * 100,
        )}%)</div>`
      : "";

  selectionCard.innerHTML = `
    <div class="selection-title">${selected.name}</div>
    ${beginnerCopy}
    <div class="selection-grid">
      <div class="selection-stat"><strong>Status</strong>${visibilityText}</div>
      <div class="selection-stat"><strong>Altitude</strong>${altitudeText}</div>
      <div class="selection-stat"><strong>Distance</strong>${formatDistance(selected)}</div>
      <div class="selection-stat"><strong>Time Zone</strong>${USER_TIMEZONE}</div>
      ${extra}
    </div>
  `;
}

function buildRecommendationContent(snapshots) {
  const visibleNames = snapshots.filter((planet) => planet.visible).map((planet) => planet.name);
  let title = "Best for tonight";
  let description = "A compact pair of astronomy binoculars is the easiest passive recommendation for most nights.";
  let href = AFFILIATE_LINKS.binoculars;
  let label = "See binocular picks";

  if (visibleNames.includes("Saturn") || visibleNames.includes("Jupiter")) {
    title = "Best for gas giants";
    description = "A beginner telescope will do the most to help people spot Saturn's ring shape or Jupiter's brighter detail.";
    href = AFFILIATE_LINKS.telescopes;
    label = "See telescope picks";
  } else if (visibleNames.includes("Moon")) {
    title = "Best for the Moon";
    description = "A simple Moon filter or small telescope accessory set is an easy next step for lunar viewing nights.";
    href = AFFILIATE_LINKS.moon;
    label = "See Moon gear";
  } else if (visibleNames.length === 0) {
    title = "Best for dark-sky planning";
    description = "When fewer planets are up, a star tracker or binoculars can still make the session more useful.";
    href = AFFILIATE_LINKS.tracker;
    label = "See stargazing gear";
  }

  recommendationCard.innerHTML = `
    <strong>${title}</strong>
    <span class="helper-text">${description}</span>
    <a class="monetize-link affiliate-link" href="${href}" target="_blank" rel="noreferrer">${label}</a>
  `;
}

function updateSeoContent() {
  const locationLabel = getLocationLabel();
  const visible = state.latestSnapshots.filter((planet) => planet.visible).map((planet) => planet.name);
  const visibleText = visible.length > 0 ? visible.join(", ") : "no bright planets";
  const visibleTextHuman = visible.length > 0 ? visible.join(", ") : "no easy naked-eye planets";
  const isoDate = new Date(state.simulationTime).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.title = `Visible planets tonight in ${locationLabel}`;
  metaDescription.content = `Check visible planets tonight in ${locationLabel}. Explore a live sky map, current viewing conditions, Earth local time, Moon phase, and beginner gear recommendations for ${isoDate}.`;

  seoHeadline.textContent = `Visible planets tonight in ${locationLabel}`;
  seoSummary.textContent = `For ${isoDate}, the main bodies above the horizon from ${locationLabel} are ${visibleTextHuman}. Use the live sky map above to pause, jump back to now, or share the exact sky setup with a direct link.`;

  seoBody.innerHTML = `
    <p><strong>Tonight's quick answer:</strong> From ${locationLabel}, the most likely visible bodies right now are ${visibleTextHuman}. The map keeps Earth-based visibility in sync with the live Sun-centered layout, so the list above and the cone on the map are connected.</p>
    <p><strong>How to use this page:</strong> Pick your place, adjust the time, and use the details card to inspect Earth, the Moon, the visible planets, or Andromeda. The Earth time card keeps the local hour and day phase tied to your chosen location.</p>
  `;

  tipsBody.innerHTML = `
    <p><strong>For bright planets:</strong> Jupiter and Saturn are the easiest planets to justify a beginner telescope. Venus and Mars are often bright enough to notice with the naked eye, while binoculars are a simple entry point for quick viewing.</p>
    <p><strong>For the Moon:</strong> The Moon is often the most rewarding first target. If you see it in the tool, use the body card to check the phase and pair the session with binoculars or a small telescope.</p>
    <p><strong>For darker skies:</strong> If the visible list is short, that can still be a good night for broader stargazing. The map helps people plan around timing instead of guessing.</p>
  `;

  const selectedName = state.selectedBodyName;
  eventsBody.innerHTML = `
    <p><strong>Best target tonight:</strong> ${visible[0] ?? "The Moon"} is your easiest first object from ${locationLabel} right now.</p>
    <p><strong>Body to watch:</strong> ${selectedName} is highlighted in the details panel. Use the Earth time and the cones on the map to get a quicker feel for the viewing moment.</p>
    <p><strong>Shareable sky:</strong> The copy link button saves your place and time into the URL, which is useful for social posts or city-specific landing pages.</p>
  `;

  faqBody.innerHTML = `
    <div class="faq-item"><strong>Which planets can I see tonight in ${locationLabel}?</strong><br />Right now the tool shows ${visibleTextHuman} above the horizon from your chosen position.</div>
    <div class="faq-item"><strong>Does this page update in real time?</strong><br />Yes. The viewer runs in real time by default, and you can pause it or set a custom date and time.</div>
    <div class="faq-item"><strong>Can I share this sky setup?</strong><br />Yes. Use the copy link button and the page saves your place and time into the URL.</div>
  `;

  updateCityLinks();
}

function registerBody(body) {
  state.drawnBodies.push(body);
}

function getBodyAtCanvasPoint(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * canvas.width;
  const y = ((clientY - rect.top) / rect.height) * canvas.height;
  return (
    [...state.drawnBodies]
      .reverse()
      .find((body) => {
        const dx = x - body.canvasX;
        const dy = y - body.canvasY;
        return Math.sqrt(dx * dx + dy * dy) <= body.hitRadius;
      }) ?? null
  );
}

function drawSketchCircle(x, y, radius, strokeStyle, lineWidth = 1.8, wobble = 0.06) {
  const steps = 40;
  ctx.beginPath();
  for (let i = 0; i <= steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const offset = 1 + wobble * Math.sin(angle * 3 + radius * 0.5);
    const px = x + Math.cos(angle) * radius * offset;
    const py = y + Math.sin(angle) * radius * offset;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawPlanetBody(x, y, radius, baseColor, rimColor) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  const gradient = ctx.createRadialGradient(
    x - radius * 0.35,
    y - radius * 0.45,
    radius * 0.15,
    x,
    y,
    radius,
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.82)");
  gradient.addColorStop(0.24, baseColor);
  gradient.addColorStop(1, rimColor);
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(255,255,255,0.08)";
  ctx.shadowBlur = radius * 1.1;
  ctx.fill();
  drawSketchCircle(x, y, radius, "rgba(24,24,24,0.9)", Math.max(1.4, radius * 0.14));
  ctx.restore();
}

function drawPlanetDetails(planet, x, y, radius) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (planet.doodle === "earth") {
    ctx.fillStyle = "rgba(88,214,141,0.95)";
    ctx.beginPath();
    ctx.ellipse(x - radius * 0.25, y - radius * 0.15, radius * 0.28, radius * 0.18, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + radius * 0.18, y + radius * 0.12, radius * 0.2, radius * 0.15, 0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (planet.doodle === "moon" || planet.doodle === "mercury") {
    ctx.fillStyle = "rgba(120,120,120,0.28)";
    [
      [-0.24, -0.12, 0.18],
      [0.22, 0.18, 0.14],
      [0.05, -0.26, 0.11],
    ].forEach(([dx, dy, scale]) => {
      ctx.beginPath();
      ctx.arc(x + radius * dx, y + radius * dy, radius * scale, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (planet.doodle === "venus") {
    ctx.strokeStyle = "rgba(191,140,84,0.45)";
    ctx.lineWidth = Math.max(1.2, radius * 0.12);
    [-0.25, 0, 0.22].forEach((offset) => {
      ctx.beginPath();
      ctx.moveTo(x - radius * 0.7, y + radius * offset);
      ctx.quadraticCurveTo(x, y + radius * (offset + 0.12), x + radius * 0.65, y + radius * (offset - 0.04));
      ctx.stroke();
    });
  } else if (planet.doodle === "mars") {
    ctx.fillStyle = "rgba(156,63,34,0.34)";
    ctx.beginPath();
    ctx.ellipse(x - radius * 0.14, y - radius * 0.02, radius * 0.32, radius * 0.18, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + radius * 0.2, y + radius * 0.22, radius * 0.18, radius * 0.1, 0.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (planet.doodle === "jupiter" || planet.doodle === "saturn") {
    const bands =
      planet.doodle === "jupiter"
        ? ["rgba(191,133,94,0.65)", "rgba(242,215,172,0.45)", "rgba(166,113,77,0.58)"]
        : ["rgba(194,164,110,0.5)", "rgba(245,226,173,0.38)", "rgba(176,149,99,0.44)"];
    bands.forEach((band, index) => {
      const offset = (-0.35 + index * 0.28) * radius;
      ctx.strokeStyle = band;
      ctx.lineWidth = Math.max(1.4, radius * 0.14);
      ctx.beginPath();
      ctx.moveTo(x - radius * 0.78, y + offset);
      ctx.quadraticCurveTo(x, y + offset + radius * 0.12, x + radius * 0.78, y + offset - radius * 0.02);
      ctx.stroke();
    });
    if (planet.doodle === "jupiter") {
      ctx.fillStyle = "rgba(195,104,78,0.7)";
      ctx.beginPath();
      ctx.ellipse(x + radius * 0.18, y + radius * 0.27, radius * 0.18, radius * 0.12, -0.1, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (planet.doodle === "uranus" || planet.doodle === "neptune") {
    ctx.strokeStyle = planet.doodle === "uranus" ? "rgba(220,255,255,0.45)" : "rgba(180,220,255,0.38)";
    ctx.lineWidth = Math.max(1.2, radius * 0.1);
    [-0.22, 0.05].forEach((offset) => {
      ctx.beginPath();
      ctx.moveTo(x - radius * 0.62, y + radius * offset);
      ctx.quadraticCurveTo(x, y + radius * (offset + 0.08), x + radius * 0.62, y + radius * (offset - 0.02));
      ctx.stroke();
    });
  }

  if (planet.doodle === "saturn") {
    ctx.strokeStyle = "rgba(219,195,140,0.8)";
    ctx.lineWidth = Math.max(1.5, radius * 0.15);
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.68, radius * 0.55, -0.3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(72,58,28,0.35)";
    ctx.lineWidth = Math.max(1, radius * 0.08);
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.3, radius * 0.42, -0.3, 0.18 * Math.PI, 0.82 * Math.PI);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPlanet(planet, x, y, radius, outlineColor) {
  const rimColor = outlineColor === "#ffffff" ? "rgba(255,255,255,0.45)" : "rgba(30,30,30,0.9)";
  drawPlanetBody(x, y, radius, planet.color, rimColor);
  drawPlanetDetails(planet, x, y, radius);
}

function drawSun(x, y, radius) {
  ctx.save();

  const halo = ctx.createRadialGradient(x, y, radius * 0.25, x, y, radius * 2.4);
  halo.addColorStop(0, "rgba(255, 238, 170, 0.34)");
  halo.addColorStop(0.38, "rgba(255, 194, 84, 0.2)");
  halo.addColorStop(0.72, "rgba(255, 150, 48, 0.08)");
  halo.addColorStop(1, "rgba(255, 120, 24, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  const body = ctx.createRadialGradient(
    x - radius * 0.28,
    y - radius * 0.34,
    radius * 0.14,
    x,
    y,
    radius,
  );
  body.addColorStop(0, "#fff8d6");
  body.addColorStop(0.22, "#ffe890");
  body.addColorStop(0.58, "#ffbf4d");
  body.addColorStop(0.82, "#ff9636");
  body.addColorStop(1, "#d86a18");
  ctx.fillStyle = body;
  ctx.shadowColor = "rgba(255, 191, 77, 0.34)";
  ctx.shadowBlur = radius * 1.1;
  ctx.fill();

  ctx.lineWidth = Math.max(1.1, radius * 0.08);
  ctx.strokeStyle = "rgba(255, 244, 196, 0.72)";
  ctx.stroke();

  ctx.lineWidth = Math.max(1, radius * 0.07);
  ctx.strokeStyle = "rgba(255, 224, 137, 0.34)";
  [-0.26, 0.02, 0.29].forEach((offset, index) => {
    ctx.beginPath();
    ctx.moveTo(x - radius * 0.7, y + radius * offset);
    ctx.bezierCurveTo(
      x - radius * 0.25,
      y + radius * (offset + 0.08 + index * 0.01),
      x + radius * 0.18,
      y + radius * (offset - 0.12),
      x + radius * 0.72,
      y + radius * (offset - 0.03),
    );
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = Math.max(0.8, radius * 0.05);
  ctx.beginPath();
  ctx.arc(x - radius * 0.22, y - radius * 0.2, radius * 0.4, -0.95, 0.15);
  ctx.stroke();

  ctx.restore();
}

function drawPixelDiamond(x, y, size, fillStyle, strokeStyle = null) {
  const half = size;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y - half);
  ctx.lineTo(x + half, y);
  ctx.lineTo(x, y + half);
  ctx.lineTo(x - half, y);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.shadowColor = "rgba(184,168,255,0.2)";
  ctx.shadowBlur = size * 1.6;
  ctx.fill();
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
}

function getDisplayRadius(orbitScale, sceneRadius) {
  const minOrbit = Math.min(EARTH_DISPLAY.orbitScale, ...planets.map((planet) => planet.orbitScale));
  const maxOrbit = Math.max(...planets.map((planet) => planet.orbitScale));
  const minDisplay = sceneRadius * 0.2;
  const maxDisplay = sceneRadius * 0.98;
  const normalized =
    (Math.log(orbitScale) - Math.log(minOrbit)) / (Math.log(maxOrbit) - Math.log(minOrbit));
  return minDisplay + normalized * (maxDisplay - minDisplay);
}

function drawScene(timestamp) {
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const sceneRadius = Math.min(width, height) * 0.44;
  const snapshots = getPlanetSnapshots(timestamp);
  const earth = getEarthSnapshot(timestamp);
  const andromeda = getAndromedaSnapshot(timestamp);
  const earthRadius = getDisplayRadius(EARTH_DISPLAY.orbitScale, sceneRadius);
  const earthX = Math.cos(earth.angle) * earthRadius;
  const earthY = Math.sin(earth.angle) * earthRadius;
  const sunVector = {
    x: -earth.x,
    y: -earth.y,
    z: -earth.z,
  };
  const moonSnapshot = snapshots.find((planet) => planet.name === "Moon");
  if (moonSnapshot) {
    Object.assign(moonSnapshot, moonPhaseFromSnapshots(geocentricEclipticPosition(moonSnapshot, timestamp), sunVector));
  }
  state.latestSnapshots = snapshots;

  ctx.clearRect(0, 0, width, height);
  state.drawnBodies = [];

  ctx.save();
  ctx.translate(centerX, centerY);

  if (state.showSunCone) {
    const sunConeRadius = sceneRadius * 0.72;
    const sunConeAngle = normalizeAngle(earth.angle + Math.PI);
    ctx.beginPath();
    ctx.moveTo(earthX, earthY);
    ctx.arc(
      earthX,
      earthY,
      sunConeRadius,
      sunConeAngle - SUN_CONE_HALF_ANGLE,
      sunConeAngle + SUN_CONE_HALF_ANGLE,
    );
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 226, 120, 0.16)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 226, 120, 0.28)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  if (state.showOrbits) {
    ctx.beginPath();
    ctx.arc(0, 0, earthRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(150,150,150,0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();

    planets.forEach((planet) => {
      if (planet.isMoon) {
        return;
      }
      const displayRadius = getDisplayRadius(planet.orbitScale, sceneRadius);
      ctx.beginPath();
      ctx.arc(0, 0, displayRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(150,150,150,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  drawSun(0, 0, 18);
  registerBody({
    name: "Sun",
    kind: "Star",
    visible: null,
    altitude: null,
    distance: 1,
    canvasX: centerX,
    canvasY: centerY,
    hitRadius: 22,
  });
  drawPlanet(EARTH_DISPLAY, earthX, earthY, EARTH_DISPLAY.size, "#dff1ff");
  registerBody({
    name: "Earth",
    kind: "Planet",
    visible: true,
    altitude: Math.PI / 2,
    distance: 1,
    canvasX: centerX + earthX,
    canvasY: centerY + earthY,
    hitRadius: EARTH_DISPLAY.size + 8,
  });
  if (state.showLabels) {
    ctx.fillStyle = "#dff1ff";
    ctx.font = '600 12px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("EARTH", Math.round(earthX), Math.round(earthY) - 15);
  }

  snapshots.forEach((planet) => {
    const radius = getDisplayRadius(planet.orbitScale, sceneRadius);
    const x = planet.isMoon
      ? earthX + Math.cos(planet.angle) * Math.max(18, sceneRadius * 0.06)
      : Math.cos(planet.angle) * radius;
    const y = planet.isMoon
      ? earthY + Math.sin(planet.angle) * Math.max(18, sceneRadius * 0.06)
      : Math.sin(planet.angle) * radius;
    const outline = planet.visible ? "#ffffff" : "#1a1a1a";

    if (planet.isMoon && state.showOrbits) {
      ctx.beginPath();
      ctx.arc(earthX, earthY, Math.max(18, sceneRadius * 0.06), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(150,150,150,0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    if (planet.visible && state.showHighlights) {
      ctx.beginPath();
      ctx.arc(x, y, planet.size + 7, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fill();
    }

    drawPlanet(planet, x, y, planet.size, outline);
    registerBody({
      name: planet.name,
      kind: planet.isMoon ? "Moon" : "Planet",
      visible: planet.visible,
      altitude: planet.altitude,
      distance: planet.distance,
      phaseLabel: planet.phaseLabel,
      illumination: planet.illumination,
      canvasX: centerX + x,
      canvasY: centerY + y,
      hitRadius: planet.size + 8,
    });

    if (state.showLabels) {
      ctx.fillStyle = planet.visible ? "#ffffff" : "#8d8d8d";
      ctx.font = '600 11px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(planet.name.toUpperCase(), Math.round(x), Math.round(y) - 14);
    }
  });

  if (state.showAndromeda) {
    const andromedaRadius = sceneRadius * 1.03;
    const andromedaX = Math.cos(andromeda.angle) * andromedaRadius;
    const andromedaY = Math.sin(andromeda.angle) * andromedaRadius;
    if (andromeda.visible && state.showHighlights) {
      ctx.beginPath();
      ctx.arc(andromedaX, andromedaY, 14, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(184,168,255,0.09)";
      ctx.fill();
    }
    drawPixelDiamond(
      andromedaX,
      andromedaY,
      8,
      andromeda.visible ? "#b8a8ff" : "#5b5670",
      andromeda.visible ? "#ffffff" : "#1a1a1a",
    );
    registerBody({
      name: "Andromeda",
      kind: "Galaxy",
      visible: andromeda.visible,
      altitude: andromeda.altitude,
      distance: null,
      canvasX: centerX + andromedaX,
      canvasY: centerY + andromedaY,
      hitRadius: 14,
    });
    if (state.showLabels) {
      ctx.fillStyle = andromeda.visible ? "#d9ceff" : "#7c7796";
      ctx.font = '600 11px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("ANDROMEDA", Math.round(andromedaX), Math.round(andromedaY) - 16);
    }
  }

  ctx.restore();

  timeLabel.textContent = formatTime(new Date(timestamp));
  timezoneLabel.textContent = USER_TIMEZONE;
  setTimeInputs(timestamp);
  buildRecommendationContent(snapshots);
  updateSeoContent();
  updateSelectionCard();
  updateTimesCard();
  sceneFrame.classList.toggle("is-grabbable", state.hoveredBody != null);
  updateUrlState();
}

function tick(now) {
  const deltaSeconds = (now - state.lastFrame) / 1000;
  state.lastFrame = now;
  state.simulationTime += deltaSeconds * state.speed * 1000;
  drawScene(state.simulationTime);
  requestAnimationFrame(tick);
}

function updateLocationFromInputs() {
  const lat = clamp(Number(latInput.value), -90, 90);
  const lon = clamp(Number(lonInput.value), -180, 180);
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    presetSelect.value = "custom";
    state.location = {
      name: "Custom",
      lat,
      lon,
    };
  }
}

presetSelect.addEventListener("change", () => {
  setLocation(places[presetSelect.value] ?? places.custom);
});

latInput.addEventListener("input", updateLocationFromInputs);
lonInput.addEventListener("input", updateLocationFromInputs);

geolocateBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    geolocateBtn.textContent = "No GPS Support";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      presetSelect.value = "custom";
      setLocation({ name: "My Location", lat: coords.latitude, lon: coords.longitude });
      geolocateBtn.textContent = "Location Loaded";
      setTimeout(() => {
        geolocateBtn.textContent = "Use My Location";
      }, 1200);
    },
    () => {
      geolocateBtn.textContent = "Location Blocked";
      setTimeout(() => {
        geolocateBtn.textContent = "Use My Location";
      }, 1200);
    },
  );
});

shareBtn.addEventListener("click", async () => {
  updateUrlState();
  const shareUrl = window.location.href;
  try {
    await navigator.clipboard.writeText(shareUrl);
    shareBtn.textContent = "Copied";
  } catch {
    shareBtn.textContent = "Link Ready";
  }
  setTimeout(() => {
    shareBtn.textContent = "Copy Link";
  }, 1200);
});

saveCardBtn.addEventListener("click", () => {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height + 180;
  const exportCtx = exportCanvas.getContext("2d");
  exportCtx.fillStyle = "#000";
  exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  exportCtx.drawImage(canvas, 0, 0);
  exportCtx.fillStyle = "#ffffff";
  exportCtx.font = '700 28px "Segoe UI", Arial, sans-serif';
  exportCtx.fillText(`Visible sky: ${getLocationLabel()}`, 40, canvas.height + 56);
  exportCtx.font = '400 20px "Segoe UI", Arial, sans-serif';
  exportCtx.fillStyle = "rgba(255,255,255,0.78)";
  exportCtx.fillText(formatTime(new Date(state.simulationTime)), 40, canvas.height + 92);
  exportCtx.fillText(
    `Best targets: ${state.latestSnapshots.filter((planet) => planet.visible).map((planet) => planet.name).join(", ") || "No bright planets"}`,
    40,
    canvas.height + 126,
  );

  const link = document.createElement("a");
  link.href = exportCanvas.toDataURL("image/png");
  link.download = `visible-planets-${getLocationLabel().replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`;
  link.click();
});

nowBtn.addEventListener("click", () => {
  state.simulationTime = Date.now();
  state.lastFrame = performance.now();
  if (state.liveMode) {
    setSpeed(1);
  }
});

speedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSpeed(Number(button.dataset.speed));
  });
});

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.toggle;
    state[key] = !state[key];
    setToggleUI();
    drawScene(state.simulationTime);
  });
});

function applyManualTime() {
  const nextTime = readTimeInputs();
  if (nextTime != null) {
    state.simulationTime = nextTime;
    state.lastFrame = performance.now();
    if (state.liveMode) {
      setSpeed(1);
    }
    drawScene(state.simulationTime);
  }
}

dateInput.addEventListener("change", applyManualTime);
clockInput.addEventListener("change", applyManualTime);

liveBtn.addEventListener("click", () => {
  state.liveMode = !state.liveMode;
  liveBtn.classList.toggle("is-active", state.liveMode);
  setSpeed(state.liveMode ? 1 : 0);
});

beginnerModeBtn.addEventListener("click", () => {
  state.beginnerMode = !state.beginnerMode;
  beginnerModeBtn.classList.toggle("is-active", state.beginnerMode);
  updateSelectionCard();
  updateSeoContent();
  updateUrlState();
});

canvas.addEventListener("mousemove", (event) => {
  state.hoveredBody = getBodyAtCanvasPoint(event.clientX, event.clientY);
  if (state.hoveredBody) {
    state.selectedBodyName = state.hoveredBody.name;
    updateSelectionCard();
  }
});

canvas.addEventListener("click", (event) => {
  const body = getBodyAtCanvasPoint(event.clientX, event.clientY);
  if (body) {
    state.selectedBodyName = body.name;
    updateSelectionCard();
  }
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
setLocation(places.brussels);
restoreFromUrl();
applyUiLanguage();
setSpeed(1);
if (!state.liveMode) {
  setSpeed(0);
}
setToggleUI();
beginnerModeBtn.classList.toggle("is-active", state.beginnerMode);
drawScene(state.simulationTime);
requestAnimationFrame(tick);
