"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CalendarHeart, Users, PartyPopper, Briefcase, Music, Utensils } from "lucide-react";

interface Moment {
  id: string;
  category: string;
  icon: React.ElementType;
  title: string;
  quote: string;
  desc: string;
  image: string;
  tag: string;
}

export default function MomentsSection() {
  const moments: Moment[] = [
    {
      id: "dinner",
      category: "DINNER",
      icon: Utensils,
      title: "The Unhurried Feast",
      quote: "“A table where flavours speak and time gently stands still.”",
      desc: "Slow-roasted Deccan kebabs, fragrant basmati handis, and vintage cellars curated for slow epicurean appreciation.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80",
      tag: "Culinary Elegance",
    },
    {
      id: "date-night",
      category: "DATE NIGHT",
      icon: CalendarHeart,
      title: "Candlelit Whispers",
      quote: "“Intimacy sculpted by soft amber shadows and bespoke cocktails.”",
      desc: "Quiet booth alcoves, delicate crystal clinking, and discreet hospitality designed for unforgettable two-person stories.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      tag: "Romance & Ambiance",
    },
    {
      id: "friends",
      category: "FRIENDS",
      icon: Users,
      title: "The Golden Circle",
      quote: "“Reunions ignited by shared platters and endless laughter.”",
      desc: "Large round dining tables, shared artisanal appetizers, and high-energy conversations that last until midnight.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
      tag: "Social Camaraderie",
    },
    {
      id: "celebrations",
      category: "CELEBRATIONS",
      icon: PartyPopper,
      title: "Milestones & Galas",
      quote: "“Birthdays, anniversaries, and grand toasts worthy of 24K moments.”",
      desc: "Custom multi-course banquet menus, personalized champagne towers, and dedicated celebration coordinators.",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
      tag: "Bespoke Gatherings",
    },
    {
      id: "corporate",
      category: "CORPORATE EVENTS",
      icon: Briefcase,
      title: "The Executive Table",
      quote: "“Where vision meets refined gastronomy in Hyderabad’s tech hub.”",
      desc: "Private dining rooms equipped with discreet service, premium tasting menus, and seamless executive hosting.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      tag: "Business & Mixer",
    },
    {
      id: "weekend-nights",
      category: "WEEKEND NIGHTS",
      icon: Music,
      title: "Twilight Rhythms",
      quote: "“Acoustic warmth transitioning into magnetic weekend beats.”",
      desc: "Live musician sets, resident DJs, illuminated bar spectacles, and Hyderabad's most stylish nightlife crowd.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
      tag: "Live Sounds",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-advance every 6 seconds unless user manually interacts
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % moments.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [moments.length]);

  return (
    <section
      id="moments"
      className="relative w-full py-28 md:py-40 bg-fursat-sand overflow-hidden px-6 md:px-12 border-t border-fursat-camel/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[1px] bg-fursat-camel" />
              <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
                05 — Lifestyle &amp; Memories
              </span>
            </div>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl text-fursat-green font-bold tracking-tight">
              Moments at Fursat
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-fursat-muted max-w-md font-normal leading-relaxed">
            Every occasion carries its own cadence. Discover the setting tailored to your gathering.
          </p>
        </div>

        {/* Moment Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b border-fursat-camel/20">
          {moments.map((m, idx) => {
            const IconComp = m.icon;
            const isActive = activeIdx === idx;
            return (
              <button
                key={m.id}
                onClick={() => setActiveIdx(idx)}
                data-cursor="DISCOVER"
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-fursat-green text-white font-bold shadow-md scale-105"
                    : "bg-white text-fursat-green border border-fursat-camel/60 hover:bg-fursat-sand-alt shadow-sm"
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{m.category}</span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Main Lifestyle Display */}
        <div className="relative rounded-3xl overflow-hidden border border-fursat-hairline shadow-xl aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
          {/* Active Image Crossfade */}
          {moments.map((m, idx) => (
            <div
              key={m.id}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform ${
                activeIdx === idx
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
              style={{ backgroundImage: `url('${m.image}')` }}
            />
          ))}

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-fursat-black/95 via-fursat-black/60 to-transparent" />

          {/* Floating Content Card */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="px-3.5 py-1 rounded-full bg-fursat-terracotta text-[10px] font-sans font-semibold tracking-widest text-white uppercase inline-block mb-3">
                {moments[activeIdx].tag}
              </span>

              <h3 className="font-sans text-3xl sm:text-5xl text-white font-bold mb-2">
                {moments[activeIdx].title}
              </h3>

              <p className="font-serif italic text-base sm:text-xl text-fursat-sand mb-3">
                {moments[activeIdx].quote}
              </p>

              <p className="font-sans text-xs sm:text-sm text-fursat-sand/90 font-normal max-w-lg leading-relaxed">
                {moments[activeIdx].desc}
              </p>
            </div>

            <a
              href="#reservation"
              data-cursor="BOOK"
              className="btn-primary flex-shrink-0"
            >
              Reserve For This Moment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
