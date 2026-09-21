import React from 'react';
import { 
  Layers, Server, Database, CloudRain, Cpu, Radio, ShieldCheck, 
  DollarSign, Clock, CheckCircle2, XCircle, ArrowRight, Zap, Smartphone 
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Top Banner */}
      <div className="bg-[#141A24] border border-[#1F2733] rounded p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2733] pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#3FA9F5]" />
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#E8ECF1]">
                NER-LEWS SYSTEM ARCHITECTURE & ENGINEERING FEASIBILITY
              </h2>
              <p className="text-[10px] font-mono text-[#8B95A5]">
                END-TO-END DATAFLOW, CLOUD INFRASTRUCTURE BUDGET, SENSOR CADENCE, AND COMPETITIVE DIFFERENTIATION
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-[#3DDC97]/20 text-[#3DDC97] border border-[#3DDC97]/50 font-bold">
              PRODUCTION ARCHITECTURE v2.1
            </span>
          </div>
        </div>

        <p className="text-xs text-[#8B95A5] leading-relaxed">
          NER-LEWS (North Eastern Region Landslide Early Warning System) is architected specifically to overcome the unique physiographic challenges of the Eastern Himalayas: severe cloud-cover obscuring optical satellites, fractured communication backhauls during monsoon cloudbursts, and complex colluvium shear mechanics.
        </p>
      </div>

      {/* 1. End-to-End System Pipeline Diagram (Interactive SVG) */}
      <div className="bg-[#141A24] border border-[#1F2733] rounded p-4 font-mono">
        <div className="flex items-center justify-between border-b border-[#1F2733] pb-2 mb-4">
          <span className="text-xs font-bold text-[#E8ECF1] uppercase tracking-wider flex items-center space-x-1.5">
            <Server className="w-4 h-4 text-[#3FA9F5]" />
            <span>END-TO-END DATA INGESTION & ALERTING PIPELINE</span>
          </span>
          <span className="text-[9px] text-[#8B95A5]">EVENT-DRIVEN STREAM ARCHITECTURE</span>
        </div>

        {/* Tactical Pipeline Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-[10px]">
          {/* Stage 1: Data Sources */}
          <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733] space-y-2">
            <div className="text-[11px] font-bold text-[#3FA9F5] border-b border-[#18212D] pb-1">
              1. INGESTION SOURCES
            </div>
            <div className="space-y-1.5 text-[#8B95A5]">
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">IMD Weather Radar</strong>
                <div className="text-[8.5px] text-[#3DDC97]">15-min live precipitation API</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">Satellite Sentinel & NISAR</strong>
                <div className="text-[8.5px] text-[#3FA9F5]">6-12h InSAR deformation pass</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">LoRaWAN Borehole IoT</strong>
                <div className="text-[8.5px] text-[#E8A33D]">5s Piezometer/Geophone telemetry</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">Citizen Mobile PWA</strong>
                <div className="text-[8.5px] text-[#3FA9F5]">Offline IndexedDB geo-reports</div>
              </div>
            </div>
          </div>

          {/* Stage 2: Ingestion & Normalization */}
          <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733] space-y-2">
            <div className="text-[11px] font-bold text-[#3FA9F5] border-b border-[#18212D] pb-1">
              2. INGESTION GATEWAY
            </div>
            <div className="space-y-1.5 text-[#8B95A5]">
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">Apache Kafka / RabbitMQ</strong>
                <div className="text-[8.5px]">Partitioned by NER district sectors</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">TimescaleDB Engine</strong>
                <div className="text-[8.5px]">Pore-pressure & VWC time-series</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">PostGIS Vector Engine</strong>
                <div className="text-[8.5px]">MBT/Dauki fault lines & elevation slices</div>
              </div>
            </div>
          </div>

          {/* Stage 3: ML Risk Engine */}
          <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733] space-y-2">
            <div className="text-[11px] font-bold text-[#3FA9F5] border-b border-[#18212D] pb-1">
              3. AI/ML RISK ENGINE
            </div>
            <div className="space-y-1.5 text-[#8B95A5]">
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">Bishop Limit Equilibrium</strong>
                <div className="text-[8.5px] text-[#E85D5D]">Calculates real FoS (&lt; 1.0 Unstable)</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">GradientBoosting v1.4</strong>
                <div className="text-[8.5px] text-[#3DDC97]">AUC 0.942 failure classifier</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">SHAP Explainability</strong>
                <div className="text-[8.5px]">Pore pressure (34%), Rain (28%) weights</div>
              </div>
            </div>
          </div>

          {/* Stage 4: Dashboards */}
          <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733] space-y-2">
            <div className="text-[11px] font-bold text-[#3FA9F5] border-b border-[#18212D] pb-1">
              4. OPERATOR SURFACES
            </div>
            <div className="space-y-1.5 text-[#8B95A5]">
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">Regional SCADA Center</strong>
                <div className="text-[8.5px]">NDMA / State HQ multi-district GIS</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">District Tactical Drill-Down</strong>
                <div className="text-[8.5px]">PTZ camera, transect slice, dispatch</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">Citizen Simple Mode</strong>
                <div className="text-[8.5px] text-[#3FA9F5]">4 regional languages, offline sync</div>
              </div>
            </div>
          </div>

          {/* Stage 5: Alert Fan-out */}
          <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733] space-y-2">
            <div className="text-[11px] font-bold text-[#E85D5D] border-b border-[#18212D] pb-1">
              5. ALERT FAN-OUT
            </div>
            <div className="space-y-1.5 text-[#8B95A5]">
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">CAP-CP Cell Broadcast</strong>
                <div className="text-[8.5px] text-[#E85D5D]">GSM-51 priority geo-fenced sirens</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">Telecom Bulk SMS</strong>
                <div className="text-[8.5px]">Nepali, Assamese, Bengali, Khasi</div>
              </div>
              <div className="bg-[#141A24] p-1.5 rounded border border-[#1F2733]">
                <strong className="text-[#E8ECF1]">2G USSD / Feature Phone</strong>
                <div className="text-[8.5px] text-[#3DDC97]">51969 shortcode & *999# menu</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cloud Infra Cost Tiers & Sensor Cadence Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Infra Cost Tier Table */}
        <div className="bg-[#141A24] border border-[#1F2733] rounded p-4">
          <div className="flex items-center space-x-2 border-b border-[#1F2733] pb-2 mb-3">
            <DollarSign className="w-4 h-4 text-[#3DDC97]" />
            <span className="font-bold text-xs uppercase text-[#E8ECF1]">
              CLOUD INFRASTRUCTURE ESTIMATED COST TIERS
            </span>
          </div>

          <div className="space-y-3">
            {/* MVP Scale */}
            <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#3FA9F5]">MVP / SINGLE-DISTRICT SCALE (East Sikkim)</span>
                <span className="font-bold text-[#3DDC97] text-sm">~$120 / month</span>
              </div>
              <p className="text-[9px] text-[#8B95A5] leading-normal">
                Single mid-tier cloud VM (4 vCPU, 16 GB RAM) hosting FastAPI + scikit-learn model, containerized PostGIS/TimescaleDB on local SSD, CDN edge caching for static assets.
              </p>
            </div>

            {/* Production Scale */}
            <div className="bg-[#0D1219] p-3 rounded border border-[#1F2733]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#E85D5D]">FULL REGIONAL SCALE (All 8 NER States)</span>
                <span className="font-bold text-[#E8ECF1] text-sm">~$2,400 / month</span>
              </div>
              <p className="text-[9px] text-[#8B95A5] leading-normal">
                High-availability Kubernetes cluster (EKS/GKE), Apache Kafka multi-broker event stream for 1,400+ IoT rigs, multi-AZ TimescaleDB cluster, redundant telecom SMS gateway integration, and high-concurrency CAP-CP server.
              </p>
            </div>
          </div>
        </div>

        {/* Data Refresh Cadence Table */}
        <div className="bg-[#141A24] border border-[#1F2733] rounded p-4">
          <div className="flex items-center space-x-2 border-b border-[#1F2733] pb-2 mb-3">
            <Clock className="w-4 h-4 text-[#3FA9F5]" />
            <span className="font-bold text-xs uppercase text-[#E8ECF1]">
              DATA REFRESH CADENCE PER INGESTION CHANNEL
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9.5px]">
              <thead>
                <tr className="border-b border-[#1F2733] text-[#8B95A5] uppercase">
                  <th className="py-1.5">DATA STREAM</th>
                  <th className="py-1.5">REFRESH RATE</th>
                  <th className="py-1.5">PROTOCOL / TRANSPORT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18212D]">
                <tr>
                  <td className="py-2 text-[#E8ECF1] font-bold">IoT Borehole Telemetry</td>
                  <td className="py-2 text-[#3DDC97]">Every 5 seconds</td>
                  <td className="py-2 text-[#8B95A5]">MQTT over LoRaWAN + Satellite Uplink</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#E8ECF1] font-bold">IMD Doppler Radar</td>
                  <td className="py-2 text-[#3FA9F5]">Every 15 minutes</td>
                  <td className="py-2 text-[#8B95A5]">REST API Pull / Webhook</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#E8ECF1] font-bold">Sentinel-2 / NISAR InSAR</td>
                  <td className="py-2 text-[#E8A33D]">Every 6 to 12 hours</td>
                  <td className="py-2 text-[#8B95A5]">ESA Copernicus / ISRO Cloud Bucket</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#E8ECF1] font-bold">Citizen Hazard Uploads</td>
                  <td className="py-2 text-[#E85D5D]">Instant / Auto-Flush</td>
                  <td className="py-2 text-[#8B95A5]">IndexedDB Queue & WebSocket Push</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Competitive Differentiation: Why NER-LEWS vs GSI Bhukosh & NDMA Sachet */}
      <div className="bg-[#141A24] border border-[#1F2733] rounded p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#1F2733] pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#3FA9F5]" />
            <span className="font-bold text-xs uppercase text-[#E8ECF1]">
              COMPETITIVE DIFFERENTIATION: WHY NER-LEWS?
            </span>
          </div>
          <span className="text-[9px] text-[#3DDC97] bg-[#3DDC97]/10 px-2 py-0.5 rounded border border-[#3DDC97]/40">
            SOLVING THE LAST-MILE GAP IN HIMALAYAN DISASTER TECH
          </span>
        </div>

        <p className="text-[10px] text-[#8B95A5] mb-3">
          Existing national disaster platforms provide broad regional warnings but suffer from fundamental architectural gaps in North East India's complex terrain. Here is how NER-LEWS provides transformative value:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[9.5px] border border-[#1F2733]">
            <thead>
              <tr className="bg-[#0D1219] text-[#8B95A5] uppercase border-b border-[#1F2733]">
                <th className="p-2.5">CAPABILITY</th>
                <th className="p-2.5">GSI BHUKOSH PORTAL</th>
                <th className="p-2.5">NDMA SACHET SYSTEM</th>
                <th className="p-2.5 text-[#3FA9F5] font-bold">NER-LEWS SENTINEL COMMAND</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18212D]">
              <tr>
                <td className="p-2.5 font-bold text-[#E8ECF1]">Granularity & Physics</td>
                <td className="p-2.5 text-[#8B95A5]">Static 1:50,000 regional zones</td>
                <td className="p-2.5 text-[#8B95A5]">State / District-wide alerts</td>
                <td className="p-2.5 text-[#3DDC97] font-bold">
                  ✓ 10m Sub-district slope physics (Bishop limit equilibrium + pore pressure)
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#E8ECF1]">Real-time Telemetry Fusion</td>
                <td className="p-2.5 text-[#8B95A5]">
                  <span className="flex items-center space-x-1 text-[#EF4444]">
                    <XCircle className="w-3 h-3" />
                    <span>Historical only (no live sensors)</span>
                  </span>
                </td>
                <td className="p-2.5 text-[#8B95A5]">
                  <span className="flex items-center space-x-1 text-[#F59E0B]">
                    <span>Meteorological rainfall only</span>
                  </span>
                </td>
                <td className="p-2.5 text-[#3DDC97] font-bold">
                  ✓ Fuses rainfall + pore pressure + acoustic bursts + InSAR deformation
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#E8ECF1]">Citizen Reporting Loop</td>
                <td className="p-2.5 text-[#8B95A5]">
                  <span className="flex items-center space-x-1 text-[#EF4444]">
                    <XCircle className="w-3 h-3" />
                    <span>None (Read-only GIS download)</span>
                  </span>
                </td>
                <td className="p-2.5 text-[#8B95A5]">
                  <span className="flex items-center space-x-1 text-[#EF4444]">
                    <XCircle className="w-3 h-3" />
                    <span>One-way government push</span>
                  </span>
                </td>
                <td className="p-2.5 text-[#3DDC97] font-bold">
                  ✓ Two-way verification: Citizen cracks promoted to Sentinel Stream
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#E8ECF1]">Offline-First Resilience</td>
                <td className="p-2.5 text-[#8B95A5]">Fails without internet connection</td>
                <td className="p-2.5 text-[#8B95A5]">Dependent on cellular data signal</td>
                <td className="p-2.5 text-[#3DDC97] font-bold">
                  ✓ True IndexedDB offline queue + 2G feature-phone SMS/USSD fallback
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#E8ECF1]">Multilingual Field Dialects</td>
                <td className="p-2.5 text-[#8B95A5]">English only</td>
                <td className="p-2.5 text-[#8B95A5]">Hindi & English default</td>
                <td className="p-2.5 text-[#3DDC97] font-bold">
                  ✓ Full UI & broadcasts in Assamese, Nepali, Bengali, Khasi, Bodo & Hindi
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
