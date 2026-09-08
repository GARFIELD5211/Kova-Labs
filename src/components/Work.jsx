import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BgWord from "./BgWord.jsx";
import { BRAND, PROJECTS } from "../data/site.js";
import { ArrowRight, Cross } from "./Icons.jsx";

function ArrowLeft(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

// 15 cards (3 cycles of 5 Kova Labs projects) for seamless infinite wrap
const ITEMS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

const EDGE_MASK =
  "linear-gradient(to right, rgba(245,248,253,0) 0%, rgba(245,248,253,1) 12%, rgba(245,248,253,1) 88%, rgba(245,248,253,0) 100%)";

export default function Work() {
  const [activeModal, setActiveModal] = useState(null);

  const railRef = useRef(null);
  const cardRefs = useRef([]);
  const veilRefs = useRef([]);
  const catRef = useRef(null);
  const clientRef = useRef(null);
  const subRef = useRef(null);
  const stackRef = useRef(null);
  const linkRef = useRef(null);

  const stepToRef = useRef(null);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const u = ITEMS.length;
    if (!rail || cards.length !== u) return;

    cards.forEach((el) => {
      el.style.backfaceVisibility = "visible";
      el.style.transformStyle = "preserve-3d";
    });

    // Start centered on Kova Labs CRM (index 5 - middle cycle)
    let f = 5;
    let v = 5;
    let rafId = 0;
    let isDragging = false;
    let dragDistance = 0;
    let dragVelocity = 0;
    let lastPointerX = 0;
    let startPointerX = 0;
    let startV = 0;
    let isVisible = false;
    let autoInterval;
    let settleTimer;

    let prevClient = "";
    let prevTextOp = "";

    const cache = cards.map(() => ({
      t: "",
      o: "",
      z: "",
      f: "",
      p: "",
      v: "",
    }));

    const updateTransforms = () => {
      const cardWidth = cards[0].offsetWidth || 500;
      const t = Math.min(1, (rail.offsetWidth || cardWidth) / 900);

      for (let i = 0; i < u; i++) {
        const card = cards[i];
        let r = (((i - f) % u) + u) % u;
        if (r > u / 2) r -= u;
        const a = Math.abs(r);
        const sign = r < 0 ? -1 : 1;
        const expPow = Math.pow(a, 1.3);
        const offsetComp = 0.5 * cardWidth * (1 - Math.exp(-3 * a));
        const posX =
          sign *
          t *
          ((0.58 * cardWidth * (1 - Math.pow(0.8, expPow))) / 0.2 + offsetComp);
        const scale = Math.max(0.32, Math.pow(0.8, a));
        const rotY = 48 * sign * a * t;
        const posZ = -520 * (1 - Math.exp(-0.9 * a)) * t;

        const transformStr = `translate3d(${posX.toFixed(1)}px, 0, ${posZ.toFixed(0)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        if (cache[i].t !== transformStr) {
          card.style.transform = transformStr;
          cache[i].t = transformStr;
        }

        const opacity = Math.max(0, Math.min(1, (5.4 - a) / 1.4)).toFixed(3);
        if (cache[i].o !== opacity) {
          card.style.opacity = opacity;
          cache[i].o = opacity;
        }

        const zIndex = String(200 - Math.round(20 * a));
        if (cache[i].z !== zIndex) {
          card.style.zIndex = zIndex;
          cache[i].z = zIndex;
        }

        const filter =
          `brightness(${Math.max(0.55, 1 - 0.16 * a).toFixed(3)})` +
          (a > 2.4 ? ` blur(${Math.min(2, (a - 2.4) * 0.7).toFixed(1)}px)` : "");
        if (cache[i].f !== filter) {
          card.style.filter = filter;
          cache[i].f = filter;
        }

        const pe = a < 2.6 ? "auto" : "none";
        if (cache[i].p !== pe) {
          card.style.pointerEvents = pe;
          cache[i].p = pe;
        }

        const veil = veilRefs.current[i];
        const veilOp = Math.min(0.48, Math.max(0, (a - 0.35) * 0.22)).toFixed(3);
        if (veil && cache[i].v !== veilOp) {
          veil.style.opacity = veilOp;
          cache[i].v = veilOp;
        }
      }

      // Update text indicators
      const roundF = Math.round(f);
      const item = ITEMS[((roundF % u) + u) % u];
      const catEl = catRef.current;
      const clientEl = clientRef.current;
      const subEl = subRef.current;
      const stackEl = stackRef.current;
      const linkEl = linkRef.current;

      if (clientEl && item) {
        if (prevClient !== item.client) {
          prevClient = item.client;
          if (catEl) catEl.textContent = item.category;
          clientEl.textContent = item.client;
          if (subEl) subEl.textContent = item.title;
          if (linkEl) {
            linkEl.href = item.url;
            linkEl.textContent = item.urlLabel;
          }
          if (stackEl) {
            stackEl.innerHTML = item.stack
              .map(
                (s) =>
                  `<span class="rounded-full border border-ice-200/80 bg-ice-100/90 px-3 py-1 text-xs font-medium text-night-950/70 shadow-sm">${s}</span>`
              )
              .join("");
          }
        }
        const textOp = Math.max(0, 1 - 3 * Math.abs(f - roundF)).toFixed(2);
        if (prevTextOp !== textOp) {
          prevTextOp = textOp;
          if (catEl) catEl.style.opacity = textOp;
          clientEl.style.opacity = textOp;
          if (subEl) subEl.style.opacity = textOp;
          if (stackEl) stackEl.style.opacity = textOp;
          if (linkEl) linkEl.style.opacity = textOp;
        }
      }
    };

    const animateStep = () => {
      if (!isFinite(v)) v = 0;
      if (rafId) return;

      const step = () => {
        rafId = 0;
        const delta = v - f;
        f += 0.13 * delta;
        if (Math.abs(v - f) < 0.0004) f = v;
        updateTransforms();
        if (f !== v) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
    };

    stepToRef.current = (dir) => {
      v = Math.round(v) + dir;
      animateStep();
    };

    const startAutoPlay = () => {
      if (!autoInterval && isVisible) {
        autoInterval = setInterval(() => {
          if (
            isDragging ||
            !isVisible ||
            document.hidden ||
            Math.abs(v - f) > 1.5
          ) {
            return;
          }
          v = Math.round(v) + 1;
          animateStep();
        }, 2800);
      }
    };

    const stopAutoPlay = () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = undefined;
      }
    };

    // Horizontal wheel / trackpad scroll handling
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      v += e.deltaX / 320;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        v = Math.round(v);
        animateStep();
      }, 150);
      animateStep();
    };
    rail.addEventListener("wheel", onWheel, { passive: false });

    // Pointer drag handling
    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      dragDistance = 0;
      dragVelocity = 0;
      lastPointerX = startPointerX = e.clientX;
      startV = v;
      rail.style.cursor = "grabbing";
      try {
        rail.setPointerCapture(e.pointerId);
      } catch {}
      clearTimeout(settleTimer);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const unit = 0.66 * (cards[0].offsetWidth || 500);
      dragDistance += Math.abs(e.clientX - lastPointerX);
      dragVelocity = (e.clientX - lastPointerX) / unit;
      lastPointerX = e.clientX;
      v = startV - (e.clientX - startPointerX) / unit;
      animateStep();
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      rail.style.cursor = "grab";
      const isClick = dragDistance <= 6;

      v = Math.round(v - 1.2 * dragVelocity);
      animateStep();

      if (isClick) {
        const hitEl = document.elementFromPoint(e.clientX, e.clientY);
        const hitCard = hitEl?.closest("[data-card]");
        const idx = hitCard ? cards.indexOf(hitCard) : -1;
        if (idx !== -1) {
          let diff = (((idx - Math.round(v)) % u) + u) % u;
          if (diff > u / 2) diff -= u;
          if (diff !== 0) {
            // Clicked an off-center card -> rotate to it
            v = Math.round(v) + diff;
            animateStep();
          } else {
            // Clicked the centered card -> open details modal
            const selected = ITEMS[((idx % u) + u) % u];
            setActiveModal(selected);
          }
        }
      }
    };

    const onPointerCancel = () => {
      isDragging = false;
      rail.style.cursor = "grab";
    };

    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove, { passive: true });
    rail.addEventListener("pointerup", onPointerUp);
    rail.addEventListener("pointercancel", onPointerCancel);

    const onVisibilityChange = () => {
      if (!document.hidden) {
        f = v = Math.round(v);
        updateTransforms();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((entry) => entry.isIntersecting);
          if (visible !== isVisible) {
            isVisible = visible;
            updateTransforms();
            if (visible) startAutoPlay();
            else stopAutoPlay();
          }
        },
        { rootMargin: "200px 0px" }
      );
      observer.observe(rail);
    } else {
      isVisible = true;
      startAutoPlay();
    }

    const onResize = () => updateTransforms();
    window.addEventListener("resize", onResize);

    updateTransforms();

    return () => {
      stopAutoPlay();
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(settleTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      rail.removeEventListener("wheel", onWheel);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", onPointerUp);
      rail.removeEventListener("pointercancel", onPointerCancel);
    };
  }, []);

  // Keyboard accessibility: Escape to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="work"
      className="relative z-0 select-none overflow-hidden bg-ice-50 pt-28 pb-20 text-night-950 sm:pt-36 sm:pb-24"
    >
      {/* Drifting background typography watermark */}
      <BgWord speed={0.25}>WORK</BgWord>

      {/* Soft atmospheric lighting ground */}
      <div
        data-ground="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 75% at 50% 8%, rgba(46,107,255,0.09) 0%, transparent 62%), radial-gradient(120% 70% at 50% 94%, rgba(91,140,255,0.06) 0%, transparent 55%)",
          backgroundSize: "cover, cover",
        }}
      />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Selected work</p>

          <h2 className="h2 mt-3 text-night-950">Projects that ship.</h2>

          <p className="lead mt-3 text-night-950/60">
            Five engineered builds for ambitious teams — each one live, and
            owned end-to-end by its client.
          </p>

          <p className="mt-2 text-xs font-semibold tracking-[0.18em] uppercase text-night-950/40">
            Drag to browse · Click a card to explore
          </p>
        </div>
      </div>

      {/* 3D Rail container */}
      <div className="relative z-10 mt-8 sm:mt-12">
        {/* Left Arrow Button */}
        <button
          onClick={() => stepToRef.current?.(-1)}
          aria-label="Previous project"
          className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ice-200 bg-white/95 text-night-950 shadow-[0_12px_32px_rgba(15,30,60,0.18)] transition duration-300 hover:scale-110 hover:bg-white hover:text-accent-600 sm:flex sm:h-12 sm:w-12 sm:left-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => stepToRef.current?.(1)}
          aria-label="Next project"
          className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ice-200 bg-white/95 text-night-950 shadow-[0_12px_32px_rgba(15,30,60,0.18)] transition duration-300 hover:scale-110 hover:bg-white hover:text-accent-600 sm:flex sm:h-12 sm:w-12 sm:right-6"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <div
          ref={railRef}
          data-rail="true"
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(320px, 28vw, 490px)",
            perspective: 1150,
            perspectiveOrigin: "50% 50%",
            overflow: "hidden",
            touchAction: "pan-y",
            userSelect: "none",
            cursor: "grab",
            WebkitMaskImage: EDGE_MASK,
            maskImage: EDGE_MASK,
          }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={`${item.client}-${i}`}
              ref={(el) => (cardRefs.current[i] = el)}
              data-card="true"
              style={{
                "--cw": "clamp(300px, 32vw, 620px)",
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: "calc(var(--cw) * -0.5)",
                marginTop: "calc(var(--cw) * -0.3335)",
                width: "var(--cw)",
                aspectRatio: "3 / 2",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
                boxSizing: "border-box",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow:
                  "0 24px 60px -20px rgba(15,30,60,0.35), 0 4px 14px rgba(15,30,60,0.08)",
              }}
              className="border border-ice-200/90 bg-white"
            >
              <div className="relative h-full w-full overflow-hidden">
                {/* Browser top-bar */}
                <div className="flex items-center justify-between border-b border-ice-200/70 bg-ice-100/90 px-3.5 py-2.5 backdrop-blur">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="truncate text-[10.5px] font-medium text-night-950/50">
                    {item.urlLabel}
                  </span>
                  <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-[9.5px] font-semibold tracking-wider text-accent-600 uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Screenshot image */}
                <img
                  src={item.image}
                  alt={item.client}
                  draggable={false}
                  decoding="async"
                  loading="eager"
                  className="h-[calc(100%-35px)] w-full object-cover object-top"
                />

                {/* Metric pill badge pinned to bottom-left */}
                <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2">
                  <span className="rounded-full border border-ice-200/80 bg-white/95 px-3 py-1 text-[11px] font-semibold text-night-950 shadow-md backdrop-blur-md">
                    <span className="font-bold text-accent-500">
                      {item.metric}
                    </span>{" "}
                    · {item.metricLabel}
                  </span>
                </div>

                {/* Veil overlay for distance falloff */}
                <span
                  ref={(el) => (veilRefs.current[i] = el)}
                  data-veil="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(236, 242, 250, 0.85)",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Card Details Below Rail */}
      <div className="container-x relative z-10 mt-8">
        <div
          style={{
            minHeight: "clamp(120px, 10vw, 150px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            textAlign: "center",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            isolation: "isolate",
          }}
        >
          {/* Category */}
          <span
            ref={catRef}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-500 transition-opacity duration-200"
          >
            B2B Software
          </span>

          {/* Client Title */}
          <h3
            ref={clientRef}
            className="text-3xl font-bold tracking-tight text-night-950 transition-[color,opacity] duration-200 sm:text-4xl"
          >
            Kova Labs CRM
          </h3>

          {/* Project Subtitle / Scope */}
          <p
            ref={subRef}
            className="max-w-xl text-sm leading-relaxed text-night-950/65 transition-[color,opacity] duration-200 sm:text-base"
          >
            B2B travel agency CRM platform with dual admin/agent portals.
          </p>

          {/* Stack Pills container */}
          <div
            ref={stackRef}
            className="mt-1 flex flex-wrap items-center justify-center gap-2 transition-opacity duration-200"
          >
            <span className="rounded-full border border-ice-200/80 bg-ice-100/90 px-3 py-1 text-xs font-medium text-night-950/70 shadow-sm">
              React
            </span>
            <span className="rounded-full border border-ice-200/80 bg-ice-100/90 px-3 py-1 text-xs font-medium text-night-950/70 shadow-sm">
              TypeScript
            </span>
            <span className="rounded-full border border-ice-200/80 bg-ice-100/90 px-3 py-1 text-xs font-medium text-night-950/70 shadow-sm">
              CRM
            </span>
          </div>

          {/* Action links */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              ref={linkRef}
              href="https://crm-lancer-9gl5.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary !px-5 !py-2 text-xs font-semibold"
            >
              Visit live site <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => {
                const centerItem =
                  ITEMS[
                    ((Math.round(
                      cardRefs.current.findIndex((c) =>
                        c?.style.transform.includes("scale(1.")
                      ) || 0
                    ) %
                      ITEMS.length) +
                      ITEMS.length) %
                      ITEMS.length
                  ] || ITEMS[0];
                setActiveModal(centerItem);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-white px-4 py-2 text-xs font-semibold text-night-950 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-ice-100"
            >
              Case Study & Details
            </button>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-night-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setActiveModal(null)}
          />

          {/* Dialog Window */}
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-night-950 text-white shadow-2xl transition-all duration-300">
            {/* Header image preview */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-night-900">
              <img
                src={activeModal.image}
                alt={activeModal.client}
                className="h-full w-full object-cover object-top"
              />
              <button
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-night-950/70 text-white backdrop-blur transition hover:scale-105 hover:bg-night-950"
                aria-label="Close modal"
              >
                <Cross className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="rounded-full bg-accent-500 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                  {activeModal.category}
                </span>
                <span className="rounded-full bg-night-950/80 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                  {activeModal.metric} · {activeModal.metricLabel}
                </span>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {activeModal.client}
                </h3>
                <span className="text-xs font-semibold text-accent-400">
                  {activeModal.secondary}
                </span>
              </div>

              <p className="mt-2 text-sm text-white/70">
                {activeModal.title}
              </p>

              {/* Problem & Solution */}
              <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-accent-400">
                    The Challenge:
                  </span>
                  <p className="mt-1 text-white/70">{activeModal.problem}</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <span className="font-semibold text-accent-400">
                    The Architectural Solution:
                  </span>
                  <p className="mt-1 text-white/70">{activeModal.solution}</p>
                </div>
              </div>

              {/* Stack tags */}
              {activeModal.stack && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {activeModal.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Modal actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:border-white hover:text-white"
                >
                  Close
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href={activeModal.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary !px-5 !py-2.5 text-xs font-semibold"
                  >
                    Open live site <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={BRAND.emailUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-400/40 bg-accent-500/20 px-5 py-2.5 text-xs font-semibold text-accent-400 transition hover:bg-accent-500 hover:text-white"
                  >
                    Start a project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
