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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/60 py-4 pr-3.5 pl-7 shadow-[0_24px_60px_-24px_rgba(15,30,60,0.4)] backdrop-blur-2xl">
        <Logo className="text-xl" />

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

        <div className="flex items-center gap-3">
          <a
            href={BRAND.emailUrl}
            className="btn-dark hidden !px-5 !py-2.5 sm:inline-flex"
          >
            Start a project
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ice-300 text-night-950 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <Cross className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-3 max-w-6xl rounded-[2rem] border border-ice-200 bg-white/90 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-night-950/70 transition hover:bg-ice-100 hover:text-night-950"
              >
                {label}
              </a>
            ))}
            <a
              href={BRAND.emailUrl}
              onClick={() => setOpen(false)}
              className="btn-dark mt-2"
            >
              Start a project
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
