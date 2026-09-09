import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import BgWord from "./BgWord.jsx";
import { BRAND, TEAM } from "../data/site.js";
import { ArrowRight } from "./Icons.jsx";

export default function Team() {
  return (
    <section id="team" className="relative scroll-mt-24 overflow-hidden bg-night-950 py-16 sm:py-24 text-white w-full max-w-full">
      <BgWord speed={-0.18} dark>
        TEAM
      </BgWord>
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-accent-400">The team</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            <RevealText text="The people behind the work." />
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-lg">
            A lean, senior team spanning engineering, design, product and
            growth — five people, one standard.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 90} from="tilt" className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7 transition duration-300 hover:-translate-y-1 hover:border-accent-400/30">
                <div className="flex items-center justify-between">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-md shrink-0">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-accent-500/15 font-extrabold text-accent-400 text-sm sm:text-base">
                        {m.initials}
                      </span>
                    )}
                    <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-night-950" title="Active in Islamabad" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-white/50">
                    {m.group}
                  </span>
                </div>
                <h3 className="mt-4 sm:mt-5 font-semibold text-base sm:text-lg">{m.name}</h3>
                <p className="mt-0.5 text-xs sm:text-sm text-accent-400/80">{m.role}</p>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/55">{m.bio}</p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={480} from="scale" className="h-full">
            <article className="flex h-full flex-col items-start justify-center rounded-3xl border border-dashed border-white/15 p-5 sm:p-7">
              <h3 className="text-base sm:text-lg font-bold">Want to work with us?</h3>
              <p className="mt-2 text-xs sm:text-sm text-white/55">
                Ambitious teams who refuse mediocre software — that's you, we
                hope.
              </p>
              <a href={BRAND.emailUrl} className="btn-white mt-5 sm:mt-6 w-full sm:w-auto text-center justify-center text-sm font-semibold !py-3">
                Start a project <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
