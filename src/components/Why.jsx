import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import { BRAND } from "../data/site.js";
import { ArrowRight, Star, Shield, Spark } from "./Icons.jsx";

const ROWS = [
  {
    icon: Star,
    title: "Senior engineers only",
    text: "Five people who own outcomes from day one. No juniors, no handoffs.",
  },
  {
    icon: Shield,
    title: "No outsourcing, no fluff",
    text: "The people you talk to are the people who build.",
  },
  {
    icon: Spark,
    title: "Outcomes over output",
    text: "Every build is measured against the result it creates — not the tickets it closes.",
  },
];

const GROUPS = [
  { name: "Tech & Product", people: "Yasir · Saad · Shaariff", count: "3 seniors" },
  { name: "Business & Growth", people: "Absaar · Hobdar", count: "2 seniors" },
];

export default function Why() {
  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden w-full max-w-full">
      <div className="container-x grid items-center gap-10 sm:gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Why Kova Labs</p>
          <h2 className="h2 mt-3">
            <RevealText text="Senior people. Zero outsourcing." />
          </h2>
          <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
            {ROWS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="group flex gap-3.5 sm:gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500 transition duration-300 group-hover:scale-110 group-hover:bg-accent-500/20">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-night-950/55 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={BRAND.emailUrl} className="btn-dark mt-8 sm:mt-10 w-full sm:w-auto text-center justify-center">
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={150} from="right">
          <div className="rounded-[2rem] border border-ice-200 bg-ice-50 p-5 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base">Five people. One standard.</h3>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-night-950/60 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                In-house
              </span>
            </div>
            <div className="mt-5 sm:mt-6 space-y-3">
              {GROUPS.map((g) => (
                <div
                  key={g.name}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ice-200 bg-white p-3.5 sm:p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">{g.name}</p>
                    <p className="text-xs sm:text-sm text-night-950/50">{g.people}</p>
                  </div>
                  <span className="rounded-full bg-accent-500/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap text-accent-500 shrink-0">
                    {g.count}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 sm:mt-6 rounded-2xl bg-night-950 px-4 py-3 text-center text-xs sm:text-sm font-medium text-white">
              Based in Islamabad — shipping worldwide.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
