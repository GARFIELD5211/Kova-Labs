import { useState } from "react";
import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import { BRAND, FAQS } from "../data/site.js";
import { Plus, ArrowRight } from "./Icons.jsx";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-24 overflow-hidden w-full max-w-full">
      <div className="container-x grid gap-10 sm:gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mt-3">
            <RevealText text="Cleverly answered." />
          </h2>
          <p className="lead mt-4 max-w-sm">
            The questions we hear most about working with us — answered
            honestly. Anything missing? Just ask.
          </p>
          <div className="card mt-6 sm:mt-8 max-w-sm p-5 sm:p-6 rounded-3xl">
            <p className="font-semibold text-sm sm:text-base">Tell us what you're building</p>
            <p className="mt-1 text-xs sm:text-sm text-night-950/50">
              Every email gets a human answer — usually the same day.
            </p>
            <a
              href={BRAND.emailUrl}
              className="mt-2.5 sm:mt-3 inline-block text-xs sm:text-sm font-semibold text-accent-600 transition hover:text-accent-500"
            >
              {BRAND.email}
            </a>
            <a href={BRAND.emailUrl} className="btn-ghost mt-4 sm:mt-5 w-full text-center justify-center text-sm font-semibold !py-3">
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} from="right">
          <div className="overflow-hidden rounded-[2rem] border border-ice-200 bg-white">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
              <div className="border-b border-ice-200 last:border-0">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 text-left transition hover:bg-ice-50"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-sm sm:text-base">{f.q}</span>
                  <span
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-ice-100 text-night-950 transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-night-950/60 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
