import { useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import { Spark } from "./Icons.jsx";

const ROW_A = ["WEB APPS", "SEO", "SHOPIFY PLUS", "MOTION", "CRO"];
const ROW_B = ["AI AUTOMATION", "SAAS MVP", "API INTEGRATIONS", "BRANDING", "UI·UX"];

function Row({ items, reverse = false, duration = 30, offset = "0s" }) {
  // three copies per half so the tilted, oversized panel never shows a gap
  const half = [...items, ...items, ...items];

  return (
    <div
      className={`marquee-row ${reverse ? "marquee-row-reverse" : ""} flex w-max items-center`}
      style={{ animationDuration: `${duration}s`, animationDelay: offset }}
    >
      {[0, 1].map((halfIndex) => (
        <div key={halfIndex} className="flex items-center" aria-hidden={halfIndex === 1}>
          {half.map((item, i) => (
            <span key={i} className="flex items-center gap-7 pr-7 sm:gap-10 sm:pr-10">
              <span
                className={`whitespace-nowrap text-4xl font-extrabold tracking-tight sm:text-6xl ${
                  i % 2 === 0 ? "text-night-950" : "text-outline-dark"
                }`}
              >
                {item}
              </span>
              <Spark className="h-5 w-5 shrink-0 text-accent-500 sm:h-6 sm:w-6" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  /* rows shear with scroll velocity — the premium touch */
  const skewRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    let last = window.scrollY;
    let vel = 0;
    const loop = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      const target = Math.max(-9, Math.min(9, dy * 0.55));
      vel += (target - vel) * 0.12;
      if (skewRef.current) {
        skewRef.current.style.transform = `skewX(${(-vel).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative z-10 -mt-12 overflow-hidden rounded-t-[3rem] bg-white pb-6 pt-16 sm:pt-20"
      aria-label="Disciplines marquee"
    >
      <div ref={skewRef} className="space-y-7 overflow-hidden will-change-transform sm:space-y-9">
        <Row items={ROW_A} duration={42} />
        <Row items={ROW_B} reverse duration={52} offset="-18s" />
      </div>

      <Reveal className="mt-12 text-center sm:mt-14">
        <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-accent-500 uppercase">
          <span className="h-px w-8 bg-accent-500/40" />
          Brand in motion
          <span className="h-px w-8 bg-accent-500/40" />
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-950 sm:text-4xl">
          <RevealText text="A presence that feels alive." delay={100} />
        </h2>
      </Reveal>
    </section>
  );
}
