"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface GalleryImage {
  id?: string;
  src: string;
  title: string;
  subtitle: string;
  category: string;
  order?: number;
  active?: boolean;
}

const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    src: "/assets/kitchen-bar-lounge-seating-DXKtkFu9.jpeg",
    title: "Lounge Seating by the Window",
    subtitle: "Warm sunlit afternoons and plush velvet armchairs for unhurried conversations.",
    category: "Lounge",
    order: 1,
    active: true,
  },
  {
    id: "gal-2",
    src: "/assets/main-dining-hall-D1OfpEb6.jpeg",
    title: "Main Dining Hall",
    subtitle: "Architectural grandeur with custom brass fixtures and spacious family tables.",
    category: "Dining",
    order: 2,
    active: true,
  },
  {
    id: "gal-3",
    src: "/assets/cafe-counter-dessert-display-ChDJtGS1.jpeg",
    title: "Cafe Counter & Dessert Display",
    subtitle: "Freshly roasted artisanal coffees, Kunafa cheesecakes, and house delicacies.",
    category: "Cafe & Bar",
    order: 3,
    active: true,
  },
  {
    id: "gal-4",
    src: "/assets/dark-booth-seating-DVhnpRQ8.jpeg",
    title: "Dark Booth Seating",
    subtitle: "Cozy alcoves with ambient golden illumination designed for intimate date nights.",
    category: "Booths",
    order: 4,
    active: true,
  },
  {
    id: "gal-5",
    src: "/assets/communal-seating-BBQ0H9sH.jpeg",
    title: "Communal Seating Area",
    subtitle: "Expansive layouts tailored for celebratory reunions and large friend circles.",
    category: "Social",
    order: 5,
    active: true,
  },
  {
    id: "gal-6",
    src: "/assets/banquet/banquet-theatre-stage.jpg",
    title: "The Banquet Hall",
    subtitle: "On-site banquet hall hosting 150+ seated guests for kitty parties & galas.",
    category: "Banquet",
    order: 6,
    active: true,
  },
  {
    id: "gal-7",
    src: "/assets/lounge-seating-kitchen-bar-oaP_RKDc.jpeg",
    title: "Orange Lounge Chairs & Bar",
    subtitle: "Vibrant mid-century seating paired with craft cocktails and evening energy.",
    category: "Bar & Lounge",
    order: 7,
    active: true,
  },
];

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(DEFAULT_GALLERY_IMAGES);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/content");
        if (res.ok) {
          const json = await res.json();
          const items: GalleryImage[] = json?.content?.gallery || json?.data?.gallery;
          if (Array.isArray(items) && items.length > 0) {
            const activeList = items
              .filter((img) => img.active !== false)
              .sort((a, b) => (a.order || 0) - (b.order || 0));
            if (activeList.length > 0) {
              setGalleryImages(activeList);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      }
    }
    fetchGallery();
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-fursat-sand overflow-hidden px-4 sm:px-8 md:px-12 border-t border-fursat-camel/20"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-fursat-camel/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="w-8 sm:w-12 h-[1px] bg-fursat-camel" />
              <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold">
                05 — A Feel for the Place
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl text-fursat-green font-bold tracking-tight">
              Gallery
            </h2>
            <p className="font-sans text-sm sm:text-base text-fursat-muted mt-1 max-w-lg">
              A look inside Fursat Kitchen &amp; Bar, Madhapur, Hyderabad.
            </p>
          </div>

          <span className="text-xs font-sans uppercase tracking-widest text-fursat-terracotta font-semibold">
            {galleryImages.length} Real Spaces · Madhapur
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={img.id || idx}
              onClick={() => openLightbox(idx)}
              data-cursor="EXPAND"
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-fursat-hairline hover:border-fursat-terracotta transition-all duration-500 cursor-pointer shadow-sm hover:shadow-lg ${
                idx === 0 ? "sm:col-span-2 lg:col-span-2 sm:row-span-2 h-[340px] sm:h-[480px]" : "h-64 sm:h-72"
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${img.src}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fursat-black/95 via-fursat-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag pill */}
              <div className="absolute top-3 right-3 fursat-tag text-[10px]">
                {img.category}
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <h3 className="font-sans text-lg sm:text-xl text-white font-bold group-hover:text-fursat-sand transition-colors mb-1">
                  {img.title}
                </h3>
                <p className="font-sans text-xs text-fursat-sand/90 font-light line-clamp-2">
                  {img.subtitle}
                </p>
              </div>

              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 border border-fursat-hairline flex items-center justify-center text-fursat-charcoal opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && galleryImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fursat-black/95 backdrop-blur-2xl animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-20 p-3 rounded-full bg-fursat-charcoal border border-fursat-camel/40 text-white hover:text-fursat-terracotta transition-colors shadow-lg cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Image Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-fursat-charcoal/90 border border-fursat-camel/40 text-white hover:text-fursat-terracotta transition-colors shadow-lg cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Lightbox Image */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border border-fursat-camel/40 shadow-2xl max-h-[70vh] flex items-center justify-center">
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="text-center mt-4 max-w-xl">
              <span className="text-[12px] font-sans uppercase tracking-[0.2em] text-fursat-sand font-semibold">
                {galleryImages[lightboxIndex].category} · {lightboxIndex + 1} of {galleryImages.length}
              </span>
              <h3 className="font-sans text-2xl text-white font-bold mt-1">
                {galleryImages[lightboxIndex].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-fursat-sand/90 font-light mt-1">
                {galleryImages[lightboxIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Next Image Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-fursat-charcoal/90 border border-fursat-camel/40 text-white hover:text-fursat-terracotta transition-colors shadow-lg cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
