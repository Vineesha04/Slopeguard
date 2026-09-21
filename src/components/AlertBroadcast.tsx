import React, { useState } from 'react';
import { 
  Bell, Radio, ShieldAlert, Send, CheckCircle2, Volume2, Globe, 
  Smartphone, AlertTriangle, Layers, User 
} from 'lucide-react';
import { MULTILINGUAL_ALERT_TEMPLATES } from '../data/mockData';
import { BroadcastLog } from '../types';
import { playTacticalClick, playTacticalConfirm, playDefconAlarm } from '../utils/audio';

interface AlertBroadcastProps {
  broadcastLogs: BroadcastLog[];
  onSendBroadcast: (log: BroadcastLog) => void;
}

export const AlertBroadcast: React.FC<AlertBroadcastProps> = ({
  broadcastLogs,
  onSendBroadcast,
}) => {
  const [selectedLang, setSelectedLang] = useState<string>('English');
  const [targetSector, setTargetSector] = useState<string>('East Sikkim // Pakyong Teesta Basin (NH-10)');
  const [severityTier, setSeverityTier] = useState<'WATCH' | 'WARN' | 'CRIT' | 'EVAC'>('EVAC');
  const [authCode, setAuthCode] = useState<string>('SEC-NER-4921');
  const [channels, setChannels] = useState({
    capCell: true,
    sirens: true,
    sms: true,
    appPush: true,
  });
  const [broadcastSuccess, setBroadcastSuccess] = useState<boolean>(false);

  const activeTemplate = MULTILINGUAL_ALERT_TEMPLATES[selectedLang] || MULTILINGUAL_ALERT_TEMPLATES['English'];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    playDefconAlarm();

    const selectedChannelsList: string[] = [];
    if (channels.capCell) selectedChannelsList.push('CAP-CP Cell Broadcast');
    if (channels.sirens) selectedChannelsList.push('Acoustic Siren Array');
    if (channels.sms) selectedChannelsList.push('Emergency Bulk SMS');
    if (channels.appPush) selectedChannelsList.push('Sentinel App Push');

    const newLog: BroadcastLog = {
      id: `BC-2025-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST',
      sectorName: targetSector,
      headline: activeTemplate.title,
      languages: [selectedLang.toUpperCase()],
      channels: selectedChannelsList,
      audienceCount: 34280,
      authorizedBy: 'REGIONAL INCIDENT COMMAND (NDMA)',
      authCode,
      status: 'SENT',
    };

    onSendBroadcast(newLog);
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
    }, 5000);
  };

  return (
    <div className="space-y-4 font-sans pb-8">
      {/* Top Banner */}
      <div className="bg-[#141A24] border border-[#1F2733] rounded p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-[#E85D5D]" />
          <div>
            <div className="text-xs font-mono font-bold text-[#E8ECF1] uppercase tracking-wider">
              MULTILINGUAL EMERGENCY BROADCAST DISPATCHER (CAP-CP GATEWAY)
            </div>
            <div className="text-[9px] font-mono text-[#8B95A5]">
              COMMON ALERTING PROTOCOL COMPLIANT • GEO-FENCED CELL TOWERS & TELECOM SMS FAN-OUT
            </div>
          </div>
        </div>

        {/* Transmission Tower Metrics */}
        <div className="flex items-center space-x-4 text-[9px] font-mono">
          <div className="text-right">
            <span className="text-[#8B95A5]">BROADCAST GRID:</span>{' '}
            <span className="text-[#3DDC97] font-bold">99.4% ARMED (412 TOWERS)</span>
          </div>
          <div className="text-right border-l border-[#1F2733] pl-3">
            <span className="text-[#8B95A5]">SMS GATEWAY:</span>{' '}
            <span className="text-[#3FA9F5] font-bold">OPERATIONAL [0.8s LATENCY]</span>
          </div>
        </div>
      </div>

      {broadcastSuccess && (
        <div className="p-3 bg-[#E85D5D]/20 border border-[#E85D5D] text-[#E8ECF1] rounded text-xs font-mono flex items-center space-x-2 animate-pulse">
          <ShieldAlert className="w-4 h-4 text-[#E85D5D]" />
          <span>EMERGENCY BROADCAST TRANSMITTED TO 34,280 RECIPIENTS ACROSS ACTIVE CELL CELLS.</span>
        </div>
      )}

      {/* Main Broadcast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Form: Broadcast Composer (7 Cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSend} className="bg-[#141A24] border border-[#1F2733] rounded p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#1F2733] pb-2">
              <span className="text-xs font-bold text-[#E8ECF1] uppercase tracking-wider">
                COMPOSE TACTICAL ALERT
              </span>
              <span className="text-[9px] text-[#E85D5D] bg-[#E85D5D]/20 px-2 py-0.5 rounded border border-[#E85D5D]/50 font-bold">
                PRIORITY: TIER 1 (EVACUATION)
              </span>
            </div>

            {/* Target Sector */}
            <div>
              <label className="block text-[9px] text-[#8B95A5] uppercase mb-1">Target Geographic Zone / Corridor</label>
              <select
                value={targetSector}
                onChange={(e) => setTargetSector(e.target.value)}
                className="w-full bg-[#0D1219] text-[#E8ECF1] p-2 rounded border border-[#1F2733] text-[11px] outline-none"
              >
                <option value="East Sikkim // Pakyong Teesta Basin (NH-10)">East Sikkim // Pakyong Teesta Basin (NH-10) [34,280 pop]</option>
                <option value="Dima Hasao // Haflong Jatinga Valley (NH-27)">Dima Hasao // Haflong Jatinga Valley (NH-27) [18,450 pop]</option>
                <option value="Kohima // Zubza Dzüna Basin (NH-29)">Kohima // Zubza Dzüna Basin (NH-29) [12,100 pop]</option>
                <option value="East Khasi Hills // Sohra Escarpment">East Khasi Hills // Sohra Escarpment [8,400 pop]</option>
              </select>
            </div>

            {/* Severity Tier Selector */}
            <div>
              <label className="block text-[9px] text-[#8B95A5] uppercase mb-1">Alert Severity Classification</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'WATCH', label: 'WATCH (Yellow)', color: 'text-[#3DDC97]' },
                  { key: 'WARN', label: 'WARNING (Amber)', color: 'text-[#E8A33D]' },
                  { key: 'CRIT', label: 'CRITICAL (Red)', color: 'text-[#E85D5D]' },
                  { key: 'EVAC', label: 'EVACUATION (Defcon 1)', color: 'text-[#FF4C4C]' },
                ].map(item => (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => { playTacticalClick(); setSeverityTier(item.key as any); }}
                    className={`p-1.5 rounded border text-[9px] font-bold uppercase transition-colors ${
                      severityTier === item.key
                        ? 'bg-[#1F2733] border-[#E85D5D] text-[#E8ECF1]'
                        : 'bg-[#0D1219] border-[#1F2733] text-[#8B95A5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[9px] text-[#8B95A5] uppercase">Regional Language Preview</label>
                <span className="text-[9px] text-[#3FA9F5] flex items-center space-x-1">
                  <Globe className="w-3 h-3" />
                  <span>7 NER LANGUAGES SUPPORTED</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['English', 'Nepali', 'Assamese', 'Bengali', 'Khasi', 'Bodo', 'Hindi'].map(lang => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => { playTacticalClick(); setSelectedLang(lang); }}
                    className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                      selectedLang === lang
                        ? 'bg-[#3FA9F5] text-[#0A0E14] font-bold'
                        : 'bg-[#0D1219] text-[#8B95A5] border border-[#1F2733] hover:text-[#E8ECF1]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Alert Message Preview Box */}
            <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733] space-y-1.5">
              <div className="text-[10px] text-[#E85D5D] font-bold uppercase">
                {activeTemplate.title}
              </div>
              <p className="text-[10px] text-[#E8ECF1] leading-relaxed">
                {activeTemplate.body}
              </p>
              <div className="pt-2 flex items-center justify-between text-[8px] text-[#5B6577] border-t border-[#18212D]">
                <span>ENCODING: UTF-8 / CAP-CP v1.2</span>
                <button
                  type="button"
                  onClick={() => playDefconAlarm()}
                  className="text-[#3FA9F5] hover:underline flex items-center space-x-1"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>TEST AUDIO WARNING SIREN</span>
                </button>
              </div>
            </div>

            {/* Delivery Channels */}
            <div>
              <label className="block text-[9px] text-[#8B95A5] uppercase mb-1">Authorized Fan-Out Channels</label>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <label className="flex items-center space-x-2 bg-[#0D1219] p-2 rounded border border-[#1F2733] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.capCell}
                    onChange={(e) => setChannels({ ...channels, capCell: e.target.checked })}
                    className="accent-[#3FA9F5]"
                  />
                  <span>CAP-CP Cell Broadcast (GSM-51)</span>
                </label>
                <label className="flex items-center space-x-2 bg-[#0D1219] p-2 rounded border border-[#1F2733] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.sirens}
                    onChange={(e) => setChannels({ ...channels, sirens: e.target.checked })}
                    className="accent-[#3FA9F5]"
                  />
                  <span>Acoustic Siren Array (110dB)</span>
                </label>
                <label className="flex items-center space-x-2 bg-[#0D1219] p-2 rounded border border-[#1F2733] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.sms}
                    onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                    className="accent-[#3FA9F5]"
                  />
                  <span>Emergency Bulk SMS Gateway</span>
                </label>
                <label className="flex items-center space-x-2 bg-[#0D1219] p-2 rounded border border-[#1F2733] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.appPush}
                    onChange={(e) => setChannels({ ...channels, appPush: e.target.checked })}
                    className="accent-[#3FA9F5]"
                  />
                  <span>Sentinel Mobile App Push</span>
                </label>
              </div>
            </div>

            {/* Security Override Code */}
            <div>
              <label className="block text-[9px] text-[#8B95A5] uppercase mb-1">Security Override Authentication Code</label>
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="w-full bg-[#0D1219] text-[#E8ECF1] p-2 rounded border border-[#1F2733] text-[11px] font-mono outline-none"
                required
              />
            </div>

            {/* Transmission Action Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#E85D5D] hover:bg-[#FF6B6B] text-[#0A0E14] font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center space-x-2 transition-all shadow-lg"
            >
              <Radio className="w-4 h-4 text-[#0A0E14]" />
              <span>TRANSMIT CELL BROADCAST TO REGIONAL POPULATION</span>
            </button>
          </form>
        </div>

        {/* Right: Broadcast Transmission & Audit History (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-[#141A24] border border-[#1F2733] rounded p-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#1F2733] pb-2 mb-3">
              <span className="text-xs font-bold text-[#E8ECF1] uppercase">
                TRANSMISSION AUDIT LOG
              </span>
              <span className="text-[9px] text-[#3DDC97]">
                CRYPTOGRAPHICALLY SIGNED
              </span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {broadcastLogs.map(log => (
                <div key={log.id} className="bg-[#0D1219] p-2.5 rounded border border-[#1F2733] space-y-1.5">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-[#3FA9F5] font-bold">{log.id}</span>
                    <span className="text-[#8B95A5]">{log.timestamp}</span>
                  </div>

                  <div className="text-[10px] font-bold text-[#E85D5D]">
                    {log.headline}
                  </div>

                  <div className="text-[9px] text-[#8B95A5]">
                    TARGET: <span className="text-[#E8ECF1]">{log.sectorName}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[8px]">
                    {log.languages.map(l => (
                      <span key={l} className="bg-[#141A24] text-[#3FA9F5] px-1.5 py-0.2 rounded border border-[#1F2733]">
                        {l}
                      </span>
                    ))}
                    {log.channels.map(c => (
                      <span key={c} className="bg-[#141A24] text-[#8B95A5] px-1.5 py-0.2 rounded border border-[#1F2733]">
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between text-[8px] text-[#5B6577] border-t border-[#18212D] pt-1 mt-1">
                    <span>REACH: {log.audienceCount.toLocaleString()} CIVILIANS</span>
                    <span>AUTH: {log.authCode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
