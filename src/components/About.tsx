"use client";
import { useRef, useState, useEffect } from "react";
import { COLORS } from "@/lib/constants";
import Reveal from "@/components/Reveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const stats = [
  { num: "3", label: "Islands served", accent: COLORS.coral },
  { num: "16+", label: "Backbone nodes", accent: COLORS.teal },
  { num: "915", label: "MHz ISM band", accent: COLORS.coral },
  { num: "120h", label: "Battery autonomy", accent: COLORS.teal },
];

export default function About() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="about"
      style={{
        background: COLORS.white,
        padding: isMobile ? "80px 24px" : "120px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 48 : 80,
            alignItems: "center",
          }}
        >
          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: COLORS.coral,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              About Trident
            </div>
            <h2
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: "clamp(30px, 4vw, 46px)",
                fontWeight: 800,
                color: COLORS.navy,
                lineHeight: 1.12,
                margin: "0 0 28px",
                letterSpacing: "-0.025em",
              }}
            >
              Built in Cayman.
              <br />
              Built for Cayman.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 17,
                lineHeight: 1.75,
                color: COLORS.textMid,
                margin: "0 0 20px",
              }}
            >
              Trident is a Cayman Islands technology company specialising in
              resilient network infrastructure, managed network services, and
              automated compliance solutions for financial institutions and
              government organisations.
            </p>
            <p
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 17,
                lineHeight: 1.75,
                color: COLORS.textMid,
                margin: 0,
              }}
            >
              Founded on a straightforward conviction: that the Cayman Islands,
              one of the world's most sophisticated financial centres, deserves
              technology infrastructure of equivalent sophistication.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {stats.map(({ num, label, accent }) => (
                <div
                  key={label}
                  style={{
                    background: COLORS.offwhite,
                    borderRadius: 16,
                    padding: "32px 28px",
                    border: `1px solid ${COLORS.grey}`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(10,35,66,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-jakarta), sans-serif",
                      fontSize: 40,
                      fontWeight: 800,
                      color: accent,
                      lineHeight: 1,
                      marginBottom: 8,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-jakarta), sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: COLORS.textMid,
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
