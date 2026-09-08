export const THEMES = {
  lancer: {
    hero: "linear-gradient(135deg,#06231c 0%,#2fbf8f 100%)",
    accent: "#2fbf8f",
  },
  voicestudio: {
    hero: "linear-gradient(135deg,#101a3a 0%,#5b8cff 100%)",
    accent: "#5b8cff",
  },
  asas: {
    hero: "linear-gradient(135deg,#122410 0%,#7ac142 100%)",
    accent: "#7ac142",
  },
  xyntra: {
    hero: "linear-gradient(135deg,#0a1a33 0%,#22d3ee 100%)",
    accent: "#22d3ee",
  },
  crm: {
    hero: "linear-gradient(135deg,#191b26 0%,#64748b 100%)",
    accent: "#94a3b8",
  },
  mvp: {
    hero: "linear-gradient(135deg,#0a1020 0%,#2e6bff 100%)",
    accent: "#2e6bff",
  },
};

export default function MiniSite({ theme, url, bodyHeight = "h-44", className = "" }) {
  const t = THEMES[theme] ?? THEMES.mvp;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-ice-200 bg-white ${className}`}
    >
      {/* browser bar */}
      <div className="flex items-center gap-1.5 bg-ice-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ice-300" />
        <span className="h-2 w-2 rounded-full bg-ice-300" />
        <span className="h-2 w-2 rounded-full bg-ice-300" />
        <span className="ml-2 h-4 flex-1 rounded-full border border-ice-200 bg-white px-2 text-[9px] leading-4 text-night-950/45">
          {url ?? "kovalabs.tech"}
        </span>
      </div>

      {/* page body */}
      <div className={`relative ${bodyHeight}`} style={{ background: t.hero }}>
        <div className="flex items-center justify-between px-3 pt-2.5">
          <span className="h-1.5 w-10 rounded-full bg-white/80" />
          <span className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white/40" />
            <span className="h-1.5 w-6 rounded-full bg-white/40" />
            <span className="h-1.5 w-6 rounded-full bg-white/40" />
          </span>
        </div>
        <div className="space-y-2 px-3 pt-5">
          <span className="block h-2.5 w-3/4 rounded-full bg-white/90" />
          <span className="block h-2.5 w-1/2 rounded-full bg-white/90" />
          <span className="mt-3 inline-block h-5 w-16 rounded-full" style={{ background: t.accent }} />
        </div>
        <div className="absolute right-3 bottom-3 left-3 flex gap-2">
          <span className="h-10 flex-1 rounded-lg bg-white/15 backdrop-blur-sm" />
          <span className="h-10 flex-1 rounded-lg bg-white/15 backdrop-blur-sm" />
          <span className="h-10 flex-1 rounded-lg bg-white/15 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
}
