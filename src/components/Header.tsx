import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, ShieldAlert, User, ShieldCheck, Activity, Radio, 
  Cpu, Clock, Smartphone, Bell, History, Layers, KeyRound, ArrowRight, BookOpen 
} from 'lucide-react';
import { RoleType } from '../types';
import { getSoundMuted, setSoundMuted, playTacticalClick } from '../utils/audio';

interface HeaderProps {
  activeTab: 'regional' | 'drilldown' | 'analytics' | 'field-report' | 'alerts' | 'audit' | 'architecture';
  setActiveTab: (tab: 'regional' | 'drilldown' | 'analytics' | 'field-report' | 'alerts' | 'audit' | 'architecture') => void;
  currentRole: RoleType;
  userName: string;
  onOpenLoginModal: () => void;
  onSwitchToCitizenMode: () => void;
  onOpenDemoGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  userName,
  onOpenLoginModal,
  onSwitchToCitizenMode,
  onOpenDemoGuide,
}) => {
  const [istTime, setIstTime] = useState<string>('');
  const [missionClock, setMissionClock] = useState<string>('');
  const [muted, setMuted] = useState<boolean>(getSoundMuted());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const millis = String(now.getMilliseconds()).padStart(3, '0');
      setIstTime(`${hours}:${mins}:${secs} IST`);
      setMissionClock(`11:01:${secs}.${millis} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 47);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (!nextMuted) {
      playTacticalClick();
    }
  };

  const handleTabChange = (tab: HeaderProps['activeTab']) => {
    playTacticalClick();
    setActiveTab(tab);
  };

  return (
    <header className="w-full bg-[#0A0E14] border-b border-[#1F2733] select-none sticky top-0 z-50">
      {/* Topmost Level Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#18202C]">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabChange('regional')}>
          <div className="w-8 h-8 rounded border border-[#3FA9F5]/40 bg-[#141A24] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#3FA9F5]/10 group-hover:bg-[#3FA9F5]/20 transition-colors" />
            <svg className="w-5 h-5 text-[#3FA9F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 22h20L12 2z" />
              <path d="M12 9v4" stroke="#E85D5D" strokeWidth="2.5" />
              <circle cx="12" cy="17" r="1" fill="#E85D5D" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-[15px] font-extrabold tracking-widest text-[#E8ECF1] font-display">
                NER-LEWS <span className="text-[#3FA9F5]">//</span> SENTINEL COMMAND
              </h1>
            </div>
            <p className="text-[9px] tracking-widest2 text-[#8B95A5] uppercase font-mono">
              NORTH EASTERN LANDSLIDE EARLY WARNING & RESILIENCE SYSTEM
            </p>
          </div>
        </div>

        {/* Status Indicators, Citizen Switcher & Authenticated Profile */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          {/* SIH Judge Demo Guide Trigger */}
          <button
            onClick={() => { playTacticalClick(); onOpenDemoGuide(); }}
            className="bg-[#1C2534] hover:bg-[#3FA9F5] text-[#3FA9F5] hover:text-[#0A0E14] border border-[#3FA9F5]/60 px-2.5 py-1 rounded font-bold flex items-center space-x-1.5 transition-all text-[11px] shadow-sm cursor-pointer animate-pulse"
            title="Open SIH 6-Checkpoint Demo Walkthrough Guide"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>DEMO GUIDE</span>
          </button>

          {/* Quick Switch to Citizen Simple Mode Button (For Judges) */}
          <button
            onClick={onSwitchToCitizenMode}
            className="bg-[#38BDF8] hover:bg-[#0284C7] text-[#0A0E14] px-2.5 py-1 rounded font-bold flex items-center space-x-1.5 transition-colors text-[11px] shadow-sm cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>SWITCH TO CITIZEN MODE</span>
          </button>

          {/* GPS Clock */}
          <div className="bg-[#141A24] border border-[#1F2733] px-2 py-1 rounded text-[#8B95A5] hidden md:flex items-center space-x-1.5">
            <span className="text-[#E8ECF1] font-semibold">{istTime || '05:42:19 IST'}</span>
            <span className="text-[10px] text-[#5B6577]">[GPS-LOCKED]</span>
          </div>

          {/* System Nodes Status */}
          <div className="bg-[#141A24] border border-[#1F2733] px-2 py-1 rounded hidden lg:flex items-center space-x-1.5 text-[#3DDC97]">
            <span className="w-2 h-2 rounded-full bg-[#3DDC97] animate-pulse" />
            <span className="text-[11px] font-medium tracking-wide">SYS: ACTIVE [ALL NODES OK]</span>
          </div>

          {/* Defcon / Evac Ready Badge */}
          <div className="bg-[#E85D5D]/15 border border-[#E85D5D]/50 text-[#E85D5D] px-2 py-1 rounded flex items-center space-x-1.5 font-bold tracking-wider text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span>DEFCON 2</span>
          </div>

          {/* Audio Synthesizer Mute Toggle */}
          <button
            onClick={toggleSound}
            title={muted ? 'Tactical Audio Muted' : 'Tactical Audio Active'}
            className="p-1.5 rounded bg-[#141A24] border border-[#1F2733] text-[#8B95A5] hover:text-[#3FA9F5] hover:border-[#3FA9F5]/40 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-[#8B95A5]" /> : <Volume2 className="w-4 h-4 text-[#3FA9F5]" />}
          </button>

          {/* Authenticated User Button */}
          <button
            onClick={() => { playTacticalClick(); onOpenLoginModal(); }}
            className="flex items-center space-x-1.5 bg-[#141A24] border border-[#1F2733] hover:border-[#3FA9F5]/50 px-2.5 py-1 rounded text-[#E8ECF1] transition-colors cursor-pointer"
            title="Switch Operator Role / Security Clearance"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#3FA9F5]" />
            <span className="text-[10px] text-[#3FA9F5] font-bold uppercase">{userName}</span>
            <span className="text-[9px] text-[#8B95A5] bg-[#0A0E14] px-1 rounded border border-[#1F2733]">
              {currentRole}
            </span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-1.5 bg-[#0D1219]">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Tab 1: Regional Command */}
          <button
            onClick={() => handleTabChange('regional')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'regional'
                ? 'bg-[#3FA9F5] text-[#0A0E14] shadow-md shadow-[#3FA9F5]/30'
                : 'text-[#8B95A5] hover:text-[#E8ECF1] hover:bg-[#141A24]'
            }`}
          >
            REGIONAL COMMAND
          </button>

          {/* Tab 2: District Drill-Down */}
          <button
            onClick={() => handleTabChange('drilldown')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'drilldown'
                ? 'bg-[#3FA9F5] text-[#0A0E14] shadow-md shadow-[#3FA9F5]/30'
                : 'text-[#8B95A5] hover:text-[#E8ECF1] hover:bg-[#141A24]'
            }`}
          >
            DISTRICT DRILL-DOWN
          </button>

          {/* Tab 3: Predictive Analytics */}
          <button
            onClick={() => handleTabChange('analytics')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'analytics'
                ? 'bg-[#3FA9F5] text-[#0A0E14] shadow-md shadow-[#3FA9F5]/30'
                : 'text-[#8B95A5] hover:text-[#E8ECF1] hover:bg-[#141A24]'
            }`}
          >
            PREDICTIVE ANALYTICS
          </button>

          <div className="h-4 w-[1px] bg-[#1F2733] mx-1 hidden sm:block" />

          {/* Field Reporting Queue */}
          <button
            onClick={() => handleTabChange('field-report')}
            className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-all rounded flex items-center space-x-1 ${
              activeTab === 'field-report'
                ? 'bg-[#1C2534] text-[#3FA9F5] border border-[#3FA9F5]/50'
                : 'text-[#8B95A5] hover:text-[#E8ECF1] border border-transparent'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#3FA9F5]" />
            <span>FIELD REPORT QUEUE</span>
          </button>

          {/* Broadcast Alerts */}
          <button
            onClick={() => handleTabChange('alerts')}
            className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-all rounded flex items-center space-x-1 ${
              activeTab === 'alerts'
                ? 'bg-[#1C2534] text-[#E85D5D] border border-[#E85D5D]/50'
                : 'text-[#8B95A5] hover:text-[#E8ECF1] border border-transparent'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-[#E85D5D]" />
            <span>BROADCAST GATEWAY</span>
          </button>

          {/* Architecture & Feasibility */}
          <button
            onClick={() => handleTabChange('architecture')}
            className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-all rounded flex items-center space-x-1 ${
              activeTab === 'architecture'
                ? 'bg-[#1C2534] text-[#3DDC97] border border-[#3DDC97]/50'
                : 'text-[#8B95A5] hover:text-[#E8ECF1] border border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#3DDC97]" />
            <span>ARCHITECTURE & FEASIBILITY</span>
          </button>

          {/* Audit Ledger */}
          <button
            onClick={() => handleTabChange('audit')}
            className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-all rounded flex items-center space-x-1 ${
              activeTab === 'audit'
                ? 'bg-[#1C2534] text-[#E8ECF1] border border-[#E8ECF1]/50'
                : 'text-[#8B95A5] hover:text-[#E8ECF1] border border-transparent'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>AUDIT LEDGER</span>
          </button>
        </div>

        {/* Sector Status Chips & Telemetry Nodes count */}
        <div className="hidden xl:flex items-center space-x-4 text-[11px] font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="text-[#8B95A5] uppercase text-[10px] tracking-wider">SECTOR STATUS:</span>
            <span className="px-1.5 py-0.5 bg-[#E85D5D]/20 border border-[#E85D5D]/60 text-[#E85D5D] font-bold rounded-xs">
              SK-01 CRIT
            </span>
            <span className="px-1.5 py-0.5 bg-[#E85D5D]/20 border border-[#E85D5D]/60 text-[#E85D5D] font-bold rounded-xs">
              AS-04 CRIT
            </span>
            <span className="px-1.5 py-0.5 bg-[#1F2733] border border-[#2B374A] text-[#8B95A5] rounded-xs">
              ML-02 WARN
            </span>
            <span className="px-1.5 py-0.5 bg-[#1F2733] border border-[#2B374A] text-[#8B95A5] rounded-xs">
              AR-03 WARN
            </span>
          </div>

          <div className="flex items-center space-x-1.5 pl-3 border-l border-[#1F2733]">
            <span className="text-[#8B95A5] uppercase text-[10px] tracking-wider">TELEMETRY NODES:</span>
            <span className="text-[#3DDC97] font-bold">1,420/1,428 ONLINE</span>
          </div>
        </div>
      </div>

      {/* Contextual Sub-Header Strip */}
      <div className="hidden sm:flex items-center justify-between px-4 py-1 bg-[#0A0D12] text-[10px] font-mono border-t border-[#18202C] text-[#8B95A5]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
            <span>IMD DOPPLER:</span>
            <span className="text-[#3DDC97] font-semibold">LIVE @ GUWAHATI-AGARTALA RADAR LINK</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Activity className="w-3 h-3 text-[#3FA9F5]" />
            <span>GSI-INSAR:</span>
            <span className="text-[#3FA9F5] font-semibold">CO-REG LOCKED [NISAR / SENTINEL-1B]</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Radio className="w-3 h-3 text-[#3FA9F5]" />
            <span>TELEMETRY RIGS:</span>
            <span className="text-[#E8ECF1] font-semibold">1,420 / 1,428 ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <Cpu className="w-3 h-3 text-[#3FA9F5]" />
            <span>COMPUTE ENGINE:</span>
            <span className="text-[#3FA9F5]">CUDA-TENSOR FLOW v4.8</span>
            <span className="text-[#5B6577]">[0.04ms LATENCY]</span>
          </div>

          <div className="flex items-center space-x-1.5 text-[#E8ECF1] bg-[#141A24] px-2 py-0.5 rounded border border-[#1F2733]">
            <Clock className="w-3 h-3 text-[#3FA9F5]" />
            <span className="text-[#8B95A5]">MISSION CLOCK:</span>
            <span className="font-semibold text-[#E8ECF1]">{missionClock}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
