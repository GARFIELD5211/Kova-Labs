import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar.jsx";
import Cursor from "./components/Cursor.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Hero from "./components/Hero.jsx";
import BrandBand from "./components/BrandBand.jsx";
import Work from "./components/Work.jsx";
import Why from "./components/Why.jsx";
import Services from "./components/Services.jsx";
import Mvp from "./components/Mvp.jsx";
import Engagement from "./components/Engagement.jsx";
import Comparison from "./components/Comparison.jsx";
import Team from "./components/Team.jsx";
import Marquee from "./components/Marquee.jsx";
import Program from "./components/Program.jsx";
import Faq from "./components/Faq.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  /* Lenis fluid smooth scrolling + eased anchor navigation */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (hash.length > 1 && document.querySelector(hash)) {
        e.preventDefault();
        lenis.scrollTo(hash, { offset: -88, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  /* gentle parallax on marked decorative layers — vertical + horizontal */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll("[data-parallax], [data-parallax-x]")
    );
    if (!els.length) return;

    let raf;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of els) {
        const horizontal = "parallaxX" in el.dataset;
        const speed = parseFloat(
          (horizontal ? el.dataset.parallaxX : el.dataset.parallax) || "0"
        );
        const parent = el.parentElement;
        if (!parent) continue;
        const r = parent.getBoundingClientRect();
        const delta = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = horizontal
          ? `translate3d(${delta.toFixed(1)}px, 0, 0)`
          : `translate3d(0, ${delta.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-ice-50">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <BrandBand />
        <Work />
        <Why />
        <Services />
        <Mvp />
        <Engagement />
        <Comparison />
        <Team />
        <Marquee />
        <Program />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
