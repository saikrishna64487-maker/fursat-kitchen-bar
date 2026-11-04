"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  X,
  CheckCircle2,
  Utensils,
  ChevronRight,
  Edit3,
  Sparkles,
  Info,
  Clock,
  Coffee,
  Wine,
  Flame,
  Leaf,
  Filter,
  Check,
} from "lucide-react";
import { ALL_MENU_ITEMS, MENU_CATEGORIES, MenuItem, MenuItemVariant } from "@/data/menuData";
import FursatLogo from "@/components/FursatLogo";

interface CartItem {
  menuItemId: string;
  item: MenuItem;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
}

export default function MenuClient() {
  // Table state
  const [tableNumber, setTableNumber] = useState<string>("");
  const [tableInput, setTableInput] = useState<string>("");
  const [showTableModal, setShowTableModal] = useState<boolean>(false);
  const [tableError, setTableError] = useState<string>("");

  // Menu data & availability
  const [items, setItems] = useState<MenuItem[]>(ALL_MENU_ITEMS);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");

  // Variant selection modal for items with multiple options
  const [variantModalItem, setVariantModalItem] = useState<MenuItem | null>(null);

  // Cart & Order states
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Load table from sessionStorage and fetch latest availability on mount
  useEffect(() => {
    const savedTable = sessionStorage.getItem("fursat_table_number");
    if (savedTable) {
      setTableNumber(savedTable);
      setTableInput(savedTable);
      setShowTableModal(false);
    } else {
      setShowTableModal(true);
    }

    // Fetch availability from API
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch((err) => console.error("Could not fetch latest menu:", err));
  }, []);

  const handleSaveTable = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = tableInput.trim();
    if (!clean) {
      setTableError("Please enter your table number to proceed.");
      return;
    }
    const formatted = clean.toUpperCase().replace(/^TABLE\s*/i, "");
    setTableNumber(formatted);
    sessionStorage.setItem("fursat_table_number", formatted);
    setShowTableModal(false);
    setTableError("");
  };

  // Cart helpers
  const getCartKey = (itemId: string, variantId?: string) => {
    return variantId ? `${itemId}__${variantId}` : itemId;
  };

  const addToCart = (item: MenuItem, variant?: MenuItemVariant) => {
    const key = getCartKey(item.id, variant?.id);
    const itemPrice = variant ? variant.price : item.price || 0;

    setCart((prev) => {
      const existing = prev[key];
      const newQty = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [key]: {
          menuItemId: item.id,
          item,
          variantId: variant?.id,
          variantName: variant?.name,
          price: itemPrice,
          quantity: newQty,
        },
      };
    });

    if (variantModalItem) setVariantModalItem(null);
  };

  const updateQuantity = (key: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[key];
      if (!existing) return prev;

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[key];
        return next;
      }

      return {
        ...prev,
        [key]: { ...existing, quantity: newQty },
      };
    });
  };

  // Total item count
  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Diet filter
      if (dietFilter === "veg" && item.isVeg === false) return false;
      if (dietFilter === "non-veg" && item.isVeg === true) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchVariants = item.variants?.some((v) => v.name.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat && !matchVariants) return false;
      }

      return true;
    });
  }, [items, selectedCategory, dietFilter, searchQuery]);

  // Group filtered items by category for clear reading
  const groupedItems = useMemo(() => {
    const groups: { category: (typeof MENU_CATEGORIES)[0]; items: MenuItem[] }[] = [];

    for (const cat of MENU_CATEGORIES) {
      const catItems = filteredItems.filter((i) => i.category === cat.id);
      if (catItems.length > 0) {
        groups.push({ category: cat, items: catItems });
      }
    }

    return groups;
  }, [filteredItems]);

  // Handle category tab change & scroll
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId !== "all") {
      const el = document.getElementById(`cat-${catId}`);
      if (el) {
        const yOffset = -140;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Handle Order Submit
  const handlePlaceOrder = async () => {
    if (!tableNumber) {
      setShowOrderModal(false);
      setShowTableModal(true);
      return;
    }

    if (totalCartCount === 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    const orderPayload = {
      tableNumber,
      customerName: customerName.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      items: Object.values(cart).map((ci) => ({
        menuItemId: ci.menuItemId,
        quantity: ci.quantity,
        variant: ci.variantId,
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to place order.");
      }

      // Success
      setConfirmedOrder(data.order);
      setCart({});
      setShowOrderModal(false);
      setSpecialInstructions("");
    } catch (err: any) {
      console.error("Order error:", err);
      setSubmitError(err.message || "Failed to submit order. Please alert the staff.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-fursat-sand text-fursat-charcoal flex flex-col font-sans selection:bg-fursat-terracotta/20 pb-32">
      
      {/* ========================================================================= */}
      {/* 1. TOP EDITORIAL RESTAURANT HEADER                                        */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-fursat-sand/95 backdrop-blur-xl border-b border-fursat-camel/40 shadow-sm transition-all">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2.5">
          
          {/* Top Row: Brand Center Anchor & Table Selector */}
          <div className="flex items-center justify-between">
            {/* Left: Back to Home Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider text-fursat-muted hover:text-fursat-charcoal transition-colors"
            >
              <span>←</span>
              <span className="hidden sm:inline">EXPERIENCE</span>
            </Link>

            {/* Center Brand Identity */}
            <Link href="/" className="flex items-center justify-center transform hover:scale-[1.02] transition-transform">
              <FursatLogo layout="vertical" size="sm" />
            </Link>

            {/* Right: Table Number Status Pill */}
            <button
              onClick={() => {
                setTableInput(tableNumber);
                setShowTableModal(true);
              }}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-fursat-camel shadow-sm hover:border-fursat-green hover:shadow-md transition-all text-left"
              title="Click to change your table number"
            >
              <span className="w-2 h-2 rounded-full bg-fursat-green animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-fursat-charcoal uppercase">
                {tableNumber ? `TABLE ${tableNumber}` : "SET TABLE"}
              </span>
              <Edit3 className="w-3 h-3 text-fursat-camel group-hover:text-fursat-green transition-colors" />
            </button>
          </div>

          {/* Editorial Headline & Search Input */}
          <div className="mt-3 sm:mt-4 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-fursat-green">
              What are you craving?
            </h1>
            <p className="text-xs sm:text-sm text-fursat-muted mt-0.5 font-normal">
              Handcrafted Culinary Selections & Artisan Mixology · Direct Kitchen Ordering
            </p>
          </div>

          {/* Search Field & Dietary Filter Segments */}
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center gap-2.5 max-w-4xl mx-auto w-full">
            
            {/* Search Input Box */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, biryani, cocktails, coffee..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-fursat-hairline text-xs sm:text-sm text-fursat-charcoal placeholder-fursat-muted/70 focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fursat-muted hover:text-fursat-charcoal p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Veg / Non-Veg Segmented Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-fursat-sand-alt border border-fursat-camel/40 self-center">
              {/* ALL */}
              <button
                onClick={() => setDietFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all ${
                  dietFilter === "all"
                    ? "bg-fursat-green text-white shadow-sm"
                    : "text-fursat-green hover:text-fursat-charcoal"
                }`}
              >
                All
              </button>

              {/* VEG */}
              <button
                onClick={() => setDietFilter("veg")}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all ${
                  dietFilter === "veg"
                    ? "bg-fursat-green text-white shadow-sm"
                    : "bg-white text-fursat-green border border-fursat-green/40 hover:bg-fursat-green/10"
                }`}
              >
                <span className="w-3.5 h-3.5 border border-fursat-green rounded-sm flex items-center justify-center p-0.5 bg-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-fursat-green" />
                </span>
                <span>Veg</span>
              </button>

              {/* NON-VEG */}
              <button
                onClick={() => setDietFilter("non-veg")}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all ${
                  dietFilter === "non-veg"
                    ? "bg-fursat-terracotta text-white shadow-sm"
                    : "bg-white text-fursat-terracotta border border-fursat-terracotta/40 hover:bg-fursat-terracotta/10"
                }`}
              >
                <span className="w-3.5 h-3.5 border border-fursat-terracotta rounded-sm flex items-center justify-center p-0.5 bg-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-fursat-terracotta" />
                </span>
                <span>Non-Veg</span>
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable Category Filter Pills */}
          <div
            ref={categoryScrollRef}
            className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth max-w-6xl mx-auto"
          >
            {/* ALL ITEMS Pill */}
            <button
              onClick={() => handleSelectCategory("all")}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCategory === "all"
                  ? "bg-fursat-green text-white shadow-md"
                  : "bg-white text-fursat-green border border-fursat-camel hover:bg-fursat-sand-alt"
              }`}
            >
              All Items ({items.length})
            </button>

            {/* Individual Categories */}
            {MENU_CATEGORIES.map((cat) => {
              const count = items.filter((i) => i.category === cat.id).length;
              if (count === 0) return null;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all ${
                    isSelected
                      ? "bg-fursat-green text-white shadow-md"
                      : "bg-white text-fursat-green border border-fursat-camel hover:bg-fursat-sand-alt"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? "bg-white/25 text-white" : "bg-fursat-sand text-fursat-charcoal"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN EDITORIAL RESTAURANT MENU CONTENT                                 */}
      {/* ========================================================================= */}
      <main className="max-w-6xl 2xl:max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 flex-1">
        
        {groupedItems.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-fursat-hairline mt-4 shadow-sm max-w-xl mx-auto">
            <Utensils className="w-12 h-12 text-fursat-camel mx-auto mb-3 opacity-60" />
            <h3 className="text-xl sm:text-2xl text-fursat-charcoal font-bold">
              No Dishes Match Your Search
            </h3>
            <p className="text-xs sm:text-sm text-fursat-muted mt-1.5 max-w-md mx-auto">
              We couldn&apos;t find any dishes matching &ldquo;{searchQuery}&rdquo;. Try checking the spelling or resetting the diet filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setDietFilter("all");
              }}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider btn-primary shadow-md transition-all"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {groupedItems.map(({ category, items: catItems }) => (
              <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-40">
                
                {/* Section Header: H2 in Terracotta with Camel Tan divider */}
                <div className="border-b border-fursat-camel/40 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-fursat-terracotta flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-semibold text-fursat-terracotta tracking-tight">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 self-start sm:self-auto pl-5 sm:pl-0">
                    <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-fursat-terracotta">
                      {catItems.length} {catItems.length === 1 ? "SELECTION" : "SELECTIONS"}
                    </span>
                  </div>
                </div>

                {/* 2-Column Responsive Food Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 xl:gap-6">
                  {catItems.map((item) => {
                    const isAvailable = item.available !== false;
                    const hasVariants = item.variants && item.variants.length > 0;

                    // Calculate total quantity of this item currently in cart
                    const itemCartQty = Object.values(cart)
                      .filter((ci) => ci.menuItemId === item.id)
                      .reduce((sum, ci) => sum + ci.quantity, 0);

                    // Single cart key
                    const singleCartKey = item.id;
                    const singleCartItem = cart[singleCartKey];

                    return (
                      <div
                        key={item.id}
                        className={`group relative p-5 sm:p-6 rounded-2xl border bg-white transition-all duration-300 flex flex-col justify-between ${
                          !isAvailable
                            ? "opacity-60 border-neutral-300 bg-neutral-100/80"
                            : "border-fursat-hairline hover:border-fursat-camel shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        }`}
                      >
                        {/* Upper Content Area */}
                        <div>
                          
                          {/* Top Row: Veg Indicator + Category / Item # */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {/* Refined Square Veg / Non-Veg Indicator */}
                              {item.isVeg !== undefined && (
                                <span
                                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-semibold tracking-wider uppercase ${
                                    item.isVeg
                                      ? "border-fursat-green bg-emerald-50 text-fursat-green"
                                      : "border-fursat-terracotta bg-rose-50 text-fursat-terracotta"
                                  }`}
                                  title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      item.isVeg ? "bg-fursat-green" : "bg-fursat-terracotta"
                                    }`}
                                  />
                                  <span>{item.isVeg ? "VEG" : "NON-VEG"}</span>
                                </span>
                              )}

                              {item.sNo && (
                                <span className="text-[10px] text-fursat-muted tracking-wide font-medium">
                                  #{item.sNo}
                                </span>
                              )}
                            </div>

                            {/* SubCategory if present */}
                            {item.subCategory && (
                              <span className="text-[10px] text-fursat-muted font-medium tracking-wider uppercase">
                                {item.subCategory}
                              </span>
                            )}
                          </div>

                          {/* Food Name & Price Hero Row */}
                          <div className="flex items-start justify-between gap-3 mt-1">
                            {/* Food Item Name: Poppins Medium 500 18px/16px Charcoal */}
                            <h3 className="text-base sm:text-lg font-medium text-fursat-charcoal leading-snug group-hover:text-fursat-green transition-colors">
                              {item.name}
                            </h3>

                            {/* Prominent Price: Poppins Medium 500 18px/16px Charcoal */}
                            <div className="text-right flex-shrink-0 tabular-nums">
                              {hasVariants ? (
                                <div className="text-base sm:text-lg font-medium text-fursat-charcoal">
                                  <span className="text-[11px] font-normal text-fursat-muted block leading-none -mb-0.5">
                                    from
                                  </span>
                                  ₹{Math.min(...item.variants!.map((v) => v.price))}
                                </div>
                              ) : (
                                <div className="text-base sm:text-lg font-medium text-fursat-charcoal">
                                  ₹{item.price}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Authentic Description: Poppins Regular 400 16px/15px Muted Grey */}
                          {item.description && (
                            <p className="text-xs sm:text-[14px] text-fursat-muted leading-relaxed mt-2 line-clamp-2">
                              {item.description}
                            </p>
                          )}

                          {/* Variants Option Pills if present */}
                          {hasVariants && (
                            <div className="flex flex-wrap gap-1.5 mt-3 pt-1">
                              {item.variants!.map((v) => {
                                const variantKey = getCartKey(item.id, v.id);
                                const vQty = cart[variantKey]?.quantity || 0;
                                return (
                                  <button
                                    key={v.id}
                                    onClick={() => isAvailable && addToCart(item, v)}
                                    disabled={!isAvailable}
                                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all border ${
                                      vQty > 0
                                        ? "bg-fursat-green text-white border-fursat-green shadow-sm"
                                        : "bg-fursat-sand-alt/50 text-fursat-charcoal border-fursat-camel/50 hover:border-fursat-green"
                                    }`}
                                  >
                                    <span>{v.name}</span>
                                    <span className="font-medium text-fursat-charcoal group-hover:text-current tabular-nums">
                                      ₹{v.price}
                                    </span>
                                    {vQty > 0 && (
                                      <span className="bg-white/25 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                                        ×{vQty}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Bottom Row: Action */}
                        <div className="mt-4 pt-3 border-t border-fursat-hairline flex items-center justify-between">
                          {!isAvailable ? (
                            <span className="text-xs text-fursat-terracotta font-semibold italic">
                              Currently Unavailable
                            </span>
                          ) : hasVariants ? (
                            <button
                              onClick={() => setVariantModalItem(item)}
                              className="w-full py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-fursat-sand-alt hover:bg-fursat-green text-fursat-charcoal hover:text-white border border-fursat-camel/50 hover:border-fursat-green transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>
                                {itemCartQty > 0
                                  ? `Options Selected (${itemCartQty})`
                                  : "Select Options"}
                              </span>
                            </button>
                          ) : singleCartItem ? (
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-semibold text-fursat-green flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>In Your Order</span>
                              </span>

                              {/* Compact Quantity Stepper */}
                              <div className="flex items-center gap-2 bg-fursat-sand-alt border border-fursat-camel/40 rounded-full px-1.5 py-0.5 shadow-sm">
                                <button
                                  onClick={() => updateQuantity(singleCartKey, -1)}
                                  className="w-6 h-6 rounded-full bg-white hover:bg-fursat-sand text-fursat-charcoal flex items-center justify-center font-bold transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-semibold px-2 text-fursat-charcoal tabular-nums">
                                  {singleCartItem.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(singleCartKey, 1)}
                                  className="w-6 h-6 rounded-full bg-fursat-terracotta hover:bg-fursat-terracotta-dark text-white flex items-center justify-center font-bold transition-colors shadow-sm"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs text-fursat-muted font-normal">
                                Ready to order
                              </span>
                              <button
                                onClick={() => addToCart(item)}
                                className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-fursat-terracotta hover:bg-fursat-terracotta-dark text-white shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 transform active:scale-95"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Order</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3. STICKY FLOATING BOTTOM ORDER BAR                                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {totalCartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none"
          >
            <div className="max-w-2xl mx-auto pointer-events-auto">
              <button
                onClick={() => setShowOrderModal(true)}
                className="w-full py-3.5 px-6 rounded-full bg-fursat-terracotta hover:bg-fursat-terracotta-dark text-white shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xs text-white tabular-nums">
                    {totalCartCount}
                  </div>
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block text-white">
                      {totalCartCount} {totalCartCount === 1 ? "Item" : "Items"} Selected
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-fursat-sand font-normal block">
                      Table {tableNumber || "--"} • Ready to Send
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                  <span>View Order</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 4. TABLE IDENTIFICATION MODAL                                             */}
      {/* ========================================================================= */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-fursat-sand rounded-3xl border border-fursat-camel shadow-2xl p-6 sm:p-7 text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Fursat Brand Emblem & Logotype */}
            <FursatLogo layout="vertical" size="lg" className="mb-3" />
            <h2 className="text-2xl font-bold text-fursat-green">
              Welcome to Fursat
            </h2>
            <p className="text-xs text-fursat-muted mt-1">
              Please enter your table number to view the digital menu and place your order.
            </p>

            <form onSubmit={handleSaveTable} className="mt-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={tableInput}
                  onChange={(e) => {
                    setTableInput(e.target.value);
                    if (tableError) setTableError("");
                  }}
                  placeholder="e.g. 01, 12, T-5"
                  className="w-full text-center text-2xl font-bold py-3 rounded-2xl bg-white border-2 border-fursat-camel text-fursat-charcoal placeholder-fursat-muted/40 focus:outline-none focus:border-fursat-green uppercase tracking-widest shadow-inner"
                />
              </div>

              {tableError && (
                <p className="text-xs text-fursat-terracotta font-semibold">{tableError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full btn-primary text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
              >
                Continue to Menu →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VARIANT SELECTION MODAL                                                */}
      {/* ========================================================================= */}
      {variantModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-fursat-sand rounded-3xl border border-fursat-camel shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-fursat-camel/40 pb-3">
              <div>
                <h3 className="text-lg font-bold text-fursat-green">
                  {variantModalItem.name}
                </h3>
                <p className="text-xs text-fursat-muted">Select your preferred option</p>
              </div>
              <button
                onClick={() => setVariantModalItem(null)}
                className="p-1.5 rounded-full hover:bg-fursat-sand-alt text-fursat-muted hover:text-fursat-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 mt-5">
              {variantModalItem.variants?.map((v) => {
                const key = getCartKey(variantModalItem.id, v.id);
                const qty = cart[key]?.quantity || 0;
                return (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-fursat-hairline hover:border-fursat-camel"
                  >
                    <div>
                      <span className="text-sm font-medium text-fursat-charcoal block">
                        {v.name}
                      </span>
                      <span className="text-sm font-medium text-fursat-charcoal tabular-nums">
                        ₹{v.price}
                      </span>
                    </div>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-fursat-sand-alt border border-fursat-camel/40 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(key, -1)}
                          className="w-7 h-7 rounded-full bg-white text-fursat-charcoal flex items-center justify-center font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1.5 tabular-nums">{qty}</span>
                        <button
                          onClick={() => updateQuantity(key, 1)}
                          className="w-7 h-7 rounded-full bg-fursat-terracotta text-white flex items-center justify-center font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(variantModalItem, v)}
                        className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-fursat-terracotta text-white hover:bg-fursat-terracotta-dark"
                      >
                        Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setVariantModalItem(null)}
              className="w-full mt-5 py-3 rounded-full bg-fursat-sand-alt text-fursat-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-fursat-camel/30 border border-fursat-camel/40"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ORDER REVIEW DRAWER / MODAL (DIRECT KITCHEN ORDER SUBMISSION)          */}
      {/* ========================================================================= */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-lg bg-fursat-sand rounded-t-3xl sm:rounded-3xl border border-fursat-camel shadow-2xl flex flex-col max-h-[90dvh] animate-in slide-in-from-bottom duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-fursat-camel/40 flex items-center justify-between">
              <div>
                <span className="text-[12px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold block">
                  Kitchen Order Review
                </span>
                <h3 className="text-xl font-bold text-fursat-green">
                  TABLE {tableNumber}
                </h3>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 rounded-full hover:bg-fursat-sand-alt text-fursat-muted hover:text-fursat-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Items List */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {Object.values(cart).map((ci) => {
                const key = getCartKey(ci.menuItemId, ci.variantId);
                return (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-white border border-fursat-hairline flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-fursat-charcoal">
                        {ci.item.name}
                      </h4>
                      {ci.variantName && (
                        <span className="text-xs text-fursat-muted font-normal block">
                          Option: {ci.variantName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 bg-fursat-sand-alt border border-fursat-camel/40 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(key, -1)}
                        className="w-7 h-7 rounded-full bg-white hover:bg-fursat-sand text-fursat-charcoal flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-2 text-fursat-charcoal tabular-nums">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(key, 1)}
                        className="w-7 h-7 rounded-full bg-fursat-terracotta hover:bg-fursat-terracotta-dark text-white flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Optional Customer Inputs */}
              <div className="pt-3 space-y-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name for order reference"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-fursat-hairline text-xs sm:text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1">
                    Special Instructions for Kitchen (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Less spicy, extra lemon, no onions..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-fursat-hairline text-xs sm:text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green resize-none"
                  />
                </div>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-fursat-terracotta font-medium">
                  {submitError}
                </div>
              )}
            </div>

            {/* Modal Footer / Submit Action */}
            <div className="p-5 border-t border-fursat-camel/40 bg-white/80">
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || totalCartCount === 0}
                className="w-full py-4 rounded-full btn-primary font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending to Kitchen...</span>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-white" />
                    <span>Place Order ({totalCartCount} Items)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. ORDER RECEIVED CONFIRMATION SCREEN                                     */}
      {/* ========================================================================= */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-fursat-sand rounded-3xl border border-fursat-camel shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-fursat-green flex items-center justify-center mx-auto mb-4 border border-emerald-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[12px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold block">
              Order Sent to Kitchen
            </span>
            <h2 className="text-2xl font-bold text-fursat-green mt-1">
              TABLE {confirmedOrder.tableNumber}
            </h2>

            <div className="mt-2 py-1 px-3 bg-fursat-sand-alt rounded-full inline-block">
              <span className="text-xs font-mono font-bold text-fursat-charcoal">
                Order ID: #{confirmedOrder.id}
              </span>
            </div>

            <p className="text-xs text-fursat-muted mt-3 leading-relaxed">
              Your order has been received by our chefs and is being prepared in the kitchen.
            </p>

            {/* Ordered Items Summary */}
            <div className="mt-4 p-4 bg-white rounded-2xl border border-fursat-hairline text-left text-xs max-h-48 overflow-y-auto space-y-1.5">
              {confirmedOrder.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between border-b border-fursat-hairline pb-1">
                  <span className="font-medium text-fursat-charcoal">{item.name}</span>
                  <span className="font-semibold text-fursat-green tabular-nums">× {item.quantity}</span>
                </div>
              ))}
              {confirmedOrder.specialInstructions && (
                <p className="text-[11px] text-fursat-muted pt-1 italic">
                  Note: &ldquo;{confirmedOrder.specialInstructions}&rdquo;
                </p>
              )}
            </div>

            <button
              onClick={() => setConfirmedOrder(null)}
              className="w-full mt-6 py-3.5 rounded-full btn-primary text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
