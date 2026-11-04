"use client";

import React, { useState, useEffect } from "react";
import {
  Store,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Megaphone,
} from "lucide-react";
import { RestaurantInfo } from "@/lib/contentStore";

export default function AdminRestaurantInfoPage() {
  const [info, setInfo] = useState<RestaurantInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [hoursDetail, setHoursDetail] = useState<{ days: string; hours: string }[]>([]);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success && data.data?.restaurantInfo) {
        const r = data.data.restaurantInfo as RestaurantInfo;
        setInfo(r);
        setName(r.name || "Fursat Kitchen & Bar");
        setTagline(r.tagline || "");
        setPhone(r.phone || "");
        setWhatsapp(r.whatsapp || "");
        setEmail(r.email || "");
        setAddress(r.address || "");
        setGoogleMapsUrl(r.googleMapsUrl || "");
        setOpeningHours(r.openingHours || "");
        setHoursDetail(r.hoursDetail || []);
        setInstagram(r.instagram || "");
        setFacebook(r.facebook || "");
        setAnnouncement(r.announcement || "");
      }
    } catch (err) {
      console.error("Failed to load restaurant info:", err);
      setStatusMsg({ type: "error", text: "Failed to load restaurant info." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleAddHourRow = () => {
    setHoursDetail([...hoursDetail, { days: "Monday – Sunday", hours: "12:00 PM – 11:30 PM" }]);
  };

  const handleRemoveHourRow = (index: number) => {
    setHoursDetail(hoursDetail.filter((_, i) => i !== index));
  };

  const handleUpdateHourRow = (index: number, field: "days" | "hours", value: string) => {
    const updated = [...hoursDetail];
    updated[index][field] = value;
    setHoursDetail(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setStatusMsg({ type: "error", text: "Restaurant name and phone are required." });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      const payload: RestaurantInfo = {
        name: name.trim(),
        tagline: tagline.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        address: address.trim(),
        googleMapsUrl: googleMapsUrl.trim(),
        openingHours: openingHours.trim(),
        hoursDetail,
        instagram: instagram.trim(),
        facebook: facebook.trim(),
        announcement: announcement.trim(),
      };

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "restaurantInfo",
          data: payload,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update restaurant info");

      setInfo(payload);
      setStatusMsg({ type: "success", text: "Restaurant details and contact info saved successfully!" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save changes." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-sans text-[#817468]">
        Loading restaurant information...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="pb-5 border-b border-fursat-hairline">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.2em] text-fursat-terracotta">
            General Establishment &amp; Contacts
          </span>
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-fursat-green">
          Restaurant Information &amp; Hours
        </h1>
        <p className="text-xs text-fursat-muted font-sans mt-0.5">
          Update public contact numbers, opening hours, address, maps location, and social media handles.
        </p>
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
        
        {/* Restaurant Name & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Restaurant Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Tagline / Headline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
          </div>
        </div>

        {/* Contact Numbers & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Primary Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="090596 70033"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              WhatsApp Order / Enquiry No.
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="919059670033"
              className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@fursatkitchenbar.in"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>
        </div>

        {/* Address & Maps Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Physical Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-fursat-camel" />
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Capital Pk Road, Ayyappa Society, VIP Hills, Madhapur, Hyderabad..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Google Maps URL
            </label>
            <input
              type="text"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
            <p className="text-[10.5px] text-fursat-muted mt-1">
              Used for &quot;Get Directions&quot; on footer and location cards.
            </p>
          </div>
        </div>

        {/* Opening Hours Overview & Schedule Rows */}
        <div className="p-4 bg-fursat-sand-alt rounded-2xl border border-fursat-hairline space-y-4">
          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              General Opening Hours Headline
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="Open Daily: 12:00 PM – 11:30 PM"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-white border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block text-[11px]">
                Detailed Timings (Kitchen Last Call, Bar, Dining)
              </label>
              <button
                type="button"
                onClick={handleAddHourRow}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-fursat-green hover:underline"
              >
                <Plus className="w-3 h-3" />
                <span>Add Schedule Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {hoursDetail.map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={row.days}
                    onChange={(e) => handleUpdateHourRow(idx, "days", e.target.value)}
                    placeholder="e.g. Kitchen Last Call"
                    className="w-1/2 px-3 py-1.5 rounded-xl bg-fursat-white border border-fursat-hairline text-xs text-fursat-charcoal"
                  />
                  <input
                    type="text"
                    value={row.hours}
                    onChange={(e) => handleUpdateHourRow(idx, "hours", e.target.value)}
                    placeholder="e.g. 11:00 PM"
                    className="w-1/2 px-3 py-1.5 rounded-xl bg-fursat-white border border-fursat-hairline text-xs text-fursat-charcoal"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHourRow(idx)}
                    className="p-1.5 rounded-lg text-fursat-muted hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Instagram Profile URL
            </label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/fursatkitchenbar"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
              Facebook Profile URL
            </label>
            <div className="relative">
              <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-camel" />
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/fursatkitchenbar"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
              />
            </div>
          </div>
        </div>

        {/* Top Announcement Banner */}
        <div>
          <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
            Announcement / Seasonal Notification
          </label>
          <div className="relative">
            <Megaphone className="absolute left-3 top-3 w-4 h-4 text-fursat-camel" />
            <textarea
              rows={2}
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="e.g. Now accepting reservations for corporate gatherings & festive banquets!"
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
            />
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
            <span>{saving ? "Saving Changes..." : "Save Restaurant Info"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
