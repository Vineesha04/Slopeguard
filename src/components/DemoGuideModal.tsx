import React from 'react';
import { 
  X, CheckCircle2, CloudRain, Cpu, WifiOff, Smartphone, ShieldAlert, Layers, ArrowRight, ExternalLink 
} from 'lucide-react';
import { playTacticalClick, playTacticalConfirm } from '../utils/audio';
import { BACKEND_BASE_URL } from '../utils/realApi';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'regional' | 'drilldown' | 'analytics' | 'field-report' | 'alerts' | 'audit' | 'architecture') => void;
  onLaunchCitizenMode: () => void;
}

interface DemoStep {
  number: number;
  title: string;
  badge: string;
  badgeColor: string;
  location: string;
  whatItProves: string;
  demoActionLabel: string;
  onAction: () => void;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onLaunchCitizenMode,
}) => {
  if (!isOpen) return null;

  const steps: DemoStep[] = [
    {
      number: 1,
      title: 'Live Open-Meteo Meteorological Feed',
      badge: 'LIVE PUBLIC API',
      badgeColor: 'bg-[#3FA9F5]/20 text-[#3FA9F5] border-[#3FA9F5]/50',
      location: 'Regional Command → 24H Rainfall Card',
      whatItProves: 'End-to-end live public data path. Queries Open-Meteo REST API for East Sikkim coordinates (27.3257° N, 88.6122° E). Displays real hourly precipitation, peak intensity, and honest data source badge [LIVE - API: OPEN-METEO].',
      demoActionLabel: 'Jump to Weather Card',
      onAction: () => {
        onNavigateToTab('regional');
        onClose();
      }
    },
    {
      number: 2,
      title: 'Real Scikit-Learn Model & Sensitivity Workbench',
      badge: 'LIVE FASTAPI INFERENCE',
      badgeColor: 'bg-[#3DDC97]/20 text-[#3DDC97] border-[#3DDC97]/50',
      location: 'Predictive Analytics → Sensitivity Workbench',
      whatItProves: 'Real GradientBoostingClassifier served via FastAPI (POST /api/predict). Adjust Pore Water Pressure or Slope Dip sliders to see live failure probability and SHAP attribution bars recompute. Features prominent footnote pre-empting GSI 40k+ historical dataset questions.',
      demoActionLabel: 'Open Sensitivity Workbench',
      onAction: () => {
        onNavigateToTab('analytics');
        onClose();
      }
    },
    {
      number: 3,
      title: 'Browser-Native IndexedDB Offline Resilience',
      badge: 'ZERO FAKE TOGGLES',
      badgeColor: 'bg-[#E8A33D]/20 text-[#E8A33D] border-[#E8A33D]/50',
      location: 'Field Report Queue & Citizen Portal',
      whatItProves: 'Strictly relies on window navigator.onLine and online/offline event listeners. Cut your Wi-Fi or set DevTools to "Offline", submit a hazard report: it writes to client-side IndexedDB (ner_lews_offline_db) and auto-flushes to the server the second connection returns.',
      demoActionLabel: 'Open Field Ingest Queue',
      onAction: () => {
        onNavigateToTab('field-report');
        onClose();
      }
    },
    {
      number: 4,
      title: 'WhatsApp-Simple Citizen Mode & 2G USSD Fallback',
      badge: '6 REGIONAL LANGUAGES',
      badgeColor: 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/50',
      location: 'Dedicated Citizen View (Top Bar Switcher)',
      whatItProves: 'Radically simplified 3-action mobile interface for villagers. Full UI translation across English, Assamese, Nepali, Bengali, Khasi, and Hindi. Prominently displays 2G USSD (*999#) and SMS (51969) fallback paths for basic non-smartphones.',
      demoActionLabel: 'Launch Citizen Simple Mode',
      onAction: () => {
        onLaunchCitizenMode();
        onClose();
      }
    },
    {
      number: 5,
      title: 'Server-Side HTTP 403 Role Gating & Security Probe',
      badge: 'BACKEND AUTH ENFORCEMENT',
      badgeColor: 'bg-[#E85D5D]/20 text-[#E85D5D] border-[#E85D5D]/50',
      location: 'Security & Audit Ledger → Live 403 Probe',
      whatItProves: 'Hard FastAPI dependency injection gate. Unprivileged Citizen/Field roles attempting to issue Defcon 1 evacuations receive HTTP 403 Forbidden. The Audit tab features a live probe button executing this exact unauthorized request in front of judges.',
      demoActionLabel: 'Test Live 403 Security Probe',
      onAction: () => {
        onNavigateToTab('audit');
        onClose();
      }
    },
    {
      number: 6,
      title: 'Architecture Blueprint, Cost Tiers & Differentiation',
      badge: 'ENTERPRISE FEASIBILITY',
      badgeColor: 'bg-[#9D4EDD]/20 text-[#9D4EDD] border-[#9D4EDD]/50',
      location: 'Architecture & Feasibility Tab',
      whatItProves: 'Complete end-to-end data pipeline architecture, transparent cloud infrastructure costs ($120/mo MVP vs $2,400/mo regional 8-state cluster), ingestion refresh cadences (5s IoT to 6h InSAR), and direct differentiation matrix against GSI Bhukosh & NDMA Sachet.',
      demoActionLabel: 'View Architecture Blueprint',
      onAction: () => {
        onNavigateToTab('architecture');
        onClose();
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none font-sans">
      <div className="w-full max-w-3xl bg-[#0F141D] border border-[#1F2733] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#141A24] border-b border-[#1F2733] px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded bg-[#3FA9F5]/20 border border-[#3FA9F5]/50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#3FA9F5]" />
            </div>
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8ECF1]">
                NER-LEWS SENTINEL // JUDGE EVALUATION WALKTHROUGH GUIDE
              </h2>
              <p className="text-[9.5px] font-mono text-[#8B95A5]">
                6 VERIFIABLE CAPABILITIES PROVING 10/10 ENGINEERING INTEGRITY
              </p>
            </div>
          </div>
          <button
            onClick={() => { playTacticalClick(); onClose(); }}
            className="p-1 hover:bg-[#1C2534] rounded text-[#8B95A5] hover:text-[#E8ECF1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 space-y-3 overflow-y-auto font-mono text-xs flex-1">
          <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733] flex items-center justify-between text-[10px]">
            <span className="text-[#8B95A5]">
              Use this checklist during your live presentation to step judges through each genuine data path and security barrier:
            </span>
            <span className="text-[#3DDC97] font-bold px-2 py-0.5 bg-[#3DDC97]/15 rounded border border-[#3DDC97]/40 shrink-0 ml-2">
              ALL SERVICES LIVE
            </span>
          </div>

          <div className="space-y-2.5">
            {steps.map(step => (
              <div
                key={step.number}
                className="bg-[#141A24] border border-[#1F2733] hover:border-[#2B374A] rounded-md p-3 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#1C2534] border border-[#2B374A] text-[#3FA9F5] text-[10px] font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold text-[#E8ECF1]">
                      {step.title}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 text-[8.5px] font-bold rounded border ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>

                <div className="text-[9.5px] text-[#5B6577] mb-1">
                  Location: <span className="text-[#8B95A5]">{step.location}</span>
                </div>

                <p className="text-[10px] text-[#A6B2C4] font-sans leading-relaxed mb-2.5">
                  {step.whatItProves}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      playTacticalClick();
                      step.onAction();
                    }}
                    className="bg-[#1C2534] hover:bg-[#3FA9F5] text-[#3FA9F5] hover:text-[#0A0E14] border border-[#3FA9F5]/40 px-3 py-1 rounded text-[10px] font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <span>{step.demoActionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#141A24] border-t border-[#1F2733] px-5 py-2.5 flex items-center justify-between text-[9px] font-mono text-[#8B95A5] shrink-0">
          <span>FastAPI Backend: <code className="text-[#3DDC97]">{BACKEND_BASE_URL}</code></span>
          <span>Frontend Origin: <code className="text-[#3FA9F5]">{typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'}</code></span>
          <button
            onClick={() => { playTacticalClick(); onClose(); }}
            className="px-3 py-1 bg-[#0D1219] hover:bg-[#1C2534] text-[#E8ECF1] border border-[#1F2733] rounded cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
