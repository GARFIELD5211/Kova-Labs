import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: an accent dot with a trailing ring that lerps behind
 * the pointer and grows over interactive elements. Fine pointers only.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let dx = x;
    let dy = y;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let shown = false;
    let pressed = false;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        dx = rx = x;
        dy = ry = y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const t = e.target;
      const interactive = t.closest?.(
        "a, button, input, textarea, select, [role='button'], [data-cursor]"
      );
      targetScale = interactive ? 2.1 : 1;
      ring.classList.toggle("cursor-grow", Boolean(interactive));
    };

    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      shown = false;
    };

    const loop = () => {
      dx += (x - dx) * 0.5;
      dy += (y - dy) * 0.5;
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      const s = pressed ? scale * 0.8 : scale;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-accent-500 opacity-0"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-accent-500/60 opacity-0 transition-[background-color,border-color] duration-300"
      />
    </>
  );
}
