"use client";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { COLORS } from "@/lib/constants";

interface SimNode {
  id: string;
  lat: number;
  lng: number;
  type: "mesh" | "cell" | "power";
  label: string;
  active: boolean;
}

const MESH_EDGES = [
  ["neoc", "airport"],
  ["neoc", "hsa"],
  ["neoc", "westbay"],
  ["airport", "westbay"],
  ["hsa", "bodden"],
  ["bodden", "northside"],
  ["bodden", "franksomd"],
  ["northside", "eastend"],
  ["franksomd", "eastend"],
  ["neoc", "bodden"],
];

export default function SimulationMap({
  nodes,
  phase,
  stormPos,
}: {
  nodes: SimNode[];
  phase: number;
  stormPos: { lat: number; lng: number } | null;
}) {
  const nodeColor = (n: SimNode) => {
    if (n.type === "mesh") {
      if (phase >= 4) return COLORS.teal;
      return "#a0b4c8"; // visible grey-blue in early phases
    }
    if (n.type === "cell") return n.active ? "#64b4ff" : "#ff5050";
    if (n.type === "power") return n.active ? "#ffc832" : "#666";
    return "#fff";
  };

  const nodeRadius = (n: SimNode) => {
    if (n.type === "mesh") return phase >= 4 ? 9 : 7;
    if (n.type === "cell") return 7;
    return 5;
  };

  const nodeFillOpacity = (n: SimNode) => {
    if (!n.active) return 0.25;
    if (n.type === "mesh") return phase >= 4 ? 0.95 : 0.7;
    return 0.85;
  };

  // Edge styling per phase
  const edgeColor = phase >= 4 ? COLORS.teal : "#6a8fa8";
  const edgeWeight = phase >= 4 ? 2.5 : 1.2;
  const edgeOpacity = phase >= 4 ? 0.8 : 0.4;
  const edgeDash = phase >= 4 ? undefined : "5 5";

  return (
    <MapContainer
      center={[19.25, -81.24]}
      zoom={10}
      style={{ height: "100%", width: "100%", background: "#081c3a" }}
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />

      {/* Mesh edges — visible in all phases */}
      {MESH_EDGES.map(([aId, bId]) => {
        const a = nodes.find((n) => n.id === aId);
        const b = nodes.find((n) => n.id === bId);
        if (!a || !b) return null;
        return (
          <Polyline
            key={`${aId}-${bId}`}
            positions={[
              [a.lat, a.lng],
              [b.lat, b.lng],
            ]}
            color={edgeColor}
            weight={edgeWeight}
            opacity={edgeOpacity}
            dashArray={edgeDash}
          />
        );
      })}

      {/* All nodes */}
      {nodes.map((n) => (
        <CircleMarker
          key={`${n.id}-${phase}`}
          center={[n.lat, n.lng]}
          radius={nodeRadius(n)}
          fillColor={nodeColor(n)}
          color={nodeColor(n)}
          weight={2}
          opacity={n.active ? 1 : 0.4}
          fillOpacity={nodeFillOpacity(n)}
        >
          <Popup>{n.label}</Popup>
        </CircleMarker>
      ))}

      {/* Storm rings */}
      {stormPos &&
        [
          { r: 44, o: 0.05 },
          { r: 28, o: 0.09 },
          { r: 12, o: 0.22 },
        ].map(({ r, o }) => (
          <CircleMarker
            key={r}
            center={[stormPos.lat, stormPos.lng]}
            radius={r}
            fillColor={COLORS.coral}
            color={COLORS.coral}
            weight={1.5}
            opacity={0.7}
            fillOpacity={o}
          />
        ))}
    </MapContainer>
  );
}
