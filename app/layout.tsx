import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rare Wings — Resplendent Quetzal",
  description:
    "An emerald apparition hidden among the mist, where the forest still moves at nature's pace. A cinematic editorial archive.",
};

export const viewport: Viewport = {
  themeColor: "#050706",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} dark`}
    >
      <body className="min-h-screen bg-[#060807] text-[#F2F0E8] font-sans antialiased overflow-x-hidden selection:bg-[#F2F0E8]/20 selection:text-[#F2F0E8]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
