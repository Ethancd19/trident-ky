"use client";
import { useEffect, useRef } from "react";

export default function MeshBackground({
  opacity = 0.2,
}: {
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulse: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const init = () => {
      nodes = Array.from({ length: 24 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 2.5 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
      }));
    };
    init();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Edges
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 180) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(29,120,116,${(1 - d / 180) * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Nodes
      nodes.forEach((n) => {
        const p = 0.6 + 0.4 * Math.sin(n.pulse);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        g.addColorStop(0, `rgba(255,107,107,${0.3 * p})`);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,107,${0.85 * p})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}
