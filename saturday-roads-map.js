/* ============================================================================
 * Saturday Morning Field Service — Unified Interactive Road Map (One Map)
 * Dispatch Order (සේවයේ යවන පිළිවෙල 1–14) + Start-Point Photos + Real Road Curves
 * Reference Meeting Place: Bro. Sisira's Residence (7.072688, 79.896789)
 * ============================================================================ */
(function (global) {
  "use strict";

  const STORAGE_KEY = "batagama_sat_dispatch_done_v3";

  const MEETING_PLACE = {
    name: "සහෝ. සිසිරගේ නිවස (Sisira Uncle Home)",
    siSub: "Saturday Morning Meeting Place (9:00 AM)",
    coords: [7.072688, 79.896789],
    url: "https://maps.app.goo.gl/xobfwzL5Yi4Dwjcv6",
    image: "assets/sisira_location.jpg",
    caption: "පිවිසුම් මාර්ගයේ ඡායාරූපය (කොන්ක්‍රීට් මාර්ගය ඔස්සේ කෙලින්ම නිවස වෙත)"
  };

  const ZONES = {
    wp0980: {
      key: "wp0980",
      code: "WP - 0980",
      color: "#2563EB",
      boundary: [
        [7.075576, 79.897550], [7.078243, 79.900337], [7.079125, 79.900472],
        [7.077723, 79.902590], [7.077460, 79.904932], [7.068876, 79.894087],
        [7.075172, 79.897514]
      ]
    },
    wp0982: {
      key: "wp0982",
      code: "WP - 0982",
      color: "#059669",
      boundary: [
        [7.078223, 79.896602], [7.080043, 79.895661], [7.079291, 79.893423],
        [7.071837, 79.893979], [7.075163, 79.897489]
      ]
    },
    wp0983: {
      key: "wp0983",
      code: "WP - 0983",
      color: "#7C3AED",
      boundary: [
        [7.071762, 79.893700], [7.075264, 79.893848],
        [7.079224, 79.893438], [7.079240, 79.891950]
      ]
    },
    wp0879: {
      key: "wp0879",
      code: "WP - 0879",
      color: "#D97706",
      boundary: [
        [7.068911, 79.893941], [7.070118, 79.890267], [7.071471, 79.890276],
        [7.071744, 79.892965], [7.068883, 79.893998]
      ]
    }
  };

  const OUTER_ROUND = [
    [7.0666, 79.8896], [7.0688, 79.8892], [7.0718, 79.8895], [7.0756, 79.8906],
    [7.0796, 79.8914], [7.0810, 79.8936], [7.0806, 79.8968], [7.0798, 79.9008],
    [7.0784, 79.9048], [7.0752, 79.9056], [7.0724, 79.9044], [7.0694, 79.9022],
    [7.0676, 79.8992], [7.0672, 79.8946], [7.0664, 79.8914]
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

  const GROUP_PLAN = [
    {
      group: "Group 1",
      title: "සිසිර අංකල්ගේ නිවස → ප්‍රධාන පාර (දකුණු පස)",
      count: "4 දෙනෙක් (2 + 2)",
      detail: "නිවසෙන් පිටත්ව දකුණු පසින් main road එකට ඇවිත් 2 + 2 බැගින් දෙපැත්ත කරගෙන යන්න.",
      roadId: "sat-disp-1",
      color: "#2563EB"
    },
    {
      group: "Group 2",
      title: "සිසිර නිවස → බයිබල් විද්‍යාලය දක්වා (වම් පස)",
      count: "4 දෙනෙක් (2 + 2)",
      detail: "නිවසෙන් වම් පසින් පටන් ගෙන Assemblies of God Bible College දක්වා වම් හා දකුණු පැති කරන්න.",
      roadId: "sat-disp-2",
      color: "#1D4ED8"
    },
    {
      group: "Group 3",
      title: "මීගමුව පාර (A3) → Meril Fernando Av & උඩ Y වම් පස",
      count: "4 දෙනෙක් (2 + 2)",
      detail: "The Colour Centre / Labour Office අසලින් Meril Fernando Av දකුණු පස කරගෙන ඇවිත් උඩ Y වම් පස කරන්න.",
      roadId: "sat-disp-3",
      color: "#D97706"
    },
    {
      group: "Group 4",
      title: "Kings Drive & Court Rd (වම් අතුරු පාරවල් 4 + දකුණ)",
      count: "4 දෙනෙක් (වම් 2 + දකුණ 2)",
      detail: "Macbertan හන්දියෙන් Court Rd උඩට: වම් 2 Kings Drive lanes 4 (Roland Park දක්වා), දකුණ 2 Court Rd කෙලින්ම Panda Bake House දක්වා.",
      roadId: "sat-disp-6",
      color: "#10B981"
    },
    {
      group: "Group 5",
      title: "Pearl Court Loop (Finger Food Platters ඉදිරිපිට)",
      count: "4 දෙනෙක් (Loop වම් 2 + දකුණ 2)",
      detail: "Finger Food Platters ඉදිරිපිටින් Pearl Court ඇතුළට ගොස් දෙදෙනෙක් දකුණු පසත්, දෙදෙනෙක් වම් පසත් (Bunny Cakes පැත්ත) කරන්න.",
      roadId: "sat-disp-6",
      color: "#059669"
    },
    {
      group: "Group 6",
      title: "උඩ Y හන්දිය (Panda Bake House) → ඉදිරියට",
      count: "4 දෙනෙක් (වම් 2 + දකුණ 2)",
      detail: "Panda Bake House හන්දියෙන් වම් 2 Samagi Mw (Electron Lanka පැත්ත) සහ දකුණ 2 Court Rd උතුරු කෙළවර කරන්න.",
      roadId: "sat-disp-4",
      color: "#0284C7"
    },
    {
      group: "Group 7",
      title: "කලවාරි පාර & ජා-ඇල කපාල කන්ද පාර",
      count: "4 + 4 දෙනෙක්",
      detail: "A3 සිට Mount Calvary Rd ආරම්භයේ 4 දෙනෙක් (2+2) සහ ඉහළ Kapalakanda Rd කොටසට 4 දෙනෙක් (2+2).",
      roadId: "sat-disp-7",
      color: "#7C3AED"
    },
    {
      group: "Group 8",
      title: "වලව්වත්ත පාර",
      count: "4 දෙනෙක් (2 + 2)",
      detail: "වලව්වත්ත හරස් පාර ආරම්භයේ සිට වම් 2 + දකුණ 2 බැගින් යන්න.",
      roadId: "sat-disp-8",
      color: "#9333EA"
    },
    {
      group: "Group 9",
      title: "වැලිගම්පිටිය හන්දිය & ජයලත් ජයවර්ධන පාර",
      count: "4 + 8 දෙනෙක්",
      detail: "හන්දියෙන් ඉදිරියට 4 දෙනෙක්; ජයලත් ජයවර්ධන මාවත දෙකෙළවරින් (ආරම්භය 4 + අවසානය 4) ඇතුළට කරගෙන එන්න.",
      roadId: "sat-disp-9",
      color: "#EA580C"
    },
    {
      group: "Group 10",
      title: "තිම්පිලිය / රීටා පාර, චමින්ද අයියා පාර & ඉසුරු උයන",
      count: "4 + 6 + 4 + 8 දෙනෙක්",
      detail: "St. Rita දකුණ (4), චමින්ද අයියා පාර (4+2), පල්ලියේ සිට ඉසුරු උයන දෙසට (4), ඉසුරු උයන දකුණ (4) & වම (4).",
      roadId: "sat-disp-11",
      color: "#DB2777"
    }
  ];

  // Exact Saturday Dispatch Order (1–14) matching the WhatsApp list
  const RAW_ROADS = [
    {
      id: "sat-disp-1",
      order: 1,
      name: "Sisira Uncle Home Starting (Right Side)",
      siName: "සිසිර අංකල්ගේ නිවස ආරම්භය — දකුණු පස",
      note: "Sisira uncle home starting = 4 (right side)",
      zone: "wp0980",
      zoneLabel: "WP - 0980",
      color: "#2563EB",
      totalCount: "4",
      startCoords: [7.072758, 79.896565],
      pinCoords: [7.07295, 79.89670],
      startImage: "assets/sisira_location.jpg",
      startImageCaption: "සහෝ. සිසිරගේ නිවස ආරම්භය — දකුණු පස (4)",
      segments: [
        [
          [7.072758, 79.896565], [7.072537, 79.896451], [7.072283, 79.896304],
          [7.072146, 79.896214], [7.072054, 79.896144], [7.071883, 79.896053]
        ]
      ]
    },
    {
      id: "sat-disp-2",
      order: 2,
      name: "Sisira Home → Bible College (Left Side)",
      siName: "සිසිර අංකල්ගේ නිවස සිට බයිබල් විද්‍යාලය ළඟට — වම් පස",
      note: "Sisira uncle home starting = 2 (left side) = Bible college gawata",
      zone: "wp0980",
      zoneLabel: "WP - 0980",
      color: "#1D4ED8",
      totalCount: "2",
      startCoords: [7.072146, 79.896214],
      pinCoords: [7.07218, 79.89580],
      startImage: "assets/sisira_location.jpg",
      startImageCaption: "සිසිර අංකල්ගේ නිවස සිට බයිබල් විද්‍යාලය ළඟට (වම් පස 2)",
      segments: [
        [
          [7.072146, 79.896214], [7.071762, 79.895939], [7.071596, 79.895787],
          [7.071464, 79.895693], [7.071364, 79.895664]
        ]
      ]
    },
    {
      id: "sat-disp-3",
      order: 3,
      name: "Negombo Rd Starting (Udata Right Side)",
      siName: "මීගමුව පාර (A3) ආරම්භය — උඩට දකුණු පස",
      note: "Negombo starting udata right side = 4",
      zone: "wp0879",
      zoneLabel: "WP - 0879",
      color: "#D97706",
      totalCount: "4",
      startCoords: [7.071725, 79.893058],
      pinCoords: [7.073666, 79.89254],
      startImage: "assets/sat_negombo_start.png",
      startImageCaption: "මීගමුව පාර (A3) උඩට දකුණු පස ආරම්භක ස්ථානය (4)",
      segments: [
        [
          [7.071725, 79.893058], [7.072158, 79.893011], [7.072492, 79.892986],
          [7.072913, 79.892888], [7.073307, 79.892735], [7.073666, 79.89254],
          [7.074441, 79.89208], [7.075442, 79.891745], [7.076751, 79.891369],
          [7.078459, 79.890919], [7.079299, 79.890706]
        ]
      ]
    },
    {
      id: "sat-disp-4",
      order: 4,
      name: "Uda Y Junction (Left Side)",
      siName: "උඩ Y හන්දිය — වම් පස",
      note: "Uda Y ekena left side 4",
      zone: "wp0982",
      zoneLabel: "WP - 0982",
      color: "#059669",
      totalCount: "4",
      startCoords: [7.075561, 79.897624],
      pinCoords: [7.07595, 79.89745],
      startImage: "assets/sat_uda_y.png",
      startImageCaption: "උඩ Y හන්දිය — වම් පස ආරම්භක ස්ථානය (4)",
      segments: [
        [
          [7.075561, 79.897624], [7.075644, 79.897328], [7.075696, 79.897245],
          [7.07577, 79.89725], [7.076231, 79.897428], [7.076644, 79.897625],
          [7.07775, 79.89828]
        ]
      ]
    },
    {
      id: "sat-disp-5",
      order: 5,
      name: "Bible College (Left Side)",
      siName: "බයිබල් විද්‍යාලය අසල — වම් පස",
      note: "Bible college eke 4 left side",
      zone: "wp0980",
      zoneLabel: "WP - 0980",
      color: "#0284C7",
      totalCount: "4",
      startCoords: [7.071522, 79.896822],
      pinCoords: [7.07135, 79.89695],
      startImage: "assets/sat_bible_college.png",
      startImageCaption: "Assemblies of God Bible College අසල — වම් පස (4)",
      segments: [
        [
          [7.071273, 79.895677], [7.071189, 79.895748], [7.07108, 79.895862],
          [7.071037, 79.895899], [7.070884, 79.895835], [7.070702, 79.895688],
          [7.07042, 79.895925], [7.070587, 79.896094], [7.070921, 79.896396]
        ]
      ]
    },
    {
      id: "sat-disp-6",
      order: 6,
      name: "Kings Drive (Start & End)",
      siName: "කිංග්ස් ඩ්‍රයිව් — ආරම්භය සහ අවසානය",
      note: "Kings drive eka start and end 4",
      zone: "wp0982",
      zoneLabel: "WP - 0982",
      color: "#10B981",
      totalCount: "4",
      startCoords: [7.072001, 79.897683],
      pinCoords: [7.073781, 79.898371],
      startImage: "assets/sat_kings_drive.png",
      startImageCaption: "Kings Drive Avenue ආරම්භක ස්ථානය (4)",
      segments: [
        [
          [7.072001, 79.897683], [7.072126, 79.897565], [7.072268, 79.897604],
          [7.072613, 79.897785], [7.072922, 79.897943], [7.073457, 79.898222],
          [7.073781, 79.898371], [7.074035, 79.898498], [7.074683, 79.898762],
          [7.074908, 79.89885]
        ]
      ]
    },
    {
      id: "sat-disp-7",
      order: 7,
      name: "Kalawari Para & Kapala Kanda Para",
      siName: "කලවාරි පාර ආරම්භය (4) & ජා-ඇල කපාල කන්ද පාර (4)",
      note: "Kalawari para starting 4 · Ja ela kapala kanda para 4",
      zone: "wp0983",
      zoneLabel: "WP - 0983",
      color: "#7C3AED",
      totalCount: "4+4",
      startCoords: [7.071849, 79.894003],
      pinCoords: [7.075823, 79.894194],
      startImage: "assets/sat_kalawari_start.png",
      startImageCaption: "කලවාරි පාර (Mount Calvary Rd) ආරම්භය (4)",
      segments: [
        [
          [7.071595, 79.893075], [7.071755, 79.893681], [7.071849, 79.894003],
          [7.072683, 79.893889], [7.073806, 79.893748], [7.074657, 79.893667],
          [7.075186, 79.893787], [7.07563, 79.894088], [7.076027, 79.894238],
          [7.076894, 79.894086], [7.077724, 79.893827], [7.078587, 79.893695],
          [7.079282, 79.893423]
        ]
      ],
      subItems: [
        {
          id: "sat-sub-7b",
          label: "Ja ela kapala kanda para 4",
          siLabel: "ජා-ඇල කපාල කන්ද පාර (4)",
          count: "4",
          coords: [7.078587, 79.893695],
          image: "assets/sat_kapalakanda.png"
        }
      ]
    },
    {
      id: "sat-disp-8",
      order: 8,
      name: "Walawwatta Rd Starting",
      siName: "වලව්වත්ත පාර ආරම්භය",
      note: "Walavvattha rode stating 4",
      zone: "wp0983",
      zoneLabel: "WP - 0983",
      color: "#9333EA",
      totalCount: "4",
      startCoords: [7.072811, 79.895318],
      pinCoords: [7.073121, 79.895613],
      startImage: "assets/sat_walawwatta.png",
      startImageCaption: "වලව්වත්ත / කපාලකන්ද හරස් පාර ආරම්භය (4)",
      segments: [
        [
          [7.071849, 79.894003], [7.072069, 79.894319], [7.072372, 79.89479],
          [7.072596, 79.895114], [7.072811, 79.895318], [7.073121, 79.895613],
          [7.073422, 79.89598], [7.074009, 79.89693]
        ]
      ]
    },
    {
      id: "sat-disp-9",
      order: 9,
      name: "Jayalath Jayawardana Rd (Start & End)",
      siName: "ජයලත් ජයවර්ධන පාර — ආරම්භය සහ අවසානය",
      note: "Jayalath jayawardana rode stating end 8",
      zone: "wp0879",
      zoneLabel: "WP - 0879",
      color: "#EA580C",
      totalCount: "8",
      startCoords: [7.069423, 79.891242],
      pinCoords: [7.069423, 79.891242],
      startImage: "assets/sat_jayalath_mw.png",
      startImageCaption: "ජයලත් ජයවර්ධන පාර ආරම්භය & අවසානය (8)",
      segments: [
        [
          [7.068902, 79.893974], [7.068873, 79.893411], [7.068959, 79.893032],
          [7.069178, 79.892409], [7.069309, 79.891788], [7.069423, 79.891242],
          [7.069527, 79.890894], [7.069398, 79.890409], [7.068952, 79.889934],
          [7.068377, 79.889474], [7.067815, 79.889071]
        ]
      ]
    },
    {
      id: "sat-disp-10",
      order: 10,
      name: "Weligampitiya Junction (Issarahata)",
      siName: "වැලිගම්පිටිය හන්දිය — ඉස්සරහට",
      note: "Waligampita junction 4 issarahata",
      zone: "wp0879",
      zoneLabel: "WP - 0879",
      color: "#F59E0B",
      totalCount: "4",
      startCoords: [7.068853, 79.894057],
      pinCoords: [7.068853, 79.894057],
      startImage: "assets/sat_weligampitiya_jct.png",
      startImageCaption: "වැලිගම්පිටිය හන්දිය — ඉස්සරහට (4)",
      segments: [
        [
          [7.068853, 79.894057], [7.068742, 79.894528], [7.068446, 79.895147],
          [7.068267, 79.89561], [7.068212, 79.896281], [7.068235, 79.897151]
        ]
      ]
    },
    {
      id: "sat-disp-11",
      order: 11,
      name: "Thimpiliya / St. Rita Rd (Weligampitiya Right)",
      siName: "තිම්පිලිය / රීටා පාර (චමින්ද අයියා පාරට ඉස්සර වැලිගම්පිටිය පැත්තට දකුණ)",
      note: "Thimpaliya or Rita rode (chaminda aiya harena parata issara waligampitiya paththata right 4)",
      zone: "wp0980",
      zoneLabel: "WP - 0980",
      color: "#0EA5E9",
      totalCount: "4",
      startCoords: [7.068448, 79.898689],
      pinCoords: [7.069186, 79.898872],
      startImage: "assets/road_st_rita_start.jpg",
      startImageCaption: "St. Rita Ave / තිම්පිලිය පාර ආරම්භය — වැලිගම්පිටිය පැත්තට දකුණ (4)",
      segments: [
        [
          [7.068448, 79.898689], [7.06883, 79.898772], [7.069186, 79.898872],
          [7.069478, 79.898991], [7.069704, 79.899105], [7.07014, 79.899322],
          [7.070793, 79.899683]
        ]
      ]
    },
    {
      id: "sat-disp-12",
      order: 12,
      name: "Chaminda Aiya Rd (Right 4) & Church Rd Start (2)",
      siName: "චමින්ද අයියාගේ පාර (දකුණ 4) & පල්ලියේ සිට පාර ආරම්භය (2)",
      note: "Chaminda aiya rod e right side 4, church eke idala rode eka stating poin 2",
      zone: "wp0980",
      zoneLabel: "WP - 0980",
      color: "#0D9488",
      totalCount: "4+2",
      startCoords: [7.070793, 79.899683],
      pinCoords: [7.070508, 79.900865],
      startImage: "assets/road_st_clare_start.jpg",
      startImageCaption: "චමින්ද අයියාගේ පාර (St. Clare Rd) ආරම්භය — දකුණු පස (4) & පල්ලියේ සිට (2)",
      segments: [
        [
          [7.070793, 79.899683], [7.070746, 79.899877], [7.070661, 79.900253],
          [7.070508, 79.900865], [7.070467, 79.901129], [7.07046, 79.901506],
          [7.070472, 79.901758], [7.070476, 79.901994], [7.070473, 79.902426]
        ]
      ]
    },
    {
      id: "sat-disp-13",
      order: 13,
      name: "Church Idala → Right to Isuru Uyana",
      siName: "පල්ලියේ සිට දකුණට ඉසුරු උයන දෙසට",
      note: "Church idala 4 right isuru uyanata",
      zone: "wp0980",
      zoneLabel: "WP - 0980",
      color: "#6366F1",
      totalCount: "4",
      startCoords: [7.06754, 79.89146],
      pinCoords: [7.073376, 79.903634],
      startImage: "assets/sat_church_rd.png",
      startImageCaption: "පල්ලිය අසල සිට දකුණට ඉසුරු උයන දෙසට (4)",
      segments: [
        [
          [7.070793, 79.899683], [7.07138, 79.900177], [7.072043, 79.900738],
          [7.072806, 79.901056], [7.073118, 79.901892], [7.073273, 79.902721],
          [7.073376, 79.903634], [7.073667, 79.904355], [7.074932, 79.904953]
        ]
      ]
    },
    {
      id: "sat-disp-14",
      order: 14,
      name: "Isuru Uyana (Right Side 4 & Left Side 4)",
      siName: "ඉසුරු උයන — දකුණු පස (4) සහ වම් පස (4)",
      note: "Isuru uyana right side ekata 4 · Isuru uyana left side 4",
      zone: "wp0980",
      zoneLabel: "WP - 0980",
      color: "#DB2777",
      totalCount: "4+4",
      startCoords: [7.074932, 79.904953],
      pinCoords: [7.075173, 79.903832],
      startImage: "assets/sat_isuru_uyana.png",
      startImageCaption: "ඉසුරු උයන පාර ආරම්භය — දකුණු පස (4) සහ වම් පස (4)",
      segments: [
        [
          [7.074932, 79.904953], [7.07502, 79.904504], [7.075098, 79.904108],
          [7.075173, 79.903832], [7.075321, 79.903295], [7.075382, 79.90294],
          [7.075476, 79.902757]
        ]
      ]
    }
  ];

  // Keep exact WhatsApp dispatch order (1 to 14) while enriching distance & length
  const MAIN_ROADS = RAW_ROADS.map(r => {
    const distFromMeetingM = Math.round(haversineM(MEETING_PLACE.coords, r.startCoords));
    const walkMin = Math.max(1, Math.round(distFromMeetingM / 78));
    const lengthM = polylineLengthM(r.segments);
    return Object.assign({}, r, { distFromMeetingM, walkMin, lengthM });
  });

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

  function formatSummaryText() {
    let text = "🧭 *SATURDAY MORNING FIELD SERVICE DISPATCH (ONE MAP)*\n";
    text += `🏠 *ආරම්භක ස්ථානය*: ${MEETING_PLACE.name}\n\n`;
    MAIN_ROADS.forEach(r => {
      text += `${r.order}. *${r.name}* [${r.totalCount}] (${r.zoneLabel})\n`;
      text += `   📝 ${r.note}\n`;
      text += `   📍 ${getPinGoogleUrl(r.startCoords)}\n`;
    });
    return text;
  }

  const CUSTOM_ROADS_KEY = "batagama_sat_custom_roads_v1";
  let doneState = loadDoneMap();
  let activeFilter = "all";
  let selectedRoadId = null;
  let showMapLabels = true;
  let editMode = false;
  let editRoadId = null;
  let editHandles = [];
  let mapState = null;

  function loadCustomOverrides() {
    try {
      const raw = localStorage.getItem(CUSTOM_ROADS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCustomOverrides() {
    try {
      const overrides = {};
      const customRoads = [];
      MAIN_ROADS.forEach(r => {
        if (r.isCustom) {
          customRoads.push({
            id: r.id,
            order: r.order,
            name: r.name,
            siName: r.siName,
            note: r.note,
            zone: r.zone,
            zoneLabel: r.zoneLabel,
            color: r.color,
            totalCount: r.totalCount,
            startCoords: r.startCoords,
            pinCoords: r.pinCoords,
            startImage: r.startImage,
            startImageCaption: r.startImageCaption,
            segments: r.segments,
            isCustom: true
          });
        } else {
          overrides[r.id] = {
            segments: r.segments,
            order: r.order,
            totalCount: r.totalCount
          };
        }
      });
      localStorage.setItem(CUSTOM_ROADS_KEY, JSON.stringify({ overrides, customRoads }));
    } catch (e) {
      // ignore
    }
  }

  // Apply any saved custom road edits & custom drawn roads on load
  (function applySavedOverrides() {
    const saved = loadCustomOverrides();
    const overrides = saved.overrides || saved;
    MAIN_ROADS.forEach(r => {
      const ov = overrides && overrides[r.id];
      if (!ov) return;
      if (Array.isArray(ov)) {
        r.segments = ov;
      } else {
        if (Array.isArray(ov.segments) && ov.segments.length) r.segments = ov.segments;
        if (typeof ov.order === "number") r.order = ov.order;
        if (typeof ov.totalCount === "string") r.totalCount = ov.totalCount;
      }
      r.lengthM = polylineLengthM(r.segments);
    });
    if (Array.isArray(saved.customRoads)) {
      saved.customRoads.forEach(cr => {
        cr.distFromMeetingM = Math.round(haversineM(MEETING_PLACE.coords, cr.startCoords));
        cr.walkMin = Math.max(1, Math.round(cr.distFromMeetingM / 78));
        cr.lengthM = polylineLengthM(cr.segments);
        MAIN_ROADS.push(cr);
      });
    }
    MAIN_ROADS.sort((a, b) => a.order - b.order);
  })();

  function notifyHost(msg) {
    if (typeof global.showToast === "function") {
      global.showToast(msg);
    }
  }

  // Photo Lightbox Modal (matching Friday)
  function ensurePhotoModal() {
    let modal = document.getElementById("sat-photo-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "sat-photo-modal";
    modal.className = "fixed inset-0 z-[9999] hidden bg-slate-950/85 backdrop-blur-sm items-center justify-center p-4";
    modal.setAttribute("onclick", "window.SaturdayTerritoryMaps.closePhotoModal()");
    modal.innerHTML = `
      <div onclick="event.stopPropagation()" class="relative max-w-2xl w-full rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        <div class="p-4 bg-slate-900 text-white flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div id="sat-pm-badge" class="text-[10px] font-black uppercase tracking-wider text-amber-300"></div>
            <h4 id="sat-pm-title" class="text-sm sm:text-base font-black truncate"></h4>
            <p id="sat-pm-sub" class="text-[11px] text-slate-300 truncate"></p>
          </div>
          <button type="button" onclick="window.SaturdayTerritoryMaps.closePhotoModal()"
            class="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white font-black flex items-center justify-center shrink-0">
            ✕
          </button>
        </div>
        <div class="bg-slate-950 flex items-center justify-center max-h-[65vh] overflow-hidden">
          <img id="sat-pm-img" src="" alt="" class="w-full h-auto max-h-[65vh] object-contain" />
        </div>
        <div class="p-4 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p id="sat-pm-cap" class="text-xs font-semibold text-slate-700"></p>
          <div class="flex items-center gap-2 shrink-0">
            <a id="sat-pm-sv" href="#" target="_blank" rel="noopener"
              class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
              Street View ↗
            </a>
            <a id="sat-pm-go" href="#" target="_blank" rel="noopener"
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
    document.getElementById("sat-pm-badge").textContent = badgeText || "Starting Point";
    document.getElementById("sat-pm-title").textContent = title;
    document.getElementById("sat-pm-sub").textContent = sub;
    document.getElementById("sat-pm-img").src = imgSrc;
    document.getElementById("sat-pm-cap").textContent = caption;
    document.getElementById("sat-pm-sv").href = getStreetViewUrl(coords);
    document.getElementById("sat-pm-go").href = getWalkNavUrl(coords);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closePhotoModal() {
    const modal = document.getElementById("sat-photo-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  function getVisibleRoads() {
    return MAIN_ROADS.filter(r => {
      if (activeFilter === "pending") return !doneState[r.id];
      if (activeFilter !== "all") return r.zone === activeFilter;
      return true;
    });
  }

  // Friday-style photo thumbnail pin on map
  function createRoadPhotoPinIcon(road, isSelected, isDone) {
    const borderCol = isDone ? "#10B981" : road.color;
    const scale = isSelected ? "transform:scale(1.16);" : "";
    const ring = isSelected ? "box-shadow:0 0 0 3px #0f172a, 0 6px 14px rgba(0,0,0,0.42);" : "box-shadow:0 3px 10px rgba(0,0,0,0.34);";
    const badge = isDone ? "✓" : String(road.order);
    return L.divIcon({
      className: "sat-photo-pin-icon",
      html: `
        <div style="position:relative;width:48px;height:34px;border-radius:10px;border:2.5px solid ${borderCol};background:#fff;overflow:hidden;${ring}${scale}">
          <img src="${escapeHtml(road.startImage)}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" />
          <span style="position:absolute;top:1px;left:1px;min-width:16px;height:16px;padding:0 3px;border-radius:5px;background:${borderCol};color:#fff;font-weight:900;font-size:10px;display:flex;align-items:center;justify-content:center;line-height:1;">
            ${badge}
          </span>
          <span style="position:absolute;bottom:1px;right:1px;padding:0 4px;border-radius:4px;background:rgba(15,23,42,0.85);color:#fef08a;font-weight:900;font-size:9px;line-height:1.3;">
            ${escapeHtml(road.totalCount)}
          </span>
        </div>
      `,
      iconSize: [48, 34],
      iconAnchor: [24, 17]
    });
  }

  function createMeetingIcon() {
    return L.divIcon({
      className: "sat-meeting-icon",
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
    const txtEl = document.getElementById("sat-progress-combined");
    const barEl = document.getElementById("sat-progress-bar-combined");
    if (txtEl) txtEl.textContent = `✓ සම්පූර්ණයි: ${doneCount} / ${total}`;
    if (barEl) barEl.style.width = `${pct}%`;
  }

  function updateFilterButtons() {
    const keys = ["all", "wp0980", "wp0982", "wp0983", "wp0879", "pending"];
    keys.forEach(k => {
      const btn = document.getElementById(`sat-flt-${k}`);
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
          opacity: isSel ? 1 : isVisible ? 0.9 : 0.2
        });
        if (isSel) line.bringToFront();
      });

      entry.marker.setIcon(createRoadPhotoPinIcon(road, isSel, isDone));
      entry.marker.setOpacity(isVisible ? 1 : 0.25);
      entry.marker.setZIndexOffset(isSel ? 900 : isVisible ? 250 + road.order : 10);
    });
  }

  function renderMainRoadsList() {
    const listHost = document.getElementById("sat-roads-list");
    if (!listHost) return;
    const roads = getVisibleRoads();

    if (!roads.length) {
      listHost.innerHTML = `
        <div class="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-500">
          මෙම filter එක යටතේ ස්ථාන නොමැත.
        </div>
      `;
      return;
    }

    listHost.innerHTML = roads.map(road => {
      const isDone = !!doneState[road.id];
      const isSel = selectedRoadId === road.id;

      const subImgHtml = (road.subItems && road.subItems.length) ? `
        <div class="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-2">
          ${road.subItems.map(sub => `
            <button type="button"
              onclick="event.stopPropagation(); window.SaturdayTerritoryMaps.openSubPhoto('${road.id}', '${sub.id}')"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[11px] font-bold text-amber-950 transition">
              <span>📸 ${escapeHtml(sub.siLabel)}</span>
              <span class="px-1.5 rounded-full bg-amber-200 text-[10px] font-black">${escapeHtml(sub.count)}</span>
            </button>
          `).join("")}
        </div>
      ` : "";

      return `
        <div id="sat-road-row-${road.id}"
          onclick="window.SaturdayTerritoryMaps.focusMainRoad('${road.id}')"
          class="cursor-pointer rounded-2xl border-2 p-3 sm:p-4 transition-all ${
            isSel
              ? "bg-slate-50/90 shadow-md"
              : isDone
                ? "bg-emerald-50/35 border-emerald-200/90 opacity-90 hover:opacity-100"
                : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
          }"
          style="${isSel ? `border-color:${road.color};` : ""}">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <!-- Left: Start-Point Photo Thumbnail + Dispatch Details -->
            <div class="flex items-start gap-3 min-w-0 flex-1">
              <div onclick="event.stopPropagation(); window.SaturdayTerritoryMaps.openMainPhoto('${road.id}')"
                title="ආරම්භක ස්ථානයේ ඡායාරූපය විශාල කර බලන්න"
                class="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 bg-slate-900 group shadow-xs"
                style="border-color:${isDone ? "#10B981" : road.color}">
                <img src="${escapeHtml(road.startImage)}" alt="${escapeHtml(road.name)}"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span class="absolute top-1 left-1 min-w-[20px] h-5 px-1 rounded-md text-white font-black text-[11px] flex items-center justify-center shadow"
                  style="background:${isDone ? "#10B981" : road.color}">
                  ${isDone ? "✓" : road.order}
                </span>
                <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold backdrop-blur-xs">
                  📸 Start
                </span>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black text-white" style="background:${road.color}">
                    #${road.order}
                  </span>
                  <span class="font-black text-sm sm:text-base text-slate-900 ${isDone ? "line-through text-slate-500" : ""}">
                    ${escapeHtml(road.siName)}
                  </span>
                </div>
                <div class="text-xs font-bold text-slate-600 mt-0.5">${escapeHtml(road.name)}</div>

                <div class="flex flex-wrap items-center gap-1.5 mt-2">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-200 text-[10px] font-black">
                    👥 ප්‍රචාරකයන්: ${escapeHtml(road.totalCount)}
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-[10px] font-black">
                    🚶 නිවසේ සිට ${road.distFromMeetingM} m (${road.walkMin} min)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    📏 පාරේ දිග ~${road.lengthM} m
                  </span>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black font-mono bg-slate-100 text-slate-700">
                    ${escapeHtml(road.zoneLabel)}
                  </span>
                </div>
                ${subImgHtml}
              </div>
            </div>

            <!-- Right: Quick Actions -->
            <div class="flex items-center gap-1.5 shrink-0 justify-end" onclick="event.stopPropagation()">
              <button type="button"
                onclick="window.SaturdayTerritoryMaps.openMainPhoto('${road.id}')"
                class="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold transition whitespace-nowrap">
                📸 Photo
              </button>
              <a href="${getWalkNavUrl(road.startCoords)}" target="_blank" rel="noopener"
                class="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-[11px] font-bold transition whitespace-nowrap">
                Go ↗
              </a>
              <button type="button"
                onclick="window.SaturdayTerritoryMaps.toggleDone('${road.id}')"
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
    const mapEl = document.getElementById("sat-leaflet-map-combined");
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

    // Smooth outer round around the entire Saturday service area
    L.polygon(OUTER_ROUND, {
      color: "#0f172a",
      weight: 3,
      dashArray: "10 6",
      opacity: 0.5,
      fillColor: "#fef3c7",
      fillOpacity: 0.08,
      smoothFactor: 2.5,
      interactive: false
    }).addTo(map);
    OUTER_ROUND.forEach(c => allBounds.extend(c));

    Object.keys(ZONES).forEach(zKey => {
      const z = ZONES[zKey];
      const poly = L.polygon(z.boundary, { weight: 0, opacity: 0, fillOpacity: 0 }).addTo(map);
      zonePolys[zKey] = poly;
      z.boundary.forEach(c => allBounds.extend(c));
    });

    const meetingMarker = L.marker(MEETING_PLACE.coords, {
      icon: createMeetingIcon(),
      zIndexOffset: 1000
    }).addTo(map);

    meetingMarker.bindPopup(`
      <div style="min-width:220px;font-family:sans-serif;">
        <div onclick="window.SaturdayTerritoryMaps.openMeetingPhoto()" style="position:relative;border-radius:10px;overflow:hidden;border:1px solid #a7f3d0;margin-bottom:7px;cursor:pointer;">
          <img src="${escapeHtml(MEETING_PLACE.image)}" alt="" style="width:100%;height:105px;object-fit:cover;display:block;" />
          <span style="position:absolute;bottom:4px;right:4px;background:rgba(0,0,0,0.75);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px;">🔍 විශාල කර බලන්න</span>
        </div>
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
          opacity: 0.9,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        line.on("click", () => {
          global.SaturdayTerritoryMaps.focusMainRoad(road.id);
        });
        lines.push(line);
      });

      const popupHtml = `
        <div style="min-width:235px;font-family:sans-serif;">
          <div onclick="window.SaturdayTerritoryMaps.openMainPhoto('${road.id}')" style="position:relative;border-radius:10px;overflow:hidden;border:1px solid #cbd5e1;margin-bottom:7px;cursor:pointer;">
            <img src="${escapeHtml(road.startImage)}" alt="" style="width:100%;height:110px;object-fit:cover;display:block;" />
            <span style="position:absolute;top:5px;left:5px;background:${road.color};color:#fff;border-radius:6px;padding:1px 7px;font-weight:900;font-size:11px;">#${road.order}</span>
            <span style="position:absolute;bottom:4px;right:4px;background:rgba(0,0,0,0.75);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px;">🔍 විශාල කර බලන්න</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span style="background:#fef3c7;color:#92400e;border-radius:999px;padding:1px 7px;font-weight:900;font-size:11px;">👥 ${escapeHtml(road.totalCount)}</span>
            <span style="font-size:10px;font-weight:800;color:#475569;">${escapeHtml(road.zoneLabel)}</span>
          </div>
          <div style="font-weight:900;font-size:13px;color:#0f172a;line-height:1.3;">${escapeHtml(road.name)}</div>
          <div style="font-size:11px;font-weight:700;color:#334155;margin:2px 0 4px;">${escapeHtml(road.siName)}</div>
          <div style="font-size:11px;color:#64748b;margin-bottom:8px;">📝 ${escapeHtml(road.note)}</div>
          <div style="display:flex;gap:6px;">
            <a href="${getWalkNavUrl(road.startCoords)}" target="_blank" rel="noopener"
              style="flex:1;text-align:center;padding:5px 8px;border-radius:8px;background:#0f172a;color:#fff;font-size:11px;font-weight:700;text-decoration:none;">
              Walk from Sisira's ↗
            </a>
            <a href="${getStreetViewUrl(road.startCoords)}" target="_blank" rel="noopener"
              style="padding:5px 8px;border-radius:8px;background:#2563eb;color:#fff;font-size:11px;font-weight:700;text-decoration:none;">
              Street View ↗
            </a>
          </div>
        </div>
      `;

      const marker = L.marker(road.pinCoords, {
        icon: createRoadPhotoPinIcon(road, false, !!doneState[road.id]),
        zIndexOffset: 250 + road.order
      }).addTo(map);

      marker.bindTooltip(`#${road.order} ${road.name.split("(")[0].trim()} (${road.totalCount})`, {
        permanent: showMapLabels,
        direction: "right",
        offset: [14, 0],
        className: "sat-point-label"
      });
      marker.bindPopup(popupHtml, { autoPanPaddingTopLeft: [20, 72], autoPanPaddingBottomRight: [20, 20] });
      marker.on("click", () => {
        selectedRoadId = road.id;
        refreshMapVisuals();
        renderMainRoadsList();
      });

      roads[road.id] = { lines, marker, bounds: roadBounds };
    });

    map.fitBounds(allBounds, { padding: [26, 26] });

    map.on("click", e => {
      if (!editMode || !editRoadId) return;
      const road = MAIN_ROADS.find(r => r.id === editRoadId);
      if (!road) return;
      if (!road.segments.length) road.segments.push([]);
      const pt = [
        Number(e.latlng.lat.toFixed(6)),
        Number(e.latlng.lng.toFixed(6))
      ];
      road.segments[0].push(pt);
      if (road.isCustom && road.segments[0].length === 1) {
        road.startCoords = pt;
        road.pinCoords = pt;
        road.distFromMeetingM = Math.round(haversineM(MEETING_PLACE.coords, pt));
        road.walkMin = Math.max(1, Math.round(road.distFromMeetingM / 78));
        const entry = mapState.roads[road.id];
        if (entry && entry.marker) {
          entry.marker.setLatLng(pt);
          entry.marker.setOpacity(1);
        }
      }
      syncEditedRoad(road);
    });

    mapState = {
      map,
      streetsLayer,
      satLayer,
      isSat: false,
      zonePolys,
      roads,
      allBounds
    };
  }

  function clearEditHandles() {
    if (mapState && mapState.map) {
      editHandles.forEach(h => mapState.map.removeLayer(h));
    }
    editHandles = [];
  }

  function updateEditLengthBadge(road) {
    const badge = document.getElementById("sat-edit-length-badge");
    if (badge && road) {
      badge.textContent = `📏 දිග: ~${road.lengthM} m (${road.segments[0].length} pts)`;
    }
  }

  function syncEditedRoad(road) {
    if (!mapState || !road) return;
    road.lengthM = polylineLengthM(road.segments);
    const entry = mapState.roads[road.id];
    if (entry && entry.lines[0]) {
      entry.lines[0].setLatLngs(road.segments[0]);
    }
    updateEditLengthBadge(road);
    renderEditHandles(road);
    renderMainRoadsList();
  }

  function renderEditHandles(road) {
    clearEditHandles();
    if (!editMode || !mapState || !road || !road.segments[0]) return;
    const L = global.L;
    const pts = road.segments[0];
    pts.forEach((pt, idx) => {
      const isEnd = idx === 0 || idx === pts.length - 1;
      const handle = L.marker(pt, {
        draggable: true,
        zIndexOffset: 1200,
        icon: L.divIcon({
          className: "sat-edit-handle",
          html: `<div style="width:${isEnd ? 14 : 11}px;height:${isEnd ? 14 : 11}px;border-radius:999px;background:${isEnd ? '#ef4444' : '#ffffff'};border:2.5px solid #0f172a;box-shadow:0 2px 6px rgba(0,0,0,0.4);cursor:move;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        })
      }).addTo(mapState.map);

      handle.on("drag", ev => {
        const ll = ev.target.getLatLng();
        pts[idx] = [Number(ll.lat.toFixed(6)), Number(ll.lng.toFixed(6))];
        const entry = mapState.roads[road.id];
        if (entry && entry.lines[0]) {
          entry.lines[0].setLatLngs(pts);
        }
        road.lengthM = polylineLengthM(road.segments);
        updateEditLengthBadge(road);
      });

      handle.on("dragend", () => {
        renderMainRoadsList();
      });

      handle.on("contextmenu", () => {
        if (pts.length <= 2) {
          notifyHost("අවම වශයෙන් ලක්ෂ්‍ය 2ක් තිබිය යුතුය!");
          return;
        }
        pts.splice(idx, 1);
        syncEditedRoad(road);
      });

      editHandles.push(handle);
    });
  }

  function renderInto(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;

    const total = MAIN_ROADS.length;
    const totalLengthM = MAIN_ROADS.reduce((s, r) => s + r.lengthM, 0);
    const totalKm = (totalLengthM / 1000).toFixed(2);
    const first = MAIN_ROADS[0];

    host.innerHTML = `
      <div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
            🧭 Saturday Morning Unified Road Map (One Map)
          </span>
          <h3 class="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
            WP - 0980, WP - 0982, WP - 0983 & WP - 0879 — සේවයේ යවන පිළිවෙල අනුව (1–${total})
          </h3>
          <p class="text-xs text-slate-600 mt-0.5">
            🏠 ආරම්භක ස්ථානය: <strong>සහෝ. සිසිරගේ නිවස</strong> · සේවයේ යවන ස්ථාන ${total} · ආරම්භක ඡායාරූප සමඟ
          </p>
        </div>
      </div>

      <article id="sat-territory-card-combined" class="scroll-mt-24 rounded-3xl bg-white border-2 border-amber-200/90 shadow-glass overflow-hidden flex flex-col">
        <!-- Unified Card Header -->
        <div class="p-4 sm:p-5 bg-gradient-to-r from-amber-50/90 via-slate-50 to-blue-50/90 border-b border-slate-200 flex flex-col gap-3">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="space-y-1 min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="px-2.5 py-1 rounded-xl bg-blue-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0980</span>
                <span class="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0982</span>
                <span class="px-2.5 py-1 rounded-xl bg-violet-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0983</span>
                <span class="px-2.5 py-1 rounded-xl bg-amber-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0879</span>
                <span class="px-2.5 py-0.5 rounded-full border border-slate-300 bg-white text-slate-700 text-[11px] font-extrabold">
                  🛣️ ස්ථාන ${total} · ~${totalKm} km · 📸 Start Photos
                </span>
              </div>
              <h4 class="text-base sm:text-lg font-black text-slate-900 leading-snug pt-0.5">
                ඒකාබද්ධ සේවා සිතියම — සේවයේ යවන පිළිවෙල (1–${total})
              </h4>
              <p class="text-[11px] sm:text-xs text-slate-600 font-medium">
                Sisira Home → Negombo Rd → Uda Y → Bible College → Kings Dr → Kalawari & Kapala Kanda → Walawwatta → Jayalath Mw → Weligampitiya Jct → St. Rita → St. Clare → Church Rd → Isuru Uyana
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-1.5 shrink-0">
              <button type="button" onclick="window.SaturdayTerritoryMaps.toggleGroupPlan()"
                class="px-2.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-2xs transition">
                👥 Group Plan (10)
              </button>
              <button type="button" onclick="window.SaturdayTerritoryMaps.copyAll()"
                class="px-2.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs transition">
                📋 Copy
              </button>
              <button type="button" onclick="window.SaturdayTerritoryMaps.shareAll()"
                class="px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition">
                WhatsApp
              </button>
            </div>
          </div>

          <div class="pt-2.5 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="text-[11px] font-bold text-slate-700">
              📍 පළමු ස්ථානය (#1): <span class="text-slate-900 font-black">${escapeHtml(first.siName)}</span> (👥 ${first.totalCount})
            </div>
            <div class="flex items-center gap-2 min-w-[180px]">
              <span id="sat-progress-combined" class="text-[11px] font-black text-emerald-700 whitespace-nowrap">✓ සම්පූර්ණයි: 0 / ${total}</span>
              <div class="flex-1 h-2 rounded-full bg-white/90 border border-slate-200 overflow-hidden min-w-[70px]">
                <div id="sat-progress-bar-combined" class="h-full bg-emerald-500 transition-all duration-300" style="width: 0%"></div>
              </div>
            </div>
          </div>

          <!-- Simple 3-Step Guide for Anyone -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <div class="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">1</span>
              <span>ඔබේ ස්ථාන අංකය (<strong>1–${total}</strong>) බලන්න</span>
            </div>
            <div class="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
              <span><strong>📸 Photo</strong> ඔබා ආරම්භක තැන බලන්න</span>
            </div>
            <div class="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">3</span>
              <span><strong>Go ↗</strong> ඔබා Google Maps මගින් යන්න</span>
            </div>
          </div>

          <!-- Group Dispatch Plan Panel (Toggleable, Open by default so anyone understands how groups split) -->
          <div id="sat-group-plan-panel" class="mt-1 p-3 rounded-2xl bg-white/95 border border-amber-200 shadow-xs">
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="text-xs font-black text-slate-900">
                👥 සේවයේ කණ්ඩායම් බෙදීම — කවුරුත් පැටලෙන්නේ නැතුව යන පිළිවෙල (Click කර Map එකේ බලන්න)
              </div>
              <button type="button" onclick="window.SaturdayTerritoryMaps.toggleGroupPlan()"
                class="text-[11px] font-bold text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded-lg bg-slate-100">
                Hide ✕
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              ${GROUP_PLAN.map(g => `
                <button type="button" onclick="window.SaturdayTerritoryMaps.focusMainRoad('${g.roadId}')"
                  class="text-left p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-amber-50/50 transition flex items-start gap-2.5">
                  <span class="px-2 py-0.5 rounded-lg text-white text-[10px] font-black shrink-0 mt-0.5" style="background:${g.color}">
                    ${escapeHtml(g.group)}
                  </span>
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-1.5">
                      <span class="text-xs font-black text-slate-900">${escapeHtml(g.title)}</span>
                      <span class="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">${escapeHtml(g.count)}</span>
                    </div>
                    <div class="text-[11px] text-slate-600 mt-0.5 leading-snug">${escapeHtml(g.detail)}</div>
                  </div>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Single Unified Interactive Map -->
        <div id="sat-map-wrapper-combined" class="relative isolate z-0 bg-slate-100 border-b border-slate-200 overflow-hidden flex flex-col">
          <div id="sat-leaflet-map-combined" class="w-full h-[400px] sm:h-[490px] z-10"></div>

          <!-- Floating Map Controls -->
          <div class="absolute top-2.5 right-2.5 z-[400] flex flex-wrap items-center justify-end gap-1.5 max-w-[85%]">
            <button type="button" onclick="window.SaturdayTerritoryMaps.startNewRoadFromMap()"
              class="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 text-[11px] font-extrabold shadow-md transition">
              ➕ New Road
            </button>
            <button type="button" id="sat-edit-mode-btn" onclick="window.SaturdayTerritoryMaps.toggleEditMode()"
              class="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white border border-amber-600 text-[11px] font-extrabold shadow-md transition">
              ✏️ Draw / Edit
            </button>
            <button type="button" id="sat-labels-btn" onclick="window.SaturdayTerritoryMaps.toggleLabels()"
              class="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white border border-slate-700 text-[11px] font-extrabold shadow-md backdrop-blur-xs transition">
              🏷️ Labels: ON
            </button>
            <button type="button" id="sat-layer-btn-combined" onclick="window.SaturdayTerritoryMaps.toggleLayer()"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md backdrop-blur-xs transition">
              🛰️ Satellite
            </button>
            <button type="button" id="sat-fullscreen-btn" onclick="window.SaturdayTerritoryMaps.toggleFullScreen()"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md backdrop-blur-xs transition">
              ⛶ Fullscreen
            </button>
            <button type="button" onclick="window.SaturdayTerritoryMaps.fitZone('all')"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md backdrop-blur-xs transition">
              🎯 Fit All
            </button>
            <button type="button" onclick="window.SaturdayTerritoryMaps.fitZone('wp0980')"
              class="px-2 py-1.5 rounded-xl bg-blue-600/95 hover:bg-blue-700 text-white text-[11px] font-extrabold shadow-md transition">
              0980
            </button>
            <button type="button" onclick="window.SaturdayTerritoryMaps.fitZone('wp0982')"
              class="px-2 py-1.5 rounded-xl bg-emerald-600/95 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-md transition">
              0982
            </button>
            <button type="button" onclick="window.SaturdayTerritoryMaps.fitZone('wp0983')"
              class="px-2 py-1.5 rounded-xl bg-violet-600/95 hover:bg-violet-700 text-white text-[11px] font-extrabold shadow-md transition">
              0983
            </button>
            <button type="button" onclick="window.SaturdayTerritoryMaps.fitZone('wp0879')"
              class="px-2 py-1.5 rounded-xl bg-amber-600/95 hover:bg-amber-700 text-white text-[11px] font-extrabold shadow-md transition">
              0879
            </button>
          </div>

          <!-- On-Map Quick Legend (Collapsed by default) -->
          <div class="absolute bottom-11 left-2.5 z-[400] max-w-[260px] sm:max-w-[300px]">
            <button type="button" id="sat-legend-toggle-btn" onclick="window.SaturdayTerritoryMaps.toggleLegend()"
              class="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-extrabold shadow-lg backdrop-blur-xs transition flex items-center gap-1.5">
              <span>🗺️ Dispatch Order (1–${total})</span>
              <span id="sat-legend-arrow" class="text-amber-300">▸</span>
            </button>
            <div id="sat-map-legend-box" class="hidden mt-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl p-2.5 max-h-[210px] overflow-y-auto">
              <div class="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                සේවයේ යවන පිළිවෙල (Click to View)
              </div>
              <div class="flex flex-col gap-1">
                ${MAIN_ROADS.map(r => `
                  <button type="button" onclick="window.SaturdayTerritoryMaps.focusMainRoad('${r.id}')"
                    class="w-full text-left px-2 py-1 rounded-lg hover:bg-slate-100 flex items-center gap-1.5 transition">
                    <span class="w-4 h-4 rounded-md text-white font-black text-[9px] flex items-center justify-center shrink-0" style="background:${r.color}">${r.order}</span>
                    <span class="text-[10px] font-bold text-slate-800 truncate flex-1">${escapeHtml(r.name)}</span>
                    <span class="text-[9px] font-black text-amber-800 bg-amber-100 px-1.5 rounded-full shrink-0">${escapeHtml(r.totalCount)}</span>
                  </button>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- Road Drawing & Length Editor Bar (Visible when Draw / Edit is ON) -->
          <div id="sat-editor-bar" class="hidden px-3 py-2.5 bg-amber-50 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-black text-amber-950">✏️ Edit:</span>
              <select id="sat-edit-road-select" onchange="window.SaturdayTerritoryMaps.selectEditRoad(this.value)"
                class="px-2 py-1 rounded-lg border border-amber-300 bg-white text-xs font-bold text-slate-800 max-w-[165px]">
                ${MAIN_ROADS.map(r => `<option value="${r.id}">#${r.order} · ${escapeHtml(r.name)}</option>`).join("")}
              </select>
              <input id="sat-edit-name-input" type="text" placeholder="Road name..."
                onchange="window.SaturdayTerritoryMaps.changeRoadName(this.value)"
                class="w-32 sm:w-40 px-2 py-1 rounded-lg border border-amber-300 bg-white text-xs font-bold text-slate-900" />
              <label class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700">
                <span>#</span>
                <input id="sat-edit-order-input" type="number" min="1" max="99"
                  onchange="window.SaturdayTerritoryMaps.changeRoadOrder(this.value)"
                  class="w-12 px-1.5 py-1 rounded-lg border border-amber-300 bg-white text-xs font-black text-center text-slate-900" />
              </label>
              <label class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700">
                <span>👥</span>
                <input id="sat-edit-count-input" type="text"
                  onchange="window.SaturdayTerritoryMaps.changeRoadCount(this.value)"
                  class="w-14 px-1.5 py-1 rounded-lg border border-amber-300 bg-white text-xs font-black text-center text-slate-900" />
              </label>
              <span id="sat-edit-length-badge" class="px-2 py-1 rounded-lg bg-white border border-amber-200 font-black text-[11px] text-slate-800">
                📏 දිග: ~0 m
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-1.5">
              <button type="button" onclick="window.SaturdayTerritoryMaps.addNewCustomRoad()"
                class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px]">
                ➕ New Road
              </button>
              <button type="button" onclick="window.SaturdayTerritoryMaps.undoEditPoint()"
                class="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 font-bold text-[11px] text-slate-800">
                ↩️ Undo
              </button>
              <button type="button" onclick="window.SaturdayTerritoryMaps.saveEditedRoads()"
                class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]">
                💾 Save
              </button>
              <button type="button" id="sat-edit-delete-btn" onclick="window.SaturdayTerritoryMaps.deleteCustomRoad()"
                class="hidden px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px]">
                🗑️ Delete
              </button>
              <button type="button" onclick="window.SaturdayTerritoryMaps.resetEditedRoad()"
                class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-[11px]">
                🔄 Reset
              </button>
              <button type="button" onclick="window.SaturdayTerritoryMaps.toggleEditMode()"
                class="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-[11px]">
                ✓ Done
              </button>
            </div>
          </div>

          <div class="px-3 py-2 bg-slate-900/95 text-white text-[10px] sm:text-[11px] font-semibold flex flex-wrap items-center justify-between gap-1.5">
            <span>🏠 කොළ සලකුණ = සහෝ. සිසිරගේ නිවස · 📸 1–${total} = ආරම්භක ඡායාරූප (යවන පිළිවෙල)</span>
            <span class="text-amber-200">පින් එකක් click කර ඡායාරූපය & මාර්ගය බලන්න</span>
          </div>
        </div>

        <!-- Dispatch List -->
        <div class="p-4 sm:p-5 flex flex-col gap-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h5 class="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
              <span>📋 සේවයේ යවන පිළිවෙල (1–${total})</span>
              <span class="text-[11px] font-semibold text-slate-500">— ආරම්භක ඡායාරූප සමඟ</span>
            </h5>
            <div class="flex flex-wrap items-center gap-1.5">
              <button type="button" id="sat-flt-all" onclick="window.SaturdayTerritoryMaps.setFilter('all')">All (${total})</button>
              <button type="button" id="sat-flt-wp0980" onclick="window.SaturdayTerritoryMaps.setFilter('wp0980')">0980</button>
              <button type="button" id="sat-flt-wp0982" onclick="window.SaturdayTerritoryMaps.setFilter('wp0982')">0982</button>
              <button type="button" id="sat-flt-wp0983" onclick="window.SaturdayTerritoryMaps.setFilter('wp0983')">0983</button>
              <button type="button" id="sat-flt-wp0879" onclick="window.SaturdayTerritoryMaps.setFilter('wp0879')">0879</button>
              <button type="button" id="sat-flt-pending" onclick="window.SaturdayTerritoryMaps.setFilter('pending')">Pending</button>
            </div>
          </div>

          <!-- Main Points Quick-Jump Strip (1–14) -->
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-[11px] font-black text-slate-700 mb-2">
              📍 Main Points (1–${total}) — ස්ථානයක් click කර Map එකේ බලන්න:
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${MAIN_ROADS.map(r => `
                <button type="button" onclick="window.SaturdayTerritoryMaps.focusMainRoad('${r.id}')"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-800 shadow-2xs transition">
                  <span class="w-4 h-4 rounded-md text-white font-black text-[9px] flex items-center justify-center shrink-0" style="background:${r.color}">${r.order}</span>
                  <span>${escapeHtml(r.name.split("(")[0].trim())}</span>
                  <span class="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 rounded-full">${escapeHtml(r.totalCount)}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <div id="sat-roads-list" class="flex flex-col gap-2.5"></div>
        </div>
      </article>
    `;

    initMap();
    updateProgressUI();
    updateFilterButtons();
    renderMainRoadsList();
  }

  global.SaturdayTerritoryMaps = {
    ZONES,
    MAIN_ROADS,
    MEETING_PLACE,
    renderInto,
    toggleLayer() {
      if (!mapState) return;
      const btn = document.getElementById("sat-layer-btn-combined");
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
    toggleFullScreen() {
      const wrapper = document.getElementById("sat-map-wrapper-combined") || document.getElementById("sat-leaflet-map-combined");
      if (!wrapper) return;
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      const isPseudoFs = wrapper.classList.contains("fixed");
      if (!fsEl && !isPseudoFs) {
        const req = wrapper.requestFullscreen || wrapper.webkitRequestFullscreen;
        if (req) {
          Promise.resolve(req.call(wrapper)).catch(() => {
            wrapper.classList.add("fixed", "inset-0", "z-[9999]", "bg-slate-100");
            handleSatFullscreenChange();
          });
        } else {
          wrapper.classList.add("fixed", "inset-0", "z-[9999]", "bg-slate-100");
          handleSatFullscreenChange();
        }
      } else {
        if (isPseudoFs) {
          wrapper.classList.remove("fixed", "inset-0", "z-[9999]", "bg-slate-100");
          handleSatFullscreenChange();
        } else {
          const exit = document.exitFullscreen || document.webkitExitFullscreen;
          if (exit) Promise.resolve(exit.call(document)).catch(() => {});
        }
      }
    },
    toggleLegend() {
      const box = document.getElementById("sat-map-legend-box");
      const arrow = document.getElementById("sat-legend-arrow");
      if (!box) return;
      const isHidden = box.classList.toggle("hidden");
      if (arrow) arrow.textContent = isHidden ? "▸" : "▾";
    },
    toggleGroupPlan() {
      const panel = document.getElementById("sat-group-plan-panel");
      if (panel) panel.classList.toggle("hidden");
    },
    toggleLabels() {
      showMapLabels = !showMapLabels;
      const btn = document.getElementById("sat-labels-btn");
      if (btn) btn.textContent = showMapLabels ? "🏷️ Labels: ON" : "🏷️ Labels: OFF";
      if (!mapState) return;
      MAIN_ROADS.forEach(road => {
        const entry = mapState.roads[road.id];
        if (!entry || !entry.marker) return;
        if (showMapLabels) {
          entry.marker.openTooltip();
        } else {
          entry.marker.closeTooltip();
        }
      });
    },
    toggleEditMode() {
      editMode = !editMode;
      const bar = document.getElementById("sat-editor-bar");
      const btn = document.getElementById("sat-edit-mode-btn");
      if (bar) bar.classList.toggle("hidden", !editMode);
      if (btn) {
        btn.textContent = editMode ? "✓ Editing..." : "✏️ Draw / Edit";
        btn.className = editMode
          ? "px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 text-[11px] font-extrabold shadow-md transition"
          : "px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white border border-amber-600 text-[11px] font-extrabold shadow-md transition";
      }
      if (editMode) {
        const mapEl = document.getElementById("sat-leaflet-map-combined");
        if (mapEl) mapEl.style.cursor = "crosshair";
        const targetId = selectedRoadId || MAIN_ROADS[0].id;
        this.selectEditRoad(targetId);
      } else {
        const mapEl = document.getElementById("sat-leaflet-map-combined");
        if (mapEl) mapEl.style.cursor = "";
        clearEditHandles();
      }
    },
    selectEditRoad(roadId) {
      editRoadId = roadId;
      selectedRoadId = roadId;
      const sel = document.getElementById("sat-edit-road-select");
      if (sel) sel.value = roadId;
      const road = MAIN_ROADS.find(r => r.id === roadId);
      if (!road) return;
      const nameInput = document.getElementById("sat-edit-name-input");
      const ordInput = document.getElementById("sat-edit-order-input");
      const cntInput = document.getElementById("sat-edit-count-input");
      const delBtn = document.getElementById("sat-edit-delete-btn");
      if (nameInput) nameInput.value = road.name;
      if (ordInput) ordInput.value = road.order;
      if (cntInput) cntInput.value = road.totalCount;
      if (delBtn) delBtn.classList.toggle("hidden", !road.isCustom);
      refreshMapVisuals();
      renderMainRoadsList();
      updateEditLengthBadge(road);
      renderEditHandles(road);
      if (mapState && mapState.roads[roadId] && road.segments[0] && road.segments[0].length >= 2) {
        mapState.map.fitBounds(mapState.roads[roadId].bounds, { padding: [50, 50], maxZoom: 18 });
      }
    },
    startNewRoadFromMap() {
      if (!editMode) {
        editMode = true;
        const bar = document.getElementById("sat-editor-bar");
        const btn = document.getElementById("sat-edit-mode-btn");
        if (bar) bar.classList.remove("hidden");
        if (btn) {
          btn.textContent = "✓ Editing...";
          btn.className = "px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 text-[11px] font-extrabold shadow-md transition";
        }
      }
      this.addNewCustomRoad();
    },
    changeRoadName(newName) {
      const road = MAIN_ROADS.find(r => r.id === editRoadId);
      if (!road || !String(newName).trim()) return;
      road.name = String(newName).trim();
      road.siName = road.name;
      saveCustomOverrides();
      this.refreshAfterOrderOrCountChange(road);
    },
    changeRoadOrder(newOrder) {
      const road = MAIN_ROADS.find(r => r.id === editRoadId);
      const parsed = parseInt(newOrder, 10);
      if (!road || isNaN(parsed) || parsed < 1) return;
      road.order = parsed;
      MAIN_ROADS.sort((a, b) => a.order - b.order);
      saveCustomOverrides();
      this.refreshAfterOrderOrCountChange(road);
    },
    changeRoadCount(newCount) {
      const road = MAIN_ROADS.find(r => r.id === editRoadId);
      if (!road) return;
      road.totalCount = String(newCount || "4").trim();
      saveCustomOverrides();
      this.refreshAfterOrderOrCountChange(road);
    },
    refreshAfterOrderOrCountChange(road) {
      const sel = document.getElementById("sat-edit-road-select");
      if (sel) {
        sel.innerHTML = MAIN_ROADS.map(r => `<option value="${r.id}">#${r.order} · ${escapeHtml(r.name)}</option>`).join("");
        sel.value = road.id;
      }
      if (mapState && mapState.roads[road.id] && mapState.roads[road.id].marker) {
        const m = mapState.roads[road.id].marker;
        m.setTooltipContent(`#${road.order} ${road.name.split("(")[0].trim()} (${road.totalCount})`);
      }
      refreshMapVisuals();
      renderMainRoadsList();
      notifyHost(`#${road.order} · 👥 ${road.totalCount} update කළා!`);
    },
    addNewCustomRoad() {
      if (!mapState) return;
      const nextOrder = MAIN_ROADS.reduce((mx, r) => Math.max(mx, r.order), 0) + 1;
      const defaultName = `New Road #${nextOrder}`;
      const newId = `sat-custom-${Date.now()}`;
      const colors = ["#E11D48", "#2563EB", "#059669", "#7C3AED", "#D97706", "#0D9488"];
      const color = colors[MAIN_ROADS.length % colors.length];
      const center = mapState.map.getCenter();
      const cPt = [Number(center.lat.toFixed(6)), Number(center.lng.toFixed(6))];
      const newRoad = {
        id: newId,
        order: nextOrder,
        name: defaultName,
        siName: defaultName,
        note: "Custom drawn road (click map to draw)",
        zone: "wp0980",
        zoneLabel: "Custom",
        color,
        totalCount: "4",
        startCoords: cPt,
        pinCoords: cPt,
        startImage: "assets/sisira_location.jpg",
        startImageCaption: defaultName,
        segments: [[]],
        isCustom: true,
        distFromMeetingM: 0,
        walkMin: 1,
        lengthM: 0
      };
      MAIN_ROADS.push(newRoad);

      const L = global.L;
      const line = L.polyline([], {
        color,
        weight: 5,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(mapState.map);
      line.on("click", () => this.focusMainRoad(newId));

      const marker = L.marker(cPt, {
        icon: createRoadPhotoPinIcon(newRoad, true, false),
        opacity: 0,
        zIndexOffset: 250 + newRoad.order
      }).addTo(mapState.map);
      marker.bindTooltip(`#${newRoad.order} ${newRoad.name} (${newRoad.totalCount})`, {
        permanent: showMapLabels,
        direction: "right",
        offset: [14, 0],
        className: "sat-point-label"
      });
      marker.on("click", () => {
        selectedRoadId = newId;
        refreshMapVisuals();
        renderMainRoadsList();
      });

      mapState.roads[newId] = { lines: [line], marker, bounds: L.latLngBounds([cPt]) };
      const mapEl = document.getElementById("sat-leaflet-map-combined");
      if (mapEl) mapEl.style.cursor = "crosshair";

      saveCustomOverrides();
      this.refreshAfterOrderOrCountChange(newRoad);
      this.selectEditRoad(newId);
      notifyHost("Map එක click කරලා අලුත් පාර අඳින්න! (1st click = Start)");
    },
    deleteCustomRoad() {
      const idx = MAIN_ROADS.findIndex(r => r.id === editRoadId);
      if (idx === -1 || !MAIN_ROADS[idx].isCustom) return;
      const road = MAIN_ROADS[idx];
      if (mapState && mapState.roads[road.id]) {
        mapState.roads[road.id].lines.forEach(l => mapState.map.removeLayer(l));
        mapState.map.removeLayer(mapState.roads[road.id].marker);
        delete mapState.roads[road.id];
      }
      MAIN_ROADS.splice(idx, 1);
      saveCustomOverrides();
      clearEditHandles();
      const fallback = MAIN_ROADS[0];
      if (fallback) this.selectEditRoad(fallback.id);
      renderMainRoadsList();
      notifyHost("Custom පාර මකා දැමුවා!");
    },
    undoEditPoint() {
      const road = MAIN_ROADS.find(r => r.id === editRoadId);
      if (!road || !road.segments[0]) return;
      if (road.segments[0].length <= 2) {
        notifyHost("අවම වශයෙන් ලක්ෂ්‍ය 2ක් තිබිය යුතුය!");
        return;
      }
      road.segments[0].pop();
      syncEditedRoad(road);
    },
    saveEditedRoads() {
      saveCustomOverrides();
      notifyHost("පාරේ වෙනස්කම් Save කළා!");
    },
    resetEditedRoad() {
      const road = MAIN_ROADS.find(r => r.id === editRoadId);
      const raw = RAW_ROADS.find(r => r.id === editRoadId);
      if (!road || !raw) return;
      road.segments = raw.segments.map(seg => seg.map(pt => [pt[0], pt[1]]));
      syncEditedRoad(road);
      saveCustomOverrides();
      notifyHost("මුල් පාරට Reset කළා!");
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
      const entry = mapState.roads[roadId];
      mapState.map.fitBounds(entry.bounds, { padding: [45, 45], maxZoom: 17 });
      setTimeout(() => entry.marker.openPopup(), 120);
    },
    openMainPhoto(roadId) {
      const road = MAIN_ROADS.find(r => r.id === roadId);
      if (!road) return;
      openPhotoModal(
        `#${road.order} · ${road.name}`,
        `${road.siName} (${road.zoneLabel})`,
        road.startImage,
        road.startImageCaption,
        road.startCoords,
        `Dispatch #${road.order} · 👥 ${road.totalCount}`
      );
    },
    openSubPhoto(roadId, subId) {
      const road = MAIN_ROADS.find(r => r.id === roadId);
      if (!road || !road.subItems) return;
      const sub = road.subItems.find(s => s.id === subId);
      if (!sub) return;
      openPhotoModal(
        sub.siLabel,
        sub.label,
        sub.image || road.startImage,
        sub.label,
        sub.coords,
        `Dispatch #${road.order} · 👥 ${sub.count}`
      );
    },
    openMeetingPhoto() {
      openPhotoModal(
        MEETING_PLACE.name,
        MEETING_PLACE.siSub,
        MEETING_PLACE.image,
        MEETING_PLACE.caption,
        MEETING_PLACE.coords,
        "Meeting Place"
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
        notifyHost("Saturday dispatch order copied!");
      });
    },
    shareAll() {
      const url = `https://wa.me/?text=${encodeURIComponent(formatSummaryText())}`;
      global.open(url, "_blank");
    }
  };

  function handleSatFullscreenChange() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const wrapper = document.getElementById("sat-map-wrapper-combined");
    const isFs = (fsEl && (fsEl.id === "sat-map-wrapper-combined" || fsEl.id === "sat-leaflet-map-combined")) ||
      (wrapper && wrapper.classList.contains("fixed"));
    const btn = document.getElementById("sat-fullscreen-btn");
    const mapEl = document.getElementById("sat-leaflet-map-combined");
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

  document.addEventListener("fullscreenchange", handleSatFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleSatFullscreenChange);
})(window);
