"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const hasTriggeredRef = useRef(false);

  // Natural bird motion playback speed (compensates for slow-motion recording)
  const PLAYBACK_SPEED = 1.8;

  useEffect(() => {
    const video = videoRef.current;
    const content = contentRef.current;
    const label = labelRef.current;
    if (!content) return;

    // Apply natural playback speed
    if (video) {
      video.playbackRate = PLAYBACK_SPEED;
    }

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = content.querySelectorAll<HTMLElement>(".reveal-item");

    if (prefersReducedMotion) {
      // Immediate presentation without animation if reduced motion is requested
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      if (label) {
        label.style.opacity = "0.5";
      }
      return;
    }

    // Set initial GSAP states: opacity 0, y: 30px
    gsap.set(items, {
      opacity: 0,
      y: 30,
    });

    if (label) {
      gsap.fromTo(
        label,
        { opacity: 0 },
        { opacity: 0.5, duration: 1.2, ease: "power2.out", delay: 0.2 }
      );
    }

    const triggerReveal = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      // Soft premium reveal when the bird lands on the branch
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.15,
      });
    };

    // Synchronize precisely with video playback time (at ~4.7s internal video time)
    const handleTimeUpdate = () => {
      if (video && video.currentTime >= 4.7) {
        triggerReveal();
      }
    };

    // Ensure playback speed is maintained whenever video plays or loads metadata
    const handleVideoRate = () => {
      if (video) {
        video.playbackRate = PLAYBACK_SPEED;
      }
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("play", handleVideoRate);
      video.addEventListener("loadedmetadata", handleVideoRate);
    }

    // Fallback timer scaled to the accelerated real-world duration (~2.6s)
    const fallbackMs = Math.round(4700 / PLAYBACK_SPEED);
    const fallbackTimer = setTimeout(() => {
      triggerReveal();
    }, fallbackMs);

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("play", handleVideoRate);
        video.removeEventListener("loadedmetadata", handleVideoRate);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#060807] select-none">
      {/* Background Video (Plays once, natural speed, holds on final perched frame) */}
      <video
        ref={videoRef}
        src="/Resplendent_Quetzal.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle overlays: keeping bird visible while ensuring typography readability */}
      {/* 1. Base dark tint */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* 2. Directional gradient prioritizing negative space on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />

      {/* 3. Subtle vertical atmospheric vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/35 pointer-events-none" />

      {/* Top Editorial Label: ARCHIVE — 01 / 07 */}
      <div
        ref={labelRef}
        className="absolute top-24 sm:top-28 md:top-32 left-6 sm:left-10 md:left-[8vw] z-20 text-[10px] md:text-[11px] uppercase tracking-[0.28em] font-light text-[#F2F0E8]/50"
      >

      </div>

      {/* Main Left-side Content */}
      <div
        ref={contentRef}
        className="absolute z-20 left-6 sm:left-10 md:left-[8vw] bottom-8 sm:bottom-12 md:bottom-auto md:top-[57%] md:-translate-y-1/2 flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-[90%] sm:max-w-lg lg:max-w-xl xl:max-w-2xl text-left"
      >
        {/* Eyebrow */}
        <p className="reveal-item text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.32em] font-light text-[#F2F0E8]/80">
          RESPLENDENT QUETZAL
        </p>

        {/* Main Headline */}
        <h1 className="reveal-item font-editorial font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] leading-[0.92] tracking-tight text-[#F2F0E8]">
          <span className="block">JEWEL OF</span>
          <span className="block mt-1 sm:mt-1.5 md:mt-2">THE CLOUD FOREST</span>
        </h1>

        {/* Body */}
        <p className="reveal-item text-[13px] sm:text-[14px] md:text-[15px] font-light leading-relaxed text-[#F2F0E8]/65 max-w-[360px] sm:max-w-[410px]">
          An emerald apparition hidden among the mist, where the forest still
          moves at nature&apos;s pace.
        </p>

        {/* Metadata */}
        <div className="reveal-item pt-2 sm:pt-3 text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-[#F2F0E8]/45 font-light space-y-1">
          <p>GUATEMALA</p>
          <p className="tracking-[0.22em]">Pharomachrus mocinno</p>
        </div>
      </div>
    </section>
  );
}
