"use client";

import React from "react";
import { Sparkles, Calendar, Phone, Clock, MapPin, MessageSquare } from "lucide-react";

interface ReservationSectionProps {
  onOpenReservation: () => void;
}

export default function ReservationSection({ onOpenReservation }: ReservationSectionProps) {
  return (
    <section
      id="book"
      className="relative w-full py-24 sm:py-32 md:py-44 bg-fursat-sand overflow-hidden px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center border-t border-fursat-camel/20"
    >
      {/* Warm Volumetric Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[600px] bg-gradient-to-b from-fursat-sand-alt/60 via-fursat-camel/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Atmospheric Interior Photography Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center mix-blend-multiply"
        style={{
          backgroundImage: "url('/assets/main-dining-hall-D1OfpEb6.jpeg')",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtitle Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-fursat-hairline backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-fursat-terracotta" />
          <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
            Tell us what you need the table for
          </span>
        </div>

        {/* Large Dramatic Headline */}
        <h2 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl text-fursat-green tracking-tight leading-[1.15] mb-6">
          Take your time. <br />
          <span className="font-serif italic font-normal text-fursat-charcoal">
            We&apos;ll keep the table ready.
          </span>
        </h2>

        {/* Supporting Narrative */}
        <p className="font-sans text-sm sm:text-base text-fursat-muted max-w-2xl font-normal mb-10 leading-relaxed">
          Fill this in and send it our way — we&apos;ll confirm the details personally over WhatsApp or email.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenReservation}
            data-cursor="BOOK"
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Book Table / Event / Catering</span>
          </button>

          <a
            href="https://wa.me/919059670033"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WHATSAPP"
            className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2.5"
          >
            <MessageSquare className="w-4 h-4 text-fursat-green" />
            <span>WhatsApp: 090596 70033</span>
          </a>
        </div>

        {/* Discreet Information */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-6 border-t border-fursat-hairline text-xs sm:text-sm text-fursat-charcoal">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-fursat-terracotta" />
            <span>Open Daily: 12:00 PM – 11:30 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-fursat-terracotta" />
            <span>Capital Park, Madhapur, Hyderabad</span>
          </div>
        </div>
      </div>
    </section>
  );
}
