"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Printer, Download, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

export default function QRCardClient() {
  const [menuUrl, setMenuUrl] = useState("https://fursat.kitchen/menu");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      setMenuUrl(`${baseUrl}/menu`);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Generate Google Chart API QR or SVG QR for 100% vector clarity
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    menuUrl
  )}&bgcolor=FAF6EE&color=2A211B&margin=10`;

  return (
    <div className="min-h-screen bg-fursat-sand text-fursat-charcoal flex flex-col items-center justify-center p-4 sm:p-8 font-sans print:p-0 print:bg-white">
      
      {/* Top Controls (Hidden on Print) */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider text-fursat-muted hover:text-fursat-charcoal transition-colors"
        >
          ← Back to Website
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/menu"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider btn-secondary transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Open Menu</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider btn-primary transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Print QR Card</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHYSICAL QR CARD DESIGN (MATCHING OFFICIAL REFERENCE)                     */}
      {/* ========================================================================= */}
      <div className="w-full max-w-md aspect-[1/1.05] bg-fursat-sand rounded-3xl border-2 border-fursat-camel shadow-xl p-6 sm:p-8 relative flex flex-col items-center justify-between overflow-hidden print:shadow-none print:border-neutral-300 print:w-full print:max-w-none">
        
        {/* Decorative Scallop/Filigree Inner Border */}
        <div className="absolute inset-3.5 rounded-2xl border border-fursat-camel/50 pointer-events-none" />

        {/* Four Corner Motifs */}
        <div className="absolute top-5 left-5 text-fursat-camel text-xs">✦</div>
        <div className="absolute top-5 right-5 text-fursat-camel text-xs">✦</div>
        <div className="absolute bottom-5 left-5 text-fursat-camel text-xs">✦</div>
        <div className="absolute bottom-5 right-5 text-fursat-camel text-xs">✦</div>

        {/* Top Branding Section */}
        <div className="text-center z-10 pt-2">
          {/* Official Red Elephant */}
          <div className="w-14 h-16 sm:w-16 sm:h-20 mx-auto mb-1.5">
            <img
              src="/assets/logo-DB0x_8ZX.png"
              alt="Fursat Elephant"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>

          {/* Official Wordmark SVG */}
          <div className="w-48 sm:w-56 mx-auto">
            <img
              src="/assets/brand-name-DRZv4Ebi.svg"
              alt="Fursat Kitchen & Bar"
              className="w-full h-auto object-contain"
            />
          </div>

          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-fursat-terracotta uppercase font-semibold block mt-1">
            KITCHEN – BAR
          </span>
        </div>

        {/* Center QR Code Container */}
        <div className="relative z-10 p-3 bg-white rounded-2xl border border-fursat-camel/40 shadow-inner my-2">
          <img
            src={qrCodeImageUrl}
            alt="Scan Fursat QR Menu"
            className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-lg"
          />
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center z-10 pb-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-fursat-green uppercase">
            Scan to View Menu
          </h2>
          <div className="w-16 h-[1.5px] bg-fursat-camel mx-auto mt-1 mb-1" />
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-fursat-muted font-semibold">
            Common Table QR Code • All Tables
          </p>
        </div>
      </div>

      <div className="mt-4 text-center print:hidden">
        <p className="text-xs text-fursat-muted font-normal">
          Points to: <span className="font-mono font-semibold text-fursat-charcoal">{menuUrl}</span>
        </p>
      </div>
    </div>
  );
}
