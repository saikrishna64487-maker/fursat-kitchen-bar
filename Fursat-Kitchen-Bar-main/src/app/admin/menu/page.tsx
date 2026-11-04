"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  UtensilsCrossed,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Search,
  Filter,
  Check,
} from "lucide-react";
import { MenuItem, MENU_CATEGORIES, MenuCategory } from "@/data/menuData";

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState<number>(299);
  const [formCategory, setFormCategory] = useState("all-day-breakfast");
  const [formSubCategory, setFormSubCategory] = useState("");
  const [formIsVeg, setFormIsVeg] = useState(true);
  const [formDescription, setFormDescription] = useState("");
  const [formAvailable, setFormAvailable] = useState(true);
  const [saving, setSaving] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/menu");
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Failed to load menu:", err);
      setStatusMsg({ type: "error", text: "Failed to load menu items." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [items, selectedCategory, searchQuery]);

  const openAddModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormPrice(349);
    setFormCategory(selectedCategory !== "all" ? selectedCategory : "all-day-breakfast");
    setFormSubCategory("");
    setFormIsVeg(true);
    setFormDescription("");
    setFormAvailable(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormPrice(item.price ?? 0);
    setFormCategory(item.category);
    setFormSubCategory(item.subCategory || "");
    setFormIsVeg(item.isVeg !== false);
    setFormDescription(item.description || "");
    setFormAvailable(item.available !== false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setStatusMsg({ type: "error", text: "Item name is required." });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      if (editingItem) {
        // Edit existing
        const res = await fetch("/api/admin/menu", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            name: formName,
            price: Number(formPrice),
            category: formCategory,
            subCategory: formSubCategory,
            isVeg: formIsVeg,
            description: formDescription,
            available: formAvailable,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update item");
        setStatusMsg({ type: "success", text: `Item "${formName}" updated successfully!` });
      } else {
        // Create new
        const res = await fetch("/api/admin/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            price: Number(formPrice),
            category: formCategory,
            subCategory: formSubCategory,
            isVeg: formIsVeg,
            description: formDescription,
            available: formAvailable,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add item");
        setStatusMsg({ type: "success", text: `New item "${formName}" added to digital menu!` });
      }

      setIsModalOpen(false);
      fetchMenu();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save menu item." });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const updatedAvailable = !(item.available !== false);
      const res = await fetch("/api/admin/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          available: updatedAvailable,
        }),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, available: updatedAvailable } : i))
        );
        setStatusMsg({
          type: "success",
          text: `"${item.name}" marked as ${updatedAvailable ? "In Stock (Available)" : "86'd (Unavailable)"}.`,
        });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to toggle availability." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete item");

      setDeleteConfirmId(null);
      setStatusMsg({ type: "success", text: "Menu item deleted successfully." });
      fetchMenu();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to delete item." });
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-fursat-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-fursat-terracotta">
              Digital Menu Catalog
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-fursat-green">
            Menu Management
          </h1>
          <p className="text-xs text-fursat-muted mt-0.5 font-normal">
            Manage food &amp; beverage items, prices, Veg/Non-Veg classifications, and kitchen availability.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full btn-primary text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Menu Item</span>
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

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-fursat-hairline p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish name, ingredient, or subtitle..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal placeholder-fursat-muted/50 focus:outline-none focus:border-fursat-green"
            />
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs text-fursat-muted px-3 py-2 bg-fursat-sand rounded-xl border border-fursat-camel/40">
            <span className="font-bold text-fursat-charcoal tabular-nums">{filteredItems.length}</span>
            <span>of {items.length} items shown</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-fursat-green text-white font-bold"
                : "bg-fursat-sand text-fursat-green border border-fursat-camel hover:bg-fursat-sand-alt"
            }`}
          >
            All Categories ({items.length})
          </button>
          {MENU_CATEGORIES.map((cat: MenuCategory) => {
            const count = items.filter((i) => i.category === cat.id).length;
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSel
                    ? "bg-fursat-green text-white font-bold"
                    : "bg-fursat-sand text-fursat-green border border-fursat-camel hover:bg-fursat-sand-alt"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Items Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-fursat-muted">
          Loading digital menu catalog...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-fursat-hairline text-center">
          <UtensilsCrossed className="w-10 h-10 text-fursat-camel mx-auto mb-2 opacity-50" />
          <h3 className="text-lg font-bold text-fursat-charcoal">No Dishes Found</h3>
          <p className="text-xs text-fursat-muted mt-1">
            Try adjusting your search keywords or category filter.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-fursat-hairline shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-fursat-hairline bg-fursat-sand text-[10.5px] font-semibold uppercase tracking-widest text-fursat-charcoal">
                  <th className="py-3.5 px-4 sm:px-6">Item &amp; Classification</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Price</th>
                  <th className="py-3.5 px-4 text-center">Availability Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fursat-hairline text-xs">
                {filteredItems.map((item) => {
                  const isAvailable = item.available !== false;
                  const catObj = MENU_CATEGORIES.find((c: MenuCategory) => c.id === item.category);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-fursat-sand/50 transition-colors ${
                        !isAvailable ? "bg-stone-50/60 opacity-75" : ""
                      }`}
                    >
                      {/* Name, veg tag & description */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                              item.isVeg !== false
                                ? "border-fursat-green bg-emerald-50"
                                : "border-fursat-terracotta bg-rose-50"
                            }`}
                            title={item.isVeg !== false ? "Vegetarian" : "Non-Vegetarian"}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.isVeg !== false ? "bg-fursat-green" : "bg-fursat-terracotta"
                              }`}
                            />
                          </span>
                          <span className="text-sm font-semibold text-fursat-charcoal">
                            {item.name}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-fursat-muted mt-1 line-clamp-1 max-w-md pl-5">
                            {item.description}
                          </p>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-fursat-sand border border-fursat-camel/40 text-[10.5px] font-semibold text-fursat-charcoal">
                          {catObj ? catObj.name : item.category}
                        </span>
                        {item.subCategory && (
                          <span className="block text-[10px] text-fursat-muted mt-0.5">
                            {item.subCategory}
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 text-right font-medium text-sm text-fursat-charcoal tabular-nums">
                        ₹{item.price}
                      </td>

                      {/* Kitchen Availability Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleAvailability(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                            isAvailable
                              ? "bg-emerald-100 text-fursat-green"
                              : "bg-rose-100 text-fursat-terracotta"
                          }`}
                        >
                          {isAvailable ? (
                            <>
                              <ToggleRight className="w-4 h-4 text-fursat-green" />
                              <span>Available</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 text-fursat-terracotta" />
                              <span>86&apos;d (Sold Out)</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right space-x-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-fursat-muted hover:text-fursat-green hover:bg-fursat-sand transition-colors"
                          title="Edit Item"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {deleteConfirmId === item.id ? (
                          <div className="inline-flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-300">
                            <span className="text-[10px] text-rose-800 font-bold px-1">Delete?</span>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-1.5 py-0.5 text-stone-500 hover:text-stone-800 text-[10px]"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-1.5 rounded-lg text-fursat-muted hover:text-fursat-terracotta hover:bg-rose-50 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL: ADD / EDIT MENU ITEM                                             */}
      {/* ======================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-fursat-hairline p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-fursat-hairline mb-5">
              <h2 className="text-xl font-bold text-fursat-green">
                {editingItem ? "Edit Menu Dish" : "Add New Menu Dish"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-fursat-sand text-fursat-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              
              {/* Item Name */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Dish / Beverage Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Fursat Signature Paneer Tikka"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  />
                </div>

                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                  >
                    {MENU_CATEGORIES.map((cat: MenuCategory) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SubCategory */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Sub-Category / Section Header
                </label>
                <input
                  type="text"
                  value={formSubCategory}
                  onChange={(e) => setFormSubCategory(e.target.value)}
                  placeholder="e.g. Starters, Tandoor, Mocktails"
                  className="w-full px-3.5 py-2 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Veg / Non-Veg Classification */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1.5">
                  Dietary Classification
                </label>
                <div className="flex gap-3">
                  <label className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border cursor-pointer transition-all ${
                    formIsVeg
                      ? "bg-emerald-50 border-emerald-500 text-fursat-green font-semibold"
                      : "bg-fursat-sand border-fursat-camel/40 text-fursat-charcoal"
                  }`}>
                    <input
                      type="radio"
                      name="diet"
                      checked={formIsVeg}
                      onChange={() => setFormIsVeg(true)}
                      className="sr-only"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-fursat-green" />
                    <span>Vegetarian (Veg)</span>
                  </label>

                  <label className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border cursor-pointer transition-all ${
                    !formIsVeg
                      ? "bg-rose-50 border-rose-500 text-fursat-terracotta font-semibold"
                      : "bg-fursat-sand border-fursat-camel/40 text-fursat-charcoal"
                  }`}>
                    <input
                      type="radio"
                      name="diet"
                      checked={!formIsVeg}
                      onChange={() => setFormIsVeg(false)}
                      className="sr-only"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-fursat-terracotta" />
                    <span>Non-Vegetarian</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Ingredients &amp; Culinary Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. Marinated cottage cheese cooked in clay tandoor with aromatic spices..."
                  className="w-full px-3.5 py-2 rounded-xl bg-fursat-sand-alt border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green"
                />
              </div>

              {/* Availability Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="menuAvailableCheck"
                  checked={formAvailable}
                  onChange={(e) => setFormAvailable(e.target.checked)}
                  className="w-4 h-4 rounded text-fursat-green focus:ring-fursat-green"
                />
                <label htmlFor="menuAvailableCheck" className="text-xs font-semibold text-fursat-charcoal cursor-pointer">
                  In Stock &amp; Available for Ordering
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
                  <span>{saving ? "Saving..." : "Save Dish"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
