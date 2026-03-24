"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { COLORS } from "@/lib/constants";
import MeshBackground from "./MeshBackground";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: `linear-gradient(145deg, ${COLORS.navy} 0%, #081c3a 60%, #0a2d4a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: isMobile ? "100px 20px 60px" : "120px 24px 80px",
      }}
    >
      <MeshBackground opacity={0.22} />

      {/* Teal radial gradient */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(29,120,116,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 820,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <div
          style={{
            marginBottom: 48,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/trident-logo-white.svg"
            alt="Trident"
            width={isMobile ? 260 : 420}
            height={isMobile ? 67 : 109}
            priority
          />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: COLORS.teal60,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Secure · Connected · Automated
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: "clamp(38px, 6vw, 68px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: COLORS.white,
            margin: "0 0 24px",
            letterSpacing: "-0.03em",
          }}
        >
          {" "}
          Cayman Islands <span style={{ color: COLORS.coral }}>Resilient</span>
          <br /> Infrastructure
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: "clamp(16px, 2vw, 19px)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            margin: "0 auto 48px",
            maxWidth: 540,
          }}
        >
          {" "}
          Trident designs, deploys, and operates resilient network
          infrastructure for the Cayman Islands that are built to work when
          everything else fails.
        </p>

        {/* CTA Button */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#cayman-mesh"
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontWeight: 700,
              fontSize: 15,
              background: COLORS.coral,
              color: COLORS.white,
              padding: "15px 36px",
              borderRadius: 10,
              textDecoration: "none",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 32px rgba(255,107,107,0.35)",
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
                "0 8px 32px rgba(255,107,107,0.35)";
            }}
          >
            Cayman Mesh Network
          </a>
          <a
            href="#about"
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontWeight: 600,
              fontSize: 15,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: COLORS.white,
              padding: "15px 36px",
              borderRadius: 10,
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.14)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            About Trident
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
