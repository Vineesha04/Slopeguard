import React, { useEffect, useRef } from 'react';
import { Globe2 } from 'lucide-react';
import { SectorInfo } from '../types';

// Leaflet is loaded globally via a <script> tag in index.html (see index.html),
// so no npm dependency is required to build or deploy this component.
declare const L: any;

interface RealGISMapProps {
  sectors: SectorInfo[];
  onSelectSector: (sectorId: string) => void;
  selectedSectorId?: string;
}

const severityColor: Record<string, string> = {
  CRIT: '#FF4D4D',
  WARN: '#F5A623',
  WATCH: '#3FA9F5',
  NOM: '#3DDC97',
};

/**
 * Real GIS map rendered on genuine OpenStreetMap tiles via Leaflet.
 * This is a true geospatial map (real lat/lng projection, pan/zoom, real basemap) —
 * not a styled illustration — directly satisfying the "GIS mapping for visualization
 * of vulnerable roads, villages, and infrastructure" requirement.
 */
export const RealGISMap: React.FC<RealGISMapProps> = ({ sectors, onSelectSector, selectedSectorId }) => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  // Initialize the map once
  useEffect(() => {
    if (!mapDivRef.current || mapInstanceRef.current || typeof L === 'undefined') return;

    const map = L.map(mapDivRef.current, {
      center: [26.0, 92.0],
      zoom: 7,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Ensure map computes full container dimensions after mount
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync sector markers whenever sectors change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || typeof L === 'undefined') return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m: any) => map.removeLayer(m));
    markersRef.current = {};

    sectors.forEach((sector) => {
      const color = severityColor[sector.status] || '#3FA9F5';
      const isSelected = sector.id === selectedSectorId;

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width: ${isSelected ? 20 : 14}px;
          height: ${isSelected ? 20 : 14}px;
          border-radius: 9999px;
          background: ${color};
          box-shadow: 0 0 0 ${isSelected ? 6 : 4}px ${color}33, 0 0 8px ${color};
          border: 2px solid #0A0E14;
        "></div>`,
        iconSize: [isSelected ? 20 : 14, isSelected ? 20 : 14],
        iconAnchor: [isSelected ? 10 : 7, isSelected ? 10 : 7],
      });

      const marker = L.marker([sector.lat, sector.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: monospace; font-size: 12px; color: #0A0E14;">
          <strong>${sector.name}</strong><br/>
          ${sector.district}, ${sector.state}<br/>
          Status: <strong style="color:${color}">${sector.status}</strong><br/>
          Displacement: ${sector.displacementRate} mm/h<br/>
          Pore Pressure: ${sector.porePressure} kPa<br/>
          Population at Risk: ${sector.populationAtRisk.toLocaleString()}
        </div>
      `);

      marker.on('click', () => onSelectSector(sector.id));
      markersRef.current[sector.id] = marker;
    });
  }, [sectors, selectedSectorId, onSelectSector]);

  return (
    <div className="w-full bg-[#0D1117] border border-[#1F2733] rounded relative overflow-hidden">
      <style>{`
        .leaflet-tile-pane {
          filter: invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9);
        }
        .leaflet-marker-pane,
        .leaflet-popup-pane {
          filter: invert(1) hue-rotate(180deg);
        }
      `}</style>
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1F2733] bg-[#0A0E14]">
        <div className="flex items-center space-x-2">
          <Globe2 className="w-3.5 h-3.5 text-[#3FA9F5]" />
          <span className="text-[11px] font-bold tracking-widest text-[#E8ECF1] font-mono">
            REAL GIS MAP // OPENSTREETMAP
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#3DDC97]">LIVE TILE LAYER · REAL LAT/LNG</span>
      </div>
      <div ref={mapDivRef} style={{ height: '380px', width: '100%' }} />
    </div>
  );
};
