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
    <section className="bg-white pb-24 pt-10">
      <div className="container-x">
        <Reveal from="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-night-950 p-8 text-white sm:p-14">
            <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-accent-500/20 blur-[130px]" />
            <div className="absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full bg-accent-600/15 blur-[120px]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow !text-accent-400">Careers & collabs</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Refuse mediocre software.
                </h2>
                <p className="mt-4 max-w-md text-white/65">
                  We're always up for ambitious teams — as clients or
                  collaborators. One email starts everything: a project, a
                  partnership or just a conversation.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PERKS.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition duration-300 hover:border-white/20 hover:bg-white/10"
                    >
                      <span className="h-2 w-2 rounded-full bg-accent-400" />
                      {p}
                    </span>
                  ))}
                </div>

                <Magnetic className="mt-10">
                  <a href={BRAND.emailUrl} className="btn-white">
                    Email the team <ArrowRight className="h-4 w-4" />
                  </a>
                </Magnetic>
              </div>

              <div className="relative">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/70">
                      this week at kova labs
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      On track
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {BOARD.map((s) => (
                      <div
                        key={s.title}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-night-900/80 px-4 py-3 transition duration-300 hover:border-white/25 hover:bg-night-800/80"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                          <span className="text-sm text-white/80">{s.title}</span>
                        </div>
                        <span className="text-xs text-white/40">{s.meta}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 flex items-center gap-2 text-xs text-white/40">
                    <Shield className="h-4 w-4 text-accent-400" />
                    We answer every email — usually the same day.
                  </p>
                </div>

                <div className="animate-float absolute -top-5 right-6 hidden rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-night-950 shadow-xl sm:block">
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
