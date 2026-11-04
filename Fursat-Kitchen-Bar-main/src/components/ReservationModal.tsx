"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  X,
  Phone,
  Mail,
  User,
  MessageSquare,
  Calendar,
  Clock,
  Users,
  MapPin,
  Utensils,
  Building2,
  ChefHat,
  Layers,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "table" | "catering" | "banquet";
}

export default function ReservationModal({
  isOpen,
  onClose,
  initialType = "table",
}: ReservationModalProps) {
  const [activeTab, setActiveTab] = useState<"table" | "catering" | "banquet">(initialType);

  // Sync initialType whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialType);
    }
  }, [isOpen, initialType]);

  // Today's Date for min date validation (dynamically generated)
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Shared / Contact info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // ==========================================
  // TAB 1: Table Booking State
  // ==========================================
  const [tableDate, setTableDate] = useState(() => todayStr);
  const [tableTime, setTableTime] = useState("13:00");
  const [tableGuests, setTableGuests] = useState("4");
  const [tableOccasion, setTableOccasion] = useState("Family lunch or dinner");
  const [tableNotes, setTableNotes] = useState("");

  // ==========================================
  // TAB 2: Catering & Food Box State
  // ==========================================
  const [cateringDate, setCateringDate] = useState(() => todayStr);
  const [cateringType, setCateringType] = useState("Corporate");
  const [cateringRequirement, setCateringRequirement] = useState("Event Catering");
  const [cateringQuantity, setCateringQuantity] = useState("25");
  const [cateringLocation, setCateringLocation] = useState("");
  const [cateringServiceTime, setCateringServiceTime] = useState("12:30");
  const [cateringMenuReq, setCateringMenuReq] = useState("");
  const [cateringNotes, setCateringNotes] = useState("");

  // ==========================================
  // TAB 3: Banquet Hall State
  // ==========================================
  const [banquetDate, setBanquetDate] = useState(() => todayStr);
  const [banquetEventType, setBanquetEventType] = useState("Birthday");
  const [banquetGuests, setBanquetGuests] = useState("50");
  const [banquetTime, setBanquetTime] = useState("19:00");
  const [banquetSetup, setBanquetSetup] = useState("Celebration / Party");
  const [banquetRequirements, setBanquetRequirements] = useState("");

  // Validation & Submission States
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Clear validation error when switching tabs
  const handleTabChange = (tab: "table" | "catering" | "banquet") => {
    setActiveTab(tab);
    setFormError("");
  };

  // Time format helper
  const formatTime12 = (t: string) => {
    if (!t) return "";
    const [hStr, mStr] = t.split(":");
    const h = parseInt(hStr, 10);
    const ampm = h >= 12 ? "pm" : "am";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${mStr} ${ampm}`;
  };

  // Dynamic live discount & celebration perk calculation for Table Booking
  const tableOfferPerk = useMemo(() => {
    if (!tableTime) return null;
    const [hStr, mStr] = tableTime.split(":");
    const mins = parseInt(hStr, 10) * 60 + parseInt(mStr || "0", 10);

    let discountText = "";
    if (mins >= 12 * 60 && mins < 16 * 60) {
      discountText = `Booking at ${formatTime12(tableTime)} — 10% off applies (afternoon discount).`;
    } else if (mins >= 16 * 60 && mins < 19 * 60) {
      discountText = `Booking at ${formatTime12(tableTime)} — 20% off applies (evening lull discount).`;
    } else if (mins >= 19 * 60 && mins < 21 * 60 + 30) {
      discountText = `Booking at ${formatTime12(tableTime)} — 5% off applies (dinner rush).`;
    } else if (mins >= 21 * 60 + 30 && mins < 23 * 60 + 30) {
      discountText = `Booking at ${formatTime12(tableTime)} — 30% off applies (late hours discount).`;
    }

    return discountText;
  }, [tableTime]);

  // Clean phone number helper
  const validatePhone = (num: string) => {
    const clean = num.replace(/\D/g, "");
    return clean.length >= 10;
  };

  // Validation logic specific to each tab
  const validateCurrentForm = (): boolean => {
    if (!name.trim()) {
      setFormError("Please enter your name.");
      return false;
    }
    if (!phone.trim() || !validatePhone(phone)) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (activeTab === "table") {
      if (!tableDate) {
        setFormError("Please select a reservation date.");
        return false;
      }
      if (!tableTime) {
        setFormError("Please select a reservation time.");
        return false;
      }
      if (!tableGuests || parseInt(tableGuests, 10) < 1) {
        setFormError("Please enter the number of guests.");
        return false;
      }
    } else if (activeTab === "catering") {
      if (!cateringDate) {
        setFormError("Please select the event date.");
        return false;
      }
      if (!cateringType) {
        setFormError("Please select the event type.");
        return false;
      }
      if (!cateringRequirement) {
        setFormError("Please specify what service you need (Catering / Food Boxes).");
        return false;
      }
      if (!cateringQuantity || parseInt(cateringQuantity, 10) < 1) {
        setFormError("Please enter the estimated number of guests or meal boxes.");
        return false;
      }
      if (!cateringLocation.trim()) {
        setFormError("Please enter the event or delivery location.");
        return false;
      }
    } else if (activeTab === "banquet") {
      if (!banquetDate) {
        setFormError("Please select the proposed banquet event date.");
        return false;
      }
      if (!banquetEventType) {
        setFormError("Please select the event type.");
        return false;
      }
      if (!banquetGuests || parseInt(banquetGuests, 10) < 1) {
        setFormError("Please enter the expected number of guests.");
        return false;
      }
    }

    setFormError("");
    return true;
  };

  // Dynamic WhatsApp Message generator per service
  const getWhatsAppMessage = (): string => {
    if (activeTab === "table") {
      let msg = `Hi Fursat,\n\nI would like to enquire about a table booking.\n\n`;
      msg += `Name: ${name.trim()}\n`;
      msg += `Phone: ${phone.trim()}\n`;
      msg += `Date: ${tableDate}\n`;
      msg += `Time: ${formatTime12(tableTime) || tableTime}\n`;
      msg += `Guests: ${tableGuests}\n`;
      msg += `Booking for: ${tableOccasion}\n`;
      if (tableNotes.trim()) {
        msg += `Additional requirements: ${tableNotes.trim()}\n`;
      }
      msg += `\nPlease confirm the availability.`;
      return msg;
    } else if (activeTab === "catering") {
      let msg = `Hi Fursat,\n\nI would like to enquire about catering / food boxes.\n\n`;
      msg += `Name: ${name.trim()}\n`;
      msg += `Phone: ${phone.trim()}\n`;
      msg += `Event date: ${cateringDate}\n`;
      msg += `Event type: ${cateringType}\n`;
      msg += `Requirement: ${cateringRequirement}\n`;
      msg += `Number of guests/boxes: ${cateringQuantity}\n`;
      msg += `Location: ${cateringLocation.trim()}\n`;
      if (cateringServiceTime) {
        msg += `Service time: ${formatTime12(cateringServiceTime) || cateringServiceTime}\n`;
      }
      if (cateringMenuReq.trim()) {
        msg += `Menu requirements: ${cateringMenuReq.trim()}\n`;
      }
      if (cateringNotes.trim()) {
        msg += `Additional requirements: ${cateringNotes.trim()}\n`;
      }
      msg += `\nPlease get back to me with the details.`;
      return msg;
    } else {
      // Banquet Hall
      let msg = `Hi Fursat,\n\nI would like to enquire about the Fursat Banquet Hall.\n\n`;
      msg += `Name: ${name.trim()}\n`;
      msg += `Phone: ${phone.trim()}\n`;
      if (email.trim()) {
        msg += `Email: ${email.trim()}\n`;
      }
      msg += `Event date: ${banquetDate}\n`;
      msg += `Event type: ${banquetEventType}\n`;
      msg += `Expected guests: ${banquetGuests}\n`;
      if (banquetTime) {
        msg += `Event time: ${formatTime12(banquetTime) || banquetTime}\n`;
      }
      msg += `Preferred setup: ${banquetSetup}\n`;
      if (banquetRequirements.trim()) {
        msg += `Additional requirements: ${banquetRequirements.trim()}\n`;
      }
      msg += `\nPlease get back to me regarding availability and details.`;
      return msg;
    }
  };

  // Dynamic Email Subject per service
  const getEmailSubject = (): string => {
    if (activeTab === "table") {
      return `Fursat Table Booking Enquiry - ${name.trim()}`;
    } else if (activeTab === "catering") {
      return `Fursat Catering & Food Box Enquiry - ${name.trim()}`;
    } else {
      return `Fursat Banquet Hall Enquiry - ${name.trim()}`;
    }
  };

  // Submission handler
  const handleSend = (channel: "whatsapp" | "email") => {
    if (!validateCurrentForm()) return;

    const summaryText = getWhatsAppMessage();

    if (channel === "whatsapp") {
      const url = `https://wa.me/919059670033?text=${encodeURIComponent(summaryText)}`;
      window.open(url, "_blank");
    } else {
      const subject = encodeURIComponent(getEmailSubject());
      const body = encodeURIComponent(summaryText);
      window.location.href = `mailto:hello@fursatkitchenbar.in?subject=${subject}&body=${body}`;
    }

    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#CF4B37", "#2E4E21", "#B9946B", "#ECDEC8"],
      });
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-fursat-black/75 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-fursat-sand-alt border border-fursat-hairline shadow-2xl p-5 sm:p-9 my-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 rounded-full bg-white border border-fursat-hairline text-fursat-charcoal hover:text-fursat-terracotta hover:border-fursat-terracotta flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* ================================================================= */
          /* SUCCESS SCREEN                                                    */
          /* ================================================================= */
          <div className="py-8 sm:py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-fursat-green/10 border border-fursat-green/30 flex items-center justify-center text-fursat-green mb-4 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-fursat-terracotta font-bold mb-1">
              Enquiry Pre-filled &amp; Dispatched
            </span>

            <h3 className="font-sans text-2xl sm:text-3xl text-fursat-green font-bold mb-2">
              Thank You, {name || "Esteemed Guest"}!
            </h3>

            <p className="font-sans text-xs sm:text-sm text-fursat-muted max-w-md mb-6 leading-relaxed">
              Your {activeTab === "table" ? "table reservation" : activeTab === "banquet" ? "banquet hall event" : "catering"} enquiry has been forwarded directly to our team at{" "}
              <strong className="text-fursat-charcoal font-semibold">090596 70033</strong>. We will review details and confirm with you shortly.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-primary px-8 py-3 rounded-full text-xs font-sans uppercase font-bold tracking-widest shadow-md"
            >
              Done / Return to Site
            </button>
          </div>
        ) : (
          /* ================================================================= */
          /* MAIN BOOKING / ENQUIRY MODAL                                      */
          /* ================================================================= */
          <div className="space-y-5 sm:space-y-6">
            
            {/* Top Brand Tag & Dynamic Heading */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-fursat-terracotta" />
                <span className="text-[12px] font-sans uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
                  Reserve at Fursat
                </span>
              </div>

              <h2 className="font-sans text-2xl sm:text-3xl text-fursat-green font-bold tracking-tight">
                {activeTab === "table" && "Tell us what you need the table for"}
                {activeTab === "catering" && "Tell us about your catering needs"}
                {activeTab === "banquet" && "Tell us about your event"}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-fursat-muted font-normal mt-0.5">
                {activeTab === "table" &&
                  "Fill this in and send it our way — we'll confirm the details personally over WhatsApp or email."}
                {activeTab === "catering" &&
                  "Share a few details about your event or food-box requirement and our team will get back to you."}
                {activeTab === "banquet" &&
                  "Share your event details and our team will help you plan your Fursat banquet experience."}
              </p>
            </div>

            {/* 3-Tab Segmented Control */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white border border-fursat-hairline shadow-inner">
              <button
                type="button"
                onClick={() => handleTabChange("table")}
                className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-sans uppercase font-bold tracking-wider transition-all text-center flex items-center justify-center gap-1.5 ${
                  activeTab === "table"
                    ? "bg-fursat-green text-white shadow-sm"
                    : "text-fursat-green border border-fursat-camel/60 hover:bg-fursat-sand/50"
                }`}
              >
                <span>Table Booking</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("catering")}
                className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-sans uppercase font-bold tracking-wider transition-all text-center flex items-center justify-center gap-1.5 ${
                  activeTab === "catering"
                    ? "bg-fursat-green text-white shadow-sm"
                    : "text-fursat-green border border-fursat-camel/60 hover:bg-fursat-sand/50"
                }`}
              >
                <span>Catering &amp; Box</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("banquet")}
                className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-sans uppercase font-bold tracking-wider transition-all text-center flex items-center justify-center gap-1.5 ${
                  activeTab === "banquet"
                    ? "bg-fursat-green text-white shadow-sm"
                    : "text-fursat-green border border-fursat-camel/60 hover:bg-fursat-sand/50"
                }`}
              >
                <span>Banquet Hall</span>
              </button>
            </div>

            {/* Form Fields Container with Smooth Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                {/* ========================================================= */}
                {/* FORM VARIANT 1: TABLE BOOKING                             */}
                {/* ========================================================= */}
                {activeTab === "table" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Your Name */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Phone Number (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={15}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={tableDate}
                        onChange={(e) => setTableDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner cursor-pointer"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={tableTime}
                        onChange={(e) => setTableTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner cursor-pointer"
                      />
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        required
                        placeholder="e.g. 4"
                        value={tableGuests}
                        onChange={(e) => setTableGuests(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      />
                    </div>

                    {/* Booking is for */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Booking is for
                      </label>
                      <select
                        value={tableOccasion}
                        onChange={(e) => setTableOccasion(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      >
                        <option value="Family lunch or dinner">Family lunch or dinner</option>
                        <option value="Date night">Date night</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Business / meeting">Business / meeting</option>
                        <option value="Casual dining">Casual dining</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Anything else we should know */}
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Anything else we should know?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Seating preference, dietary needs, occasion details..."
                        value={tableNotes}
                        onChange={(e) => setTableNotes(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Live Discount Strip Notice */}
                    {tableOfferPerk && (
                      <div className="sm:col-span-2 p-3 rounded-2xl bg-white border border-fursat-camel/40 flex items-center gap-2 text-xs font-sans text-fursat-charcoal">
                        <span className="text-base leading-none">⏰</span>
                        <span className="font-medium">{tableOfferPerk}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================= */}
                {/* FORM VARIANT 2: CATERING & FOOD BOX SERVICE               */}
                {/* ========================================================= */}
                {activeTab === "catering" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Your Name */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Phone Number (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={15}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Event Date */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={cateringDate}
                        onChange={(e) => setCateringDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner cursor-pointer"
                      />
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Event Type *
                      </label>
                      <select
                        value={cateringType}
                        onChange={(e) => setCateringType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      >
                        <option value="Corporate">Corporate</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Family function">Family function</option>
                        <option value="Wedding / engagement">Wedding / engagement</option>
                        <option value="Party">Party</option>
                        <option value="Get-together">Get-together</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* What Do You Need */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        What Do You Need? *
                      </label>
                      <select
                        value={cateringRequirement}
                        onChange={(e) => setCateringRequirement(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      >
                        <option value="Event Catering">Event Catering</option>
                        <option value="Food Boxes">Food Boxes</option>
                        <option value="Both">Both (Catering &amp; Food Boxes)</option>
                      </select>
                    </div>

                    {/* Number of Guests / Boxes */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Number of Guests / Boxes *
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder="e.g. 25"
                        value={cateringQuantity}
                        onChange={(e) => setCateringQuantity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      />
                    </div>

                    {/* Event / Delivery Location */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Event / Delivery Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Area / locality / venue address"
                        value={cateringLocation}
                        onChange={(e) => setCateringLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Preferred Service Time */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Preferred Service Time
                      </label>
                      <input
                        type="time"
                        value={cateringServiceTime}
                        onChange={(e) => setCateringServiceTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner cursor-pointer"
                      />
                    </div>

                    {/* Menu / Food Requirements */}
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Menu / Food Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your preferred menu, vegetarian/non-vegetarian requirements, food-box requirements, etc."
                        value={cateringMenuReq}
                        onChange={(e) => setCateringMenuReq(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Anything else */}
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Anything else we should know?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Additional requirements or special instructions..."
                        value={cateringNotes}
                        onChange={(e) => setCateringNotes(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* FORM VARIANT 3: BANQUET HALL EVENT ENQUIRY               */}
                {/* ========================================================= */}
                {activeTab === "banquet" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Your Name */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Phone Number (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={15}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>

                    {/* Event Date */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={banquetDate}
                        onChange={(e) => setBanquetDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner cursor-pointer"
                      />
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Event Type *
                      </label>
                      <select
                        value={banquetEventType}
                        onChange={(e) => setBanquetEventType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      >
                        <option value="Birthday">Birthday</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Corporate event">Corporate event</option>
                        <option value="Kitty party">Kitty party</option>
                        <option value="Baby shower">Baby shower</option>
                        <option value="Family function">Family function</option>
                        <option value="Get-together">Get-together</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Expected Number of Guests */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Expected Number of Guests *
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="250"
                        required
                        placeholder="e.g. 50 (Capacity 150+)"
                        value={banquetGuests}
                        onChange={(e) => setBanquetGuests(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      />
                    </div>

                    {/* Preferred Event Time */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Preferred Event Time
                      </label>
                      <input
                        type="time"
                        value={banquetTime}
                        onChange={(e) => setBanquetTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner cursor-pointer"
                      />
                    </div>

                    {/* Preferred Setup */}
                    <div>
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Preferred Setup
                      </label>
                      <select
                        value={banquetSetup}
                        onChange={(e) => setBanquetSetup(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                      >
                        <option value="Celebration / Party">Celebration / Party</option>
                        <option value="Stage / Presentation">Stage / Presentation</option>
                        <option value="U-Shape">U-Shape</option>
                        <option value="Theatre Style">Theatre Style</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>

                    {/* Additional Requirements */}
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-sans uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                        Additional Requirements
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your event, seating requirements, decoration, food requirements, or anything else we should know..."
                        value={banquetRequirements}
                        onChange={(e) => setBanquetRequirements(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-fursat-hairline text-fursat-charcoal text-xs focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Error Message if validation fails */}
            {formError && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-xs font-sans text-rose-800 flex items-center gap-2 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleSend("whatsapp")}
                className="btn-primary py-3.5 rounded-full text-xs font-sans uppercase font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleSend("email")}
                className="btn-secondary py-3.5 rounded-full text-xs font-sans uppercase font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-fursat-green" />
                <span>Send via Email</span>
              </button>
            </div>

            {/* Footer Help text with direct phone */}
            <p className="font-sans text-xs text-fursat-muted text-center leading-relaxed">
              This opens WhatsApp or your email app with the details pre-filled — nothing is booked automatically until our team at{" "}
              <a href="tel:+919059670033" className="text-fursat-terracotta font-semibold hover:underline">
                090596 70033
              </a>{" "}
              confirms.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}
