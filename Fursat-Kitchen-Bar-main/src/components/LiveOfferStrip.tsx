"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Clock, Star, Zap, Info, ArrowRight } from "lucide-react";

interface ScheduleSlot {
  start: string;
  end: string;
  pct: number;
  label: string;
}

const DEFAULT_SCHEDULE: ScheduleSlot[] = [
  { start: "12:00", end: "16:00", pct: 10, label: "Afternoon" },
  { start: "16:00", end: "19:00", pct: 20, label: "Evening lull" },
  { start: "19:00", end: "21:30", pct: 5, label: "Dinner rush" },
  { start: "21:30", end: "23:30", pct: 30, label: "Late hours" },
];

function timeToMins(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function formatTime12(t: string): string {
  const [hStr, mStr] = t.split(":");
  const h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${mStr !== "00" ? ":" + mStr : ""} ${ampm}`;
}

export default function LiveOfferStrip() {
  const [activeSlot, setActiveSlot] = useState<ScheduleSlot | null>(null);
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(DEFAULT_SCHEDULE);
  const [isOpen, setIsOpen] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  useEffect(() => {
    // Fetch live offers from content API
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content?.offers && Array.isArray(data.content.offers)) {
          const activeOffers = data.content.offers
            .filter((o: any) => o.active)
            .map((o: any) => ({
              start: o.start,
              end: o.end,
              pct: o.discountPct,
              label: o.label || o.name,
            }));
          if (activeOffers.length > 0) {
            setSchedule(activeOffers);
          }
        }
      })
      .catch(() => {
        // Fallback to default
      });
  }, []);

  const updateCurrentOffer = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const nowMins = h * 60 + m;
    const timeFormatted = `${(h % 12 || 12)}:${m < 10 ? "0" : ""}${m} ${h >= 12 ? "PM" : "AM"}`;
    setCurrentTimeStr(timeFormatted);

    // Kitchen is open 12:00 to 23:30 (11:30 PM)
    const openMins = 12 * 60;
    const closeMins = 23 * 60 + 30;

    const inHours = nowMins >= openMins && nowMins < closeMins;
    setIsOpen(inHours);

    const match = schedule.find((slot) => {
      const sM = timeToMins(slot.start);
      const eM = timeToMins(slot.end);
      return nowMins >= sM && nowMins < eM;
    });

    setActiveSlot(match || null);
  };

  useEffect(() => {
    updateCurrentOffer();
    const timer = setInterval(updateCurrentOffer, 30000);
    return () => clearInterval(timer);
  }, [schedule]);

  return (
    <section id="offers" className="relative w-full bg-fursat-black text-fursat-sand border-y border-fursat-camel/20 select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-fursat-terracotta/10 blur-3xl pointer-events-none" />

      {/* Top Banner: Dynamic House Discount Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold tracking-wide uppercase ${
                isOpen && activeSlot
                  ? "bg-fursat-terracotta text-white animate-pulse"
                  : isOpen
                  ? "bg-fursat-green text-white"
                  : "bg-fursat-muted text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              {isOpen && activeSlot ? (
                <span>
                  Live Now: {activeSlot.pct}% OFF ({activeSlot.label})
                </span>
              ) : isOpen ? (
                <span>Open Now ({currentTimeStr})</span>
              ) : (
                <span>Kitchen opens at 12:00 PM</span>
              )}
            </span>

            <span className="font-sans text-xs sm:text-sm text-fursat-sand/80 hidden sm:inline">
              Discounts change through the day — quieter hours get the bigger discount.
            </span>
          </div>

          <a
            href="#menu"
            className="text-xs sm:text-sm font-sans uppercase tracking-wider text-fursat-terracotta hover:text-white transition-colors flex items-center gap-1 font-semibold"
          >
            <span>Order &amp; Apply Discount</span>
            <ArrowRight className="w-4 h-4 text-fursat-terracotta" />
          </a>
        </div>

        {/* 4 Promo Schedule Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {DEFAULT_SCHEDULE.map((slot, idx) => {
            const isCurrent = isOpen && activeSlot?.label === slot.label;
            return (
              <div
                key={idx}
                className={`relative p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? "bg-[#1C1C1C] border-2 border-fursat-terracotta shadow-lg scale-[1.02]"
                    : "bg-[#161616] border border-fursat-camel/20 hover:border-fursat-camel/50"
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-fursat-terracotta text-white text-[9px] font-sans font-bold uppercase tracking-wider shadow-sm">
                    Happening Now
                  </span>
                )}

                <div>
                  <span className="font-mono text-[10px] sm:text-xs text-fursat-sand/90 block mb-1">
                    {formatTime12(slot.start)} – {formatTime12(slot.end)}
                  </span>
                  <div className="font-sans text-2xl sm:text-3xl lg:text-4xl text-white font-bold my-0.5">
                    {slot.pct}% <span className="text-xs sm:text-sm font-sans font-normal text-fursat-sand">OFF</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-fursat-camel/20 flex items-center justify-between">
                  <span className="font-serif italic text-xs sm:text-sm text-fursat-sand">
                    {slot.label}
                  </span>
                  <span className="text-[10px] font-sans text-fursat-sand/60 uppercase">
                    Dine-in
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="font-sans text-xs text-fursat-sand/60 mt-3 text-center sm:text-left">
          * Discount applies to dine-in food bill. Timings and rates shown are the current house schedule and confirmed upon seating/ordering.
        </p>
      </div>

      {/* Social Ratings Strip Bar */}
      <div className="border-t border-fursat-camel/20 bg-[#080808] py-4 sm:py-5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 sm:gap-8">
          {/* Zomato */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-300 font-bold text-sm">
              ★
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold text-lg text-white">4.4</span>
                <span className="text-xs text-fursat-sand/60">/ 5.0</span>
              </div>
              <span className="text-xs font-sans text-fursat-sand/70 block">
                Zomato · 1,200+ ratings
              </span>
            </div>
          </div>

          <span className="hidden md:block w-px h-8 bg-fursat-camel/20" />

          {/* Swiggy */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 font-bold text-sm">
              ★
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold text-lg text-white">4.6</span>
                <span className="text-xs text-fursat-sand/60">/ 5.0</span>
              </div>
              <span className="text-xs font-sans text-fursat-sand/70 block">
                Swiggy · 2,900+ reviews
              </span>
            </div>
          </div>

          <span className="hidden md:block w-px h-8 bg-fursat-camel/20" />

          {/* Justdial */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-300 font-bold text-sm">
              ★
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold text-lg text-white">4.9</span>
                <span className="text-xs text-fursat-sand/60">/ 5.0</span>
              </div>
              <span className="text-xs font-sans text-fursat-sand/70 block">
                Justdial · 2,800+ votes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
