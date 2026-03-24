"use client";
import { COLORS } from "@/lib/constants";
import Reveal from "@/components/Reveal";
import MeshBackground from "@/components/MeshBackground";
import HurricaneSimulation from "@/components/HurricaneSimulation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const pillars = [
  { icon: "☀", label: "Solar powered", sub: "Zero grid dependency" },
  { icon: "⬡", label: "Mesh network", sub: "Self-healing topology" },
  { icon: "📡", label: "915 MHz LoRa", sub: "No licence required" },
  { icon: "🔒", label: "AES-256", sub: "End-to-end encrypted" },
];

export default function CaymanMesh() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section
      id="cayman-mesh"
      style={{
        background: `linear-gradient(160deg, ${COLORS.navy} 0%, #081c3a 100%)`,
        padding: "120px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MeshBackground opacity={0.16} />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: COLORS.coral,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Flagship Project
            </div>
            <h2
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: "clamp(30px, 5vw, 54px)",
                fontWeight: 800,
                color: COLORS.white,
                margin: "0 0 24px",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              Cayman Islands
              <br />
              Resilient Mesh Network
            </h2>
            <p
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              A territory-wide, solar-powered, off-grid communications network
              that functions independently of cell towers, internet, and the
              power grid, across all three islands.
            </p>
          </div>
        </Reveal>

        {/* Problem / Solution */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 40,
            marginBottom: 64,
          }}
        >
          <Reveal delay={0.05}>
            <div
              style={{
                background: "rgba(255,107,107,0.08)",
                border: "1px solid rgba(255,107,107,0.2)",
                borderRadius: 20,
                padding: "40px 36px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: COLORS.coral,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                The Problem
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                  margin: "0 0 16px",
                  lineHeight: 1.3,
                }}
              >
                When Ivan struck, the islands went silent.
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                }}
              >
                Hurricane Ivan (2004) caused telecommunications to fail within
                hours. Electricity, landlines, and cellular services were
                offline for weeks. Leaving residents with no way to call for
                help, confirm family safety, or receive official updates.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              style={{
                background: "rgba(29,120,116,0.1)",
                border: "1px solid rgba(29,120,116,0.25)",
                borderRadius: 20,
                padding: "40px 36px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: COLORS.teal60,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                The Solution
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                  margin: "0 0 16px",
                  lineHeight: 1.3,
                }}
              >
                A mesh that works when nothing else does.
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                }}
              >
                Solar-powered LoRa nodes at government buildings, shelters, and
                key sites across Grand Cayman, Cayman Brac, and Little Cayman.
                No grid. No towers. No internet required. 72-120 hours of
                battery autonomy per node.
              </p>
            </div>
          </Reveal>
        </div>
        {/* Feature pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 64,
          }}
        >
          {pillars.map(({ icon, label, sub }, i) => (
            <Reveal key={label} delay={i * 0.07}>
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: COLORS.white,
                    marginBottom: 6,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Simulation */}
        <Reveal delay={0.1}>
          <div style={{ marginBottom: 56 }}>
            <div
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: COLORS.coral,
                textTransform: "uppercase",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Interactive
            </div>
            <h3
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.white,
                margin: "0 0 8px",
                textAlign: "center",
              }}
            >
              Hurricane Scenario Simulation
            </h3>
            <p
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                margin: "0 auto 28px",
                maxWidth: 480,
                textAlign: "center",
              }}
            >
              Watch how the Trident mesh performs as a Category 4 hurricane
              makes landfall — cell towers fail, grid goes down, mesh stays up.
            </p>
            <HurricaneSimulation />
          </div>
        </Reveal>

        {/* Proposal CTA */}
        <Reveal delay={0.15}>
          <div style={{ textAlign: "center" }}>
            <a
              href="/trident-proposal.pdf"
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontWeight: 700,
                fontSize: 15,
                background: COLORS.coral,
                color: COLORS.white,
                padding: "16px 40px",
                borderRadius: 10,
                textDecoration: "none",
                letterSpacing: "0.01em",
                boxShadow: "0 8px 32px rgba(255,107,107,0.3)",
                display: "inline-block",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(255,107,107,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(255,107,107,0.3)";
              }}
            >
              Download Full Proposal ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
