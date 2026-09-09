import React, { useRef, useLayoutEffect, useEffect, useState, useCallback } from "react";
import { BRAND, PROJECTS } from "../data/site.js";
import { ArrowRight } from "./Icons.jsx";

// Double the project list so the infinite 3D loop has seamless buffer
const CARDS = [...PROJECTS, ...PROJECTS];

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

export default function Work() {
  const railRef = useRef(null);
  const cardRefs = useRef([]);
  const veilRefs = useRef([]);
  const discRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);

  const [activeProject, setActiveProject] = useState(CARDS[0]);

  // Physics animation state
  const currentPos = useRef(0);
  const targetPos = useRef(0);
  const animFrameId = useRef(0);
  const wheelTimeout = useRef(null);

  // Drag tracking state
  const isDragging = useRef(false);
  const dragDist = useRef(0);
  const dragVelocity = useRef(0);
  const lastClientX = useRef(0);
  const startClientX = useRef(0);
  const startTargetPos = useRef(0);
  const lastTitle = useRef("");
  const lastOpacity = useRef("");
  const isInView = useRef(true);

  // Caching transform records to avoid DOM layout thrashing
  const cache = useRef([]);

  // Exact 3D Coverflow math from hadiyakhawar.com
  const updateTransforms = useCallback(() => {
    const rail = railRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const total = CARDS.length;
    if (!rail || cards.length !== total) return;

    if (cache.current.length !== total) {
      cache.current = cards.map(() => ({ t: "", o: "", z: "", f: "", p: "", v: "" }));
    }

    const cardWidth = cards[0].offsetWidth || 480;
    const railScale = Math.min(1, (rail.offsetWidth || cardWidth) / 900);

    for (let i = 0; i < total; i++) {
      const card = cards[i];
      // TRUE INFINITE MODULO WRAP
      let rel = ((i - currentPos.current) % total + total) % total;
      if (rel > total / 2) rel -= total;

      const dist = Math.abs(rel);
      const dir = rel < 0 ? -1 : 1;

      // Exact mathematical curves from hadiyakhawar.com:
      const powDist = Math.pow(dist, 1.3);
      const expOffset = 0.5 * cardWidth * (1 - Math.exp(-3 * dist));
      const tx = dir * railScale * ((0.58 * cardWidth * (1 - Math.pow(0.8, powDist))) / 0.2 + expOffset);
      const scale = Math.max(0.3, Math.pow(0.8, dist));
      const rotY = 48 * dir * dist * railScale;
      const tz = -520 * (1 - Math.exp(-0.9 * dist)) * railScale;

      const transformStr = `translate3d(${tx.toFixed(1)}px, 0, ${tz.toFixed(0)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      if (cache.current[i].t !== transformStr) {
        card.style.transform = transformStr;
        cache.current[i].t = transformStr;
      }

      const opacityVal = clamp((5.4 - dist) / 1.4, 0, 1).toFixed(3);
      if (cache.current[i].o !== opacityVal) {
        card.style.opacity = opacityVal;
        cache.current[i].o = opacityVal;
      }

      const zIndexVal = String(200 - Math.round(20 * dist));
      if (cache.current[i].z !== zIndexVal) {
        card.style.zIndex = zIndexVal;
        cache.current[i].z = zIndexVal;
      }

      const filterVal =
        `brightness(${Math.max(0.65, 1 - 0.14 * dist).toFixed(3)})` +
        (dist > 2.4 ? ` blur(${Math.min(2, (dist - 2.4) * 0.7).toFixed(1)}px)` : "");
      if (cache.current[i].f !== filterVal) {
        card.style.filter = filterVal;
        cache.current[i].f = filterVal;
      }

      const pointerVal = dist < 2.6 ? "auto" : "none";
      if (cache.current[i].p !== pointerVal) {
        card.style.pointerEvents = pointerVal;
        cache.current[i].p = pointerVal;
      }

      const veil = veilRefs.current[i];
      if (veil) {
        // Soft white veil for non-active cards on pure white background
        const veilOp = Math.min(0.58, Math.max(0, (dist - 0.35) * 0.24)).toFixed(3);
        if (cache.current[i].v !== veilOp) {
          veil.style.opacity = veilOp;
          cache.current[i].v = veilOp;
        }
      }
    }

    // Update metadata below with smooth crossfade
    const discEl = discRef.current;
    const titleEl = titleRef.current;
    const subEl = subRef.current;

    const rounded = Math.round(currentPos.current);
    const item = CARDS[((rounded % total) + total) % total];

    if (titleEl && item) {
      if (lastTitle.current !== item.client) {
        lastTitle.current = item.client;
        setActiveProject(item);
        if (discEl) discEl.textContent = item.category;
        titleEl.textContent = item.client;
        if (subEl) subEl.textContent = item.title;
      }

      const textOpacity = Math.max(0, 1 - 3 * Math.abs(currentPos.current - rounded)).toFixed(2);
      if (lastOpacity.current !== textOpacity) {
        lastOpacity.current = textOpacity;
        if (discEl) discEl.style.opacity = textOpacity;
        titleEl.style.opacity = textOpacity;
        if (subEl) subEl.style.opacity = textOpacity;
      }
    }
  }, []);

  // Smooth lerp frame loop (f += 0.13 * (v - f))
  const startLerp = useCallback(() => {
    if (!isFinite(targetPos.current)) targetPos.current = 0;
    if (animFrameId.current) return;

    const step = () => {
      animFrameId.current = 0;
      const diff = targetPos.current - currentPos.current;
      currentPos.current += 0.13 * diff;
      if (Math.abs(targetPos.current - currentPos.current) < 0.0004) {
        currentPos.current = targetPos.current;
      }
      updateTransforms();
      if (currentPos.current !== targetPos.current) {
        animFrameId.current = requestAnimationFrame(step);
      }
    };
    animFrameId.current = requestAnimationFrame(step);
  }, [updateTransforms]);

  // Jump to specific index smoothly
  const goTo = useCallback(
    (index) => {
      const total = CARDS.length;
      let delta = ((index - Math.round(targetPos.current)) % total + total) % total;
      if (delta > total / 2) delta -= total;
      targetPos.current = Math.round(targetPos.current) + delta;
      startLerp();
    },
    [startLerp]
  );

  const stepDir = useCallback(
    (dir) => {
      targetPos.current = Math.round(targetPos.current) + dir;
      startLerp();
    },
    [startLerp]
  );

  // Setup DOM event listeners with exact pointer, wheel and gesture handlers
  useLayoutEffect(() => {
    const rail = railRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const total = CARDS.length;
    if (!rail || cards.length !== total) return;

    cards.forEach((c) => {
      c.style.backfaceVisibility = "visible";
      c.style.transformStyle = "preserve-3d";
    });

    // Horizontal trackpad / wheel support
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      targetPos.current += e.deltaX / 320;
      clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        targetPos.current = Math.round(targetPos.current);
        startLerp();
      }, 150);
      startLerp();
    };

    // Pointer down handler
    const onPointerDown = (e) => {
      if (e.button) return;
      isDragging.current = true;
      dragDist.current = 0;
      dragVelocity.current = 0;
      lastClientX.current = startClientX.current = e.clientX;
      startTargetPos.current = targetPos.current;
      rail.style.cursor = "grabbing";
      try {
        rail.setPointerCapture(e.pointerId);
      } catch {}
      clearTimeout(wheelTimeout.current);
    };

    // Pointer move handler
    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const cardWidth = cards[0].offsetWidth || 500;
      const dragUnit = 0.66 * cardWidth;
      dragDist.current += Math.abs(e.clientX - lastClientX.current);
      dragVelocity.current = (e.clientX - lastClientX.current) / dragUnit;
      lastClientX.current = e.clientX;
      targetPos.current = startTargetPos.current - (e.clientX - startClientX.current) / dragUnit;
      startLerp();
    };

    // Pointer up handler with click detection & inertia
    const onPointerUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      rail.style.cursor = "grab";

      const wasClick = dragDist.current <= 6;
      targetPos.current = Math.round(targetPos.current - 1.2 * dragVelocity.current);
      startLerp();

      if (wasClick) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const cardEl = el?.closest("[data-card]");
        const idx = cardEl ? cards.indexOf(cardEl) : -1;
        if (idx !== -1) {
          let delta = ((idx - Math.round(targetPos.current)) % total + total) % total;
          if (delta > total / 2) delta -= total;
          if (delta !== 0) {
            targetPos.current = Math.round(targetPos.current) + delta;
            startLerp();
            return;
          }
          // Center card clicked -> open live project
          const item = CARDS[((idx % total) + total) % total];
          if (item?.url) {
            window.open(item.url, "_blank", "noopener,noreferrer");
          }
        }
      }
    };

    const onPointerCancel = () => {
      isDragging.current = false;
      rail.style.cursor = "grab";
    };

    rail.addEventListener("wheel", onWheel, { passive: false });
    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove, { passive: true });
    rail.addEventListener("pointerup", onPointerUp);
    rail.addEventListener("pointercancel", onPointerCancel);

    // Visibility change
    const onVisibility = () => {
      if (!document.hidden) {
        currentPos.current = targetPos.current = Math.round(targetPos.current);
        updateTransforms();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Auto-advance loop when idle
    let autoInterval;
    const startAuto = () => {
      if (!autoInterval) {
        autoInterval = setInterval(() => {
          if (isDragging.current || document.hidden || Math.abs(targetPos.current - currentPos.current) > 1.5) return;
          targetPos.current = Math.round(targetPos.current) + 1;
          startLerp();
        }, 3200);
      }
    };
    const stopAuto = () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = undefined;
      }
    };

    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const hit = entries.some((entry) => entry.isIntersecting);
          isInView.current = hit;
          updateTransforms();
          if (hit) startAuto();
          else stopAuto();
        },
        { rootMargin: "150px 0px" }
      );
      observer.observe(rail);
    } else {
      startAuto();
    }

    const onResize = () => updateTransforms();
    window.addEventListener("resize", onResize);
    updateTransforms();

    return () => {
      stopAuto();
      if (observer) observer.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      clearTimeout(wheelTimeout.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      rail.removeEventListener("wheel", onWheel);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", onPointerUp);
      rail.removeEventListener("pointercancel", onPointerCancel);
    };
  }, [updateTransforms, startLerp]);

  // Keyboard navigation (Left / Right)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") stepDir(-1);
      if (e.key === "ArrowRight") stepDir(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stepDir]);

  const handleOpenActive = () => {
    if (activeProject?.url) {
      window.open(activeProject.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="work"
      className="relative scroll-mt-20 overflow-hidden bg-white text-night-950 select-none py-24 sm:py-32"
    >
      {/* Soft atmospheric ground glow on pure white */}
      <div
        data-ground="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 75% at 50% 5%, rgba(46,107,255,0.06) 0%, rgba(255,255,255,0) 60%), radial-gradient(120% 70% at 50% 95%, rgba(46,107,255,0.04) 0%, rgba(255,255,255,0) 55%)",
          backgroundSize: "cover, cover",
        }}
      />

      {/* Section Header with global typography */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 text-center mb-10 sm:mb-14">
        <p className="eyebrow mb-3">Selected Work</p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-night-950 mb-4">
          Featured Work<span className="text-accent-500">.</span>
        </h2>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-night-950/45">
          Drag to browse, click a card to open it
        </p>
      </div>

      {/* 3D Perspective Rail — Exact hadiyakhawar.com layout & geometry */}
      <div
        ref={railRef}
        data-rail="true"
        className="relative w-full max-w-full z-10 h-[clamp(270px,58vw,500px)] touch-pan-y cursor-grab overflow-hidden select-none"
        style={{
          perspective: 1150,
          perspectiveOrigin: "50% 50%",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 13%, rgba(0,0,0,1) 87%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 13%, rgba(0,0,0,1) 87%, rgba(0,0,0,0) 100%)",
        }}
      >
        {CARDS.map((project, i) => (
          <div
            key={`${project.client}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            data-card="true"
            className="absolute left-1/2 top-1/2 cursor-pointer box-border rounded-2xl overflow-hidden bg-white shadow-[0_20px_45px_-12px_rgba(15,30,60,0.22),0_2px_6px_rgba(15,30,60,0.06)] border border-ice-200"
            style={{
              "--cw": "clamp(260px, 78vw, 580px)",
              width: "var(--cw)",
              aspectRatio: "3 / 2",
              marginLeft: "calc(var(--cw) * -0.5)",
              marginTop: "calc(var(--cw) * -0.3335)",
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-ice-100">
              <img
                src={project.image}
                alt={project.client}
                draggable={false}
                decoding="async"
                fetchPriority="low"
                className="w-full h-full object-cover object-center pointer-events-none select-none block"
              />
              {/* Soft white veil on side cards for seamless integration into pure white background */}
              <span
                ref={(el) => {
                  veilRefs.current[i] = el;
                }}
                data-veil="true"
                className="absolute inset-0 bg-white/75 opacity-0 pointer-events-none transition-opacity duration-200"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Project details below the cards — Exact Hadiya Khawar layout with global typography */}
      <div className="relative z-10 mt-8 sm:mt-14 mx-auto max-w-2xl px-4 sm:px-8 flex flex-col items-center text-center min-h-[140px] transform-gpu">
        {/* Category tag */}
        <span
          ref={discRef}
          className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-accent-500 mb-2 transition-opacity duration-200"
        >
          {activeProject.category}
        </span>

        {/* Project Name */}
        <h3
          ref={titleRef}
          className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-night-950 mb-2.5 transition-opacity duration-200"
        >
          {activeProject.client}
        </h3>

        {/* Subtitle / Description */}
        <p
          ref={subRef}
          className="text-sm sm:text-base text-night-950/65 font-normal max-w-lg leading-relaxed mb-6 transition-opacity duration-200"
        >
          {activeProject.title}
        </p>

        {/* Open Project CTA */}
        <button
          onClick={handleOpenActive}
          className="btn-dark inline-flex items-center gap-2 !px-6 !py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md"
        >
          <span>Open Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Indicators for all projects */}
      <div className="relative z-10 mt-10 flex items-center justify-center gap-2.5">
        {PROJECTS.map((p, idx) => {
          const isCurrent = activeProject.client === p.client;
          return (
            <button
              key={`${p.client}-dot`}
              onClick={() => goTo(idx)}
              aria-label={`Go to ${p.client}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isCurrent
                  ? "w-8 bg-accent-500 shadow-[0_0_12px_rgba(46,107,255,0.5)]"
                  : "w-2.5 bg-night-950/20 hover:bg-night-950/40"
              }`}
            />
          );
        })}
      </div>

      {/* Bottom CTA to start a project */}
      <div className="relative z-10 mx-auto max-w-md px-5 sm:px-8 mt-14 text-center">
        <p className="text-xs text-night-950/50 mb-4">
          Full portfolio with live deployment links on{" "}
          <a
            href={`${BRAND.site}/projects`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent-600 hover:text-accent-500 underline underline-offset-4"
          >
            kovalabs.tech/projects
          </a>
        </p>
        <a href={BRAND.emailUrl} className="btn-primary !px-7 !py-3.5 text-sm font-semibold">
          Your product, next — start a project
        </a>
      </div>
    </section>
  );
}
