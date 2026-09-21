import { SectorInfo, TelemetryStreamEvent, ChronoLogEntry, DispatchUnit, FieldReport, BroadcastLog } from '../types';

export const INITIAL_SECTORS: SectorInfo[] = [
  {
    id: 'SK-01',
    code: 'SK-PK-004',
    name: 'East Sikkim // Pakyong — Teesta Basin Sector (NH-10)',
    subName: 'NH-10 Km 42-49 Teesta Valley Corridor Critical Segment',
    state: 'Sikkim',
    district: 'Pakyong',
    corridor: 'NH-10 Teesta Corridor',
    lat: 27.3257,
    lng: 88.6122,
    elevation: 1430,
    status: 'CRIT',
    breachIndex: 96.8,
    breachTrend: '+22.4% / 3h',
    porePressure: 342,
    displacementRate: 18.4,
    fos: 0.88,
    rainfall24h: 168.4,
    populationAtRisk: 34280,
    relocatedCount: 12410,
    discharge: 4810,
    commander: 'COL. R.K. CHETRI (SDRF-NER)',
    faultLine: 'MAIN BOUNDARY THRUST (MBT) FAULT LINE',
    coordinatesFormatted: '27.3257° N, 88.6122° E',
    cameraRef: 'CAM-04 // TEESTA BLUFF PTZ-N'
  },
  {
    id: 'AS-04',
    code: 'AS-DH-012',
    name: 'Dima Hasao // Haflong — Jatinga Valley (NH-27)',
    subName: 'NH-27 Km 88-102 Jatinga Slip Zone',
    state: 'Assam',
    district: 'Dima Hasao',
    corridor: 'NH-27 Jatinga Cut',
    lat: 25.1798,
    lng: 93.0275,
    elevation: 680,
    status: 'CRIT',
    breachIndex: 91.4,
    breachTrend: '+18.1% / 3h',
    porePressure: 288,
    displacementRate: 12.1,
    fos: 0.94,
    rainfall24h: 142.2,
    populationAtRisk: 18450,
    relocatedCount: 7200,
    discharge: 2950,
    commander: 'MAJ. P. SAIKIA (SDRF-ASSAM)',
    faultLine: 'DAUKI FAULT ZONE SYSTEM',
    coordinatesFormatted: '25.1798° N, 93.0275° E',
    cameraRef: 'CAM-09 // HAFLONG SUMMIT RIG'
  },
  {
    id: 'NL-02',
    code: 'NL-KH-008',
    name: 'Kohima // Zubza — Dzüna Basin (NH-29)',
    subName: 'NH-29 Km 14-22 Zubza Bypass Slump Segment',
    state: 'Nagaland',
    district: 'Kohima',
    corridor: 'NH-29 Kohima Zubza',
    lat: 25.6751,
    lng: 94.1086,
    elevation: 1444,
    status: 'WARN',
    breachIndex: 74.2,
    breachTrend: '+8.9% / 6h',
    porePressure: 210,
    displacementRate: 8.4,
    fos: 1.14,
    rainfall24h: 98.6,
    populationAtRisk: 12100,
    relocatedCount: 3800,
    discharge: 1420,
    commander: 'INSP. T. AO (NDRF 12TH BN)',
    faultLine: 'NAGA THRUST SHEAR BELT',
    coordinatesFormatted: '25.6751° N, 94.1086° E'
  },
  {
    id: 'ML-02',
    code: 'ML-EK-003',
    name: 'East Khasi Hills // Sohra Escarpment Corridor',
    subName: 'SH-5 Sohra-Mawsmai Escarpment Rim',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    corridor: 'Sohra Escarpment Pass',
    lat: 25.2986,
    lng: 91.7330,
    elevation: 1430,
    status: 'WARN',
    breachIndex: 68.5,
    breachTrend: '+5.2% / 6h',
    porePressure: 195,
    displacementRate: 6.2,
    fos: 1.28,
    rainfall24h: 212.0,
    populationAtRisk: 8400,
    relocatedCount: 1900,
    discharge: 3100,
    commander: 'CAPT. B. LYNGDOH (SDRF-MEGHALAYA)',
    faultLine: 'SHILLONG PLATEAU BASAL SHEAR',
    coordinatesFormatted: '25.2986° N, 91.7330° E'
  },
  {
    id: 'AR-03',
    code: 'AR-WK-001',
    name: 'West Kameng // Sela Pass — BCT Road Spine',
    subName: 'Balipara-Charduar-Tawang (BCT) Km 64',
    state: 'Arunachal Pradesh',
    district: 'West Kameng',
    corridor: 'BCT Road Sela Pass',
    lat: 27.5028,
    lng: 92.1035,
    elevation: 3200,
    status: 'NOM',
    breachIndex: 12.4,
    breachTrend: '-1.1% / 24h',
    porePressure: 62,
    displacementRate: 0.2,
    fos: 2.45,
    rainfall24h: 18.2,
    populationAtRisk: 2200,
    relocatedCount: 0,
    discharge: 420,
    commander: 'COL. S. NEGI (BRO PROJECT VARTAK)',
    faultLine: 'MAIN CENTRAL THRUST (MCT-ARUNACHAL)',
    coordinatesFormatted: '27.5028° N, 92.1035° E'
  }
];

export const INITIAL_TELEMETRY_STREAM: TelemetryStreamEvent[] = [
  {
    id: 'EV-10492',
    sev: 'CRIT',
    timestamp: '2025-10-24 05:41:08',
    district: 'Pakyong, Sikkim • NH-10 Km 46.2',
    hazardVector: 'Rotational Bedrock Shear / Slope Failure',
    criticalMetrics: '+18.4 mm/h disp • 342 kPa pore',
    aiConfidence: '98.4% (Conv-Net v4)',
    sectorId: 'SK-01',
    model: 'Conv-Net v4'
  },
  {
    id: 'EV-10491',
    sev: 'CRIT',
    timestamp: '2025-10-24 05:39:42',
    district: 'Dima Hasao, Assam • NH-27 Jatinga Cut',
    hazardVector: 'Cloudburst Mudflow Debris Washout',
    criticalMetrics: '+12.1 mm/h disp • 288 kPa pore',
    aiConfidence: '96.7% (Conv-Net v4)',
    sectorId: 'AS-04',
    model: 'Conv-Net v4'
  },
  {
    id: 'EV-10490',
    sev: 'WARN',
    timestamp: '2025-10-24 05:37:11',
    district: 'Kohima, Nagaland • NH-29 Zubza Bypass',
    hazardVector: 'Creep Acceleration in Shale Stratum',
    criticalMetrics: '+8.4 mm/h disp • 210 kPa pore',
    aiConfidence: '91.2% (Conv-Net v4)',
    sectorId: 'NL-02',
    model: 'Conv-Net v4'
  },
  {
    id: 'EV-10489',
    sev: 'WARN',
    timestamp: '2025-10-24 05:35:55',
    district: 'East Khasi Hills, Meghalaya • Sohra Escarpment',
    hazardVector: 'Flash Pore Pressure Transmissivity Surge',
    criticalMetrics: '+6.2 mm/h disp • 195 kPa pore',
    aiConfidence: '89.8% (Conv-Net v4)',
    sectorId: 'ML-02',
    model: 'Conv-Net v4'
  },
  {
    id: 'EV-10488',
    sev: 'NOM',
    timestamp: '2025-10-24 05:32:00',
    district: 'West Kameng, Arunachal • BCT Road Sela Pass',
    hazardVector: 'Stable Rock Slope • Zero Acoustic Emissions',
    criticalMetrics: '+0.2 mm/h disp • 62 kPa pore',
    aiConfidence: '99.1% (Conv-Net v4)',
    sectorId: 'AR-03',
    model: 'Conv-Net v4'
  }
];

export const INITIAL_CHRONO_LOG: ChronoLogEntry[] = [
  {
    id: 'CL-01',
    timestamp: '05:41:02',
    title: 'CRITICAL SHEAR DISPLACEMENT',
    body: 'Tiltmeter TLT-MB-12 recorded 14.2mm lateral shift in past 60 mins. Colluvium layer breaching cohesion threshold.',
    severity: 'CRIT'
  },
  {
    id: 'CL-02',
    timestamp: '05:38:44',
    title: 'BRO EN-ROUTE KM 32.4',
    body: 'Task force unit departing Singtam base with crawler excavators and blasting clearing detachment.',
    severity: 'INFO'
  },
  {
    id: 'CL-03',
    timestamp: '05:30:19',
    title: 'IMD NOWCAST ADVISORY',
    body: 'Intense convective cloudburst cluster centered over Mangan/Pakyong perimeter. Rainfall rate up to 40mm/h expected until 08:00 IST.',
    severity: 'WARN'
  },
  {
    id: 'CL-04',
    timestamp: '05:15:00',
    title: 'SECTOR ALERT STATUS ELEVATED',
    body: 'NDMA-SDRF escalation code upgraded from LEVEL 3 WATCH to LEVEL 4 SEVERE WATCH.',
    severity: 'CRIT'
  }
];

export const INITIAL_DISPATCH_UNITS: DispatchUnit[] = [
  {
    id: 'U-SDRF-12',
    name: '12-BN SDRF GANGTOK',
    desc: 'Search & Rescue // 38 Troopers // ETA: 45m',
    actionLabel: 'DISPATCH',
    type: 'sdrf',
    status: 'READY',
    eta: '45m',
    personnel: '38 Troopers'
  },
  {
    id: 'U-DM-PAK',
    name: 'DM CONTROL ROOM PAKYONG',
    desc: 'Incident Command Post // On-Air Comm',
    actionLabel: 'CONNECT',
    type: 'command',
    status: 'READY'
  },
  {
    id: 'U-BRO-SWA',
    name: 'BRO PROJECT SWASTIK',
    desc: 'Heavy Earthmovers (3x JCB) // KM 26 Staging',
    actionLabel: 'DEPLOY',
    type: 'earthmover',
    status: 'READY',
    assets: '3x JCB, 2x Wheel Loaders'
  },
  {
    id: 'U-CAP-BC',
    name: 'CAP-CP CELL BROADCAST',
    desc: 'Geofenced SMS Alert // Reach: 14,200 Civilians',
    actionLabel: 'ARM MSG',
    type: 'broadcast',
    status: 'READY'
  }
];

export const INITIAL_FIELD_REPORTS: FieldReport[] = [
  {
    id: 'REP-NER-849',
    timestamp: '05:22 IST',
    reporterName: 'Tashi Tshering Bhutia',
    reporterPhone: '+91 94340 XXXXX',
    locationName: 'Pakyong Lower Bazaar, NH-10 Slope',
    coords: { lat: 27.329, lng: 88.618 },
    elevation: 1410,
    hazardType: 'Tension Crack',
    severityEstimate: 'Severe',
    description: 'Fresh 8cm ground crack opening across the terrace paddy fields just above 4 residential houses. Muddy water bubbling out of the crack.',
    syncStatus: 'SYNCED',
    verificationStatus: 'UNDER_REVIEW'
  },
  {
    id: 'REP-NER-848',
    timestamp: '04:58 IST',
    reporterName: 'Biren Gogoi (Field Ranger)',
    reporterPhone: '+91 98640 XXXXX',
    locationName: 'Jatinga Lamp Road Cut, Dima Hasao',
    coords: { lat: 25.185, lng: 93.031 },
    elevation: 695,
    hazardType: 'Debris Washout',
    severityEstimate: 'Critical Failure',
    description: 'Sludge and broken boulders sliding across culvert 14. Road half collapsed into the gorge. Electric poles tilted 30 degrees.',
    syncStatus: 'SYNCED',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'HQ-DUTY-OFFICER-02'
  }
];

export const INITIAL_BROADCAST_LOGS: BroadcastLog[] = [
  {
    id: 'BC-2025-091',
    timestamp: '05:16:30 IST',
    sectorName: 'East Sikkim // Pakyong Teesta Basin',
    headline: 'CRITICAL LANDSLIDE EVACUATION ADVISORY',
    languages: ['EN', 'NEPALI', 'HINDI'],
    channels: ['GSM-51 Cell Broadcast', 'Sirens Grid', 'SMS'],
    audienceCount: 14200,
    authorizedBy: 'COL. R.K. CHETRI (SDRF)',
    authCode: 'SEC-NER-4921',
    status: 'SENT'
  }
];

// Multilingual CAP-CP Emergency alert templates
export const MULTILINGUAL_ALERT_TEMPLATES: Record<string, { title: string; body: string; voiceSample: string }> = {
  English: {
    title: 'CRITICAL LANDSLIDE EVACUATION NOTICE',
    body: 'IMMEDIATE EVACUATION ORDER for Teesta Valley / NH-10 corridor (Km 42-49). Soil saturation breach detected. Move to higher ground and designated shelters immediately. Avoid NH-10 highway.',
    voiceSample: 'Alert! Immediate evacuation required in Teesta corridor.'
  },
  Nepali: {
    title: 'पहिरोको गम्भीर खतरा - तुरुन्त स्थानान्तरण सूचना',
    body: 'टिस्टा उपत्यका / NH-10 करिडोर (किमी ४२-४९) का बासिन्दाहरूका लागि तत्काल स्थानान्तरण आदेश। माटोको संतृप्ति खतरनाक स्तरमा पुगेको छ। तुरुन्त सुरक्षित उच्च स्थान वा राहत शिविरमा जानुहोस्।',
    voiceSample: 'चेतावनी! टिस्टा उपत्यकाका बासिन्दा तुरुन्त सुरक्षित स्थानमा जानुहोस्।'
  },
  Assamese: {
    title: 'ভূপতনৰ জৰুৰী সতৰ্কবাৰ্তা - স্থান খালী কৰাৰ নিৰ্দেশ',
    body: 'তীস্তা উপত্যকা আৰু ৰাষ্ট্ৰীয় ঘাইপথ ১০ ৰ বাবে জৰুৰীকালীন সতৰ্কবাৰ্তা। অধিক বৃষ্টিপাত আৰু মাটি খহি পৰাৰ সম্ভাৱনা অতি প্ৰৱল। নিৰাপদ উচ্চ স্থানলৈ তৎকালীনভাৱে স্থানান্তৰিত হওক।',
    voiceSample: 'সতৰ্কবাৰ্তা! তৎকালীনভাৱে নিৰাপদ আশ্ৰয়স্থললৈ যাওক।'
  },
  Bengali: {
    title: 'মারাত্মক ভূমিধসের লাল সতর্কতা - অবিলম্বে নিরাপদ আশ্রয়ে যান',
    body: 'তিস্তা উপত্যকা / ১০ নম্বর জাতীয় সড়ক এলাকায় তীব্র ভূমিধসের আশঙ্কা। বিপদসীমা অতিক্রম করেছে ভূমির আর্দ্রতা। অবিলম্বে উঁচু জায়গায় আশ্রয় শিবিরে চলে যান।',
    voiceSample: 'লাল সতর্কতা! তিস্তা উপত্যকার বাসিন্দারা অবিলম্বে নিরাপদ আশ্রয়ে যান।'
  },
  Khasi: {
    title: 'KA JINGMAH BA RADAH - JINGPYNPEI NANGNE MAR-IAR',
    body: 'Ka hukum ban pynpei mardor na ki thain ba don harud ka Wah Teesta bad surok NH-10. Ka khyndew ka lah ban twa ha kano kano ka khyllipmat. Leit sha ki jaka ba shngain ba la pynkhreh.',
    voiceSample: 'Mah ba shyrkhei! Khie phet noh sha ki jaka ba shngain.'
  },
  Bodo: {
    title: 'हा खनायनि गिख्रंथाव हुसियार - थाबैनो जायगा गारनायनि बिथोन',
    body: 'तिस्ता सेर-फां आरो NH-10 लामा खण्डआव हा खनायनि खौरां मोननाय जादों। थाबैनो गोजौ जायगायाव थानाय आश्रयस्थानसिम थां।',
    voiceSample: 'हुसियार! थाबैनो गोजौ जायगासिम थां।'
  },
  Hindi: {
    title: 'गंभीर भूस्खलन चेतावनी - तत्काल सुरक्षित स्थान पर जाएं',
    body: 'तीस्ता घाटी / NH-10 कॉरिडोर (किमी 42-49) के लिए तत्काल निकासी आदेश जारी किया गया है। मिट्टी में पानी की मात्रा खतरनाक सीमा पार कर चुकी है। तुरंत उच्च स्थानों एवं राहत शिविरों में जाएं।',
    voiceSample: 'चेतावनी! तीस्ता कॉरिडोर से तुरंत सुरक्षित स्थान पर जाएं।'
  }
};
