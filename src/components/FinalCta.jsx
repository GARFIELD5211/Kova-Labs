import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import Magnetic from "./Magnetic.jsx";
import FlowScene from "./FlowScene.jsx";
import { BRAND } from "../data/site.js";

export default function FinalCta() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-night-950 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2">
        <div data-parallax="-0.05" className="h-full w-full rounded-full bg-accent-500/20 blur-[140px]" />
      </div>

      <div className="container-x relative py-28 text-center sm:py-36">
        <Reveal>
          <p className="eyebrow !text-accent-400">Let’s build</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            <RevealText text="Ready to build something ambitious?" delay={100} />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/60">
            One email is all it takes — tell us the idea, we’ll come back with
            a scoped plan.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href={BRAND.emailUrl} className="btn-primary !px-8 !py-3.5">
                Email us
              </a>
            </Magnetic>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              See our work
            </a>
          </div>
          <p className="mt-8 text-sm text-white/40">
            Senior engineers · No outsourcing · You own everything
          </p>
        </Reveal>
      </div>

      <FlowScene id="cta" />
    </section>
  );
}
