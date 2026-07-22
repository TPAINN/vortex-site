import { cn } from "@/lib/utils";
function VortexLogo({ size = 28, className, animated = false }) {
  return <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    aria-hidden="true"
    className={cn("block", className)}
  >
      <defs>
        <linearGradient id="vortex-lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <circle
    cx="50"
    cy="50"
    r="42"
    fill="none"
    stroke="url(#vortex-lg)"
    strokeWidth="10"
    style={animated ? { transformOrigin: "50px 50px", animation: "vortex-spin 8s linear infinite" } : void 0}
  />
      <circle
    cx="50"
    cy="50"
    r="20"
    fill="none"
    stroke="url(#vortex-lg)"
    strokeWidth="10"
    strokeDasharray="85 45"
    style={animated ? {
      transformOrigin: "50px 50px",
      animation: "vortex-spin 5s linear infinite reverse"
    } : void 0}
  />
    </svg>;
}
function VortexWordmark({
  size = 28,
  className,
  animated = false
}) {
  return <span className={cn("flex items-center gap-2.5", className)}>
      <VortexLogo size={size} animated={animated} />
      <span className="font-display font-bold tracking-tight text-ink text-[1.15em] leading-none">
        Vor<span className="text-violet">tex</span>
      </span>
    </span>;
}
export {
  VortexLogo,
  VortexWordmark
};
