"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { COLORS } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (scrolled) setMenuOpen(false);
  }, [scrolled]);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Cayman Mesh", href: "#cayman-mesh" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isMobile
            ? "16px 24px"
            : scrolled
              ? "14px 48px"
              : "20px 48px",
          background:
            scrolled || menuOpen ? "rgba(10,35,66,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom:
            scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.35s ease",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image
            src="/trident-icon.svg"
            alt="Trident"
            width={36}
            height={36}
            priority
          />
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.white)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                }
              >
                {label}
              </a>
            ))}
            <a
              href="https://dashboard.trident.ky"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.navy,
                background: COLORS.coral,
                borderRadius: 8,
                padding: "9px 20px",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Dashboard ↗
            </a>
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((p) => !p)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: COLORS.white,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 1
                        ? "opacity(0) scaleX(0)"
                        : "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile menu dropdown */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 69,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(10,35,66,0.98)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: menuOpen ? "24px" : "0 24px",
            maxHeight: menuOpen ? 400 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease, padding 0.35s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.white)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
                }
              >
                {label}
              </a>
            ))}
            <a
              href="https://dashboard.trident.ky"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: COLORS.navy,
                background: COLORS.coral,
                borderRadius: 8,
                padding: "12px 20px",
                textDecoration: "none",
                textAlign: "center",
                marginTop: 8,
                display: "block",
              }}
            >
              Dashboard ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
