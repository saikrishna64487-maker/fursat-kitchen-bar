"use client";

import React, { useRef, useEffect } from "react";

export default function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetX = x * 40;
      targetY = y * 30;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Golden ambient culinary embers & shimmer particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      hue: number;
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * -0.6 - 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7,
      maxOpacity: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      hue: Math.random() > 0.4 ? 42 : 32, // Gold vs Amber
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + currentX;
      const centerY = height / 2 + currentY + Math.sin(time * 1.2) * 8;

      // 1. Warm radial ambient culinary spotlight glow
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        width * 0.45
      );
      radialGlow.addColorStop(0, "rgba(184, 155, 98, 0.12)");
      radialGlow.addColorStop(0.3, "rgba(216, 197, 170, 0.08)");
      radialGlow.addColorStop(0.7, "rgba(243, 235, 221, 0.02)");
      radialGlow.addColorStop(1, "rgba(248, 243, 234, 0)");

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Render rising golden embers / culinary sparkles
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.3;
        p.opacity += Math.sin(time * 3 + p.x) * p.pulseSpeed;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const alpha = Math.max(0.05, Math.min(p.maxOpacity, p.opacity));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 65%, 45%, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 60%, 40%, ${alpha * 0.6})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // 3. Floating Signature 3D Ring Halo
      ctx.save();
      ctx.translate(centerX, centerY + 80);
      ctx.scale(1, 0.28); // 3D perspective ellipse

      // Outer gold aura ring
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width * 0.32, 220), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184, 155, 98, 0.35)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(184, 155, 98, 0.25)";
      ctx.stroke();

      // Inner subtle gold ring
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width * 0.25, 170), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(154, 123, 79, 0.22)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
