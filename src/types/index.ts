export type AlertSeverity = 'CRIT' | 'WARN' | 'WATCH' | 'NOM';

export type RoleType = 'REGIONAL' | 'DISTRICT' | 'FIELD' | 'ADMIN';

export interface SectorInfo {
  id: string;
  code: string;
  name: string;
  subName: string;
  state: string;
  district: string;
  corridor: string;
  lat: number;
  lng: number;
  elevation: number;
  status: AlertSeverity;
  breachIndex: number;
  breachTrend: string;
  porePressure: number; // kPa
  displacementRate: number; // mm/h or mm/24h
  fos: number; // Factor of Safety
  rainfall24h: number; // mm
  populationAtRisk: number;
  relocatedCount: number;
  discharge: number; // m3/s
  commander: string;
  faultLine: string;
  coordinatesFormatted: string;
  cameraRef?: string;
}

export interface TelemetryStreamEvent {
  id: string;
  sev: 'CRIT' | 'WARN' | 'NOM';
  timestamp: string;
  district: string;
  hazardVector: string;
  criticalMetrics: string;
  aiConfidence: string;
  sectorId: string;
  model: string;
}

export interface ChronoLogEntry {
  id: string;
  timestamp: string;
  title: string;
  body: string;
  severity: 'CRIT' | 'WARN' | 'INFO';
  author?: string;
}

export interface DispatchUnit {
  id: string;
  name: string;
  desc: string;
  actionLabel: string;
  type: 'sdrf' | 'command' | 'earthmover' | 'broadcast';
  status: 'READY' | 'DISPATCHED' | 'DEPLOYED' | 'ARMED' | 'CONNECTED';
  eta?: string;
  personnel?: string;
  assets?: string;
}

export interface FieldReport {
  id: string;
  timestamp: string;
  reporterName: string;
  reporterPhone?: string;
  locationName: string;
  coords: { lat: number; lng: number };
  elevation: number;
  hazardType: 'Tension Crack' | 'Active Rockfall' | 'Debris Washout' | 'Road Slump' | 'River Damming' | 'Water Seepage';
  severityEstimate: 'Minor' | 'Moderate' | 'Severe' | 'Critical Failure';
  description: string;
  imageUrl?: string;
  syncStatus: 'SYNCED' | 'PENDING_SYNC' | 'FAILED';
  verificationStatus: 'RECEIVED' | 'UNDER_REVIEW' | 'VERIFIED' | 'DISMISSED';
  verifiedBy?: string;
}

export interface BroadcastLog {
  id: string;
  timestamp: string;
  sectorName: string;
  headline: string;
  languages: string[];
  channels: string[];
  audienceCount: number;
  authorizedBy: string;
  authCode: string;
  status: 'SENT' | 'QUEUED' | 'TRANSMITTING';
}

export interface PredictivePrediction {
  sectorId: string;
  sectorName: string;
  horizon: '3h' | '6h' | '24h' | '72h';
  probability: number;
  rainfallAccumulationForecast: number;
  projectedFoS: number;
  keyDrivers: { feature: string; impact: number }[];
}
