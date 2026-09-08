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
    <footer className="relative overflow-hidden border-t border-white/10 bg-night-950 text-white">
      {/* soft flow edge matching the hero */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[900px] -translate-x-1/2 rounded-[100%] bg-accent-500/10 blur-[90px]" />
      <div className="pointer-events-none absolute -top-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-400/40 to-transparent" />

      <div className="container-x relative py-16">
        <Reveal>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Logo dark className="text-lg" />
            <p className="mt-4 max-w-xs text-sm text-white/50">
              {BRAND.tagline} — based in Islamabad, shipping worldwide.
            </p>
            <p className="mt-6 text-sm text-white/40">{BRAND.location}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="inline-block text-sm text-white/55 transition duration-300 hover:translate-x-1 hover:text-white"
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
        <div aria-hidden="true" className="pointer-events-none mt-16 select-none overflow-hidden">
          <div
            data-parallax-x="0.12"
            className="text-outline-white -mb-[0.16em] whitespace-nowrap text-center text-[16vw] font-extrabold leading-[0.85] tracking-tight opacity-30 will-change-transform"
          >
            KOVALABS.
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <p>Engineered, not outsourced.</p>
        </div>
      </div>
    </footer>
  );
}
