/**
 * Giant ghost word behind a section, sliding horizontally as the
 * section crosses the viewport (scroll-linked via data-parallax-x).
 */
export default function BgWord({ children, speed = 0.22, dark = false, className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        data-parallax-x={speed}
        className={`whitespace-nowrap text-[24vw] font-extrabold leading-none tracking-tight sm:text-[15vw] ${
          dark ? "text-outline-white opacity-25" : "text-outline-dark opacity-50"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
