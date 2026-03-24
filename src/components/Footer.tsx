"use client";
import Image from "next/image";
import { COLORS } from "@/lib/constants";

const company = ["About", "Services", "Contact"];
const projects = ["Cayman Mesh Network", "Dashboard ↗"];

export default function Footer() {
  return (
    <footer
      style={{
        background: COLORS.navy,
        padding: "56px 48px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <Image
              src="/trident-logo-white.svg"
              alt="Trident"
              width={140}
              height={36}
            />
          </div>
          <p
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              maxWidth: 240,
              lineHeight: 1.6,
            }}
          >
            Secure. Connected. Automated.
            <br />
            Cayman Islands
          </p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
          {[
            { heading: "Company", links: company },
            { heading: "Projects", links: projects },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <div
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {heading}
              </div>
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    marginBottom: 10,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = COLORS.white)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          © 2026 Trident. Cayman Islands.
        </span>
        <span
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          trident.ky
        </span>
      </div>
    </footer>
  );
}
