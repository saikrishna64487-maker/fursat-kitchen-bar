"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export default function SoundController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm ambient chord drone (E minor / velvet jazz warmth)
      const frequencies = [82.41, 123.47, 164.81, 196.0, 246.94]; // E2, B2, E3, G3, B3

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);

        // Subtle LFO for gentle breathing effect
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscillatorsRef.current.push(osc);
      });
    } catch {
      console.warn("Web Audio not supported or blocked");
    }
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (!audioCtxRef.current || !gainNodeRef.current) return;

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }

    if (isPlaying) {
      // Fade out
      gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.4);
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      // Fade in to gentle lounge background level
      gainNodeRef.current.gain.setTargetAtTime(0.06, audioCtxRef.current.currentTime, 0.8);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      data-cursor={isPlaying ? "MUTE" : "PLAY SOUND"}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-fursat-gold/30 bg-fursat-card/90 hover:border-fursat-gold hover:bg-fursat-card transition-all duration-300 text-xs tracking-widest uppercase font-sans text-fursat-espresso shadow-sm"
      aria-label={isPlaying ? "Mute ambient lounge music" : "Play ambient lounge music"}
      title="Toggle Fursat Ambient Lounge Atmosphere"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fursat-gold opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? "bg-fursat-gold" : "bg-fursat-espresso/30"
          }`}
        ></span>
      </span>

      <span className="hidden sm:inline-block text-[11px] font-medium text-fursat-espresso/90 group-hover:text-fursat-gold transition-colors">
        {isPlaying ? "Sound: On" : "Sound: Off"}
      </span>

      {isPlaying ? (
        <div className="flex items-center gap-0.5 h-3">
          <span className="w-[2px] h-3 bg-fursat-gold animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="w-[2px] h-2 bg-fursat-bronze animate-pulse" style={{ animationDelay: "150ms" }} />
          <span className="w-[2px] h-3.5 bg-fursat-gold animate-pulse" style={{ animationDelay: "300ms" }} />
          <span className="w-[2px] h-1.5 bg-fursat-bronze animate-pulse" style={{ animationDelay: "450ms" }} />
        </div>
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-fursat-espresso/60 group-hover:text-fursat-gold transition-colors" />
      )}
    </button>
  );
}
