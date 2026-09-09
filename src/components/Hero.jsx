import React from "react";
import { FloatingIconsHero, demoIcons } from "@/components/ui/floating-icons-hero-section";
import FlowScene from "./FlowScene.jsx";

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0A0E14]">
      {/* Living ambient background scene with cosmic stars & dune glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <FlowScene id="hero-scene" stars className="!top-auto h-full" />
        {/* Cinematic radial vignette to enhance floating icon contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 85% at 50% 45%, rgba(46, 107, 255, 0.08) 0%, rgba(10, 14, 20, 0.4) 50%, #0A0E14 95%)",
          }}
        />
      </div>

      {/* Floating Icons Hero Section - pure main brand typography only */}
      <FloatingIconsHero
        id="top"
        className="relative z-10 !bg-transparent min-h-[100svh] flex items-center justify-center pt-20 pb-16"
        icons={demoIcons}
        title={
          <span className="block text-[clamp(3.2rem,11.5vw,8.5rem)] font-extrabold tracking-tight text-[#F4F8FD] leading-none whitespace-nowrap select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            KOVALABS<span className="text-accent-500 punkt">.</span>
          </span>
        }
      />
    </div>
  );
}
