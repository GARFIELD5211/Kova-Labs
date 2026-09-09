import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import { BRAND } from "../data/site.js";
import { Menu, Cross } from "./Icons.jsx";

const LINKS = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Team", "#team"],
  ["FAQ", "#faq"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(
    ""
  );

  /* scrollspy — underline the section you're in */
  useEffect(() => {
    const sections = LINKS.map(([, href]) => document.querySelector(href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-8 sm:pt-4 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/70 bg-white/75 py-2.5 px-4 sm:py-3.5 sm:pr-3.5 sm:pl-7 shadow-[0_20px_50px_-20px_rgba(15,30,60,0.35)] backdrop-blur-2xl">
        <Logo className="text-lg sm:text-xl shrink-0" />

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`nav-link nav-link-light ${
                active === href.slice(1) ? "nav-link-active" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={BRAND.emailUrl}
            className="btn-dark hidden !px-5 !py-2.5 sm:inline-flex"
          >
            Start a project
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-ice-300 text-night-950 md:hidden active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {open ? <Cross className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pointer-events-auto mx-auto mt-2.5 max-w-6xl overflow-hidden rounded-3xl border border-ice-200 bg-white/95 shadow-2xl backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1 p-3.5">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-night-950/75 transition hover:bg-ice-100 hover:text-night-950 active:bg-ice-100"
              >
                {label}
              </a>
            ))}
            <a
              href={BRAND.emailUrl}
              onClick={() => setOpen(false)}
              className="btn-dark mt-2 !py-3 w-full text-center"
            >
              Start a project
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
