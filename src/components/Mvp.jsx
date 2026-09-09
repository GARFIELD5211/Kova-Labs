import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import { BRAND } from "../data/site.js";
import { ArrowRight, Rocket, Shield, Check } from "./Icons.jsx";

export default function Mvp() {
  return (
    <section id="mvp" className="scroll-mt-24 bg-ice-50 py-16 sm:py-24 overflow-hidden w-full max-w-full">
      <div className="container-x">
        <Reveal from="scale">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-ice-200 bg-white lg:grid-cols-12 shadow-sm">
            {/* Left Content Column */}
            <div className="p-6 sm:p-12 lg:p-14 lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600">
                  <Rocket className="h-3.5 w-3.5 text-accent-500" />
                  <span>SaaS MVP Development</span>
                </div>

                <p className="text-outline-dark mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
                  <RevealText text="0 → 1" delay={100} step={140} />
                </p>

                <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-night-950">
                  Venture-ready MVPs shipped in 2–4 weeks.
                </h3>

                <p className="lead mt-3 text-sm sm:text-base text-night-950/60 leading-relaxed">
                  Have an ambitious software idea? We architect, design, and ship production-grade MVPs that captivate users and convince investors. Senior-engineered with dual-portal architectures, clean React/TypeScript, and scalable APIs.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a href={BRAND.emailUrl} className="btn-dark text-center justify-center text-sm font-semibold !py-3">
                    Pitch your idea <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://crm-lancer-9gl5.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ice-200 bg-ice-50 px-5 py-3 text-sm font-semibold text-night-950 transition-all hover:bg-ice-100 hover:border-ice-300"
                  >
                    <span>Test Drive Live MVP</span>
                    <span className="text-xs text-accent-500 font-bold">↗</span>
                  </a>
                </div>
              </div>

              {/* Badges / Guarantees */}
              <div className="mt-8 pt-6 border-t border-ice-200 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-night-950">Senior-Built</p>
                    <p className="text-[11px] text-night-950/50">Zero junior handoffs</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-night-950">100% Ownership</p>
                    <p className="text-[11px] text-night-950/50">Full code & IP handover</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-night-950">Weekly Live Demos</p>
                    <p className="text-[11px] text-night-950/50">Active staging links</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-night-950">Enterprise RBAC</p>
                    <p className="text-[11px] text-night-950/50">Dual-portal security</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Showcase Column with Real Project Imagery */}
            <div
              className="relative p-5 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0c121e] via-[#090e17] to-[#04070d]"
            >
              {/* Subtle ambient lighting */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/20 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-[80px]" />

              {/* Floating top header bar */}
              <div className="w-full mb-4 flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white/80 text-xs sm:text-sm">Kova Labs CRM · Flagship SaaS MVP</span>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-white/70">
                  Production Build
                </span>
              </div>

              {/* Desktop Browser Mockup */}
              <div className="group relative w-full rounded-2xl border border-white/15 bg-[#0b101b] shadow-2xl overflow-hidden transition duration-500 hover:border-accent-400/40">
                {/* Browser Titlebar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/90" />
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/70">
                    <span className="text-[10px] text-emerald-400">🔒</span>
                    <span className="truncate max-w-[130px] sm:max-w-none">crm-lancer.vercel.app</span>
                  </div>
                  <a
                    href="https://crm-lancer-9gl5.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-accent-400 hover:text-accent-300 transition-colors flex items-center gap-1"
                  >
                    <span>Visit</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* Browser Body with Actual CRM Project Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-night-950">
                  <img
                    src="/projects/crm.jpg"
                    alt="Kova Labs B2B SaaS CRM Platform"
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  {/* Desktop overlay pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-night-950/85 px-3 py-2 backdrop-blur-md text-[11px] text-white">
                    <div className="flex items-center gap-2 truncate">
                      <span className="h-2 w-2 rounded-full bg-accent-500 shrink-0" />
                      <span className="font-semibold truncate">Dual-Portal Architecture · Admin &amp; Agent Views</span>
                    </div>
                    <span className="text-accent-400 font-bold shrink-0">v4.12 Live</span>
                  </div>
                </div>
              </div>

              {/* Sub-bar / mobile preview banner */}
              <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
                  <div className="relative h-12 w-9 rounded-lg overflow-hidden border border-white/20 shrink-0">
                    <img
                      src="/projects/crm-mobile.jpg"
                      alt="Mobile SaaS interface"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">Mobile SaaS Companion</p>
                    <p className="text-[10px] text-white/50 truncate">Real-time mobile dashboards</p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white">Shipped in 3 Weeks</p>
                      <p className="text-[10px] text-emerald-400 font-medium">Sprint 3 of 3 Delivered</p>
                    </div>
                  </div>
                  <a
                    href="https://crm-lancer-9gl5.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-accent-400 hover:underline shrink-0"
                  >
                    View ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
