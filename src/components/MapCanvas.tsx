import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { SectorInfo } from '../types';
import { playTacticalClick } from '../utils/audio';

interface MapCanvasProps {
  sectors: SectorInfo[];
  onSelectSector: (sectorId: string) => void;
  selectedSectorId?: string;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  sectors,
  onSelectSector,
  selectedSectorId = 'SK-01'
}) => {
  const [layers, setLayers] = useState({
    saturation: true,
    insar: true,
    faults: true,
    corridors: true,
    evac: true,
  });

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const toggleLayer = (layer: keyof typeof layers) => {
    playTacticalClick();
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="w-full bg-[#0D1117] border border-[#1F2733] rounded relative overflow-hidden select-none">
      {/* Top Map Header & Layer Toggles */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between p-3 bg-gradient-to-b from-[#0A0E14]/90 via-[#0A0E14]/60 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <div className="text-[11px] font-bold tracking-widest text-[#E8ECF1] font-mono">
            NER-GIS // SECTOR-ALL (08 STATES COMPOSITE)
          </div>
          <div className="text-[9px] font-mono text-[#8B95A5] mt-0.5 tracking-wider">
            COORD: 26.1445° N, 91.7362° E • ELEV: 1,642m • PROJECTION: EPSG-32646 [UTM 46N]
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center space-x-1.5 pointer-events-auto font-mono text-[10px]">
          <button
            onClick={() => toggleLayer('saturation')}
            className={`px-2 py-0.5 rounded transition-colors ${
              layers.saturation
                ? 'bg-[#3FA9F5] text-[#0A0E14] font-bold'
                : 'bg-[#141A24] text-[#8B95A5] border border-[#1F2733] hover:text-[#E8ECF1]'
            }`}
          >
            + SATURATION
          </button>

          <button
            onClick={() => toggleLayer('insar')}
            className={`px-2 py-0.5 rounded transition-colors ${
              layers.insar
                ? 'bg-[#3FA9F5] text-[#0A0E14] font-bold'
                : 'bg-[#141A24] text-[#8B95A5] border border-[#1F2733] hover:text-[#E8ECF1]'
            }`}
          >
            INSAR DEFORM
          </button>

          <button
            onClick={() => toggleLayer('faults')}
            className={`px-2 py-0.5 rounded transition-colors ${
              layers.faults
                ? 'bg-[#3FA9F5] text-[#0A0E14] font-bold'
                : 'bg-[#141A24] text-[#8B95A5] border border-[#1F2733] hover:text-[#E8ECF1]'
            }`}
          >
            FAULT VECTORS
          </button>

          <button
            onClick={() => toggleLayer('corridors')}
            className={`px-2 py-0.5 rounded transition-colors ${
              layers.corridors
                ? 'bg-[#3FA9F5] text-[#0A0E14] font-bold'
                : 'bg-[#141A24] text-[#8B95A5] border border-[#1F2733] hover:text-[#E8ECF1]'
            }`}
          >
            CORRIDORS
          </button>

          <button
            onClick={() => toggleLayer('evac')}
            className={`px-2 py-0.5 rounded transition-colors ${
              layers.evac
                ? 'bg-[#3DDC97] text-[#0A0E14] font-bold'
                : 'bg-[#141A24] text-[#8B95A5] border border-[#1F2733] hover:text-[#E8ECF1]'
            }`}
          >
            EVAC ROUTES
          </button>
        </div>
      </div>

      {/* Main SVG Tactical Canvas */}
      <div className="relative w-full h-[360px] bg-[#0A0E14] overflow-hidden tactical-grid-bg">
        <svg
          viewBox="0 0 1000 450"
          className="w-full h-full object-cover"
          style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))' }}
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="critGlow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E85D5D" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#E85D5D" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#E85D5D" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="critGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E85D5D" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#E85D5D" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#E85D5D" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="warnGlow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8A33D" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#E8A33D" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#E8A33D" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="nominalGlow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3DDC97" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#3DDC97" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3DDC97" stopOpacity="0" />
            </radialGradient>

            {/* InSAR Deformation heat gradient */}
            <radialGradient id="insarField" cx="32%" cy="38%" r="45%">
              <stop offset="0%" stopColor="#FF4C4C" stopOpacity="0.3" />
              <stop offset="35%" stopColor="#E8A33D" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#3FA9F5" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0A0E14" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Tactical Elevation Contours (NER mountain geography) */}
          <g opacity="0.22" stroke="#2B3648" strokeWidth="0.75" fill="none">
            {/* Eastern Himalayas / Sikkim Contours */}
            <path d="M 50 120 Q 150 90 220 140 T 320 120 T 450 180 T 600 130 T 780 150 T 950 110" />
            <path d="M 60 160 Q 170 130 250 170 T 360 160 T 480 210 T 640 170 T 820 190 T 960 160" />
            <path d="M 80 200 Q 190 170 280 210 T 400 200 T 520 250 T 680 210 T 860 230" />
            <path d="M 120 250 Q 230 220 320 260 T 440 250 T 560 290 T 720 260 T 900 280" />
            {/* Meghalaya Plateau & Barak Valley Contours */}
            <path d="M 180 310 Q 280 280 380 320 T 500 300 T 640 340 T 800 310" />
            <path d="M 220 360 Q 320 330 420 370 T 540 350 T 680 380 T 840 360" />
          </g>

          {/* InSAR Deformation Layer */}
          {layers.insar && (
            <ellipse cx="320" cy="180" rx="140" ry="80" fill="url(#insarField)" />
          )}

          {/* Saturation Zones */}
          {layers.saturation && (
            <g>
              <ellipse cx="280" cy="165" rx="70" ry="45" fill="url(#critGlow1)" />
              <ellipse cx="480" cy="250" rx="80" ry="50" fill="url(#critGlow2)" />
              <ellipse cx="620" cy="220" rx="65" ry="40" fill="url(#warnGlow1)" />
              <ellipse cx="410" cy="140" rx="55" ry="35" fill="url(#nominalGlow1)" />
            </g>
          )}

          {/* Fault Vectors (Main Boundary Thrust, Dauki Fault, Naga Thrust) */}
          {layers.faults && (
            <g stroke="#E85D5D" strokeWidth="1.2" strokeDasharray="5,4" fill="none" opacity="0.65">
              {/* Main Boundary Thrust line */}
              <path d="M 180 180 C 260 160, 360 170, 470 210 C 580 250, 720 220, 850 240" />
              {/* Naga Thrust line */}
              <path d="M 520 260 C 590 240, 680 210, 780 190" stroke="#E8A33D" />
              {/* Dauki Fault line */}
              <path d="M 260 300 C 350 310, 480 320, 600 290" stroke="#FF4C4C" />
            </g>
          )}

          {/* Highway Corridors (NH-10, NH-27, NH-29, BCT Road) */}
          {layers.corridors && (
            <g strokeWidth="2.2" fill="none" opacity="0.85">
              {/* Teesta Valley Corridor NH-10 */}
              <path d="M 140 280 Q 220 220 280 165 T 330 110" stroke="#3FA9F5" />
              {/* NH-27 Guwahati-Haflong-Silchar */}
              <path d="M 330 210 C 400 230, 460 250, 520 270 T 660 310" stroke="#3FA9F5" />
              {/* NH-29 Dimapur-Kohima Corridor (Warning segment) */}
              <path d="M 540 240 Q 600 230 660 220 T 780 240" stroke="#E8A33D" strokeDasharray="6,3" />
              {/* Balipara-Charduar-Tawang (BCT) Corridor */}
              <path d="M 360 170 Q 390 145 420 120" stroke="#3DDC97" />
            </g>
          )}

          {/* Evacuation Safe Path Routes */}
          {layers.evac && (
            <g stroke="#3DDC97" strokeWidth="1.5" strokeDasharray="3,3" fill="none" opacity="0.7">
              {/* Pakyong to Highland Safe Route */}
              <path d="M 280 165 C 290 140, 330 130, 360 120" />
              {/* Haflong North High Ridge Diversion */}
              <path d="M 480 250 C 490 225, 520 215, 560 210" />
            </g>
          )}

          {/* Tactical Hotspot Node 1: NH-10 Teesta Corridor (CRITICAL) */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectSector('SK-01')}
            onMouseEnter={() => setHoveredNode('SK-01')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Pulse rings */}
            <circle cx="280" cy="165" r="14" fill="none" stroke="#E85D5D" strokeWidth="1" className="animate-ping opacity-40" />
            <circle cx="280" cy="165" r="6" fill="#E85D5D" />
            
            {/* Warning Triangle Icon */}
            <polygon points="280,154 287,167 273,167" fill="#0A0E14" stroke="#E85D5D" strokeWidth="1.5" />
            <line x1="280" y1="158" x2="280" y2="162" stroke="#E85D5D" strokeWidth="1.5" />
            <circle cx="280" cy="164.5" r="0.8" fill="#E85D5D" />

            {/* Tactical Callout Box */}
            <g transform="translate(210, 100)">
              <rect
                x="0"
                y="0"
                width="170"
                height="50"
                fill="#0D1219"
                stroke="#E85D5D"
                strokeWidth="1.2"
                rx="2"
                opacity="0.95"
                filter="drop-shadow(0 4px 10px rgba(0,0,0,0.7))"
              />
              <line x1="0" y1="18" x2="170" y2="18" stroke="#1F2733" strokeWidth="1" />
              
              {/* Header */}
              <text x="8" y="13" fill="#E8ECF1" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
                NH-10 [TEESTA CORRIDOR]
              </text>
              <rect x="135" y="4" width="28" height="11" fill="#E85D5D" rx="1" />
              <text x="141" y="12" fill="#0A0E14" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                CRIT
              </text>

              {/* Metrics */}
              <text x="8" y="30" fill="#8B95A5" fontSize="8" fontFamily="JetBrains Mono">
                DISPLACEMENT:
              </text>
              <text x="88" y="30" fill="#3FA9F5" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                +18.4 mm/h
              </text>

              <text x="8" y="42" fill="#8B95A5" fontSize="8" fontFamily="JetBrains Mono">
                PORE PRESSURE:
              </text>
              <text x="88" y="42" fill="#3FA9F5" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                342 kPa (HIGH)
              </text>
            </g>
            {/* Pointer line */}
            <line x1="280" y1="150" x2="280" y2="155" stroke="#E85D5D" strokeWidth="1.5" />
          </g>

          {/* Tactical Hotspot Node 2: HAFLONG / DIMA HASAO (CRITICAL) */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectSector('AS-04')}
            onMouseEnter={() => setHoveredNode('AS-04')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx="480" cy="250" r="12" fill="none" stroke="#E85D5D" strokeWidth="1" className="animate-ping opacity-30" />
            <circle cx="480" cy="250" r="5" fill="#E85D5D" />

            {/* Marker Box */}
            <g transform="translate(425, 235)">
              <rect x="0" y="0" width="16" height="16" fill="#0A0E14" stroke="#E85D5D" strokeWidth="1.5" rx="2" />
              <text x="6" y="12" fill="#E85D5D" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">!</text>
            </g>

            {/* Tactical Callout */}
            <g transform="translate(420, 256)">
              <rect x="0" y="0" width="160" height="24" fill="#0D1219" stroke="#E85D5D" strokeWidth="1" rx="2" opacity="0.95" />
              <text x="8" y="10" fill="#E8ECF1" fontSize="8.5" fontWeight="bold" fontFamily="JetBrains Mono">
                HAFLONG / DIMA HASAO
              </text>
              <text x="8" y="19" fill="#8B95A5" fontSize="7.5" fontFamily="JetBrains Mono">
                ROTATIONAL SHEAR @ 12.1 mm/h
              </text>
            </g>
          </g>

          {/* Tactical Hotspot Node 3: NH-29 KOHIMA (WARNING) */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectSector('NL-02')}
            onMouseEnter={() => setHoveredNode('NL-02')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx="620" cy="220" r="5" fill="#E8A33D" />
            <g transform="translate(560, 205)">
              <rect x="0" y="0" width="16" height="16" fill="#0A0E14" stroke="#E8A33D" strokeWidth="1.5" rx="2" />
              <text x="4" y="12" fill="#E8A33D" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">Ξ</text>
            </g>
            <g transform="translate(540, 224)">
              <rect x="0" y="0" width="160" height="15" fill="#0D1219" stroke="#1F2733" strokeWidth="1" rx="1" opacity="0.9" />
              <text x="6" y="11" fill="#E8A33D" fontSize="7.5" fontWeight="bold" fontFamily="JetBrains Mono">
                NH-29 KOHIMA (WARN: 1.4MM/H)
              </text>
            </g>
          </g>

          {/* Tactical Hotspot Node 4: BCT TAWANG // STABLE (NOMINAL) */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectSector('AR-03')}
            onMouseEnter={() => setHoveredNode('AR-03')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx="410" cy="140" r="4.5" fill="#3DDC97" />
            <g transform="translate(403, 133)">
              <circle cx="7" cy="7" r="6" fill="#0A0E14" stroke="#3DDC97" strokeWidth="1.5" />
              <path d="M 4 7 L 6 9 L 10 5" stroke="#3DDC97" strokeWidth="1.5" fill="none" />
            </g>
            <g transform="translate(360, 146)">
              <text x="0" y="0" fill="#3DDC97" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                BCT TAWANG // STABLE
              </text>
            </g>
          </g>

          {/* Scanline simulation bar */}
          <line x1="0" y1="200" x2="1000" y2="200" stroke="#3FA9F5" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4,8" />
        </svg>

        {/* Bottom Legend Pill Bar */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-2 bg-[#0A0E14]/90 border border-[#1F2733] px-2.5 py-1 rounded text-[10px] font-mono">
          <div className="flex items-center space-x-1.5 cursor-pointer hover:opacity-80" onClick={() => onSelectSector('SK-01')}>
            <span className="w-2 h-2 rounded-full bg-[#E85D5D] animate-pulse" />
            <span className="text-[#E85D5D] font-bold">NH-10: CRITICAL BREACH</span>
          </div>

          <div className="h-3 w-[1px] bg-[#1F2733]" />

          <div className="flex items-center space-x-1.5 cursor-pointer hover:opacity-80" onClick={() => onSelectSector('NL-02')}>
            <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
            <span className="text-[#8B95A5]">NH-29: WARNING</span>
          </div>

          <div className="h-3 w-[1px] bg-[#1F2733]" />

          <div className="flex items-center space-x-1.5 cursor-pointer hover:opacity-80" onClick={() => onSelectSector('AS-04')}>
            <span className="w-2 h-2 rounded-full bg-[#3FA9F5]" />
            <span className="text-[#8B95A5]">NH-27: WATCH</span>
          </div>

          <div className="h-3 w-[1px] bg-[#1F2733]" />

          <div className="flex items-center space-x-1.5 cursor-pointer hover:opacity-80" onClick={() => onSelectSector('AR-03')}>
            <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
            <span className="text-[#3DDC97]">BCT: NOMINAL</span>
          </div>
        </div>

        {/* Bottom Right: Scale & Compass */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-4 bg-[#0A0E14]/90 border border-[#1F2733] px-3 py-1.5 rounded text-[9px] font-mono text-[#8B95A5]">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1">
              <span className="h-2 w-[1px] bg-[#8B95A5]" />
              <span className="h-[2px] w-12 bg-[#8B95A5]" />
              <span className="h-2 w-[1px] bg-[#8B95A5]" />
              <span className="ml-1 text-[#E8ECF1] font-semibold">75 KM</span>
            </div>
            <span className="text-[8px] text-[#5B6577] mt-0.5">SCALE RATIO 1:500,000</span>
          </div>

          <div className="flex flex-col items-center justify-center pl-2 border-l border-[#1F2733]">
            <Compass className="w-4 h-4 text-[#3FA9F5]" />
            <span className="text-[8px] font-bold text-[#E8ECF1]">N</span>
          </div>
        </div>
      </div>
    </div>
  );
};
