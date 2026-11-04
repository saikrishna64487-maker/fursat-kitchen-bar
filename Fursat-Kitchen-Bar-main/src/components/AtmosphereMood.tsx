"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Sun, Moon, Flame } from "lucide-react";

export default function AtmosphereMood() {
  const [moodPreset, setMoodPreset] = useState<"dusk" | "beige" | "candle">("beige");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const floatingWords = [
    { text: "GOOD FOOD", depth: 40, color: "text-fursat-espresso/80", pos: "top-12 left-8 md:top-20 md:left-24" },
    { text: "GOOD DRINKS", depth: -35, color: "text-fursat-gold", pos: "top-28 right-8 md:top-36 md:right-28" },
    { text: "GOOD COMPANY", depth: 60, color: "text-fursat-bronze", pos: "bottom-32 left-10 md:bottom-36 md:left-32" },
    { text: "GOOD TIMES", depth: -50, color: "text-fursat-taupe", pos: "bottom-14 right-10 md:bottom-16 md:right-36" },
  ];

  const moodStyles = {
    dusk: {
      bgGlow: "from-fursat-taupe/30 via-fursat-sand/20 to-transparent",
      accent: "text-fursat-taupe",
      label: "Warm Taupe Twilight",
    },
    beige: {
      bgGlow: "from-fursat-cream via-fursat-sand/30 to-transparent",
      accent: "text-fursat-gold",
      label: "Luminous Cream Beige",
    },
    candle: {
      bgGlow: "from-amber-200/25 via-fursat-sand/30 to-transparent",
      accent: "text-fursat-bronze",
      label: "Warm Sand & Candlelit Amber",
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[650px] md:min-h-[750px] py-24 bg-fursat-sand overflow-hidden flex flex-col justify-between items-center px-6 border-t border-fursat-camel/20 select-none"
    >
      {/* Dynamic Ambient Volumetric Gradient responding to mood & mouse */}
      <div
        className="absolute inset-0 bg-radial-gradient from-fursat-sand-alt via-fursat-sand/50 to-transparent transition-all duration-1000 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
        }}
      />

      {/* Floating Sparkle Embers */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-fursat-camel/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-fursat-sand-alt/40 blur-[140px]" />
      </div>

      {/* Header Info */}
      <div className="relative z-10 text-center max-w-xl mx-auto pt-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="w-8 h-[1px] bg-fursat-camel" />
          <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
            07 — The Sensory Frequency
          </span>
          <span className="w-8 h-[1px] bg-fursat-camel" />
        </div>
        <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl text-fursat-green font-bold tracking-tight">
          The Fursat Mood
        </h2>
        <p className="font-sans text-sm text-fursat-muted font-normal mt-2">
          Move your cursor across the room to shift perspective and light.
        </p>
      </div>

      {/* 3D Depth Floating Typography Field */}
      <div className="relative w-full max-w-5xl h-96 flex items-center justify-center my-6">
        {/* Center Orb */}
        <div
          className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-fursat-camel/40 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center shadow-md transition-transform duration-300"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          }}
        >
          <Sparkles className="w-6 h-6 text-fursat-terracotta animate-spin" style={{ animationDuration: "20s" }} />
          <span className="font-sans text-lg sm:text-xl font-bold text-fursat-green mt-2">
            Fursat
          </span>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-fursat-terracotta font-semibold">
            Hyderabad
          </span>
        </div>

        {/* Floating Depth Words */}
        {floatingWords.map((word, idx) => (
          <div
            key={idx}
            className={`absolute ${word.pos} transition-transform duration-200 ease-out pointer-events-none`}
            style={{
              transform: `translate(${mousePos.x * word.depth}px, ${mousePos.y * word.depth}px)`,
            }}
          >
            <span
              className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider opacity-80 uppercase drop-shadow-sm text-fursat-green/75"
            >
              {word.text}
            </span>
          </div>
        ))}
      </div>

      {/* Mood Selector Bottom Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 bg-white/95 border border-fursat-hairline backdrop-blur-md px-5 py-3 rounded-full shadow-md">
        <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-fursat-muted mr-2 font-semibold">
          Lighting Aura:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMoodPreset("dusk")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              moodPreset === "dusk"
                ? "bg-fursat-green text-white font-bold shadow-md"
                : "text-fursat-charcoal hover:text-fursat-green"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Warm Dusk</span>
          </button>

          <button
            onClick={() => setMoodPreset("beige")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              moodPreset === "beige"
                ? "bg-fursat-green text-white font-bold shadow-md"
                : "text-fursat-charcoal hover:text-fursat-green"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Warm Sand</span>
          </button>

          <button
            onClick={() => setMoodPreset("candle")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              moodPreset === "candle"
                ? "bg-fursat-green text-white font-bold shadow-md"
                : "text-fursat-charcoal hover:text-fursat-green"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Candlelit</span>
          </button>
        </div>
      </div>
    </section>
  );
}
