"use client";
import { useState } from "react";
import { COLORS } from "@/lib/constants";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-jakarta), sans-serif",
    width: "100%",
    padding: "14px 18px",
    fontSize: 15,
    background: COLORS.white,
    border: `1.5px solid ${COLORS.grey}`,
    borderRadius: 10,
    color: COLORS.navy,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        background: COLORS.white,
        padding: "120px 24px",
        borderTop: `1px solid ${COLORS.grey}`,
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
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
              Get in touch
            </div>
            <h2
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: COLORS.navy,
                margin: "0 0 16px",
                letterSpacing: "-0.025em",
              }}
            >
              Work with Trident
            </h2>
            <p
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: 16,
                color: COLORS.textMid,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Whether you represent a government agency, a financial
              institution, or a business looking to build resilient
              infrastructure — we'd love to hear from you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 40px",
                background: "rgba(29,120,116,0.06)",
                border: "1px solid rgba(29,120,116,0.2)",
                borderRadius: 20,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <p
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.teal,
                  margin: 0,
                }}
              >
                Message sent. We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.grey)}
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.grey)}
              />
              <textarea
                placeholder="Tell us about your project or enquiry"
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                rows={5}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.grey)}
              />

              {/* Error message */}
              {error && (
                <p
                  style={{
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontSize: 13,
                    color: COLORS.coral,
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  background: loading ? COLORS.textLight : COLORS.navy,
                  color: COLORS.white,
                  padding: "16px",
                  borderRadius: 10,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.01em",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.background = COLORS.navyLight;
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.background = COLORS.navy;
                }}
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
