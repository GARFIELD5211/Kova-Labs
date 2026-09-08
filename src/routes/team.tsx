import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import heroImg from "@/assets/hero.jpg";
import { Nav, Footer } from "@/components/layout";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "The Team — Kova Labs" },
      {
        name: "description",
        content:
          "Meet the senior engineers, designers, and growth experts behind Kova Labs — based in Islamabad, shipping worldwide.",
      },
      { property: "og:title", content: "The Team — Kova Labs" },
      {
        property: "og:description",
        content: "Meet the team behind Kova Labs.",
      },
    ],
  }),
  component: TeamPage,
});

/* -------------------------------------------------------------------------- */
/*                           Animation Components                             */
/* -------------------------------------------------------------------------- */

const defaultEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variants = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  slideDown: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  slideLeft: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  blurIn: { hidden: { opacity: 0, filter: "blur(8px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
  rotateIn: { hidden: { opacity: 0, rotateX: 15, y: 30 }, visible: { opacity: 1, rotateX: 0, y: 0 } },
};

type VariantName = keyof typeof variants;

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
        background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.08), transparent 70%)",
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

/* ---------- Reveal ---------- */

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
        visible: { ...v.visible, transition: { duration, delay, ease: defaultEase } },
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
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
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
        visible: { ...v.visible, transition: { duration: 0.7, ease: defaultEase } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- SplitReveal ---------- */

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
        <span key={i} className="inline-block overflow-hidden mr-[0.15em] px-[0.08em] pb-[0.2em]">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 15 }}
            transition={{ duration: 0.7, delay: delay + i * staggerDelay, ease: defaultEase }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ---------- SectionLabel ---------- */

function SectionLabel({ no, label }: { no: string; label: string }) {
  return (
    <div className="flex items-center gap-3 eyebrow">
      <span>{no}</span>
      <span className="h-px w-8 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Team Data                                   */
/* -------------------------------------------------------------------------- */

type TeamMember = {
  name: string;
  role: string;
  team: "Tech & Product" | "Business & Growth";
  bio: string;
  img: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Yasir Moeez",
    role: "Chief Technology Officer (CTO)",
    team: "Tech & Product",
    bio: "Yasir drives the technical vision and system architecture of the company. As CTO, he oversees the core infrastructure, ensuring our software is secure, scalable, and built on high-performance frameworks. He leads the engineering strategy, transforming complex business requirements into robust technical realities.",
    img: "/team/yasir-moeez.jpg",
  },
  {
    name: "M. Saad Malik",
    role: "Lead Developer & UI/UX Engineer",
    team: "Tech & Product",
    bio: "Saad bridges the gap between aesthetic design and technical execution. Specializing in full-stack development and intuitive user interfaces, he engineers responsive, user-centric applications. Saad ensures that every product not only functions flawlessly under the hood but delivers a frictionless, engaging experience for the end-user.",
    img: "/team/saad-malik.jpg",
  },
  {
    name: "Shaariff Mujtaba",
    role: "Lead Developer & Product Designer",
    team: "Tech & Product",
    bio: "Shaariff co-pilots the product development lifecycle, blending deep coding expertise with modern design principles. He focuses on building out dynamic front-end architectures and refining the UX/UI. Shaariff ensures our software solutions are not just functional, but visually compelling and easy to navigate.",
    img: "/team/shaariff-mujtaba.jpg",
  },
  {
    name: "Usman Khalid",
    role: "Chief Executive Officer (CEO)",
    team: "Business & Growth",
    bio: "Usman steers the strategic direction and operational execution of the startup. He is responsible for driving business growth, managing client relationships, and overseeing high-level company operations. Usman ensures the team's technical innovations align perfectly with market demands and business objectives.",
    img: "/team/usman-khalid.jpg",
  },
  {
    name: "Absaar Munawar",
    role: "Head of Growth & Marketing",
    team: "Business & Growth",
    bio: "Absaar commands our digital presence and user acquisition strategies. From brand positioning to data-driven marketing campaigns, he connects our products with the right audience. Absaar translates our technical capabilities into compelling market narratives that drive conversion and scale.",
    img: "/team/absaar-munawar.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                               Components                                   */
/* -------------------------------------------------------------------------- */

/* ---------- PageHero ---------- */

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
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
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
          <span>The team</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: defaultEase }}
          className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] max-w-3xl"
        >
          The people{" "}
          <span className="italic text-accent">behind the work.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed"
        >
          A lean, senior team spanning engineering, design, product, and
          growth — each bringing deep expertise and a shared commitment
          to craft. Based in Islamabad, shipping worldwide.
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

/* ---------- TeamCard ---------- */

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group cursor-pointer md:cursor-default"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="relative overflow-hidden bg-surface rounded-2xl">
        <motion.img
          src={member.img}
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
          <div className="flex items-center gap-2">
            <span className="md:hidden text-muted-foreground transition-transform duration-300" style={{ transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}>
              +
            </span>
            <span className="eyebrow transition-colors duration-300 group-hover:text-accent hidden md:inline">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Mobile: hidden by default */}
        <div className="md:hidden">
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="bio"
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: defaultEase }}
                className="overflow-hidden"
              >
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop: always visible */}
        <div className="hidden md:block mt-4">
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamSection({ members, teamLabel }: { members: TeamMember[]; teamLabel: string }) {
  return (
    <div className="mb-10 md:mb-16 last:mb-0">
      <div className="eyebrow text-accent mb-8 md:mb-10 flex items-center gap-3">
        <span>{teamLabel}</span>
        <span className="h-px flex-1 bg-border" />
        <span className="text-muted-foreground">{members.length}</span>
      </div>
      <StaggerReveal staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 justify-items-center">
        {members.map((m, i) => (
          <StaggerItem key={m.name} variant="blurIn" className="w-full max-w-md">
            <TeamCard member={m} index={i} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </div>
  );
}

function TeamContent() {
  const techTeam = TEAM.filter((m) => m.team === "Tech & Product");
  const businessTeam = TEAM.filter((m) => m.team === "Business & Growth");

  return (
    <section className="container-x py-16 md:py-32">
      <Reveal variant="slideDown">
        <div className="grid md:grid-cols-12 gap-8 mb-8 md:mb-16">
          <div className="md:col-span-5">
            <SectionLabel no="01" label="Our team" />
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              <SplitReveal text="Five people." />
              <span className="italic text-muted-foreground block mt-0">
                <SplitReveal text="One standard." staggerDelay={0.03} delay={0.25} />
              </span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 self-end">
            <p className="text-muted-foreground leading-relaxed">
              Every member of our team operates at a senior level in their
              discipline. We don't hire juniors — we hire people who can own
              outcomes from day one.
            </p>
          </div>
        </div>
      </Reveal>

      <TeamSection members={techTeam} teamLabel="Tech & Product" />
      <TeamSection members={businessTeam} teamLabel="Business & Growth" />
    </section>
  );
}

/* ---------- CTA ---------- */

function Cta() {
  return (
    <section className="border-t border-border bg-surface/30">
      <Reveal>
        <div className="container-x py-28 md:py-36 text-center">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.15]">
            Want to work with us?
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md mx-auto">
            We're always looking for ambitious teams who refuse mediocre software.
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
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Page                                       */
/* -------------------------------------------------------------------------- */

function TeamPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <GlowCursor />
      <Nav />
      <PageHero />
      <TeamContent />
      <Cta />
      <Footer />
    </main>
  );
}
