import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

/* ----------------------------------- Nav ---------------------------------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links: [string, string][] = [
    ["Work", "/#work"],
    ["Services", "/#services"],
    ["Process", "/#process"],
    ["Stack", "/#stack"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border shadow-[0_1px_0_0_var(--color-border)]"
          : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid h-8 w-8 place-items-center border border-border-strong transition-all duration-300 group-hover:border-accent">
            <img src="/logo.jpg" alt="Kova Labs" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-lg tracking-tight">Kova Labs</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
              {l}
            </a>
          ))}
          <Link
            to="/team"
            className="hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            activeProps={{ className: "text-foreground after:w-full" }}
          >
            Team
          </Link>
          <Link
            to="/projects"
            className="hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            activeProps={{ className: "text-foreground after:w-full" }}
          >
            Projects
          </Link>
        </nav>
        <a
          href="/#intake"
          className="group inline-flex items-center gap-2 border border-foreground px-4 py-2 text-sm bg-foreground text-background rounded-full hover:bg-transparent hover:text-foreground transition-all duration-300"
        >
          Start a project
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </header>
  );
}

/* --------------------------------- Footer --------------------------------- */

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border border-border-strong">
                <img src="/logo.jpg" alt="Kova Labs" className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-2xl">Kova Labs</span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Engineered software for ambitious teams. Based in Islamabad,
              shipping worldwide.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Directory</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/#work" className="hover:text-accent transition-colors">Work</a></li>
              <li><a href="/#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="/#process" className="hover:text-accent transition-colors">Process</a></li>
              <li><Link to="/team" className="hover:text-accent transition-colors">Team</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Studio</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Press</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Contact</div>
            <a
              href="mailto:contact@kovalabs.tech"
              className="font-display text-2xl hover:text-accent transition-colors"
            >
              contact@kovalabs.tech
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Mezzanine Floor, Muzaffar Chamber Plaza<br />Fazal-e-Haq Road, Blue Area, Islamabad
            </p>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Kova Labs Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
