"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HabitatSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".habitat-header-item", {
        scrollTrigger: {
          trigger: ".habitat-header",
          start: "top 80%",
        },
        opacity: 0,
        y: 35,
        duration: 1.3,
        stagger: 0.18,
        ease: "power3.out",
      });

      // Narrative text reveal
      gsap.from(".habitat-narrative-item", {
        scrollTrigger: {
          trigger: ".habitat-narrative",
          start: "top 75%",
        },
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Metric items reveal
      gsap.from(".habitat-metric-item", {
        scrollTrigger: {
          trigger: ".habitat-metrics",
          start: "top 75%",
        },
        opacity: 0,
        y: 25,
        duration: 1.1,
        stagger: 0.16,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="species"
      className="relative w-full bg-[#060807] text-[#F2F0E8] py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-14 lg:px-[8vw] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Subtle Atmospheric Vignette */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="habitat-header flex flex-col gap-6 md:gap-8 max-w-4xl pb-16 sm:pb-24 border-b border-white/[0.08]">

        <h2 className="habitat-header-item font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[0.94] tracking-tight text-[#F2F0E8]">
          SACRED MESSENGER
          <br />
          <span className="text-[#F2F0E8]/75">OF THE CANOPY</span>
        </h2>

        <p className="habitat-header-item font-editorial italic text-lg sm:text-xl md:text-2xl text-[#F2F0E8]/70 leading-relaxed max-w-3xl">
          &ldquo;Venerated by the ancient Maya as the living manifestation of
          the plumed serpent Kukulkan, the Quetzal was revered as sacred—never
          caged, for its spirit was synonymous with absolute freedom.&rdquo;
        </p>
      </div>

      {/* Main Content: Asymmetric Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 pt-16 sm:pt-24 items-start">
        {/* Left Column: Narrative Storytelling */}
        <div className="habitat-narrative lg:col-span-5 flex flex-col gap-8 md:gap-10">
          <div className="habitat-narrative-item flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#F2F0E8]/45 font-light">
              THE MISTED REALM
            </span>
            <p className="text-[14px] sm:text-[15px] font-light leading-relaxed text-[#F2F0E8]/70">
              High in the volcanic cloud forests between 1,400 and 3,000 meters
              above sea level, perpetual moisture hangs suspended in the cool
              subalpine air. Towering oaks and laurel trees are draped in heavy
              bromeliads, mosses, and wild orchids, creating an emerald labyrinth.
            </p>
            <p className="text-[14px] sm:text-[15px] font-light leading-relaxed text-[#F2F0E8]/70 pt-2">
              The Quetzal relies entirely on this delicate ecosystem, feeding on
              wild avocados from the laurel family and excavating nests into
              soft, decomposing tree trunks left untouched by time.
            </p>
          </div>

          <div className="habitat-narrative-item pt-6 border-t border-white/[0.06] flex flex-col gap-3">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#F2F0E8]/45 font-light">
              FIELD OBSERVATION — HIGHLANDS
            </span>
            <p className="text-[13px] font-light text-[#F2F0E8]/60 leading-relaxed italic">
              Their resonant, soft double-noted calls echo across the deep
              ravines shortly before sunrise, muffled only by the dense morning
              fog rolling through the canopy.
            </p>
          </div>
        </div>

        {/* Right Column: Editorial Anatomy & Metrics */}
        <div className="habitat-metrics lg:col-span-7 flex flex-col divide-y divide-white/[0.08]">
          {/* Metric 01 */}
          <div className="habitat-metric-item py-8 sm:py-10 first:pt-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="flex flex-col gap-1 sm:max-w-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F2F0E8]/45">
                01 / MORPHOLOGY
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F2F0E8] font-normal">
                Wingspan & Agility
              </h3>
            </div>
            <div className="flex flex-col sm:items-end gap-1.5 sm:text-right">
              <span className="font-editorial text-3xl sm:text-4xl text-[#F2F0E8] font-light tracking-tight">
                40 — 44 CM
              </span>
              <p className="text-xs text-[#F2F0E8]/60 font-light max-w-xs sm:text-right leading-relaxed">
                Compact, rounded wings engineered for silent, nimble maneuvering
                between dense vines.
              </p>
            </div>
          </div>

          {/* Metric 02 */}
          <div className="habitat-metric-item py-8 sm:py-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="flex flex-col gap-1 sm:max-w-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F2F0E8]/45">
                02 / PLUMAGE
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F2F0E8] font-normal">
                Tail Streamers
              </h3>
            </div>
            <div className="flex flex-col sm:items-end gap-1.5 sm:text-right">
              <span className="font-editorial text-3xl sm:text-4xl text-[#F2F0E8] font-light tracking-tight">
                UP TO 100 CM
              </span>
              <p className="text-xs text-[#F2F0E8]/60 font-light max-w-xs sm:text-right leading-relaxed">
                Twin upper tail coverts trailing like iridescent green ribbons,
                waving gracefully in flight.
              </p>
            </div>
          </div>

          {/* Metric 03 */}
          <div className="habitat-metric-item py-8 sm:py-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="flex flex-col gap-1 sm:max-w-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F2F0E8]/45">
                03 / BIOTOPE
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F2F0E8] font-normal">
                Altitudinal Range
              </h3>
            </div>
            <div className="flex flex-col sm:items-end gap-1.5 sm:text-right">
              <span className="font-editorial text-3xl sm:text-4xl text-[#F2F0E8] font-light tracking-tight">
                1,400 — 3,000 M
              </span>
              <p className="text-xs text-[#F2F0E8]/60 font-light max-w-xs sm:text-right leading-relaxed">
                Highland cloud forests with annual altitudinal migrations
                following fruit ripening.
              </p>
            </div>
          </div>

          {/* Metric 04 */}
          <div className="habitat-metric-item py-8 sm:py-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="flex flex-col gap-1 sm:max-w-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F2F0E8]/45">
                04 / STATUS
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F2F0E8] font-normal">
                Conservation
              </h3>
            </div>
            <div className="flex flex-col sm:items-end gap-1.5 sm:text-right">
              <span className="font-editorial text-3xl sm:text-4xl text-[#F2F0E8] font-light tracking-tight">
                NEAR THREATENED
              </span>
              <p className="text-xs text-[#F2F0E8]/60 font-light max-w-xs sm:text-right leading-relaxed">
                IUCN Red List. Susceptible to deforestation and scarcity of dead
                nesting snags.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
