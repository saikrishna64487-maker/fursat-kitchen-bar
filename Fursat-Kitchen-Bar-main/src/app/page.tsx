"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveOfferStrip from "@/components/LiveOfferStrip";
import Introduction from "@/components/Introduction";
import RestaurantReveal from "@/components/RestaurantReveal";
import FoodExperience from "@/components/FoodExperience";
import SignatureTransition from "@/components/SignatureTransition";
import BarExperience from "@/components/BarExperience";
import EventsSection from "@/components/EventsSection";
import CateringSection from "@/components/CateringSection";
import MomentsSection from "@/components/MomentsSection";
import GallerySection from "@/components/GallerySection";
import AtmosphereMood from "@/components/AtmosphereMood";
import LocationExperience from "@/components/LocationExperience";
import ReservationSection from "@/components/ReservationSection";
import ReservationModal from "@/components/ReservationModal";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";

export default function Home() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationModalType, setReservationModalType] = useState<"table" | "catering" | "banquet">("table");

  const openReservation = (type: "table" | "catering" | "banquet" = "table") => {
    setReservationModalType(type);
    setIsReservationModalOpen(true);
  };

  // Scroll behavior is handled via smooth native CSS in globals.css
  useEffect(() => {
    // Scroll restoration and smooth setup
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Main App Layout */}
      <main className="relative bg-fursat-cream text-fursat-espresso min-h-screen overflow-x-hidden selection:bg-fursat-gold/30 selection:text-fursat-espresso">
        {/* Floating Glassmorphic Navigation */}
        <Navbar onOpenReservation={() => openReservation("table")} />

        {/* 01 — FULL-SCREEN BRAND INTRODUCTION & ANIMATED LOGO REVEAL */}
        <Hero onOpenReservation={() => openReservation("table")} />

        {/* 02 — LIVE DISCOUNT STRIP & RATINGS PROOF */}
        <LiveOfferStrip />

        {/* 03 — INTRODUCTION & 3 PILLARS */}
        <Introduction />

        {/* 04 — RESTAURANT REVEAL */}
        <RestaurantReveal />

        {/* 05 — THE KITCHEN MENU & DIRECT WHATSAPP/EMAIL BASKET */}
        <FoodExperience />

        {/* 06 — SIGNATURE PORTAL TRANSITION */}
        <SignatureTransition />

        {/* 07 — AFTER DARK / THE BAR */}
        <BarExperience />

        {/* 08 — BANQUET HALL ON-SITE */}
        <EventsSection />

        {/* 09 — CATERING & FOOD BOX SERVICE */}
        <CateringSection />

        {/* 10 — MOMENTS AT FURSAT */}
        <MomentsSection />

        {/* 11 — AUTHENTIC MADHAPUR GALLERY */}
        <GallerySection />

        {/* 12 — ATMOSPHERE MOOD */}
        <AtmosphereMood />

        {/* 13 — LOCATION & DIRECTIONS */}
        <LocationExperience />

        {/* 14 — RESERVATION CALL TO ACTION */}
        <ReservationSection onOpenReservation={() => openReservation("table")} />

        {/* 15 — FOOTER */}
        <Footer onOpenReservation={() => openReservation("table")} />

        {/* 3-in-1 Interactive Reservation Modal Wizard */}
        <ReservationModal
          isOpen={isReservationModalOpen}
          initialType={reservationModalType}
          onClose={() => setIsReservationModalOpen(false)}
        />
      </main>
    </>
  );
}
