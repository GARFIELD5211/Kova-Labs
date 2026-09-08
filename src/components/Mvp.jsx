import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import { BRAND } from "../data/site.js";
import { ArrowRight, Rocket } from "./Icons.jsx";

function Phone() {
  return (
    <div className="animate-float w-56 rounded-[2.6rem] border-[10px] border-night-950 bg-white shadow-2xl">
      <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-night-950" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-tight">
            KOVA<span className="text-accent-500">.</span>
          </span>
          <span className="flex gap-1">
            <span className="h-1 w-4 rounded-full bg-ice-200" />
            <span className="h-1 w-4 rounded-full bg-ice-200" />
          </span>
        </div>
        <div
          className="mt-3 h-24 rounded-xl"
          style={{ background: "linear-gradient(135deg,#0a1020 0%,#2e6bff 100%)" }}
        />
        <div className="mt-3 space-y-1.5">
          <span className="block h-2 w-3/4 rounded-full bg-ice-200" />
          <span className="block h-2 w-1/2 rounded-full bg-ice-200" />
        </div>
        <span className="mt-3 inline-block h-6 w-20 rounded-full bg-accent-500" />
        <div className="mt-4 space-y-2">
          <span className="block h-8 rounded-lg border border-ice-200" />
          <span className="block h-8 rounded-lg border border-ice-200" />
          <span className="block h-8 rounded-lg border border-ice-200" />
        </div>
      </div>
      <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-ice-200" />
    </div>
  );
}

export default function Mvp() {
  return (
    <section id="mvp" className="scroll-mt-24 bg-ice-50 py-24">
      <div className="container-x">
        <Reveal from="scale">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-ice-200 bg-white lg:grid-cols-2">
            <div className="p-10 sm:p-14">
              <p className="eyebrow">SaaS MVPs</p>
              <p className="text-outline-dark mt-4 text-7xl font-extrabold tracking-tight sm:text-8xl">
                <RevealText text="0 → 1" delay={100} step={140} />
              </p>
              <p className="lead mt-6 max-w-md">
                Have an idea? We scope, design and ship the first version you
                put in front of users — senior-built, sprint by sprint, made to
                last past launch.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={BRAND.emailUrl} className="btn-dark">
                  Pitch your idea <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="chip">Senior-built</span>
                <span className="chip">You own the code</span>
                <span className="chip">Weekly demos</span>
              </div>
            </div>

            <div
              className="relative flex items-center justify-center overflow-hidden p-10 sm:p-14"
              style={{
                background:
                  "radial-gradient(120% 120% at 80% 10%, rgba(46,107,255,0.16) 0%, rgba(46,107,255,0.05) 45%, transparent 75%)",
              }}
            >
              <div className="transition duration-500 hover:scale-[1.03]">
                <Phone />
              </div>
              <div className="absolute top-10 left-6 flex items-center gap-2 rounded-2xl border border-ice-200 bg-white px-4 py-3 text-xs font-semibold shadow-lg">
                <Rocket className="h-4 w-4 text-accent-500" /> v1.0 shipped
              </div>
              <div
                className="animate-float absolute right-6 bottom-10 rounded-2xl border border-ice-200 bg-white px-4 py-3 text-xs font-semibold shadow-lg"
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
