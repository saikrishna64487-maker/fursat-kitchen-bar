"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Percent,
  UtensilsCrossed,
  Image as ImageIcon,
  Clock,
  ArrowRight,
  Sparkles,
  Calendar,
  Building2,
  ChefHat,
  Store,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import FursatLogo from "@/components/FursatLogo";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    activeOffers: 0,
    menuItems: 0,
    galleryImages: 0,
    activeEvents: 0,
    loading: true,
  });

  const fetchStats = async () => {
    try {
      setStats((prev) => ({ ...prev, loading: true }));
      const [contentRes, menuRes] = await Promise.all([
        fetch("/api/admin/content"),
        fetch("/api/admin/menu"),
      ]);

      const contentData = await contentRes.json();
      const menuData = await menuRes.json();

      const offers = contentData.data?.offers || [];
      const gallery = contentData.data?.gallery || [];
      const events = contentData.data?.events || [];
      const items = menuData.items || [];

      setStats({
        activeOffers: offers.filter((o: any) => o.active).length,
        menuItems: items.length,
        galleryImages: gallery.length,
        activeEvents: events.filter((e: any) => e.active).length,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 font-sans">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-fursat-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-fursat-green/10 text-fursat-green border border-fursat-green/20">
              <Sparkles className="w-3 h-3" /> Fursat Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-fursat-green tracking-tight">
            Staff Overview &amp; Control
          </h1>
          <p className="text-xs sm:text-sm text-fursat-muted mt-0.5 font-normal">
            Manage live website content, offers, menu items, banquets, and restaurant information in real time.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={stats.loading}
          className="self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-fursat-hairline text-xs font-semibold text-fursat-charcoal hover:bg-fursat-sand shadow-sm transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${stats.loading ? "animate-spin text-fursat-green" : "text-fursat-camel"}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ======================================================================= */}
      {/* 1. KEY SUMMARY CARDS                                                   */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Offers */}
        <div className="bg-white rounded-2xl border border-fursat-hairline p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-fursat-terracotta">
              Active Offers
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-fursat-charcoal">
            {stats.loading ? "..." : stats.activeOffers}
          </div>
          <div className="mt-2 text-[11px] text-fursat-muted flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-fursat-green" />
            <span>Live discount strips</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl border border-fursat-hairline p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-fursat-terracotta">
              Menu Items
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-fursat-green">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-fursat-charcoal">
            {stats.loading ? "..." : stats.menuItems}
          </div>
          <div className="mt-2 text-[11px] text-fursat-muted">
            <span>Across all 7 food categories</span>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="bg-white rounded-2xl border border-fursat-hairline p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-fursat-terracotta">
              Gallery Photos
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-fursat-charcoal">
            {stats.loading ? "..." : stats.galleryImages}
          </div>
          <div className="mt-2 text-[11px] text-fursat-muted">
            <span>High-res showcase shots</span>
          </div>
        </div>

        {/* Active Events */}
        <div className="bg-white rounded-2xl border border-fursat-hairline p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-fursat-terracotta">
              Active Events
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-fursat-charcoal">
            {stats.loading ? "..." : stats.activeEvents}
          </div>
          <div className="mt-2 text-[11px] text-fursat-muted">
            <span>Celebration packages</span>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. QUICK MANAGEMENT SECTIONS                                            */}
      {/* ======================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-fursat-green">
            Content Management Sections
          </h2>
          <span className="text-xs text-fursat-muted">
            Click any section below to update live content
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Offers */}
          <Link
            href="/admin/offers"
            className="group bg-white rounded-2xl border border-fursat-hairline p-5 hover:border-fursat-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-charcoal group-hover:bg-fursat-green group-hover:text-white transition-colors mb-3">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-fursat-charcoal group-hover:text-fursat-green transition-colors">
                Offers &amp; Discounts
              </h3>
              <p className="text-xs text-fursat-muted mt-1">
                Edit discount percentages, time slots, titles, and activate or pause live banner promotions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between text-xs font-semibold text-fursat-green">
              <span>Manage Offers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Menu */}
          <Link
            href="/admin/menu"
            className="group bg-white rounded-2xl border border-fursat-hairline p-5 hover:border-fursat-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-charcoal group-hover:bg-fursat-green group-hover:text-white transition-colors mb-3">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-fursat-charcoal group-hover:text-fursat-green transition-colors">
                Menu Management
              </h3>
              <p className="text-xs text-fursat-muted mt-1">
                Add, edit prices, descriptions, Veg/Non-Veg tag, and toggle kitchen availability for any dish.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between text-xs font-semibold text-fursat-green">
              <span>Manage Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Gallery */}
          <Link
            href="/admin/gallery"
            className="group bg-white rounded-2xl border border-fursat-hairline p-5 hover:border-fursat-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-charcoal group-hover:bg-fursat-green group-hover:text-white transition-colors mb-3">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-fursat-charcoal group-hover:text-fursat-green transition-colors">
                Gallery Photos
              </h3>
              <p className="text-xs text-fursat-muted mt-1">
                Add ambiance photos, edit descriptions, adjust display order, and curate the experience page.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between text-xs font-semibold text-fursat-green">
              <span>Manage Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Events */}
          <Link
            href="/admin/events"
            className="group bg-white rounded-2xl border border-fursat-hairline p-5 hover:border-fursat-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-charcoal group-hover:bg-fursat-green group-hover:text-white transition-colors mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-fursat-charcoal group-hover:text-fursat-green transition-colors">
                Celebrations &amp; Events
              </h3>
              <p className="text-xs text-fursat-muted mt-1">
                Update birthday packages, kitty parties, corporate mixers, guest capacities, and booking details.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between text-xs font-semibold text-fursat-green">
              <span>Manage Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Banquet */}
          <Link
            href="/admin/banquet"
            className="group bg-white rounded-2xl border border-fursat-hairline p-5 hover:border-fursat-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-charcoal group-hover:bg-fursat-green group-hover:text-white transition-colors mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-fursat-charcoal group-hover:text-fursat-green transition-colors">
                Banquet Hall
              </h3>
              <p className="text-xs text-fursat-muted mt-1">
                Edit 150+ guest capacity specs, acoustic features, buffet highlights, and banquet contact numbers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between text-xs font-semibold text-fursat-green">
              <span>Manage Banquet</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Catering */}
          <Link
            href="/admin/catering"
            className="group bg-white rounded-2xl border border-fursat-hairline p-5 hover:border-fursat-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-charcoal group-hover:bg-fursat-green group-hover:text-white transition-colors mb-3">
                <ChefHat className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-fursat-charcoal group-hover:text-fursat-green transition-colors">
                Catering &amp; Meal Boxes
              </h3>
              <p className="text-xs text-fursat-muted mt-1">
                Update corporate employee lunch boxes, outdoor live counters, minimum order size, and details.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between text-xs font-semibold text-fursat-green">
              <span>Manage Catering</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Restaurant Info */}
          <Link
            href="/admin/restaurant-info"
            className="group bg-white rounded-2xl border border-fursat-hairline p-5 hover:border-fursat-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-center text-fursat-charcoal group-hover:bg-fursat-green group-hover:text-white transition-colors mb-3">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-fursat-charcoal group-hover:text-fursat-green transition-colors">
                Restaurant Info &amp; Hours
              </h3>
              <p className="text-xs text-fursat-muted mt-1">
                Update phone numbers, WhatsApp, address, opening hours, social links, and announcement banners.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between text-xs font-semibold text-fursat-green">
              <span>Manage Info</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}
