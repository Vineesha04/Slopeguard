import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MapCanvas } from './components/MapCanvas';
import { RealGISMap } from './components/RealGISMap';
import { KPICards } from './components/KPICards';
import { RainfallAndSensorHealth } from './components/RainfallAndSensorHealth';
import { EvacAndTelemetryStream } from './components/EvacAndTelemetryStream';
import { DistrictDrillDown } from './components/DistrictDrillDown';
import { PredictiveAnalytics } from './components/PredictiveAnalytics';
import { FieldReporting } from './components/FieldReporting';
import { AlertBroadcast } from './components/AlertBroadcast';
import { AuditLogView } from './components/AuditLogView';
import { ArchitectureView } from './components/ArchitectureView';
import { CitizenView } from './components/CitizenView';
import { EvacModal } from './components/EvacModal';
import { LoginModal } from './components/LoginModal';
import { DemoGuideModal } from './components/DemoGuideModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_SECTORS, 
  INITIAL_TELEMETRY_STREAM, 
  INITIAL_CHRONO_LOG, 
  INITIAL_DISPATCH_UNITS, 
  INITIAL_FIELD_REPORTS, 
  INITIAL_BROADCAST_LOGS 
} from './data/mockData';
import { RoleType, SectorInfo, TelemetryStreamEvent, ChronoLogEntry, DispatchUnit, FieldReport, BroadcastLog } from './types';
import { playDefconAlarm } from './utils/audio';

export function App() {
  const [activeTab, setActiveTab] = useState<'regional' | 'drilldown' | 'analytics' | 'field-report' | 'alerts' | 'audit' | 'architecture'>('regional');
  const [isCitizenMode, setIsCitizenMode] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<RoleType>('REGIONAL');
  const [userName, setUserName] = useState<string>('Col. R.K. Chetri');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('ner_lews_seen_login');
    } catch {
      return false;
    }
  });
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);
  const [sectors, setSectors] = useState<SectorInfo[]>(INITIAL_SECTORS);
  const [selectedSectorId, setSelectedSectorId] = useState<string>('SK-01');
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryStreamEvent[]>(INITIAL_TELEMETRY_STREAM);
  const [chronoLog, setChronoLog] = useState<ChronoLogEntry[]>(INITIAL_CHRONO_LOG);
  const [dispatchUnits, setDispatchUnits] = useState<DispatchUnit[]>(INITIAL_DISPATCH_UNITS);
  const [fieldReports, setFieldReports] = useState<FieldReport[]>(INITIAL_FIELD_REPORTS);
  const [broadcastLogs, setBroadcastLogs] = useState<BroadcastLog[]>(INITIAL_BROADCAST_LOGS);
  const [isEvacModalOpen, setIsEvacModalOpen] = useState<boolean>(false);

  const selectedSector = sectors.find(s => s.id === selectedSectorId) || sectors[0];

  // Subtle real-time telemetry fluctuation simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSectors(prevSectors =>
        prevSectors.map(sec => {
          if (sec.id === 'SK-01') {
            const jitter = (Math.random() - 0.48) * 0.08;
            return {
              ...sec,
              porePressure: Math.round(sec.porePressure + (Math.random() - 0.49) * 0.5),
              displacementRate: Number((sec.displacementRate + jitter).toFixed(1)),
            };
          }
          return sec;
        })
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Drill-down from map or table
  const handleDrillDown = (sectorId: string) => {
    setSelectedSectorId(sectorId);
    setActiveTab('drilldown');
  };

  // Unit dispatch action
  const handleUpdateUnitStatus = (unitId: string, status: DispatchUnit['status']) => {
    setDispatchUnits(prev =>
      prev.map(u => (u.id === unitId ? { ...u, status } : u))
    );
  };

  // Add chrono log entry
  const handleAddChronoEntry = (entry: Omit<ChronoLogEntry, 'id'>) => {
    const newEntry: ChronoLogEntry = {
      id: `CL-${Date.now()}`,
      ...entry,
    };
    setChronoLog(prev => [newEntry, ...prev]);
  };

  // Field report submit
  const handleFieldReportSubmit = (report: FieldReport) => {
    setFieldReports(prev => [report, ...prev]);
    handleAddChronoEntry({
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      title: `CITIZEN REPORT ${report.id} RECEIVED`,
      body: `Observation from ${report.reporterName} at ${report.locationName}: "${report.description}"`,
      severity: report.severityEstimate === 'Critical Failure' ? 'CRIT' : 'WARN',
      author: 'CITIZEN REPORT INTAKE'
    });
  };

  // Verify and promote field report to Sentinel Stream
  const handleVerifyAndPromote = (reportId: string) => {
    const report = fieldReports.find(r => r.id === reportId);
    if (!report) return;

    setFieldReports(prev =>
      prev.map(r =>
        r.id === reportId ? { ...r, verificationStatus: 'VERIFIED', verifiedBy: userName } : r
      )
    );

    const newStreamEvent: TelemetryStreamEvent = {
      id: `EV-${Math.floor(10500 + Math.random() * 500)}`,
      sev: report.severityEstimate === 'Critical Failure' || report.severityEstimate === 'Severe' ? 'CRIT' : 'WARN',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      district: `${report.locationName}`,
      hazardVector: `Field-Confirmed: ${report.hazardType}`,
      criticalMetrics: `Ground Fissure Active • GPS Verified`,
      aiConfidence: `100% (Human Verified by ${userName})`,
      sectorId: 'SK-01',
      model: 'Field Sentinel Ingest',
    };

    setTelemetryEvents(prev => [newStreamEvent, ...prev]);

    handleAddChronoEntry({
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      title: `FIELD REPORT ${report.id} VERIFIED & PROMOTED`,
      body: `Ground observation by ${report.reporterName} elevated to active incident by ${userName}.`,
      severity: 'CRIT',
      author: userName
    });
  };

  // Broadcast alert send
  const handleSendBroadcast = (log: BroadcastLog) => {
    setBroadcastLogs(prev => [log, ...prev]);
    handleAddChronoEntry({
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      title: `MASS CAP-CP CELL BROADCAST EXECUTED`,
      body: `Transmitted priority alert to ${log.audienceCount.toLocaleString()} civilians across ${log.sectorName}. Authorized by ${userName}.`,
      severity: 'CRIT',
      author: userName
    });
  };

  // Evacuation authorization confirm
  const handleConfirmEvacuation = (code: string) => {
    setIsEvacModalOpen(false);
    playDefconAlarm();

    const evacLog: BroadcastLog = {
      id: `BC-EVAC-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' IST',
      sectorName: selectedSector.name,
      headline: `DEFCON 1 EVACUATION ORDER EXECUTED // CODE: ${code}`,
      languages: ['EN', 'NEPALI', 'HINDI'],
      channels: ['CAP-CP Cell Broadcast', 'Sirens Array 110dB', 'SDRF Radio'],
      audienceCount: selectedSector.populationAtRisk,
      authorizedBy: `${userName} (${currentRole})`,
      authCode: code,
      status: 'SENT'
    };

    setBroadcastLogs(prev => [evacLog, ...prev]);

    handleAddChronoEntry({
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      title: `DEFCON 1 MASS EVACUATION ORDER ISSUED`,
      body: `All traffic halted on ${selectedSector.corridor}. SDRF mobilized for rapid relocation of ${selectedSector.populationAtRisk.toLocaleString()} residents. Authorized by ${userName}.`,
      severity: 'CRIT',
      author: userName
    });
  };

  const handleRoleSelection = (role: RoleType, name: string) => {
    setCurrentRole(role);
    setUserName(name);
    if (role === 'FIELD') {
      setIsCitizenMode(true);
    }
  };

  // If in Citizen Simple Mode, render the dedicated mobile citizen view
  if (isCitizenMode) {
    return (
      <CitizenView
        onBackToCommand={() => setIsCitizenMode(false)}
        onSubmitReportToGlobal={handleFieldReportSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0E14] text-[#E8ECF1]">
      {/* Persistent Mission Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        userName={userName}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onSwitchToCitizenMode={() => setIsCitizenMode(true)}
        onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
      />

      {/* Main Mission Dashboard Content */}
      <main className="flex-1 px-4 py-3 max-w-[1720px] w-full mx-auto">
        {/* Tab 1: Regional Command View */}
        {activeTab === 'regional' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* GIS Top Map Canvas */}
            <MapCanvas
              sectors={sectors}
              onSelectSector={handleDrillDown}
              selectedSectorId={selectedSectorId}
            />

            {/* Real GIS Map (genuine OpenStreetMap tiles, real lat/lng markers) */}
            <RealGISMap
              sectors={sectors}
              onSelectSector={handleDrillDown}
              selectedSectorId={selectedSectorId}
            />

            {/* KPI Cards & Threat Matrix */}
            <KPICards
              sector={selectedSector}
              onSelectHotspot={handleDrillDown}
            />

            {/* 24H Rainfall Accumulation Chart (Live Open-Meteo API) & Sensor Health */}
            <RainfallAndSensorHealth />

            {/* Evacuation Command Dispatch & Automated Sentinel Telemetry Stream */}
            <EvacAndTelemetryStream
              events={telemetryEvents}
              onDrillDown={handleDrillDown}
              onTriggerEvacuationModal={() => setIsEvacModalOpen(true)}
            />
          </div>
        )}

        {/* Tab 2: District Drill-Down View */}
        {activeTab === 'drilldown' && (
          <div className="animate-in fade-in duration-200">
            <DistrictDrillDown
              selectedSector={selectedSector}
              allSectors={sectors}
              onSelectSector={setSelectedSectorId}
              chronoLog={chronoLog}
              onAddChronoEntry={handleAddChronoEntry}
              dispatchUnits={dispatchUnits}
              onUpdateUnitStatus={handleUpdateUnitStatus}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
            />
          </div>
        )}

        {/* Tab 3: Predictive Analytics View */}
        {activeTab === 'analytics' && (
          <div className="animate-in fade-in duration-200">
            <PredictiveAnalytics
              sectors={sectors}
              onSelectSectorAndDrillDown={handleDrillDown}
            />
          </div>
        )}

        {/* Companion Tab: Field Reporting Queue */}
        {activeTab === 'field-report' && (
          <div className="animate-in fade-in duration-200">
            <FieldReporting
              reports={fieldReports}
              onSubmitReport={handleFieldReportSubmit}
              onVerifyAndPromote={handleVerifyAndPromote}
              currentRole={currentRole}
            />
          </div>
        )}

        {/* Companion Tab: Multilingual Alerts & Broadcast Gateway */}
        {activeTab === 'alerts' && (
          <div className="animate-in fade-in duration-200">
            <AlertBroadcast
              broadcastLogs={broadcastLogs}
              onSendBroadcast={handleSendBroadcast}
            />
          </div>
        )}

        {/* Companion Tab: Architecture & Feasibility Blueprint */}
        {activeTab === 'architecture' && (
          <div className="animate-in fade-in duration-200">
            <ArchitectureView />
          </div>
        )}

        {/* Companion Tab: Security & Audit Ledger */}
        {activeTab === 'audit' && (
          <div className="animate-in fade-in duration-200">
            <AuditLogView />
          </div>
        )}
      </main>

      {/* Evacuation Authorization Confirmation Modal */}
      <EvacModal
        isOpen={isEvacModalOpen}
        onClose={() => setIsEvacModalOpen(false)}
        sector={selectedSector}
        currentRole={currentRole}
        userName={userName}
        onConfirmEvacuation={handleConfirmEvacuation}
      />

      {/* Login & Role Clearance Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          try { sessionStorage.setItem('ner_lews_seen_login', 'true'); } catch {}
          setIsLoginModalOpen(false);
        }}
        currentRole={currentRole}
        onSelectRole={(role, name) => {
          try { sessionStorage.setItem('ner_lews_seen_login', 'true'); } catch {}
          handleRoleSelection(role, name);
        }}
      />

      {/* SIH Judge Demo Walkthrough Guide Modal */}
      <DemoGuideModal
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        onNavigateToTab={(tab) => {
          setIsCitizenMode(false);
          setActiveTab(tab);
        }}
        onLaunchCitizenMode={() => setIsCitizenMode(true)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
