/**
 * Smooth layered "ice dune" scene — soft bezier hills with rim light,
 * drifting mist and optional twinkling stars. `id` must be unique per
 * instance so SVG gradient defs don't collide.
 */
export default function FlowScene({ id, className = "", stars = false }) {
  const u = (n) => `${id}-${n}`;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="relative h-[360px] w-full overflow-hidden sm:h-[460px]">
        {/* soft horizon glow */}
        <div className="absolute top-[-40px] left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-accent-400/[0.12] blur-[100px]" />
        {/* aurora arc */}
        <svg
          className="absolute inset-x-0 top-2 mx-auto w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id={u("arc")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#5b8cff" stopOpacity="0" />
              <stop offset="0.3" stopColor="#5b8cff" stopOpacity="0.35" />
              <stop offset="0.7" stopColor="#9d7bff" stopOpacity="0.3" />
              <stop offset="1" stopColor="#9d7bff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-40 190 C 300 40 900 10 1480 170"
            stroke={`url(#${u("arc")})`}
            strokeWidth="90"
            style={{ filter: "blur(46px)" }}
          />
        </svg>

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 440"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={u("g1")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1b2850" />
              <stop offset="1" stopColor="#0a1122" />
            </linearGradient>
            <linearGradient id={u("g2")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#111c3a" />
              <stop offset="1" stopColor="#070d1a" />
            </linearGradient>
            <linearGradient id={u("g3")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b1428" />
              <stop offset="1" stopColor="#04060c" />
            </linearGradient>
            <linearGradient id={u("rim")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#5b8cff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#5b8cff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#5b8cff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {stars && (
            <g fill="#cfe0ff">
              <circle className="twinkle" cx="180" cy="70" r="1.6" />
              <circle className="twinkle" cx="420" cy="40" r="1.2" style={{ animationDelay: "1.2s" }} />
              <circle className="twinkle" cx="640" cy="90" r="1.8" style={{ animationDelay: "0.6s" }} />
              <circle className="twinkle" cx="900" cy="50" r="1.3" style={{ animationDelay: "2s" }} />
              <circle className="twinkle" cx="1120" cy="85" r="1.6" style={{ animationDelay: "0.9s" }} />
              <circle className="twinkle" cx="1310" cy="45" r="1.2" style={{ animationDelay: "1.6s" }} />
              <circle className="twinkle" cx="60" cy="130" r="1.1" style={{ animationDelay: "2.6s" }} />
              <circle className="twinkle" cx="1240" cy="140" r="1.4" style={{ animationDelay: "0.3s" }} />
              <circle className="twinkle" cx="300" cy="105" r="1" style={{ animationDelay: "3.1s" }} />
              <circle className="twinkle" cx="760" cy="120" r="1" style={{ animationDelay: "1.8s" }} />
              <circle className="twinkle" cx="1390" cy="105" r="1.1" style={{ animationDelay: "2.2s" }} />
            </g>
          )}

          {/* back dune — blurred for depth */}
          <g className="animate-drift">
            <path
              d="M0 250 C 180 170 380 148 560 196 C 760 248 920 152 1100 128 C 1250 108 1350 150 1440 138 L 1440 440 L 0 440 Z"
              fill={`url(#${u("g1")})`}
              opacity="0.6"
              style={{ filter: "blur(5px)" }}
            />
          </g>

          {/* horizon mist */}
          <ellipse
            cx="720"
            cy="252"
            rx="760"
            ry="54"
            fill="#8fb0ff"
            opacity="0.07"
            style={{ filter: "blur(28px)" }}
          />

          {/* mid dune + rim light */}
          <path
            d="M0 306 C 200 246 380 252 560 284 C 780 322 980 234 1160 228 C 1290 224 1380 252 1440 246 L 1440 440 L 0 440 Z"
            fill={`url(#${u("g2")})`}
          />
          <path
            d="M0 306 C 200 246 380 252 560 284 C 780 322 980 234 1160 228 C 1290 224 1380 252 1440 246"
            fill="none"
            stroke={`url(#${u("rim")})`}
            strokeWidth="2"
            opacity="0.7"
          />

          {/* front dune + softer rim */}
          <path
            d="M0 364 C 220 322 420 332 640 358 C 880 386 1120 312 1440 332 L 1440 440 L 0 440 Z"
            fill={`url(#${u("g3")})`}
          />
          <path
            d="M0 364 C 220 322 420 332 640 358 C 880 386 1120 312 1440 332"
            fill="none"
            stroke={`url(#${u("rim")})`}
            strokeWidth="1.5"
            opacity="0.4"
          />
        </svg>

        {/* low fog */}
        <div className="absolute top-1/3 left-1/2 h-24 w-[140%] -translate-x-1/2 rounded-full bg-[#7fa6ff]/10 blur-3xl" />
      </div>
    </div>
  );
}
