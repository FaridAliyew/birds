"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent border-b border-white/[0.06]">
      <nav
        aria-label="Primary Navigation"
        className="w-full px-6 sm:px-10 md:px-14 lg:px-16 py-6 sm:py-7 flex items-center justify-between"
      >
        {/* Brand / Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="inline-block text-[13px] sm:text-[14px] uppercase tracking-[0.28em] font-light text-[#F2F0E8] hover:text-white transition-opacity duration-300"
          >
            RARE WINGS
          </Link>
        </div>

        {/* Center / Navigation Links (Desktop & Tablet) */}
        <ul className="hidden md:flex items-center gap-10 lg:gap-14 text-[12px] uppercase tracking-[0.2em] font-light text-[#F2F0E8]/70">
          <li>
            <Link
              href="#species"
              className="relative py-1 hover:text-[#F2F0E8] transition-colors duration-300 group"
            >
              Species
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F2F0E8]/60 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link
              href="#journal"
              className="relative py-1 hover:text-[#F2F0E8] transition-colors duration-300 group"
            >
              Journal
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F2F0E8]/60 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link
              href="#conservation"
              className="relative py-1 hover:text-[#F2F0E8] transition-colors duration-300 group"
            >
              Conservation
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F2F0E8]/60 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </li>
        </ul>

        {/* Far Right: Explore Link */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <Link
            href="#explore"
            className="group inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] font-light text-[#F2F0E8] py-1 border-b border-white/20 hover:border-white/70 transition-all duration-300"
          >
            <span>Explore</span>
            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F2F0E8]/80 hover:text-[#F2F0E8] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={20} strokeWidth={1.25} />
            ) : (
              <Menu size={20} strokeWidth={1.25} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-[#060807]/95 backdrop-blur-md z-50 flex flex-col justify-between px-8 py-12 transition-all duration-500 animate-in fade-in">
          <ul className="flex flex-col gap-8 text-[13px] uppercase tracking-[0.24em] font-light text-[#F2F0E8]/80">
            <li>
              <Link
                href="#species"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Species
              </Link>
            </li>
            <li>
              <Link
                href="#journal"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Journal
              </Link>
            </li>
            <li>
              <Link
                href="#conservation"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Conservation
              </Link>
            </li>
          </ul>

          <div className="pt-8 border-t border-white/[0.08]">
            <Link
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] font-light text-[#F2F0E8]"
            >
              <span>Explore Collection</span>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
