import Reveal from "./Reveal.jsx";
import Magnetic from "./Magnetic.jsx";
import { BRAND } from "../data/site.js";
import { ArrowRight, Shield } from "./Icons.jsx";

const PERKS = [
  "Senior-only culture",
  "Direct communication",
  "Weekly demos",
  "You own the code",
];

const BOARD = [
  { title: "New inquiry — reply sent", meta: "today 09:41", dot: "bg-emerald-500" },
  { title: "Sprint demo", meta: "Friday 16:00", dot: "bg-accent-400" },
  { title: "The VoiceStudio — live", meta: "9 verticals", dot: "bg-emerald-500" },
  { title: "Lancer Travels — shipped", meta: "2025", dot: "bg-accent-400" },
];

export default function Program() {
  return (
    <section className="bg-white pb-16 sm:pb-24 pt-8 sm:pt-10 overflow-hidden w-full max-w-full">
      <div className="container-x">
        <Reveal from="scale">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-night-950 p-5 sm:p-14 text-white">
            <div className="absolute -top-32 -right-24 h-[320px] sm:h-[420px] w-[320px] sm:w-[420px] rounded-full bg-accent-500/20 blur-[110px]" />
            <div className="absolute -bottom-40 -left-24 h-[300px] sm:h-[380px] w-[300px] sm:w-[380px] rounded-full bg-accent-600/15 blur-[100px]" />

            <div className="relative grid items-center gap-10 sm:gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow !text-accent-400">Careers & collabs</p>
                <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-4xl font-bold tracking-tight">
                  Refuse mediocre software.
                </h2>
                <p className="mt-3 sm:mt-4 max-w-md text-xs sm:text-base text-white/65 leading-relaxed">
                  We're always up for ambitious teams — as clients or
                  collaborators. One email starts everything: a project, a
                  partnership or just a conversation.
                </p>

                <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-2">
                  {PERKS.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white/80 transition duration-300 hover:border-white/20 hover:bg-white/10"
                    >
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent-400 shrink-0" />
                      {p}
                    </span>
                  ))}
                </div>

                <Magnetic className="mt-8 sm:mt-10">
                  <a href={BRAND.emailUrl} className="btn-white w-full sm:w-auto text-center justify-center text-sm font-semibold !py-3">
                    Email the team <ArrowRight className="h-4 w-4" />
                  </a>
                </Magnetic>
              </div>

              <div className="relative">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-white/70">
                      this week at kova labs
                    </span>
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500" />
                      On track
                    </span>
                  </div>
                  <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                    {BOARD.map((s) => (
                      <div
                        key={s.title}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-night-900/80 px-3.5 py-2.5 sm:px-4 sm:py-3 transition duration-300 hover:border-white/25 hover:bg-night-800/80"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${s.dot} shrink-0`} />
                          <span className="text-xs sm:text-sm text-white/80 truncate">{s.title}</span>
                        </div>
                        <span className="text-[11px] sm:text-xs text-white/40 shrink-0">{s.meta}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 sm:mt-5 flex items-center gap-2 text-[11px] sm:text-xs text-white/40">
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-400 shrink-0" />
                    We answer every email — usually the same day.
                  </p>
                </div>

                <div className="animate-float absolute -top-4 right-4 hidden rounded-2xl bg-white px-3.5 py-2 text-[11px] font-semibold text-night-950 shadow-xl sm:block">
                  Senior-only · In-house
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
