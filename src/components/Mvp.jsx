import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import { BRAND } from "../data/site.js";
import { ArrowRight, Rocket } from "./Icons.jsx";

function Phone() {
  return (
    <div className="animate-float w-48 sm:w-56 rounded-[2.2rem] sm:rounded-[2.6rem] border-[8px] sm:border-[10px] border-night-950 bg-white shadow-2xl">
      <div className="mx-auto mt-2 h-4 sm:h-5 w-20 sm:w-24 rounded-full bg-night-950" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-tight">
            KOVA<span className="text-accent-500">.</span>
          </span>
          <span className="flex gap-1">
            <span className="h-1 w-3 sm:w-4 rounded-full bg-ice-200" />
            <span className="h-1 w-3 sm:w-4 rounded-full bg-ice-200" />
          </span>
        </div>
        <div
          className="mt-3 h-20 sm:h-24 rounded-xl"
          style={{ background: "linear-gradient(135deg,#0a1020 0%,#2e6bff 100%)" }}
        />
        <div className="mt-3 space-y-1.5">
          <span className="block h-2 w-3/4 rounded-full bg-ice-200" />
          <span className="block h-2 w-1/2 rounded-full bg-ice-200" />
        </div>
        <span className="mt-3 inline-block h-5 sm:h-6 w-16 sm:w-20 rounded-full bg-accent-500" />
        <div className="mt-3 sm:mt-4 space-y-2">
          <span className="block h-7 sm:h-8 rounded-lg border border-ice-200" />
          <span className="block h-7 sm:h-8 rounded-lg border border-ice-200" />
          <span className="block h-7 sm:h-8 rounded-lg border border-ice-200" />
        </div>
      </div>
      <div className="mx-auto mb-2 h-1 w-16 sm:w-20 rounded-full bg-ice-200" />
    </div>
  );
}

export default function Mvp() {
  return (
    <section id="mvp" className="scroll-mt-24 bg-ice-50 py-16 sm:py-24 overflow-hidden w-full max-w-full">
      <div className="container-x">
        <Reveal from="scale">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-ice-200 bg-white lg:grid-cols-2">
            <div className="p-6 sm:p-14">
              <p className="eyebrow">SaaS MVPs</p>
              <p className="text-outline-dark mt-3 sm:mt-4 text-6xl font-extrabold tracking-tight sm:text-8xl">
                <RevealText text="0 → 1" delay={100} step={140} />
              </p>
              <p className="lead mt-4 sm:mt-6 max-w-md text-sm sm:text-lg">
                Have an idea? We scope, design and ship the first version you
                put in front of users — senior-built, sprint by sprint, made to
                last past launch.
              </p>
              <div className="mt-7 sm:mt-8 flex flex-wrap gap-3">
                <a href={BRAND.emailUrl} className="btn-dark w-full sm:w-auto text-center justify-center">
                  Pitch your idea <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-7 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                <span className="chip text-xs sm:text-sm">Senior-built</span>
                <span className="chip text-xs sm:text-sm">You own the code</span>
                <span className="chip text-xs sm:text-sm">Weekly demos</span>
              </div>
            </div>

            <div
              className="relative flex items-center justify-center overflow-hidden p-6 py-14 sm:p-14"
              style={{
                background:
                  "radial-gradient(120% 120% at 80% 10%, rgba(46,107,255,0.16) 0%, rgba(46,107,255,0.05) 45%, transparent 75%)",
              }}
            >
              <div className="transition duration-500 hover:scale-[1.03]">
                <Phone />
              </div>
              <div className="absolute top-4 left-4 sm:top-10 sm:left-6 flex items-center gap-2 rounded-2xl border border-ice-200 bg-white px-3 py-2 sm:px-4 sm:py-3 text-[11px] sm:text-xs font-semibold shadow-lg">
                <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-500" /> v1.0 shipped
              </div>
              <div
                className="animate-float absolute right-4 bottom-4 sm:right-6 sm:bottom-10 rounded-2xl border border-ice-200 bg-white px-3 py-2 sm:px-4 sm:py-3 text-[11px] sm:text-xs font-semibold shadow-lg"
                style={{ animationDelay: "1.4s" }}
              >
                Sprint 3 of 3
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
