"use client";

import React, { useState, useEffect } from "react";
import {
  Percent,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { OfferItem } from "@/lib/contentStore";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formDiscount, setFormDiscount] = useState<number>(10);
  const [formLabel, setFormLabel] = useState("");
  const [formStart, setFormStart] = useState("12:00");
  const [formEnd, setFormEnd] = useState("23:30");
  const [formDescription, setFormDescription] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [saving, setSaving] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers || []);
      }
    } catch (err) {
      console.error("Failed to load offers:", err);
      setStatusMsg({ type: "error", text: "Failed to load offers." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const openAddModal = () => {
    setEditingOffer(null);
    setFormName("");
    setFormDiscount(15);
    setFormLabel("Special Offer");
    setFormStart("12:00");
    setFormEnd("23:30");
    setFormDescription("");
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (offer: OfferItem) => {
    setEditingOffer(offer);
    setFormName(offer.name);
    setFormDiscount(offer.discountPct);
    setFormLabel(offer.label || "");
    setFormStart(offer.start || "12:00");
    setFormEnd(offer.end || "23:30");
    setFormDescription(offer.description || "");
    setFormActive(offer.active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setStatusMsg({ type: "error", text: "Offer title is required." });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      if (editingOffer) {
        // Edit existing
        const res = await fetch("/api/admin/offers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingOffer.id,
            name: formName,
            discountPct: Number(formDiscount),
            label: formLabel,
            start: formStart,
            end: formEnd,
            description: formDescription,
            active: formActive,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update offer");
        setStatusMsg({ type: "success", text: "Offer updated successfully!" });
      } else {
        // Create new
        const res = await fetch("/api/admin/offers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            discountPct: Number(formDiscount),
            label: formLabel,
            start: formStart,
            end: formEnd,
            description: formDescription,
            active: formActive,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create offer");
        setStatusMsg({ type: "success", text: "New offer created successfully!" });
      }

      setIsModalOpen(false);
      fetchOffers();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save offer." });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (offer: OfferItem) => {
    try {
      const updatedActive = !offer.active;
      const res = await fetch("/api/admin/offers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: offer.id,
          active: updatedActive,
        }),
      });
      if (res.ok) {
        setOffers((prev) =>
          prev.map((o) => (o.id === offer.id ? { ...o, active: updatedActive } : o))
        );
        setStatusMsg({
          type: "success",
          text: `Offer "${offer.name}" ${updatedActive ? "activated" : "deactivated"}.`,
        });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to toggle status." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/offers?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setDeleteConfirmId(null);
      setStatusMsg({ type: "success", text: "Offer removed successfully." });
      fetchOffers();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to delete offer." });
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-fursat-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-fursat-terracotta">
              Website Live Promotions
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-fursat-green">
            Offers &amp; Discounts Manager
          </h1>
          <p className="text-xs text-fursat-muted mt-0.5">
            Manage time-slotted discount percentages and active promotions shown across the public Fursat website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full btn-primary text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Offer</span>
        </button>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center justify-between gap-2 animate-in fade-in ${
            statusMsg.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-fursat-green"
              : "bg-rose-50 border border-rose-300 text-fursat-terracotta"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-fursat-green flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="opacity-70 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Offers Table / Card List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-fursat-muted">
          Loading active offers...
        </div>
      ) : offers.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-fursat-hairline text-center">
          <Percent className="w-10 h-10 text-fursat-camel mx-auto mb-2 opacity-50" />
          <h3 className="text-lg font-bold text-fursat-charcoal">No Offers Configured</h3>
          <p className="text-xs text-fursat-muted mt-1 mb-4">
            Click &quot;Add New Offer&quot; above to create a time-slotted dining discount.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-fursat-hairline shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-fursat-hairline bg-fursat-sand text-[10.5px] font-semibold uppercase tracking-widest text-fursat-charcoal">
                  <th className="py-3.5 px-4 sm:px-6">Offer Name &amp; Details</th>
                  <th className="py-3.5 px-4 text-center">Discount</th>
                  <th className="py-3.5 px-4">Timing Slot</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fursat-hairline text-xs">
                {offers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-fursat-sand/50 transition-colors">
                    
                    {/* Name & description */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="text-sm font-semibold text-fursat-charcoal">
                        {offer.name}
                      </div>
                      <div className="text-[11px] text-fursat-terracotta font-semibold mt-0.5">
                        {offer.label}
                      </div>
                      {offer.description && (
                        <p className="text-[11px] text-fursat-muted mt-1 max-w-sm line-clamp-1">
                          {offer.description}
                        </p>
                      )}
                    </td>

                    {/* Discount Badge */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-fursat-terracotta/10 text-fursat-terracotta border border-fursat-terracotta/20">
                        {offer.discountPct}% OFF
                      </span>
                    </td>

                    {/* Timing */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-fursat-charcoal font-medium">
                        <Clock className="w-3.5 h-3.5 text-fursat-camel" />
                        <span>{offer.start} – {offer.end}</span>
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(offer)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                          offer.active
                            ? "bg-emerald-100 text-fursat-green"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {offer.active ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-fursat-green" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-stone-400" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 sm:px-6 text-right space-x-1.5">
                      <button
                        onClick={() => openEditModal(offer)}
                        className="p-1.5 rounded-lg text-fursat-muted hover:text-fursat-green hover:bg-fursat-sand transition-colors"
                        title="Edit Offer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {deleteConfirmId === offer.id ? (
                        <div className="inline-flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-300">
                          <span className="text-[10px] text-rose-800 font-bold px-1">Sure?</span>
                          <button
                            onClick={() => handleDelete(offer.id)}
                            className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-1.5 py-0.5 text-stone-500 hover:text-stone-800 text-[10px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(offer.id)}
                          className="p-1.5 rounded-lg text-fursat-muted hover:text-fursat-terracotta hover:bg-rose-50 transition-colors"
                          title="Delete Offer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL: ADD / EDIT OFFER                                                 */}
      {/* ======================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-fursat-hairline p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-fursat-hairline mb-5">
              <h2 className="text-xl font-bold text-fursat-green">
                {editingOffer ? "Edit Offer" : "Create New Offer"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-fursat-sand text-fursat-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              
              {/* Offer Name */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Afternoon Multicuisine Delight"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Discount Percentage & Label */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Discount (%) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formLabel}
                    onChange={(e) => setFormLabel(e.target.value)}
                    placeholder="e.g. Lunch Hour"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Start Time (24h)
                  </label>
                  <input
                    type="time"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    End Time (24h)
                  </label>
                  <input
                    type="time"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. 15% off on all multicuisine lunch mains & mocktails."
                  className="w-full px-3.5 py-2 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="formActiveCheck"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 rounded text-fursat-green focus:ring-fursat-green"
                />
                <label htmlFor="formActiveCheck" className="text-xs font-semibold text-fursat-charcoal cursor-pointer">
                  Activate this offer immediately on the public website
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-fursat-hairline">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-fursat-hairline text-xs font-semibold text-fursat-charcoal hover:bg-fursat-sand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl btn-primary text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>{saving ? "Saving..." : "Save Offer"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
