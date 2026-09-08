export default function Logo({ dark = false, className = "" }) {
  return (
    <a
      href="#top"
      className={`inline-flex items-baseline font-extrabold tracking-tight ${
        dark ? "text-white" : "text-night-950"
      } ${className}`}
    >
      KOVALABS<span className="text-accent-500">.</span>
    </a>
  );
}
