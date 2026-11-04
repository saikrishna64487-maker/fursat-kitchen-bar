"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, ArrowUp, Send, Check, MapPin, Phone, ExternalLink, Mail, MessageSquare } from "lucide-react";
import { FursatLogo } from "./Navbar";

interface FooterProps {
  onOpenReservation: () => void;
}

export default function Footer({ onOpenReservation }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const googleMapsUrl = "https://maps.app.goo.gl/1EFLCxT8NSQFCaEVA";

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Menu & Order", href: "#menu" },
    { label: "Live Offers", href: "#offers" },
    { label: "Banquet Hall", href: "#banquet" },
    { label: "Catering", href: "#catering" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
  ];

  return (
    <footer id="contact" className="relative w-full bg-fursat-black text-fursat-sand pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8 md:px-12 border-t border-fursat-camel/30 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[250px] bg-fursat-terracotta/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top Tier: Brand, Contact Info, and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-fursat-camel/20">
          {/* Brand Column with Authentic Logo and Wordmark */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <FursatLogo layout="horizontal" className="mb-4" />
              <p className="font-sans text-sm text-fursat-sand/80 max-w-sm font-normal leading-relaxed mb-6 mt-3">
                Multicuisine kitchen, full bar, and a banquet hall on-site — open daily in Madhapur, Hyderabad.
              </p>
            </div>

            <div className="text-sm text-fursat-sand/90 space-y-2.5 pt-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-fursat-terracotta flex-shrink-0 mt-0.5" />
                <span>
                  Capital Pk Road, Ayyappa Society, VIP Hills, Silicon Valley, Madhapur, Hyderabad, Telangana 500081
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
                <a href="tel:+919059670033" className="text-fursat-terracotta hover:underline font-semibold">
                  090596 70033
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
                <a
                  href="https://wa.me/919059670033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fursat-sand hover:text-fursat-terracotta transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
                <a href="mailto:hello@fursatkitchenbar.in" className="hover:text-fursat-terracotta">
                  hello@fursatkitchenbar.in
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-[12px] font-sans uppercase tracking-[0.2em] text-fursat-terracotta font-semibold mb-4 sm:mb-6">
              Navigation
            </span>
            <div className="flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-sans uppercase tracking-wider text-fursat-sand/80 hover:text-fursat-terracotta transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={onOpenReservation}
                className="text-left text-sm font-sans uppercase tracking-wider text-fursat-terracotta font-semibold hover:text-fursat-terracotta-dark transition-colors"
              >
                Reserve Table
              </button>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans uppercase tracking-wider text-fursat-terracotta flex items-center gap-1 hover:underline pt-1"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Opening Hours & Newsletter */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-[12px] font-sans uppercase tracking-[0.2em] text-fursat-terracotta font-semibold mb-2">
              Hours &amp; Updates
            </span>
            <div className="p-4 rounded-2xl bg-[#181818] border border-fursat-camel/20 mb-4">
              <span className="text-xs font-sans text-fursat-terracotta font-semibold block mb-0.5">
                Daily Service Timings
              </span>
              <span className="text-sm text-white font-medium block">
                Open Daily: 12:00 PM – 11:30 PM
              </span>
              <span className="text-xs text-fursat-sand/70 mt-1 block">
                Lunch, Evening Lull, Dinner Rush &amp; Late Hours
              </span>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                required
                placeholder="Enter email for seasonal offers"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-[#181818] border border-fursat-camel/30 text-white text-xs focus:outline-none focus:border-fursat-terracotta placeholder:text-fursat-sand/40 pr-12"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-full bg-fursat-terracotta text-white flex items-center justify-center hover:bg-fursat-terracotta-dark hover:scale-105 transition-all shadow-sm"
              >
                {newsletterSubscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
            {newsletterSubscribed && (
              <span className="text-xs font-sans text-fursat-sand mt-2 block animate-fade-in">
                Thank you for subscribing to Fursat updates.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-fursat-sand/70 border-b border-fursat-camel/20 pb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <span className="font-sans text-xs sm:text-sm tracking-wide">
              © {new Date().getFullYear()} Fursat Kitchen &amp; Bar · Madhapur, Hyderabad. All rights reserved.
            </span>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <Link
                href="/menu"
                className="hover:text-fursat-terracotta transition-colors font-medium text-fursat-sand"
              >
                Digital Menu
              </Link>
              <span className="opacity-40">•</span>
              <Link
                href="/qr"
                className="hover:text-fursat-terracotta transition-colors font-medium text-fursat-sand"
              >
                Table QR Card
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919059670033"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-fursat-camel/30 hover:border-fursat-terracotta hover:text-fursat-terracotta transition-colors text-fursat-sand"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-fursat-camel/30 hover:border-fursat-terracotta hover:text-fursat-terracotta transition-colors ml-2 text-fursat-sand"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discreet Staff & Kitchen Links at the very end of the page */}
        <div className="pt-4 flex items-center justify-center gap-4 text-xs font-sans uppercase tracking-[0.16em]">
          <Link
            href="/admin/login"
            className="text-fursat-sand/50 hover:text-fursat-terracotta hover:underline transition-colors duration-200"
          >
            STAFF LOGIN
          </Link>
          <span className="text-fursat-sand/30 select-none">•</span>
          <Link
            href="/kitchen"
            className="text-fursat-sand/50 hover:text-fursat-terracotta hover:underline transition-colors duration-200"
          >
            KITCHEN ACCESS
          </Link>
        </div>
      </div>
    </footer>
  );
}
