"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { COLORS } from "@/lib/constants";

interface SimNode {
  id: string;
  lat: number;
  lng: number;
  type: "mesh" | "cell" | "power";
  label: string;
  active: boolean;
}

interface Phase {
  id: number;
  label: string;
  description: string;
  duration: number;
}

const PHASES: Phase[] = [
  {
    id: 0,
    label: "Normal Operations",
    description:
      "All systems operational. Cell towers active, power grid stable, Trident mesh online.",
    duration: 3000,
  },
  {
    id: 1,
    label: "Storm Approaches",
    description:
      "Category 4 hurricane tracking northeast — currently 90 miles southwest of Grand Cayman.",
    duration: 4000,
  },
  {
    id: 2,
    label: "Near Landfall",
    description:
      "Hurricane now 30 miles out. Evacuations complete. All systems still operational.",
    duration: 3000,
  },
  {
    id: 3,
    label: "Landfall",
    description:
      "Direct hit. Grid power failing across the island. Cell towers on backup generators.",
    duration: 3500,
  },
  {
    id: 4,
    label: "Comms Blackout",
    description:
      "Generators exhausted. Cell towers going dark. Trident mesh running on solar and battery.",
    duration: 4000,
  },
  {
    id: 5,
    label: "Island Connected",
    description:
      "Mesh fully operational. Resident distress message routed to HMCI. Broadcast reaching all nodes.",
    duration: 5000,
  },
];

const INITIAL_NODES: SimNode[] = [
  // Trident mesh backbone
  {
    id: "neoc",
    lat: 19.295,
    lng: -81.381,
    type: "mesh",
    label: "NEOC / HMCI",
    active: true,
  },
  {
    id: "airport",
    lat: 19.2928,
    lng: -81.3576,
    type: "mesh",
    label: "Airport",
    active: true,
  },
  {
    id: "hsa",
    lat: 19.288,
    lng: -81.372,
    type: "mesh",
    label: "HSA",
    active: true,
  },
  {
    id: "westbay",
    lat: 19.358,
    lng: -81.402,
    type: "mesh",
    label: "West Bay",
    active: true,
  },
  {
    id: "bodden",
    lat: 19.282,
    lng: -81.245,
    type: "mesh",
    label: "Bodden Town",
    active: true,
  },
  {
    id: "eastend",
    lat: 19.3,
    lng: -81.117,
    type: "mesh",
    label: "East End",
    active: true,
  },
  {
    id: "northside",
    lat: 19.335,
    lng: -81.205,
    type: "mesh",
    label: "North Side",
    active: true,
  },
  {
    id: "franksomd",
    lat: 19.318,
    lng: -81.165,
    type: "mesh",
    label: "Frank Sound",
    active: true,
  },

  // Cell towers
  {
    id: "cell1",
    lat: 19.33,
    lng: -81.39,
    type: "cell",
    label: "Cell Tower",
    active: true,
  },
  {
    id: "cell2",
    lat: 19.295,
    lng: -81.31,
    type: "cell",
    label: "Cell Tower",
    active: true,
  },
  {
    id: "cell3",
    lat: 19.32,
    lng: -81.22,
    type: "cell",
    label: "Cell Tower",
    active: true,
  },
  {
    id: "cell4",
    lat: 19.29,
    lng: -81.14,
    type: "cell",
    label: "Cell Tower",
    active: true,
  },

  // Power grid
  {
    id: "power1",
    lat: 19.298,
    lng: -81.355,
    type: "power",
    label: "Grid",
    active: true,
  },
  {
    id: "power2",
    lat: 19.305,
    lng: -81.265,
    type: "power",
    label: "Grid",
    active: true,
  },
  {
    id: "power3",
    lat: 19.31,
    lng: -81.19,
    type: "power",
    label: "Grid",
    active: true,
  },
];

// Storm starts well SW, moves NE across the island
const STORM_PATH = [
  { lat: 18.85, lng: -82.2 }, // Phase 1 — far SW, clearly away
  { lat: 19.0, lng: -81.9 }, // Phase 2 — approaching, 30 miles out
  { lat: 19.18, lng: -81.58 }, // Phase 3 — landfall west end
  { lat: 19.27, lng: -81.36 }, // Phase 4 — directly over island
  { lat: 19.33, lng: -81.13 }, // Phase 5 — passing east
];

// Dynamic import — no SSR
const SimulationMap = dynamic(() => import("@/components/SimulationMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "#081c3a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jakarta), sans-serif",
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
        }}
      >
        Loading map...
      </span>
    </div>
  ),
});

export default function HurricaneSimulation() {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [nodes, setNodes] = useState<SimNode[]>(INITIAL_NODES);
  const [stormPos, setStormPos] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [phaseProgress, setPhaseProgress] = useState(0);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // ─── Smooth storm interpolation ───────────────────────────────────────────
  useEffect(() => {
    if (phase === 0) {
      setStormPos(null);
      return;
    }
    const idx = phase - 1;
    const current = STORM_PATH[Math.min(idx, STORM_PATH.length - 1)];
    const next = STORM_PATH[Math.min(idx + 1, STORM_PATH.length - 1)];
    const t = phaseProgress;
    setStormPos({
      lat: current.lat + (next.lat - current.lat) * t,
      lng: current.lng + (next.lng - current.lng) * t,
    });
  }, [phase, phaseProgress]);

  // ─── Apply phase state to nodes ───────────────────────────────────────────
  const applyPhase = useCallback((p: number) => {
    setNodes(
      INITIAL_NODES.map((n) => {
        // Phases 0-2: everything fully operational
        if (p <= 2) return { ...n, active: true };

        // Phase 3: landfall — one power node starts failing
        if (p === 3) {
          if (n.type === "power") return { ...n, active: n.id !== "power1" };
          return { ...n, active: true };
        }

        // Phase 4: comms blackout — all power down, most cell towers down
        if (p === 4) {
          if (n.type === "power") return { ...n, active: false };
          if (n.type === "cell") return { ...n, active: n.id === "cell4" };
          return { ...n, active: true };
        }

        // Phase 5: mesh holds — power and cell both gone
        if (p >= 5) {
          if (n.type === "power") return { ...n, active: false };
          if (n.type === "cell") return { ...n, active: false };
          return { ...n, active: true };
        }

        return n;
      }),
    );
  }, []);

  const goToPhase = useCallback(
    (p: number) => {
      const clamped = Math.max(0, Math.min(PHASES.length - 1, p));
      setPhase(clamped);
      setPhaseProgress(0);
      applyPhase(clamped);
    },
    [applyPhase],
  );

  // ─── Auto-advance ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!playing) return;
    const duration = PHASES[phase].duration;
    const interval = 50;
    const step = interval / duration;

    const timer = setInterval(() => {
      setPhaseProgress((prev) => {
        const next = prev + step;
        if (next >= 1) {
          if (phaseRef.current < PHASES.length - 1) {
            const nextPhase = phaseRef.current + 1;
            setPhase(nextPhase);
            setPhaseProgress(0);
            applyPhase(nextPhase);
          } else {
            setPlaying(false);
          }
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [playing, phase, applyPhase]);

  const currentPhaseData = PHASES[phase];

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Map */}
      <div style={{ position: "relative", width: "100%", height: 480 }}>
        <SimulationMap nodes={nodes} phase={phase} stormPos={stormPos} />

        {/* Start overlay */}
        {!started && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(8,28,58,0.88)",
              backdropFilter: "blur(6px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: COLORS.coral,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Interactive Simulation
            </div>
            <h3
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: "clamp(18px, 3vw, 26px)",
                fontWeight: 800,
                color: COLORS.white,
                margin: "0 0 12px",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Hurricane Scenario
            </h3>
            <p
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 28px",
                textAlign: "center",
                maxWidth: 340,
                lineHeight: 1.6,
              }}
            >
              Watch how the Trident mesh performs as a Category 4 hurricane
              makes landfall across Grand Cayman.
            </p>
            <button
              onClick={() => {
                setStarted(true);
                setPlaying(true);
                goToPhase(0);
              }}
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontWeight: 700,
                fontSize: 15,
                background: COLORS.coral,
                color: COLORS.white,
                padding: "14px 40px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(255,107,107,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(255,107,107,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(255,107,107,0.4)";
              }}
            >
              Start Simulation ▶
            </button>
          </div>
        )}

        {/* Phase badge */}
        {started && (
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 999,
              background: "rgba(8,28,58,0.92)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "10px 16px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: COLORS.coral,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Phase {phase + 1} of {PHASES.length}
            </div>
            <div
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              {currentPhaseData.label}
            </div>
          </div>
        )}

        {/* Legend */}
        {started && (
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 999,
              background: "rgba(8,28,58,0.92)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "12px 16px",
              backdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              gap: 7,
            }}
          >
            {[
              { color: COLORS.teal, label: "Trident mesh node" },
              { color: COLORS.coral, label: "HMCI / Storm" },
              { color: "#64b4ff", label: "Cell tower" },
              { color: "#ffc832", label: "Power grid" },
            ].map(({ color, label }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      {started && (
        <div
          style={{
            background: "rgba(8,28,58,0.97)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "18px 24px",
          }}
        >
          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 14px",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {currentPhaseData.description}
          </p>

          {/* Progress bar */}
          <div
            style={{
              height: 3,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 2,
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((phase + phaseProgress) / (PHASES.length - 1)) * 100}%`,
                background: `linear-gradient(to right, ${COLORS.teal}, ${COLORS.coral})`,
                borderRadius: 2,
                transition: "width 0.1s linear",
              }}
            />
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <button
              onClick={() => {
                setPlaying(false);
                goToPhase(phase - 1);
              }}
              disabled={phase === 0}
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 13,
                fontWeight: 600,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: phase === 0 ? "rgba(255,255,255,0.2)" : COLORS.white,
                padding: "9px 22px",
                borderRadius: 8,
                cursor: phase === 0 ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (phase > 0)
                  e.currentTarget.style.background = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              ← Back
            </button>

            <button
              onClick={() => setPlaying((p) => !p)}
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 14,
                fontWeight: 700,
                background: COLORS.coral,
                color: COLORS.white,
                padding: "10px 36px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                minWidth: 120,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>

            <button
              onClick={() => {
                setPlaying(false);
                goToPhase(phase + 1);
              }}
              disabled={phase === PHASES.length - 1}
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 13,
                fontWeight: 600,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color:
                  phase === PHASES.length - 1
                    ? "rgba(255,255,255,0.2)"
                    : COLORS.white,
                padding: "9px 22px",
                borderRadius: 8,
                cursor: phase === PHASES.length - 1 ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (phase < PHASES.length - 1)
                  e.currentTarget.style.background = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              Next →
            </button>
          </div>

          {/* Phase dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 14,
            }}
          >
            {PHASES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  setPlaying(false);
                  goToPhase(i);
                }}
                title={p.label}
                style={{
                  width: i === phase ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background:
                    i === phase
                      ? COLORS.coral
                      : i < phase
                        ? COLORS.teal
                        : "rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
