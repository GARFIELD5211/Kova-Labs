import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import case2 from "@/assets/case-2.jpg";
import crmProject from "@/assets/crm-project.jpg";
import voicestudioScreenshot from "@/assets/voicestudio-screenshot.jpg";
import ornibellaScreenshot from "@/assets/ornibella.jpg";
import lancerTravelsScreenshot from "@/assets/lancer-travels.jpg";
import asasNaturalsScreenshot from "@/assets/asas-naturals.jpg";
import broadcastUaeScreenshot from "@/assets/broadcast-uae.jpg";
import xyntraTechScreenshot from "@/assets/xyntra-tech.jpg";
import { Nav, Footer } from "@/components/layout";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "All Projects — Kova Labs" },
      {
        name: "description",
        content:
          "Explore our full portfolio of engineered software, Shopify Plus ecosystems, AI automations and SaaS MVPs.",
      },
      { property: "og:title", content: "All Projects — Kova Labs" },
      {
        property: "og:description",
        content: "Explore our full portfolio of engineered software.",
      },
    ],
  }),
  component: ProjectsPage,
});

/* -------------------------------------------------------------------------- */
/*                           Animation Components                             */
/* -------------------------------------------------------------------------- */

const defaultEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- GlowCursor ---------- */

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

/* ---------- Floating ---------- */

function Floating({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Scroll3D ---------- */

function Scroll3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <motion.div ref={ref} style={{ rotateX, y, perspective: 1200 }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------- Reveal ---------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: defaultEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: defaultEase }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Project Data                                  */
/* -------------------------------------------------------------------------- */

type Project = {
  img: string;
  client: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  year: string;
  featured: boolean;
};

const ALL_PROJECTS: Project[] = [
  {
    img: crmProject,
    client: "Kova Labs CRM",
    title: "B2B travel agency CRM platform with dual admin/agent portals.",
    description:
      "Enterprise-grade CRM platform purpose-built for travel agencies. Features separate Administrator and Agent portals with global analytics, client relationship management, booking management, and real-time reporting — all wrapped in a sleek, dark-themed interface.",
    metric: "Enterprise v4.12",
    metricLabel: "Dual-portal system",
    tags: ["React", "TypeScript", "Netlify", "CRM"],
    year: "2025",
    featured: true,
  },
  {
    img: voicestudioScreenshot,
    client: "The VoiceStudio",
    title: "Full-service IT solutions platform for a growing digital agency.",
    description:
      "Complete digital presence and service platform for The VoiceStudio, an IT solutions provider offering call center management, digital marketing, web development, software design, and IT infrastructure management. Built with a modern, professional design showcasing their B2B service portfolio.",
    metric: "Founded 2020",
    metricLabel: "9 service verticals",
    tags: ["Web Dev", "UI/UX", "IT Solutions", "B2B"],
    year: "2024",
    featured: true,
  },
  {
    img: ornibellaScreenshot,
    client: "Ornibella Jewels",
    title: "Elegant jewellery e-commerce store with curated collections.",
    description:
      "A beautifully crafted online jewellery store for Ornibella Jewels, featuring exquisite product collections, detailed craftsmanship showcases, and a seamless shopping experience designed for discerning customers.",
    metric: "Premium collections",
    metricLabel: "E-commerce platform",
    tags: ["Shopify", "E-Commerce", "UI/UX", "Jewellery"],
    year: "2025",
    featured: true,
  },
  {
    img: lancerTravelsScreenshot,
    client: "Lancer Travels",
    title: "Modern travel agency website with immersive destination showcases.",
    description:
      "A contemporary travel agency platform for Lancer Travels, featuring curated tour packages, destination guides, booking capabilities, and an intuitive user experience designed to inspire globetrotters.",
    metric: "Multi-destination",
    metricLabel: "Travel platform",
    tags: ["Web Dev", "UI/UX", "Travel", "Netlify"],
    year: "2025",
    featured: true,
  },
  {
    img: asasNaturalsScreenshot,
    client: "Asas Naturals",
    title: "Natural products brand storefront with clean, organic design.",
    description:
      "A nature-inspired e-commerce platform for Asas Naturals, featuring product catalogues, brand storytelling, wellness education content, and a frictionless checkout experience for health-conscious consumers.",
    metric: "Wellness-focused",
    metricLabel: "Brand storefront",
    tags: ["E-Commerce", "Web Design", "UI/UX", "Branding"],
    year: "2025",
    featured: false,
  },
  {
    img: broadcastUaeScreenshot,
    client: "Broadcast UAE",
    title: "Media broadcasting & production company digital presence.",
    description:
      "A professional digital platform for Broadcast UAE, a media and broadcasting company offering television production, digital marketing, media services, and content creation across the UAE market.",
    metric: "UAE market",
    metricLabel: "Media platform",
    tags: ["Web Dev", "Media", "UI/UX", "Broadcasting"],
    year: "2025",
    featured: false,
  },
  {
    img: xyntraTechScreenshot,
    client: "Xyntra Tech",
    title: "Technology solutions company website with modern engineering focus.",
    description:
      "A sleek, modern technology solutions platform for Xyntra Tech, showcasing their IT services, software development capabilities, tech consulting expertise, and client portfolio with a clean professional design.",
    metric: "Tech solutions",
    metricLabel: "IT services platform",
    tags: ["Web Dev", "Tech", "UI/UX", "B2B"],
    year: "2025",
    featured: true,
  },
];

/* -------------------------------------------------------------------------- */
/*                                Components                                  */
/* -------------------------------------------------------------------------- */

function PageHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-[50vh] flex items-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={case2}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </motion.div>

      <div className="relative container-x pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow mb-6"
        >
          <span>Portfolio</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: defaultEase }}
          className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] max-w-3xl"
        >
          All{" "}
          <span className="italic text-accent">projects.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed"
        >
          A curated selection of work spanning commerce, healthcare,
          fintech, AI, and enterprise platforms. Every project ships
          with the same uncompromising standard of engineering.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Floating>
            <Link
              to="/"
              className="inline-flex items-center gap-2 eyebrow hover:text-foreground transition-colors"
            >
              <span>←</span>
              <span>Back to home</span>
            </Link>
          </Floating>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <StaggerItem index={index}>
      <Link to="/" className="group block">
        <article className="grid md:grid-cols-12 gap-6 md:gap-10 items-start border-b border-border pb-12 md:pb-16 mb-12 md:mb-16 last:border-0 last:pb-0 last:mb-0">
          <div className="md:col-span-7 relative overflow-hidden rounded-2xl">
            <Scroll3D>
              <motion.img
                src={project.img}
                alt={project.client}
                loading="lazy"
                width={1600}
                height={1000}
                className="w-full aspect-[16/10] object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 1.2, ease: defaultEase }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-border/50 rounded-2xl" />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-700 rounded-2xl" />
            </Scroll3D>
          </div>

          <div className="md:col-span-5">
            <div className="flex items-center justify-between eyebrow">
              <span className="group-hover:text-accent transition-colors duration-300">
                {project.client}
              </span>
              <span>{project.year}</span>
            </div>

            <h3 className="mt-6 font-display text-2xl md:text-3xl leading-tight group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{project.metric}</div>
                <div className="eyebrow mt-0.5">{project.metricLabel}</div>
              </div>
              <span className="text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
                ↗
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground border border-border px-2.5 py-1 rounded-full group-hover:border-accent/30 group-hover:text-accent transition-all duration-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </StaggerItem>
  );
}

/* Filter and counts */

function ProjectsFilter({
  active,
  setActive,
}: {
  active: string;
  setActive: (v: string) => void;
}) {
  const years = [...new Set(ALL_PROJECTS.map((p) => p.year))].sort().reverse();
  const filters = ["All", ...years];

  return (
    <div className="flex flex-wrap gap-2 mb-16">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
            active === f
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

/* Stats bar */

function StatsBar() {
  const featured = ALL_PROJECTS.filter((p) => p.featured).length;
  const total = ALL_PROJECTS.length;
  const years = [...new Set(ALL_PROJECTS.map((p) => p.year))].length;

  return (
    <Reveal>
      <div className="grid grid-cols-3 gap-8 py-10 mb-16 border-y border-border">
        <div>
          <div className="font-display text-3xl">{total}</div>
          <div className="eyebrow mt-1">Total projects</div>
        </div>
        <div>
          <div className="font-display text-3xl">{featured}</div>
          <div className="eyebrow mt-1">Featured</div>
        </div>
        <div>
          <div className="font-display text-3xl">{years}</div>
          <div className="eyebrow mt-1">Years active</div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects =
    activeFilter === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.year === activeFilter);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <GlowCursor />
      <Nav />
      <PageHero />

      <div className="container-x py-16">
        <StatsBar />
        <ProjectsFilter active={activeFilter} setActive={setActiveFilter} />

        <div>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.client} project={project} index={index} />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found for this year.</p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 eyebrow text-accent hover:text-foreground transition-colors"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="border-t border-border bg-surface/30">
        <Reveal>
          <div className="container-x py-28 md:py-36 text-center">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.15]">
              Have a project in mind?
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md mx-auto">
              Let's talk about what we can build together. Reach out and
              we'll respond within one business day.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/#intake"
                className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 text-sm font-medium rounded-full hover:bg-accent hover:text-background transition-all duration-300"
              >
                Start a project
                <span className="transition-all duration-300 group-hover:translate-x-1">→</span>
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-3 border border-border-strong px-6 py-4 text-sm hover:bg-surface transition-all duration-300 rounded-full"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
