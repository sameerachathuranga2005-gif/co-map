/**
 * Friday Morning Unified Territory Road Map (WP - 0973 & WP - 0974)
 * Single combined interactive Leaflet map with Main Roads ranked by distance,
 * nested sub-roads tucked under each Main Road, and Street View start-point images.
 * Reference Meeting Place: Bro. Chaminda's Residence (7.070286, 79.900742)
 */
(function (global) {
  'use strict';

  const MEETING_PLACE = {
    name: "සහෝ. චමින්දගේ නිවස (Meeting Place)",
    coords: [7.070286, 79.900742],
    url: "https://maps.app.goo.gl/644b8w9PyFH1v2iRA",
    image: "assets/chaminda_location.jpg",
    caption: "Litro Gas Dealer බෝර්ඩ් එක අසල නිවස (St. Clare Rd)"
  };

  const COMBINED_MAP_URL = "https://maps.app.goo.gl/dCRSTmT5kRBBeScX6";
  const NORTH_MAP_URL = "https://maps.app.goo.gl/8eQmVLtMs1BnVstbA";
  const DONE_STORAGE_KEY = "jw_batagama_fri_roads_done_v1";

  const ZONES = {
    wp0973: {
      key: "wp0973",
      code: "WP - 0973",
      title: "මධ්‍යම කොටස — Kurusawala Rd & Wela Mada Rd",
      color: "#2563EB",
      badgeBg: "bg-blue-600 text-white",
      pillClass: "bg-blue-100 text-blue-800 border-blue-200",
      labelCoords: [7.07255, 79.90295],
      mapUrl: COMBINED_MAP_URL,
      polygon: [
        [7.071364, 79.900074], [7.071927, 79.900502], [7.072852, 79.900909], [7.073044, 79.901338],
        [7.073203, 79.902002], [7.073405, 79.902795], [7.073458, 79.903695], [7.073692, 79.904369],
        [7.073448, 79.904830], [7.073171, 79.905569], [7.072852, 79.906480], [7.072321, 79.905837],
        [7.071662, 79.905323], [7.070917, 79.905151], [7.071077, 79.903373], [7.071077, 79.901445]
      ]
    },
    wp0974: {
      key: "wp0974",
      code: "WP - 0974",
      title: "දකුණු කොටස — St. Clare Rd & Guruge Mayan ප්‍රදේශය",
      color: "#059669",
      badgeBg: "bg-emerald-600 text-white",
      pillClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
      labelCoords: [7.06895, 79.90175],
      mapUrl: COMBINED_MAP_URL,
      polygon: [
        [7.071364, 79.900074], [7.071077, 79.901445], [7.071077, 79.903373], [7.070917, 79.905151],
        [7.070226, 79.904959], [7.069695, 79.904894], [7.068791, 79.904498], [7.068419, 79.904316],
        [7.067569, 79.904112], [7.066793, 79.904112], [7.066506, 79.903416], [7.066293, 79.902495],
        [7.067005, 79.901606], [7.067643, 79.900695], [7.068122, 79.899988], [7.068557, 79.899463],
        [7.068451, 79.898671], [7.069025, 79.898917], [7.069833, 79.899238], [7.070769, 79.89971]
      ]
    },
    north: {
      key: "north",
      code: "Ma Eliya (North)",
      title: "උතුරු කොටස — Aweriyawattha North · St.Mary's Rd · St Rita Ave North",
      color: "#7C3AED",
      badgeBg: "bg-violet-600 text-white",
      pillClass: "bg-violet-100 text-violet-800 border-violet-200",
      labelCoords: [7.07855, 79.90525],
      mapUrl: NORTH_MAP_URL,
      polygon: [
        [7.073692, 79.904369], [7.074662, 79.904799], [7.07545, 79.90488], [7.07645, 79.90462],
        [7.07692, 79.90462], [7.07810, 79.90354], [7.07960, 79.90365], [7.08110, 79.90355],
        [7.08210, 79.90305], [7.082612, 79.902693], [7.08250, 79.90360], [7.08245, 79.90415],
        [7.082842, 79.905575], [7.08305, 79.90675], [7.082892, 79.907761], [7.08175, 79.90725],
        [7.08065, 79.90698], [7.079041, 79.906823], [7.07775, 79.90685], [7.07645, 79.90668],
        [7.076035, 79.906645], [7.074854, 79.906300], [7.07380, 79.90650], [7.072852, 79.906480],
        [7.073171, 79.905569], [7.073448, 79.904830]
      ]
    }
  };

  /**
   * 9 Main Roads sorted nearest -> farthest from Bro. Chaminda's house.
   * All interior lanes / branch spurs are nested under their parent Main Road in `subRoads`.
   */
  const MAIN_ROADS = [
    {
      id: "r0974_st_clare_main",
      zones: ["wp0974"],
      zoneLabel: "WP - 0974",
      name: "St. Clare Rd",
      siName: "ශාන්ත ක්ලාරා මාවත (සහෝ. චමින්දගේ නිවස පාර)",
      startLabel: "St Rita Ave හන්දියෙන් ආරම්භය",
      landmark: "St Rita Ave හන්දියේ (ශාන්ත ක්ලාරා මාවත පුවරුව & වැල් වැට අසලින්) ආරම්භ වී සහෝ. චමින්දගේ නිවස & Thilak Grero Surveyor දක්වා",
      color: "#059669",
      segments: [
        [[7.070769, 79.89971], [7.07063, 79.900245], [7.070513, 79.900738], [7.070439, 79.901188], [7.070407, 79.901788], [7.070375, 79.902388], [7.070577, 79.902859]]
      ],
      startCoords: [7.070769, 79.89971],
      pinCoords: [7.07072, 79.89992],
      entry: [7.070506, 79.900778],
      distFromMeetingM: 25,
      startDistM: 126,
      walkMin: 1,
      lengthM: 357,
      startImage: "assets/road_st_clare_start.jpg",
      startImageCaption: "St. Clare Rd ආරම්භක පිවිසුම (St Rita Ave හන්දිය — වම් පස කහ තාප්පය & දකුණු පස මල් වැල් වැට)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0707882,79.8997296&heading=105&pitch=0",
      subRoads: [
        {
          id: "r0974_chaminda_spur",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "Bro. Chaminda House Lane & South Spurs",
          siName: "සහෝ. චමින්දගේ නිවස අතුරු පාර",
          landmark: "St. Clare Rd සිට දකුණට Litro Gas Dealer නිවස අසල පාරවල් 2 (රැස්වන ස්ථානය)",
          color: "#16A34A",
          segments: [
            [[7.070513, 79.900738], [7.070014, 79.900717]],
            [[7.07063, 79.900245], [7.070195, 79.900181]]
          ],
          entry: [7.070287, 79.900728],
          distFromMeetingM: 1,
          walkMin: 1,
          lengthM: 105,
          photo: "assets/chaminda_location.jpg",
          photoCaption: "සහෝ. චමින්දගේ නිවස — Litro Gas Dealer බෝර්ඩ් එක අසල නිවස"
        },
        {
          id: "r0974_surveyor_north_loop",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "St. Clare North Loop (Surveyor Back Lane)",
          siName: "St. Clare උතුරු අතුරු පාර",
          landmark: "Thilak Grero Surveyor පිටුපස උතුරු වටරවුම් පාර",
          color: "#0891B2",
          segments: [
            [[7.070407, 79.901788], [7.070896, 79.90182], [7.070896, 79.902323], [7.070375, 79.902388]]
          ],
          entry: [7.070407, 79.901788],
          distFromMeetingM: 116,
          walkMin: 2,
          lengthM: 168
        }
      ]
    },
    {
      id: "main_st_rita_ave",
      zones: ["wp0974", "wp0973"],
      zoneLabel: "WP - 0974 & 0973",
      name: "St Rita Ave",
      siName: "ශාන්ත රීටා මාවත (බටහිර ප්‍රධාන මාර්ගය)",
      startLabel: "Saman Hardware හන්දියෙන් ආරම්භය",
      landmark: "Saman Hardware & Stores අසලින් ආරම්භ වී St. Clare හන්දිය & Grace-Villa හරහා Wela Mada Rd දක්වා",
      color: "#0284C7",
      segments: [
        [[7.068451, 79.898671], [7.069025, 79.898917], [7.069833, 79.899238], [7.070769, 79.89971], [7.071364, 79.900074], [7.071927, 79.900502], [7.072852, 79.900909], [7.073044, 79.901338], [7.073203, 79.902002], [7.073405, 79.902795], [7.073458, 79.903695], [7.073692, 79.904369]]
      ],
      startCoords: [7.068451, 79.898671],
      pinCoords: [7.06915, 79.89897],
      entry: [7.070769, 79.89971],
      distFromMeetingM: 126,
      startDistM: 306,
      walkMin: 2,
      lengthM: 946,
      startImage: "assets/road_st_rita_start.jpg",
      startImageCaption: "St Rita Ave ආරම්භය (Saman Hardware & Stores සහ තුන්මහල් කොළ ගොඩනැගිල්ල / සුරුවම අසල)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0684768,79.8986574&heading=23&pitch=0",
      subRoads: [
        {
          id: "r0974_st_rita_sw_lane",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "St Rita SW Side Lane (Saman Hardware Rear)",
          siName: "St Rita නිරිතදිග අතුරු පාර",
          landmark: "Saman Hardware පිටුපසින් St Rita Ave සිට නැගෙනහිරට ඇති අතුරු පාර",
          color: "#0EA5E9",
          segments: [
            [[7.069025, 79.898917], [7.068919, 79.899346], [7.069238, 79.899645]]
          ],
          entry: [7.069238, 79.899645],
          distFromMeetingM: 168,
          walkMin: 2,
          lengthM: 97
        },
        {
          id: "r0973_st_rita_north_spur",
          zone: "wp0973",
          zoneLabel: "WP - 0973",
          name: "St Rita Upper Interior Pocket",
          siName: "St Rita උතුරු වංගුව අසල අතුරු පාර",
          landmark: "St Rita Ave උතුරු වංගුව අසලින් ඇතුළට (WP - 0973)",
          color: "#0891B2",
          segments: [
            [[7.072831, 79.900899], [7.072703, 79.901209], [7.07264, 79.901681]]
          ],
          entry: [7.072703, 79.901209],
          distFromMeetingM: 272,
          walkMin: 4,
          lengthM: 90
        }
      ]
    },
    {
      id: "r0973_kurusawala_main",
      zones: ["wp0973"],
      zoneLabel: "WP - 0973",
      name: "Kurusawala Rd",
      siName: "කුරුසවල පාර (ප්‍රධාන කොටස)",
      startLabel: "St Rita Ave (සුරුවම අසලින්) ආරම්භය",
      landmark: "St Rita Ave හන්දියෙන් (සුදු ආරුක්කු ගේට්ටුව & කුරුසවල සුරුවම අසලින්) Rudradeva Kovil දෙසට",
      color: "#2563EB",
      segments: [
        [[7.071927, 79.900502], [7.071885, 79.901059], [7.07197, 79.901938], [7.072002, 79.902623], [7.072119, 79.903288], [7.072044, 79.903737], [7.071853, 79.904187], [7.071747, 79.904594]]
      ],
      startCoords: [7.071927, 79.900502],
      pinCoords: [7.07191, 79.90074],
      entry: [7.071900, 79.900864],
      distFromMeetingM: 179,
      startDistM: 184,
      walkMin: 2,
      lengthM: 460,
      startImage: "assets/road_kurusawala_start.jpg",
      startImageCaption: "Kurusawala Rd ආරම්භය (St Rita Ave හන්දිය — වම් පස සුදු ආරුක්කු ගේට්ටුව & දකුණු පස සුරුවම)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0720148,79.9006901&heading=105&pitch=0",
      subRoads: [
        {
          id: "r0973_kurusawala_south",
          zone: "wp0973",
          zoneLabel: "WP - 0973",
          name: "Kurusawala South Branch Lanes",
          siName: "කුරුසවල දකුණු අතුරු පාරවල් 2",
          landmark: "Kurusawala Rd සිට දකුණට ඇති නිවාස පාරවල් 2",
          color: "#7C3AED",
          segments: [
            [[7.07197, 79.901938], [7.07147, 79.901938]],
            [[7.072002, 79.902581], [7.071428, 79.902645], [7.071321, 79.903009], [7.071598, 79.903223]]
          ],
          entry: [7.07147, 79.901938],
          distFromMeetingM: 186,
          walkMin: 2,
          lengthM: 201
        },
        {
          id: "r0973_kovil_north",
          zone: "wp0973",
          zoneLabel: "WP - 0973",
          name: "Kovil Lane (Rudradeva Guru Shakthi)",
          siName: "කෝවිල පාර (උතුරු අතුරු පාර)",
          landmark: "Rudradeva Guru Shakthi Peedam බටහිර / උතුරු අතුරු පාර",
          color: "#DC2626",
          segments: [
            [[7.07197, 79.901938], [7.072459, 79.901927], [7.072884, 79.901949], [7.072959, 79.902152]]
          ],
          entry: [7.07197, 79.901938],
          distFromMeetingM: 228,
          walkMin: 3,
          lengthM: 126
        },
        {
          id: "r0973_kovil_east",
          zone: "wp0973",
          zoneLabel: "WP - 0973",
          name: "Kovil East & NE Lane",
          siName: "කෝවිල නැගෙනහිර අතුරු පාර",
          landmark: "කෝවිල ඉදිරිපිටින් නැගෙනහිර දෙසට",
          color: "#EA580C",
          segments: [
            [[7.072119, 79.903288], [7.072214, 79.903748], [7.072268, 79.904102]]
          ],
          entry: [7.072119, 79.903288],
          distFromMeetingM: 347,
          walkMin: 5,
          lengthM: 91
        }
      ]
    },
    {
      id: "r0974_south_boundary",
      zones: ["wp0974"],
      zoneLabel: "WP - 0974",
      name: "Ja-ela - Ganemulla Rd",
      siName: "ජා-ඇල - ගනේමුල්ල පාර (දකුණු මායිම: Saman → Zijssok)",
      startLabel: "Saman Hardware හන්දියෙන් නැගෙනහිරට",
      landmark: "Saman Hardware – Pathfinder – J.M Solution – Guruge Mayan Water Park – Siripala – Zijssok",
      color: "#EA580C",
      segments: [
        [[7.068451, 79.898671], [7.068557, 79.899463], [7.068122, 79.899988], [7.067643, 79.900695], [7.067005, 79.901606], [7.066293, 79.902495], [7.066506, 79.903416], [7.066793, 79.904112]]
      ],
      startCoords: [7.068451, 79.898671],
      pinCoords: [7.06818, 79.89985],
      entry: [7.068557, 79.899463],
      distFromMeetingM: 238,
      startDistM: 306,
      walkMin: 3,
      lengthM: 695,
      startImage: "assets/road_jaela_ganemulla_start.jpg",
      startImageCaption: "Ja-ela - Ganemulla Rd ආරම්භය (Saman Hardware හන්දිය — බුදු පිළිමය සහ තුන්මහල් ගොඩනැගිල්ල අසලින් නැගෙනහිරට)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0684768,79.8986574&heading=82&pitch=0",
      subRoads: [
        {
          id: "r0974_guruge_west_pathfinder",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "Guruge Mayan West / Pathfinder Lane",
          siName: "ගුරුගේ මායන් බටහිර / Pathfinder ඇතුළු පාර",
          landmark: "J.M Solution අසලින් උතුරට වැව පැත්තට",
          color: "#7C3AED",
          segments: [
            [[7.067888, 79.900352], [7.068154, 79.900567], [7.068632, 79.90061], [7.068951, 79.900888]]
          ],
          entry: [7.068951, 79.900888],
          distFromMeetingM: 148,
          walkMin: 2,
          lengthM: 138
        },
        {
          id: "r0974_guruge_south_entry",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "Guruge Mayan Park Entrance Lane",
          siName: "ගුරුගේ මායන් දකුණු පිවිසුම් පාර",
          landmark: "Guruge Mayan Water Park / Siripala Restaurant අසලින් වැව දෙසට",
          color: "#DC2626",
          segments: [
            [[7.067537, 79.901017], [7.067941, 79.901359], [7.068281, 79.901681], [7.068813, 79.901895]]
          ],
          entry: [7.068813, 79.901895],
          distFromMeetingM: 207,
          walkMin: 3,
          lengthM: 174
        }
      ]
    },
    {
      id: "main_aweriyawattha_rd",
      zones: ["wp0974", "wp0973"],
      zoneLabel: "WP - 0974 & 0973",
      name: "Aweriyawattha Rd",
      siName: "ඇවරියවත්ත පාර (Zijssok → Blissberry → Samantha Stores)",
      startLabel: "Zijssok හන්දියෙන් උතුරට ආරම්භය",
      landmark: "Zijssok හන්දියෙන් ආරම්භ වී CS Auto – D&D Choco – Nimmi – Blissberry – Hiru – Samantha Stores දක්වා",
      color: "#D97706",
      segments: [
        [[7.066793, 79.904112], [7.067569, 79.904112], [7.068419, 79.904316], [7.068791, 79.904498], [7.069695, 79.904894], [7.070226, 79.904959], [7.070917, 79.905151], [7.071662, 79.905323], [7.072321, 79.905837], [7.072852, 79.90648]]
      ],
      startCoords: [7.066793, 79.904112],
      pinCoords: [7.06712, 79.90411],
      entry: [7.068517, 79.904364],
      distFromMeetingM: 445,
      startDistM: 538,
      walkMin: 6,
      lengthM: 748,
      startImage: "assets/road_aweriyawattha_start.jpg",
      startImageCaption: "Aweriyawattha Rd ආරම්භය (Zijssok හන්දිය — Ja-ela - Ganemulla Rd සිට කොළ තාප්පය & නිල් රෝලර් ෂටර් ගොඩනැගිල්ල අසලින්)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0668301,79.9041014&heading=15&pitch=0",
      subRoads: [
        {
          id: "r0974_cs_auto_lake_lane",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "CS Automobile / Lake East Road",
          siName: "CS Automobile – වැව අයිනේ පාර",
          landmark: "CS Automobile අසලින් වැව නැගෙනහිර පැත්තට",
          color: "#DB2777",
          segments: [
            [[7.068419, 79.904316], [7.068526, 79.904037], [7.068738, 79.903641], [7.068983, 79.903427], [7.069376, 79.903427], [7.069748, 79.90332]],
            [[7.068738, 79.903641], [7.06826, 79.903534]]
          ],
          entry: [7.069748, 79.90332],
          distFromMeetingM: 291,
          walkMin: 4,
          lengthM: 259
        },
        {
          id: "r0974_nimmi_choco_lanes",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "Nimmi & D&D Choco Opposite Lanes",
          siName: "Nimmi & D&D Choco Mart ඉදිරිපිට අතුරු පාරවල්",
          landmark: "Aweriyawattha Rd සිට බටහිරට ඇති නිවාස පාරවල් 2",
          color: "#9333EA",
          segments: [
            [[7.070226, 79.904959], [7.070333, 79.904498], [7.070545, 79.904145]],
            [[7.069695, 79.904894], [7.069695, 79.90438], [7.069769, 79.904059]]
          ],
          entry: [7.069769, 79.904059],
          distFromMeetingM: 371,
          walkMin: 5,
          lengthM: 191
        },
        {
          id: "r0974_zijssok_north_pocket",
          zone: "wp0974",
          zoneLabel: "WP - 0974",
          name: "Zijssok North Interior Lane",
          siName: "Zijssok උතුරු ඇතුළු පාර",
          landmark: "CS Automobile දකුණින් Zijssok පැත්තේ අතුරු පාර",
          color: "#4F46E5",
          segments: [
            [[7.06775, 79.904112], [7.06775, 79.903609], [7.0681, 79.903427]]
          ],
          entry: [7.0681, 79.903427],
          distFromMeetingM: 383,
          walkMin: 5,
          lengthM: 99
        },
        {
          id: "r0973_hiru_lane",
          zone: "wp0973",
          zoneLabel: "WP - 0973",
          name: "Hiru Communication Interior Lanes",
          siName: "හිරු කොමියුනිකේෂන් අසල ඇතුළු පාරවල්",
          landmark: "Aweriyawattha Rd සිට Hiru Communication අසලින් බටහිරට (WP - 0973)",
          color: "#DB2777",
          segments: [
            [[7.072321, 79.905623], [7.072342, 79.905301], [7.072512, 79.90498]],
            [[7.071959, 79.905387], [7.072034, 79.905001], [7.071917, 79.904723]]
          ],
          entry: [7.071917, 79.904723],
          distFromMeetingM: 475,
          walkMin: 6,
          lengthM: 153
        }
      ]
    },
    {
      id: "r0973_wela_mada_rd",
      zones: ["wp0973", "north"],
      zoneLabel: "WP - 0973 & Ma Eliya",
      name: "Wela Mada Road",
      siName: "වෙල මැද පාර (Nik's place → Samantha Stores)",
      startLabel: "St Rita Ave කෙළවරින් නැගෙනහිරට",
      landmark: "St Rita Ave කෙළවර (Nik's place අසලින්) වෙල හරහා Wela Mada Park & Samantha Stores දක්වා",
      color: "#0D9488",
      segments: [
        [[7.073692, 79.904369], [7.073448, 79.90483], [7.073171, 79.905569], [7.072852, 79.90648]]
      ],
      startCoords: [7.073692, 79.904369],
      pinCoords: [7.07330, 79.90522],
      entry: [7.073692, 79.904369],
      distFromMeetingM: 550,
      startDistM: 551,
      walkMin: 7,
      lengthM: 251,
      startImage: "assets/road_wela_mada_start.jpg",
      startImageCaption: "Wela Mada Road ආරම්භය (St Rita Ave කෙළවර — වම් පස වෙල යාය & විදුලි කණු, දකුණු පස රතු මල් ගස)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0737024,79.9043546&heading=118&pitch=0",
      subRoads: [
        {
          id: "r0973_wela_mada_lane",
          zone: "wp0973",
          zoneLabel: "WP - 0973",
          name: "Wela Mada Interior Lane",
          siName: "වෙල මැද පාර්ක් අසල අතුරු පාර",
          landmark: "Wela Mada Park අසලින් දකුණට",
          color: "#9333EA",
          segments: [
            [[7.073448, 79.90483], [7.072969, 79.904691], [7.07298, 79.904337], [7.07264, 79.904145]]
          ],
          entry: [7.07264, 79.904145],
          distFromMeetingM: 457,
          walkMin: 6,
          lengthM: 138
        }
      ]
    },
    {
      id: "main_st_rita_north",
      zones: ["north"],
      zoneLabel: "Ma Eliya (North)",
      name: "St Rita Ave (North — Ma Eliya)",
      siName: "ශාන්ත රීටා මාවත උතුරු කොටස (Nik's place → Sandasewana)",
      startLabel: "Nik's place අසලින් උතුරට ආරම්භය",
      landmark: "Nik's place අසලින් උතුරට VOICE Center – Welamada Rd – Tharindu Moters – St. Rita's Church හරහා Sandasewana house දක්වා",
      color: "#7C3AED",
      segments: [
        [[7.073692, 79.904369], [7.074662, 79.904799], [7.07545, 79.90488], [7.07645, 79.90462], [7.07692, 79.90462], [7.07810, 79.90354], [7.07960, 79.90365], [7.08110, 79.90355], [7.08210, 79.90305], [7.082612, 79.902693]]
      ],
      startCoords: [7.073692, 79.904369],
      pinCoords: [7.07445, 79.90468],
      entry: [7.073692, 79.904369],
      distFromMeetingM: 551,
      startDistM: 551,
      walkMin: 7,
      lengthM: 1078,
      startImage: "assets/road_st_rita_north_start.jpg",
      startImageCaption: "St Rita Ave (North) ආරම්භය (Nik's place වංගුව අසල — කහ ගේට්ටුව & ගඩොල් තාප්පය පසුකර උතුරට)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0737024,79.9043546&heading=350&pitch=0",
      subRoads: [
        {
          id: "rnorth_welamada_connector",
          zone: "north",
          zoneLabel: "Ma Eliya (North)",
          name: "Welamada Rd (Interior Connector)",
          siName: "වෙලමැද අභ්‍යන්තර හරස් පාර (Dinesh Home)",
          landmark: "St Rita Ave සිට Dinesh Home & Classy Couture හරහා Aweriyawattha Rd දක්වා",
          color: "#6366F1",
          segments: [
            [[7.07692, 79.90462], [7.07668, 79.90555], [7.07645, 79.90668]]
          ],
          entry: [7.07692, 79.90462],
          distFromMeetingM: 853,
          walkMin: 11,
          lengthM: 233
        },
        {
          id: "rnorth_voice_country_park",
          zone: "north",
          zoneLabel: "Ma Eliya (North)",
          name: "VOICE Center & Central Country Park Lanes",
          siName: "VOICE Center & St. Rita's Park අතුරු පාරවල්",
          landmark: "Central Country Park & St. Rita's Park අසල බටහිර අතුරු පාරවල්",
          color: "#8B5CF6",
          segments: [
            [[7.07545, 79.90488], [7.07540, 79.90395], [7.07500, 79.90380]],
            [[7.07645, 79.90462], [7.07645, 79.90395]]
          ],
          entry: [7.07545, 79.90488],
          distFromMeetingM: 730,
          walkMin: 9,
          lengthM: 222
        },
        {
          id: "rnorth_keston_ct",
          zone: "north",
          zoneLabel: "Ma Eliya (North)",
          name: "Keston Ct & Nethma Antenna Lane",
          siName: "Keston Ct බටහිර අතුරු පාර",
          landmark: "St. Rita's Park අසලින් බටහිරට Nethma Antenna දෙසට",
          color: "#A855F7",
          segments: [
            [[7.07645, 79.90462], [7.07666, 79.90297]]
          ],
          entry: [7.07645, 79.90462],
          distFromMeetingM: 809,
          walkMin: 10,
          lengthM: 184
        },
        {
          id: "rnorth_kiripattiya_lane",
          zone: "north",
          zoneLabel: "Ma Eliya (North)",
          name: "Kiripattiya / Tharindu Moters Lane",
          siName: "කිරිපට්ටිය පාර & තරිඳු මෝටර්ස් අතුරු පාර",
          landmark: "Sam Silva & Tharindu Moters අසලින් බටහිරට",
          color: "#EC4899",
          segments: [
            [[7.07960, 79.90365], [7.07975, 79.90240]]
          ],
          entry: [7.07960, 79.90365],
          distFromMeetingM: 1084,
          walkMin: 14,
          lengthM: 139
        }
      ]
    },
    {
      id: "main_aweriyawattha_north",
      zones: ["north"],
      zoneLabel: "Ma Eliya (North)",
      name: "Aweriyawattha Rd (North — Ma Eliya)",
      siName: "ඇවරියවත්ත පාර උතුරු කොටස (Samantha Stores → Tailor Shop)",
      startLabel: "Samantha Stores අසලින් උතුරට ආරම්භය",
      landmark: "Samantha Stores සිට Dilan Motors – Ravi Stores – Door to Door Super – Yellow Leaf හරහා 401 Tailor Shop දක්වා",
      color: "#C026D3",
      segments: [
        [[7.072852, 79.906480], [7.07380, 79.90650], [7.074854, 79.906300], [7.076035, 79.906645], [7.07645, 79.90668], [7.07775, 79.90685], [7.079041, 79.906823], [7.08065, 79.90698], [7.08175, 79.90725], [7.082892, 79.907761]]
      ],
      startCoords: [7.072942, 79.906475],
      pinCoords: [7.07385, 79.90650],
      entry: [7.072852, 79.906480],
      distFromMeetingM: 695,
      startDistM: 695,
      walkMin: 9,
      lengthM: 1142,
      startImage: "assets/road_aweriyawattha_north_start.jpg",
      startImageCaption: "Aweriyawattha Rd (North) ආරම්භය (Samantha Stores කළු ගේට්ටුව අසලින් උතුරට)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0729191,79.9064514&heading=12&pitch=0",
      subRoads: [
        {
          id: "rnorth_door_to_door_lane",
          zone: "north",
          zoneLabel: "Ma Eliya (North)",
          name: "Door to Door Super West Lane",
          siName: "Door to Door Super අසල අතුරු පාර",
          landmark: "Door to Door Super අසලින් බටහිරට ඇති නිවාස පාර",
          color: "#9333EA",
          segments: [
            [[7.079041, 79.906823], [7.07905, 79.90565]]
          ],
          entry: [7.079041, 79.906823],
          distFromMeetingM: 1182,
          walkMin: 15,
          lengthM: 130
        },
        {
          id: "rnorth_yellow_leaf_lane",
          zone: "north",
          zoneLabel: "Ma Eliya (North)",
          name: "Yellow Leaf & North Aweriyawattha Lane",
          siName: "Yellow Leaf අසල උතුරු අතුරු පාර",
          landmark: "Yellow Leaf අසලින් බටහිරට ඇති නිවාස පාර",
          color: "#E11D48",
          segments: [
            [[7.08065, 79.90698], [7.08075, 79.90555]]
          ],
          entry: [7.08065, 79.90698],
          distFromMeetingM: 1341,
          walkMin: 17,
          lengthM: 158
        }
      ]
    },
    {
      id: "main_st_marys_rd",
      zones: ["north"],
      zoneLabel: "Ma Eliya (North)",
      name: "St.Mary's Rd",
      siName: "ශාන්ත මරියා මාවත (Tailor Shop → Sandasewana House)",
      startLabel: "401 Aweriyawattha Tailor Shop හන්දියෙන් බටහිරට",
      landmark: "401 Aweriyawattha Tailor Shop හන්දියෙන් ආරම්භ වී Maeliya RC Cemetery & St. Rita's Church හරහා Sandasewana House දක්වා",
      color: "#4F46E5",
      segments: [
        [[7.082892, 79.907761], [7.08305, 79.90675], [7.082842, 79.905575], [7.08245, 79.90415], [7.08250, 79.90360], [7.082612, 79.902693]]
      ],
      startCoords: [7.082892, 79.907761],
      pinCoords: [7.08292, 79.90725],
      entry: [7.082612, 79.902693],
      distFromMeetingM: 1387,
      startDistM: 1600,
      walkMin: 17,
      lengthM: 570,
      startImage: "assets/road_st_marys_start.jpg",
      startImageCaption: "St.Mary's Rd ආරම්භය (401 Aweriyawattha Tailor Shop හන්දිය — කොළ ගේට්ටුව & සුදු පුවරුව අසලින් බටහිරට)",
      streetViewUrl: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=7.0829008,79.9078247&heading=265&pitch=0",
      subRoads: [
        {
          id: "rnorth_maeliya_cemetery_lane",
          zone: "north",
          zoneLabel: "Ma Eliya (North)",
          name: "Maeliya Cemetery South Lane",
          siName: "මෑලිය සුසානභූමිය අසල අතුරු පාර",
          landmark: "Maeliya Roman Catholic Cemetery අසලින් දකුණට",
          color: "#6366F1",
          segments: [
            [[7.08245, 79.90415], [7.08155, 79.90425]]
          ],
          entry: [7.08245, 79.90415],
          distFromMeetingM: 1403,
          walkMin: 18,
          lengthM: 101
        }
      ]
    }
  ];

  let activeFilter = "all"; // 'all' | 'wp0973' | 'wp0974' | 'pending'
  let selectedMainId = null;
  let selectedSubId = null;
  const expandedState = {}; // mainId -> boolean
  let allExpanded = false;
  let mapState = null;

  function loadDoneMap() {
    try {
      return JSON.parse(localStorage.getItem(DONE_STORAGE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveDoneMap(doneMap) {
    try {
      localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(doneMap));
    } catch (e) {}
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getWalkNavUrl(coords) {
    return `https://www.google.com/maps/dir/?api=1&origin=${MEETING_PLACE.coords[0]},${MEETING_PLACE.coords[1]}&destination=${coords[0]},${coords[1]}&travelmode=walking`;
  }

  function notifyHost(msg) {
    if (typeof global.showToast === "function") {
      global.showToast(msg);
    }
  }

  function getFilteredSubRoads(mainRoad) {
    if (activeFilter === "wp0973" || activeFilter === "wp0974" || activeFilter === "north") {
      return mainRoad.subRoads.filter(s => s.zone === activeFilter);
    }
    return mainRoad.subRoads;
  }

  function isRoadComplete(mainRoad, doneMap) {
    if (!doneMap[mainRoad.id]) return false;
    return mainRoad.subRoads.every(s => !!doneMap[s.id]);
  }

  function getVisibleMainRoads(doneMap) {
    return MAIN_ROADS
      .map((road, idx) => ({ road, rank: idx + 1 }))
      .filter(({ road }) => {
        if (activeFilter === "wp0973" || activeFilter === "wp0974" || activeFilter === "north") {
          return road.zones.includes(activeFilter);
        }
        if (activeFilter === "pending") return !isRoadComplete(road, doneMap);
        return true;
      });
  }

  function getTotals(doneMap) {
    let totalMain = MAIN_ROADS.length;
    let totalSub = 0;
    let totalLengthM = 0;
    let doneItems = 0;
    let totalItems = 0;

    MAIN_ROADS.forEach(m => {
      totalItems += 1;
      totalLengthM += m.lengthM;
      if (doneMap[m.id]) doneItems += 1;
      m.subRoads.forEach(s => {
        totalSub += 1;
        totalItems += 1;
        totalLengthM += s.lengthM;
        if (doneMap[s.id]) doneItems += 1;
      });
    });

    return { totalMain, totalSub, totalItems, doneItems, totalLengthM };
  }

  function formatSummaryText() {
    const doneMap = loadDoneMap();
    let text = `🗺️ *Friday Morning Unified Territories (WP - 0973, WP - 0974 & Ma Eliya North)*\n`;
    text += `🏠 Meeting Place: ${MEETING_PLACE.name}\n`;
    text += `📍 WP-0973 & 0974 Map: ${COMBINED_MAP_URL}\n`;
    text += `📍 Ma Eliya (North) Map: ${NORTH_MAP_URL}\n\n`;
    text += `🛣️ *දුර අනුව ප්‍රධාන පාරවල් (Main Roads — Nearest → Farthest):*\n`;

    MAIN_ROADS.forEach((m, idx) => {
      const mTick = doneMap[m.id] ? "✅ " : "";
      text += `\n${idx + 1}. ${mTick}*${m.name}* [${m.zoneLabel}] (${m.distFromMeetingM}m / ~${m.walkMin} min | දිග ~${m.lengthM}m)\n`;
      text += `   📸 ආරම්භය: ${m.startLabel}\n`;
      text += `   🚶 Start Nav: ${getWalkNavUrl(m.startCoords)}\n`;
      text += `   🌐 Street View: ${m.streetViewUrl}\n`;
      if (m.subRoads.length > 0) {
        text += `   ↳ *අතුරු පාරවල් (${m.subRoads.length}):*\n`;
        m.subRoads.forEach((s, sIdx) => {
          const sTick = doneMap[s.id] ? "✅ " : "";
          text += `      ${idx + 1}.${sIdx + 1} ${sTick}${s.name} (${s.distFromMeetingM}m | ~${s.lengthM}m) — ${getWalkNavUrl(s.entry)}\n`;
        });
      }
    });
    return text;
  }

  function ensureInjectedStyles() {
    if (document.getElementById("fri-unified-map-styles")) return;
    const style = document.createElement("style");
    style.id = "fri-unified-map-styles";
    style.textContent = `
      .leaflet-container img { max-width: none !important; max-height: none !important; }
      .fri-start-pin-img { width: 100% !important; height: 100% !important; object-fit: cover !important; display: block !important; }
      .fri-zone-label-pill {
        background: rgba(255, 255, 255, 0.92);
        border-radius: 9999px;
        padding: 2px 8px;
        font-size: 10px;
        font-weight: 900;
        font-family: monospace;
        box-shadow: 0 2px 6px rgba(15, 23, 42, 0.2);
        white-space: nowrap;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureImageModal() {
    if (document.getElementById("friRoadPhotoModal")) return;
    const modal = document.createElement("div");
    modal.id = "friRoadPhotoModal";
    modal.className = "fixed inset-0 z-[9998] bg-black/85 backdrop-blur-md hidden items-center justify-center p-3 sm:p-4";
    modal.setAttribute("onclick", "window.FridayTerritoryMaps.closeImageModal()");
    modal.innerHTML = `
      <div onclick="event.stopPropagation()" class="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 flex flex-col">
        <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white gap-3">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span id="friModalZoneBadge" class="px-2 py-0.5 rounded-lg bg-blue-600 text-white text-[10px] font-black font-mono">WP - 0973</span>
              <h3 id="friModalTitle" class="font-black text-sm sm:text-base truncate">Road Start Photo</h3>
            </div>
            <p id="friModalSubtitle" class="text-xs text-slate-300 truncate mt-0.5"></p>
          </div>
          <button type="button" onclick="window.FridayTerritoryMaps.closeImageModal()"
            class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold transition shrink-0">
            ✕
          </button>
        </div>
        <div class="relative bg-slate-950 flex items-center justify-center max-h-[65vh] overflow-hidden">
          <img id="friModalImg" src="" alt="Road start photo" class="w-full max-h-[62vh] object-contain">
        </div>
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-3">
          <p id="friModalCaption" class="text-xs text-slate-700 font-semibold leading-relaxed"></p>
          <div class="flex flex-wrap items-center justify-end gap-2">
            <a id="friModalSvBtn" href="#" target="_blank" rel="noopener"
              class="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-extrabold transition">
              🌐 360° Street View ↗
            </a>
            <a id="friModalNavBtn" href="#" target="_blank" rel="noopener"
              class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition">
              🚶 ආරම්භයට යන්න (Maps) ↗
            </a>
            <button type="button" onclick="window.FridayTerritoryMaps.closeImageModal()"
              class="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition">
              වසන්න
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    if (!global._friRoadModalEscBound) {
      global._friRoadModalEscBound = true;
      global.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          global.FridayTerritoryMaps && global.FridayTerritoryMaps.closeImageModal();
        }
      });
    }
  }

  function openImageModal(title, siTitle, imgSrc, caption, startCoords, streetViewUrl, zoneLabel) {
    ensureImageModal();
    const modal = document.getElementById("friRoadPhotoModal");
    if (!modal) return;

    document.getElementById("friModalZoneBadge").textContent = zoneLabel || "WP - 0973 & 0974";
    document.getElementById("friModalTitle").textContent = title || "";
    document.getElementById("friModalSubtitle").textContent = siTitle || "";
    document.getElementById("friModalImg").src = imgSrc || "";
    document.getElementById("friModalCaption").textContent = caption || "";

    const navBtn = document.getElementById("friModalNavBtn");
    if (startCoords && startCoords.length === 2) {
      navBtn.href = getWalkNavUrl(startCoords);
      navBtn.classList.remove("hidden");
    } else {
      navBtn.classList.add("hidden");
    }

    const svBtn = document.getElementById("friModalSvBtn");
    if (streetViewUrl) {
      svBtn.href = streetViewUrl;
      svBtn.classList.remove("hidden");
    } else {
      svBtn.classList.add("hidden");
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closeImageModal() {
    const modal = document.getElementById("friRoadPhotoModal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  function buildMainRoadPopupHtml(road, rank) {
    const svUrl = escapeHtml(road.streetViewUrl);
    const navUrl = escapeHtml(getWalkNavUrl(road.startCoords));
    const safeTitle = escapeHtml(road.name);
    const safeSi = escapeHtml(road.siName);
    const safeImg = escapeHtml(road.startImage);
    const safeCaption = escapeHtml(road.startImageCaption);
    const safeZone = escapeHtml(road.zoneLabel);

    return `
      <div style="font-family:sans-serif;width:236px;max-width:72vw;">
        <div onclick="window.FridayTerritoryMaps.openMainPhoto('${road.id}')"
          style="position:relative;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;margin-bottom:7px;cursor:pointer;background:#0f172a;">
          <img src="${safeImg}" alt="${safeTitle}" style="width:100%;height:106px;object-fit:cover;display:block;" />
          <span style="position:absolute;top:6px;left:6px;padding:2px 7px;border-radius:999px;background:${road.color};color:#fff;font-size:10px;font-weight:900;">#${rank} · ${safeZone}</span>
          <span style="position:absolute;bottom:6px;right:6px;padding:2px 7px;border-radius:8px;background:rgba(15,23,42,0.82);color:#fff;font-size:10px;font-weight:700;">🔍 විශාල කරන්න</span>
        </div>
        <div style="font-weight:900;font-size:13px;color:#0f172a;line-height:1.25;">${safeTitle}</div>
        <div style="font-size:11px;color:#334155;font-weight:700;margin-top:2px;">${safeSi}</div>
        <div style="font-size:10px;color:#475569;margin:4px 0 6px;line-height:1.35;">${safeCaption}</div>
        <div style="font-size:11px;color:#1e40af;font-weight:800;margin-bottom:8px;">
          📍 නිවසේ සිට: ${road.distFromMeetingM} m (${road.walkMin} min) · 📏 ~${road.lengthM} m
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <a href="${navUrl}" target="_blank" rel="noopener"
            style="flex:1;text-align:center;padding:6px 8px;background:#0f172a;color:#fff;border-radius:8px;font-size:11px;font-weight:800;text-decoration:none;white-space:nowrap;">
            🚶 Start ↗
          </a>
          <a href="${svUrl}" target="_blank" rel="noopener"
            style="flex:1;text-align:center;padding:6px 8px;background:#eef2ff;color:#3730a3;border:1px solid #c7d2fe;border-radius:8px;font-size:11px;font-weight:800;text-decoration:none;white-space:nowrap;">
            🌐 360° ↗
          </a>
        </div>
      </div>
    `;
  }

  function buildSubRoadPopupHtml(mainRoad, subRoad, mainRank, subIdx) {
    const navUrl = escapeHtml(getWalkNavUrl(subRoad.entry));
    const safeName = escapeHtml(subRoad.name);
    const safeSi = escapeHtml(subRoad.siName);
    const safeLandmark = escapeHtml(subRoad.landmark);
    const safeParent = escapeHtml(mainRoad.name);

    const photoThumb = subRoad.photo ? `
      <div onclick="window.FridayTerritoryMaps.openSubPhoto('${mainRoad.id}', '${subRoad.id}')"
        style="position:relative;border-radius:10px;overflow:hidden;border:1px solid #cbd5e1;margin-bottom:7px;cursor:pointer;">
        <img src="${escapeHtml(subRoad.photo)}" alt="${safeName}" style="width:100%;height:100px;object-fit:cover;display:block;" />
        <span style="position:absolute;bottom:5px;right:5px;padding:2px 6px;border-radius:6px;background:rgba(15,23,42,0.8);color:#fff;font-size:9px;font-weight:700;">🔍 View</span>
      </div>` : "";

    return `
      <div style="font-family:sans-serif;width:215px;max-width:68vw;">
        ${photoThumb}
        <div style="font-size:10px;font-weight:800;color:${mainRoad.color};margin-bottom:2px;">↳ ${safeParent} යටතේ (${mainRank}.${subIdx + 1})</div>
        <div style="font-weight:900;font-size:12px;color:#0f172a;">${safeName}</div>
        <div style="font-size:11px;color:#334155;font-weight:600;margin-top:2px;">${safeSi}</div>
        <div style="font-size:10px;color:#64748b;margin:4px 0 6px;">${safeLandmark}</div>
        <div style="font-size:11px;color:#1e40af;font-weight:800;margin-bottom:7px;">
          📍 ${subRoad.distFromMeetingM} m (${subRoad.walkMin} min) · 📏 ~${subRoad.lengthM} m
        </div>
        <a href="${navUrl}" target="_blank" rel="noopener"
          style="display:inline-block;padding:5px 10px;background:#0f172a;color:#fff;border-radius:8px;font-size:11px;font-weight:800;text-decoration:none;">
          🚶 Go to Lane ↗
        </a>
      </div>
    `;
  }

  function makeStartPhotoIcon(road, rank, isDone, isSelected) {
    const borderCol = isSelected ? "#0F172A" : (isDone ? "#10B981" : road.color);
    const badgeBg = isDone ? "#10B981" : road.color;
    return global.L.divIcon({
      className: "",
      html: `
        <div style="position:relative;width:52px;height:52px;cursor:pointer;filter:drop-shadow(0 4px 10px rgba(15,23,42,0.42));transform:${isSelected ? 'scale(1.12)' : 'scale(1)'};transition:transform 0.15s ease;">
          <div style="width:52px;height:42px;border-radius:11px;overflow:hidden;border:2.5px solid #ffffff;box-shadow:0 0 0 2.5px ${borderCol};background:#0f172a;position:relative;">
            <img src="${escapeHtml(road.startImage)}" alt="${escapeHtml(road.name)}" class="fri-pin-img" />
            <span style="position:absolute;top:2px;left:2px;min-width:17px;height:17px;padding:0 3px;border-radius:6px;background:${badgeBg};color:#fff;font-weight:900;font-size:10px;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff;font-family:sans-serif;line-height:1;">${isDone ? '✓' : rank}</span>
            <span style="position:absolute;bottom:2px;right:2px;background:rgba(15,23,42,0.8);color:#fff;font-size:8px;font-weight:800;padding:1px 4px;border-radius:4px;line-height:1.1;">📷</span>
          </div>
          <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid ${borderCol};margin:0 auto;"></div>
        </div>
      `,
      iconSize: [52, 52],
      iconAnchor: [26, 51],
      popupAnchor: [0, -48]
    });
  }

  function destroyExistingMap() {
    if (mapState && mapState.map) {
      try {
        mapState.map.remove();
      } catch (e) {}
    }
    mapState = null;
  }

  function initUnifiedMap() {
    const mapEl = document.getElementById("fri-leaflet-map-combined");
    if (!mapEl) return;

    if (typeof global.L === "undefined") {
      mapEl.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-100 text-slate-600">
          <p class="text-xs font-bold mb-2">Interactive map loading requires internet connection (Leaflet CDN).</p>
          <a href="${COMBINED_MAP_URL}" target="_blank" class="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold">Open Google Maps ↗</a>
        </div>
      `;
      return;
    }

    const L = global.L;
    const map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: true });

    const streetLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}", {
      subdomains: ["0", "1", "2", "3"],
      attribution: "Map &copy; Google",
      maxZoom: 20
    });

    const osmFallback = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri",
      maxZoom: 19
    });

    let switchedToFallback = false;
    streetLayer.on("tileerror", () => {
      if (!switchedToFallback) {
        switchedToFallback = true;
        if (map.hasLayer(streetLayer)) {
          map.removeLayer(streetLayer);
          osmFallback.addTo(map);
          if (mapState) mapState.streetLayer = osmFallback;
        }
      }
    });

    const satLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}", {
      subdomains: ["0", "1", "2", "3"],
      attribution: "Imagery &copy; Google",
      maxZoom: 20
    });

    streetLayer.addTo(map);

    // Draw both Territory Polygons on the single unified map
    const zonePolys = {};
    Object.values(ZONES).forEach(z => {
      const poly = L.polygon(z.polygon, {
        color: z.color,
        weight: 2.5,
        dashArray: "6, 5",
        fillColor: z.color,
        fillOpacity: 0.08
      }).addTo(map);

      L.marker(z.labelCoords, {
        interactive: false,
        icon: L.divIcon({
          className: "",
          html: `<div class="fri-zone-label-pill" style="color:${z.color};border:1.5px solid ${z.color};">${z.code}</div>`,
          iconSize: [78, 20],
          iconAnchor: [39, 10]
        }),
        zIndexOffset: 100
      }).addTo(map);

      zonePolys[z.key] = poly;
    });

    // Meeting place marker (Bro. Chaminda's house)
    const homeIcon = L.divIcon({
      className: "",
      html: `<div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9999px;background:#059669;color:#fff;border:3px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.4);font-size:16px;">🏠</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const homeMarker = L.marker(MEETING_PLACE.coords, { icon: homeIcon, zIndexOffset: 1200 })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:sans-serif;width:210px;">
          <div onclick="window.FridayTerritoryMaps.openMeetingPhoto()" style="position:relative;border-radius:10px;overflow:hidden;border:1px solid #a7f3d0;margin-bottom:7px;cursor:pointer;">
            <img src="${MEETING_PLACE.image}" alt="Bro. Chaminda's house" style="width:100%;height:98px;object-fit:cover;display:block;" />
            <span style="position:absolute;bottom:4px;right:4px;padding:2px 6px;border-radius:6px;background:rgba(15,23,42,0.8);color:#fff;font-size:9px;font-weight:700;">🔍 View</span>
          </div>
          <div style="font-weight:900;font-size:13px;color:#065f46;">🏠 සහෝ. චමින්දගේ නිවස</div>
          <div style="font-size:11px;color:#475569;margin:2px 0 6px;">Friday Morning Meeting Place (St. Clare Rd)</div>
          <a href="${MEETING_PLACE.url}" target="_blank" rel="noopener" style="display:inline-block;padding:5px 9px;background:#059669;color:#fff;border-radius:7px;font-size:11px;font-weight:800;text-decoration:none;">Open Google Maps ↗</a>
        </div>
      `, {
        maxWidth: 250,
        autoPan: true,
        autoPanPaddingTopLeft: L.point(24, 52),
        autoPanPaddingBottomRight: L.point(24, 24)
      });

    const doneMap = loadDoneMap();
    const mainLayers = {};
    const subLayers = {};
    const connectorGroup = L.layerGroup().addTo(map);
    const subBadgeGroup = L.layerGroup().addTo(map);

    // Draw Main Roads + Start-Point Image Markers + Nested Sub-Roads
    MAIN_ROADS.forEach((road, idx) => {
      const rank = idx + 1;
      const isDone = !!doneMap[road.id];
      const casingList = [];
      const lineList = [];
      const popupHtml = buildMainRoadPopupHtml(road, rank);

      // Draw sub-roads slightly beneath main roads so junctions stay crisp
      road.subRoads.forEach((sub, sIdx) => {
        const sDone = !!doneMap[sub.id];
        const sCasings = [];
        const sLines = [];
        const subPopup = buildSubRoadPopupHtml(road, sub, rank, sIdx);

        sub.segments.forEach(seg => {
          const sc = L.polyline(seg, {
            color: "#ffffff",
            weight: 6,
            opacity: 0.75,
            lineCap: "round",
            lineJoin: "round"
          }).addTo(map);

          const sl = L.polyline(seg, {
            color: sDone ? "#10B981" : sub.color,
            weight: 3,
            opacity: sDone ? 0.45 : 0.68,
            dashArray: sDone ? "5, 6" : "4, 4",
            lineCap: "round",
            lineJoin: "round"
          }).addTo(map);

          sl.bindPopup(subPopup, {
            maxWidth: 260,
            autoPan: true,
            autoPanPaddingTopLeft: L.point(24, 52),
            autoPanPaddingBottomRight: L.point(24, 24)
          });
          sl.on("click", () => {
            focusSubRoad(road.id, sub.id, { scrollList: true, skipMapFit: true });
          });

          sCasings.push(sc);
          sLines.push(sl);
        });

        subLayers[sub.id] = { mainRoad: road, sub, mainRank: rank, subIdx: sIdx, casingList: sCasings, lineList: sLines, popupHtml: subPopup };
      });

      // Draw prominent Main Road polylines
      road.segments.forEach(seg => {
        const casing = L.polyline(seg, {
          color: "#ffffff",
          weight: 10,
          opacity: 0.94,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        const line = L.polyline(seg, {
          color: isDone ? "#10B981" : road.color,
          weight: 6,
          opacity: isDone ? 0.65 : 0.96,
          dashArray: isDone ? "7, 6" : null,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        line.bindPopup(popupHtml, {
          maxWidth: 270,
          autoPan: true,
          autoPanPaddingTopLeft: L.point(24, 52),
          autoPanPaddingBottomRight: L.point(24, 24)
        });
        line.on("click", () => {
          focusMainRoad(road.id, { scrollList: true, skipMapFit: true });
        });

        casingList.push(casing);
        lineList.push(line);
      });

      // Start-Point Photo Marker right at the beginning of each Main Road
      const startMarker = L.marker(road.pinCoords, {
        icon: makeStartPhotoIcon(road, rank, isDone, false),
        zIndexOffset: 750
      })
        .addTo(map)
        .bindPopup(popupHtml, {
          maxWidth: 270,
          autoPan: true,
          autoPanPaddingTopLeft: L.point(24, 52),
          autoPanPaddingBottomRight: L.point(24, 24)
        })
        .bindTooltip(`${rank}. ${road.name} (Start)`, { direction: "top", offset: [0, -48] });

      startMarker.on("click", () => {
        focusMainRoad(road.id, { scrollList: true, skipMapFit: true });
      });

      mainLayers[road.id] = { road, rank, casingList, lineList, startMarker, popupHtml };
    });

    const allBounds = zonePolys.wp0973.getBounds()
      .extend(zonePolys.wp0974.getBounds())
      .extend(zonePolys.north.getBounds())
      .extend(MEETING_PLACE.coords);

    map.fitBounds(allBounds, { padding: [24, 24] });
    setTimeout(() => {
      try {
        map.invalidateSize();
        map.fitBounds(allBounds, { padding: [24, 24] });
      } catch (e) {}
    }, 250);

    mapState = {
      map,
      allBounds,
      zonePolys,
      streetLayer,
      satLayer,
      isSat: false,
      homeMarker,
      mainLayers,
      subLayers,
      connectorGroup,
      subBadgeGroup
    };
  }

  function refreshMapVisuals() {
    if (!mapState || typeof global.L === "undefined") return;
    const L = global.L;
    const doneMap = loadDoneMap();

    // Update territory polygons opacity based on zone filter
    const isZoneFilter = activeFilter === "wp0973" || activeFilter === "wp0974" || activeFilter === "north";
    Object.entries(mapState.zonePolys).forEach(([key, poly]) => {
      const dimmed = isZoneFilter && key !== activeFilter;
      poly.setStyle({
        fillOpacity: dimmed ? 0.02 : 0.09,
        opacity: dimmed ? 0.35 : 0.9
      });
    });

    mapState.subBadgeGroup.clearLayers();

    Object.values(mapState.mainLayers).forEach(entry => {
      const { road, rank, casingList, lineList, startMarker } = entry;
      const isDone = !!doneMap[road.id];
      const isSelected = selectedMainId === road.id;
      const matchesFilter = activeFilter === "all" ||
                            (activeFilter === "pending" && !isRoadComplete(road, doneMap)) ||
                            road.zones.includes(activeFilter);

      const lineColor = isDone ? "#10B981" : road.color;
      lineList.forEach(l => l.setStyle({
        color: lineColor,
        weight: isSelected ? 8 : 6,
        opacity: !matchesFilter ? 0.25 : (isDone ? 0.65 : 0.96),
        dashArray: isDone ? "7, 6" : null
      }));
      casingList.forEach(c => c.setStyle({
        weight: isSelected ? 12 : 10,
        opacity: !matchesFilter ? 0.3 : 0.94
      }));

      startMarker.setIcon(makeStartPhotoIcon(road, rank, isDone, isSelected));
      startMarker.setOpacity(!matchesFilter ? 0.4 : 1);
      startMarker.setZIndexOffset(isSelected ? 1100 : 750);

      // Draw sub-roads & show numbered sub-badges only when parent Main Road is selected
      road.subRoads.forEach((sub, sIdx) => {
        const sEntry = mapState.subLayers[sub.id];
        if (!sEntry) return;
        const sDone = !!doneMap[sub.id];
        const sSelected = selectedSubId === sub.id;
        const subMatchesFilter = !isZoneFilter || sub.zone === activeFilter;

        sEntry.lineList.forEach(sl => sl.setStyle({
          color: sDone ? "#10B981" : sub.color,
          weight: sSelected ? 6 : (isSelected ? 4.5 : 3),
          opacity: (!matchesFilter || !subMatchesFilter) ? 0.18 : (isSelected || sSelected ? 0.95 : (sDone ? 0.45 : 0.65)),
          dashArray: sSelected ? null : (sDone ? "5, 6" : "4, 4")
        }));
        sEntry.casingList.forEach(sc => sc.setStyle({
          weight: sSelected ? 9 : (isSelected ? 7.5 : 5.5),
          opacity: (!matchesFilter || !subMatchesFilter) ? 0.2 : 0.85
        }));

        if ((isSelected || sSelected) && subMatchesFilter) {
          const seg0 = sub.segments[0];
          const midPt = seg0[Math.floor(seg0.length / 2)];
          const badge = L.marker(midPt, {
            icon: L.divIcon({
              className: "",
              html: `<div style="display:flex;align-items:center;justify-content:center;padding:0 5px;height:20px;border-radius:9999px;background:${sDone ? '#10B981' : sub.color};color:#fff;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.35);font-weight:900;font-size:10px;font-family:sans-serif;white-space:nowrap;">${sDone ? '✓' : `${rank}.${sIdx + 1}`}</div>`,
              iconSize: [28, 20],
              iconAnchor: [14, 10]
            }),
            zIndexOffset: 950
          })
            .addTo(mapState.subBadgeGroup)
            .bindPopup(sEntry.popupHtml, {
              maxWidth: 260,
              autoPan: true,
              autoPanPaddingTopLeft: L.point(24, 52),
              autoPanPaddingBottomRight: L.point(24, 24)
            });

          badge.on("click", () => {
            focusSubRoad(road.id, sub.id, { scrollList: true, skipMapFit: true });
          });
        }
      });
    });
  }

  function drawConnectorTo(coords, color) {
    if (!mapState || typeof global.L === "undefined") return;
    const L = global.L;
    mapState.connectorGroup.clearLayers();
    L.polyline([MEETING_PLACE.coords, coords], {
      color: "#0F172A",
      weight: 2.5,
      dashArray: "5, 6",
      opacity: 0.78
    }).addTo(mapState.connectorGroup);

    L.circleMarker(coords, {
      radius: 5.5,
      color: "#ffffff",
      weight: 2,
      fillColor: color,
      fillOpacity: 1
    }).addTo(mapState.connectorGroup);
  }

  function renderMainRoadsList() {
    const listEl = document.getElementById("fri-road-list-combined");
    const progressEl = document.getElementById("fri-progress-combined");
    const barEl = document.getElementById("fri-progress-bar-combined");
    if (!listEl) return;

    const doneMap = loadDoneMap();
    const { totalItems, doneItems } = getTotals(doneMap);
    const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

    if (progressEl) progressEl.textContent = `✓ සම්පූර්ණයි: ${doneItems} / ${totalItems}`;
    if (barEl) barEl.style.width = `${pct}%`;

    const visible = getVisibleMainRoads(doneMap);

    if (visible.length === 0) {
      listEl.innerHTML = `
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-slate-500">
          ${activeFilter === "pending" ? "🎉 සියලුම ප්‍රධාන පාරවල් සහ අතුරු පාරවල් සම්පූර්ණයි!" : "පෙන්වීමට පාරවල් නොමැත."}
        </div>
      `;
      return;
    }

    listEl.innerHTML = visible.map(({ road, rank }) => {
      const isDone = !!doneMap[road.id];
      const isSelected = selectedMainId === road.id;
      const visibleSubs = getFilteredSubRoads(road);
      const subDoneCount = visibleSubs.filter(s => !!doneMap[s.id]).length;
      const isExpanded = !!expandedState[road.id];

      const subListHtml = isExpanded && visibleSubs.length > 0 ? `
        <div class="mt-3 pt-3 border-t border-slate-100 pl-3 sm:pl-4 ml-1 sm:ml-2 border-l-4 space-y-2" style="border-left-color:${road.color}">
          <div class="flex items-center justify-between text-[11px] font-extrabold text-slate-600">
            <span>↳ ${escapeHtml(road.name)} යටතේ ඇති අතුරු පාරවල් (${visibleSubs.length})</span>
            <span class="text-emerald-700">✓ ${subDoneCount}/${visibleSubs.length}</span>
          </div>
          ${visibleSubs.map((sub, sIdx) => {
            const sDone = !!doneMap[sub.id];
            const sSel = selectedSubId === sub.id;
            return `
              <div id="road-row-${sub.id}"
                onclick="event.stopPropagation(); window.FridayTerritoryMaps.focusSubRoad('${road.id}', '${sub.id}')"
                class="cursor-pointer p-2.5 sm:p-3 rounded-xl border transition-all flex items-start sm:items-center justify-between gap-2 ${
                  sSel
                    ? 'bg-slate-50 shadow-xs border-slate-400'
                    : sDone
                      ? 'bg-emerald-50/50 border-emerald-200 opacity-85 hover:opacity-100'
                      : 'bg-slate-50/70 border-slate-200/90 hover:bg-white hover:border-slate-300'
                }">
                <div class="flex items-start gap-2 min-w-0 flex-1">
                  <span class="px-1.5 h-6 rounded-lg text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0"
                    style="background:${sDone ? '#10B981' : sub.color}">
                    ${sDone ? '✓' : `${rank}.${sIdx + 1}`}
                  </span>
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-1.5">
                      <span class="font-extrabold text-xs text-slate-900 ${sDone ? 'line-through text-slate-500' : ''}">${escapeHtml(sub.name)}</span>
                      <span class="px-1.5 py-0.2 rounded bg-white border border-slate-200 text-[9px] font-black font-mono text-slate-600">${escapeHtml(sub.zoneLabel)}</span>
                    </div>
                    <div class="text-[11px] font-semibold text-slate-600 mt-0.5">${escapeHtml(sub.siName)}</div>
                    <div class="text-[10px] text-slate-500 mt-0.5 leading-snug">${escapeHtml(sub.landmark)}</div>
                    <div class="flex flex-wrap items-center gap-1.5 mt-1">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-[10px] font-black">
                        📍 ${sub.distFromMeetingM} m (${sub.walkMin} min)
                      </span>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-bold">
                        📏 ~${sub.lengthM} m
                      </span>
                      ${sub.photo ? `
                        <button type="button" onclick="event.stopPropagation(); window.FridayTerritoryMaps.openSubPhoto('${road.id}', '${sub.id}')"
                          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[10px] font-extrabold transition">
                          📸 නිවසේ ඡායාරූපය
                        </button>
                      ` : ''}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0" onclick="event.stopPropagation()">
                  <a href="${getWalkNavUrl(sub.entry)}" target="_blank" rel="noopener"
                    class="px-2 py-1 rounded-lg bg-slate-900 hover:bg-blue-700 text-white text-[10px] font-bold transition whitespace-nowrap">
                    Go ↗
                  </a>
                  <button type="button"
                    onclick="window.FridayTerritoryMaps.toggleSubDone('${road.id}', '${sub.id}')"
                    title="${sDone ? 'Mark Pending' : 'Mark Done'}"
                    class="w-7 h-7 rounded-lg border-2 flex items-center justify-center font-black text-xs transition ${
                      sDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-300 hover:border-emerald-500 text-slate-400 hover:text-emerald-600'
                    }">
                    ✓
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      ` : "";

      return `
        <div id="road-row-${road.id}"
          onclick="window.FridayTerritoryMaps.focusMainRoad('${road.id}')"
          class="cursor-pointer rounded-2xl border-2 p-3 sm:p-4 transition-all ${
            isSelected
              ? 'bg-slate-50/90 shadow-md'
              : isDone
                ? 'bg-emerald-50/35 border-emerald-200/90 opacity-90 hover:opacity-100'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
          }"
          style="${isSelected ? `border-color:${road.color};` : ''}">

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <!-- Left: Start-Point Image + Road Details -->
            <div class="flex items-start gap-3 min-w-0 flex-1">
              <!-- Start-Point Street View Thumbnail -->
              <div onclick="event.stopPropagation(); window.FridayTerritoryMaps.openMainPhoto('${road.id}')"
                title="ආරම්භක ස්ථානයේ ඡායාරූපය විශාල කර බලන්න"
                class="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 bg-slate-900 group shadow-xs"
                style="border-color:${isDone ? '#10B981' : road.color}">
                <img src="${escapeHtml(road.startImage)}" alt="${escapeHtml(road.name)} start"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span class="absolute top-1 left-1 min-w-[20px] h-5 px-1 rounded-md text-white font-black text-[11px] flex items-center justify-center shadow"
                  style="background:${isDone ? '#10B981' : road.color}">
                  ${isDone ? '✓' : rank}
                </span>
                <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold backdrop-blur-xs">
                  📸 Start
                </span>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="font-black text-sm sm:text-base text-slate-900 ${isDone ? 'line-through text-slate-500' : ''}">
                    ${escapeHtml(road.name)}
                  </span>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black font-mono ${
                    road.zones.length > 1
                      ? 'bg-indigo-100 text-indigo-800'
                      : road.zones[0] === 'wp0973'
                        ? 'bg-blue-100 text-blue-800'
                        : road.zones[0] === 'wp0974'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-violet-100 text-violet-800'
                  }">
                    ${escapeHtml(road.zoneLabel)}
                  </span>
                </div>
                <div class="text-xs font-bold text-slate-700 mt-0.5">${escapeHtml(road.siName)}</div>
                <div class="text-[11px] text-slate-500 mt-0.5 leading-snug">${escapeHtml(road.landmark)}</div>

                <div class="flex flex-wrap items-center gap-1.5 mt-2">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-[10px] font-black">
                    📍 ${road.distFromMeetingM} m (${road.walkMin} min)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    📏 දිග ~${road.lengthM} m
                  </span>
                  ${visibleSubs.length > 0 ? `
                    <button type="button"
                      onclick="event.stopPropagation(); window.FridayTerritoryMaps.toggleExpand('${road.id}')"
                      class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-black transition ${
                        isExpanded
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                      }">
                      <span>${isExpanded ? '▾' : '▸'} අතුරු පාරවල් ${visibleSubs.length}</span>
                      <span class="opacity-80">(${subDoneCount}/${visibleSubs.length})</span>
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- Right: Quick Actions -->
            <div class="flex sm:flex-col items-center justify-end gap-1.5 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100" onclick="event.stopPropagation()">
              <div class="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                <a href="${getWalkNavUrl(road.startCoords)}" target="_blank" rel="noopener"
                  title="Walk from Bro. Chaminda's house to the start of this Main Road"
                  class="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs transition whitespace-nowrap">
                  <span>Start Go</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a href="${escapeHtml(road.streetViewUrl)}" target="_blank" rel="noopener"
                  title="Open 360° Google Street View at Road Start"
                  class="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-[11px] font-extrabold inline-flex items-center gap-1 transition whitespace-nowrap">
                  <span>360°</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <button type="button"
                  onclick="window.FridayTerritoryMaps.toggleMainDone('${road.id}')"
                  title="${isDone ? 'Mark Main Road Pending' : 'Mark Main Road Done'}"
                  class="w-8 h-8 rounded-xl border-2 flex items-center justify-center font-black text-xs transition ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-white border-slate-300 hover:border-emerald-500 text-slate-400 hover:text-emerald-600'
                  }">
                  ✓
                </button>
              </div>
            </div>
          </div>

          ${subListHtml}
        </div>
      `;
    }).join("");
  }

  function updateFilterButtons() {
    ["all", "wp0973", "wp0974", "north", "pending"].forEach(m => {
      const btn = document.getElementById(`fri-flt-combined-${m}`);
      if (!btn) return;
      if (m === activeFilter) {
        btn.className = "px-2.5 py-1 rounded-lg bg-white text-slate-900 shadow-2xs font-extrabold transition";
      } else {
        btn.className = "px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 font-bold transition";
      }
    });

    const expBtn = document.getElementById("fri-expand-all-btn");
    if (expBtn) {
      expBtn.textContent = allExpanded ? "▴ අතුරු පාරවල් හකුළන්න" : "▾ සියලු අතුරු පාරවල්";
    }
  }

  function renderInto(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    ensureInjectedStyles();
    ensureImageModal();
    destroyExistingMap();

    const doneMap = loadDoneMap();
    const { totalMain, totalSub, totalLengthM } = getTotals(doneMap);
    const totalKm = (totalLengthM / 1000).toFixed(2);
    const nearest = MAIN_ROADS[0];

    container.innerHTML = `
      <div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black">
            🧭 Friday Morning Unified Road Map (One Map)
          </span>
          <h3 class="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
            WP - 0973, WP - 0974 & Ma Eliya (North) — සෑම පාරක්ම දුර අනුව (Marked by Road & Distance)
          </h3>
          <p class="text-xs text-slate-600 mt-0.5">
            🏠 ආරම්භක ස්ථානය: <strong>සහෝ. චමින්දගේ නිවස</strong> (St. Clare Rd) · ප්‍රධාන පාරවල් ${totalMain} සහ ඒවා යටතේ අතුරු පාරවල් ${totalSub} · ආරම්භක ඡායාරූප සමඟ
          </p>
        </div>
      </div>

      <article id="territory-card-combined" class="scroll-mt-24 rounded-3xl bg-white border-2 border-blue-200/90 shadow-glass overflow-hidden flex flex-col">
        <!-- Unified Card Header -->
        <div class="p-4 sm:p-5 bg-gradient-to-r from-blue-50/90 via-slate-50 to-violet-50/90 border-b border-slate-200 flex flex-col gap-3">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="space-y-1 min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="px-2.5 py-1 rounded-xl bg-blue-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0973</span>
                <span class="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black tracking-wide font-mono shadow-xs">WP - 0974</span>
                <span class="px-2.5 py-1 rounded-xl bg-violet-600 text-white text-xs font-black tracking-wide shadow-xs">Ma Eliya (North)</span>
                <span class="px-2.5 py-0.5 rounded-full border border-slate-300 bg-white text-slate-700 text-[11px] font-extrabold">
                  🛣️ ප්‍රධාන පාරවල් ${totalMain} · අතුරු පාරවල් ${totalSub} · ~${totalKm} km
                </span>
              </div>
              <h4 class="text-base sm:text-lg font-black text-slate-900 leading-snug pt-0.5">
                ඒකාබද්ධ සේවා සිතියම — ප්‍රධාන පාරවල් සහ අතුරු පාරවල්
              </h4>
              <p class="text-[11px] sm:text-xs text-slate-600 font-medium">
                St. Clare Rd · St Rita Ave · Kurusawala Rd · Ja-ela - Ganemulla Rd · Aweriyawattha Rd · Wela Mada Rd · St.Mary's Rd
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-1.5 shrink-0">
              <button type="button" onclick="window.FridayTerritoryMaps.copyAll()"
                class="px-2.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs transition">
                📋 Copy
              </button>
              <button type="button" onclick="window.FridayTerritoryMaps.shareAll()"
                class="px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition">
                WhatsApp
              </button>
              <a href="${COMBINED_MAP_URL}" target="_blank" rel="noopener"
                class="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs transition">
                South Maps ↗
              </a>
              <a href="${NORTH_MAP_URL}" target="_blank" rel="noopener"
                class="px-2.5 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold shadow-2xs transition">
                North Maps ↗
              </a>
            </div>
          </div>

          <div class="pt-2.5 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="text-[11px] font-bold text-slate-700">
              📍 ළඟම ප්‍රධාන පාර: <span class="text-slate-900 font-black">${nearest.name}</span> (${nearest.distFromMeetingM} m)
            </div>
            <div class="flex items-center gap-2 min-w-[180px]">
              <span id="fri-progress-combined" class="text-[11px] font-black text-emerald-700 whitespace-nowrap">✓ සම්පූර්ණයි: 0 / ${totalMain + totalSub}</span>
              <div class="flex-1 h-2 rounded-full bg-white/90 border border-slate-200 overflow-hidden min-w-[70px]">
                <div id="fri-progress-bar-combined" class="h-full bg-emerald-500 transition-all duration-300" style="width: 0%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Single Unified Interactive Map -->
        <div id="fri-map-wrapper-combined" class="relative isolate z-0 bg-slate-100 border-b border-slate-200 overflow-hidden flex flex-col">
          <div id="fri-leaflet-map-combined" class="w-full h-[400px] sm:h-[490px] z-10"></div>

          <!-- Floating Map Controls -->
          <div class="absolute top-2.5 right-2.5 z-[400] flex flex-wrap items-center justify-end gap-1.5 max-w-[85%]">
            <button type="button" id="fri-layer-btn-combined" onclick="window.FridayTerritoryMaps.toggleLayer()"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md backdrop-blur-xs transition">
              🛰️ Satellite
            </button>
            <button type="button" id="fri-fullscreen-btn" onclick="window.FridayTerritoryMaps.toggleFullScreen()"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md backdrop-blur-xs transition">
              ⛶ Fullscreen
            </button>
            <button type="button" onclick="window.FridayTerritoryMaps.fitZone('all')"
              class="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-300 text-[11px] font-extrabold shadow-md backdrop-blur-xs transition">
              🎯 Fit All
            </button>
            <button type="button" onclick="window.FridayTerritoryMaps.fitZone('wp0973')"
              class="px-2 py-1.5 rounded-xl bg-blue-600/95 hover:bg-blue-700 text-white text-[11px] font-extrabold shadow-md transition">
              0973
            </button>
            <button type="button" onclick="window.FridayTerritoryMaps.fitZone('wp0974')"
              class="px-2 py-1.5 rounded-xl bg-emerald-600/95 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-md transition">
              0974
            </button>
            <button type="button" onclick="window.FridayTerritoryMaps.fitZone('north')"
              class="px-2 py-1.5 rounded-xl bg-violet-600/95 hover:bg-violet-700 text-white text-[11px] font-extrabold shadow-md transition">
              North
            </button>
          </div>

          <div class="px-3 py-2 bg-slate-900/95 text-white text-[10px] sm:text-[11px] font-semibold flex flex-wrap items-center justify-between gap-1.5">
            <span>🏠 කොළ සලකුණ = සහෝ. චමින්දගේ නිවස · 📷 1–${totalMain} = ප්‍රධාන පාරවල් ආරම්භ වන ස්ථානයේ ඡායාරූප</span>
            <span class="text-blue-200">ප්‍රධාන පාරක් click කර අතුරු පාරවල් & ඡායාරූප බලන්න</span>
          </div>
        </div>

        <!-- Hierarchical Main Roads List (Sub-roads Nested Under Each Main Road) -->
        <div class="p-4 sm:p-5 flex flex-col gap-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h5 class="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
              <span>🛣️ ප්‍රධාන පාරවල් පමණයි (දුර අනුව)</span>
              <span class="text-[11px] font-semibold text-slate-500">— අතුරු පාරවල් ඒ යටතේ</span>
            </h5>
            <div class="flex flex-wrap items-center gap-1.5">
              <div class="inline-flex flex-wrap p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px]">
                <button type="button" id="fri-flt-combined-all" onclick="window.FridayTerritoryMaps.setFilter('all')"
                  class="px-2.5 py-1 rounded-lg bg-white text-slate-900 shadow-2xs font-extrabold transition">සියල්ල</button>
                <button type="button" id="fri-flt-combined-wp0973" onclick="window.FridayTerritoryMaps.setFilter('wp0973')"
                  class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 font-bold transition">WP-0973</button>
                <button type="button" id="fri-flt-combined-wp0974" onclick="window.FridayTerritoryMaps.setFilter('wp0974')"
                  class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 font-bold transition">WP-0974</button>
                <button type="button" id="fri-flt-combined-north" onclick="window.FridayTerritoryMaps.setFilter('north')"
                  class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 font-bold transition">North</button>
                <button type="button" id="fri-flt-combined-pending" onclick="window.FridayTerritoryMaps.setFilter('pending')"
                  class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 font-bold transition">ඉතිරි</button>
              </div>
              <button type="button" id="fri-expand-all-btn" onclick="window.FridayTerritoryMaps.toggleExpandAll()"
                class="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-extrabold transition">
                ▾ සියලු අතුරු පාරවල්
              </button>
            </div>
          </div>

          <div id="fri-road-list-combined" class="space-y-3"></div>
        </div>
      </article>
    `;

    updateFilterButtons();
    renderMainRoadsList();
    setTimeout(() => {
      initUnifiedMap();
    }, 30);
  }

  function focusMainRoad(roadId, opts = {}) {
    const road = MAIN_ROADS.find(r => r.id === roadId);
    if (!road) return;

    selectedMainId = roadId;
    selectedSubId = null;
    expandedState[roadId] = true; // Auto-expand sub-roads directly under selected Main Road

    renderMainRoadsList();
    refreshMapVisuals();

    if (opts.scrollList) {
      const rowEl = document.getElementById(`road-row-${roadId}`);
      if (rowEl) {
        rowEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } else {
      const mapEl = document.getElementById("fri-leaflet-map-combined");
      if (mapEl) {
        const rect = mapEl.getBoundingClientRect();
        if (rect.top < 84 || rect.bottom > global.innerHeight) {
          const y = rect.top + global.scrollY - 90;
          global.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      }
    }

    if (!mapState || !mapState.mainLayers[roadId] || typeof global.L === "undefined") return;
    const item = mapState.mainLayers[roadId];
    drawConnectorTo(road.startCoords, road.color);

    if (!opts.skipMapFit) {
      const bounds = global.L.latLngBounds([]);
      road.segments.forEach(seg => seg.forEach(pt => bounds.extend(pt)));
      road.subRoads.forEach(sub => sub.segments.forEach(seg => seg.forEach(pt => bounds.extend(pt))));
      bounds.extend(MEETING_PLACE.coords);
      mapState.map.fitBounds(bounds, { paddingTopLeft: [32, 160], paddingBottomRight: [32, 32], maxZoom: 18, animate: false });
    }
    setTimeout(() => item.startMarker.openPopup(), 40);
  }

  function focusSubRoad(mainId, subId, opts = {}) {
    const mainRoad = MAIN_ROADS.find(r => r.id === mainId);
    const subRoad = mainRoad && mainRoad.subRoads.find(s => s.id === subId);
    if (!mainRoad || !subRoad) return;

    selectedMainId = mainId;
    selectedSubId = subId;
    expandedState[mainId] = true;

    renderMainRoadsList();
    refreshMapVisuals();

    if (opts.scrollList) {
      const rowEl = document.getElementById(`road-row-${subId}`);
      if (rowEl) rowEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      const mapEl = document.getElementById("fri-leaflet-map-combined");
      if (mapEl) {
        const rect = mapEl.getBoundingClientRect();
        if (rect.top < 84 || rect.bottom > global.innerHeight) {
          const y = rect.top + global.scrollY - 90;
          global.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      }
    }

    if (!mapState || !mapState.subLayers[subId] || typeof global.L === "undefined") return;
    const sEntry = mapState.subLayers[subId];
    drawConnectorTo(subRoad.entry, subRoad.color);

    if (!opts.skipMapFit) {
      const bounds = global.L.latLngBounds([]);
      subRoad.segments.forEach(seg => seg.forEach(pt => bounds.extend(pt)));
      bounds.extend(MEETING_PLACE.coords);
      mapState.map.fitBounds(bounds, { paddingTopLeft: [32, 150], paddingBottomRight: [32, 32], maxZoom: 18, animate: false });
    }
    const midPt = subRoad.segments[0][Math.floor(subRoad.segments[0].length / 2)];
    setTimeout(() => {
      sEntry.lineList[0] && sEntry.lineList[0].openPopup(midPt);
    }, 40);
  }

  global.FridayTerritoryMaps = {
    CARDS: [
      { key: "wp0973", code: ZONES.wp0973.code, zoneTitle: ZONES.wp0973.title, mapUrl: COMBINED_MAP_URL },
      { key: "wp0974", code: ZONES.wp0974.code, zoneTitle: ZONES.wp0974.title, mapUrl: COMBINED_MAP_URL },
      { key: "north", code: ZONES.north.code, zoneTitle: ZONES.north.title, mapUrl: NORTH_MAP_URL }
    ],
    ZONES,
    MAIN_ROADS,
    MEETING_PLACE,
    renderInto,
    focusMainRoad,
    focusSubRoad,
    toggleExpand(roadId) {
      expandedState[roadId] = !expandedState[roadId];
      renderMainRoadsList();
    },
    toggleExpandAll() {
      allExpanded = !allExpanded;
      MAIN_ROADS.forEach(r => {
        expandedState[r.id] = allExpanded;
      });
      updateFilterButtons();
      renderMainRoadsList();
    },
    toggleFullScreen() {
      const wrapper = document.getElementById("fri-map-wrapper-combined") || document.getElementById("fri-leaflet-map-combined");
      if (!wrapper) return;
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (!fsEl) {
        const req = wrapper.requestFullscreen || wrapper.webkitRequestFullscreen;
        if (req) req.call(wrapper);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) exit.call(document);
      }
    },
    fitZone(zoneKey) {
      if (!mapState) return;
      mapState.connectorGroup.clearLayers();
      mapState.map.closePopup();
      if (zoneKey === "wp0973" || zoneKey === "wp0974" || zoneKey === "north") {
        activeFilter = zoneKey;
        updateFilterButtons();
        renderMainRoadsList();
        refreshMapVisuals();
        const bounds = mapState.zonePolys[zoneKey].getBounds().extend(MEETING_PLACE.coords);
        mapState.map.fitBounds(bounds, { padding: [26, 26] });
      } else {
        selectedMainId = null;
        selectedSubId = null;
        activeFilter = "all";
        updateFilterButtons();
        renderMainRoadsList();
        refreshMapVisuals();
        mapState.map.fitBounds(mapState.allBounds, { padding: [24, 24] });
      }
    },
    toggleLayer() {
      if (!mapState) return;
      const btn = document.getElementById("fri-layer-btn-combined");
      if (mapState.isSat) {
        mapState.map.removeLayer(mapState.satLayer);
        mapState.streetLayer.addTo(mapState.map);
        mapState.isSat = false;
        if (btn) btn.textContent = "🛰️ Satellite";
      } else {
        mapState.map.removeLayer(mapState.streetLayer);
        mapState.satLayer.addTo(mapState.map);
        mapState.isSat = true;
        if (btn) btn.textContent = "🗺️ Street";
      }
    },
    setFilter(mode) {
      activeFilter = mode;
      updateFilterButtons();
      renderMainRoadsList();
      refreshMapVisuals();
      if (mapState && (mode === "wp0973" || mode === "wp0974" || mode === "north")) {
        const bounds = mapState.zonePolys[mode].getBounds().extend(MEETING_PLACE.coords);
        mapState.map.fitBounds(bounds, { padding: [26, 26] });
      } else if (mapState && mode === "all") {
        mapState.map.fitBounds(mapState.allBounds, { padding: [24, 24] });
      }
    },
    toggleMainDone(roadId) {
      const doneMap = loadDoneMap();
      if (doneMap[roadId]) {
        delete doneMap[roadId];
        notifyHost("Main road marked as pending");
      } else {
        doneMap[roadId] = true;
        notifyHost("Main road marked as completed ✓");
      }
      saveDoneMap(doneMap);
      renderMainRoadsList();
      refreshMapVisuals();
    },
    toggleSubDone(mainId, subId) {
      const doneMap = loadDoneMap();
      if (doneMap[subId]) {
        delete doneMap[subId];
        notifyHost("Sub-road marked as pending");
      } else {
        doneMap[subId] = true;
        notifyHost("Sub-road marked as completed ✓");
      }
      saveDoneMap(doneMap);
      renderMainRoadsList();
      refreshMapVisuals();
    },
    openMainPhoto(roadId) {
      const road = MAIN_ROADS.find(r => r.id === roadId);
      if (!road) return;
      openImageModal(
        `${road.name} — ආරම්භක ස්ථානය`,
        road.siName,
        road.startImage,
        road.startImageCaption,
        road.startCoords,
        road.streetViewUrl,
        road.zoneLabel
      );
    },
    openSubPhoto(mainId, subId) {
      const road = MAIN_ROADS.find(r => r.id === mainId);
      const sub = road && road.subRoads.find(s => s.id === subId);
      if (!sub || !sub.photo) return;
      openImageModal(
        sub.name,
        sub.siName,
        sub.photo,
        sub.photoCaption || sub.landmark,
        sub.entry,
        MEETING_PLACE.url,
        sub.zoneLabel
      );
    },
    openMeetingPhoto() {
      openImageModal(
        MEETING_PLACE.name,
        "Friday Morning Meeting Place (St. Clare Rd)",
        MEETING_PLACE.image,
        MEETING_PLACE.caption,
        MEETING_PLACE.coords,
        MEETING_PLACE.url,
        "Meeting Place"
      );
    },
    closeImageModal,
    copyAll() {
      navigator.clipboard.writeText(formatSummaryText()).then(() => {
        notifyHost("WP-0973 & WP-0974 main roads copied!");
      });
    },
    shareAll() {
      const url = `https://wa.me/?text=${encodeURIComponent(formatSummaryText())}`;
      global.open(url, "_blank");
    },
    scrollToCard(code) {
      const cardEl = document.getElementById("territory-card-combined");
      if (!cardEl) return false;
      const normalized = String(code || "").replace(/\s+/g, "").toLowerCase();
      if (normalized.includes("0973")) {
        this.setFilter("wp0973");
      } else if (normalized.includes("0974")) {
        this.setFilter("wp0974");
      } else if (normalized.includes("maeliya") || normalized.includes("north")) {
        this.setFilter("north");
      }
      const y = cardEl.getBoundingClientRect().top + global.scrollY - 84;
      global.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      return true;
    }
  };

  function handleFullscreenChange() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const isFs = fsEl && (fsEl.id === "fri-map-wrapper-combined" || fsEl.id === "fri-leaflet-map-combined");
    const btn = document.getElementById("fri-fullscreen-btn");
    const mapEl = document.getElementById("fri-leaflet-map-combined");
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

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
})(window);
