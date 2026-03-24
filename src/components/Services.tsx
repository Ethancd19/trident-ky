"use client";
import { useRef, useState, useEffect } from "react";
import { COLORS } from "@/lib/constants";
import Reveal from "@/components/Reveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const services = [
  {
    icon: "⬡",
    title: "Mesh Network Infrastructure",
    desc: "Design, deployment, and operation of LoRa mesh networks — solar-powered, off-grid, and built to survive direct hurricane strikes. From site survey to managed operations.",
    tag: "Available now",
    tagColor: COLORS.teal,
  },
  {
    icon: "◈",
    title: "Managed Network Services",
    desc: "Ongoing management, monitoring, and maintenance of network infrastructure for businesses and government. Proactive support with SLA-backed uptime commitments.",
    tag: "Available now",
    tagColor: COLORS.teal,
  },
  {
    icon: "⬔",
    title: "Automated Compliance",
    desc: "Regulatory compliance automation for financial institutions and VASPs operating in the Cayman Islands. Built for the specific requirements of the jurisdiction.",
    tag: "Coming soon",
    tagColor: COLORS.textLight,
  },
];

export default function Services() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section
      id="services"
      style={{
        background: COLORS.offwhite,
        padding: "120px 24px",
        borderTop: `1px solid ${COLORS.grey}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
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
              Services
            </div>
            <h2
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: COLORS.navy,
                margin: 0,
                letterSpacing: "-0.025em",
              }}
            >
              What Trident builds
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {services.map(({ icon, title, desc, tag, tagColor }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div
                style={{
                  background: COLORS.white,
                  borderRadius: 20,
                  padding: "40px 36px",
                  border: `1px solid ${COLORS.grey}`,
                  height: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 48px rgba(10,35,66,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    marginBottom: 24,
                    color: COLORS.coral,
                  }}
                >
                  {icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: tagColor,
                    marginBottom: 12,
                  }}
                >
                  {tag}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.navy,
                    margin: "0 0 16px",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: COLORS.textMid,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
