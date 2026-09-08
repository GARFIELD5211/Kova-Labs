import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import BgWord from "./BgWord.jsx";
import { BRAND, PROJECTS } from "../data/site.js";
import { ArrowRight } from "./Icons.jsx";

/* portrait card showing the real built project */
function PortraitCard({ p }) {
  return (
    <div className="w-[240px] shrink-0 snap-center sm:w-[280px]">
      <div
        data-card
        className="work-card relative overflow-hidden rounded-[2rem] border border-ice-200 bg-white shadow-[0_24px_60px_-40px_rgba(15,30,60,0.35)]"
      >
        <img
          src={p.image}
          alt={`${p.client} — ${p.title}`}
          loading="lazy"
          className="h-[380px] w-full object-cover object-top sm:h-[420px]"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-night-950 shadow backdrop-blur">
          {p.metric} · {p.metricLabel}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-night-950/45">
            {p.category}
          </p>
          <p className="text-sm font-semibold">{p.client}</p>
        </div>
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${p.client} live site`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ice-300 text-night-950/60 transition duration-300 hover:-translate-y-0.5 hover:bg-night-950 hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function Work() {
  const scroller = useRef(null);
  const paused = useRef(false);
  const settle = useRef(null);
  const lastCenter = useRef(-1);
  const [centered, setCentered] = useState(0);

  /* lift whichever card sits closest to the center of the line */
  const updateCenter = () => {
    const el = scroller.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-card]");
    const er = el.getBoundingClientRect();
    const mid = er.left + er.width / 2;
    let best = -1;
    let bestD = Infinity;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best !== lastCenter.current) {
      cards.forEach((card, i) => card.classList.toggle("is-center", i === best));
      lastCenter.current = best;
    }
    const project = ((best % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setCentered((prev) => (prev === project ? prev : project));
  };

  /* keep manual scrolling inside the first lap */
  const normalize = () => {
    const el = scroller.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-card]");
    if (cards.length < 2) return;
    const n = PROJECTS.length;
    const period =
      cards[n].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    const firstInContent =
      cards[0].getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    while (
      period > 0 &&
      el.scrollLeft >= firstInContent + period &&
      el.scrollLeft - period >= 0
    ) {
      el.scrollLeft -= period;
    }
  };

  /* glide so the neighbouring card lands dead-center; circles both ways */
  const stepTo = (dir, instant = false) => {
    const el = scroller.current;
    if (!el) return;

    const cards = [...el.querySelectorAll("[data-card]")];
    const n = PROJECTS.length;
    const period =
      cards[n].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;

    let nearest = 0;
    let bestD = Infinity;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        nearest = i;
      }
    });

    /* stepping off either end: shift one period first — content is periodic */
    if (dir > 0 && nearest >= cards.length - 1) {
      el.scrollLeft -= period;
      nearest -= n;
    }
    if (dir < 0 && nearest <= 0) {
      el.scrollLeft += period;
      nearest += n;
    }

    const card = cards[nearest + dir];
    const cardLeft =
      card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    const target = cardLeft - (el.clientWidth - card.offsetWidth) / 2;

    el.scrollTo({ left: target, behavior: instant ? "auto" : "smooth" });

    if (!instant) {
      paused.current = true;
      clearTimeout(settle.current);
      settle.current = setTimeout(() => (paused.current = false), 600);
    }
  };

  /* on mount, center the second copy of project 1 — same visual, but with
     cards bleeding on both sides so it reads as a proper carousel */
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-card]");
    const card = cards[PROJECTS.length];
    const cardLeft =
      card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    el.scrollTo({
      left: cardLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "auto",
    });
  }, []);

  /* glide straight to a chosen project, taking the short way around */
  const goTo = (i) => {
    const el = scroller.current;
    if (!el) return;
    const cards = [...el.querySelectorAll("[data-card]")];
    const n = PROJECTS.length;
    const period =
      cards[n].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;

    let nearest = 0;
    let bestD = Infinity;
    cards.forEach((card, idx) => {
      const r = card.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        nearest = idx;
      }
    });

    const nearestProject = ((nearest % n) + n) % n;
    let delta = i - nearestProject;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;

    let targetIdx = nearest + delta;
    while (targetIdx < 0) {
      el.scrollLeft += period;
      targetIdx += n;
    }
    while (targetIdx >= cards.length) {
      el.scrollLeft -= period;
      targetIdx -= n;
    }

    const card = cards[targetIdx];
    const cardLeft =
      card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    const target = cardLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });

    paused.current = true;
    clearTimeout(settle.current);
    settle.current = setTimeout(() => (paused.current = false), 600);
  };

  /* hold ~2.4s on each centered card, then glide to the next */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (window.__KOVA_PAUSED__ || paused.current || document.hidden) return;
      stepTo(1);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  /* keep the is-center lift in sync during manual scrolling */
  useEffect(() => {
    let raf;
    let last = 0;
    const loop = (t) => {
      if (t - last > 120) {
        updateCenter();
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden bg-white py-24">
      <BgWord speed={0.25}>WORK</BgWord>
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Selected work</p>
          <h2 className="h2 mt-3">
            <RevealText text="Projects that ship." />
          </h2>
          <p className="lead mt-4">
            Five engineered builds for ambitious teams — each one live, and
            owned end-to-end by its client.
          </p>
        </Reveal>
      </div>

      <Reveal delay={150} from="scale">
        <div
          className="relative z-10 mt-10"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
          onTouchEnd={() => setTimeout(() => (paused.current = false), 2500)}
        >
          <button
            onClick={() => stepTo(-1)}
            aria-label="Previous project"
            className="absolute left-3 top-[42%] z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ice-200 bg-white text-night-950 shadow-xl transition duration-300 hover:scale-105 hover:bg-ice-100 sm:left-6"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={() => stepTo(1)}
            aria-label="Next project"
            className="absolute right-3 top-[42%] z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ice-200 bg-white text-night-950 shadow-xl transition duration-300 hover:scale-105 hover:bg-ice-100 sm:right-6"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* side padding always equals half the leftover space, so any card can sit dead-center */}
          <div
            ref={scroller}
            onScroll={normalize}
            className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto py-8 px-[max(1rem,calc((100%-240px)/2))] sm:px-[max(1.5rem,calc((100%-280px)/2))]"
          >
            {[...PROJECTS, ...PROJECTS, ...PROJECTS].map((p, i) => (
              <PortraitCard key={`${p.client}-${i}`} p={p} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* slide dots — which project is centered */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {PROJECTS.map((p, i) => (
          <button
            key={p.client}
            onClick={() => goTo(i)}
            aria-label={`Go to ${p.client}`}
            aria-current={centered === i}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              centered === i
                ? "w-8 bg-accent-500"
                : "w-2.5 bg-night-950/20 hover:bg-night-950/40"
            }`}
          />
        ))}
      </div>

      <div className="container-x mt-14 text-center">
        <Reveal delay={100}>
          <p className="text-sm text-night-950/45">
            Full portfolio with live links on{" "}
            <a
              href={`${BRAND.site}/projects`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-600 transition hover:text-accent-500"
            >
              kovalabs.tech/projects
            </a>
          </p>
          <a href={BRAND.emailUrl} className="btn-dark mt-6">
            Your product, next — start a project
          </a>
        </Reveal>
      </div>
    </section>
  );
}
