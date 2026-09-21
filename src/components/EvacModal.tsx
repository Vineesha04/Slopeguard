import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, X, Radio, Lock, AlertCircle } from 'lucide-react';
import { SectorInfo, RoleType } from '../types';
import { playDefconAlarm, playTacticalClick } from '../utils/audio';
import { executeRoleGatedEvacuation } from '../utils/realApi';

interface EvacModalProps {
  isOpen: boolean;
  onClose: () => void;
  sector: SectorInfo;
  currentRole: RoleType;
  userName: string;
  onConfirmEvacuation: (code: string) => void;
}

export const EvacModal: React.FC<EvacModalProps> = ({
  isOpen,
  onClose,
  sector,
  currentRole,
  userName,
  onConfirmEvacuation,
}) => {
  const [overrideCode, setOverrideCode] = useState<string>('SEC-NER-4921');
  const [pinCode, setPinCode] = useState<string>('9941');
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setErrorMsg(null);
    setSubmitting(true);

    const result = await executeRoleGatedEvacuation(
      {
        sector_id: sector.id,
        override_code: overrideCode,
        authorizing_officer: userName,
        pin_code: pinCode
      },
      currentRole
    );

    setSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Server authorization rejected.');
      return;
    }

    playDefconAlarm();
    onConfirmEvacuation(overrideCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-sans">
      <div className="w-full max-w-xl bg-[#0F141D] border-2 border-[#E85D5D] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Modal Red Alert Header */}
        <div className="bg-[#E85D5D] text-[#0A0E14] px-4 py-2.5 flex items-center justify-between font-mono font-bold">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <span className="text-sm tracking-widest uppercase">
              DEFCON 1 // IMMEDIATE EVACUATION ORDER AUTHORIZATION
            </span>
          </div>
          <button
            onClick={() => { playTacticalClick(); onClose(); }}
            className="p-1 hover:bg-[#0A0E14]/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 font-mono text-xs text-[#E8ECF1]">
          {errorMsg && (
            <div className="bg-[#E85D5D]/20 border-2 border-[#E85D5D] p-3 rounded text-[#FF6B6B] flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <strong className="block text-[11px] uppercase">SERVER SECURITY AUTHORIZATION REJECTED</strong>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Warning Banner */}
          <div className="bg-[#E85D5D]/15 border border-[#E85D5D]/60 p-3 rounded text-[#E85D5D] flex items-start space-x-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold uppercase tracking-wider text-[11px]">
                HIGH-CONSEQUENCE TACTICAL ACTION GATED BY 2-STEP CONFIRMATION
              </div>
              <p className="text-[10px] text-[#E8ECF1]/90 leading-normal">
                Executing this command triggers instantaneous CAP-CP geo-fenced cell broadcasts to {sector.populationAtRisk.toLocaleString()} citizens, activates local 110dB siren towers, and formally mobilizes SDRF 1st & 3rd Battalions along {sector.corridor}.
              </p>
            </div>
          </div>

          {/* Target Sector Details */}
          <div className="bg-[#141A24] p-3 rounded border border-[#1F2733] space-y-1.5 text-[10px]">
            <div className="text-[#8B95A5] uppercase text-[9px]">TARGET SECTOR / JURISDICTION</div>
            <div className="text-sm font-bold text-[#3FA9F5]">{sector.name}</div>
            <div className="grid grid-cols-2 gap-2 text-[#8B95A5] pt-1">
              <div>POPULATION AT RISK: <strong className="text-[#E85D5D]">{sector.populationAtRisk.toLocaleString()}</strong></div>
              <div>CURRENT BREACH INDEX: <strong className="text-[#E85D5D]">{sector.breachIndex.toFixed(1)} / 100</strong></div>
              <div>ACTIVE OPERATOR: <strong className="text-[#3FA9F5]">{userName} ({currentRole})</strong></div>
              <div>INCIDENT COMMANDER: <strong className="text-[#E8ECF1]">{sector.commander}</strong></div>
            </div>
          </div>

          {/* Security Verification Form */}
          <div className="space-y-2 bg-[#0D1219] p-3 rounded border border-[#1F2733]">
            <div className="flex items-center space-x-1.5 text-[#3FA9F5] text-[10px] font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>CRYPTOGRAPHIC CLEARANCE OVERRIDE</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[8.5px] text-[#8B95A5] uppercase mb-0.5">Override Security Code</label>
                <input
                  type="text"
                  value={overrideCode}
                  onChange={(e) => setOverrideCode(e.target.value)}
                  className="w-full bg-[#141A24] text-[#E8ECF1] p-1.5 rounded border border-[#1F2733] font-mono text-xs outline-none"
                  placeholder="SEC-NER-4921"
                />
              </div>

              <div>
                <label className="block text-[8.5px] text-[#8B95A5] uppercase mb-0.5">Authorization PIN</label>
                <input
                  type="password"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full bg-[#141A24] text-[#E8ECF1] p-1.5 rounded border border-[#1F2733] font-mono text-xs outline-none tracking-widest"
                  placeholder="••••"
                />
              </div>
            </div>

            {/* Checkbox Acknowledgment */}
            <label className="flex items-start space-x-2 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 accent-[#E85D5D]"
              />
              <span className="text-[9.5px] text-[#8B95A5]">
                I certify that geological failure threshold has been verified and authorize immediate population evacuation under NDMA Disaster Management Act Section 30.
              </span>
            </label>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => { playTacticalClick(); onClose(); }}
              className="w-1/3 py-2.5 bg-[#141A24] hover:bg-[#1C2534] text-[#8B95A5] hover:text-[#E8ECF1] font-mono font-bold text-xs uppercase tracking-wider rounded border border-[#1F2733] transition-colors"
            >
              ABORT ACTION
            </button>

            <button
              onClick={handleConfirm}
              disabled={!acknowledged || submitting}
              className={`w-2/3 py-2.5 font-display font-extrabold text-xs uppercase tracking-widest rounded flex items-center justify-center space-x-2 transition-all shadow-lg ${
                acknowledged && !submitting
                  ? 'bg-[#E85D5D] hover:bg-[#FF6B6B] text-[#0A0E14] cursor-pointer shadow-[#E85D5D]/30'
                  : 'bg-[#1F2733] text-[#5B6577] cursor-not-allowed'
              }`}
            >
              <Radio className="w-4 h-4 text-[#0A0E14]" />
              <span>{submitting ? 'VALIDATING CLEARANCE...' : 'CONFIRM & EXECUTE EVACUATION'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
