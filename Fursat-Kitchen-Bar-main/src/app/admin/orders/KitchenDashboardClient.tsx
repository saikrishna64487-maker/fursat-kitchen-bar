"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Utensils,
  Clock,
  CheckCircle2,
  AlertCircle,
  Volume2,
  VolumeX,
  RefreshCw,
  LogOut,
  Search,
  Check,
  Flame,
  Layers,
  ArrowRight,
  Filter,
  User,
  MessageSquare,
  Lock,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
} from "lucide-react";
import { CustomerOrder, OrderStatus } from "@/lib/ordersStore";
import { ALL_MENU_ITEMS, MenuItem } from "@/data/menuData";
import FursatLogo from "@/components/FursatLogo";

export default function KitchenDashboardClient() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [itemsList, setItemsList] = useState<MenuItem[]>(ALL_MENU_ITEMS);
  const [activeTab, setActiveTab] = useState<"orders" | "availability">("orders");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchFilter, setSearchFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastOrderCount, setLastOrderCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check initial authentication
  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Poll orders when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        const data = await res.json();
        if (data.orders) {
          // Detect new orders for sound chime
          const newOrders = data.orders.filter((o: CustomerOrder) => o.status === "NEW");
          if (newOrders.length > lastOrderCount && soundEnabled) {
            playNewOrderChime();
          }
          setLastOrderCount(newOrders.length);
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to poll orders:", err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 3500); // 3.5s auto-polling
    return () => clearInterval(interval);
  }, [isAuthenticated, lastOrderCount, soundEnabled]);

  // Play gentle web audio chime on new orders
  const playNewOrderChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // AudioContext unavailable
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: authUsername, password: authPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      setIsAuthenticated(true);
      setAuthPassword("");
    } catch (err: any) {
      setAuthError(err.message || "Invalid credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const handleUpdateStatus = async (orderId: string, nextStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleToggleItem = async (itemId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/menu", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, available: !currentStatus }),
      });
      if (res.ok) {
        setItemsList((prev) =>
          prev.map((i) => (i.id === itemId ? { ...i, available: !currentStatus } : i))
        );
      }
    } catch (err) {
      console.error("Failed to toggle item availability:", err);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "ALL" && o.status !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchTable = o.tableNumber.toLowerCase().includes(q);
      const matchId = o.id.toLowerCase().includes(q);
      const matchItem = o.items.some((i) => i.name.toLowerCase().includes(q));
      if (!matchTable && !matchId && !matchItem) return false;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "NEW":
        return "bg-rose-500 text-white animate-pulse";
      case "ACCEPTED":
        return "bg-amber-500 text-white";
      case "PREPARING":
        return "bg-orange-600 text-white";
      case "READY":
        return "bg-emerald-600 text-white";
      case "COMPLETED":
        return "bg-neutral-600 text-white";
      case "CANCELLED":
        return "bg-neutral-400 text-white";
      default:
        return "bg-neutral-500 text-white";
    }
  };

  // 1. Loading screen during auth check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-fursat-black text-fursat-sand flex items-center justify-center font-sans">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-fursat-terracotta" />
          <span className="text-xs tracking-widest uppercase font-semibold">
            Loading Fursat Kitchen System...
          </span>
        </div>
      </div>
    );
  }

  // 2. Kitchen Staff Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-fursat-black text-fursat-sand flex flex-col justify-center items-center px-4 py-8 font-sans">
        <div className="w-full max-w-md bg-fursat-charcoal border border-fursat-camel/40 rounded-3xl p-8 shadow-2xl text-center">
          
          <FursatLogo layout="vertical" size="lg" className="mb-4" />

          <span className="text-[10px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold block">
            Kitchen Management Portal
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">
            Kitchen Staff Login
          </h1>
          <p className="text-xs text-fursat-sand/70 mt-1 font-normal">
            Authorized kitchen &amp; restaurant staff access only
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-fursat-sand font-semibold block mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-muted" />
                <input
                  type="text"
                  required
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="fursat_kitchen or kitchen@fursat.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-fursat-camel/40 text-xs text-white placeholder-fursat-muted focus:outline-none focus:border-fursat-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-fursat-sand font-semibold block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-muted" />
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-fursat-camel/40 text-xs text-white placeholder-fursat-muted focus:outline-none focus:border-fursat-terracotta"
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-700 text-xs text-rose-200">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl btn-primary text-xs uppercase tracking-wider transition-all shadow-md mt-2 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? "Authenticating..." : "Login to Kitchen Dashboard →"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-fursat-camel/20 flex items-center justify-between text-[11px] text-fursat-sand/70">
            <Link href="/" className="hover:text-white transition-colors">
              ← Return to Main Website
            </Link>
            <span>v1.0 Live Ordering</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Kitchen Dashboard
  return (
    <div className="min-h-screen bg-fursat-black text-white flex flex-col font-sans selection:bg-fursat-terracotta/30">
      
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-fursat-charcoal border-b border-fursat-camel/20 px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <FursatLogo layout="horizontal" size="sm" />
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-fursat-green text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Polling
            </span>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              soundEnabled
                ? "bg-fursat-green text-white border-fursat-green"
                : "bg-neutral-800 border-neutral-700 text-neutral-400"
            }`}
            title="Toggle new order alert chime"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{soundEnabled ? "Sound ON" : "Muted"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-Tabs & Filters */}
      <div className="bg-[#141414] border-b border-fursat-camel/15 px-4 sm:px-8 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Main Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-fursat-green text-white shadow-md"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Active Orders ({orders.filter((o) => o.status !== "COMPLETED" && o.status !== "CANCELLED").length})</span>
          </button>

          <button
            onClick={() => setActiveTab("availability")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "availability"
                ? "bg-fursat-green text-white shadow-md"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Item Availability</span>
          </button>
        </div>

        {/* Status Filter Pills (Only on Orders tab) */}
        {activeTab === "orders" && (
          <div className="flex flex-wrap items-center gap-1.5">
            {["ALL", "NEW", "ACCEPTED", "PREPARING", "READY", "COMPLETED"].map((st) => {
              const count = st === "ALL" ? orders.length : orders.filter((o) => o.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-md text-[10.5px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all ${
                    statusFilter === st
                      ? "bg-fursat-sand text-fursat-charcoal shadow-sm"
                      : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <span>{st}</span>
                  <span className="opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Dashboard Canvas */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {activeTab === "orders" ? (
          <div>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-fursat-charcoal rounded-3xl border border-fursat-camel/20">
                <Utensils className="w-12 h-12 text-fursat-camel mx-auto mb-3 opacity-40" />
                <h3 className="text-xl font-bold text-neutral-300">
                  No orders in &ldquo;{statusFilter}&rdquo; status
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Incoming QR customer orders will automatically appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map((order) => {
                  const dateStr = new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={order.id}
                      className={`p-5 rounded-2xl border bg-fursat-charcoal flex flex-col justify-between transition-all ${
                        order.status === "NEW"
                          ? "border-fursat-terracotta shadow-[0_0_20px_rgba(207,75,55,0.3)] ring-1 ring-fursat-terracotta"
                          : order.status === "PREPARING"
                          ? "border-orange-500/60"
                          : order.status === "READY"
                          ? "border-emerald-500/60"
                          : "border-fursat-camel/20 opacity-80"
                      }`}
                    >
                      {/* Card Header */}
                      <div>
                        <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-fursat-terracotta">
                              Table
                            </span>
                            <h2 className="text-2xl font-bold text-white">
                              {order.tableNumber}
                            </h2>
                          </div>

                          <div className="text-right flex flex-col items-end">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${getStatusBadge(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400 mt-1">
                              #{order.id}
                            </span>
                          </div>
                        </div>

                        {/* Customer & Timestamp Info */}
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 py-2 border-b border-neutral-800/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-fursat-camel" />
                            <span>{dateStr}</span>
                          </span>
                          {order.customerName && (
                            <span className="font-medium text-neutral-300 truncate max-w-[140px]">
                              Guest: {order.customerName}
                            </span>
                          )}
                        </div>

                        {/* Ordered Items List */}
                        <div className="py-3 space-y-2">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-neutral-800/80"
                            >
                              <div className="flex-1 pr-2">
                                <span className="text-sm font-semibold text-white block">
                                  {item.name}
                                </span>
                                {item.variant && (
                                  <span className="text-[10px] text-fursat-sand uppercase tracking-wider font-normal">
                                    Option: {item.variant}
                                  </span>
                                )}
                              </div>
                              <span className="font-bold text-base text-fursat-sand bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10 tabular-nums">
                                ×{item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Special Instructions Note if any */}
                        {order.specialInstructions && (
                          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-700/50 text-xs text-amber-200 mt-1 flex items-start gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
                            <div>
                              <span className="font-bold block uppercase text-[9px] tracking-wider text-amber-400">
                                Note from Guest:
                              </span>
                              <span>&ldquo;{order.specialInstructions}&rdquo;</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Footer Status Workflow Buttons */}
                      <div className="mt-4 pt-3 border-t border-neutral-800">
                        {order.status === "NEW" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "ACCEPTED")}
                            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <Check className="w-4 h-4" />
                            <span>Accept Order</span>
                          </button>
                        )}

                        {order.status === "ACCEPTED" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "PREPARING")}
                            className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <Flame className="w-4 h-4" />
                            <span>Start Preparing</span>
                          </button>
                        )}

                        {order.status === "PREPARING" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "READY")}
                            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Mark Ready</span>
                          </button>
                        )}

                        {order.status === "READY" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "COMPLETED")}
                            className="w-full py-2.5 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>Mark Completed</span>
                          </button>
                        )}

                        {order.status === "COMPLETED" && (
                          <div className="text-center text-[11px] text-neutral-500 font-medium py-1">
                            Order Completed
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Item Availability Manager */
          <div className="bg-fursat-charcoal rounded-3xl p-6 border border-fursat-camel/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Menu Item Availability Manager
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Toggle items on/off in real-time if an ingredient runs out in the kitchen.
                </p>
              </div>
              <span className="text-xs text-fursat-sand font-mono">
                {itemsList.length} Total Menu Items
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[70dvh] overflow-y-auto pr-1">
              {itemsList.map((item) => {
                const isAvail = item.available !== false;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                      isAvail
                        ? "bg-black/40 border-neutral-800 text-white"
                        : "bg-rose-950/30 border-rose-900/50 text-rose-300"
                    }`}
                  >
                    <div className="flex-1 truncate">
                      <span className="text-xs font-semibold block truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleItem(item.id, isAvail)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                        isAvail
                          ? "bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800 border border-emerald-700"
                          : "bg-rose-900/80 text-rose-200 hover:bg-rose-800 border border-rose-700"
                      }`}
                    >
                      {isAvail ? "Available" : "Disabled"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
