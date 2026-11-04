"use client";

import React from "react";
import { MapPin, Navigation, Clock, Phone, ExternalLink, Compass, MessageSquare, Mail } from "lucide-react";

export default function LocationExperience() {
  const googleMapsUrl = "https://maps.app.goo.gl/1EFLCxT8NSQFCaEVA";

  const landmarks = [
    { label: "Ayyappa Society Main Road", time: "1 min away" },
    { label: "Durgam Cheruvu Cable Bridge", time: "4 mins away" },
    { label: "Inorbit Mall Madhapur", time: "5 mins away" },
    { label: "Hitec City Cyber Towers", time: "7 mins away" },
  ];

  return (
    <section
      id="location"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-fursat-sand overflow-hidden px-4 sm:px-8 md:px-12 border-t border-fursat-camel/20"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-fursat-camel/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="w-8 sm:w-12 h-[1px] bg-fursat-camel" />
              <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
                08 — Destination &amp; Arrival
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl text-fursat-green font-bold tracking-tight">
              Find Your Fursat
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-fursat-muted max-w-md font-normal leading-relaxed">
            Situated in Silicon Valley, VIP Hills, Capital Park Road, Ayyappa Society, Madhapur, Hyderabad.
          </p>
        </div>

        {/* 2-Column Map + Address Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left Column: Stylized Vector Interactive Map Frame */}
          <div className="lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-fursat-sand-alt border border-fursat-hairline shadow-md h-[360px] sm:h-[440px] flex items-center justify-center p-4 sm:p-6">
            {/* Minimalist SVG Map Grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-90"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <pattern id="mapGridLoc" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B9946B" strokeWidth="0.5" strokeOpacity="0.35" />
                </pattern>
                <linearGradient id="routeGradientLoc" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B9946B" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#CF4B37" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2E4E21" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="#E5D5C1" />
              <rect width="100%" height="100%" fill="url(#mapGridLoc)" />

              {/* Arterial roads of Madhapur */}
              <path d="M -20 180 Q 150 220 300 240 T 650 160" fill="none" stroke="#ECDEC8" strokeWidth="10" />
              <path d="M 100 450 Q 240 300 350 250 T 600 50" fill="none" stroke="#ECDEC8" strokeWidth="12" />
              <path d="M 200 20 Q 320 180 350 250 T 500 450" fill="none" stroke="#ECDEC8" strokeWidth="8" />

              {/* Glowing Route to Fursat at Capital Park */}
              <path
                d="M 60 380 C 180 340, 240 290, 350 250"
                fill="none"
                stroke="url(#routeGradientLoc)"
                strokeWidth="4"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            </svg>

            {/* Glowing Destination Marker Pin */}
            <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
              <div className="absolute w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-fursat-terracotta/25 animate-ping" />
              <div className="absolute w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-fursat-sand/50 blur-md animate-pulse" />

              {/* Marker Badge */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN MAP"
                className="relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-fursat-green text-white font-sans font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>FURSAT · Madhapur</span>
              </a>

              <span className="mt-2 text-[10px] font-mono text-fursat-charcoal font-semibold bg-white/95 px-2 py-0.5 rounded border border-fursat-hairline shadow-sm">
                VIP Hills · Silicon Valley
              </span>
            </div>

            {/* Bottom Floating Map Controls */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-auto">
              <span className="text-[10px] font-sans uppercase tracking-widest text-fursat-charcoal bg-white/95 px-3 py-1 rounded-full border border-fursat-hairline shadow-sm">
                Capital Park · VIP Hills
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="MAP"
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] font-sans uppercase font-bold tracking-wider text-white bg-fursat-terracotta hover:bg-fursat-terracotta-dark shadow-md transition-all flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Venue Coordinates & Details */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {/* Address Card */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-fursat-hairline shadow-sm">
              <span className="text-[12px] font-sans uppercase tracking-[0.2em] text-fursat-terracotta font-semibold block mb-2">
                Venue Location
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl text-fursat-green font-bold mb-2">
                Fursat Kitchen &amp; Bar
              </h3>
              <p className="font-sans text-sm text-fursat-muted font-normal leading-relaxed mb-6">
                Capital Pk Road, Ayyappa Society, <br />
                VIP Hills, Silicon Valley, Madhapur, <br />
                Hyderabad, Telangana — 500081, India
              </p>

              <div className="space-y-3 pt-4 border-t border-fursat-hairline">
                <div className="flex items-center gap-3 text-sm text-fursat-charcoal">
                  <Clock className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
                  <span>Open Daily, 12:00 pm – 11:30 pm</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-fursat-charcoal">
                  <Phone className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
                  <a href="tel:+919059670033" className="hover:text-fursat-terracotta font-semibold">
                    090596 70033
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-fursat-charcoal">
                  <Mail className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
                  <a href="mailto:hello@fursatkitchenbar.in" className="hover:text-fursat-terracotta">
                    hello@fursatkitchenbar.in
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="ROUTE"
                  className="btn-primary py-3 rounded-full text-xs font-sans uppercase font-bold tracking-[0.15em] flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span>Directions</span>
                </a>

                <a
                  href="https://wa.me/919059670033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-3 rounded-full text-xs font-sans uppercase font-semibold tracking-[0.15em] flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-fursat-green" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Proximity Grid */}
            <div className="p-4 sm:p-5 rounded-2xl bg-fursat-sand-alt border border-fursat-hairline">
              <span className="text-[12px] font-sans uppercase tracking-[0.2em] text-fursat-terracotta block mb-3 font-semibold">
                Proximity Landmarks
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {landmarks.map((lm, idx) => (
                  <div key={idx} className="p-2.5 sm:p-3 rounded-xl bg-white border border-fursat-hairline shadow-sm">
                    <span className="text-xs font-sans text-fursat-charcoal font-semibold block">
                      {lm.label}
                    </span>
                    <span className="text-[11px] text-fursat-green font-mono font-medium">
                      {lm.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
