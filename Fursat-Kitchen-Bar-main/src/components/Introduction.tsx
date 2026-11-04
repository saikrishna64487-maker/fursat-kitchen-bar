"use client";

import React from "react";
import { Users, Box, PartyPopper } from "lucide-react";

export default function Introduction() {
  const facts = [
    {
      mark: "I",
      icon: Users,
      title: "Every kind of booking",
      desc: "Team lunches, family tables, walk-ins, kitty parties — one enquiry gets it sorted.",
    },
    {
      mark: "II",
      icon: Box,
      title: "Catering & food box",
      desc: "For your office, a home function, or just yourself — order ahead, open to anyone.",
    },
    {
      mark: "III",
      icon: PartyPopper,
      title: "A banquet hall on-site",
      desc: "Birthdays, engagements, kitty parties, corporate evenings — hosted end to end.",
    },
  ];

  return (
    <section
      id="experience"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-fursat-sand overflow-hidden px-4 sm:px-8 md:px-12 border-t border-fursat-camel/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="w-8 sm:w-12 h-[2px] bg-fursat-terracotta" />
          <span className="font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta">
            01 — The Fursat Experience
          </span>
        </div>

        {/* Large Brand Headline (H1 / H2) */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl text-fursat-green leading-[1.15] max-w-5xl">
            Kitchen table energy, <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-fursat-charcoal">
              bar shelf confidence.
            </span>
          </h2>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Photography from Fursat Madhapur */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group border border-fursat-camel/30 shadow-[0_12px_32px_rgba(30,30,30,0.06)]">
              <div
                className="w-full h-80 sm:h-96 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: "url('/assets/cafe-counter-dessert-display-ChDJtGS1.jpeg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fursat-black/90 via-fursat-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[11px] font-sans font-medium uppercase tracking-[0.06em] bg-fursat-green text-white px-2.5 py-1 rounded-md inline-block mb-2">
                  Inside Fursat Madhapur
                </span>
                <p className="font-serif italic text-sm text-fursat-sand">
                  Cafe counter, dessert display, and all-day dining comfort in Silicon Valley, Madhapur.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Prose & Core 3 Facts */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            <p className="font-sans text-base sm:text-lg text-fursat-charcoal font-normal leading-[1.6]">
              Fursat is a multicuisine kitchen and bar in Madhapur — an all-day menu, a full drinks list, and a room that works for a quick lunch or a long celebration.
            </p>

            {/* 3 Core Facts Cards */}
            <div className="space-y-4">
              {facts.map((fact, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-fursat-hairline shadow-[0_4px_16px_rgba(30,30,30,0.03)] hover:border-fursat-green transition-all duration-300 group flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-green font-sans font-bold text-sm flex-shrink-0 group-hover:bg-fursat-green group-hover:text-white transition-all">
                      {fact.mark}
                    </div>
                    <div>
                      <h3 className="font-sans text-base sm:text-lg text-fursat-charcoal font-semibold mb-1 group-hover:text-fursat-terracotta transition-colors">
                        {fact.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-fursat-muted leading-relaxed font-normal">
                        {fact.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

