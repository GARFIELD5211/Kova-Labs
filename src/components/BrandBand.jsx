import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";

/* ---- brand marks (raw icons, brand colors) ---- */
function Google({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
function Meta({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M6.2 8.2C4.3 8.2 3 10.7 3 13.1c0 1.9 1 3 2.4 3 1.1 0 2-.7 3.1-2.6l1.5-2.6.9 1.5c-1.5 2.6-2.2 3.7-2.2 3.7 1.6 2 3.3 0 3.3 0s2.5-4.3 3.4-5.9c.9-1.6 2.2-1.1 2.2 1 0 3.5-1.7 6.3-1.7 6.3 1.6 1.8 3.1-.6 3.1-.6.9-1.6 1.5-4 1.5-5.9 0-3.5-1.9-5.4-4-5.4-1.6 0-2.9 1-4.1 3l-.9 1.5-.9-1.5c-1.2-2-2.5-3-4.1-3z" fill="#0866FF" />
    </svg>
  );
}
function GitHub({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#fff"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}
function Figma({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path fill="#F24E1E" d="M8.5 2H12v7H8.5a3.5 3.5 0 010-7z" />
      <path fill="#FF7262" d="M12 2h3.5a3.5 3.5 0 010 7H12V2z" />
      <path fill="#A259FF" d="M8.5 9H12v7H8.5a3.5 3.5 0 010-7z" />
      <circle fill="#1ABCFE" cx="15.5" cy="12.5" r="3.5" />
      <path fill="#0ACF83" d="M8.5 16H12v3.5A3.5 3.5 0 118.5 16z" />
    </svg>
  );
}
function Tailwind({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#38BDF8"
        d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.39 10.87 14.54 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.13 14.46 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.87 9.54 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.13 9.46 12 7 12z"
      />
    </svg>
  );
}
function ReactMark({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(120 12 12)" />
    </svg>
  );
}
function Vite({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vitebolt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#41D1FF" />
          <stop offset="1" stopColor="#2EE6A8" />
        </linearGradient>
      </defs>
      <path d="M14.5 2 5 13.2h5.2L9 22l9.5-11.2h-5.2L14.5 2z" fill="url(#vitebolt)" />
    </svg>
  );
}
function Notion({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="#fff" />
      <text x="12" y="16.6" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0b0f19" fontFamily="Inter, sans-serif">N</text>
    </svg>
  );
}
function Vercel({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 4.5l8.5 15h-17z" fill="#fff" />
    </svg>
  );
}
function Stripe({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <text x="12" y="18" textAnchor="middle" fontSize="17" fontWeight="800" fill="#635BFF" fontFamily="Inter, sans-serif">S</text>
    </svg>
  );
}
function WordPress({ className = "h-8 w-8 sm:h-10 sm:w-10" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.6" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff" fontFamily="Georgia, serif">W</text>
    </svg>
  );
}

const BRANDS = [Google, Meta, GitHub, Figma, Tailwind, ReactMark, Vite, Notion, Vercel, Stripe, WordPress];

const PROOF = {
  avatars: [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/45.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/76.jpg",
  ],
  rating: "4,9",
  line: "Over 600 SMEs in Switzerland already trust us",
};

export default function BrandBand() {
  return (
    <section className="relative overflow-hidden w-full max-w-full bg-[linear-gradient(180deg,#13224a_0%,#0b0f19_35%,#0b0f19_100%)] text-white">
      {/* blue ambience */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 45% at 50% 0%, rgba(59,130,246,0.14), transparent 60%)" }} />

      <div className="relative pt-16 sm:pt-20">
        {/* eyebrow */}
        <Reveal>
          <p className="px-4 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.32em] text-white/55">
            Programs &amp; Partners we work with
          </p>
        </Reveal>

        {/* full-bleed logo marquee */}
        <Reveal delay={100}>
          <div
            className="mt-8 sm:mt-10 overflow-hidden w-full max-w-full"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
            }}
          >
            <div className="marquee-row flex w-max items-center gap-14 pr-14 sm:gap-28 sm:pr-28">
              {[...BRANDS, ...BRANDS].map((Icon, i) => (
                <span key={i} className="shrink-0 opacity-95">
                  <Icon className="h-7 w-7 sm:h-10 sm:w-10" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* headline + sub + cta + proof */}
        <div className="mx-auto mt-12 sm:mt-16 max-w-5xl px-4 text-center sm:px-8">
          <h2 className="text-[clamp(2.1rem,7.5vw,5.2rem)] font-extrabold tracking-tight leading-[1.08]">
            <RevealText text="Websites that convince" />
            <span className="text-accent-400">.</span>
          </h2>

          <Reveal delay={150}>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-white/70 leading-relaxed">
              First impressions decide. We turn outdated websites into modern,
              clear presences.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <a href="#work" className="btn-white mt-7 sm:mt-9 !px-7 !py-3 text-sm font-semibold">
              View references
            </a>
          </Reveal>

          {/* photo avatars + google rating */}
          <Reveal delay={350}>
            <div className="mt-9 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <div className="flex -space-x-2.5 shrink-0">
                {PROOF.avatars.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-[#0b0f19] bg-night-800 object-cover"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white">
                  <Google className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {PROOF.rating}
                  <span className="tracking-tight text-[#f59e0b]" aria-label="5 stars">
                    ★★★★★
                  </span>
                </p>
                <p className="mt-0.5 text-xs sm:text-sm text-white/60">{PROOF.line}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* spacer keeps content clear of the arc */}
      <div className="h-24" />

      {/* bottom arc — dark dips down at the center, white rises at the edges */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0 H1440 V26 Q720 132 0 26 Z" fill="#0b0f19" />
      </svg>
    </section>
  );
}
