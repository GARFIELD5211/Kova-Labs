import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import heroImg from "@/assets/hero.jpg";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";

import crmProject from "@/assets/crm-project.jpg";
import voicestudioScreenshot from "@/assets/voicestudio-screenshot.jpg";
import asasNaturalsScreenshot from "@/assets/asas-naturals.jpg";
import xyntraTechScreenshot from "@/assets/xyntra-tech.jpg";
import lancerTravelsScreenshot from "@/assets/lancer-travels.jpg";
import { Nav, Footer } from "@/components/layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kova Labs — Engineered software for ambitious teams" },
      {
        name: "description",
        content:
          "Bespoke web apps, Shopify Plus ecosystems, AI automations and SaaS MVPs. Built by senior engineers — no outsourcing, no fluff.",
      },
      {
        property: "og:title",
        content: "Kova Labs — Engineered software for ambitious teams",
      },
      {
        property: "og:description",
        content: "Bespoke web apps, Shopify Plus, AI automations and SaaS MVPs.",
      },
    ],
  }),
  component: Landing,
});

/* -------------------------------------------------------------------------- */
/*                           Animation Components                             */
/* -------------------------------------------------------------------------- */

/* ---------- Animation variants ---------- */

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  rotateIn: {
    hidden: { opacity: 0, rotateX: 15, y: 30 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
};

type VariantName = keyof typeof variants;

const defaultEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- ScrollProgress ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-accent/60 via-accent to-accent/60"
      style={{ scaleX }}
    />
  );
}

/* ---------- Enhanced Reveal ---------- */

function Reveal({
  children,
  delay = 0,
  variant = "slideUp" as VariantName,
  className = "",
  duration = 0.8,
  threshold = 0.15,
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: VariantName;
  className?: string;
  duration?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px", amount: threshold });

  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration, delay, ease: defaultEase },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- StaggerReveal ---------- */

function StaggerReveal({
  children,
  staggerDelay = 0.08,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  variant = "slideUp" as VariantName,
  className = "",
}: {
  children: React.ReactNode;
  variant?: VariantName;
  className?: string;
}) {
  const v = variants[variant];
  return (
    <motion.div
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration: 0.7, ease: defaultEase },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- CountUp ---------- */

function CountUp({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out
      setCount(eased * end);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Section Divider ---------- */

function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: defaultEase }}
        className="h-full w-full origin-left bg-gradient-to-r from-transparent via-border to-transparent"
        style={{ height: 1 }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: defaultEase }}
        className="absolute inset-0 h-full w-1/3 origin-left bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"
        style={{ height: 2, marginTop: -1 }}
      />
    </div>
  );
}

/* ---------- Parallax Divider ---------- */

function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <div ref={ref} className="relative h-32 md:h-40 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl px-6">
          <SectionDivider />
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- TiltCard ---------- */

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: y * -6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
      }}
      transition={{ duration: 0.5, ease: defaultEase }}
      className={className}
      style={{ perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                     Extraordinary Animation Components                      */
/* -------------------------------------------------------------------------- */

/* ---------- GlowCursor: ambient light that follows the mouse ---------- */

function GlowCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[99] transition-opacity duration-1000"
      style={{
        background:
          "radial-gradient(circle, oklch(0.78 0.12 75 / 0.08), transparent 70%)",
        transform: "translate(-150px, -150px)",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

/* ---------- MagneticButton: button follows cursor on hover ---------- */

function MagneticButton({
  children,
  className = "",
  as: Component = "a",
  href,
  to,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  href?: string;
  to?: string;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }, []);

  const btnClass = `inline-flex items-center gap-3 text-sm font-medium rounded-full transition-all duration-300 ${className}`;

  const content = (
    <span
      ref={ref}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </span>
  );

  if (Component === "a") {
    return (
      <a
        href={href}
        className={btnClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </a>
    );
  }

  if (Component === Link) {
    return (
      <Link
        to={to}
        className={btnClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={btnClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </button>
  );
}

/* ---------- Floating: gentle levitate animation for any element ---------- */

function Floating({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- SplitReveal: word-by-word text reveal on scroll ---------- */

function SplitReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.04,
  threshold = 0.3,
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px", amount: threshold });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={
              inView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 40, rotateX: 15 }
            }
            transition={{
              duration: 0.7,
              delay: delay + i * staggerDelay,
              ease: defaultEase,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ---------- ScrollDepth3D: 3D perspective shift on scroll ---------- */

function ScrollDepth3D({
  children,
  className = "",
  depth = 30,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [depth, 0, -depth]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, y, scale, perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Small Helpers                                   */
/* -------------------------------------------------------------------------- */

function SectionLabel({ no, label }: { no: string; label: string }) {
  return (
    <div className="flex items-center gap-3 eyebrow">
      <span>{no}</span>
      <span className="h-px w-8 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Software engineer at work"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      </motion.div>

      <Nav />

      <div className="relative container-x pt-40 md:pt-56 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: defaultEase }}
          className="eyebrow mb-8"
        >
          <span>Est. 2021 — London / Remote</span>
        </motion.div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[1.05] max-w-5xl">
          <SplitReveal
            text="Software engineered for the"
            className="block text-5xl sm:text-7xl md:text-8xl leading-[1.05]"
            staggerDelay={0.06}
            threshold={0.5}
          />
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.7, ease: defaultEase }}
            className="block italic text-accent mt-2"
          >
            uncompromising.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: defaultEase }}
          className="mt-10 max-w-xl text-base text-muted-foreground leading-relaxed"
        >
          A small studio of senior engineers shipping bespoke web platforms,
          AI tooling and revenue-grade commerce for founders who refuse
          mediocre software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: defaultEase }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#intake"
            className="bg-foreground text-background px-6 py-4 hover:bg-accent hover:text-background"
          >
            Start a project
            <span className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              →
            </span>
          </MagneticButton>
          <MagneticButton
            href="#work"
            className="border border-border-strong px-6 py-4 hover:bg-surface hover:border-foreground/30"
          >
            View selected work
            <span className="opacity-60 group-hover:opacity-100">↓</span>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Floating>
            <div className="flex flex-col items-center gap-2">
              <span className="eyebrow text-[9px]">SCROLL</span>
              <span className="block h-6 w-px bg-border-strong" />
            </div>
          </Floating>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="absolute bottom-10 right-6 md:right-10 md:bottom-12 text-right max-w-xs"
        >
          <div className="eyebrow mb-2">Currently</div>
          <p className="text-sm text-foreground">
            Booking Q3 engagements <span className="caret" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- Social Proof ------------------------------ */

function SocialProof() {
  const logos = [
    "VERTEX", "AURA HEALTH", "NORTHFIELD", "OCTAVE", "PARALLEL",
    "MERIDIAN VC", "ATELIER", "LUMEN", "FORM&FOUNDRY", "OBLIQUE",
  ];
  return (
    <section className="relative border-y border-border bg-surface/40 py-10 overflow-hidden">
      <div className="container-x mb-6 flex items-center justify-between text-muted-foreground">
        <span className="eyebrow">Trusted by</span>
        <span className="eyebrow hidden sm:inline">VC-backed SaaS & 8-figure DTC brands</span>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max gap-16 whitespace-nowrap">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="font-display text-2xl text-muted-foreground/70 tracking-wide"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------- Services -------------------------------- */

const SERVICES = [
  {
    no: "01",
    title: "Full-Stack Web Apps",
    body: "High-performance React, Next.js and Node architectures engineered for speed and scale.",
    tags: ["React", "Next.js", "Node"],
  },
  {
    no: "02",
    title: "Shopify Plus Ecosystems",
    body: "High-converting custom stores and headless commerce setups built to scale revenue.",
    tags: ["Shopify Plus", "Hydrogen", "Headless"],
  },
  {
    no: "03",
    title: "AI & Internal Automations",
    body: "LLM pipelines, custom internal tooling and automated workflows that erase human operational friction.",
    tags: ["OpenAI", "RAG", "Agents"],
  },
  {
    no: "04",
    title: "API & Custom Middleware",
    body: "Linking fragmented CRMs, legacy software and live databases securely and reliably.",
    tags: ["REST", "GraphQL", "Webhooks"],
  },
  {
    no: "05",
    title: "UX Audits & CRO",
    body: "Data-driven user experience overhauls to patch leaked checkout revenue and lift conversion.",
    tags: ["Analytics", "A/B", "Funnels"],
  },
  {
    no: "06",
    title: "SaaS MVP Development",
    body: "Rapid-deployment, venture-ready prototypes engineered for founders who need to launch in weeks.",
    tags: ["MVP", "Stripe", "Auth"],
  },
];

function Services() {
  return (
    <section id="services" className="container-x py-28 md:py-40">
      <Reveal variant="slideDown">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <SectionLabel no="03" label="Capabilities" />              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.15]">
                <SplitReveal text="Six disciplines." />
                <br />
                <span className="italic text-muted-foreground">
                  <SplitReveal text="One operating standard." staggerDelay={0.03} delay={0.3} />
                </span>
              </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 self-end">
            <p className="text-muted-foreground leading-relaxed">
              We don't take every brief. We take the ones where engineering
              decisions compound into measurable business outcomes — and we
              execute them with a level of craft most teams reserve for v3.
            </p>
          </div>
        </div>
      </Reveal>

      <StaggerReveal staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border rounded-2xl overflow-hidden">
          {SERVICES.map((s) => (
            <StaggerItem key={s.no} variant="scaleIn">
              <div className="group relative h-full border-r border-b border-border p-8 lg:p-10 bg-background transition-all duration-500 hover:bg-surface hover:border-accent/20">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">{s.no}</span>
                  <span className="text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                    ↗
                  </span>
                </div>
                <h3 className="mt-10 font-display text-2xl leading-snug">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
                <div className="mt-10 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground border border-border px-2.5 py-1 rounded-full transition-colors group-hover:border-accent/30 group-hover:text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
      </StaggerReveal>
    </section>
  );
}

/* ------------------------------- Case Studies ----------------------------- */

const CASES = [
  {
    img: crmProject,
    client: "Kova Labs CRM",
    title: "B2B travel agency CRM platform with dual admin/agent portals.",
    metric: "4.12",
    metricSuffix: "",
    metricLabel: "Enterprise version",
    secondary: "Admin & Agent portals",
    problem:
      "Travel agencies needed a unified platform to manage bookings, clients, and reporting across dispersed systems.",
    solution:
      "Built a sleek, dark-themed dual-portal CRM with global analytics, client relationship management, booking tools, and role-based access for administrators and agents.",
    stack: ["React", "TypeScript", "Netlify", "CRM"],
    year: "2025",
  },
  {
    img: asasNaturalsScreenshot,
    client: "Asas Naturals",
    title: "Natural products brand storefront with clean, organic design.",
    metric: "2025",
    metricSuffix: "",
    metricLabel: "Natural wellness",
    secondary: "Sustainable brand storefront",
    problem:
      "A health-conscious brand needed a modern e-commerce presence that reflected their natural, organic identity while providing a seamless shopping experience.",
    solution:
      "Designed a nature-inspired platform with product catalogues, wellness storytelling, brand education content, and a frictionless checkout experience optimized for conversion.",
    stack: ["E-Commerce", "Web Design", "UI/UX", "Branding"],
    year: "2025",
    metricPrefix: "",
  },
  {
    img: xyntraTechScreenshot,
    client: "Xyntra Tech",
    title: "Technology solutions company website with modern engineering focus.",
    metric: "10",
    metricSuffix: "+",
    metricLabel: "Service verticals",
    secondary: "Full-stack solutions provider",
    problem:
      "A growing tech solutions company needed a professional digital presence that effectively communicated their IT services, software development capabilities, and consulting expertise.",
    solution:
      "Built a sleek, modern technology platform showcasing service offerings, client portfolio, case studies, and a clear path for prospective clients to engage with the team.",
    stack: ["Web Dev", "Tech", "UI/UX", "B2B"],
    year: "2025",
    metricPrefix: "",
  },
  {
    img: voicestudioScreenshot,
    client: "The VoiceStudio",
    title: "Full-service IT solutions platform for a growing digital agency.",
    metric: "2020",
    metricSuffix: "",
    metricLabel: "Founded",
    secondary: "9 service verticals",
    problem:
      "An IT solutions provider needed a modern digital presence to showcase their diverse B2B service portfolio.",
    solution:
      "Designed and developed a professional platform featuring service showcases for call center management, digital marketing, web development, software design, and IT infrastructure.",
    stack: ["Web Dev", "UI/UX", "IT Solutions", "B2B"],
    year: "2024",
    metricPrefix: "",
  },
  {
    img: lancerTravelsScreenshot,
    client: "Lancer Travels",
    title: "Modern travel agency website with immersive destination showcases.",
    metric: "50",
    metricSuffix: "+",
    metricLabel: "Curated destinations",
    secondary: "Inspiring travel platform",
    problem:
      "A growing travel agency needed a compelling digital presence to showcase tour packages, inspire travelers, and drive booking conversions in a competitive market.",
    solution:
      "Created a contemporary travel platform with curated destination guides, tour package showcases, immersive imagery, and an intuitive booking flow designed to convert visitors into customers.",
    stack: ["Web Dev", "UI/UX", "Travel", "Netlify"],
    year: "2025",
    metricPrefix: "",
  },
];

function CaseStudies() {
  return (
    <section id="work" className="border-t border-border bg-surface/30">
      <div className="container-x py-28 md:py-40">
        <Reveal variant="slideDown">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
            <div>
              <SectionLabel no="04" label="Featured work" />
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.15]">
                <SplitReveal text="Outcomes," />
                <br />
                <span className="italic text-muted-foreground">
                  <SplitReveal text="not output." staggerDelay={0.03} delay={0.25} />
                </span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 eyebrow hover:text-foreground transition-colors"
            >
              <span>All case studies</span>
              <span className="transition-all duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="flex flex-col gap-28">
          {CASES.map((c, i) => (
            <Reveal key={c.client} variant="fadeIn" threshold={0.1}>
              <article className="grid md:grid-cols-12 gap-8 md:gap-14 items-start">
                <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                  <ScrollDepth3D depth={12}>
                    <div className="relative overflow-hidden group rounded-2xl">
                      <motion.img
                        src={c.img}
                        alt={c.client}
                        loading="lazy"
                        width={1600}
                        height={1000}
                        className="w-full aspect-[16/10] object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 1.2, ease: defaultEase }}
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-border/50 rounded-2xl" />
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-700 rounded-2xl" />
                    </div>
                  </ScrollDepth3D>
                </div>

                <div className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
                  <div className="flex items-center justify-between eyebrow">
                    <span>{c.client}</span>
                    <span>{c.year}</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl md:text-4xl leading-tight">
                    {c.title}
                  </h3>

                  <div className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6">
                    <div>
                      <div className="font-display text-4xl">
                        <CountUp
                          end={parseFloat(c.metric)}
                          suffix={c.metricSuffix || ""}
                          prefix={c.metricPrefix || ""}
                          decimals={c.metric.includes(".") ? 1 : 0}
                        />
                      </div>
                      <div className="eyebrow mt-1">{c.metricLabel}</div>
                    </div>
                    <div className="self-end">
                      <div className="text-sm">{c.secondary}</div>
                    </div>
                  </div>

                  <dl className="mt-8 space-y-5 text-sm">
                    <div>
                      <dt className="eyebrow mb-1">Problem</dt>
                      <dd className="text-muted-foreground leading-relaxed">{c.problem}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1">Solution</dt>
                      <dd className="text-muted-foreground leading-relaxed">{c.solution}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-2">Stack</dt>
                      <dd className="flex flex-wrap gap-2">
                        {c.stack.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[10px] tracking-widest uppercase text-foreground border border-border px-2.5 py-1 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* View all projects CTA */}
        <Reveal variant="scaleIn" delay={0.2}>
          <div className="mt-20 flex justify-center">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 border border-border-strong px-8 py-5 text-sm font-medium rounded-full hover:bg-surface hover:border-accent/30 transition-all duration-300"
            >
              <span>View all projects</span>
              <span className="transition-all duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Process -------------------------------- */

const PROCESS = [
  {
    no: "01",
    title: "Discovery Sprint",
    sub: "Scoping & Architecture",
    body: "We unpack your bottlenecks, define technical requirements, and deliver a rigid project blueprint before contract signing. Zero guesswork.",
  },
  {
    no: "02",
    title: "Agile Development",
    sub: "Live Staging Environments",
    body: "We develop in clean, weekly sprints. You get active staging links to watch the codebase evolve live, maintaining total transparency.",
  },
  {
    no: "03",
    title: "Rigid Deployment",
    sub: "Stress Testing & Delivery",
    body: "We handle automated CI/CD setup, execute rigorous database load tests, and hand over clean documentation for painless maintenance.",
  },
];

function Process() {
  return (
    <section id="process" className="container-x py-28 md:py-40">
      <Reveal variant="slideDown">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <SectionLabel no="05" label="The process" />
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.15]">
              <SplitReveal text="A frictionless" />
              <br />
              <span className="italic text-muted-foreground">
                <SplitReveal text="roadmap." staggerDelay={0.03} delay={0.25} />
              </span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 self-end">
            <p className="text-muted-foreground leading-relaxed">
              Three phases. Fixed scope. No scope creep, no ghosting,
              no surprises. You always know what we're building, why, and
              when it ships.
            </p>
          </div>
        </div>
      </Reveal>

      <StaggerReveal staggerDelay={0.12} className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {PROCESS.map((p, i) => (
            <StaggerItem key={p.no} variant="rotateIn">
              <div className="h-full bg-background p-10 md:p-12 flex flex-col group hover:bg-surface transition-all duration-500">
                <div className="flex items-baseline justify-between">
                  <Floating delay={i * 0.15}>
                    <span className="font-display text-6xl transition-colors duration-500 group-hover:text-accent">
                      {p.no}
                    </span>
                  </Floating>
                  <span className="eyebrow">{`Phase ${i + 1}`}</span>
                </div>
                <h3 className="mt-12 font-display text-2xl leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.sub}</p>
                <p className="mt-8 text-sm text-foreground/80 leading-relaxed">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
      </StaggerReveal>
    </section>
  );
}

/* ---------------------------------- Stack --------------------------------- */

const STACK = [
  {
    group: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    group: "Backend & DB",
    items: ["Node.js", "PostgreSQL", "Prisma", "Redis", "tRPC"],
  },
  {
    group: "Cloud & Ops",
    items: ["AWS", "Cloudflare", "Docker", "Vercel", "GitHub Actions"],
  },
];

function Stack() {
  return (
    <section id="stack" className="border-y border-border bg-surface/30">
      <div className="container-x py-28 md:py-36">
        <Reveal variant="slideDown">
          <div className="grid md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-5">
              <SectionLabel no="06" label="Core stack" />
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.15]">
                <SplitReveal text="The tools" />
                <br />
                <span className="italic text-muted-foreground">
                  <SplitReveal text="we trust." staggerDelay={0.03} delay={0.25} />
                </span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 self-end">
              <p className="text-muted-foreground leading-relaxed">
                A deliberately small surface area of battle-tested,
                high-performance tools. We pick boring tech for the parts
                that must not fail, and sharp tech where it earns its keep.
              </p>
            </div>
          </div>
        </Reveal>

        <StaggerReveal staggerDelay={0.1} className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            {STACK.map((s) => (
              <StaggerItem key={s.group} variant="scaleIn">
                <div className="bg-background p-10 group hover:bg-surface transition-all duration-500">
                  <div className="eyebrow mb-8 group-hover:text-accent transition-colors duration-500">
                    {s.group}
                  </div>
                  <ul className="space-y-4">
                    {s.items.map((i, idx) => (
                      <li key={i} className="font-display text-2xl transition-all duration-300" style={{ transitionDelay: `${idx * 30}ms` }}>
                        <span className="group-hover:ml-1 inline-block transition-all duration-300">
                          {i}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Initials Avatar Placeholder                       */
/* -------------------------------------------------------------------------- */

function getInitialsAvatar(name: string): string {
  const parts = name.split(" ");
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="oklch(0.19 0.006 270)"/>
    <rect width="800" height="1000" fill="url(#g)" opacity="0.08"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="oklch(0.78 0.12 75)"/>
        <stop offset="100%" stop-color="transparent"/>
      </linearGradient>
    </defs>
    <text x="400" y="460" text-anchor="middle" dominant-baseline="central" font-family="Inter, sans-serif" font-size="180" font-weight="700" fill="oklch(0.78 0.12 75 / 0.15)" letter-spacing="8">${initials}</text>
    <line x1="280" y1="540" x2="520" y2="540" stroke="oklch(0.38 0.008 270)" stroke-width="1"/>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ---------------------------------- Team ---------------------------------- */

type TeamMember = {
  name: string;
  role: string;
  team: "Tech & Product" | "Business & Growth";
  bio: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Yasir Moeez",
    role: "Chief Technology Officer (CTO)",
    team: "Tech & Product",
    bio: "Yasir drives the technical vision and system architecture of the company. As CTO, he oversees the core infrastructure, ensuring our software is secure, scalable, and built on high-performance frameworks. He leads the engineering strategy, transforming complex business requirements into robust technical realities.",
  },
  {
    name: "M. Saad Malik",
    role: "Lead Developer & UI/UX Engineer",
    team: "Tech & Product",
    bio: "Saad bridges the gap between aesthetic design and technical execution. Specializing in full-stack development and intuitive user interfaces, he engineers responsive, user-centric applications. Saad ensures that every product not only functions flawlessly under the hood but delivers a frictionless, engaging experience for the end-user.",
  },
  {
    name: "Shaariff Mujtaba",
    role: "Lead Developer & Product Designer",
    team: "Tech & Product",
    bio: "Shaariff co-pilots the product development lifecycle, blending deep coding expertise with modern design principles. He focuses on building out dynamic front-end architectures and refining the UX/UI. Shaariff ensures our software solutions are not just functional, but visually compelling and easy to navigate.",
  },
  {
    name: "Usman Khalid",
    role: "Chief Executive Officer (CEO)",
    team: "Business & Growth",
    bio: "Usman steers the strategic direction and operational execution of the startup. He is responsible for driving business growth, managing client relationships, and overseeing high-level company operations. Usman ensures the team's technical innovations align perfectly with market demands and business objectives.",
  },
  {
    name: "Absaar Munawar",
    role: "Head of Growth & Marketing",
    team: "Business & Growth",
    bio: "Absaar commands our digital presence and user acquisition strategies. From brand positioning to data-driven marketing campaigns, he connects our products with the right audience. Absaar translates our technical capabilities into compelling market narratives that drive conversion and scale.",
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const avatarSrc = getInitialsAvatar(member.name);

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-surface rounded-2xl">
        <motion.img
          src={avatarSrc}
          alt={member.name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full aspect-[4/5] object-cover transition-all duration-1000 ease-out"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 1.2, ease: defaultEase }}
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-border/30 rounded-2xl" />
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-display text-xl group-hover:text-accent transition-colors duration-300">
              {member.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{member.role}</div>
          </div>
          <span className="eyebrow transition-colors duration-300 group-hover:text-accent">
            0{index + 1}
          </span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground/80 leading-relaxed">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

function TeamSection({ members, teamLabel }: { members: TeamMember[]; teamLabel: string }) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="eyebrow text-accent mb-8 md:mb-10 flex items-center gap-3">
        <span>{teamLabel}</span>
        <span className="h-px flex-1 bg-border" />
        <span className="text-muted-foreground">{members.length}</span>
      </div>
      <StaggerReveal staggerDelay={0.1} className="grid md:grid-cols-3 gap-8 justify-items-center">
        {members.map((m, i) => (
          <StaggerItem key={m.name} variant="blurIn" className="w-full max-w-md">
            <TeamCard member={m} index={i} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </div>
  );
}

function Team() {
  const techTeam = TEAM.filter((m) => m.team === "Tech & Product");
  const businessTeam = TEAM.filter((m) => m.team === "Business & Growth");

  return (
    <section id="team" className="container-x py-28 md:py-40">
      <Reveal variant="slideDown">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <SectionLabel no="07" label="The team" />
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.15]">
              <SplitReveal text="The people" />
              <br />
              <span className="italic text-muted-foreground">
                <SplitReveal text="behind the work." staggerDelay={0.03} delay={0.25} />
              </span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 self-end">
            <p className="text-muted-foreground leading-relaxed">
              A lean, senior team spanning engineering, design, product, and
              growth — each bringing deep expertise and a shared commitment
              to craft.
            </p>
          </div>
        </div>
      </Reveal>

      <TeamSection members={techTeam} teamLabel="Tech & Product" />
      <TeamSection members={businessTeam} teamLabel="Business & Growth" />
    </section>
  );
}

/* ---------------------------------- FAQ ----------------------------------- */

const FAQ = [
  {
    q: "Do you outsource your development?",
    a: "No. Every line of code is written by our core, in-house engineers in London. We don't subcontract, white-label, or hand-off to overseas teams.",
  },
  {
    q: "How do you handle post-launch support?",
    a: "Every build ships with a 30-day warranty covering any defect. After that, you can choose a fixed-scope retainer or a per-sprint engagement.",
  },
  {
    q: "What is your typical project timeline?",
    a: "MVPs ship in 4–6 weeks. Production platforms typically run 10–16 weeks. Enterprise engagements scope individually after the discovery sprint.",
  },
  {
    q: "What does an engagement cost?",
    a: "MVPs from $24k. Production platforms $60k–$180k. We propose a fixed price after discovery — never time-and-materials surprises.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes — happy to sign yours, or work under ours. We routinely build under strict confidentiality for funded startups and incumbents.",
  },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left py-6 md:py-7 flex items-start gap-6 group"
      >
        <span className="eyebrow pt-2 shrink-0 w-10">{`0${i + 1}`}</span>
        <span className="font-display text-2xl md:text-3xl flex-1 leading-tight group-hover:text-accent transition-colors duration-300">
          {q}
        </span>
        <span
          className={`font-display text-3xl transition-all duration-500 shrink-0 ${
            open ? "rotate-45 text-accent" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: defaultEase }}
            className="overflow-hidden"
          >
            <p className="pl-16 pr-12 pb-8 text-muted-foreground leading-relaxed max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-border">
      <div className="container-x py-28 md:py-36">
        <Reveal variant="slideDown">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <SectionLabel no="08" label="Direct answers" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.15]">
                No fluff.<br />
                <span className="italic text-muted-foreground">Just answers.</span>
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-border">
                {FAQ.map((f, i) => (
                  <FaqItem key={f.q} i={i} {...f} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Intake --------------------------------- */

function Intake() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "Full-stack web app",
    budget: "$25–60k",
  });

  return (
    <section id="intake" className="relative border-t border-border bg-surface-elevated overflow-hidden">
      <div className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="container-x py-28 md:py-40 relative">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5">
            <Reveal variant="slideLeft">
              <SectionLabel no="09" label="Intake" />
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.98]">
                <SplitReveal text="Let's build" />
                <br />
                <SplitReveal text="something that" staggerDelay={0.03} delay={0.2} />
                <br />
                <span className="italic text-accent">
                  <SplitReveal text="scales." staggerDelay={0.03} delay={0.4} />
                </span>
              </h2>
              <p className="mt-8 text-muted-foreground max-w-md leading-relaxed">
                Stop losing revenue to technical debt. Tell us about the
                project and we'll respond within one business day with next
                steps.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8 max-w-sm">
                <div>
                  <div className="font-display text-3xl">
                    <CountUp end={48} suffix="h" />
                  </div>
                  <div className="eyebrow mt-1">Response time</div>
                </div>
                <div>
                  <div className="font-display text-3xl">
                    <CountUp end={100} suffix="%" />
                  </div>
                  <div className="eyebrow mt-1">In-house</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal variant="slideRight" delay={0.15}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-8"
                  >
                    <Field
                      label="01 / Your name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      placeholder="Jane Doe"
                    />
                    <Field
                      label="02 / Business email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      placeholder="jane@company.com"
                    />
                    <Select
                      label="03 / Project type"
                      value={form.type}
                      onChange={(v) => setForm({ ...form, type: v })}
                      options={[
                        "Full-stack web app",
                        "Shopify Plus / Headless",
                        "AI & automations",
                        "SaaS MVP",
                        "UX audit / CRO",
                        "Something else",
                      ]}
                    />
                    <Select
                      label="04 / Budget tier"
                      value={form.budget}
                      onChange={(v) => setForm({ ...form, budget: v })}
                      options={["< $25k", "$25–60k", "$60–150k", "$150k+"]}
                    />

                    <MagneticButton
                      as="button"
                      type="submit"
                      className="w-full justify-between border border-foreground bg-foreground text-background px-6 py-5 hover:bg-transparent hover:text-foreground"
                    >
                      <span>Send intake</span>
                      <span className="transition-all duration-300">→</span>
                    </MagneticButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="border border-border p-10 md:p-14 bg-background rounded-2xl"
                  >
                    <div className="eyebrow text-accent">Received</div>
                    <h3 className="mt-6 font-display text-3xl md:text-4xl">
                      Thanks, {form.name || "friend"}.
                    </h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                      We've logged your intake. Expect a personal reply from
                      a partner within one business day — usually faster.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block group">
      <span className="eyebrow block mb-3">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border-strong py-3 text-lg font-display outline-none focus:border-accent transition-all duration-300 placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-3">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border-strong py-3 text-lg font-display outline-none focus:border-accent transition-all duration-300 appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-background">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------------------------------- Page ---------------------------------- */

function Landing() {
  return (
    <main className="bg-background text-foreground">            <GlowCursor />
      <ScrollProgress />
      <Hero />
      <ParallaxDivider />
      <SocialProof />
      <ParallaxDivider />
      <Services />
      <ParallaxDivider />
      <CaseStudies />
      <ParallaxDivider />
      <Process />
      <ParallaxDivider />
      <Stack />
      <ParallaxDivider />
      <Team />
      <ParallaxDivider />
      <Faq />
      <Intake />
      <Footer />
    </main>
  );
}
