"use client";

import React, { useState } from "react";
import { Sparkles, ArrowDown, Moon } from "lucide-react";

export default function SignatureTransition() {
  const [portalActive, setPortalActive] = useState(false);

  const handlePortalEnter = () => {
    setPortalActive(true);
    setTimeout(() => {
      const barSection = document.getElementById("bar");
      if (barSection) {
        barSection.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => setPortalActive(false), 800);
    }, 600);
  };

  return (
    <section className="relative w-full py-24 md:py-36 bg-fursat-sand overflow-hidden flex flex-col items-center justify-center text-center px-6 border-t border-fursat-camel/20">
      {/* Background Volumetric Pulse */}
      <div className="absolute inset-0 bg-radial-gradient from-fursat-sand-alt via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold mb-3">
          The Portal
        </span>
        <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl text-fursat-green font-bold mb-6 leading-tight">
          As Daylight Fades, <br />
          <span className="font-serif italic font-normal text-fursat-charcoal">
            The Alchemy Awakens
          </span>
        </h2>

        {/* The Signature Dark Ceramic Plate / Circular Portal */}
        <div
          onClick={handlePortalEnter}
          data-cursor="ENTER BAR"
          className="group relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700 my-8"
        >
          {/* Outer Pulsing Corona */}
          <div className="absolute inset-0 rounded-full bg-fursat-terracotta/20 opacity-30 blur-2xl group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />

          {/* Golden Outer Rim */}
          <div className="absolute inset-2 rounded-full border border-fursat-camel/60 group-hover:border-fursat-terracotta transition-colors duration-500 shadow-md" />

          {/* Rotating Celestial Dashed Ring */}
          <div className="absolute inset-6 rounded-full border border-dashed border-fursat-camel/40 animate-[spin_40s_linear_infinite]" />

          {/* Inner Portal Void (Deep Black Core) */}
          <div
            className={`w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-fursat-black flex flex-col items-center justify-center p-6 border border-fursat-camel/30 shadow-2xl transition-all duration-700 ${
              portalActive ? "scale-[3.5] opacity-0" : "group-hover:scale-105"
            }`}
          >
            <Moon className="w-8 h-8 text-fursat-terracotta mb-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-sans text-sm sm:text-base font-bold tracking-[0.2em] text-white uppercase text-center">
              Step Into
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] text-fursat-sand uppercase font-semibold mt-0.5">
              The Nightlife
            </span>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-fursat-muted max-w-md font-normal leading-relaxed">
          Transitioning from warm dining sanctuaries into the velvet shadows, glowing bar, and handcrafted cocktails of After Dark.
        </p>
      </div>
    </section>
  );
}
