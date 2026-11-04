"use client";

import React, { useState } from "react";
import { Utensils, QrCode, Wine, Coffee } from "lucide-react";
import QRScannerModal from "./QRScannerModal";

export default function FoodExperience() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <section
      id="menu"
      className="relative w-full py-24 sm:py-32 bg-fursat-sand overflow-hidden px-4 sm:px-8 md:px-12 border-t border-fursat-camel/20"
    >
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-fursat-green text-white text-xs font-sans font-medium tracking-[0.06em] uppercase mb-4 shadow-sm">
          <span>OUR MENU</span>
        </div>

        {/* Large Elegant Heading (H1 / H2) */}
        <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl text-fursat-green tracking-tight font-bold max-w-3xl mx-auto leading-[1.15]">
          Good food. Great drinks. <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-fursat-charcoal">Made for Fursat moments.</span>
        </h2>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base text-fursat-muted mt-4 sm:mt-5 max-w-2xl mx-auto font-normal leading-[1.6]">
          Discover our food, drinks, chef&apos;s specials and more. Scan the physical QR code placed at your table to browse the live digital menu and send orders straight to the kitchen.
        </p>

        {/* Luxury Highlights Grid (3 Informational Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto mt-8 sm:mt-10 text-left">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-fursat-hairline shadow-sm hover:border-fursat-green transition-all group">
            <div className="w-10 h-10 rounded-xl bg-fursat-green/10 text-fursat-green flex items-center justify-center mb-3 group-hover:bg-fursat-green group-hover:text-white transition-all">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-base sm:text-lg font-semibold text-fursat-charcoal">
              Multicuisine Kitchen
            </h3>
            <p className="font-sans text-xs sm:text-sm text-fursat-muted mt-1 leading-relaxed">
              Hyderabadi gravies, tandoori grills, Continental mains, pizzas, and South Indian specialties.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-fursat-hairline shadow-sm hover:border-fursat-terracotta transition-all group">
            <div className="w-10 h-10 rounded-xl bg-fursat-terracotta/10 text-fursat-terracotta flex items-center justify-center mb-3 group-hover:bg-fursat-terracotta group-hover:text-white transition-all">
              <Wine className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-base sm:text-lg font-semibold text-fursat-charcoal">
              Cocktails &amp; Bar
            </h3>
            <p className="font-sans text-xs sm:text-sm text-fursat-muted mt-1 leading-relaxed">
              Single malts, scotch, artisanal gin, tequila, craft cocktails, mocktails, and chilled brews.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-fursat-hairline shadow-sm hover:border-fursat-green transition-all group">
            <div className="w-10 h-10 rounded-xl bg-fursat-camel/20 text-fursat-green flex items-center justify-center mb-3 group-hover:bg-fursat-green group-hover:text-white transition-all">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-base sm:text-lg font-semibold text-fursat-charcoal">
              Specialty Cafe &amp; Teas
            </h3>
            <p className="font-sans text-xs sm:text-sm text-fursat-muted mt-1 leading-relaxed">
              Freshly brewed espresso, iced lattes, frappes, thick milkshakes, smoothies, and desserts.
            </p>
          </div>
        </div>

        {/* ONE Single Primary Action: SCAN MENU (Primary CTA #CF4B37) */}
        <div className="flex flex-col items-center justify-center mt-8 sm:mt-10">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="btn-primary py-4 px-10 text-sm sm:text-base flex items-center gap-3 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <QrCode className="w-5 h-5 text-white" />
            <span>Scan Menu</span>
          </button>

          {/* Customer-facing explanatory note */}
          <p className="font-sans text-xs sm:text-sm text-fursat-muted mt-4 font-normal">
            Scan the QR code at your table to view the menu and place your order.
          </p>
        </div>
      </div>

      {/* Live Device Camera / QR Scanner Viewfinder Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />
    </section>
  );
}

