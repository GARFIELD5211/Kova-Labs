import Reveal from "./Reveal.jsx";
import RevealText from "./RevealText.jsx";
import { COMPARE } from "../data/site.js";
import { Check, Cross, Minus } from "./Icons.jsx";

const MARK = {
  yes: { Icon: Check, cls: "bg-emerald-500/10 text-emerald-500", label: "Included" },
  partial: { Icon: Minus, cls: "bg-amber-500/10 text-amber-500", label: "Partial" },
  no: { Icon: Cross, cls: "bg-slate-400/10 text-slate-400", label: "Not included" },
};

function Mark({ value }) {
  const { Icon, cls, label } = MARK[value];
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${cls}`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default function Comparison() {
  const last = COMPARE.columns.length;

  return (
    <section id="compare" className="scroll-mt-24 bg-white py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why us</p>
          <h2 className="h2 mt-3">
            <RevealText text="Agencies, freelancers or Kova Labs?" />
          </h2>
          <p className="lead mt-4">
            Where each option delivers — and where it stops.
          </p>
        </Reveal>

        <Reveal delay={150} from="scale">
          <div className="card mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ice-200 bg-ice-50">
                  <th className="px-6 py-5 text-sm font-semibold text-night-950/50">
                    What matters
                  </th>
                  {COMPARE.columns.map((c, i) => (
                    <th
                      key={c.name}
                      className={`px-6 py-5 ${
                        i === last - 1 ? "bg-accent-500/[0.06]" : ""
                      }`}
                    >
                      <span
                        className={`block text-sm font-bold ${
                          i === last - 1 ? "text-accent-600" : "text-night-950"
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="block text-xs font-medium text-night-950/45">
                        {c.sub}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map(([label, ...vals]) => (
                  <tr
                    key={label}
                    className="border-b border-ice-200 transition-colors last:border-0 hover:bg-ice-50"
                  >
                    <td className="px-6 py-4 text-sm font-medium">{label}</td>
                    {vals.map((v, i) => (
                      <td
                        key={i}
                        className={`px-6 py-4 transition-colors ${
                          i === vals.length - 1 ? "bg-accent-500/[0.06]" : ""
                        }`}
                      >
                        <Mark value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm text-night-950/45">
          The difference: the five people you meet are the five people who
          build.
        </p>
      </div>
    </section>
  );
}
