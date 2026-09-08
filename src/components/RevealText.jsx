import { useEffect, useRef } from "react";

/**
 * Reveals a string of text word-by-word with an overflow mask,
 * once the element scrolls into view.
 */
export default function RevealText({
  text,
  className = "",
  delay = 0,
  step = 60,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.bound) return;
    el.dataset.bound = "1";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`block ${className}`} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word-mask" aria-hidden="true">
          <span
            className="word"
            style={{ transitionDelay: `${delay + i * step}ms` }}
          >
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
