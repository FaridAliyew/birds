"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

interface Specimen {
  id: string;
  index: string;
  commonName: string;
  scientificName: string;
  region: string;
  biome: string;
  status: string;
  image: string;
}

const SPECIMENS: Specimen[] = [
  {
    id: "harpy-eagle",
    index: "02",
    commonName: "Harpy Eagle",
    scientificName: "Harpia harpyja",
    region: "Amazon Basin",
    biome: "Neotropical Canopy",
    status: "Vulnerable",
    image: "/birds/harpy-eagle.png",
  },
  {
    id: "king-of-saxony",
    index: "03",
    commonName: "King of Saxony",
    scientificName: "Pteridophora alberti",
    region: "New Guinea Highlands",
    biome: "Cloud Rainforest",
    status: "Least Concern",
    image: "/birds/king-of-saxony.png",
  },
  {
    id: "red-crowned-crane",
    index: "04",
    commonName: "Red-crowned Crane",
    scientificName: "Grus japonensis",
    region: "East Asian Wetlands",
    biome: "Snow Shallows & Marshes",
    status: "Endangered",
    image: "/birds/red-crowned-crane.png",
  },
  {
    id: "shoebill",
    index: "05",
    commonName: "Shoebill",
    scientificName: "Balaeniceps rex",
    region: "East Africa",
    biome: "Papyrus Swamps",
    status: "Vulnerable",
    image: "/birds/shoebill.png",
  },
  {
    id: "victoria-crowned-pigeon",
    index: "06",
    commonName: "Victoria Crowned Pigeon",
    scientificName: "Goura victoria",
    region: "Northern New Guinea",
    biome: "Lowland Sago Forest",
    status: "Near Threatened",
    image: "/birds/victoria-crowned-pigeon.png",
  },
  {
    id: "wilsons-bird-of-paradise",
    index: "07",
    commonName: "Wilson's Bird-of-Paradise",
    scientificName: "Diphyllodes respublica",
    region: "Waigeo & Batanta",
    biome: "Equatorial Rainforest",
    status: "Near Threatened",
    image: "/birds/wilsons-bird-of-paradise.png",
  },
];

const POOL_SIZE = 12;
const DISTANCE_THRESHOLD = 75; // Minimum px distance between trail spawns

export default function ArchiveSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trailContainerRef = useRef<HTMLDivElement | null>(null);
  const customCursorRef = useRef<HTMLDivElement | null>(null);

  // Pool element refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const titleRefs = useRef<(HTMLElement | null)[]>([]);
  const sciRefs = useRef<(HTMLElement | null)[]>([]);
  const metaRefs = useRef<(HTMLElement | null)[]>([]);

  // State & tracking refs
  const [activeBirdIndex, setActiveBirdIndex] = useState<number>(0);
  const currentSlotRef = useRef<number>(-1);
  const birdIndexRef = useRef<number>(0);
  const zIndexCounterRef = useRef<number>(10);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const isInsideRef = useRef<boolean>(false);

  // QuickTo functions for custom micro cursor dot
  const cursorX = useRef<gsap.QuickToFunc | null>(null);
  const cursorY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const dot = customCursorRef.current;
    if (!section) return;

    if (dot) {
      cursorX.current = gsap.quickTo(dot, "x", {
        duration: 0.15,
        ease: "power2.out",
      });
      cursorY.current = gsap.quickTo(dot, "y", {
        duration: 0.15,
        ease: "power2.out",
      });
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".archive-header-item", {
        scrollTrigger: {
          trigger: ".archive-header",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".archive-specimen-pill", {
        scrollTrigger: {
          trigger: ".archive-specimens-footer",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Spawn new image in the trail at (x, y)
  const spawnImageAt = (x: number, y: number) => {
    const prevSlot = currentSlotRef.current;
    const nextSlot = (prevSlot + 1) % POOL_SIZE;
    currentSlotRef.current = nextSlot;

    const card = cardRefs.current[nextSlot];
    const img = imgRefs.current[nextSlot];
    const title = titleRefs.current[nextSlot];
    const sci = sciRefs.current[nextSlot];
    const meta = metaRefs.current[nextSlot];

    if (!card) return;

    // Pick current bird and advance index
    const bird = SPECIMENS[birdIndexRef.current];
    setActiveBirdIndex(birdIndexRef.current);
    birdIndexRef.current = (birdIndexRef.current + 1) % SPECIMENS.length;

    // Update card content
    if (img) img.src = bird.image;
    if (title) title.innerText = `${bird.index} / ${bird.commonName}`;
    if (sci) sci.innerText = bird.scientificName;
    if (meta) meta.innerText = `${bird.region} • ${bird.status}`;

    // Raise z-index so newest is always above
    zIndexCounterRef.current += 1;
    card.style.zIndex = zIndexCounterRef.current.toString();

    // Organic random tilt: -7deg to +7deg
    const randomTilt = (Math.random() - 0.5) * 14;

    // Cancel existing animations on this slot
    gsap.killTweensOf(card);

    // Position and reveal new image at cursor
    // Center offset: card width ~280px (w/2 = 140), height ~370px (h/2 = 185)
    gsap.set(card, {
      x: x - 140,
      y: y - 185,
      rotation: randomTilt,
      scale: 0.88,
      opacity: 1,
      visibility: "visible",
    });

    gsap.to(card, {
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
    });

    // CRITICAL USER REQUIREMENT:
    // When the new image appears, the previous image begins to gently fade away right where it was.
    // If the mouse stops moving, no new image appears, so the newest image stays visible indefinitely!
    if (prevSlot !== -1 && cardRefs.current[prevSlot]) {
      const prevCard = cardRefs.current[prevSlot];
      gsap.to(prevCard, {
        opacity: 0,
        scale: 0.94,
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          if (prevCard) prevCard.style.visibility = "hidden";
        },
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update custom dot position
    if (cursorX.current && cursorY.current) {
      cursorX.current(e.clientX);
      cursorY.current(e.clientY);
    }

    if (!lastMousePosRef.current) {
      lastMousePosRef.current = { x, y };
      spawnImageAt(x, y);
      return;
    }

    // Measure distance moved
    const dx = x - lastMousePosRef.current.x;
    const dy = y - lastMousePosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If moved past threshold, spawn next image in trail
    if (distance >= DISTANCE_THRESHOLD) {
      lastMousePosRef.current = { x, y };
      spawnImageAt(x, y);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    isInsideRef.current = true;
    if (customCursorRef.current) {
      gsap.to(customCursorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      });
    }

    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastMousePosRef.current = { x, y };
    spawnImageAt(x, y);
  };

  const handleMouseLeave = () => {
    isInsideRef.current = false;
    lastMousePosRef.current = null;

    if (customCursorRef.current) {
      gsap.to(customCursorRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.25,
      });
    }

    // Gently fade out active card when exiting section
    const current = currentSlotRef.current;
    if (current !== -1 && cardRefs.current[current]) {
      gsap.to(cardRefs.current[current], {
        opacity: 0,
        scale: 0.94,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          if (cardRefs.current[current]) {
            cardRefs.current[current]!.style.visibility = "hidden";
          }
        },
      });
    }
  };

  // Touch screen support for mobile/tablets
  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!sectionRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = sectionRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (!lastMousePosRef.current) {
      lastMousePosRef.current = { x, y };
      spawnImageAt(x, y);
      return;
    }

    const dx = x - lastMousePosRef.current.x;
    const dy = y - lastMousePosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance >= DISTANCE_THRESHOLD) {
      lastMousePosRef.current = { x, y };
      spawnImageAt(x, y);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="archive"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      className="relative w-full min-h-[105vh] bg-[#060807] text-[#F2F0E8] py-24 sm:py-32 md:py-36 px-6 sm:px-10 md:px-14 lg:px-[8vw] border-t border-white/[0.06] overflow-hidden cursor-none select-none flex flex-col justify-between"
    >
      {/* Custom Ultra-Minimal Editorial Cursor Dot */}
      <div
        ref={customCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/70 flex items-center justify-center opacity-0 scale-50 transition-opacity duration-150"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#F2F0E8]" />
      </div>

      {/* Atmospheric Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#1a251f]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Static Watermark Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
        <span className="font-editorial text-[18vw] uppercase tracking-tighter leading-none whitespace-nowrap">
          RARE WINGS
        </span>
      </div>

      {/* Section Header */}
      <div className="archive-header relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/[0.08] pointer-events-none">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="archive-header-item flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[#F2F0E8]/50 font-light">
            <span>ARCHIVE INDEX</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span>SPECIMENS 02 — 07</span>
          </div>

          <h2 className="archive-header-item font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-[0.94] tracking-tight text-[#F2F0E8]">
            THE LIVING
            <br />
            <span className="text-[#F2F0E8]/70">CHRONICLES</span>
          </h2>
        </div>

        {/* Interactive Cue */}
        <div className="archive-header-item flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#F2F0E8]/50 font-light">
          <Sparkles size={14} className="text-[#F2F0E8]/70 animate-pulse" />
          <span>Move cursor to unveil the trail</span>
        </div>
      </div>

      {/* Interactive Trail Canvas Layer */}
      <div
        ref={trailContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      >
        {Array.from({ length: POOL_SIZE }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 w-[240px] sm:w-[270px] md:w-[290px] h-[320px] sm:h-[360px] md:h-[390px] rounded-sm overflow-hidden border border-white/[0.14] bg-[#0c0f0d] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] opacity-0 invisible"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Specimen Photo */}
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                src={SPECIMENS[0].image}
                alt="Specimen Trail"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />

              {/* Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Specimen Metadata Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-0.5 text-left">
                <span
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  className="font-editorial text-base sm:text-lg text-[#F2F0E8] font-normal leading-tight uppercase"
                >
                  {SPECIMENS[0].index} / {SPECIMENS[0].commonName}
                </span>

                <span
                  ref={(el) => {
                    sciRefs.current[i] = el;
                  }}
                  className="font-serif italic text-xs text-[#F2F0E8]/60"
                >
                  {SPECIMENS[0].scientificName}
                </span>

                <span
                  ref={(el) => {
                    metaRefs.current[i] = el;
                  }}
                  className="text-[9px] uppercase tracking-[0.2em] text-[#F2F0E8]/40 pt-1"
                >
                  {SPECIMENS[0].region} • {SPECIMENS[0].status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Central Guide Message (Gentle prompt in negative space) */}
      <div className="relative z-10 my-auto py-24 sm:py-32 flex flex-col items-center justify-center text-center pointer-events-none">
        <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[#F2F0E8]/35 font-light max-w-xl leading-relaxed">
          &ldquo;Gently trace across the canvas to awaken the flight of ancient
          lineages.&rdquo;
        </p>
      </div>

      {/* Bottom Archive Specimens Indicator (Reflecting Active Trail) */}
      <div className="archive-specimens-footer relative z-10 pt-12 border-t border-white/[0.08] pointer-events-none">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {SPECIMENS.map((specimen, idx) => {
            const isHighlighted = activeBirdIndex === idx;

            return (
              <div
                key={specimen.id}
                className={`archive-specimen-pill flex flex-col gap-1 transition-all duration-300 ${
                  isHighlighted ? "opacity-100" : "opacity-35"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#F2F0E8]/50 font-light">
                    {specimen.index}
                  </span>
                  {isHighlighted && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F2F0E8] animate-ping" />
                  )}
                </div>

                <span className="font-editorial text-sm sm:text-base font-normal text-[#F2F0E8] leading-tight">
                  {specimen.commonName}
                </span>

                <span className="text-[10px] uppercase tracking-[0.18em] text-[#F2F0E8]/40 truncate">
                  {specimen.region}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
