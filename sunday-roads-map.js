/* ============================================================================
 * Sunday Morning Field Service — Unified Interactive Road & Junction Map (One Map)
 * WP - 0869E · WP - 0869F · WP - 0869C
 * Reference Meeting Place: Bro. Tharanga Kumara's Residence (7.0636123, 79.8811481)
 * ============================================================================ */
(function (global) {
  "use strict";

  const STORAGE_KEY = "batagama_sun_roads_done_v1";

  const MEETING_PLACE = {
    name: "සහෝ. තරංග කුමාරගේ නිවස",
    siSub: "Sunday Morning Meeting Place (9:00 AM)",
    coords: [7.0636123, 79.8811481],
    url: "https://maps.app.goo.gl/Dj4oZ4z2D3d8XWUE8",
    image: "assets/tharanga_location.jpg",
    caption: "පිවිසුම් මාර්ගයේ ඡායාරූපය (ගේට්ටුව අසල රතු ත්‍රිරෝද රථය ඇති නිවස)"
  };

  const ZONES = {
    wp0869e: {
      key: "wp0869e",
      code: "WP - 0869E",
      title: "Reeta Mawatha · St. Rita Mw · Suhadha Mw West",
      color: "#2563EB",
      url: "https://maps.app.goo.gl/dn43DUgAdChQKStu6",
      boundary: [
        [7.064282, 79.884525],
        [7.067389, 79.883667],
        [7.067476, 79.883234],
        [7.065536, 79.882704],
        [7.063518, 79.883291]
      ]
    },
    wp0869f: {
      key: "wp0869f",
      code: "WP - 0869F",
      title: "143–115 Wewala Rd · Suhadha Mw East · Mahawaththa Rd",
      color: "#059669",
      url: "https://maps.app.goo.gl/Km6UdKnx6kDTD7LAA",
      boundary: [
        [7.067432, 79.883738],
        [7.067558, 79.884508],
        [7.066962, 79.885858],
        [7.066683, 79.885851],
        [7.064322, 79.884545]
      ]
    },
    wp0869c: {
      key: "wp0869c",
      code: "WP - 0869C",
      title: "179–147 Wewala Rd · Cemetery Rd · Reeta Mw North",
      color: "#7C3AED",
      url: "https://maps.app.goo.gl/UiUZzK9S7htXiiir8",
      boundary: [
        [7.071339, 79.882556],
        [7.068732, 79.883147],
        [7.067558, 79.884508],
        [7.067476, 79.883234],
        [7.066710, 79.882676]
      ]
    }
  };

  const OUTER_ROUND = [
    [7.0626, 79.8800], [7.0642, 79.8798], [7.0672, 79.8812], [7.0708, 79.8816],
    [7.0736, 79.8826], [7.0738, 79.8848], [7.0706, 79.8856], [7.0676, 79.8866],
    [7.0652, 79.8865], [7.0634, 79.8854], [7.0626, 79.8832], [7.0624, 79.8812]
  ];

  const RAW_JUNCTIONS = [
    {
      id: "sun-jct-1",
      code: "J1",
      name: "St. Rita Mw – Mahawaththa – St. Theresa Junction",
      siName: "ශාන්ත රීටා මාවත / මහවත්ත / ශාන්ත තෙරේසා හන්දිය",
      zone: "wp0869e",
      image: "assets/sun_j1.png",
      coords: [7.063518, 79.883291]
    },
    {
      id: "sun-jct-2",
      code: "J2",
      name: "H.D.J. Sanjaya / Suhadha Mw Junction (Baking Bliss)",
      siName: "H.D.J. සංජය / සුහද මාවත හන්දිය",
      zone: "wp0869e",
      image: "assets/sun_j2.png",
      coords: [7.064293, 79.884604]
    },
    {
      id: "sun-jct-3",
      code: "J3",
      name: "Suhadha Mw – Suhadha Patumaga Junction",
      siName: "සුහද මාවත – සුහද පටුමග හන්දිය",
      zone: "wp0869f",
      image: "assets/sun_j3.png",
      coords: [7.065693, 79.884430]
    },
    {
      id: "sun-jct-4",
      code: "J4",
      name: "143 Wewala Rd (Wewala Primary School & Church)",
      siName: "143 වැවල පාර හන්දිය (වැවල ප්‍රාථමික විදුහල & පල්ලිය)",
      zone: "wp0869f",
      image: "assets/sun_j4.png",
      coords: [7.067433, 79.883753]
    },
    {
      id: "sun-jct-5",
      code: "J5",
      name: "147 Wewala Rd (HowLite Ventures / Juse Vaas Mw)",
      siName: "147 වැවල පාර හන්දිය (HowLite Ventures)",
      zone: "wp0869c",
      image: "assets/sun_j5.png",
      coords: [7.067558, 79.884508]
    },
    {
      id: "sun-jct-6",
      code: "J6",
      name: "115 Wewala Rd / Salon RIO (St. Francis Xavier Rd Jct)",
      siName: "115 වැවල පාර / Salon RIO (St. Francis Xavier පාර හන්දිය)",
      zone: "wp0869f",
      image: "assets/sun_j6.png",
      coords: [7.066962, 79.885858]
    },
    {
      id: "sun-jct-7",
      code: "J7",
      name: "\"SEUMI\" Stores ! (Reeta Mawatha Junction)",
      siName: "සෙව්මි ස්ටෝර්ස් හන්දිය (රීටා මාවත)",
      zone: "wp0869c",
      image: "assets/sun_j7.png",
      coords: [7.067476, 79.883234]
    },
    {
      id: "sun-jct-8",
      code: "J8",
      name: "Bimmerworks Automotive / Wewala Sports Club",
      siName: "Bimmerworks / වැවල ක්‍රීඩා සමාජය අසල (රීටා මාවත)",
      zone: "wp0869e",
      image: "assets/sun_j8.png",
      coords: [7.065536, 79.882704]
    },
    {
      id: "sun-jct-9",
      code: "J9",
      name: "163A Cemetery Rd Junction (Ranmali Fernando Salon)",
      siName: "163A සුසානභූමි පාර හන්දිය (රන්මලී සැලෝන්)",
      zone: "wp0869c",
      image: "assets/sun_j9.png",
      coords: [7.068732, 79.883147]
    },
    {
      id: "sun-jct-10",
      code: "J10",
      name: "Dilan Tube Well (179 Wewala Rd — North End)",
      siName: "ඩිලාන් ටියුබ් වෙල් හන්දිය (179 වැවල පාර — උතුරු කෙළවර)",
      zone: "wp0869c",
      image: "assets/sun_j10.png",
      coords: [7.071339, 79.882556]
    }
  ];

  function haversineM(a, b) {
    const R = 6371000;
    const toRad = d => (d * Math.PI) / 180;
    const dLat = toRad(b[0] - a[0]);
    const dLon = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function polylineLengthM(segments) {
    let total = 0;
    segments.forEach(seg => {
      for (let i = 1; i < seg.length; i++) {
        total += haversineM(seg[i - 1], seg[i]);
      }
    });
    return Math.round(total);
  }

  const RAW_ROADS = [
    {
      id: "sun-road-1",
      name: "St. Rita Mawatha (Tharanga Home → Mahawaththa Jct)",
      siName: "ශාන්ත රීටා මාවත (තරංග නිවස අසලින් මහවත්ත හන්දිය දක්වා)",
      junctions: "Bro. Tharanga Home → J1 (St. Rita / Mahawaththa / St. Theresa Jct)",
      zone: "wp0869e",
      zoneLabel: "WP - 0869E",
      color: "#2563EB",
      startCoords: [7.063870, 79.880749],
      pinCoords: [7.064038, 79.881859],
      segments: [
        [
          [7.063870, 79.880749], [7.063842, 79.880991], [7.063892, 79.881159],
          [7.063683, 79.881211], [7.063655, 79.881225], [7.063647, 79.881246],
          [7.063702, 79.881462], [7.063740, 79.881582], [7.063725, 79.881659],
          [7.063747, 79.881741], [7.064010, 79.881808], [7.064038, 79.881859],
          [7.064059, 79.882111], [7.064009, 79.882324], [7.064023, 79.882695],
          [7.063994, 79.882891], [7.063910, 79.882983], [7.063869, 79.883087],
          [7.063637, 79.883257], [7.063518, 79.883291]
        ]
      ]
    },
    {
      id: "sun-road-2",
      name: "Mahawaththa Road (J1 → H.D.J. Sanjaya → Salon RIO)",
      siName: "මහවත්ත පාර (J1 හන්දිය → H.D.J. සංජය → Salon RIO)",
      junctions: "J1 → J2 (H.D.J. Sanjaya) → J6 (115 Wewala Rd / Salon RIO)",
      zone: "wp0869f",
      zoneLabel: "WP - 0869E · 0869F",
      color: "#059669",
      startCoords: [7.063518, 79.883291],
      pinCoords: [7.065215, 79.885609],
      segments: [
        [
          [7.063518, 79.883291], [7.063548, 79.883354], [7.063666, 79.883669],
          [7.063831, 79.883859], [7.064054, 79.884267], [7.064251, 79.884497],
          [7.064293, 79.884604], [7.064392, 79.884933], [7.064475, 79.885046],
          [7.065018, 79.885265], [7.065119, 79.885413], [7.065215, 79.885609],
          [7.065633, 79.885581], [7.065947, 79.885538], [7.066532, 79.885595],
          [7.066588, 79.885630], [7.066649, 79.885722], [7.066683, 79.885851],
          [7.066747, 79.885851], [7.066962, 79.885858]
        ]
      ]
    },
    {
      id: "sun-road-3",
      name: "Suhadha Mawatha & Patumaga (H.D.J. Sanjaya → 143 Wewala Rd)",
      siName: "සුහද මාවත සහ පටුමග (වැවල පල්ලිය & ප්‍රාථමික විදුහල අසලින්)",
      junctions: "J2 (H.D.J. Sanjaya) → J3 (Suhadha Cross) → J4 (143 Wewala Rd)",
      zone: "wp0869f",
      zoneLabel: "WP - 0869E · 0869F",
      color: "#7C3AED",
      startCoords: [7.064293, 79.884604],
      pinCoords: [7.066399, 79.884346],
      segments: [
        [
          [7.064293, 79.884604], [7.064670, 79.884492], [7.065137, 79.884438],
          [7.065388, 79.884436], [7.065674, 79.884363], [7.065693, 79.884430],
          [7.065877, 79.884404], [7.066399, 79.884346], [7.066464, 79.884346],
          [7.066648, 79.884402], [7.066671, 79.884381], [7.066646, 79.884119],
          [7.066657, 79.884070], [7.067001, 79.884015], [7.067086, 79.883755],
          [7.067433, 79.883753]
        ]
      ]
    },
    {
      id: "sun-road-4",
      name: "Wewala Rd / Juse Vaas Mawatha (163A → 147 → 115 Wewala Rd)",
      siName: "වැවල පාර / ජුසේ වාස් මාවත (163A → 147 → Salon RIO)",
      junctions: "J9 (163A Cemetery Rd) → J5 (147 Wewala Rd) → J6 (115 Wewala Rd / Salon RIO)",
      zone: "wp0869f",
      zoneLabel: "WP - 0869C · 0869F",
      color: "#D97706",
      startCoords: [7.068732, 79.883147],
      pinCoords: [7.067980, 79.884076],
      segments: [
        [
          [7.068732, 79.883147], [7.068713, 79.883404], [7.068709, 79.883462],
          [7.068711, 79.883667], [7.068695, 79.883696], [7.068662, 79.883756],
          [7.068548, 79.883819], [7.068312, 79.883905], [7.068207, 79.883962],
          [7.068152, 79.883992], [7.067980, 79.884076], [7.067956, 79.884089],
          [7.067830, 79.884172], [7.067724, 79.884260], [7.067632, 79.884368],
          [7.067558, 79.884508], [7.067550, 79.884579], [7.067517, 79.884745],
          [7.067430, 79.884966], [7.067354, 79.885094], [7.067303, 79.885158],
          [7.067265, 79.885222], [7.067219, 79.885348], [7.067124, 79.885476],
          [7.067082, 79.885533], [7.067020, 79.885620], [7.066977, 79.885672],
          [7.066962, 79.885858]
        ]
      ]
    },
    {
      id: "sun-road-5",
      name: "Reeta Mawatha / Juse Vaas Piya Mw (147 Wewala → Bimmerworks)",
      siName: "රීටා මාවත / ජුසේ වාස් පිය මාවත (සෙව්මි ස්ටෝර්ස් & Bimmerworks)",
      junctions: "J5 (147 Wewala) → J4 (143 Wewala) → J7 (SEUMI Stores) → J8 (Bimmerworks)",
      zone: "wp0869e",
      zoneLabel: "WP - 0869C · 0869E",
      color: "#0284C7",
      startCoords: [7.067558, 79.884508],
      pinCoords: [7.066700, 79.882764],
      segments: [
        [
          [7.067558, 79.884508], [7.067542, 79.884462], [7.067502, 79.884328],
          [7.067433, 79.883753], [7.067429, 79.883432], [7.067476, 79.883234],
          [7.067421, 79.883203]
        ],
        [
          [7.068557, 79.882824], [7.068433, 79.882901], [7.068277, 79.882944],
          [7.068176, 79.882975], [7.068057, 79.883024], [7.067973, 79.883057],
          [7.067904, 79.883095], [7.067849, 79.883083], [7.067782, 79.883050],
          [7.067707, 79.883019], [7.067666, 79.883007], [7.067590, 79.883039],
          [7.067555, 79.883046], [7.067513, 79.883033], [7.067493, 79.883028],
          [7.067455, 79.883109], [7.067430, 79.883177], [7.067421, 79.883203],
          [7.067313, 79.883183], [7.067237, 79.883155], [7.067187, 79.883127],
          [7.067152, 79.883078], [7.067105, 79.883047], [7.067045, 79.883029],
          [7.067011, 79.883005], [7.067006, 79.882923], [7.067012, 79.882818],
          [7.067011, 79.882793], [7.066986, 79.882778], [7.066941, 79.882768],
          [7.066828, 79.882765], [7.066700, 79.882764], [7.066431, 79.882760],
          [7.066289, 79.882755], [7.066247, 79.882737], [7.066227, 79.882700],
          [7.066182, 79.882688], [7.066071, 79.882700], [7.066069, 79.882765],
          [7.066078, 79.882867], [7.066100, 79.883005], [7.066107, 79.883097],
          [7.066091, 79.883116], [7.066003, 79.883121], [7.065920, 79.883115]
        ],
        [
          [7.065774, 79.882100], [7.065781, 79.882341], [7.065676, 79.882348],
          [7.065684, 79.882613], [7.065465, 79.882642], [7.065484, 79.882907],
          [7.064952, 79.882917], [7.063869, 79.883087]
        ]
      ]
    },
    {
      id: "sun-road-6",
      name: "Wewala Rd North / 1st Ln Cemetery Rd (179 → 163A)",
      siName: "වැවල පාර උතුරු කොටස (ඩිලාන් ටියුබ් වෙල් සිට 163A දක්වා)",
      junctions: "J10 (Dilan Tube Well 179) → J9 (163A Cemetery Rd)",
      zone: "wp0869c",
      zoneLabel: "WP - 0869C",
      color: "#0D9488",
      startCoords: [7.071339, 79.882556],
      pinCoords: [7.070188, 79.882654],
      segments: [
        [
          [7.073259, 79.883923], [7.073208, 79.883938], [7.073175, 79.883943],
          [7.073121, 79.883944], [7.073011, 79.883940], [7.072964, 79.883931],
          [7.072941, 79.883876], [7.072929, 79.883801], [7.072911, 79.883674],
          [7.072896, 79.883647], [7.072868, 79.883628], [7.072625, 79.883649],
          [7.072607, 79.883624], [7.072517, 79.883321], [7.072499, 79.883284],
          [7.072466, 79.883266], [7.072375, 79.883273], [7.072233, 79.883283],
          [7.072165, 79.883109], [7.072114, 79.882990], [7.072076, 79.882910],
          [7.072007, 79.882833], [7.071935, 79.882788], [7.071761, 79.882730],
          [7.071449, 79.882606], [7.071225, 79.882575], [7.071000, 79.882583],
          [7.070565, 79.882617], [7.070188, 79.882654], [7.069842, 79.882737],
          [7.069654, 79.882921], [7.069548, 79.882974], [7.069509, 79.882993],
          [7.069366, 79.883015], [7.069129, 79.883051], [7.068732, 79.883147]
        ]
      ]
    }
  ];

  const JUNCTIONS = RAW_JUNCTIONS.map(j => {
    const distFromMeetingM = Math.round(haversineM(MEETING_PLACE.coords, j.coords));
    const walkMin = Math.max(1, Math.round(distFromMeetingM / 78));
    return Object.assign({}, j, { distFromMeetingM, walkMin });
  });

  const MAIN_ROADS = RAW_ROADS.map(r => {
    const distFromMeetingM = Math.round(haversineM(MEETING_PLACE.coords, r.startCoords));
    const walkMin = Math.max(1, Math.round(distFromMeetingM / 78));
    const lengthM = polylineLengthM(r.segments);
    return Object.assign({}, r, { distFromMeetingM, walkMin, lengthM });
  })
    .sort((a, b) => a.distFromMeetingM - b.distFromMeetingM)
    .map((r, idx) => Object.assign(r, { order: idx + 1 }));

  function loadDoneMap() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveDoneMap(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (e) {
      // ignore
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getWalkNavUrl(coords) {
    return `https://www.google.com/maps/dir/?api=1&origin=${MEETING_PLACE.coords[0]},${MEETING_PLACE.coords[1]}&destination=${coords[0]},${coords[1]}&travelmode=walking`;
  }

  function getStreetViewUrl(coords) {
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coords[0]},${coords[1]}&heading=0&pitch=0`;
  }

  function getPinGoogleUrl(coords) {
    return `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;
  }

  function ensurePhotoModal() {
    let modal = document.getElementById("sun-photo-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "sun-photo-modal";
    modal.className = "fixed inset-0 z-[9999] hidden bg-slate-950/85 backdrop-blur-sm items-center justify-center p-4";
    modal.setAttribute("onclick", "window.SundayTerritoryMaps.closePhotoModal()");
    modal.innerHTML = `
      <div onclick="event.stopPropagation()" class="relative max-w-2xl w-full rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        <div class="p-4 bg-slate-900 text-white flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div id="sun-pm-badge" class="text-[10px] font-black uppercase tracking-wider text-amber-300"></div>
            <h4 id="sun-pm-title" class="text-sm sm:text-base font-black truncate"></h4>
            <p id="sun-pm-sub" class="text-[11px] text-slate-300 truncate"></p>
          </div>
          <button type="button" onclick="window.SundayTerritoryMaps.closePhotoModal()"
            class="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white font-black flex items-center justify-center shrink-0">
            ✕
          </button>
        </div>
        <div class="bg-slate-950 flex items-center justify-center max-h-[65vh] overflow-hidden">
          <img id="sun-pm-img" src="" alt="" class="w-full h-auto max-h-[65vh] object-contain" />
        </div>
        <div class="p-4 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p id="sun-pm-cap" class="text-xs font-semibold text-slate-700"></p>
          <div class="flex items-center gap-2 shrink-0">
            <a id="sun-pm-sv" href="#" target="_blank" rel="noopener"
              class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
              Street View ↗
            </a>
            <a id="sun-pm-go" href="#" target="_blank" rel="noopener"
              class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition">
              Go ↗
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function openPhotoModal(title, sub, imgSrc, caption, coords, badgeText) {
    const modal = ensurePhotoModal();
    document.getElementById("sun-pm-badge").textContent = badgeText || "Junction";
    document.getElementById("sun-pm-title").textContent = title;
    document.getElementById("sun-pm-sub").textContent = sub;
    document.getElementById("sun-pm-img").src = imgSrc;
    document.getElementById("sun-pm-cap").textContent = caption;
    document.getElementById("sun-pm-sv").href = getStreetViewUrl(coords);
    document.getElementById("sun-pm-go").href = getWalkNavUrl(coords);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closePhotoModal() {
    const modal = document.getElementById("sun-photo-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  function formatSummaryText() {
    let text = "🧭 *SUNDAY MORNING UNIFIED ROAD & JUNCTION MAP (ONE MAP)*\n";
    text += "🗺️ WP - 0869E · WP - 0869F · WP - 0869C\n";
    text += `🏠 *ආරම්භක ස්ථානය*: ${MEETING_PLACE.name}\n\n`;
    text += "*🛣️ Main Roads:*\n";
    MAIN_ROADS.forEach(r => {
      text += `${r.order}. *${r.name}* (${r.distFromMeetingM}m · ~${r.lengthM}m · ${r.zoneLabel})\n`;
      text += `   🔀 ${r.junctions}\n`;
    });
    text += "\n*📍 Key Junctions:*\n";
    JUNCTIONS.forEach(j => {
      text += `• *${j.code}*: ${j.name} — ${getPinGoogleUrl(j.coords)}\n`;
    });
    return text;
  }

  let doneState = loadDoneMap();
  let activeFilter = "all";
  let selectedRoadId = null;
  let showJunctions = true;
  let mapState = null;

  function notifyHost(msg) {
    if (typeof global.showToast === "function") {
      global.showToast(msg);
    }
  }

  function getVisibleRoads() {
    return MAIN_ROADS.filter(r => {
      if (activeFilter === "pending") return !doneState[r.id];
      if (activeFilter !== "all") return r.zone === activeFilter;
      return true;
    });
  }

  function createRoadPinIcon(road, isSelected, isDone) {
    const bg = isDone ? "#10B981" : road.color;
    const scale = isSelected ? "transform:scale(1.16);" : "";
    const ring = isSelected ? "0 0 0 3px #0f172a, 0 4px 12px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.32)";
    const label = isDone ? "✓" : String(road.order);
    return L.divIcon({
      className: "sun-road-pin-icon",
      html: `
        <div style="width:28px;height:28px;border-radius:9px;background:${bg};color:#fff;border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;box-shadow:${ring};${scale}">
          ${label}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  function createJunctionIcon(j) {
    return L.divIcon({
      className: "sun-jct-icon",
      html: `
        <div style="position:relative;width:42px;height:30px;border-radius:9px;border:2px solid #0f172a;background:#fff;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.38);">
          <img src="${escapeHtml(j.image)}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" />
          <span style="position:absolute;top:1px;left:1px;padding:0 4px;border-radius:4px;background:#0f172a;color:#fde047;font-weight:900;font-size:9px;line-height:1.3;">
            ${escapeHtml(j.code)}
          </span>
        </div>
      `,
      iconSize: [42, 30],
      iconAnchor: [21, 15]
    });
  }

  function createMeetingIcon() {
    return L.divIcon({
      className: "sun-meeting-icon",
      html: `
        <div style="background:#059669;color:#fff;border:2.5px solid #fff;border-radius:999px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 3px 10px rgba(0,0,0,0.35);">
          🏠
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  }

  function updateProgressUI() {
    const doneCount = MAIN_ROADS.filter(r => !!doneState[r.id]).length;
    const total = MAIN_ROADS.length;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;
    const txtEl = document.getElementById("sun-progress-combined");
    const barEl = document.getElementById("sun-progress-bar-combined");
    if (txtEl) txtEl.textContent = `✓ සම්පූර්ණයි: ${doneCount} / ${total}`;
    if (barEl) barEl.style.width = `${pct}%`;
  }

  function updateFilterButtons() {
    const keys = ["all", "wp0869e", "wp0869f", "wp0869c", "pending"];
    keys.forEach(k => {
      const btn = document.getElementById(`sun-flt-${k}`);
      if (!btn) return;
      const isAct = activeFilter === k;
      btn.className = isAct
        ? "px-2.5 py-1 rounded-full text-[11px] font-black bg-slate-900 text-white shadow-xs transition"
        : "px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition";
    });
  }

  function refreshMapVisuals() {
    if (!mapState) return;
    const visibleIds = new Set(getVisibleRoads().map(r => r.id));

    MAIN_ROADS.forEach(road => {
      const entry = mapState.roads[road.id];
      if (!entry) return;
      const isVisible = visibleIds.has(road.id);
      const isDone = !!doneState[road.id];
      const isSel = selectedRoadId === road.id;

      entry.lines.forEach(line => {
        line.setStyle({
          color: isDone ? "#10B981" : road.color,
          weight: isSel ? 7.5 : isVisible ? 5 : 3,
          opacity: isSel ? 1 : isVisible ? 0.92 : 0.2
        });
        if (isSel) line.bringToFront();
      });

      entry.marker.setIcon(createRoadPinIcon(road, isSel, isDone));
      entry.marker.setOpacity(isVisible ? 1 : 0.25);
      entry.marker.setZIndexOffset(isSel ? 900 : isVisible ? 250 + road.order : 10);
    });
  }

  function renderMainRoadsList() {
    const listHost = document.getElementById("sun-roads-list");
    if (!listHost) return;
    const roads = getVisibleRoads();

    if (!roads.length) {
      listHost.innerHTML = `
        <div class="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-500">
          මෙම filter එක යටතේ ප්‍රධාන පාරවල් නොමැත.
        </div>
      `;
      return;
    }

    listHost.innerHTML = roads.map(road => {
      const isDone = !!doneState[road.id];
      const isSel = selectedRoadId === road.id;

      return `
        <div id="sun-road-row-${road.id}"
          onclick="window.SundayTerritoryMaps.focusMainRoad('${road.id}')"
          class="cursor-pointer rounded-2xl border-2 p-3 sm:p-4 transition-all ${
            isSel
              ? "bg-slate-50/90 shadow-md"
              : isDone
                ? "bg-emerald-50/35 border-emerald-200/90 opacity-90 hover:opacity-100"
                : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
          }"
          style="${isSel ? `border-color:${road.color};` : ""}">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-start gap-3 min-w-0 flex-1">
              <span class="w-8 h-8 rounded-xl text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5"
                style="background:${isDone ? "#10B981" : road.color}">
                ${isDone ? "✓" : road.order}
              </span>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="font-black text-sm sm:text-base text-slate-900 ${isDone ? "line-through text-slate-500" : ""}">
                    ${escapeHtml(road.name)}
                  </span>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black font-mono bg-blue-50 text-blue-800">
                    ${escapeHtml(road.zoneLabel)}
                  </span>
                </div>
                <div class="text-xs font-bold text-slate-700 mt-0.5">${escapeHtml(road.siName)}</div>
                <div class="text-[11px] font-semibold text-amber-800 mt-1">🔀 හන්දි: ${escapeHtml(road.junctions)}</div>

                <div class="flex flex-wrap items-center gap-1.5 mt-2">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-[10px] font-black">
                    📍 ${road.distFromMeetingM} m (${road.walkMin} min)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    📏 දිග ~${road.lengthM} m
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-1.5 shrink-0 justify-end" onclick="event.stopPropagation()">
              <a href="${getWalkNavUrl(road.startCoords)}" target="_blank" rel="noopener"
                class="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-[11px] font-bold transition whitespace-nowrap">
                Go ↗
              </a>
              <button type="button"
                onclick="window.SundayTerritoryMaps.toggleDone('${road.id}')"
                title="${isDone ? "Mark Pending" : "Mark Done"}"
                class="w-8 h-8 rounded-xl border-2 flex items-center justify-center font-black text-xs transition ${
                  isDone
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white border-slate-300 hover:border-emerald-500 text-slate-400 hover:text-emerald-600"
                }">
                ✓
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function initMap() {
    const mapEl = document.getElementById("sun-leaflet-map-combined");
    if (!mapEl || typeof global.L === "undefined") return;

    const L = global.L;
    const map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: true });

    const streetsLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}", {
      subdomains: ["0", "1", "2", "3"],
      attribution: "Map &copy; Google",
      maxZoom: 20
    });

    const osmFallback = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri",
      maxZoom: 19
    });

    let switchedToFallback = false;
    streetsLayer.on("tileerror", () => {
      if (!switchedToFallback) {
        switchedToFallback = true;
        if (map.hasLayer(streetsLayer)) {
          map.removeLayer(streetsLayer);
          osmFallback.addTo(map);
          if (mapState) mapState.streetsLayer = osmFallback;
        }
      }
    });

    const satLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}", {
      subdomains: ["0", "1", "2", "3"],
      attribution: "Imagery &copy; Google",
      maxZoom: 20
    });

    streetsLayer.addTo(map);

    const zonePolys = {};
    const allBounds = L.latLngBounds([MEETING_PLACE.coords]);

    L.polygon(OUTER_ROUND, {
      color: "#0f172a",
      weight: 3,
      dashArray: "10 6",
      opacity: 0.45,
      fillColor: "#e0e7ff",
      fillOpacity: 0.08,
      smoothFactor: 2.5,
      interactive: false
    }).addTo(map);
    OUTER_ROUND.forEach(c => allBounds.extend(c));

    // Direct connector from Tharanga's Home to St. Rita Mawatha start
    L.polyline([MEETING_PLACE.coords, [7.063647, 79.881246]], {
      color: "#059669",
      weight: 3.5,
      dashArray: "5 5",
      opacity: 0.85,
      interactive: false
    }).addTo(map);

    Object.keys(ZONES).forEach(zKey => {
      const z = ZONES[zKey];
      const poly = L.polygon(z.boundary, {
        color: z.color,
        weight: 2,
        dashArray: "6 5",
        fillColor: z.color,
        fillOpacity: 0.06,
        interactive: false
      }).addTo(map);
      zonePolys[zKey] = poly;
      z.boundary.forEach(c => allBounds.extend(c));
    });

    const meetingMarker = L.marker(MEETING_PLACE.coords, {
      icon: createMeetingIcon(),
      zIndexOffset: 1000
    }).addTo(map);

    meetingMarker.bindPopup(`
      <div style="min-width:210px;font-family:sans-serif;">
        <div style="font-weight:900;font-size:13px;color:#065f46;">🏠 ${escapeHtml(MEETING_PLACE.name)}</div>
        <div style="font-size:11px;color:#475569;margin:2px 0 6px;">${escapeHtml(MEETING_PLACE.siSub)}</div>
        <a href="${MEETING_PLACE.url}" target="_blank" rel="noopener"
          style="display:inline-block;padding:4px 10px;border-radius:8px;background:#059669;color:#fff;font-size:11px;font-weight:700;text-decoration:none;">
          Open in Google Maps ↗
        </a>
      </div>
    `, { autoPanPaddingTopLeft: [20, 64], autoPanPaddingBottomRight: [20, 20] });

    const roads = {};
    MAIN_ROADS.forEach(road => {
      const lines = [];
      const roadBounds = L.latLngBounds([road.startCoords]);

      road.segments.forEach(seg => {
        seg.forEach(pt => {
          allBounds.extend(pt);
          roadBounds.extend(pt);
        });
        const line = L.polyline(seg, {
          color: doneState[road.id] ? "#10B981" : road.color,
          weight: 5,
          opacity: 0.92,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        line.on("click", () => {
          global.SundayTerritoryMaps.focusMainRoad(road.id);
        });
        lines.push(line);
      });

      const popupHtml = `
        <div style="min-width:230px;font-family:sans-serif;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span style="background:${road.color};color:#fff;border-radius:8px;padding:1px 7px;font-weight:900;font-size:11px;">Road #${road.order}</span>
            <span style="font-size:10px;font-weight:800;color:#475569;">${escapeHtml(road.zoneLabel)}</span>
          </div>
          <div style="font-weight:900;font-size:13px;color:#0f172a;line-height:1.3;">${escapeHtml(road.name)}</div>
          <div style="font-size:11px;font-weight:700;color:#334155;margin:2px 0 4px;">${escapeHtml(road.siName)}</div>
          <div style="font-size:11px;color:#92400e;margin-bottom:8px;">🔀 ${escapeHtml(road.junctions)}</div>
          <div style="display:flex;gap:6px;">
            <a href="${getWalkNavUrl(road.startCoords)}" target="_blank" rel="noopener"
              style="flex:1;text-align:center;padding:5px 8px;border-radius:8px;background:#0f172a;color:#fff;font-size:11px;font-weight:700;text-decoration:none;">
              Walk from Tharanga's ↗
            </a>
            <a href="${getPinGoogleUrl(road.startCoords)}" target="_blank" rel="noopener"
              style="padding:5px 8px;border-radius:8px;background:#e2e8f0;color:#0f172a;font-size:11px;font-weight:700;text-decoration:none;">
              Pin ↗
            </a>
          </div>
        </div>
      `;

      const marker = L.marker(road.pinCoords, {
        icon: createRoadPinIcon(road, false, !!doneState[road.id]),
        zIndexOffset: 250 + road.order
      }).addTo(map);

      marker.bindPopup(popupHtml, { autoPanPaddingTopLeft: [20, 64], autoPanPaddingBottomRight: [20, 20] });
      marker.on("click", () => {
        selectedRoadId = road.id;
        refreshMapVisuals();
        renderMainRoadsList();
      });

      roads[road.id] = { lines, marker, bounds: roadBounds };
    });

    const junctionMarkers = {};
    JUNCTIONS.forEach(j => {
      allBounds.extend(j.coords);
      const jm = L.marker(j.coords, {
        icon: createJunctionIcon(j),
        zIndexOffset: 600
      }).addTo(map);
      jm.bindTooltip(`${j.code}: ${j.name}`, { direction: "top", offset: [0, -14] });
      jm.bindPopup(`
        <div style="min-width:225px;font-family:sans-serif;">
          <div onclick="window.SundayTerritoryMaps.openJunctionPhoto('${j.id}')" style="position:relative;border-radius:10px;overflow:hidden;border:1px solid #cbd5e1;margin-bottom:7px;cursor:pointer;">
            <img src="${escapeHtml(j.image)}" alt="" style="width:100%;height:105px;object-fit:cover;display:block;" />
            <span style="position:absolute;top:5px;left:5px;background:#0f172a;color:#fde047;border-radius:6px;padding:1px 7px;font-weight:900;font-size:11px;">${escapeHtml(j.code)}</span>
            <span style="position:absolute;bottom:4px;right:4px;background:rgba(0,0,0,0.75);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px;">🔍 විශාල කර බලන්න</span>
          </div>
          <div style="font-weight:900;font-size:12px;color:#0f172a;">🔀 ${escapeHtml(j.code)} · ${escapeHtml(j.name)}</div>
          <div style="font-size:11px;color:#475569;margin:2px 0 4px;">${escapeHtml(j.siName)}</div>
          <div style="font-size:11px;font-weight:800;color:#1d4ed8;margin-bottom:8px;">📍 නිවසේ සිට ${j.distFromMeetingM} m (${j.walkMin} min)</div>
          <div style="display:flex;gap:6px;">
            <a href="${getWalkNavUrl(j.coords)}" target="_blank" rel="noopener"
              style="flex:1;text-align:center;padding:5px 8px;border-radius:8px;background:#0f172a;color:#fff;font-size:11px;font-weight:700;text-decoration:none;">
              Walk Here ↗
            </a>
            <a href="${getStreetViewUrl(j.coords)}" target="_blank" rel="noopener"
              style="padding:5px 8px;border-radius:8px;background:#2563eb;color:#fff;font-size:11px;font-weight:700;text-decoration:none;">
              Street View ↗
            </a>
          </div>
        </div>
      `, { autoPanPaddingTopLeft: [20, 72], autoPanPaddingBottomRight: [20, 20] });
      junctionMarkers[j.id] = jm;
    });

    const connectorGroup = L.layerGroup().addTo(map);

    map.fitBounds(allBounds, { padding: [26, 26] });

    mapState = {
      map,
      streetsLayer,
      satLayer,
      isSat: false,
      zonePolys,
      roads,
      junctionMarkers,
      connectorGroup,
      allBounds
    };
  }

  function renderInto(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;

    const total = MAIN_ROADS.length;
    const totalLengthM = MAIN_ROADS.reduce((s, r) => s + r.lengthM, 0);
    const totalKm = (totalLengthM / 1000).toFixed(2);
    const nearest = MAIN_ROADS[0];

    host.innerHTML = `
      <div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black">
            🧭 Sunday Morning Unified Road & Junction Map (One Map)
          </span>
          <h3 class="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
            WP - 0869E, WP - 0869F & WP - 0869C — ප්‍රධාන පාරවල් සහ හන්දි නම් (Main Roads & Junctions)
          </h3>
          <p class="text-xs text-slate-600 mt-0.5">
            🏠 ආරම්භක ස්ථානය: <strong>සහෝ. තරංග කුමාරගේ නිවස</strong> · ප්‍රධාන පාරවල් ${total} · ප්‍රධාන හන්දි ${JUNCTIONS.length}
          </p>
        </div>
      </div>

      <article id="sun-territory-card-combined" class="scroll-mt-24 rounded-3xl bg-white border-2 border-indigo-200/90 shadow-glass overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="p-4 sm:p-5 bg-gradient-to-r from-indigo-50/90 via-slate-50 to-emerald-50/90 border-b border-slate-200 flex flex-col gap-3">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="space-y-1 min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="px-2.5 py-1 rounded-xl bg-blue-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0869E</span>
                <span class="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0869F</span>
                <span class="px-2.5 py-1 rounded-xl bg-violet-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0869C</span>
                <span class="px-2.5 py-0.5 rounded-full border border-slate-300 bg-white text-slate-700 text-[11px] font-extrabold">
                  🛣️ පාරවල් ${total} · 🔀 හන්දි ${JUNCTIONS.length} · ~${totalKm} km
                </span>
              </div>
              <h4 class="text-base sm:text-lg font-black text-slate-900 leading-snug pt-0.5">
                ඒකාබද්ධ සේවා සිතියම — ප්‍රධාන පාරවල් සහ හන්දි
              </h4>
              <p class="text-[11px] sm:text-xs text-slate-600 font-medium">
                St. Rita Mw · Mahawaththa Rd · Suhadha Mw · Wewala Rd (Juse Vaas Mw) · Reeta Mawatha
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-1.5 shrink-0">
              <button type="button" onclick="window.SundayTerritoryMaps.copyAll()"
                class="px-2.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs transition">
                📋 Copy
              </button>
              <button type="button" onclick="window.SundayTerritoryMaps.shareAll()"
                class="px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition">
                WhatsApp
              </button>
            </div>
          </div>

          <div class="pt-2.5 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="text-[11px] font-bold text-slate-700">
              📍 ළඟම ප්‍රධාන පාර: <span class="text-slate-900 font-black">${escapeHtml(nearest.name)}</span> (${nearest.distFromMeetingM} m)
            </div>
            <div class="flex items-center gap-2 min-w-[180px]">
              <span id="sun-progress-combined" class="text-[11px] font-black text-emerald-700 whitespace-nowrap">✓ සම්පූර්ණයි: 0 / ${total}</span>
              <div class="flex-1 h-2 rounded-full bg-white/90 border border-slate-200 overflow-hidden min-w-[70px]">
                <div id="sun-progress-bar-combined" class="h-full bg-emerald-500 transition-all duration-300" style="width: 0%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Unified Map -->
        <div id="sun-map-wrapper-combined" class="relative isolate z-0 bg-slate-100 border-b border-slate-200 overflow-hidden flex flex-col">
          <div id="sun-leaflet-map-combined" class="w-full h-[400px] sm:h-[490px] z-10"></div>

          <!-- Floating Map Controls -->
          <div class="absolute top-2.5 right-2.5 z-[400] flex flex-wrap items-center justify-end gap-1.5 max-w-[85%]">
            <button type="button" id="sun-jct-btn" onclick="window.SundayTerritoryMaps.toggleJunctions()"
              class="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-amber-300 border border-slate-700 text-[11px] font-extrabold shadow-md transition">
              🔀 Junctions: ON
            </button>
            <button type="button" id="sun-layer-btn-combined" onclick="window.SundayTerritoryMaps.toggleLayer()"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md transition">
              🛰️ Satellite
            </button>
            <button type="button" id="sun-fullscreen-btn" onclick="window.SundayTerritoryMaps.toggleFullScreen()"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md transition">
              ⛶ Fullscreen
            </button>
            <button type="button" onclick="window.SundayTerritoryMaps.fitZone('all')"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md transition">
              🎯 Fit All
            </button>
            <button type="button" onclick="window.SundayTerritoryMaps.fitZone('wp0869e')"
              class="px-2 py-1.5 rounded-xl bg-blue-600/95 hover:bg-blue-700 text-white text-[11px] font-extrabold shadow-md transition">
              0869E
            </button>
            <button type="button" onclick="window.SundayTerritoryMaps.fitZone('wp0869f')"
              class="px-2 py-1.5 rounded-xl bg-emerald-600/95 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-md transition">
              0869F
            </button>
            <button type="button" onclick="window.SundayTerritoryMaps.fitZone('wp0869c')"
              class="px-2 py-1.5 rounded-xl bg-violet-600/95 hover:bg-violet-700 text-white text-[11px] font-extrabold shadow-md transition">
              0869C
            </button>
          </div>

          <div class="px-3 py-2 bg-slate-900/95 text-white text-[10px] sm:text-[11px] font-semibold flex flex-wrap items-center justify-between gap-1.5">
            <span>🏠 කොළ සලකුණ = සහෝ. තරංගගේ නිවස · 🛣️ 1–${total} = ප්‍රධාන පාරවල් · 🔀 J1–J${JUNCTIONS.length} = හන්දි</span>
            <span class="text-amber-200">පාරක් හෝ හන්දියක් click කර විස්තර බලන්න</span>
          </div>
        </div>

        <!-- Key Junctions Directory + Main Roads List -->
        <div class="p-4 sm:p-5 flex flex-col gap-4">
          <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <h5 class="text-xs sm:text-sm font-black text-slate-900 mb-2">
              🔀 ප්‍රධාන හන්දි නම් (Junctions J1–J${JUNCTIONS.length}) — Click කර Map එකේ බලන්න:
            </h5>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              ${JUNCTIONS.map(j => `
                <div onclick="window.SundayTerritoryMaps.focusJunction('${j.id}')"
                  class="cursor-pointer p-2 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200/80 flex items-center gap-2.5 transition">
                  <div onclick="event.stopPropagation(); window.SundayTerritoryMaps.openJunctionPhoto('${j.id}')"
                    title="ඡායාරූපය විශාල කර බලන්න"
                    class="relative w-16 h-14 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-slate-900 group">
                    <img src="${escapeHtml(j.image)}" alt="${escapeHtml(j.name)}" class="w-full h-full object-cover group-hover:scale-105 transition" />
                    <span class="absolute top-0.5 left-0.5 px-1 rounded bg-slate-900/90 text-amber-300 text-[9px] font-black">${escapeHtml(j.code)}</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center justify-between gap-1">
                      <span class="text-xs font-black text-slate-900 leading-snug">${escapeHtml(j.name)}</span>
                      <span class="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-black shrink-0">📍 ${j.distFromMeetingM} m (${j.walkMin} min)</span>
                    </div>
                    <div class="text-[11px] font-semibold text-slate-600 mt-0.5">${escapeHtml(j.siName)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2">
            <h5 class="text-xs sm:text-sm font-black text-slate-800">
              🛣️ ප්‍රධාන පාරවල් (${total} — දුර අනුව)
            </h5>
            <div class="flex flex-wrap items-center gap-1.5">
              <button type="button" id="sun-flt-all" onclick="window.SundayTerritoryMaps.setFilter('all')">All (${total})</button>
              <button type="button" id="sun-flt-wp0869e" onclick="window.SundayTerritoryMaps.setFilter('wp0869e')">0869E</button>
              <button type="button" id="sun-flt-wp0869f" onclick="window.SundayTerritoryMaps.setFilter('wp0869f')">0869F</button>
              <button type="button" id="sun-flt-wp0869c" onclick="window.SundayTerritoryMaps.setFilter('wp0869c')">0869C</button>
              <button type="button" id="sun-flt-pending" onclick="window.SundayTerritoryMaps.setFilter('pending')">Pending</button>
            </div>
          </div>

          <div id="sun-roads-list" class="flex flex-col gap-2.5"></div>
        </div>
      </article>
    `;

    initMap();
    updateProgressUI();
    updateFilterButtons();
    renderMainRoadsList();
  }

  global.SundayTerritoryMaps = {
    ZONES,
    MAIN_ROADS,
    JUNCTIONS,
    MEETING_PLACE,
    renderInto,
    toggleLayer() {
      if (!mapState) return;
      const btn = document.getElementById("sun-layer-btn-combined");
      if (mapState.isSat) {
        mapState.map.removeLayer(mapState.satLayer);
        mapState.map.addLayer(mapState.streetsLayer);
        mapState.isSat = false;
        if (btn) btn.textContent = "🛰️ Satellite";
      } else {
        mapState.map.removeLayer(mapState.streetsLayer);
        mapState.map.addLayer(mapState.satLayer);
        mapState.isSat = true;
        if (btn) btn.textContent = "🗺️ Street Map";
      }
    },
    toggleJunctions() {
      showJunctions = !showJunctions;
      const btn = document.getElementById("sun-jct-btn");
      if (btn) btn.textContent = showJunctions ? "🔀 Junctions: ON" : "🔀 Junctions: OFF";
      if (!mapState) return;
      Object.values(mapState.junctionMarkers).forEach(jm => {
        if (showJunctions) {
          jm.addTo(mapState.map);
        } else {
          mapState.map.removeLayer(jm);
        }
      });
    },
    toggleFullScreen() {
      const wrapper = document.getElementById("sun-map-wrapper-combined") || document.getElementById("sun-leaflet-map-combined");
      if (!wrapper) return;
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      const isPseudoFs = wrapper.classList.contains("fixed");
      if (!fsEl && !isPseudoFs) {
        const req = wrapper.requestFullscreen || wrapper.webkitRequestFullscreen;
        if (req) {
          Promise.resolve(req.call(wrapper)).catch(() => {
            wrapper.classList.add("fixed", "inset-0", "z-[9999]", "bg-slate-100");
            handleSunFullscreenChange();
          });
        } else {
          wrapper.classList.add("fixed", "inset-0", "z-[9999]", "bg-slate-100");
          handleSunFullscreenChange();
        }
      } else {
        if (isPseudoFs) {
          wrapper.classList.remove("fixed", "inset-0", "z-[9999]", "bg-slate-100");
          handleSunFullscreenChange();
        } else {
          const exit = document.exitFullscreen || document.webkitExitFullscreen;
          if (exit) Promise.resolve(exit.call(document)).catch(() => {});
        }
      }
    },
    fitZone(zoneKey) {
      if (!mapState) return;
      mapState.map.closePopup();
      if (ZONES[zoneKey]) {
        activeFilter = zoneKey;
        updateFilterButtons();
        renderMainRoadsList();
        refreshMapVisuals();
        const bounds = mapState.zonePolys[zoneKey].getBounds().extend(MEETING_PLACE.coords);
        mapState.map.fitBounds(bounds, { padding: [26, 26] });
      } else {
        activeFilter = "all";
        updateFilterButtons();
        renderMainRoadsList();
        refreshMapVisuals();
        mapState.map.fitBounds(mapState.allBounds, { padding: [26, 26] });
      }
    },
    setFilter(filterKey) {
      activeFilter = filterKey;
      updateFilterButtons();
      renderMainRoadsList();
      refreshMapVisuals();
    },
    focusMainRoad(roadId) {
      if (!mapState || !mapState.roads[roadId]) return;
      selectedRoadId = roadId;
      refreshMapVisuals();
      renderMainRoadsList();
      const road = MAIN_ROADS.find(r => r.id === roadId);
      const entry = mapState.roads[roadId];
      if (mapState.connectorGroup && road) {
        mapState.connectorGroup.clearLayers();
        L.polyline([MEETING_PLACE.coords, road.startCoords], {
          color: "#0f172a",
          weight: 2.5,
          dashArray: "6 6",
          opacity: 0.75
        }).addTo(mapState.connectorGroup);
      }
      mapState.map.fitBounds(entry.bounds.extend(MEETING_PLACE.coords), { padding: [45, 45], maxZoom: 17 });
      setTimeout(() => entry.marker.openPopup(), 120);
    },
    focusJunction(jctId) {
      const j = JUNCTIONS.find(x => x.id === jctId);
      if (!j || !mapState) return;
      if (!showJunctions) this.toggleJunctions();
      if (mapState.connectorGroup) {
        mapState.connectorGroup.clearLayers();
        L.polyline([MEETING_PLACE.coords, j.coords], {
          color: "#0f172a",
          weight: 2.5,
          dashArray: "6 6",
          opacity: 0.75
        }).addTo(mapState.connectorGroup);
      }
      mapState.map.setView(j.coords, 18, { animate: true });
      const jm = mapState.junctionMarkers[jctId];
      if (jm) setTimeout(() => jm.openPopup(), 120);
    },
    openJunctionPhoto(jctId) {
      const j = JUNCTIONS.find(x => x.id === jctId);
      if (!j) return;
      openPhotoModal(
        `${j.code} · ${j.name}`,
        `${j.siName} · නිවසේ සිට ${j.distFromMeetingM} m (${j.walkMin} min)`,
        j.image,
        j.siName,
        j.coords,
        `Sunday Junction ${j.code}`
      );
    },
    closePhotoModal,
    toggleDone(roadId) {
      doneState[roadId] = !doneState[roadId];
      saveDoneMap(doneState);
      updateProgressUI();
      refreshMapVisuals();
      renderMainRoadsList();
    },
    copyAll() {
      navigator.clipboard.writeText(formatSummaryText()).then(() => {
        notifyHost("Sunday One Map roads & junctions copied!");
      });
    },
    shareAll() {
      const url = `https://wa.me/?text=${encodeURIComponent(formatSummaryText())}`;
      global.open(url, "_blank");
    }
  };

  function handleSunFullscreenChange() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const wrapper = document.getElementById("sun-map-wrapper-combined");
    const isFs = (fsEl && (fsEl.id === "sun-map-wrapper-combined" || fsEl.id === "sun-leaflet-map-combined")) ||
      (wrapper && wrapper.classList.contains("fixed"));
    const btn = document.getElementById("sun-fullscreen-btn");
    const mapEl = document.getElementById("sun-leaflet-map-combined");
    if (btn) {
      btn.textContent = isFs ? "✕ Exit Fullscreen" : "⛶ Fullscreen";
    }
    if (mapEl) {
      if (isFs) {
        mapEl.classList.remove("h-[400px]", "sm:h-[490px]");
        mapEl.classList.add("flex-1", "h-full");
      } else {
        mapEl.classList.remove("flex-1", "h-full");
        mapEl.classList.add("h-[400px]", "sm:h-[490px]");
      }
    }
    if (mapState && mapState.map) {
      setTimeout(() => mapState.map.invalidateSize(), 120);
    }
  }

  document.addEventListener("fullscreenchange", handleSunFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleSunFullscreenChange);
})(window);

