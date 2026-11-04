"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Sprout,
  UtensilsCrossed,
  CalendarDays,
  Phone,
  CalendarCheck,
  Building2,
  ChefHat,
  ChevronRight,
  ChevronDown,
  Users,
  Utensils,
  Star,
  Calendar,
} from "lucide-react";

interface HeroProps {
  onOpenReservation?: () => void;
}

// Elegant 4-Point Star / Diamond Sparkle Accent
const FourPointStar = ({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block select-none pointer-events-none ${className}`}
  >
    <path d="M12 0 C12.6 6 18 11.4 24 12 C18 12.6 12.6 18 12 24 C11.4 18 6 12.6 0 12 C6 11.4 11.4 6 12 0 Z" />
  </svg>
);

export default function Hero({ onOpenReservation }: HeroProps) {
  const [animationSettled, setAnimationSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationSettled(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (action: string) => {
    if (action === "reserve") {
      if (onOpenReservation) {
        onOpenReservation();
      } else {
        const el = document.getElementById("book") || document.getElementById("reserve");
        el?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (action === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (action === "menu") {
      const el = document.getElementById("menu");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/menu";
      }
      return;
    }

    if (action === "banquet") {
      const el = document.getElementById("banquet") || document.getElementById("events");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (action === "catering") {
      const el = document.getElementById("catering");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const el = document.getElementById(action);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNext = () => {
    const el =
      document.getElementById("offers") ||
      document.getElementById("experience") ||
      document.getElementById("introduction");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Row 1 Navigation Cards
  const navRow1 = [
    {
      id: "hero",
      title: "HOME",
      subtitle: "The Fursat experience",
      icon: <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 0.75,
    },
    {
      id: "experience",
      title: "ABOUT",
      subtitle: "Our story",
      icon: <Sprout className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 0.82,
    },
    {
      id: "menu",
      title: "MENU",
      subtitle: "Explore the menu",
      icon: <UtensilsCrossed className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 0.89,
    },
    {
      id: "banquet",
      title: "EVENTS",
      subtitle: "Celebrate with us",
      icon: <CalendarDays className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 0.96,
    },
  ];

  // Row 2 Navigation Cards
  const navRow2 = [
    {
      id: "location",
      title: "CONTACT",
      subtitle: "Get in touch",
      icon: <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 1.03,
    },
    {
      id: "reserve",
      title: "BOOK A TABLE",
      subtitle: "Reserve your table",
      icon: <CalendarCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 1.1,
    },
    {
      id: "banquet",
      title: "BOOK BANQUET HALL",
      subtitle: "Host your celebration",
      icon: <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 1.17,
    },
    {
      id: "catering",
      title: "CATERING",
      subtitle: "Bring Fursat to your event",
      icon: <ChefHat className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />,
      delay: 1.24,
    },
  ];

  // Configurable Statistics Data
  const statsData = [
    {
      icon: <Users className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#CF4B37]" />,
      value: "10K+",
      label: "HAPPY GUESTS",
    },
    {
      icon: <Utensils className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#CF4B37]" />,
      value: "120+",
      label: "SIGNATURE DISHES",
    },
    {
      icon: <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#CF4B37]" />,
      value: "500+",
      label: "EVENTS HOSTED",
    },
    {
      icon: <Star className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#CF4B37]" />,
      value: "4.8",
      label: "GOOGLE RATING",
    },
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center bg-[#ECDEC8] overflow-hidden px-3 sm:px-6 lg:px-10 2xl:px-16 select-none"
      style={{
        background:
          "radial-gradient(ellipse 85% 75% at 50% 40%, #FFFDF9 0%, #ECDEC8 65%, #E5D5C1 100%)",
      }}
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND WARM AMBIENT GLOW & CELESTIAL ELEMENTS                      */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.0, ease: "easeOut" }}
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[840px] lg:w-[1020px] h-[340px] sm:h-[600px] md:h-[840px] lg:h-[1020px] bg-gradient-to-b from-fursat-camel/20 via-fursat-sand-alt/30 to-transparent rounded-full blur-[80px] sm:blur-[130px] pointer-events-none z-0"
      />

      {/* Floating subtle gold motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { x: "15%", y: "20%", delay: 0.2, dur: 7.5, size: 2 },
          { x: "85%", y: "22%", delay: 0.7, dur: 8.5, size: 2.5 },
          { x: "24%", y: "75%", delay: 1.1, dur: 6.8, size: 1.8 },
          { x: "78%", y: "70%", delay: 0.5, dur: 7.9, size: 2.2 },
          { x: "50%", y: "12%", delay: 1.4, dur: 8.2, size: 2 },
        ].map((pt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: [0, 0.35, 0.12, 0],
              y: [15, -25, -50],
              x: [0, idx % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{
              duration: pt.dur,
              delay: pt.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: pt.x,
              top: pt.y,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
            }}
            className="absolute rounded-full bg-fursat-camel/60 shadow-[0_0_6px_#B9946B]"
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 2. OVERHEAD ARCH & LARGE CIRCULAR LOGO FRAMING (AS IN REFERENCE)          */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        {/* Sweeping top framing arch across the composition */}
        <svg
          className="absolute top-0 w-full h-[380px] lg:h-[480px] opacity-40 xl:opacity-50"
          viewBox="0 0 1600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Arched Ribbon spanning left to right */}
          <path
            d="M 50 480 C 250 80, 1350 80, 1550 480"
            stroke="#B9946B"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M 120 480 C 300 130, 1300 130, 1480 480"
            stroke="#B9946B"
            strokeWidth="0.8"
          />

          {/* Compass star at apex */}
          <g transform="translate(800, 75)">
            <line x1="0" y1="-25" x2="0" y2="25" stroke="#B9946B" strokeWidth="1" />
            <line x1="-25" y1="0" x2="25" y2="0" stroke="#B9946B" strokeWidth="1" />
            <circle cx="0" cy="0" r="3" fill="#B9946B" />
          </g>
        </svg>

        {/* Large Concentric Circles around Central Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
          className="absolute top-[8%] sm:top-[6%] lg:top-[5%] w-[320px] sm:w-[460px] md:w-[560px] lg:w-[640px] xl:w-[700px] h-[320px] sm:h-[460px] md:h-[560px] lg:h-[640px] xl:h-[700px] rounded-full border border-fursat-camel/25 pointer-events-none flex items-center justify-center shadow-[inset_0_0_50px_rgba(185,148,107,0.06)]"
        >
          {/* Inner concentric ring */}
          <div className="w-[86%] h-[86%] rounded-full border border-fursat-camel/15 pointer-events-none" />
          <div className="w-[72%] h-[72%] rounded-full border border-fursat-camel/10 pointer-events-none" />

          {/* 4-point star at 12 o'clock */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-fursat-camel">
            <FourPointStar size={20} />
          </div>

          {/* 4-point star at 6 o'clock */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-fursat-camel/60">
            <FourPointStar size={16} />
          </div>

          {/* 4-point stars on side quadrants */}
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 text-fursat-camel/50">
            <FourPointStar size={16} />
          </div>
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 text-fursat-camel/50">
            <FourPointStar size={16} />
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LEFT ARCH PANEL & BOTANICAL ARTWORK (EXACT REFERENCE RECREATION)        */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex absolute left-2 sm:left-4 lg:left-8 xl:left-12 2xl:left-16 top-1/2 -translate-y-[58%] z-0 pointer-events-none items-center"
      >
        {/* Left Vertical Arch Window with Warm Sepia Botanical Scene */}
        <div className="relative w-[110px] lg:w-[150px] xl:w-[180px] 2xl:w-[210px] h-[260px] lg:h-[350px] xl:h-[410px] 2xl:h-[460px] rounded-t-full rounded-b-2xl border border-fursat-camel/50 overflow-hidden shadow-lg bg-fursat-sand-alt/30">
          {/* Sepia Silhouette of Lush Tropical Restaurant Ambience */}
          <div
            className="absolute inset-0 bg-cover bg-center filter sepia contrast-[1.15] brightness-[0.88] opacity-60 mix-blend-multiply"
            style={{
              backgroundImage: "url('/assets/main-dining-hall-D1OfpEb6.jpeg')",
            }}
          />
          {/* Warm Sand Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-fursat-sand via-transparent to-fursat-sand-alt/30" />
          <div className="absolute inset-0 border border-fursat-camel/30 rounded-t-full rounded-b-2xl m-1 pointer-events-none" />
        </div>

        {/* Camel Tan Line-Art Botanical Stems & Leaves Framing Left Arch */}
        <svg
          className="absolute -left-6 -bottom-10 w-[180px] lg:w-[230px] xl:w-[270px] 2xl:w-[310px] h-[340px] lg:h-[440px] xl:h-[500px] 2xl:h-[560px] overflow-visible pointer-events-none opacity-85"
          viewBox="0 0 300 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main sweeping stem curling inward */}
          <path
            d="M 10 490 C 40 400, 130 320, 110 180 C 95 80, 160 30, 210 10"
            stroke="#B9946B"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Major Botanical Leaves */}
          <path
            d="M 110 330 C 180 300, 240 240, 220 150 C 170 170, 135 230, 110 330 Z"
            stroke="#B9946B"
            strokeWidth="1.3"
            fill="#B9946B"
            fillOpacity="0.12"
          />
          <path d="M 110 330 C 160 260, 195 200, 220 150" stroke="#B9946B" strokeWidth="0.8" />
          <path d="M 150 270 C 175 255, 195 260, 205 248" stroke="#B9946B" strokeWidth="0.6" />
          <path d="M 175 220 C 195 210, 210 215, 215 205" stroke="#B9946B" strokeWidth="0.6" />

          {/* Leaf 2 (Upper Left Arch) */}
          <path
            d="M 80 220 C 140 180, 190 120, 165 40 C 120 65, 95 130, 80 220 Z"
            stroke="#B9946B"
            strokeWidth="1.2"
            fill="#B9946B"
            fillOpacity="0.10"
          />
          <path d="M 80 220 C 120 150, 145 90, 165 40" stroke="#B9946B" strokeWidth="0.7" />

          {/* Leaf 3 (Top Delicate Accent) */}
          <path
            d="M 120 100 C 170 70, 220 40, 210 0 C 170 15, 140 50, 120 100 Z"
            stroke="#B9946B"
            strokeWidth="1.1"
            fill="#B9946B"
            fillOpacity="0.12"
          />

          {/* Lower Base Leaves */}
          <path
            d="M 30 460 C 100 440, 150 390, 140 330 C 95 345, 60 400, 30 460 Z"
            stroke="#B9946B"
            strokeWidth="1.2"
            fill="#B9946B"
            fillOpacity="0.10"
          />
        </svg>

        {/* Celestial Star Accents around Left Arch */}
        <div className="absolute -top-8 left-1/4 text-fursat-camel/60">
          <FourPointStar size={22} />
        </div>
        <div className="absolute top-[38%] -left-6 text-fursat-camel/50">
          <FourPointStar size={16} />
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. RIGHT ARCH PANEL & LANTERN ARTWORK (EXACT REFERENCE RECREATION)        */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex absolute right-2 sm:right-4 lg:right-8 xl:right-12 2xl:right-16 top-1/2 -translate-y-[58%] z-0 pointer-events-none items-center justify-end"
      >
        {/* Right Vertical Arch Window with Warm Sepia Scene & Hanging Lantern */}
        <div className="relative w-[110px] lg:w-[150px] xl:w-[180px] 2xl:w-[210px] h-[260px] lg:h-[350px] xl:h-[410px] 2xl:h-[460px] rounded-t-full rounded-b-2xl border border-fursat-camel/50 overflow-hidden shadow-lg bg-fursat-sand-alt/30">
          {/* Sepia Silhouette of Restaurant Lounge & Foliage */}
          <div
            className="absolute inset-0 bg-cover bg-center filter sepia contrast-[1.15] brightness-[0.88] opacity-60 mix-blend-multiply"
            style={{
              backgroundImage: "url('/assets/kitchen-bar-lounge-seating-DXKtkFu9.jpeg')",
            }}
          />
          {/* Glowing Vintage Restaurant Lantern in Arch Window */}
          <div className="absolute top-[32%] left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Chain */}
            <div className="w-[1px] h-10 bg-fursat-camel" />
            {/* Lantern Body */}
            <div className="relative w-8 h-12 rounded-sm border border-fursat-camel bg-white/90 shadow-[0_0_24px_rgba(207,75,55,0.4)] flex items-center justify-center">
              <div className="w-2.5 h-5 bg-fursat-terracotta/70 rounded-full blur-[1px]" />
              <div className="absolute inset-0 border-t-2 border-b-2 border-fursat-camel" />
            </div>
          </div>
          {/* Warm Sand Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-fursat-sand via-transparent to-fursat-sand-alt/30" />
          <div className="absolute inset-0 border border-fursat-camel/30 rounded-t-full rounded-b-2xl m-1 pointer-events-none" />
        </div>

        {/* Camel Tan Line-Art Botanical Stems & Leaves Framing Right Arch */}
        <svg
          className="absolute -right-6 -bottom-10 w-[180px] lg:w-[230px] xl:w-[270px] 2xl:w-[310px] h-[340px] lg:h-[440px] xl:h-[500px] 2xl:h-[560px] overflow-visible pointer-events-none opacity-85"
          viewBox="0 0 300 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main sweeping stem curling inward towards center */}
          <path
            d="M 290 490 C 260 400, 170 320, 190 180 C 205 80, 140 30, 90 10"
            stroke="#B9946B"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Major Botanical Leaves */}
          <path
            d="M 190 330 C 120 300, 60 240, 80 150 C 130 170, 165 230, 190 330 Z"
            stroke="#B9946B"
            strokeWidth="1.3"
            fill="#B9946B"
            fillOpacity="0.12"
          />
          <path d="M 190 330 C 140 260, 105 200, 80 150" stroke="#B9946B" strokeWidth="0.8" />
          <path d="M 150 270 C 125 255, 105 260, 95 248" stroke="#B9946B" strokeWidth="0.6" />
          <path d="M 125 220 C 105 210, 90 215, 85 205" stroke="#B9946B" strokeWidth="0.6" />

          {/* Leaf 2 (Upper Right Arch) */}
          <path
            d="M 220 220 C 160 180, 110 120, 135 40 C 180 65, 205 130, 220 220 Z"
            stroke="#B9946B"
            strokeWidth="1.2"
            fill="#B9946B"
            fillOpacity="0.10"
          />
          <path d="M 220 220 C 180 150, 155 90, 135 40" stroke="#B9946B" strokeWidth="0.7" />

          {/* Leaf 3 (Top Delicate Accent) */}
          <path
            d="M 180 100 C 130 70, 80 40, 90 0 C 130 15, 160 50, 180 100 Z"
            stroke="#B9946B"
            strokeWidth="1.1"
            fill="#B9946B"
            fillOpacity="0.12"
          />

          {/* Lower Base Leaves */}
          <path
            d="M 270 460 C 200 440, 150 390, 160 330 C 205 345, 240 400, 270 460 Z"
            stroke="#B9946B"
            strokeWidth="1.2"
            fill="#B9946B"
            fillOpacity="0.10"
          />
        </svg>

        {/* Celestial Star Accents around Right Arch */}
        <div className="absolute -top-8 right-1/4 text-fursat-camel/60">
          <FourPointStar size={24} />
        </div>
        <div className="absolute top-[38%] -right-6 text-fursat-camel/50">
          <FourPointStar size={16} />
        </div>
      </motion.div>

      {/* Top Spacer to position content gracefully */}
      <div className="w-full h-4 sm:h-6 lg:h-8" />

      {/* ========================================================================= */}
      {/* 5. MAIN VERTICAL HERO COMPOSITION (PROMINENT CENTERED LOGO FIRST)         */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1360px] 2xl:max-w-[1480px] mx-auto my-auto flex flex-col items-center justify-center text-center px-2">
        
        {/* ======================================================================= */}
        {/* OFFICIAL FURSAT LOGO & BRANDING GROUP                                    */}
        {/* ======================================================================= */}
        <div className="flex flex-col items-center justify-center mb-5 sm:mb-6 lg:mb-7">
          
          {/* Authentic Elephant Emblem (Large & Heroic) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center mb-2.5 sm:mb-3.5 z-10"
          >
            <motion.div
              animate={
                animationSettled
                  ? {
                      y: [0, -3, 0],
                      transition: {
                        duration: 5.0,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
                  : {
                      scale: [0.94, 1, 1.02, 0.99, 1],
                      y: [0, -2, 1, 0],
                      transition: {
                        duration: 2.2,
                        delay: 0.7,
                        ease: "easeInOut",
                      },
                    }
              }
              className="relative w-20 h-28 sm:w-28 sm:h-38 md:w-34 md:h-44 lg:w-40 lg:h-52 xl:w-44 xl:h-56 flex-shrink-0"
            >
              <img
                src="/assets/logo-DB0x_8ZX.png"
                alt="Fursat official elephant emblem"
                className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(208,82,56,0.2)]"
              />
            </motion.div>
          </motion.div>

          {/* Official Brand Logotype SVG (FURSAT + KITCHEN | BAR) */}
          <div className="relative w-full max-w-[240px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[480px] flex flex-col items-center z-10">
            <svg
              viewBox="0 0 810 292"
              className="w-full h-auto drop-shadow-[0_4px_16px_rgba(46,78,33,0.06)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* FURSAT Wordmark in Official Forest Green (#2E4E21) */}
              <motion.path
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                fill="#2E4E21"
                d="M 35.0 31.5 L 138.5 32.0 L 138.0 61.5 L 136.5 59.0 L 127.0 49.5 L 117.0 43.5 L 115.0 43.5 L 112.0 41.5 L 107.0 40.5 L 106.0 39.5 L 103.0 39.5 L 102.0 38.5 L 97.0 38.5 L 96.0 37.5 L 84.0 37.5 L 78.0 40.5 L 75.5 44.0 L 75.5 46.0 L 74.5 47.0 L 74.5 92.0 L 76.5 96.0 L 80.0 99.5 L 82.0 100.5 L 89.0 100.5 L 90.0 99.5 L 97.0 97.5 L 106.5 89.0 L 110.5 82.0 L 110.5 80.0 L 112.0 78.5 L 116.5 79.0 L 116.0 130.5 L 112.0 130.5 L 110.5 128.0 L 110.5 126.0 L 106.5 119.0 L 99.0 111.5 L 93.0 108.5 L 87.0 107.5 L 86.0 106.5 L 85.0 107.5 L 82.0 107.5 L 75.5 113.0 L 75.5 115.0 L 74.5 116.0 L 74.5 153.0 L 75.5 154.0 L 75.5 160.0 L 76.5 161.0 L 76.5 164.0 L 77.5 165.0 L 79.5 173.0 L 81.5 176.0 L 81.0 178.5 L 34.5 178.0 L 36.5 175.0 L 36.5 173.0 L 39.5 167.0 L 40.5 159.0 L 41.5 158.0 L 41.5 149.0 L 42.5 148.0 L 42.5 63.0 L 41.5 62.0 L 41.5 52.0 L 40.5 51.0 L 40.5 47.0 L 39.5 46.0 L 37.5 38.0 L 34.5 33.0 L 35.0 31.5 Z M 157.0 31.5 L 182.5 32.0 L 182.5 133.0 L 183.5 134.0 L 183.5 137.0 L 184.5 138.0 L 185.5 143.0 L 188.5 148.0 L 198.0 157.5 L 208.0 162.5 L 211.0 162.5 L 212.0 163.5 L 217.0 163.5 L 218.0 164.5 L 228.0 164.5 L 229.0 163.5 L 237.0 162.5 L 240.0 160.5 L 242.0 160.5 L 247.0 156.5 L 248.0 156.5 L 256.5 147.0 L 258.5 143.0 L 259.5 138.0 L 260.5 137.0 L 260.5 133.0 L 261.5 132.0 L 261.5 95.0 L 260.5 94.0 L 259.5 86.0 L 254.5 76.0 L 245.0 65.5 L 244.0 65.5 L 241.0 62.5 L 233.0 58.5 L 227.5 57.0 L 227.5 32.0 L 265.5 32.0 L 265.5 137.0 L 264.5 138.0 L 263.5 149.0 L 258.5 160.0 L 255.5 163.0 L 255.5 164.0 L 248.0 170.5 L 240.0 174.5 L 235.0 175.5 L 234.0 176.5 L 230.0 176.5 L 229.0 177.5 L 223.0 177.5 L 222.0 178.5 L 201.0 178.5 L 200.0 177.5 L 196.0 177.5 L 195.0 176.5 L 191.0 176.5 L 179.0 171.5 L 177.0 169.5 L 174.0 168.5 L 164.5 159.0 L 164.5 158.0 L 162.5 156.0 L 158.5 148.0 L 158.5 145.0 L 157.5 144.0 L 157.5 141.0 L 156.5 140.0 L 157.0 31.5 Z M 276.0 31.5 L 364.0 31.5 L 365.0 32.5 L 373.0 32.5 L 374.0 33.5 L 377.0 33.5 L 378.0 34.5 L 381.0 34.5 L 392.0 40.5 L 399.5 48.0 L 403.5 55.0 L 404.5 60.0 L 405.5 61.0 L 405.5 68.0 L 406.5 69.0 L 406.5 73.0 L 405.5 74.0 L 405.5 81.0 L 404.5 82.0 L 404.5 85.0 L 399.5 95.0 L 393.0 101.5 L 387.0 104.5 L 385.0 106.5 L 383.0 106.5 L 380.0 108.5 L 377.0 108.5 L 376.0 109.5 L 372.5 110.0 L 373.5 112.0 L 373.5 116.0 L 374.5 117.0 L 374.5 128.0 L 375.5 129.0 L 375.5 133.0 L 376.5 134.0 L 377.5 139.0 L 380.5 143.0 L 381.5 146.0 L 386.5 151.0 L 386.5 152.0 L 388.0 152.5 L 392.0 156.5 L 399.0 160.5 L 405.0 161.5 L 406.0 162.5 L 417.0 162.5 L 418.0 161.5 L 421.0 161.5 L 422.0 160.5 L 433.0 157.5 L 434.0 156.5 L 437.0 156.5 L 438.0 155.5 L 454.0 155.5 L 455.0 156.5 L 460.0 157.5 L 466.0 160.5 L 473.5 168.0 L 475.5 172.0 L 477.5 174.0 L 479.5 179.0 L 476.0 179.5 L 471.0 175.5 L 469.0 178.5 L 465.0 179.5 L 463.5 177.0 L 463.5 175.0 L 459.0 170.5 L 457.0 169.5 L 453.0 169.5 L 432.0 179.5 L 427.0 180.5 L 426.0 181.5 L 423.0 181.5 L 422.0 182.5 L 417.0 182.5 L 416.0 183.5 L 400.0 183.5 L 399.0 182.5 L 394.0 182.5 L 393.0 181.5 L 390.0 181.5 L 389.0 180.5 L 384.0 179.5 L 368.0 170.5 L 355.5 159.0 L 352.5 154.0 L 349.5 151.0 L 348.5 148.0 L 343.5 141.0 L 341.5 136.0 L 339.5 134.0 L 337.5 129.0 L 332.5 122.0 L 328.5 114.0 L 325.0 110.5 L 319.0 113.5 L 315.5 119.0 L 315.5 155.0 L 316.5 156.0 L 316.5 160.0 L 317.5 161.0 L 317.5 165.0 L 318.5 166.0 L 319.5 171.0 L 321.5 174.0 L 322.5 178.0 L 276.0 178.5 L 275.5 177.0 L 278.5 172.0 L 279.5 167.0 L 281.5 163.0 L 281.5 158.0 L 282.5 157.0 L 282.5 53.0 L 281.5 52.0 L 281.5 48.0 L 279.5 44.0 L 279.5 41.0 L 275.5 33.0 L 276.0 31.5 Z M 457.0 31.5 L 466.0 31.5 L 467.0 32.5 L 480.0 32.5 L 481.0 33.5 L 490.0 33.5 L 491.0 34.5 L 508.5 35.0 L 508.0 65.5 L 493.0 65.5 L 491.5 64.0 L 490.5 58.0 L 486.5 50.0 L 477.0 40.5 L 469.0 36.5 L 466.0 36.5 L 465.0 35.5 L 454.0 35.5 L 453.0 36.5 L 448.0 37.5 L 443.0 40.5 L 438.5 47.0 L 438.5 56.0 L 440.5 60.0 L 446.0 65.5 L 454.0 69.5 L 462.0 71.5 L 465.0 73.5 L 470.0 74.5 L 478.0 78.5 L 480.0 78.5 L 496.0 86.5 L 502.0 91.5 L 503.0 91.5 L 506.5 95.0 L 508.5 99.0 L 510.5 101.0 L 511.5 105.0 L 512.5 106.0 L 513.5 115.0 L 512.5 116.0 L 512.5 120.0 L 509.5 126.0 L 499.0 135.5 L 495.0 136.5 L 487.0 140.5 L 479.0 141.5 L 478.0 142.5 L 454.0 142.5 L 453.0 141.5 L 448.0 141.5 L 447.0 140.5 L 443.0 140.5 L 442.0 139.5 L 437.0 138.5 L 434.0 136.5 L 432.0 136.5 L 426.0 133.5 L 421.5 130.0 L 422.0 108.5 L 437.0 108.5 L 437.5 113.0 L 438.5 114.0 L 439.5 119.0 L 445.5 129.0 L 452.0 134.5 L 459.0 137.5 L 462.0 137.5 L 463.0 138.5 L 472.0 138.5 L 473.0 137.5 L 477.0 137.5 L 484.0 134.5 L 489.5 129.0 L 490.5 127.0 L 490.5 125.0 L 491.5 124.0 L 491.5 120.0 L 490.5 119.0 L 489.5 114.0 L 482.0 105.5 L 470.0 98.5 L 468.0 98.5 L 462.0 95.5 L 460.0 95.5 L 457.0 93.5 L 452.0 92.5 L 435.0 84.5 L 431.0 80.5 L 429.5 80.0 L 429.5 79.0 L 425.5 75.0 L 422.5 69.0 L 422.5 66.0 L 421.5 65.0 L 421.5 55.0 L 422.5 54.0 L 422.5 51.0 L 424.5 47.0 L 432.0 39.5 L 437.0 36.5 L 439.0 36.5 L 445.0 33.5 L 448.0 33.5 L 449.0 32.5 L 456.0 32.5 L 457.0 31.5 Z M 559.0 31.5 L 592.0 31.5 L 593.5 33.0 L 593.5 35.0 L 594.5 36.0 L 595.5 41.0 L 597.5 44.0 L 597.5 46.0 L 598.5 47.0 L 601.5 58.0 L 602.5 59.0 L 602.5 61.0 L 603.5 62.0 L 606.5 73.0 L 607.5 74.0 L 607.5 76.0 L 609.5 79.0 L 609.5 81.0 L 610.5 82.0 L 613.5 93.0 L 614.5 94.0 L 614.5 96.0 L 615.5 97.0 L 615.5 99.0 L 616.5 100.0 L 619.5 111.0 L 620.5 112.0 L 620.5 114.0 L 622.5 117.0 L 622.5 119.0 L 623.5 120.0 L 626.5 131.0 L 627.5 132.0 L 627.5 134.0 L 628.5 135.0 L 631.5 146.0 L 632.5 147.0 L 632.5 149.0 L 634.5 152.0 L 636.5 159.0 L 639.5 164.0 L 639.5 166.0 L 642.5 172.0 L 644.5 174.0 L 646.5 178.0 L 646.0 178.5 L 598.5 178.0 L 599.5 172.0 L 600.5 171.0 L 600.5 156.0 L 599.5 155.0 L 599.5 152.0 L 598.5 151.0 L 598.5 148.0 L 597.5 147.0 L 594.5 136.0 L 593.5 135.0 L 589.5 121.0 L 587.5 118.0 L 583.5 104.0 L 581.5 101.0 L 581.5 99.0 L 580.5 98.0 L 577.5 87.0 L 576.5 86.0 L 576.5 84.0 L 574.5 81.0 L 572.5 73.0 L 571.5 71.0 L 565.0 65.5 L 559.0 65.5 L 552.5 71.0 L 551.5 76.0 L 548.5 82.0 L 546.5 93.0 L 545.5 94.0 L 545.5 99.0 L 544.5 100.0 L 544.5 111.0 L 543.5 112.0 L 543.5 120.0 L 544.5 121.0 L 544.5 133.0 L 545.5 134.0 L 545.5 139.0 L 546.5 140.0 L 547.5 148.0 L 548.5 149.0 L 550.5 157.0 L 555.5 167.0 L 559.5 172.0 L 559.5 173.0 L 564.5 178.0 L 506.5 178.0 L 509.5 174.0 L 512.5 167.0 L 514.5 165.0 L 514.5 163.0 L 517.5 158.0 L 518.5 153.0 L 520.5 150.0 L 520.5 148.0 L 521.5 147.0 L 524.5 136.0 L 525.5 135.0 L 528.5 124.0 L 530.5 121.0 L 530.5 119.0 L 531.5 118.0 L 534.5 107.0 L 535.5 106.0 L 535.5 104.0 L 536.5 103.0 L 536.5 101.0 L 539.5 94.0 L 539.5 92.0 L 541.5 89.0 L 541.5 87.0 L 542.5 86.0 L 545.5 75.0 L 546.5 74.0 L 546.5 72.0 L 547.5 71.0 L 547.5 69.0 L 550.5 62.0 L 550.5 60.0 L 552.5 57.0 L 552.5 55.0 L 553.5 54.0 L 556.5 43.0 L 557.5 42.0 L 557.5 40.0 L 558.5 39.0 L 559.0 31.5 Z M 626.0 31.5 L 764.5 32.0 L 764.0 75.5 L 750.0 75.5 L 748.5 74.0 L 747.5 67.0 L 741.5 53.0 L 736.5 47.0 L 736.5 46.0 L 730.0 40.5 L 726.0 39.5 L 725.0 38.5 L 719.0 38.5 L 717.0 39.5 L 711.5 46.0 L 711.5 156.0 L 712.5 157.0 L 712.5 162.0 L 713.5 163.0 L 715.5 171.0 L 718.5 177.0 L 718.0 178.5 L 671.5 178.0 L 673.5 174.0 L 675.5 166.0 L 676.5 165.0 L 676.5 163.0 L 677.5 162.0 L 677.5 157.0 L 678.5 156.0 L 678.5 46.0 L 675.5 41.0 L 671.0 38.5 L 665.0 38.5 L 664.0 39.5 L 660.0 40.5 L 654.5 45.0 L 654.5 46.0 L 648.5 53.0 L 643.5 64.0 L 642.5 70.0 L 641.5 71.0 L 641.5 74.0 L 640.0 75.5 L 626.0 75.5 L 626.0 31.5 Z M 325.0 37.5 L 324.0 38.5 L 320.0 39.5 L 317.5 42.0 L 315.5 46.0 L 315.5 96.0 L 316.5 97.0 L 316.5 99.0 L 323.0 104.5 L 348.0 104.5 L 360.0 99.5 L 368.5 90.0 L 369.5 86.0 L 371.5 83.0 L 371.5 80.0 L 372.5 79.0 L 372.5 64.0 L 371.5 63.0 L 370.5 57.0 L 367.5 51.0 L 359.0 42.5 L 350.0 38.5 L 345.0 38.5 L 344.0 37.5 L 325.0 37.5 Z"
                fillRule="evenodd"
              />

              {/* KITCHEN – BAR Subtitle in Official Terracotta Red (#CF4B37) */}
              <motion.path
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                fill="#CF4B37"
                d="M 481.0 208.5 L 487.5 209.0 L 487.0 271.5 L 480.5 271.0 L 481.0 208.5 Z M 138.0 217.5 L 144.0 217.5 L 145.5 219.0 L 146.0 238.5 L 162.5 220.0 L 163.0 218.5 L 165.0 217.5 L 173.5 218.0 L 156.5 238.0 L 172.5 258.0 L 172.5 259.0 L 174.5 261.0 L 174.0 262.5 L 166.0 262.5 L 152.0 244.5 L 151.0 244.5 L 145.5 250.0 L 145.5 261.0 L 144.0 262.5 L 138.0 262.5 L 136.5 261.0 L 136.5 219.0 L 138.0 217.5 Z M 189.0 217.5 L 197.5 218.0 L 197.0 262.5 L 188.5 262.0 L 189.0 217.5 Z M 211.0 217.5 L 244.0 217.5 L 245.5 219.0 L 245.0 225.5 L 232.5 226.0 L 232.5 261.0 L 231.0 262.5 L 225.0 262.5 L 223.5 261.0 L 223.5 226.0 L 211.0 225.5 L 211.0 217.5 Z M 272.0 217.5 L 281.0 217.5 L 282.0 218.5 L 287.0 219.5 L 292.5 225.0 L 293.5 229.0 L 294.5 230.0 L 294.0 232.5 L 287.0 232.5 L 285.5 231.0 L 285.5 229.0 L 283.0 226.5 L 279.0 224.5 L 273.0 224.5 L 271.0 225.5 L 265.5 232.0 L 265.5 234.0 L 264.5 235.0 L 264.5 245.0 L 265.5 246.0 L 266.5 250.0 L 271.0 254.5 L 273.0 255.5 L 279.0 255.5 L 283.0 253.5 L 285.5 251.0 L 285.5 249.0 L 287.0 247.5 L 294.5 248.0 L 292.5 255.0 L 287.0 260.5 L 285.0 261.5 L 282.0 261.5 L 281.0 262.5 L 272.0 262.5 L 271.0 261.5 L 268.0 261.5 L 266.0 260.5 L 261.5 257.0 L 256.5 247.0 L 256.5 233.0 L 259.5 226.0 L 261.5 224.0 L 261.5 223.0 L 266.0 219.5 L 271.0 218.5 L 272.0 217.5 Z M 309.0 217.5 L 316.5 218.0 L 317.0 236.5 L 335.0 236.5 L 335.5 219.0 L 337.0 217.5 L 343.0 217.5 L 344.5 219.0 L 344.5 261.0 L 343.0 262.5 L 337.0 262.5 L 335.5 261.0 L 335.0 243.5 L 317.0 243.5 L 316.5 262.0 L 308.5 262.0 L 309.0 217.5 Z M 361.0 217.5 L 389.5 218.0 L 389.0 225.5 L 368.5 226.0 L 369.0 236.5 L 387.5 237.0 L 387.0 242.5 L 369.0 242.5 L 368.5 254.0 L 390.0 254.5 L 390.0 262.5 L 360.5 262.0 L 361.0 217.5 Z M 405.0 217.5 L 412.0 217.5 L 414.5 220.0 L 417.5 226.0 L 421.5 231.0 L 422.5 234.0 L 426.5 239.0 L 427.5 242.0 L 432.0 248.5 L 432.5 218.0 L 440.5 218.0 L 440.0 262.5 L 431.5 262.0 L 429.5 258.0 L 427.5 256.0 L 426.5 253.0 L 422.5 248.0 L 421.5 245.0 L 417.5 240.0 L 416.5 237.0 L 413.0 232.5 L 412.5 262.0 L 404.5 262.0 L 405.0 217.5 Z M 529.0 217.5 L 546.0 217.5 L 547.0 218.5 L 552.0 218.5 L 556.0 220.5 L 558.5 223.0 L 558.5 225.0 L 559.5 226.0 L 559.5 232.0 L 558.5 234.0 L 553.5 238.0 L 556.0 239.5 L 558.0 239.5 L 560.5 242.0 L 562.5 246.0 L 562.5 252.0 L 559.0 258.5 L 558.0 258.5 L 556.0 260.5 L 554.0 260.5 L 553.0 261.5 L 548.0 261.5 L 547.0 262.5 L 528.5 262.0 L 529.0 217.5 Z M 590.0 217.5 L 599.0 217.5 L 600.5 219.0 L 602.5 226.0 L 603.5 227.0 L 603.5 229.0 L 605.5 232.0 L 606.5 237.0 L 607.5 238.0 L 607.5 240.0 L 609.5 243.0 L 610.5 248.0 L 612.5 251.0 L 613.5 256.0 L 615.5 260.0 L 615.0 262.5 L 608.0 262.5 L 604.0 253.5 L 585.0 253.5 L 583.5 256.0 L 582.5 261.0 L 581.0 262.5 L 573.5 262.0 L 573.5 260.0 L 575.5 257.0 L 576.5 252.0 L 578.5 249.0 L 579.5 244.0 L 580.5 243.0 L 580.5 241.0 L 582.5 238.0 L 584.5 230.0 L 586.5 227.0 L 587.5 222.0 L 590.0 217.5 Z M 630.0 217.5 L 647.0 217.5 L 648.0 218.5 L 654.0 218.5 L 658.0 220.5 L 661.5 224.0 L 662.5 226.0 L 662.5 229.0 L 663.5 230.0 L 662.5 238.0 L 660.5 242.0 L 656.0 244.5 L 654.5 247.0 L 656.5 249.0 L 661.5 259.0 L 663.5 261.0 L 663.0 262.5 L 656.0 262.5 L 654.5 261.0 L 652.5 256.0 L 650.5 254.0 L 648.5 249.0 L 646.0 246.5 L 637.5 247.0 L 637.0 262.5 L 629.5 262.0 L 630.0 217.5 Z M 537.0 224.5 L 537.0 235.5 L 548.0 235.5 L 550.5 234.0 L 551.5 232.0 L 551.5 229.0 L 549.0 225.5 L 547.0 225.5 L 546.0 224.5 L 537.0 224.5 Z M 638.0 225.5 L 638.0 239.5 L 650.0 239.5 L 653.5 237.0 L 654.5 235.0 L 654.5 229.0 L 652.0 226.5 L 650.0 225.5 L 638.0 225.5 Z M 595.0 226.5 L 593.5 228.0 L 592.5 233.0 L 590.5 236.0 L 589.5 241.0 L 587.5 245.0 L 588.0 246.5 L 601.5 246.0 L 600.5 241.0 L 597.5 235.0 L 597.5 233.0 L 596.5 232.0 L 595.0 226.5 Z M 537.0 241.5 L 537.0 255.5 L 546.0 255.5 L 547.0 254.5 L 550.0 254.5 L 552.5 253.0 L 553.5 249.0 L 554.5 248.0 L 553.5 247.0 L 553.5 245.0 L 551.0 242.5 L 549.0 241.5 L 537.0 241.5 Z"
                fillRule="evenodd"
              />
            </svg>

            {/* Location Tag in Tracked Terracotta */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
              className="mt-2 sm:mt-2.5"
            >
              <span className="font-sans text-[9px] sm:text-[10.5px] lg:text-[11.5px] tracking-[0.25em] text-[#CF4B37] uppercase font-medium ml-[0.25em] block">
                Madhapur · Hyderabad
              </span>
            </motion.div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 6. DESKTOP NAVIGATION CARDS — TWO HORIZONTAL ROWS DIRECTLY UNDER LOGO    */}
        {/* ======================================================================= */}
        <div className="hidden md:flex flex-col w-full max-w-[1240px] xl:max-w-[1340px] 2xl:max-w-[1420px] gap-2.5 lg:gap-3 xl:gap-3.5 mb-5 sm:mb-6">
          
          {/* ROW 1: HOME | ABOUT | MENU | EVENTS */}
          <div className="grid grid-cols-4 gap-2.5 lg:gap-3.5 xl:gap-4 w-full">
            {navRow1.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: card.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => handleCardClick(card.id)}
                className="group relative w-full h-[54px] lg:h-[60px] xl:h-[66px] rounded-full flex items-center px-3 sm:px-4 lg:px-4.5 xl:px-5 bg-white border border-[#EFE6D8] shadow-[0_4px_12px_rgba(30,30,30,0.04)] hover:shadow-[0_8px_20px_rgba(46,78,33,0.12)] hover:border-[#2E4E21] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-left select-none"
              >
                {/* Circular Icon Container */}
                <div className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full bg-[#ECDEC8]/60 border border-[#EFE6D8] flex items-center justify-center flex-shrink-0 mr-2.5 lg:mr-3 text-[#2E4E21] group-hover:bg-[#2E4E21] group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col min-w-0 pr-1.5 overflow-hidden">
                  <h3 className="font-sans text-[12px] lg:text-[13.5px] xl:text-[14.5px] font-semibold tracking-wide text-[#1E1E1E] uppercase leading-tight group-hover:text-[#CF4B37] transition-colors truncate">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[9px] lg:text-[10px] xl:text-[11px] text-[#4A4A4A] font-normal tracking-wide mt-0.5 leading-tight truncate">
                    {card.subtitle}
                  </p>
                </div>

                {/* Circular Arrow Button */}
                <div className="ml-auto w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full border border-[#EFE6D8] group-hover:border-[#CF4B37] group-hover:bg-[#CF4B37]/10 flex items-center justify-center text-[#4A4A4A] group-hover:text-[#CF4B37] flex-shrink-0 transition-all duration-300">
                  <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ROW 2: CONTACT | BOOK A TABLE | BOOK BANQUET HALL | CATERING */}
          <div className="grid grid-cols-4 gap-2.5 lg:gap-3.5 xl:gap-4 w-full">
            {navRow2.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: card.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => handleCardClick(card.id)}
                className="group relative w-full h-[54px] lg:h-[60px] xl:h-[66px] rounded-full flex items-center px-3 sm:px-4 lg:px-4.5 xl:px-5 bg-white border border-[#EFE6D8] shadow-[0_4px_12px_rgba(30,30,30,0.04)] hover:shadow-[0_8px_20px_rgba(46,78,33,0.12)] hover:border-[#2E4E21] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-left select-none"
              >
                {/* Circular Icon Container */}
                <div className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full bg-[#ECDEC8]/60 border border-[#EFE6D8] flex items-center justify-center flex-shrink-0 mr-2.5 lg:mr-3 text-[#2E4E21] group-hover:bg-[#2E4E21] group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col min-w-0 pr-1.5 overflow-hidden">
                  <h3 className="font-sans text-[12px] lg:text-[13.5px] xl:text-[14.5px] font-semibold tracking-wide text-[#1E1E1E] uppercase leading-tight group-hover:text-[#CF4B37] transition-colors truncate">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[9px] lg:text-[10px] xl:text-[11px] text-[#4A4A4A] font-normal tracking-wide mt-0.5 leading-tight truncate">
                    {card.subtitle}
                  </p>
                </div>

                {/* Circular Arrow Button */}
                <div className="ml-auto w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full border border-[#EFE6D8] group-hover:border-[#CF4B37] group-hover:bg-[#CF4B37]/10 flex items-center justify-center text-[#4A4A4A] group-hover:text-[#CF4B37] flex-shrink-0 transition-all duration-300">
                  <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 7. STATISTIC CARDS (DIRECTLY UNDER NAVIGATION CARDS)                     */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center justify-center gap-2 lg:gap-3 xl:gap-4 mb-4 sm:mb-5"
        >
          {statsData.map((stat, idx) => (
            <React.Fragment key={stat.label}>
              {/* Individual Stat Card */}
              <div className="w-[105px] lg:w-[125px] xl:w-[140px] py-2 px-2.5 rounded-2xl bg-white border border-[#EFE6D8] shadow-[0_4px_12px_rgba(30,30,30,0.04)] flex flex-col items-center justify-center text-center group hover:border-[#CF4B37] transition-colors">
                <div className="mb-0.5">{stat.icon}</div>
                <span className="font-sans text-[15px] lg:text-[17px] xl:text-[18px] font-bold text-[#1E1E1E] leading-tight group-hover:text-[#CF4B37]">
                  {stat.value}
                </span>
                <span className="font-sans text-[7.5px] lg:text-[8.5px] xl:text-[9px] tracking-[0.14em] uppercase text-[#4A4A4A] font-semibold mt-0.5 leading-none">
                  {stat.label}
                </span>
              </div>

              {/* Ornamental Divider between cards (Except last) */}
              {idx < statsData.length - 1 && (
                <div className="flex flex-col items-center justify-center px-0.5 text-[#B9946B] select-none">
                  <span className="text-[11px] leading-none">✦</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ======================================================================= */}
        {/* 8. MOBILE RESPONSIVE LAYOUT (< md screens)                              */}
        {/* ======================================================================= */}
        <div className="flex md:hidden flex-col w-full max-w-md mx-auto gap-2.5 pb-4 z-10">
          {/* BOOK A TABLE Card for Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={() => handleCardClick("reserve")}
            className="w-full h-14 rounded-full flex items-center px-4 bg-white border border-[#EFE6D8] shadow-md active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#CF4B37] text-white flex items-center justify-center flex-shrink-0 mr-3">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-xs font-bold tracking-wider text-[#1E1E1E]">
                BOOK A TABLE
              </span>
              <span className="text-[10px] text-[#4A4A4A]">Reserve your table</span>
            </div>
            <div className="ml-auto w-6 h-6 rounded-full border border-[#EFE6D8] flex items-center justify-center text-[#CF4B37]">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* 2-Column Grid of Navigation Items for Mobile */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "hero", title: "HOME", sub: "Experience", icon: <Home className="w-3.5 h-3.5" /> },
              { id: "experience", title: "ABOUT", sub: "Our story", icon: <Sprout className="w-3.5 h-3.5" /> },
              { id: "menu", title: "MENU", sub: "Food & Bar", icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
              { id: "banquet", title: "EVENTS", sub: "Celebrations", icon: <CalendarDays className="w-3.5 h-3.5" /> },
              { id: "location", title: "CONTACT", sub: "Get in touch", icon: <Phone className="w-3.5 h-3.5" /> },
              { id: "banquet", title: "BANQUET", sub: "Host event", icon: <Building2 className="w-3.5 h-3.5" /> },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 + idx * 0.04 }}
                onClick={() => handleCardClick(item.id)}
                className="h-12 rounded-full flex items-center px-3 bg-white border border-[#EFE6D8] shadow-sm active:scale-98 cursor-pointer text-left"
              >
                <div className="w-7 h-7 rounded-full bg-[#ECDEC8]/60 text-[#2E4E21] flex items-center justify-center mr-2 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-[11px] font-bold text-[#1E1E1E] truncate">
                    {item.title}
                  </span>
                  <span className="text-[9px] text-[#4A4A4A] truncate">{item.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full Width Catering Service for Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            onClick={() => handleCardClick("catering")}
            className="w-full h-12 rounded-full flex items-center px-3.5 bg-white border border-[#EFE6D8] shadow-sm active:scale-98 cursor-pointer text-left"
          >
            <div className="w-7 h-7 rounded-full bg-[#ECDEC8]/60 text-[#2E4E21] flex items-center justify-center mr-2.5 flex-shrink-0">
              <ChefHat className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-bold text-[#1E1E1E]">CATERING SERVICE</span>
              <span className="text-[9px] text-[#4A4A4A]">Bring Fursat to your venue</span>
            </div>
            <ChevronRight className="ml-auto w-3.5 h-3.5 text-[#CF4B37]" />
          </motion.div>

          {/* Mobile 4-Grid Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="grid grid-cols-4 gap-1.5 pt-1"
          >
            {statsData.map((stat) => (
              <div
                key={stat.label}
                className="py-1.5 px-1 rounded-xl bg-white border border-[#EFE6D8] flex flex-col items-center justify-center text-center"
              >
                <span className="font-sans text-[12px] font-bold text-[#1E1E1E] leading-none">
                  {stat.value}
                </span>
                <span className="font-sans text-[6.5px] tracking-wider uppercase text-[#4A4A4A] font-semibold mt-0.5 truncate max-w-full">
                  {stat.label.split(" ")[0]}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 9. SCROLL TO EXPLORE INDICATOR (BOTTOM CENTER)                            */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 1.5 }}
        onClick={scrollToNext}
        data-cursor="EXPLORE"
        className="relative z-10 flex flex-col items-center pb-4 sm:pb-6 cursor-pointer group"
      >
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#4A4A4A] group-hover:text-[#CF4B37] font-semibold transition-colors duration-300 ml-[0.25em]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-1 flex flex-col items-center text-[#CF4B37] group-hover:text-[#B53F2D] transition-colors duration-300"
        >
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
