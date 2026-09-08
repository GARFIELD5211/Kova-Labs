import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import BgWord from "./BgWord.jsx";
import { SERVICES } from "../data/site.js";
import {
  Bolt,
  Cart,
  Bot,
  Rocket,
  Shield,
  Gauge,
} from "./Icons.jsx";

const ICONS = {
  bolt: Bolt,
  cart: Cart,
  bot: Bot,
  rocket: Rocket,
  shield: Shield,
  gauge: Gauge,
};

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-white py-24">
      <BgWord speed={-0.2}>BUILD</BgWord>
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Capabilities</p>
          <h2 className="h2 mt-3">
            <RevealText text="What we build." />
          </h2>
          <p className="lead mt-4">
            Six disciplines, one senior team — engineered to work together.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ num, icon, title, text }, i) => {
            const Icon = ICONS[icon];
            return (
              <Reveal key={title} delay={i * 100} from="scale" className="h-full">
                <article className="card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-40px_rgba(15,30,60,0.45)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500 transition duration-300 group-hover:scale-110 group-hover:bg-accent-500/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-outline-dark text-3xl font-extrabold">
                      {num}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-night-950/55">{text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
