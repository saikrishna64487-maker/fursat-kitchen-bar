"use client";

import React from "react";

export interface FursatLogoProps {
  className?: string;
  layout?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  showLocation?: boolean;
}

export default function FursatLogo({
  className = "",
  layout = "vertical",
  size = "md",
  showLocation = false,
}: FursatLogoProps) {
  if (layout === "vertical") {
    const elephantSize =
      size === "sm"
        ? "w-7 h-9"
        : size === "lg"
        ? "w-12 h-16 sm:w-14 sm:h-18"
        : "w-8 h-10 sm:w-9 sm:h-11";

    const svgHeight =
      size === "sm"
        ? "h-4 sm:h-5"
        : size === "lg"
        ? "h-7 sm:h-8"
        : "h-5 sm:h-6";

    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        {/* Authentic Elephant Emblem */}
        <div
          className={`relative ${elephantSize} flex-shrink-0 transition-transform duration-300 group-hover:scale-105 mb-0.5`}
        >
          <img
            src="/assets/logo-DB0x_8ZX.png"
            alt="Fursat elephant emblem"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Authentic Brand Logotype Typography SVG underneath the logo */}
        <div className="flex flex-col items-center">
          <img
            src="/assets/brand-name-DRZv4Ebi.svg"
            alt="Fursat Kitchen & Bar"
            className={`${svgHeight} w-auto object-contain transition-opacity duration-300 group-hover:opacity-90`}
          />
          {showLocation && (
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-fursat-terracotta mt-0.5 font-semibold">
              Madhapur · Hyderabad
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal Layout
  const elephantSize =
    size === "sm"
      ? "w-7 h-9"
      : size === "lg"
      ? "w-11 h-14"
      : "w-9 h-11 sm:w-10 sm:h-12";

  const svgHeight =
    size === "sm" ? "h-6 sm:h-7" : size === "lg" ? "h-9 sm:h-10" : "h-7 sm:h-8";

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Authentic Elephant Emblem */}
      <div
        className={`relative ${elephantSize} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      >
        <img
          src="/assets/logo-DB0x_8ZX.png"
          alt="Fursat elephant emblem"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Authentic Brand Logotype Typography SVG */}
      <div className="flex flex-col">
        <img
          src="/assets/brand-name-DRZv4Ebi.svg"
          alt="Fursat Kitchen & Bar"
          className={`${svgHeight} w-auto object-contain transition-opacity duration-300 group-hover:opacity-90`}
        />
        <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-fursat-terracotta -mt-0.5 font-semibold">
          Madhapur · Hyderabad
        </span>
      </div>
    </div>
  );
}

export { FursatLogo };
