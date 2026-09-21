import React from 'react';
import { Grid, CheckCircle2, HelpCircle } from 'lucide-react';
import { SectorInfo } from '../types';

interface KPICardsProps {
  sector: SectorInfo;
  onSelectHotspot: (sectorId: string) => void;
}

export const KPICards: React.FC<KPICardsProps> = ({ sector, onSelectHotspot }) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Top 3 KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Focus Sector Breach Index */}
        <div className="bg-[#141A24] border border-[#1F2733] rounded p-3.5 relative overflow-hidden flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#8B95A5] uppercase font-semibold">
                FOCUS SECTOR BREACH INDEX
              </span>
              <span className="px-1 py-0.2 text-[7.5px] font-mono bg-[#3DDC97]/20 text-[#3DDC97] border border-[#3DDC97]/50 rounded font-bold">
                LIVE MODEL INFERENCE
              </span>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/50 rounded">
              DEFCON 2
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-[#E8ECF1] font-mono tracking-tight">
                {sector.breachIndex.toFixed(1)}
              </span>
              <span className="text-xs text-[#8B95A5] font-mono">/ 100</span>
              <span className="text-xs font-mono font-bold text-[#E85D5D] flex items-center">
                ↑ {sector.breachTrend}
              </span>
            </div>

            {/* Gradient progress track */}
            <div className="w-full bg-[#0A0E14] h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E8A33D] via-[#E85D5D] to-[#FF4C4C] rounded-full"
                style={{ width: `${sector.breachIndex}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[9.5px] font-mono text-[#8B95A5]">
            <span className="truncate">{sector.subName}</span>
            <span className="text-[8px] text-[#5B6577] shrink-0 ml-1 hidden sm:inline" title="Derived from Bishop's simplified method of slices combined with real-time antecedent rainfall">
              [Bishop FoS + Rain Weight]
            </span>
          </div>
        </div>

        {/* Card 2: Teesta Basin Discharge */}
        <div className="bg-[#141A24] border border-[#1F2733] rounded p-3.5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#8B95A5] uppercase font-semibold">
                TEESTA BASIN DISCHARGE
              </span>
              <span className="px-1 py-0.2 text-[7.5px] font-mono bg-[#1F2733] text-[#8B95A5] border border-[#2B3648] rounded">
                SIMULATED - CWC FEED
              </span>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#3FA9F5]/20 text-[#3FA9F5] border border-[#3FA9F5]/50 rounded">
              HFL BREACH
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-[#E8ECF1] font-mono tracking-tight">
                {sector.discharge.toLocaleString()}
              </span>
              <span className="text-xs text-[#8B95A5] font-mono">m³/s</span>
              <span className="text-xs font-mono font-bold text-[#3FA9F5] flex items-center">
                ↑ +840 m³/s
              </span>
            </div>

            {/* Discharge progress bar */}
            <div className="w-full bg-[#0A0E14] h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-[#3FA9F5] rounded-full"
                style={{ width: '84%' }}
              />
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#8B95A5] truncate">
            Dam Inflow Gauge // Chungthang-Dikchu Sluice Overrun
          </div>
        </div>

        {/* Card 3: Civilian Population at Risk */}
        <div className="bg-[#141A24] border border-[#1F2733] rounded p-3.5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#8B95A5] uppercase font-semibold">
                CIVILIAN POPULATION AT RISK
              </span>
              <span className="px-1 py-0.2 text-[7.5px] font-mono bg-[#1F2733] text-[#8B95A5] border border-[#2B3648] rounded">
                CENSUS GIS OVERLAY
              </span>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/50 rounded">
              RED ZONE
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-[#E8ECF1] font-mono tracking-tight">
                {sector.populationAtRisk.toLocaleString()}
              </span>
              <span className="text-xs text-[#8B95A5] font-mono uppercase">PERSONS</span>
            </div>

            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#3DDC97] mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3DDC97]" />
              <span>12,410 Relocated to Highland Shelters (36.2%)</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#8B95A5] truncate">
            Sikkim SDMA + Assam DDMA Joint Response Mobilized
          </div>
        </div>
      </div>

      {/* Row 2: Regional Threat Matrix */}
      <div className="bg-[#141A24] border border-[#1F2733] rounded p-3.5">
        <div className="flex items-center justify-between border-b border-[#1F2733] pb-2.5 mb-3">
          <div className="flex items-center space-x-2">
            <Grid className="w-4 h-4 text-[#3FA9F5]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#E8ECF1] uppercase">
              REGIONAL THREAT MATRIX
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8B95A5] uppercase tracking-wider">
            35 MONITORED SECTORS
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-[#1F2733] text-center">
          {/* Critical Red */}
          <div
            className="px-4 py-1 cursor-pointer hover:bg-[#1C2534] transition-colors rounded"
            onClick={() => onSelectHotspot('SK-01')}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E85D5D] animate-ping" />
              <span className="text-2xl font-bold font-mono text-[#E85D5D]">02</span>
            </div>
            <div className="text-[10px] font-mono font-bold text-[#E85D5D] mt-0.5 tracking-wider uppercase">
              CRITICAL RED
            </div>
            <div className="text-[9px] font-mono text-[#8B95A5] mt-0.5">
              Pakyong & Haflong
            </div>
          </div>

          {/* Watch Amber */}
          <div
            className="px-4 py-1 cursor-pointer hover:bg-[#1C2534] transition-colors rounded"
            onClick={() => onSelectHotspot('NL-02')}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-bold font-mono text-[#E8A33D]">05</span>
            </div>
            <div className="text-[10px] font-mono font-bold text-[#E8A33D] mt-0.5 tracking-wider uppercase">
              WATCH AMBER
            </div>
            <div className="text-[9px] font-mono text-[#8B95A5] mt-0.5">
              Kohima, Tura, Jowai
            </div>
          </div>

          {/* Stable Green */}
          <div
            className="px-4 py-1 cursor-pointer hover:bg-[#1C2534] transition-colors rounded"
            onClick={() => onSelectHotspot('AR-03')}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-bold font-mono text-[#3DDC97]">28</span>
            </div>
            <div className="text-[10px] font-mono font-bold text-[#3DDC97] mt-0.5 tracking-wider uppercase">
              STABLE GREEN
            </div>
            <div className="text-[9px] font-mono text-[#8B95A5] mt-0.5">
              Slopes Sub-Threshold
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
