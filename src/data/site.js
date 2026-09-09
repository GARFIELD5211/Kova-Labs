// Real data for Kova Labs — extracted from kovalabs.tech
// (home, /projects, /team + bundled route data). Edit here to update the site.

export const BRAND = {
  name: "Kova Labs",
  wordmark: "KOVALABS",
  tagline: "Engineered software for ambitious teams",
  email: "contact@kovalabs.tech",
  emailUrl: "mailto:contact@kovalabs.tech",
  location: "Based in Islamabad — shipping worldwide",
  site: "https://kovalabs.tech",
};

export const HERO = {
  eyebrow: "",
  headline: "KOVALABS",
  sub: "",
};

export const SERVICES = [
  {
    num: "01",
    icon: "bolt",
    title: "Full-Stack Web Apps",
    text: "High-performance React, Next.js and Node architectures engineered for speed and scale.",
  },
  {
    num: "02",
    icon: "cart",
    title: "Shopify Plus Ecosystems",
    text: "High-converting custom stores and headless commerce setups built to scale revenue.",
  },
  {
    num: "03",
    icon: "bot",
    title: "AI & Internal Automations",
    text: "LLM pipelines, custom internal tooling and automated workflows that erase human operational friction.",
  },
  {
    num: "04",
    icon: "shield",
    title: "API & Custom Middleware",
    text: "Linking fragmented CRMs, legacy software and live databases securely and reliably.",
  },
  {
    num: "05",
    icon: "gauge",
    title: "UX Audits & CRO",
    text: "Data-driven user experience overhauls to patch leaked checkout revenue and lift conversion.",
  },
  {
    num: "06",
    icon: "rocket",
    title: "SaaS MVP Development",
    text: "Rapid-deployment, venture-ready prototypes engineered for founders who need to launch in weeks.",
  },
];

export const PROJECTS = [
  {
    client: "Kova Labs CRM",
    category: "B2B Software",
    image: "/projects/crm.jpg",
    title: "B2B travel agency CRM platform with dual admin/agent portals.",
    url: "https://crm-lancer-9gl5.vercel.app/",
    urlLabel: "crm-lancer.vercel.app",
    metric: "4.12",
    metricLabel: "Enterprise version",
    secondary: "Admin & Agent portals",
    theme: "crm",
    year: "2025",
    problem:
      "Travel agencies needed a unified platform to manage bookings, clients and reporting across dispersed systems.",
    solution:
      "A sleek, dark-themed dual-portal CRM with global analytics, client relationship management, booking tools and role-based access for administrators and agents.",
    stack: ["React", "TypeScript", "Netlify", "CRM"],
  },
  {
    client: "Asas Naturals",
    category: "E-Commerce",
    image: "/projects/asas.jpg",
    title: "Natural products brand storefront with clean, organic design.",
    url: "https://asasnaturals.com/",
    urlLabel: "asasnaturals.com",
    metric: "2025",
    metricLabel: "Natural wellness",
    secondary: "Sustainable brand storefront",
    theme: "asas",
    year: "2025",
    problem:
      "A health-conscious brand needed a modern e-commerce presence that reflected its natural, organic identity with a seamless shopping experience.",
    solution:
      "A nature-inspired platform with product catalogues, wellness storytelling, brand education content and a frictionless checkout optimized for conversion.",
    stack: ["E-Commerce", "Web Design", "UI/UX", "Branding"],
  },
  {
    client: "Xyntra Tech",
    category: "Technology",
    image: "/projects/xyntra.jpg",
    title: "Technology solutions company website with modern engineering focus.",
    url: "https://xyntra.tech/",
    urlLabel: "xyntra.tech",
    metric: "10+",
    metricLabel: "Service verticals",
    secondary: "Full-stack solutions provider",
    theme: "xyntra",
    year: "2025",
    problem:
      "A growing tech solutions company needed a professional digital presence that communicated its IT services, software development capabilities and consulting expertise.",
    solution:
      "A sleek, modern technology platform showcasing services, client portfolio, case studies and a clear path for prospective clients to engage with the team.",
    stack: ["Web Dev", "Tech", "UI/UX", "B2B"],
  },
  {
    client: "The VoiceStudio",
    category: "IT Solutions",
    image: "/projects/voicestudio.jpg",
    title: "Full-service IT solutions platform for a growing digital agency.",
    url: "https://thevoicestudio.net",
    urlLabel: "thevoicestudio.net",
    metric: "2020",
    metricLabel: "Founded",
    secondary: "9 service verticals",
    theme: "voicestudio",
    year: "2024",
    problem:
      "An IT solutions provider needed a modern digital presence to showcase its diverse B2B service portfolio.",
    solution:
      "A professional platform with service showcases spanning call center management, digital marketing, web development, software design and IT infrastructure.",
    stack: ["Web Dev", "UI/UX", "IT Solutions", "B2B"],
  },
  {
    client: "Lancer Travels",
    category: "Travel",
    image: "/projects/lancer.jpg",
    title: "Modern travel agency website with immersive destination showcases.",
    url: "https://lancertravels.netlify.app/",
    urlLabel: "lancertravels.netlify.app",
    metric: "50+",
    metricLabel: "Curated destinations",
    secondary: "Inspiring travel platform",
    theme: "lancer",
    year: "2025",
    problem:
      "A growing travel agency needed a compelling digital presence to showcase tour packages, inspire travelers and drive booking conversions in a competitive market.",
    solution:
      "A contemporary travel platform with curated destination guides, tour package showcases, immersive imagery and an intuitive booking flow designed to convert.",
    stack: ["Web Dev", "UI/UX", "Travel", "Netlify"],
  },
  {
    client: "Broadcast UAE",
    category: "Media & Broadcast",
    image: "/projects/broadcast.jpg",
    title: "Corporate media production, live broadcasting suite & content engine.",
    url: "https://broadcastuae.net/",
    urlLabel: "broadcastuae.net",
    metric: "4K Live",
    metricLabel: "Broadcasting Suite",
    secondary: "Live production suite",
    theme: "broadcast",
    year: "2024",
    problem:
      "A media and broadcasting leader needed a high-performance web platform to present live broadcast capabilities, multi-camera suites and corporate event streaming services.",
    solution:
      "A bespoke high-converting digital platform with video showcases, equipment inventories, and an inquiry pipeline for live media productions across the UAE.",
    stack: ["React", "Next.js", "Video", "Media"],
  },
  {
    client: "Ornibella Jewels",
    category: "Luxury E-Commerce",
    image: "/projects/ornibella.jpg",
    title: "High-end bespoke jewelry atelier & custom Shopify Plus storefront.",
    url: "https://ornibellajewels.com/",
    urlLabel: "ornibellajewels.com",
    metric: "2025",
    metricLabel: "Flagship Store",
    secondary: "Bespoke Jewelry Atelier",
    theme: "ornibella",
    year: "2025",
    problem:
      "A luxury jewelry designer needed an international bespoke e-commerce experience reflecting heritage craftsmanship and white-glove buying experiences.",
    solution:
      "A custom headless Shopify Plus architecture with high-res product configurators, diamond grading storytelling, and high-conversion frictionless checkout.",
    stack: ["Shopify Plus", "E-Commerce", "UX/UI", "CRO"],
  },
];

export const STATS = [
  { icon: "spark", value: "5", label: "Senior specialists" },
  { icon: "shield", value: "0", label: "Junior handoffs" },
  { icon: "bolt", value: "6", label: "Core capabilities" },
  { icon: "star", value: "1", label: "Standard" },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery Sprint",
    sub: "Scoping & architecture",
    text: "We unpack your bottlenecks, define technical requirements and deliver a rigid project blueprint before contract signing. Zero guesswork.",
  },
  {
    step: "02",
    title: "Agile Development",
    sub: "Live staging environments",
    text: "We develop in clean weekly sprints — you get active staging links to watch the codebase evolve live, with total transparency.",
  },
  {
    step: "03",
    title: "Rigid Deployment",
    sub: "Stress testing & delivery",
    text: "Automated CI/CD setup, rigorous database load tests and clean documentation handed over for painless maintenance.",
  },
];

export const COMPARE = {
  columns: [
    { name: "Typical agency", sub: "Outsourced delivery" },
    { name: "Freelancers", sub: "Solo & pieced together" },
    { name: "Kova Labs", sub: "Senior & in-house" },
  ],
  rows: [
    ["Senior engineers only", "partial", "partial", "yes"],
    ["Zero outsourcing", "no", "yes", "yes"],
    ["Design + dev + growth in one team", "partial", "no", "yes"],
    ["Direct access to the builders", "no", "partial", "yes"],
    ["You own all code & assets", "partial", "yes", "yes"],
    ["Fixed-scope blueprint upfront", "partial", "no", "yes"],
  ],
};

export const TEAM = {
  groups: ["Tech & Product", "Business & Growth"],
  members: [
    {
      initials: "YM",
      name: "Yasir Moeez",
      role: "Chief Technology Officer (CTO)",
      group: "Tech & Product",
      image: "/team/yasir-moeez.jpg",
      bio: "Owns the technical vision and architecture — keeping every system secure, scalable and built on high-performance frameworks.",
    },
    {
      initials: "MS",
      name: "M. Saad Malik",
      role: "Lead Developer & UI/UX Engineer",
      group: "Tech & Product",
      image: "/team/saad-malik.jpg",
      bio: "Bridges aesthetic design and technical execution — full-stack builds that feel as good as they look.",
    },
    {
      initials: "SM",
      name: "Shaariff Mujtaba",
      role: "Lead Developer & Product Designer",
      group: "Tech & Product",
      image: "/team/shaariff-mujtaba.jpg",
      bio: "Co-pilots the product lifecycle — dynamic front-end architecture refined by sharp UX/UI craft.",
    },
    {
      initials: "AM",
      name: "Absaar Munawar",
      role: "Finance Manager",
      group: "Business & Growth",
      image: "/team/absaar-munawar.jpg",
      bio: "Directs financial strategy, resource allocation, and operational budgeting — ensuring healthy fiscal discipline as the firm scales.",
    },
    {
      initials: "HH",
      name: "Hobdar Haider",
      role: "Head of Growth & Marketing",
      group: "Business & Growth",
      image: "/team/hobdar-haider.jpg",
      bio: "Owns brand positioning and acquisition — turning technical capability into narratives that convert and scale.",
    },
  ],
};

export const FAQS = [
  {
    q: "Who actually builds my product?",
    a: "The five senior people on our team — engineers, designers and growth. No junior handoffs, no third parties.",
  },
  {
    q: "Do you outsource any work?",
    a: "No. Everything is designed and engineered in-house by the same people you talk to.",
  },
  {
    q: "Where are you based?",
    a: "Islamabad, Pakistan — and we ship worldwide. Async-friendly, with live staging links and weekly sprints wherever you are.",
  },
  {
    q: "What kind of projects do you take?",
    a: "Full-stack web apps, Shopify Plus ecosystems, AI and internal automations, custom middleware, UX/CRO work and SaaS MVPs. If engineering decisions compound into business outcomes, it's our kind of brief.",
  },
  {
    q: "How does an engagement start?",
    a: "You email us the idea. Phase 1 is a discovery sprint — you get a rigid project blueprint and a quote before any contract is signed.",
  },
  {
    q: "Who owns the code?",
    a: "You do — 100% of it, end to end, with clean documentation for painless maintenance.",
  },
  {
    q: "How fast do you reply?",
    a: "Every email gets a human answer — usually the same day.",
  },
];

export const MARQUEE_ITEMS = ["WEB APPS", "SHOPIFY PLUS", "AI AUTOMATION", "SAAS MVP", "UI·UX"];
