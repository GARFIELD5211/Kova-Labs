const VARIANTS = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  tilt: "reveal-tilt",
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}) {
  const variant = VARIANTS[from] ?? VARIANTS.up;

  return (
    <div
      ref={(el) => {
        if (!el || el.dataset.bound) return;
        el.dataset.bound = "1";
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.classList.add("is-visible");
              io.disconnect();
            }
          },
          { threshold: 0.15 }
        );
        io.observe(el);
      }}
      className={`${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
