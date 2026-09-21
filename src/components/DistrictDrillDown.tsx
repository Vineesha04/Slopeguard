import React, { useState, useEffect } from 'react';
import { 
  MapPin, Mountain, Radio, ShieldAlert, Video, RefreshCw, Send, 
  Layers, ArrowUpRight, Compass, AlertOctagon, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { SectorInfo, ChronoLogEntry, DispatchUnit } from '../types';
import { playTacticalClick, playTacticalConfirm, playDefconAlarm } from '../utils/audio';

interface DistrictDrillDownProps {
  selectedSector: SectorInfo;
  allSectors: SectorInfo[];
  onSelectSector: (sectorId: string) => void;
  chronoLog: ChronoLogEntry[];
  onAddChronoEntry: (entry: Omit<ChronoLogEntry, 'id'>) => void;
  dispatchUnits: DispatchUnit[];
  onUpdateUnitStatus: (unitId: string, status: DispatchUnit['status']) => void;
  onOpenEvacModal: () => void;
}

export const DistrictDrillDown: React.FC<DistrictDrillDownProps> = ({
  selectedSector,
  allSectors,
  onSelectSector,
  chronoLog,
  onAddChronoEntry,
  dispatchUnits,
  onUpdateUnitStatus,
  onOpenEvacModal,
}) => {
  const [safetyEngaged, setSafetyEngaged] = useState<boolean>(true);
  const [logFilter, setLogFilter] = useState<string>('ALL');
  const [cameraScanline, setCameraScanline] = useState<number>(0);

  // Animate camera scanline
  useEffect(() => {
    const interval = setInterval(() => {
      setCameraScanline(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleManualEvacClick = () => {
    if (!safetyEngaged) return;
    playDefconAlarm();
    onOpenEvacModal();
  };

  const handleUnitAction = (unit: DispatchUnit) => {
    playTacticalClick();
    if (unit.status === 'READY') {
      const nextStatus = unit.type === 'sdrf' ? 'DISPATCHED' : unit.type === 'command' ? 'CONNECTED' : unit.type === 'earthmover' ? 'DEPLOYED' : 'ARMED';
      onUpdateUnitStatus(unit.id, nextStatus as DispatchUnit['status']);
      playTacticalConfirm();
      onAddChronoEntry({
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        title: `${unit.name} ${nextStatus}`,
        body: `Tactical operational order executed by Incident Commander. Assets mobilized to ${selectedSector.corridor}.`,
        severity: 'INFO',
        author: 'IC: COL. R.K. CHETRI'
      });
    }
  };

  return (
    <div className="space-y-3 font-sans pb-8">
      {/* Top Sector Header Banner */}
      <div className="bg-[#141A24] border border-[#1F2733] rounded overflow-hidden">
        {/* Severe Watch Alert Ribbon */}
        <div className="bg-[#E85D5D] px-3 py-1 text-[11px] font-mono font-bold tracking-widest text-[#0A0E14] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#0A0E14] animate-ping" />
            <span>LEVEL 4 SEVERE // EVACUATION WATCH</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px]">
            <span>INCIDENT COMMAND POST ACTIVE</span>
            <div className="relative">
              <select
                value={selectedSector.id}
                onChange={(e) => {
                  playTacticalClick();
                  onSelectSector(e.target.value);
                }}
                aria-label="Select Monitored Sector"
                className="bg-[#0A0E14] text-[#E8ECF1] text-[10px] font-mono px-2 py-0.5 rounded border border-[#1F2733] cursor-pointer outline-none"
              >
                {allSectors.map(s => (
                  <option key={s.id} value={s.id}>
                    SWITCH SECTOR: {s.name.split('//')[0].trim()} ({s.status})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sector Metadata & Manual Evac Button Bar */}
        <div className="p-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-[#E8ECF1] font-mono tracking-wide uppercase">
                {selectedSector.name}
              </h2>
              <span className="text-[10px] font-mono text-[#5B6577]">
                | STATION REF: {selectedSector.code}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#8B95A5] mt-1.5">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#3FA9F5]" />
                <span>{selectedSector.coordinatesFormatted}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mountain className="w-3 h-3 text-[#3FA9F5]" />
                <span>ELEV: {selectedSector.elevation}m MSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[#E85D5D] font-bold">TOPO VECTOR:</span>
                <span className="text-[#E8ECF1]">{selectedSector.faultLine}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Radio className="w-3 h-3 text-[#3DDC97]" />
                <span className="text-[#3DDC97]">CAP-CP TOWER GRID: 99.4% ARMED</span>
              </div>
              <div className="text-[#8B95A5]">
                IC: <strong className="text-[#E8ECF1]">{selectedSector.commander}</strong>
              </div>
            </div>
          </div>

          {/* Manual Evacuation Control Action */}
          <div className="flex items-center space-x-3 bg-[#0D1219] p-2 rounded border border-[#1F2733]">
            <div className="flex items-center space-x-2">
              <div className="text-right font-mono text-[9px] text-[#8B95A5]">
                <div>SAFETY: ENGAGED</div>
                <div className="text-[8px] text-[#5B6577]">2-STEP AUTH</div>
              </div>
              <button
                onClick={() => {
                  playTacticalClick();
                  setSafetyEngaged(!safetyEngaged);
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                  safetyEngaged ? 'bg-[#E85D5D] justify-end' : 'bg-[#1F2733] justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <button
              onClick={handleManualEvacClick}
              disabled={!safetyEngaged}
              className={`px-4 py-2 rounded font-display font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all ${
                safetyEngaged
                  ? 'bg-[#A85D5D] hover:bg-[#B86B6B] text-[#FFFFFF] shadow-md cursor-pointer'
                  : 'bg-[#1F2733] text-[#5B6577] cursor-not-allowed'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>ISSUE MANUAL EVACUATION</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Telemetry Cards on Left + Camera Feed on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Stack (8 Cols): Sensor Telemetry Cards */}
        <div className="lg:col-span-8 space-y-3">
          {/* Row of 3 Sensor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card 1: Soil Volumetric Water (VWC) */}
            <div className="bg-[#141A24] border border-[#1F2733] rounded p-3 relative flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-[#8B95A5]">
                  SNS-VWC-04 // PAKYONG
                </span>
                <span className="px-1.5 py-0.2 text-[8px] font-mono font-bold bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/50 rounded">
                  LIQUEFACTION RISK
                </span>
              </div>

              <div className="my-1.5">
                <div className="text-[11px] font-mono font-bold text-[#E8ECF1]">
                  Soil Volumetric Water (VWC)
                </div>
                <div className="flex items-baseline space-x-1 mt-1">
                  <span className="text-3xl font-extrabold font-mono text-[#E8ECF1]">52.4%</span>
                  <span className="text-[10px] font-mono text-[#8B95A5]">@ 0.5m</span>
                  <span className="text-[10px] font-mono font-bold text-[#E85D5D] ml-auto">+16.8% / 6h</span>
                </div>
              </div>

              {/* Stratum breakdown */}
              <div className="space-y-1.5 text-[8.5px] font-mono mt-1 border-t border-[#1F2733] pt-1.5">
                <div>
                  <div className="flex justify-between text-[#8B95A5]">
                    <span>0.5m STRATUM (COLLUVIUM)</span>
                    <span className="text-[#E85D5D] font-bold">52.4% (CRIT)</span>
                  </div>
                  <div className="w-full bg-[#0A0E14] h-1 rounded overflow-hidden mt-0.5">
                    <div className="bg-[#E85D5D] h-full rounded" style={{ width: '82%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#8B95A5]">
                    <span>1.5m STRATUM (SILT-CLAY)</span>
                    <span className="text-[#E8A33D] font-bold">48.2% (WARN)</span>
                  </div>
                  <div className="w-full bg-[#0A0E14] h-1 rounded overflow-hidden mt-0.5">
                    <div className="bg-[#E8A33D] h-full rounded" style={{ width: '65%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#8B95A5]">
                    <span>3.0m STRATUM (BEDROCK BOUND)</span>
                    <span className="text-[#3DDC97] font-bold">41.0% (NORM)</span>
                  </div>
                  <div className="w-full bg-[#0A0E14] h-1 rounded overflow-hidden mt-0.5">
                    <div className="bg-[#3DDC97] h-full rounded" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>

              {/* 12h Hysteresis drift sparkline */}
              <div className="mt-2 pt-1 border-t border-[#1F2733]">
                <div className="flex justify-between text-[8px] font-mono text-[#8B95A5]">
                  <span>12H HYSTERESIS DRIFT</span>
                  <span className="text-[#E85D5D]">SATURATION PT: 45.0%</span>
                </div>
                <svg viewBox="0 0 100 20" className="w-full h-5 mt-0.5">
                  <line x1="0" y1="12" x2="100" y2="12" stroke="#5B6577" strokeDasharray="2,2" strokeWidth="0.5" />
                  <path d="M 0,16 Q 30,15 60,11 T 100,4" fill="none" stroke="#FF6B6B" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Card 2: Displacement & Factor of Safety */}
            <div className="bg-[#141A24] border border-[#1F2733] rounded p-3 relative flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-[#8B95A5]">
                  TLT-MB-12 // FAULT RIG
                </span>
                <span className="px-1.5 py-0.2 text-[8px] font-mono font-bold bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/50 rounded">
                  ACTIVE SLIP
                </span>
              </div>

              <div className="my-1.5">
                <div className="text-[11px] font-mono font-bold text-[#E8ECF1]">
                  Displacement & Factor of Safety
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <div>
                    <span className="text-3xl font-extrabold font-mono text-[#E8ECF1]">
                      +{selectedSector.displacementRate}
                    </span>
                    <span className="text-[10px] font-mono text-[#8B95A5] ml-1">mm/24h</span>
                  </div>

                  <div className="text-right">
                    <div className="text-[8px] font-mono text-[#8B95A5]">FACTOR OF SAFETY</div>
                    <div className="text-xl font-bold font-mono text-[#E85D5D]">
                      {selectedSector.fos.toFixed(2)} FoS
                    </div>
                  </div>
                </div>
              </div>

              {/* Slope Dip Angle & Status */}
              <div className="flex items-center justify-between text-[8.5px] font-mono bg-[#0D1219] p-1.5 rounded border border-[#1F2733]">
                <div className="flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#3FA9F5]" />
                  <div>
                    <div className="text-[#8B95A5]">SLOPE DIP ANGLE</div>
                    <div className="text-[#E8ECF1] font-bold">42.0° EAST-ASPECT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[7.5px] text-[#8B95A5]">CRITICAL THRESHOLD</div>
                  <div className="text-[#E85D5D] font-bold">&lt; 1.00 UNSTABLE</div>
                </div>
              </div>

              {/* Geophone Acoustic Bursts Histogram */}
              <div className="mt-2 pt-1 border-t border-[#1F2733]">
                <div className="flex justify-between text-[8px] font-mono text-[#8B95A5] mb-1">
                  <span>GEOPHONE ACOUSTIC BURSTS</span>
                  <span className="text-[#3FA9F5]">94 ev/min [FREQ: 4.8kHz]</span>
                </div>
                <div className="grid grid-cols-12 gap-0.5 items-end h-6 bg-[#0A0E14] p-0.5 rounded">
                  {[15, 20, 25, 30, 45, 40, 55, 60, 85, 75, 95, 90].map((h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-xs transition-all ${
                        h > 70 ? 'bg-[#E85D5D]' : h > 40 ? 'bg-[#E8A33D]' : 'bg-[#3FA9F5]'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Precipitation & Inundation Trigger */}
            <div className="bg-[#141A24] border border-[#1F2733] rounded p-3 relative flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-[#8B95A5]">
                  AWS-PK-01 // IMD TEED
                </span>
                <span className="px-1.5 py-0.2 text-[8px] font-mono font-bold bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/50 rounded">
                  TRIGGER EXCEEDED
                </span>
              </div>

              <div className="my-1.5">
                <div className="text-[11px] font-mono font-bold text-[#E8ECF1]">
                  Precipitation & Inundation Trigger
                </div>
                <div className="flex items-baseline space-x-1 mt-1">
                  <span className="text-3xl font-extrabold font-mono text-[#E8ECF1]">
                    {selectedSector.rainfall24h}
                  </span>
                  <span className="text-[10px] font-mono text-[#8B95A5]">mm / 24h</span>
                  <span className="text-[10px] font-mono font-bold text-[#E85D5D] ml-auto">+48.3% vs IMD</span>
                </div>
              </div>

              {/* Threshold details */}
              <div className="space-y-1 text-[8.5px] font-mono border-t border-[#1F2733] pt-1.5">
                <div className="flex justify-between text-[#8B95A5]">
                  <span>PEAK INTENSITY</span>
                  <span className="text-[#E8ECF1] font-bold">38.0 mm/hr (04:30 IST)</span>
                </div>
                <div className="flex justify-between text-[#8B95A5]">
                  <span>IMD LANDSLIDE CUTOFF</span>
                  <span className="text-[#E8A33D] font-bold">115.0 mm / 24h</span>
                </div>
                <div className="flex justify-between text-[#8B95A5]">
                  <span>DOPPLER NOWCAST (NEXT 3H)</span>
                  <span className="text-[#3FA9F5] font-bold">+45.0 mm EXPECTED</span>
                </div>
              </div>

              {/* Nowcast trajectory */}
              <div className="mt-2 pt-1 border-t border-[#1F2733]">
                <div className="flex justify-between text-[8px] font-mono text-[#8B95A5]">
                  <span>NOWCAST TRAJECTORY</span>
                  <span className="text-[#3DDC97]">CONFIDENCE: 92%</span>
                </div>
                <svg viewBox="0 0 100 20" className="w-full h-5 mt-0.5">
                  <path d="M 0,18 Q 40,16 70,10 T 100,5" fill="none" stroke="#3FA9F5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 2: Geological Cross-Section + Canopy Degradation NDVI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card 5: Geological Cross-Section */}
            <div className="bg-[#141A24] border border-[#1F2733] rounded p-3">
              <div className="flex items-center justify-between border-b border-[#1F2733] pb-1.5 mb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#E8ECF1]">
                    GEOLOGICAL CROSS-SECTION // NH-10 KM 32.4 BLUFF
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#8B95A5]">
                  MODEL: LEM-BISHOP
                </span>
              </div>

              <div className="flex justify-between text-[8px] font-mono text-[#8B95A5] mb-1.5">
                <span>DIP: 42.8° SW</span>
                <span>PORE PRESSURE: <strong className="text-[#E85D5D]">214.6 kPa (CRIT)</strong></span>
                <span>RUNOUT EST: <strong>140,000 m³</strong></span>
              </div>

              {/* 2D Cross-Section SVG Diagram */}
              <div className="relative w-full h-[140px] bg-[#0A0E14] border border-[#1F2733] rounded overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Bedrock hatch background */}
                  <path d="M 0,90 Q 150,90 280,130 L 400,160 L 400,200 L 0,200 Z" fill="#121822" />
                  
                  {/* Colluvium Layer (Soil Wedge) */}
                  <path d="M 0,40 L 180,45 L 280,120 L 400,150 L 400,170 L 280,135 L 180,60 L 0,55 Z" fill="#241B18" stroke="#E85D5D" strokeWidth="1" />

                  {/* Surface Rupture Propagation Label */}
                  <text x="180" y="32" fill="#E85D5D" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
                    SURFACE RUPTURE PROPAGATION: 82%
                  </text>

                  {/* Road Location Pin */}
                  <circle cx="280" cy="118" r="3" fill="#3FA9F5" />
                  <text x="260" y="112" fill="#E8ECF1" fontSize="7.5" fontFamily="JetBrains Mono">
                    NH-10 KM 32.4
                  </text>

                  {/* Shear Vector Arrow */}
                  <line x1="200" y1="80" x2="270" y2="125" stroke="#E85D5D" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="175" y="105" fill="#FFA8A8" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                    SHEAR VECTOR (14.2 mm/d)
                  </text>

                  {/* Failure plane arc line */}
                  <path d="M 30,50 Q 180,120 370,160" fill="none" stroke="#E85D5D" strokeWidth="1.8" strokeDasharray="4,3" />

                  {/* Bedrock Text */}
                  <text x="50" y="150" fill="#5B6577" fontSize="8" fontFamily="JetBrains Mono">
                    METASEDIMENTARY BEDROCK
                  </text>

                  {/* Teesta River */}
                  <rect x="330" y="160" width="70" height="40" fill="#1A3348" />
                  <text x="335" y="180" fill="#3FA9F5" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                    TEESTA RIVER
                  </text>

                  {/* Subtitle */}
                  <text x="8" y="192" fill="#5B6577" fontSize="7" fontFamily="JetBrains Mono">
                    VERT EXAG: 1.5x // REF SLICE: TRANSECT A-A'
                  </text>
                </svg>
              </div>

              {/* Cross-section Legend */}
              <div className="flex flex-wrap items-center justify-between text-[8px] font-mono mt-1.5 text-[#8B95A5]">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E85D5D]" />
                  <span>FAILURE PLANE DEPTH: <strong>18.5 METERS</strong></span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
                  <span>FRICTION ANGLE (φ): <strong>28.5°</strong></span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FA9F5]" />
                  <span>COHESION (c): <strong>12.4 kPa</strong></span>
                </span>
              </div>
            </div>

            {/* Card 6: Satellite Canopy Degradation & NDVI */}
            <div className="bg-[#141A24] border border-[#1F2733] rounded p-3">
              <div className="flex items-center justify-between border-b border-[#1F2733] pb-1.5 mb-2">
                <span className="text-[9px] font-mono text-[#8B95A5]">
                  SAT-ESA-S2 // 10M RES
                </span>
                <span className="px-1.5 py-0.2 text-[8px] font-mono font-bold bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/50 rounded">
                  SCAR EXPANSION
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-1.5">
                <div>
                  <div className="text-[11px] font-mono font-bold text-[#E8ECF1]">
                    Canopy Degradation & NDVI Scar Index
                  </div>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-2xl font-extrabold font-mono text-[#E8ECF1]">0.31</span>
                    <span className="text-[9px] font-mono text-[#8B95A5]">NDVI INDEX</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#E85D5D]">
                  -54.2% vs 30d Mean
                </span>
              </div>

              {/* Satellite false-color preview */}
              <div className="relative w-full h-[115px] bg-[#080D14] border border-[#1F2733] rounded overflow-hidden">
                {/* Visual Satellite False Color IR Simulation */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A3348] via-[#0E202F] to-[#2B1414] opacity-80" />
                <div className="absolute top-2 left-2 text-[8px] font-mono text-[#3FA9F5] bg-[#0A0E14]/80 px-1.5 py-0.5 rounded">
                  BAND RATIO: B8-B4 / B8+B4
                </div>

                {/* Scar polygon simulation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-16 border-2 border-dashed border-[#E85D5D] bg-[#E85D5D]/20 rounded-lg transform -rotate-12 flex items-center justify-center">
                    <span className="text-[8px] font-mono font-bold text-[#FF9E9E] bg-[#0A0E14]/90 px-1 py-0.5 rounded">
                      SHEAR SCAR: 4.8 HECTARES
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2 text-[8.5px] font-mono">
                <div className="bg-[#0D1219] p-1.5 rounded border border-[#1F2733]">
                  <div className="text-[#8B95A5]">ROOT ANCHORAGE</div>
                  <div className="text-[#E85D5D] font-bold">COMPROMISED (74%)</div>
                </div>
                <div className="bg-[#0D1219] p-1.5 rounded border border-[#1F2733]">
                  <div className="text-[#8B95A5]">RUNOFF COEFFICIENT</div>
                  <div className="text-[#3FA9F5] font-bold">0.82 (HYPER-RAPID)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Stack (4 Cols): PTZ Camera Feed + Quick-Dispatch Units + Chrono-Log */}
        <div className="lg:col-span-4 space-y-3">
          {/* PTZ Live Camera Feed Panel */}
          <div className="bg-[#141A24] border border-[#1F2733] rounded p-3">
            <div className="flex items-center justify-between border-b border-[#1F2733] pb-1.5 mb-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E85D5D] animate-ping" />
                <span className="text-[10px] font-mono font-bold text-[#E8ECF1]">
                  CAM-04 // TEESTA BLUFF PTZ-N
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#8B95A5]">
                LOC: NH-10 KM 32.4
              </span>
            </div>

            {/* Video Feed Simulation */}
            <div className="relative w-full h-[160px] bg-[#05080C] rounded border border-[#1F2733] overflow-hidden">
              {/* Mountain & River Silhouette */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#111A24] via-[#0D151D] to-[#080D12]" />
              
              {/* Scanlines overlay */}
              <div
                className="absolute w-full h-1 bg-[#3FA9F5]/30 shadow-sm shadow-[#3FA9F5]"
                style={{ top: `${cameraScanline}%` }}
              />

              {/* Feed Header Watermark */}
              <div className="absolute top-2 left-2 flex items-center space-x-2 text-[8px] font-mono text-[#3DDC97]">
                <span className="bg-[#E85D5D] text-[#0A0E14] px-1 font-bold">LIVE REC [30 FPS]</span>
                <span className="text-[#8B95A5]">IR READY // OPTICAL 18x</span>
              </div>

              {/* Center AI Bounding Box */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative border-2 border-[#E85D5D] w-36 h-20 rounded-xs bg-[#E85D5D]/10 flex flex-col justify-between p-1">
                  <div className="flex justify-between text-[7px] font-mono text-[#E85D5D]">
                    <span>[TARGET ACQUIRED]</span>
                    <span>97.4% CONF</span>
                  </div>
                  <div className="text-center">
                    <span className="bg-[#E85D5D] text-[#0A0E14] text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded">
                      DEBRIS SLUMP DETECTED
                    </span>
                  </div>
                  <div className="text-right text-[7px] font-mono text-[#8B95A5]">
                    +14.2 mm/h SLIP
                  </div>
                </div>
              </div>

              {/* Gimbal Azimuth / Elevation */}
              <div className="absolute bottom-1 right-2 text-[8px] font-mono text-[#8B95A5]">
                AZ: 214° // EL: -18°
              </div>
            </div>

            {/* Road Closure Warning Banner */}
            <div className="mt-2 bg-[#E85D5D] text-[#0A0E14] p-1.5 rounded text-[10px] font-mono font-extrabold tracking-wider text-center">
              NH-10 FULL CLOSURE (KM 32.4) ALL TRAFFIC HALTED
            </div>

            {/* Corridor diversion & isolated settlements */}
            <div className="mt-2 text-[8.5px] font-mono space-y-1 text-[#8B95A5]">
              <div className="flex justify-between">
                <span>ACTIVE CORRIDOR DIVERSION:</span>
                <span className="text-[#3FA9F5] font-bold">VIA SINGTAM — MELLI BYPASS</span>
              </div>
              <div className="flex justify-between">
                <span>ISOLATED SETTLEMENTS:</span>
                <span className="text-[#E8ECF1] font-bold">3 VILLAGES [DIKCHU, RANGPO, LOWER RORATHANG]</span>
              </div>
            </div>
          </div>

          {/* Incident Quick-Dispatch Units */}
          <div className="bg-[#141A24] border border-[#1F2733] rounded p-3">
            <div className="flex items-center justify-between border-b border-[#1F2733] pb-1.5 mb-2">
              <span className="text-[10px] font-mono font-bold text-[#E8ECF1] uppercase">
                INCIDENT QUICK-DISPATCH UNITS
              </span>
              <span className="text-[9px] font-mono text-[#3DDC97]">
                {dispatchUnits.filter(u => u.status === 'READY').length} UNITS READY
              </span>
            </div>

            <div className="space-y-2">
              {dispatchUnits.map(unit => (
                <div
                  key={unit.id}
                  className="bg-[#0D1219] p-2 rounded border border-[#1F2733] flex items-center justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#E8ECF1]">
                      {unit.name}
                    </div>
                    <div className="text-[8.5px] font-mono text-[#8B95A5]">
                      {unit.desc}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUnitAction(unit)}
                    disabled={unit.status !== 'READY'}
                    className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                      unit.status === 'READY'
                        ? unit.type === 'broadcast'
                          ? 'bg-[#E85D5D] hover:bg-[#FF6B6B] text-white shadow-sm'
                          : 'bg-[#3FA9F5] hover:bg-[#5BB7F7] text-[#0A0E14]'
                        : 'bg-[#1F2733] text-[#3DDC97] border border-[#3DDC97]/40'
                    }`}
                  >
                    {unit.status === 'READY' ? unit.actionLabel : unit.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Chrono-Log Panel */}
          <div className="bg-[#141A24] border border-[#1F2733] rounded p-3">
            <div className="flex items-center justify-between border-b border-[#1F2733] pb-1.5 mb-2">
              <span className="text-[10px] font-mono font-bold text-[#E8ECF1] uppercase">
                SECTOR CHRONO-LOG
              </span>
              <span className="text-[8.5px] font-mono text-[#8B95A5] flex items-center space-x-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin text-[#3FA9F5]" />
                <span>AUTO-REFRESH: 5S</span>
              </span>
            </div>

            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {chronoLog.map(item => (
                <div
                  key={item.id}
                  className="border-l-2 border-[#1F2733] pl-2 py-0.5 hover:border-[#3FA9F5] transition-colors"
                >
                  <div className="flex items-center space-x-2 text-[9px] font-mono">
                    <span className="text-[#3FA9F5] font-bold">{item.timestamp}</span>
                    <span
                      className={`font-bold ${
                        item.severity === 'CRIT'
                          ? 'text-[#E85D5D]'
                          : item.severity === 'WARN'
                          ? 'text-[#E8A33D]'
                          : 'text-[#E8ECF1]'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[8.5px] font-mono text-[#8B95A5] mt-0.5 leading-snug">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
