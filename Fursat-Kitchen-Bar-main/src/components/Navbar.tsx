"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, MapPin, Clock, Calendar, Phone, MessageSquare } from "lucide-react";
import FursatLogo from "./FursatLogo";

export { FursatLogo };

interface NavbarProps {
  onOpenReservation: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#experience" },
    { name: "Menu", href: "/menu" },
    { name: "Bar", href: "#bar" },
    { name: "Events", href: "#banquet" },
    { name: "Contact", href: "#location" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Navigation Bar — Appears smoothly on scroll past hero */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2.5 sm:py-3 bg-fursat-sand/95 backdrop-blur-md border-b border-fursat-camel/30 shadow-[0_4px_20px_rgba(30,30,30,0.06)] opacity-100 translate-y-0 pointer-events-auto"
            : "py-2 sm:py-3 bg-transparent border-b border-transparent opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Logo - Left */}
          <div className="flex items-center min-w-[100px]">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              data-cursor="HOME"
              className="flex items-center group"
              aria-label="Fursat Kitchen & Bar Home"
            >
              <FursatLogo layout="vertical" size="sm" />
            </a>
          </div>

          {/* Nav Links on Desktop Scrolled Header */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="font-sans font-medium text-[15px] text-fursat-charcoal hover:text-fursat-terracotta transition-colors capitalize cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Quick CTAs on Scrolled View */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/919059670033"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full border border-fursat-green/40 text-fursat-green hover:bg-fursat-green hover:text-white transition-all shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenReservation}
              data-cursor="BOOK"
              className="btn-primary text-[13px] sm:text-sm py-2 px-4 sm:px-5 flex items-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-fursat-camel/40 text-fursat-charcoal hover:text-fursat-terracotta transition-colors shadow-sm ml-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5 text-fursat-green" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-fursat-sand/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 transition-all duration-500 overflow-y-auto ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-6"
        }`}
      >
        <div className="flex flex-col gap-4 max-w-lg mx-auto w-full">
          <div className="flex items-center justify-between border-b border-fursat-camel/30 pb-3">
            <span className="font-sans font-semibold text-[11px] tracking-[0.2em] uppercase text-fursat-terracotta">
              Explore Fursat
            </span>
            <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-fursat-muted">
              Madhapur · Hyderabad
            </span>
          </div>

          {navLinks.map((link, idx) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              style={{ transitionDelay: `${idx * 30}ms` }}
              className="text-left font-sans font-medium text-2xl sm:text-3xl text-fursat-charcoal hover:text-fursat-terracotta transition-colors duration-300 flex items-center justify-between group py-2"
            >
              <span>{link.name}</span>
              <span className="text-xs font-sans text-fursat-terracotta opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                View →
              </span>
            </button>
          ))}
        </div>

        <div className="border-t border-fursat-camel/30 pt-6 mt-6 flex flex-col gap-3 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2 text-xs text-fursat-muted">
            <MapPin className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
            <span>Capital Park, Ayyappa Society, VIP Hills, Madhapur</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-fursat-muted">
            <Clock className="w-4 h-4 text-fursat-green flex-shrink-0" />
            <span>Open Daily: 12:00 PM – 11:30 PM</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-fursat-muted">
            <Phone className="w-4 h-4 text-fursat-green flex-shrink-0" />
            <a href="tel:+919059670033" className="hover:text-fursat-terracotta font-medium">
              090596 70033
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <a
              href="https://wa.me/919059670033"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2.5 text-xs text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="btn-primary py-2.5 text-xs text-center flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

