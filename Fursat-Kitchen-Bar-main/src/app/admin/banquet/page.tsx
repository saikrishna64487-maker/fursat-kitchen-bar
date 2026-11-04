"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Users,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { BanquetInfo } from "@/lib/contentStore";

export default function AdminBanquetPage() {
  const [banquet, setBanquet] = useState<BanquetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);

  const fetchBanquet = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success && data.data?.banquet) {
        const b = data.data.banquet as BanquetInfo;
        setBanquet(b);
        setTitle(b.title || "");
        setSubtitle(b.subtitle || "");
        setCapacity(b.capacity || "");
        setDescription(b.description || "");
        setFeatures(b.features || []);
        setPhone(b.phone || "");
        setEmail(b.email || "");
        setActive(b.active !== false);
      }
    } catch (err) {
      console.error("Failed to load banquet info:", err);
      setStatusMsg({ type: "error", text: "Failed to load banquet data." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanquet();
  }, []);

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFeatures([...features, newFeatureText.trim()]);
    setNewFeatureText("");
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMsg({ type: "error", text: "Banquet title is required." });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      const payload: BanquetInfo = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        capacity: capacity.trim(),
        description: description.trim(),
        features,
        phone: phone.trim(),
        email: email.trim(),
        active,
      };

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "banquet",
          data: payload,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update banquet info");

      setBanquet(payload);
      setStatusMsg({ type: "success", text: "Banquet Hall details updated successfully!" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save changes." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-sans text-[#817468]">
        Loading banquet hall information...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-fursat-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.2em] text-fursat-terracotta">
              Private Banquet Facilities
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-fursat-green">
            Banquet Hall Management
          </h1>
          <p className="text-xs text-fursat-muted font-sans mt-0.5">
            Update on-site banquet hall specs, capacity, sound/decor amenities, and direct booking lines.
          </p>
        </div>

        <button
          onClick={() => setActive(!active)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-bold transition-all ${
            active
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-stone-200 text-stone-600 border border-stone-300"
          }`}
        >
          {active ? (
            <>
              <ToggleRight className="w-4 h-4 text-emerald-700" />
              <span>Section Enabled</span>
            </>
          ) : (
            <>
              <ToggleLeft className="w-4 h-4 text-stone-500" />
              <span>Section Paused</span>
            </>
          )}
        </button>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-sans flex items-center justify-between gap-2 animate-in fade-in ${
            statusMsg.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
              : "bg-rose-50 border border-rose-300 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-fursat-green flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="bg-fursat-white rounded-3xl border border-fursat-hairline p-6 sm:p-8 shadow-sm space-y-6 text-xs font-sans">
        
        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Banquet Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. On-Site Banquet Hall"
              className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Location / Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Madhapur, Hyderabad"
              className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
          </div>
        </div>

        {/* Capacity & Direct Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Guest Capacity
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g. Up to 150+ Seated Guests"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Enquiry Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 90596 70033"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Enquiry Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. banquet@fursat.in"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div>
          <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
            Overview &amp; Experience Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed hospitality overview of the banquet hall..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
          />
        </div>

        {/* Highlight Features / Bullet points */}
        <div>
          <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-2">
            Hall Amenities &amp; Key Highlights
          </label>

          <div className="space-y-2 mb-3">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-fursat-terracotta" />
                  <span className="text-xs text-fursat-charcoal font-medium">{feat}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="p-1 rounded-md text-fursat-muted hover:text-rose-600 hover:bg-rose-50"
                  title="Remove Feature"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newFeatureText}
              onChange={(e) => setNewFeatureText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              placeholder="Type new highlight (e.g. Valet Parking, Dedicated Audio System)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 rounded-xl bg-fursat-sand hover:bg-fursat-sand-alt border border-fursat-hairline text-xs font-semibold text-fursat-charcoal flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-fursat-terracotta" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-4 border-t border-fursat-hairline flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-fursat-white" />
            <span>{saving ? "Saving Changes..." : "Save Banquet Info"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
