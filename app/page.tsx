import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HabitatSection from "@/components/HabitatSection";
import ArchiveSection from "@/components/ArchiveSection";

export default function Home() {
  return (
    <main className="relative min-h-[100svh] w-full bg-[#060807] overflow-x-hidden selection:bg-[#F2F0E8]/20 selection:text-[#F2F0E8]">
      <Navbar />
      <HeroSection />
      <HabitatSection />
      <ArchiveSection />

      {/* Editorial Minimal Footer */}
      <footer className="w-full bg-[#060807] border-t border-white/[0.08] py-14 px-6 sm:px-10 md:px-14 lg:px-[8vw] flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] uppercase tracking-[0.24em] font-light text-[#F2F0E8]/40">
        <div>RARE WINGS — ANTHOLOGY OF FLIGHT</div>
        <div>GLOBAL CANOPY & AVIAN CONSERVATION © 2026</div>
      </footer>
    </main>
  );
}
