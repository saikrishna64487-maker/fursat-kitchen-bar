"use client";

import React, { useEffect, useState } from "react";

export default function Loader({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFading(true);
            setTimeout(() => {
              onLoaded();
            }, 600);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-fursat-sand flex flex-col items-center justify-center select-none transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Volumetric Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-fursat-camel/20 blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Title & Emblem */}
      <div className="relative flex flex-col items-center text-center mb-8">
        <div className="w-12 h-14 mb-2">
          <img
            src="/assets/logo-DB0x_8ZX.png"
            alt="Fursat Elephant"
            className="w-full h-full object-contain"
          />
        </div>
        <img
          src="/assets/brand-name-DRZv4Ebi.svg"
          alt="Fursat Kitchen & Bar"
          className="h-8 w-auto object-contain"
        />
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-fursat-terracotta mt-1 font-semibold">
          Madhapur · Hyderabad
        </span>
      </div>

      {/* Thin Progress Bar */}
      <div className="w-48 sm:w-64 h-[3px] bg-fursat-camel/30 relative overflow-hidden rounded-full mb-4">
        <div
          className="h-full bg-fursat-terracotta transition-all duration-150"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading Tagline */}
      <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-fursat-muted font-medium">
        Preparing your table... {Math.min(progress, 100)}%
      </span>
    </div>
  );
}
