"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  UploadCloud,
  FileImage,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { GalleryPhoto } from "@/lib/contentStore";

// Standard supported gallery categories
const GALLERY_CATEGORIES = [
  "Ambiance",
  "Dining",
  "Bar & Lounge",
  "Booths",
  "Cafe & Desserts",
  "Social",
  "Banquet",
  "Events",
  "Exterior",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Ambiance");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formActive, setFormActive] = useState(true);

  // Image Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Delete confirmation modal state
  const [deleteModalPhoto, setDeleteModalPhoto] = useState<GalleryPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success) {
        setPhotos(data.gallery || []);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
      setStatusMsg({ type: "error", text: "Failed to load gallery photos." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openAddModal = () => {
    setEditingPhoto(null);
    setFormTitle("");
    setFormCategory("Ambiance");
    setFormOrder(photos.length + 1);
    setFormSubtitle("");
    setFormActive(true);
    setSelectedFile(null);
    setPreviewUrl("");
    setImageError("");
    setUploadProgress(null);
    setIsModalOpen(true);
  };

  const openEditModal = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setFormTitle(photo.title);
    setFormCategory(photo.category || "Ambiance");
    setFormOrder(photo.order || 1);
    setFormSubtitle(photo.subtitle || "");
    setFormActive(photo.active !== false);
    setSelectedFile(null);
    setPreviewUrl(photo.src); // existing image
    setImageError("");
    setUploadProgress(null);
    setIsModalOpen(true);
  };

  // Image File Validation & Selection
  const handleFileSelect = (file: File) => {
    setImageError("");

    if (!ALLOWED_EXTENSIONS.includes(file.type.toLowerCase())) {
      setImageError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImageError("Image must be smaller than 10 MB.");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setImageError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Upload image to server
  const uploadImageFile = async (file: File): Promise<string> => {
    setUploading(true);
    setUploadProgress(30);

    const formData = new FormData();
    formData.append("file", file);

    setUploadProgress(65);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploadProgress(90);
    const data = await res.json();

    if (!res.ok || !data.success || !data.url) {
      throw new Error(data.error || "Failed to upload image to server.");
    }

    setUploadProgress(100);
    return data.url;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      setStatusMsg({ type: "error", text: "Photo Title is required." });
      return;
    }

    if (!previewUrl && !selectedFile) {
      setImageError("Please choose an image for this gallery photo.");
      return;
    }

    setUploading(true);
    setStatusMsg(null);

    try {
      let finalImageUrl = previewUrl;

      // If staff selected a new file, upload it now
      if (selectedFile) {
        finalImageUrl = await uploadImageFile(selectedFile);
      }

      if (editingPhoto) {
        // Update existing photo
        const res = await fetch("/api/admin/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingPhoto.id,
            src: finalImageUrl,
            title: formTitle.trim(),
            subtitle: formSubtitle.trim(),
            category: formCategory,
            order: Number(formOrder),
            active: formActive,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update gallery photo.");
        setStatusMsg({ type: "success", text: "Gallery photo updated successfully." });
      } else {
        // Create new photo
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            src: finalImageUrl,
            title: formTitle.trim(),
            subtitle: formSubtitle.trim(),
            category: formCategory,
            order: Number(formOrder),
            active: formActive,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add gallery photo.");
        setStatusMsg({ type: "success", text: "Gallery photo added successfully." });
      }

      setIsModalOpen(false);
      fetchGallery();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save photo." });
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleToggleActive = async (photo: GalleryPhoto) => {
    try {
      const updatedActive = !photo.active;
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: photo.id,
          active: updatedActive,
        }),
      });

      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) => (p.id === photo.id ? { ...p, active: updatedActive } : p))
        );
        setStatusMsg({
          type: "success",
          text: `Photo "${photo.title}" ${updatedActive ? "is now visible on website." : "is now hidden from public site."}`,
        });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to toggle visibility status." });
    }
  };

  const confirmDeletePhoto = async () => {
    if (!deleteModalPhoto) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/gallery?id=${deleteModalPhoto.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete photo.");

      setDeleteModalPhoto(null);
      setStatusMsg({ type: "success", text: "Gallery photo deleted successfully." });
      fetchGallery();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to delete photo." });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-fursat-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.2em] text-fursat-terracotta">
              Showcase Ambiance
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-fursat-green">
            Gallery Management
          </h1>
          <p className="text-xs text-fursat-muted font-sans mt-0.5">
            Upload ambiance photos, edit descriptions, adjust display order, and curate the public Fursat gallery.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-fursat-white" />
          <span>Add Gallery Photo</span>
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
          <button onClick={() => setStatusMsg(null)} className="opacity-70 hover:opacity-100 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Photos Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs font-sans text-fursat-muted">
          <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-fursat-terracotta" />
          <span>Loading gallery photos...</span>
        </div>
      ) : photos.length === 0 ? (
        <div className="p-12 bg-fursat-white rounded-2xl border border-fursat-hairline text-center">
          <ImageIcon className="w-10 h-10 text-fursat-camel mx-auto mb-2 opacity-50" />
          <h3 className="font-sans text-lg font-bold text-fursat-charcoal">No Gallery Photos Found</h3>
          <p className="text-xs text-fursat-muted mt-1 mb-4">
            Click &quot;Add Gallery Photo&quot; above to upload your first showcase shot.
          </p>
          <button
            onClick={openAddModal}
            className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold"
          >
            + Upload Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`bg-fursat-white rounded-2xl border border-fursat-hairline overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                !photo.active ? "opacity-65 bg-stone-50" : ""
              }`}
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] bg-fursat-sand-alt overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-fursat-black/85 backdrop-blur-sm text-fursat-white px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold">
                    Order #{photo.order}
                  </div>
                  <div className="absolute top-3 right-3 bg-fursat-white/95 backdrop-blur-sm text-fursat-charcoal px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold border border-fursat-hairline shadow-xs">
                    {photo.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-sans text-base font-bold text-fursat-charcoal line-clamp-1">
                    {photo.title}
                  </h3>
                  {photo.subtitle && (
                    <p className="text-xs text-fursat-muted font-sans mt-1 line-clamp-2">
                      {photo.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Controls */}
              <div className="p-4 pt-2 border-t border-fursat-hairline flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(photo)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-colors cursor-pointer ${
                    photo.active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-200 text-stone-600"
                  }`}
                  title={photo.active ? "Visible on public website" : "Hidden from public website"}
                >
                  {photo.active ? (
                    <>
                      <ToggleRight className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-3.5 h-3.5 text-stone-500" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(photo)}
                    className="p-1.5 rounded-lg text-fursat-charcoal hover:text-fursat-green hover:bg-fursat-sand-alt cursor-pointer transition-colors"
                    title="Edit Photo"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteModalPhoto(photo)}
                    className="p-1.5 rounded-lg text-fursat-muted hover:text-rose-700 hover:bg-rose-50 cursor-pointer transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL: ADD / EDIT GALLERY PHOTO WITH DRAG & DROP UPLOAD                 */}
      {/* ======================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-fursat-sand rounded-3xl border border-fursat-hairline p-5 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-150 my-6 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-fursat-hairline mb-5">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-fursat-green">
                {editingPhoto ? "Edit Gallery Photo" : "Add Gallery Photo"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-fursat-white border border-fursat-hairline text-fursat-charcoal hover:text-fursat-terracotta flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              
              {/* Photo Title */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Velvet Armchair Lounge"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-white border border-fursat-hairline text-sm text-fursat-charcoal focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                />
              </div>

              {/* ============================================================= */}
              {/* DRAG & DROP / CHOOSE IMAGE UPLOAD AREA                         */}
              {/* ============================================================= */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  {editingPhoto ? "Photo Image *" : "Upload Image *"}
                </label>

                {/* Hidden native file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {previewUrl ? (
                  /* Image Preview State */
                  <div className="bg-fursat-white rounded-2xl border border-fursat-hairline p-3 sm:p-4 shadow-sm space-y-3">
                    <div className="relative aspect-[16/10] w-full bg-fursat-sand-alt rounded-xl overflow-hidden border border-fursat-hairline shadow-inner">
                      <Image
                        src={previewUrl}
                        alt="Selected Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileImage className="w-4 h-4 text-fursat-terracotta flex-shrink-0" />
                        <span className="text-xs text-fursat-charcoal font-semibold truncate max-w-[200px]">
                          {selectedFile ? selectedFile.name : "Current Gallery Photo"}
                        </span>
                        {selectedFile && (
                          <span className="text-[10px] text-fursat-muted bg-fursat-sand-alt px-2 py-0.5 rounded-full border border-fursat-hairline">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-fursat-sand-alt hover:bg-fursat-sand border border-fursat-hairline text-xs font-semibold text-fursat-charcoal transition-colors cursor-pointer"
                        >
                          Change Image
                        </button>

                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                          title="Remove Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Empty Drag & Drop Area */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                      isDragging
                        ? "border-fursat-green bg-fursat-green/5 scale-[1.01]"
                        : "border-fursat-camel/50 bg-fursat-white hover:bg-fursat-sand-alt/50 hover:border-fursat-camel"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-fursat-sand-alt border border-fursat-hairline flex items-center justify-center text-fursat-terracotta mx-auto mb-3 shadow-xs">
                      <UploadCloud className="w-6 h-6" />
                    </div>

                    <h3 className="font-sans text-sm sm:text-base font-bold text-fursat-charcoal mb-1">
                      {isDragging ? "DROP IMAGE HERE" : "DRAG & DROP YOUR IMAGE"}
                    </h3>

                    <p className="text-[11px] text-fursat-muted font-sans mb-3">
                      or click to browse from your device
                    </p>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-full bg-fursat-sand-alt hover:bg-fursat-sand border border-fursat-hairline text-xs font-semibold text-fursat-charcoal shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-fursat-terracotta" />
                      <span>Choose Image</span>
                    </button>

                    <span className="block text-[10px] text-fursat-muted mt-3 uppercase tracking-wider font-semibold">
                      JPG, PNG, WEBP • Max 10 MB
                    </span>
                  </div>
                )}

                {/* Image Validation Error */}
                {imageError && (
                  <p className="text-xs text-rose-700 font-sans mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{imageError}</span>
                  </p>
                )}
              </div>

              {/* Category & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Category Tag
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-white border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner cursor-pointer"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-fursat-white border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 shadow-inner"
                  />
                </div>
              </div>

              {/* Subtitle / Caption */}
              <div>
                <label className="font-semibold text-fursat-charcoal uppercase tracking-wider block mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="Describe this photo (e.g. Sunlit afternoons with plush seating for relaxing conversations...)"
                  className="w-full px-3.5 py-2 rounded-xl bg-fursat-white border border-fursat-hairline text-xs text-fursat-charcoal focus:outline-none focus:border-fursat-green focus:ring-1 focus:ring-fursat-green/30 placeholder:text-fursat-muted/50 shadow-inner"
                />
              </div>

              {/* Public Website Visibility Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="photoActiveCheck"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 rounded text-fursat-green focus:ring-fursat-green cursor-pointer"
                />
                <label htmlFor="photoActiveCheck" className="text-xs font-semibold text-fursat-charcoal cursor-pointer select-none">
                  Display this photo on public website
                </label>
              </div>

              {/* Upload Progress Bar if active */}
              {uploadProgress !== null && (
                <div className="space-y-1 pt-2 animate-in fade-in">
                  <div className="flex justify-between text-[11px] font-sans font-bold text-fursat-charcoal">
                    <span>Uploading image...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-fursat-sand-alt h-2 rounded-full overflow-hidden border border-fursat-hairline">
                    <div
                      className="bg-fursat-green h-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-fursat-hairline">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-fursat-hairline text-xs font-semibold text-fursat-charcoal hover:bg-fursat-sand-alt cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || (!previewUrl && !selectedFile)}
                  className="btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Photo...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-fursat-white" />
                      <span>Save Photo</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* CONFIRMATION MODAL: DELETE GALLERY PHOTO                                */}
      {/* ======================================================================= */}
      {deleteModalPhoto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-fursat-white rounded-2xl border border-fursat-hairline p-6 max-w-sm w-full shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-fursat-charcoal">
                Delete Gallery Photo?
              </h3>
              <p className="text-xs text-fursat-muted font-sans mt-1">
                Are you sure you want to remove &quot;{deleteModalPhoto.title}&quot; from the gallery?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalPhoto(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-fursat-hairline text-xs font-semibold text-fursat-charcoal hover:bg-fursat-sand-alt cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeletePhoto}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Photo"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
