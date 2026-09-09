import Reveal from "./Reveal.jsx";
import Logo from "./Logo.jsx";
import { BRAND } from "../data/site.js";

const COLUMNS = [
  {
    title: "Studio",
    links: [
      { label: "Home", href: BRAND.site, external: true },
      { label: "Projects", href: `${BRAND.site}/projects`, external: true },
      { label: "Team", href: `${BRAND.site}/team`, external: true },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Bespoke web apps", href: "#services" },
      { label: "Shopify Plus ecosystems", href: "#services" },
      { label: "AI automations", href: "#services" },
      { label: "SaaS MVPs", href: "#services" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Start a project", href: BRAND.emailUrl },
      { label: BRAND.email, href: BRAND.emailUrl },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full max-w-full border-t border-white/10 bg-night-950 text-white">
      {/* soft flow edge matching the hero */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[900px] -translate-x-1/2 rounded-[100%] bg-accent-500/10 blur-[90px]" />
      <div className="pointer-events-none absolute -top-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-400/40 to-transparent" />

      <div className="container-x relative py-12 sm:py-16">
        <Reveal>
        <div className="grid gap-8 sm:gap-12 grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo dark className="text-lg" />
            <p className="mt-3 sm:mt-4 max-w-xs text-xs sm:text-sm text-white/50 leading-relaxed">
              {BRAND.tagline} — based in Islamabad, shipping worldwide.
            </p>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-white/40">{BRAND.location}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">{col.title}</h3>
              <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="inline-block text-xs sm:text-sm text-white/55 transition duration-300 hover:translate-x-1 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </Reveal>

        {/* giant parallax wordmark */}
        <div aria-hidden="true" className="pointer-events-none mt-12 sm:mt-16 select-none overflow-hidden w-full max-w-full">
          <div
            data-parallax-x="0.12"
            className="text-outline-white -mb-[0.16em] whitespace-nowrap text-center text-[13vw] font-extrabold leading-[0.85] tracking-tight opacity-30 will-change-transform"
          >
            KOVALABS.
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:pt-8 text-xs sm:text-sm text-white/40 sm:flex-row text-center sm:text-left">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <p>Engineered, not outsourced.</p>
        </div>
      </div>
    </footer>
  );
}
