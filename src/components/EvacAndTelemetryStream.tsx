import React, { useState } from 'react';
import { ShieldAlert, Download, ArrowRight, Radio, AlertTriangle } from 'lucide-react';
import { TelemetryStreamEvent } from '../types';
import { playTacticalClick, playDefconAlarm } from '../utils/audio';

interface EvacAndTelemetryStreamProps {
  events: TelemetryStreamEvent[];
  onDrillDown: (sectorId: string) => void;
  onTriggerEvacuationModal: () => void;
}

export const EvacAndTelemetryStream: React.FC<EvacAndTelemetryStreamProps> = ({
  events,
  onDrillDown,
  onTriggerEvacuationModal,
}) => {
  const [safetyLatchArmed, setSafetyLatchArmed] = useState<boolean>(true);
  const [filterCritOnly, setFilterCritOnly] = useState<boolean>(false);

  const toggleSafetyLatch = () => {
    playTacticalClick();
    setSafetyLatchArmed(!safetyLatchArmed);
  };

  const handleExecuteDispatch = () => {
    if (!safetyLatchArmed) return;
    playDefconAlarm();
    onTriggerEvacuationModal();
  };

  const filteredEvents = filterCritOnly
    ? events.filter(e => e.sev === 'CRIT')
    : events;

  const exportCSV = () => {
    playTacticalClick();
    const headers = ['ID', 'SEV', 'TIMESTAMP', 'DISTRICT_CORRIDOR', 'HAZARD_VECTOR', 'SENSOR_METRICS', 'AI_CONFIDENCE', 'SECTOR_ID'];
    const rows = filteredEvents.map(e => [
      e.id,
      e.sev,
      e.timestamp,
      `"${e.district}"`,
      `"${e.hazardVector}"`,
      `"${e.criticalMetrics}"`,
      `"${e.aiConfidence}"`,
      e.sectorId
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sentinel_telemetry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-3 font-sans">
      {/* Evacuation Command Dispatch Panel */}
      <div className="bg-[#141A24] border border-[#E85D5D]/40 rounded p-3.5 relative overflow-hidden">
        {/* Header strip */}
        <div className="flex items-center justify-between border-b border-[#1F2733] pb-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#E85D5D]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#E8ECF1] uppercase">
              EVACUATION COMMAND DISPATCH
            </span>
          </div>
          <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/60 rounded">
            DEFCON 1
          </span>
        </div>

        <p className="text-[10px] font-mono text-[#8B95A5] mb-3">
          Authorizes instant Common Alerting Protocol (CAP-CP) priority cell broadcast to 34,280 citizens and activates SDRF 1st & 3rd Battalions.
        </p>

        {/* Safety Latch and Switch Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D1219] p-2.5 rounded border border-[#1F2733] mb-3">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#E8ECF1]">
              SAFETY LATCH: <span className={safetyLatchArmed ? 'text-[#E85D5D]' : 'text-[#3DDC97]'}>
                {safetyLatchArmed ? 'ARMED' : 'DISARMED'}
              </span>
            </div>
            <div className="text-[9px] font-mono text-[#5B6577]">
              SECURITY OVERRIDE CODE: SEC-NER-4921
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[9px] font-mono text-[#8B95A5] uppercase">
              {safetyLatchArmed ? 'LATCH ENGAGED' : 'SAFE'}
            </span>
            <button
              onClick={toggleSafetyLatch}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                safetyLatchArmed ? 'bg-[#E85D5D] justify-end' : 'bg-[#1F2733] justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
            </button>
          </div>
        </div>

        {/* Large Gated Action Button */}
        <button
          onClick={handleExecuteDispatch}
          disabled={!safetyLatchArmed}
          className={`w-full py-3 rounded font-display font-extrabold text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-lg ${
            safetyLatchArmed
              ? 'bg-[#FFA8A8] hover:bg-[#FF9494] text-[#0A0E14] cursor-pointer shadow-[#E85D5D]/20 active:scale-[0.99]'
              : 'bg-[#1F2733] text-[#5B6577] cursor-not-allowed'
          }`}
        >
          <Radio className="w-4 h-4 text-[#0A0E14]" />
          <span>EXECUTE CELL & SDRF DISPATCH</span>
        </button>
      </div>

      {/* Automated Sentinel Telemetry Stream Table */}
      <div className="bg-[#141A24] border border-[#1F2733] rounded p-3.5">
        {/* Table Title & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F2733] pb-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#3FA9F5] animate-ping" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#E8ECF1] uppercase">
              AUTOMATED SENTINEL TELEMETRY STREAM
            </span>
            <span className="px-1.5 py-0.5 text-[8px] font-mono bg-[#1F2733] text-[#3FA9F5] rounded border border-[#2B3648]">
              LIVE FEED // AI CONV-NET V4.8
            </span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[10px]">
            <span className="text-[#8B95A5]">FILTER:</span>
            <button
              onClick={() => { playTacticalClick(); setFilterCritOnly(false); }}
              className={`px-2 py-0.5 rounded transition-colors ${
                !filterCritOnly
                  ? 'bg-[#1F2733] text-[#E8ECF1] border border-[#3FA9F5]'
                  : 'bg-[#0D1219] text-[#8B95A5]'
              }`}
            >
              ALL ({events.length})
            </button>
            <button
              onClick={() => { playTacticalClick(); setFilterCritOnly(true); }}
              className={`px-2 py-0.5 rounded transition-colors ${
                filterCritOnly
                  ? 'bg-[#E85D5D] text-[#0A0E14] font-bold'
                  : 'bg-[#0D1219] text-[#E85D5D] border border-[#E85D5D]/50'
              }`}
            >
              CRIT ONLY ({events.filter(e => e.sev === 'CRIT').length})
            </button>

            <button
              onClick={exportCSV}
              className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-[#1F2733] text-[#8B95A5] hover:text-[#E8ECF1] border border-[#2B3648] hover:border-[#3FA9F5]/50 transition-colors ml-2"
            >
              <Download className="w-3 h-3 text-[#3FA9F5]" />
              <span>EXPORT CSV</span>
            </button>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px] border-collapse">
            <thead>
              <tr className="border-b border-[#1F2733] text-[#8B95A5] uppercase text-[9px]">
                <th className="py-2 px-2">SEV</th>
                <th className="py-2 px-2">TIMESTAMP (IST)</th>
                <th className="py-2 px-2">DISTRICT / CORRIDOR</th>
                <th className="py-2 px-2">HAZARD VECTOR</th>
                <th className="py-2 px-2">CRITICAL SENSOR METRICS</th>
                <th className="py-2 px-2">AI CONFIDENCE</th>
                <th className="py-2 px-2 text-right">TACTICAL ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18212D]">
              {filteredEvents.map(event => (
                <tr
                  key={event.id}
                  className="hover:bg-[#18212F] transition-colors group cursor-pointer"
                  onClick={() => onDrillDown(event.sectorId)}
                >
                  {/* Severity Badge */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                        event.sev === 'CRIT'
                          ? 'bg-[#E85D5D]/20 text-[#E85D5D] border border-[#E85D5D]/60'
                          : event.sev === 'WARN'
                          ? 'bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/60'
                          : 'bg-[#3DDC97]/20 text-[#3DDC97] border border-[#3DDC97]/60'
                      }`}
                    >
                      {event.sev}
                    </span>
                  </td>

                  {/* Timestamp */}
                  <td className="py-2 px-2 whitespace-nowrap text-[#8B95A5]">
                    {event.timestamp}
                  </td>

                  {/* District / Corridor */}
                  <td className="py-2 px-2 font-medium text-[#E8ECF1] whitespace-nowrap">
                    {event.district}
                  </td>

                  {/* Hazard Vector */}
                  <td className="py-2 px-2 text-[#8B95A5] whitespace-nowrap">
                    {event.hazardVector}
                  </td>

                  {/* Sensor Metrics */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    <span className="text-[#E85D5D] font-bold">
                      {event.criticalMetrics.split('•')[0]}
                    </span>
                    {event.criticalMetrics.includes('•') && (
                      <span className="text-[#3FA9F5] ml-1">
                        • {event.criticalMetrics.split('•')[1]}
                      </span>
                    )}
                  </td>

                  {/* AI Confidence */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    <span className="text-[#3DDC97] font-semibold">{event.aiConfidence.split(' ')[0]}</span>
                    <span className="text-[#5B6577] text-[8.5px] ml-1">
                      {event.aiConfidence.substring(event.aiConfidence.indexOf(' '))}
                    </span>
                  </td>

                  {/* Tactical Action Button */}
                  <td className="py-2 px-2 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTacticalClick();
                        onDrillDown(event.sectorId);
                      }}
                      className="px-2.5 py-1 rounded bg-[#3FA9F5] text-[#0A0E14] font-bold text-[9px] hover:bg-[#5BB7F7] transition-all inline-flex items-center space-x-1"
                    >
                      <span>DRILL-DOWN</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Meta Strip */}
        <div className="flex flex-wrap items-center justify-between text-[9px] font-mono text-[#5B6577] border-t border-[#1F2733] pt-2 mt-2">
          <span>SHOWING {filteredEvents.length} OF {events.length} ACTIVE AI SURVEILLANCE TELEMETRY STREAMS</span>
          <span>BUFFER MEMORY: 99.8% READY • ENCRYPTED TACTICAL UPLINK ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
