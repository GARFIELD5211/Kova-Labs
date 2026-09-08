import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import CountUp from "./CountUp.jsx";
import BgWord from "./BgWord.jsx";
import { BRAND, PROCESS_STEPS, STATS } from "../data/site.js";
import { ArrowRight, Bolt, Cart, Bot, Rocket, Spark, Shield, Star } from "./Icons.jsx";

const ICONS = { bolt: Bolt, cart: Cart, bot: Bot, rocket: Rocket, spark: Spark, shield: Shield, star: Star };

export default function Engagement() {
  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-ice-50 py-24">
      <BgWord speed={0.22}>PROCESS</BgWord>
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Process</p>
          <h2 className="h2 mt-3">
            <RevealText text="Fixed scope. Fair quote." />
          </h2>
          <p className="lead mt-4">
            Every engagement runs the same honest loop — you know the plan and
            the price before we write a line of code.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 120} from="scale" className="h-full">
              <article className="card group h-full overflow-hidden p-7 transition duration-300 hover:-translate-y-1">
                <span className="text-outline-dark block text-6xl font-extrabold transition duration-300 group-hover:text-accent-500/20">
                  {s.step}
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-0.5 text-xs font-semibold tracking-wide text-accent-500 uppercase">
                  {s.sub}
                </p>
                <p className="mt-2 text-sm text-night-950/55">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(({ icon, value, label }, i) => {
            const Icon = ICONS[icon];
            return (
              <Reveal key={label} delay={i * 100}>
                <div className="card group h-full p-6 transition duration-300 hover:-translate-y-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 transition duration-300 group-hover:scale-110 group-hover:bg-accent-500/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">
                    <CountUp to={parseInt(value, 10) || 0} />
                  </p>
                  <p className="mt-1 text-sm text-night-950/50">{label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="card mt-8 flex flex-col items-start justify-between gap-4 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500">
                <Spark className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Tell us what you're building</p>
                <p className="text-sm text-night-950/50">
                  One email — we reply with a scoped plan and a quote.
                </p>
              </div>
            </div>
            <a href={BRAND.emailUrl} className="btn-ghost shrink-0">
              {BRAND.email} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
