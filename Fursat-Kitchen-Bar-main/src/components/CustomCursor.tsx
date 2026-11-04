"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text" | "hidden">("default");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over element with data-cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over input or textarea
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setCursorVariant("hidden");
        return;
      }

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant(text ? "text" : "hover");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setCursorText("");
        setCursorVariant("hover");
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    const onMouseLeave = () => setCursorVariant("hidden");
    const onMouseEnter = () => setCursorVariant("default");

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  // Smooth trailing for outer ring
  useEffect(() => {
    let animationFrameId: number;
    const smoothFactor = 0.18;

    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * smoothFactor,
        y: prev.y + (position.y - prev.y) * smoothFactor,
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };

    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isClient || cursorVariant === "hidden") return null;

  const isText = cursorVariant === "text" && cursorText;
  const isHover = cursorVariant === "hover" || isText;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
      {/* Center dot */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fursat-terracotta transition-opacity duration-300 shadow-sm"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          width: isHover ? "4px" : "6px",
          height: isHover ? "4px" : "6px",
          opacity: isText ? 0 : 1,
        }}
      />

      {/* Trailing Ring / Pill with contextual text */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-[2px] ${
          isText
            ? "bg-fursat-green text-white border border-fursat-camel/60 px-4 py-1.5 shadow-lg"
            : isHover
            ? "border border-fursat-terracotta bg-fursat-terracotta/15 scale-125 w-12 h-12 shadow-md"
            : "border border-fursat-camel/50 w-9 h-9"
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {isText && (
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-white uppercase select-none whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
