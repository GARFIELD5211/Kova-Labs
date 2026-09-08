import { useEffect, useRef } from "react";
import FlowScene from "./FlowScene.jsx";
import { BRAND } from "../data/site.js";

/**
 * Hero — exact Nordpixel-style: a full-viewport living dark scene with
 * nothing but the giant wordmark and a scroll cue. No nav, no badges,
 * no CTAs — the wordmark IS the hero.
 */
export default function Hero() {
  const markRef = useRef(null);

  /* letter-spacing contracts on load — the nordpixel brandIn animation */
  useEffect(() => {
    const el = markRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.letterSpacing = "0.14em";
      return;
    }
    el.style.letterSpacing = "0.3em";
    el.style.opacity = "0";
    /* force style flush before transitioning */
    void el.offsetWidth;
    el.style.transition = "letter-spacing 2.6s cubic-bezier(0.16,1,0.3,1), opacity 1.4s ease 0.15s";
    requestAnimationFrame(() => {
      el.style.letterSpacing = "0.14em";
      el.style.opacity = "1";
    });
  }, []);

  /* subtle scroll drift on the background scene */
  const bgRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!bgRef.current) return;
        const y = window.scrollY;
        bgRef.current.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0)`;
        bgRef.current.style.opacity = `${Math.max(0, 1 - y / (window.innerHeight * 0.9)).toFixed(3)}`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#0A0E14] text-center">
      {/* living background — dune scene + fog + stars, drifting slowly */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <FlowScene id="hero-scene" stars className="!top-auto h-full" />
        {/* cinematic vignette — same recipe as nordpixel */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 40%, transparent 30%, rgba(10,14,20,0.55) 100%), linear-gradient(180deg, rgba(10,14,20,0.72) 0%, rgba(10,14,20,0.34) 30%, rgba(10,14,20,0.42) 60%, rgba(10,14,20,0.9) 88%, #0A0E14 100%)",
          }}
        />
      </div>

      {/* the wordmark — the only content, like nordpixel */}
      <div className="relative z-10 px-4">
        <p
          ref={markRef}
          className="select-none whitespace-nowrap text-[clamp(2.4rem,10.5vw,8.25rem)] font-bold leading-[1.05] text-[#F4F8FD]"
          style={{ marginRight: "-0.14em", textShadow: "0 2px 16px rgba(6,10,16,0.6), 0 10px 70px rgba(6,10,16,0.55)" }}
        >
          KOVALABS<span className="punkt">.</span>
        </p>
      </div>

      {/* scroll cue — centered line dropping, exactly like nordpixel */}
      <a
        href="#work"
        className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
        aria-label="Scroll to work"
      >
        <span className="text-[10.5px] font-medium uppercase tracking-[0.3em] text-white/45">
          Scroll
        </span>
        <i className="scrolldrop block h-[42px] w-px origin-top bg-gradient-to-b from-accent-400 to-transparent" />
      </a>
    </section>
  );
}
