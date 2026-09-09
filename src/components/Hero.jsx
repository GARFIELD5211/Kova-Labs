import React from "react";
import { FloatingIconsHero, demoIcons } from "@/components/ui/floating-icons-hero-section";
import { Button } from "@/components/ui/button";
import FlowScene from "./FlowScene.jsx";
import { BRAND, HERO } from "../data/site.js";

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

      {/* Floating Icons Hero Section */}
      <FloatingIconsHero
        id="top"
        className="relative z-10 !bg-transparent min-h-[100svh] pt-24 pb-12 sm:pt-28 sm:pb-16"
        icons={demoIcons}
        title={
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-accent-400 mb-5 sm:mb-6 shadow-sm max-w-[92vw] text-center">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-500 animate-pulse shrink-0" />
              <span className="truncate">{HERO.eyebrow}</span>
            </span>
            <span className="block text-[clamp(2.5rem,8.5vw,6.5rem)] font-extrabold tracking-tight text-[#F4F8FD] leading-[1.04]">
              {HERO.headline}
              <span className="text-accent-500 punkt">.</span>
            </span>
          </div>
        }
        subtitle={HERO.sub}
      >
        {/* Action CTAs */}
        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-accent-500 hover:bg-accent-400 text-white font-semibold text-sm shadow-[0_16px_36px_-12px_rgba(46,107,255,0.7)] hover:shadow-[0_22px_44px_-12px_rgba(46,107,255,0.85)] hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <a href="#work">Explore Our Work</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 px-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm backdrop-blur-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <a href={BRAND.emailUrl}>Start a Project</a>
          </Button>
        </div>

        {/* Scroll cue dropping toward work section */}
        <a
          href="#work"
          className="mt-14 flex flex-col items-center gap-2.5 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Scroll to work"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
            Scroll
          </span>
          <i className="scrolldrop block h-[36px] w-px origin-top bg-gradient-to-b from-accent-400 to-transparent" />
        </a>
      </FloatingIconsHero>
    </div>
  );
}
