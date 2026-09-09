import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import Magnetic from "./Magnetic.jsx";
import FlowScene from "./FlowScene.jsx";
import { BRAND } from "../data/site.js";

export default function FinalCta() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-night-950 text-white w-full max-w-full">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2">
        <div data-parallax="-0.05" className="h-full w-full rounded-full bg-accent-500/20 blur-[140px]" />
      </div>

      <div className="container-x relative py-20 sm:py-36 text-center">
        <Reveal>
          <p className="eyebrow !text-accent-400">Let’s build</p>
          <h2 className="mx-auto mt-3 sm:mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-6xl">
            <RevealText text="Ready to build something ambitious?" delay={100} />
          </h2>
          <p className="mx-auto mt-4 sm:mt-5 max-w-xl text-xs sm:text-base text-white/60 leading-relaxed">
            One email is all it takes — tell us the idea, we’ll come back with
            a scoped plan.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
            <Magnetic className="w-full sm:w-auto">
              <a href={BRAND.emailUrl} className="btn-primary !px-8 !py-3.5 w-full sm:w-auto text-center justify-center text-sm font-semibold">
                Email us
              </a>
            </Magnetic>
            <a
              href="#work"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              See our work
            </a>
          </div>
          <p className="mt-7 sm:mt-8 text-xs sm:text-sm text-white/40">
            Senior engineers · No outsourcing · You own everything
          </p>
        </Reveal>
      </div>

      <FlowScene id="cta" />
    </section>
  );
}
