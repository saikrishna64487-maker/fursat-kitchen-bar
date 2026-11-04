"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Users, MessageSquare, PhoneCall, Check, X, ShieldCheck } from "lucide-react";

export default function EventsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [eventType, setEventType] = useState("Kitty Party");
  const [guestCount, setGuestCount] = useState("50 - 100 Guests");
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "", date: "", notes: "" });

  const partyList = [
    "Kitty parties",
    "Birthdays",
    "Engagements",
    "Anniversaries",
    "Corporate evenings",
    "Baby showers",
    "Get-togethers",
  ];

  const handleSubmit = (channel: "whatsapp" | "email") => {
    if (!contactInfo.name || !contactInfo.phone) {
      alert("Please enter your name and contact phone number.");
      return;
    }

    const details = `*Banquet Hall Inquiry - Fursat Kitchen & Bar*\n\n*Name:* ${contactInfo.name}\n*Phone:* ${contactInfo.phone}\n*Event Type:* ${eventType}\n*Guest Count:* ${guestCount}\n*Preferred Date:* ${contactInfo.date || "Flexible"}\n*Special Requests:* ${contactInfo.notes || "None"}\n\n_Sent from Fursat web app_`;

    if (channel === "whatsapp") {
      window.open(`https://wa.me/919059670033?text=${encodeURIComponent(details)}`, "_blank");
    } else {
      window.location.href = `mailto:hello@fursatkitchenbar.in?subject=${encodeURIComponent(`Banquet Hall Inquiry - ${contactInfo.name}`)}&body=${encodeURIComponent(details.replace(/\*/g, ""))}`;
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="banquet"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-fursat-sand overflow-hidden px-4 sm:px-8 md:px-12 border-t border-fursat-camel/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 sm:w-12 h-[2px] bg-fursat-terracotta" />
          <span className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
            06 — Private Events
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Banquet Hall Photo */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-fursat-camel/30 shadow-[0_15px_45px_rgba(30,30,30,0.08)]">
            <div
              className="w-full h-80 sm:h-[480px] bg-cover bg-[center_30%] transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: "url('/assets/banquet/banquet-theatre-stage.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fursat-black/90 via-fursat-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-sans font-medium uppercase tracking-[0.06em] bg-fursat-green text-white px-2.5 py-1 rounded-md inline-block mb-1">
                  On-Site Banquet Hall
                </span>
                <p className="font-serif italic text-base text-fursat-sand">
                  Madhapur, Hyderabad
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-fursat-terracotta text-xs font-sans text-white font-semibold">
                150+ Seated
              </span>
            </div>
          </div>

          {/* Right Column: Banquet Specifications & Parties */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-fursat-terracotta font-semibold mb-2">
                Private Events
              </p>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-fursat-green font-bold leading-tight mb-4">
                The banquet hall, for whatever you&apos;re celebrating
              </h2>

              <p className="font-sans text-sm md:text-base text-fursat-muted font-normal leading-[1.6] mb-6">
                A private hall with its own seating, sound, and a team that plans the spread around your event — from a kitty party or family function to a full corporate evening.
              </p>

              {/* Capacity Badges */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-5 rounded-2xl bg-white border border-fursat-hairline shadow-sm">
                <div>
                  <div className="font-sans text-2xl sm:text-3xl font-bold text-fursat-charcoal">
                    150+
                  </div>
                  <span className="text-[11px] font-sans text-fursat-muted uppercase tracking-wider font-medium">
                    Seated Capacity
                  </span>
                </div>
                <div>
                  <div className="font-sans text-2xl sm:text-3xl font-bold text-fursat-green">
                    200+
                  </div>
                  <span className="text-[11px] font-sans text-fursat-muted uppercase tracking-wider font-medium">
                    Floating / Cocktail Style
                  </span>
                </div>
              </div>

              {/* Party Type Chips */}
              <div className="mb-8">
                <span className="text-xs font-sans uppercase tracking-[0.15em] text-fursat-green font-semibold block mb-2.5">
                  Hosted End-to-End For:
                </span>
                <div className="flex flex-wrap gap-2">
                  {partyList.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-fursat-hairline text-xs font-sans text-fursat-charcoal shadow-sm"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  data-cursor="ENQUIRE"
                  className="btn-primary py-3 px-6 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Enquire About The Hall</span>
                </button>

                <a
                  href="https://wa.me/919059670033?text=Hi%20Fursat,%20I'd%20like%20to%20enquire%20about%20booking%20the%20Banquet%20Hall."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-3 px-6 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banquet Inquiry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fursat-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-white border border-fursat-hairline shadow-2xl p-6 sm:p-8 my-6">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-fursat-sand border border-fursat-hairline text-fursat-charcoal hover:text-fursat-terracotta"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="py-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-fursat-green/10 border border-fursat-green flex items-center justify-center text-fursat-green mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-2xl text-fursat-charcoal mb-2">
                  Banquet Enquiry Dispatched
                </h3>
                <p className="font-sans text-xs sm:text-sm text-fursat-muted max-w-md leading-relaxed">
                  Our private events manager at Fursat Madhapur will connect with you right away to arrange dates and customized catering menus.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-fursat-bronze font-semibold">
                    Direct Concierge
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-fursat-espresso font-medium">
                    Enquire About Banquet Hall
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-wider text-fursat-espresso font-semibold block mb-1">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-surface border border-fursat-gold/30 text-fursat-espresso text-xs focus:outline-none focus:border-fursat-gold"
                    >
                      <option>Kitty Party</option>
                      <option>Birthday Celebration</option>
                      <option>Engagement Ceremony</option>
                      <option>Anniversary Celebration</option>
                      <option>Corporate Evening / Team Dinner</option>
                      <option>Baby Shower</option>
                      <option>Family Get-together</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-wider text-fursat-espresso font-semibold block mb-1">
                      Estimated Headcount
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-surface border border-fursat-gold/30 text-fursat-espresso text-xs focus:outline-none focus:border-fursat-gold"
                    >
                      <option>20 - 50 Guests</option>
                      <option>50 - 100 Guests</option>
                      <option>100 - 150 Guests (Seated)</option>
                      <option>150 - 200+ Guests (Floating)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-wider text-fursat-espresso font-semibold block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-surface border border-fursat-gold/30 text-fursat-espresso text-xs focus:outline-none focus:border-fursat-gold placeholder:text-fursat-muted/50"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-wider text-fursat-espresso font-semibold block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-surface border border-fursat-gold/30 text-fursat-espresso text-xs focus:outline-none focus:border-fursat-gold placeholder:text-fursat-muted/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-fursat-espresso font-semibold block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={contactInfo.date}
                    onChange={(e) => setContactInfo({ ...contactInfo, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-surface border border-fursat-gold/30 text-fursat-espresso text-xs focus:outline-none focus:border-fursat-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-fursat-espresso font-semibold block mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Seating preference, sound setup, dietary specifics..."
                    value={contactInfo.notes}
                    onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-surface border border-fursat-gold/30 text-fursat-espresso text-xs focus:outline-none focus:border-fursat-gold placeholder:text-fursat-muted/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSubmit("whatsapp")}
                    className="py-3 rounded-full text-xs font-sans uppercase font-bold tracking-wider text-fursat-cream bg-gradient-to-r from-fursat-espresso to-fursat-brown border border-fursat-gold/40 hover:border-fursat-gold shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-fursat-gold" />
                    <span>Send WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit("email")}
                    className="py-3 rounded-full text-xs font-sans uppercase font-semibold tracking-wider text-fursat-espresso border border-fursat-gold/50 bg-fursat-surface hover:bg-fursat-gold/10 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Send Email</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
