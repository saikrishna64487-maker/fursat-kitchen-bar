"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Users,
} from "lucide-react";
import { EventItem } from "@/lib/contentStore";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formCategory, setFormCategory] = useState("Social Gathering");
  const [formCapacity, setFormCapacity] = useState("20 - 50 Guests");
  const [formDescription, setFormDescription] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [saving, setSaving] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success) {
        setEvents(data.data?.events || []);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
      setStatusMsg({ type: "error", text: "Failed to load events." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openAddModal = () => {
    setEditingEvent(null);
    setFormTitle("");
    setFormSubtitle("");
    setFormCategory("Social Gathering");
    setFormCapacity("20 - 60 Guests");
    setFormDescription("");
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (event: EventItem) => {
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormSubtitle(event.subtitle || "");
    setFormCategory(event.category || "Social");
    setFormCapacity(event.capacity || "20 - 50 Guests");
    setFormDescription(event.description || "");
    setFormActive(event.active !== false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setStatusMsg({ type: "error", text: "Event title is required." });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      let updatedList: EventItem[];

      if (editingEvent) {
        updatedList = events.map((ev) =>
          ev.id === editingEvent.id
            ? {
                ...ev,
                title: formTitle.trim(),
                subtitle: formSubtitle.trim(),
                category: formCategory.trim(),
                capacity: formCapacity.trim(),
                description: formDescription.trim(),
                active: formActive,
              }
            : ev
        );
      } else {
        const newEv: EventItem = {
          id: `ev-${Date.now()}`,
          title: formTitle.trim(),
          subtitle: formSubtitle.trim(),
          category: formCategory.trim(),
          capacity: formCapacity.trim(),
          description: formDescription.trim(),
          active: formActive,
        };
        updatedList = [...events, newEv];
      }

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "events",
          data: updatedList,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save events");

      setStatusMsg({
        type: "success",
        text: editingEvent ? "Event updated successfully!" : "New event created successfully!",
      });
      setIsModalOpen(false);
      setEvents(updatedList);
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save event." });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (event: EventItem) => {
    try {
      const updatedList = events.map((ev) =>
        ev.id === event.id ? { ...ev, active: !ev.active } : ev
      );

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "events",
          data: updatedList,
        }),
      });

      if (res.ok) {
        setEvents(updatedList);
        setStatusMsg({
          type: "success",
          text: `Event "${event.title}" ${!event.active ? "activated" : "deactivated"}.`,
        });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to toggle status." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const updatedList = events.filter((ev) => ev.id !== id);

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "events",
          data: updatedList,
        }),
      });

      if (!res.ok) throw new Error("Failed to delete event");

      setDeleteConfirmId(null);
      setEvents(updatedList);
      setStatusMsg({ type: "success", text: "Event package deleted." });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to delete event." });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-fursat-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.2em] text-fursat-terracotta">
              Celebrations &amp; Gatherings
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-fursat-green">
            Events Management
          </h1>
          <p className="text-xs text-fursat-muted font-sans mt-0.5">
            Manage birthday packages, kitty parties, corporate mixers, and event inquiry specifications.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-fursat-white" />
          <span>Add Event Package</span>
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
          <button onClick={() => setStatusMsg(null)} className="opacity-70 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-sans text-fursat-muted">
          Loading event packages...
        </div>
      ) : events.length === 0 ? (
        <div className="p-12 bg-fursat-white rounded-2xl border border-fursat-hairline text-center">
          <Calendar className="w-10 h-10 text-fursat-camel mx-auto mb-2 opacity-50" />
          <h3 className="font-sans text-lg font-bold text-fursat-charcoal">No Event Packages Configured</h3>
          <p className="text-xs text-fursat-muted mt-1">
            Click &quot;Add Event Package&quot; above to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-fursat-white rounded-2xl border border-fursat-hairline p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                !event.active ? "opacity-60 bg-stone-50" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-fursat-sand-alt border border-fursat-hairline text-[10px] font-sans font-bold uppercase tracking-wider text-fursat-terracotta">
                    {event.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-fursat-charcoal font-semibold">
                    <Users className="w-3.5 h-3.5 text-fursat-green" />
                    <span>{event.capacity}</span>
                  </div>
                </div>

                <h3 className="font-sans text-lg font-bold text-fursat-charcoal mt-1">
                  {event.title}
                </h3>
                {event.subtitle && (
                  <div className="text-xs text-fursat-terracotta font-semibold mt-0.5">
                    {event.subtitle}
                  </div>
                )}
                {event.description && (
                  <p className="text-xs text-fursat-muted font-sans mt-2 line-clamp-3">
                    {event.description}
                  </p>
                )}
              </div>

              {/* Footer controls */}
              <div className="mt-5 pt-3 border-t border-fursat-hairline flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(event)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-colors ${
                    event.active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {event.active ? (
                    <>
                      <ToggleRight className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-3.5 h-3.5 text-stone-500" />
                      <span>Inactive</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-1.5 rounded-lg text-fursat-charcoal hover:text-fursat-green hover:bg-fursat-sand-alt"
                    title="Edit Event"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {deleteConfirmId === event.id ? (
                    <div className="inline-flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-300">
                      <span className="text-[10px] text-rose-800 font-bold px-1">Del?</span>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-1 py-0.5 text-stone-500 text-[10px]"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(event.id)}
                      className="p-1.5 rounded-lg text-fursat-muted hover:text-rose-700 hover:bg-rose-50"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL: ADD / EDIT EVENT                                                 */}
      {/* ======================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-fursat-sand rounded-3xl border border-fursat-hairline p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-fursat-hairline mb-5">
              <h2 className="font-sans text-xl font-bold text-fursat-green">
                {editingEvent ? "Edit Event Package" : "Add Event Package"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-fursat-sand-alt text-fursat-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              
              {/* Event Title */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Event Package Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Birthday &amp; Anniversary Galas"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-white border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Subtitle Tagline
                </label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="e.g. Grand evening celebrations with multicuisine feast"
                  className="w-full px-3.5 py-2 rounded-xl bg-fursat-white border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Category & Capacity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Milestone, Corporate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-white border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Guest Capacity
                  </label>
                  <input
                    type="text"
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(e.target.value)}
                    placeholder="e.g. 30 - 150 Guests"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-white border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Package Inclusions &amp; Details
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. Dedicated staff, custom menu curated by chef, audio setup..."
                  className="w-full px-3.5 py-2 rounded-xl bg-fursat-white border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="eventActiveCheck"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 rounded text-fursat-green focus:ring-fursat-green"
                />
                <label htmlFor="eventActiveCheck" className="text-xs font-semibold text-fursat-charcoal cursor-pointer">
                  Display this celebration package on public site
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-fursat-hairline">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-fursat-hairline text-xs font-semibold text-fursat-charcoal hover:bg-fursat-sand-alt"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-fursat-white" />
                  <span>{saving ? "Saving..." : "Save Package"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
