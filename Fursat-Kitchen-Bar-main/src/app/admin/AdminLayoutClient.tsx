"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Percent,
  UtensilsCrossed,
  Image as ImageIcon,
  Calendar,
  Building2,
  ChefHat,
  Store,
  Clock,
  LogOut,
  Menu as MenuIcon,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import FursatLogo from "@/components/FursatLogo";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [staffUser, setStaffUser] = useState<string | null>(null);

  const isStandalonePage = pathname === "/admin/login" || pathname?.startsWith("/admin/orders");

  useEffect(() => {
    if (isStandalonePage) {
      setCheckingAuth(false);
      return;
    }

    // Check staff authentication status
    fetch("/api/auth/check")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data.authenticated) {
          setStaffUser(data.user?.username || "Staff");
          setCheckingAuth(false);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, isStandalonePage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      router.push("/admin/login");
    }
  };

  if (isStandalonePage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-fursat-sand flex flex-col items-center justify-center p-4 font-sans">
        <FursatLogo layout="vertical" size="md" className="animate-pulse mb-3" />
        <span className="text-xs uppercase tracking-widest text-fursat-muted font-semibold">
          Verifying Staff Access...
        </span>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Offers", href: "/admin/offers", icon: <Percent className="w-4 h-4" /> },
    { label: "Menu", href: "/admin/menu", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { label: "Gallery", href: "/admin/gallery", icon: <ImageIcon className="w-4 h-4" /> },
    { label: "Events", href: "/admin/events", icon: <Calendar className="w-4 h-4" /> },
    { label: "Banquet", href: "/admin/banquet", icon: <Building2 className="w-4 h-4" /> },
    { label: "Catering", href: "/admin/catering", icon: <ChefHat className="w-4 h-4" /> },
    { label: "Restaurant Info", href: "/admin/restaurant-info", icon: <Store className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-fursat-sand text-fursat-charcoal flex flex-col md:flex-row font-sans">
      
      {/* ======================================================================= */}
      {/* 1. DESKTOP LEFT SIDEBAR                                                 */}
      {/* ======================================================================= */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-fursat-hairline shadow-sm h-screen sticky top-0 p-5 justify-between flex-shrink-0 z-20">
        
        {/* Sidebar Header with Brand Emblem */}
        <div>
          <div className="pb-5 border-b border-fursat-hairline flex flex-col items-center text-center">
            <Link href="/" target="_blank" title="View Public Website" className="group">
              <FursatLogo layout="vertical" size="sm" className="mb-1" />
            </Link>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-fursat-terracotta uppercase block mt-1">
              Staff Admin Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-fursat-green text-white shadow-sm"
                      : "text-fursat-muted hover:bg-fursat-sand hover:text-fursat-charcoal"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-white" : "text-fursat-camel"}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Staff ID & Logout */}
        <div className="pt-4 border-t border-fursat-hairline space-y-2">
          <div className="px-3 py-2 rounded-xl bg-fursat-sand border border-fursat-camel/40 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-fursat-green" />
              <span className="font-semibold text-fursat-charcoal truncate max-w-[120px]">
                {staffUser || "Staff"}
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-fursat-terracotta hover:underline flex items-center gap-1"
              title="View Public Site"
            >
              <span>Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-fursat-terracotta text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ======================================================================= */}
      {/* 2. MOBILE TOP NAVIGATION & DRAWER                                       */}
      {/* ======================================================================= */}
      <div className="md:hidden bg-white border-b border-fursat-hairline p-4 sticky top-0 z-30 flex items-center justify-between shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <FursatLogo layout="horizontal" size="sm" />
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-fursat-sand border border-fursat-camel/40 text-fursat-charcoal"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm pt-16 p-4">
          <div className="bg-white rounded-3xl border border-fursat-hairline p-5 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <span className="text-[10px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold block pb-2 border-b border-fursat-hairline">
              Staff Navigation
            </span>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? "bg-fursat-green text-white"
                        : "bg-fursat-sand text-fursat-charcoal border border-fursat-hairline"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-fursat-hairline flex items-center justify-between">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-fursat-muted hover:text-fursat-charcoal flex items-center gap-1"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-50 text-fursat-terracotta font-semibold text-xs"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* 3. MAIN ADMIN CONTENT WORKSPACE                                         */}
      {/* ======================================================================= */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
