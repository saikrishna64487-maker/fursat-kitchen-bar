"use client";

import React, { useState } from "react";
import { Sparkles, MapPin, Users, Compass, ArrowRight } from "lucide-react";

export default function RestaurantReveal() {
  const [activeZone, setActiveZone] = useState<number>(0);

  const zones = [
    {
      id: "ambience",
      title: "The Grand Main Dining Room",
      category: "AMBIENCE",
      desc: "Warm ambient brass glow, architectural grandeur, and spacious dining tables designed for relaxed gatherings and memorable family meals.",
      image: "/assets/main-dining-hall-D1OfpEb6.jpeg",
      tag: "Signature Dining",
      capacity: "140 Seats",
    },
    {
      id: "bar",
      title: "The Kitchen & Bar Lounge",
      category: "THE BAR",
      desc: "An energetic lounge with artisan mixologist creations, craft beers, botanical infusions, and stylish seating.",
      image: "/assets/kitchen-bar-lounge-seating-DXKtkFu9.jpeg",
      tag: "Artisan Cocktails",
      capacity: "60 Lounge Seats",
    },
    {
      id: "booths",
      title: "Intimate Dark Booth Alcoves",
      category: "BOOTHS",
      desc: "Cozy velvet booths nestled in warm golden lighting, designed for private conversations and romantic dining.",
      image: "/assets/dark-booth-seating-DVhnpRQ8.jpeg",
      tag: "Intimate Dining",
      capacity: "Private Booths",
    },
    {
      id: "communal",
      title: "The Communal Seating Area",
      category: "COMMUNAL",
      desc: "Expansive layouts and long communal tables designed for celebratory reunions, kitty parties, and corporate evenings.",
      image: "/assets/communal-seating-BBQ0H9sH.jpeg",
      tag: "Reunions & Groups",
      capacity: "150+ Guests",
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 md:py-36 bg-fursat-sand overflow-hidden px-4 sm:px-8 md:px-12 border-t border-fursat-camel/20">
      {/* Background Radiance */}
      <div className="absolute top-0 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-fursat-camel/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="w-8 sm:w-12 h-[1px] bg-fursat-camel" />
              <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
                02 — Spaces &amp; Ambience
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-fursat-green font-bold tracking-tight">
              Step Inside
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-fursat-muted max-w-md font-normal leading-relaxed">
            Every corner of Fursat at Capital Park, Madhapur is curated for comfort, connection, and celebratory moments.
          </p>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {zones.map((zone, idx) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(idx)}
              data-cursor="REVEAL"
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 ${
                activeZone === idx
                  ? "bg-fursat-green text-white shadow-md font-bold scale-105"
                  : "bg-white text-fursat-green border border-fursat-camel/60 hover:bg-fursat-sand-alt shadow-sm"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeZone === idx ? "bg-white" : "bg-fursat-terracotta"
                }`}
              />
              {zone.category}
            </button>
          ))}
        </div>

        {/* Cinematic Main Display Frame */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-fursat-hairline shadow-xl aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
          {/* Active Image Crossfade */}
          {zones.map((zone, idx) => (
            <div
              key={zone.id}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform ${
                activeZone === idx
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
              style={{
                backgroundImage: `url('${zone.image}')`,
              }}
            />
          ))}

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-fursat-black/95 via-fursat-black/40 to-transparent" />

          {/* Floating Atmospheric Information Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-fursat-terracotta text-[10px] font-sans font-semibold tracking-widest text-white uppercase">
                  {zones[activeZone].tag}
                </span>
                <span className="text-xs font-sans text-fursat-sand/90 tracking-wider">
                  Capacity: {zones[activeZone].capacity}
                </span>
              </div>
              <h3 className="font-sans text-xl sm:text-3xl md:text-4xl text-white font-bold mb-2">
                {zones[activeZone].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-fursat-sand/90 font-normal leading-relaxed">
                {zones[activeZone].desc}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center gap-2.5 self-end md:self-auto">
              {zones.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveZone(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeZone === idx
                      ? "w-7 h-2 bg-fursat-terracotta"
                      : "w-2 h-2 bg-white/40 hover:bg-white"
                  }`}
                  aria-label={`View space ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
