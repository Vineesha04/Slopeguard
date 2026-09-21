import React, { useState } from 'react';
import { ShieldCheck, User, Lock, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { RoleType } from '../types';
import { playTacticalClick, playTacticalConfirm } from '../utils/audio';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: RoleType;
  onSelectRole: (role: RoleType, userName: string) => void;
}

interface RoleOption {
  role: RoleType;
  title: string;
  name: string;
  affiliation: string;
  clearance: string;
  permissions: string[];
}

const PRESET_ACCOUNTS: RoleOption[] = [
  {
    role: 'REGIONAL',
    title: 'NDMA Regional Command',
    name: 'Col. R.K. Chetri',
    affiliation: 'National Disaster Management Authority (NER Sector)',
    clearance: 'DEFCON 1 / FULL COMMAND',
    permissions: [
      'Trigger multi-district CAP-CP cell broadcasts',
      'Authorize 2-step armed mass evacuation orders',
      'Deploy joint SDRF/NDMA battalions',
      'Review & seal cryptographic security audit ledgers'
    ]
  },
  {
    role: 'DISTRICT',
    title: 'District Incident Officer',
    name: 'Maj. P. Saikia',
    affiliation: 'District Emergency Operations Center (DEOC Pakyong)',
    clearance: 'LEVEL 2 TACTICAL FIELD',
    permissions: [
      'Issue localized single-district evacuation orders',
      'Mobilize BRO heavy excavators & local SDRF units',
      'Verify & promote citizen reports into Sentinel Stream',
      'Inspect high-resolution PTZ camera feeds'
    ]
  },
  {
    role: 'FIELD',
    title: 'Citizen & Field Volunteer',
    name: 'Tashi Tshering Bhutia',
    affiliation: 'Village Disaster Management Committee / Local Citizen',
    clearance: 'LEVEL 4 COMMUNITY',
    permissions: [
      'Submit geo-tagged crack & rockfall field reports',
      'Store offline hazard submissions in IndexedDB',
      'View local district hazard warnings in 4 languages',
      'Restricted: Cannot trigger mass broadcast or evacuation'
    ]
  }
];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
}) => {
  const [selected, setSelected] = useState<RoleType>(currentRole);
  const [password, setPassword] = useState<string>('••••••••');

  if (!isOpen) return null;

  const handleLogin = () => {
    playTacticalConfirm();
    const account = PRESET_ACCOUNTS.find(a => a.role === selected) || PRESET_ACCOUNTS[0];
    onSelectRole(selected, account.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none font-sans">
      <div className="w-full max-w-xl bg-[#0F141D] border border-[#1F2733] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="bg-[#141A24] border-b border-[#1F2733] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#3FA9F5]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8ECF1]">
              NER-LEWS OPERATOR AUTHENTICATION // CLEARANCE GATEWAY
            </span>
          </div>
          <button
            onClick={() => { playTacticalClick(); onClose(); }}
            className="p-1 hover:bg-[#1C2534] rounded text-[#8B95A5] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 font-mono text-xs text-[#E8ECF1]">
          <p className="text-[10px] text-[#8B95A5]">
            Select an authorized operational role to switch security clearance level:
          </p>

          <div className="space-y-2">
            {PRESET_ACCOUNTS.map(acc => (
              <div
                key={acc.role}
                onClick={() => { playTacticalClick(); setSelected(acc.role); }}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  selected === acc.role
                    ? 'bg-[#1C2534] border-[#3FA9F5] shadow-lg shadow-[#3FA9F5]/10'
                    : 'bg-[#0D1219] border-[#1F2733] hover:border-[#2B3648]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <User className={`w-3.5 h-3.5 ${selected === acc.role ? 'text-[#3FA9F5]' : 'text-[#8B95A5]'}`} />
                    <span className="font-bold text-xs text-[#E8ECF1]">{acc.title}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                    acc.role === 'REGIONAL'
                      ? 'bg-[#E85D5D]/20 text-[#E85D5D]'
                      : acc.role === 'DISTRICT'
                      ? 'bg-[#E8A33D]/20 text-[#E8A33D]'
                      : 'bg-[#3DDC97]/20 text-[#3DDC97]'
                  }`}>
                    {acc.clearance}
                  </span>
                </div>

                <div className="text-[9px] text-[#8B95A5] mb-1.5">
                  Assigned Officer: <strong className="text-[#E8ECF1]">{acc.name}</strong> • {acc.affiliation}
                </div>

                <ul className="text-[8px] text-[#5B6577] space-y-0.5 pl-1 border-t border-[#18212D] pt-1">
                  {acc.permissions.map((perm, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <span className="text-[#3FA9F5]">•</span>
                      <span>{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1F2733]">
            <button
              onClick={() => { playTacticalClick(); onClose(); }}
              className="px-4 py-2 bg-[#141A24] hover:bg-[#1C2534] text-[#8B95A5] font-bold rounded border border-[#1F2733] transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleLogin}
              className="px-5 py-2 bg-[#3FA9F5] hover:bg-[#5BB7F7] text-[#0A0E14] font-bold rounded flex items-center space-x-1.5 transition-all shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AUTHENTICATE OPERATOR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
