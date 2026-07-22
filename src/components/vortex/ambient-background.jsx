import { motion } from "framer-motion";
function AmbientBackground({
  intensity = 1,
  grid = true,
  particles = true,
  className = ""
}) {
  return <div
    className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    aria-hidden="true"
  >
      {
    /* base vertical wash: black → violet-tinted → black */
  }
      <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(120% 80% at 50% -10%, oklch(0.14 0.04 292 / 0.9), transparent 60%), linear-gradient(180deg, oklch(0.05 0.01 290) 0%, var(--vortex-black) 55%)"
    }}
  />

      {
    /* counter-rotating conic vortex */
  }
      <div className="vortex-bg" style={{ opacity: 0.7 * intensity }} />

      {
    /* drifting orbs */
  }
      {/* Orbs: soft radial-gradients with NO filter:blur — animating scale on
          a blurred layer forces expensive re-rasterisation; a gradient stays
          composite-only and looks the same. */}
      <motion.div
    className="orb absolute -left-[10%] top-[18%] h-[44vmin] w-[44vmin] rounded-full"
    style={{
      background: "radial-gradient(circle, oklch(0.55 0.25 293 / 0.5) 0%, oklch(0.55 0.25 293 / 0.16) 38%, transparent 66%)",
      opacity: 0.55 * intensity,
      willChange: "transform"
    }}
    animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.96, 1] }}
    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
  />
      <motion.div
    className="orb absolute -right-[8%] top-[8%] h-[40vmin] w-[40vmin] rounded-full"
    style={{
      background: "radial-gradient(circle, oklch(0.65 0.17 256 / 0.45) 0%, oklch(0.65 0.17 256 / 0.14) 38%, transparent 66%)",
      opacity: 0.5 * intensity,
      willChange: "transform"
    }}
    animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0], scale: [1, 0.95, 1.06, 1] }}
    transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
  />
      <motion.div
    className="orb absolute bottom-[6%] left-[35%] h-[36vmin] w-[36vmin] rounded-full"
    style={{
      background: "radial-gradient(circle, oklch(0.7 0.22 300 / 0.36) 0%, oklch(0.7 0.22 300 / 0.12) 38%, transparent 66%)",
      opacity: 0.45 * intensity,
      willChange: "transform"
    }}
    animate={{ x: [0, 30, -25, 0], y: [0, -20, 15, 0], scale: [1, 1.05, 0.97, 1] }}
    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
  />

      {
    /* faint dot grid */
  }
      {grid && <div
    className="absolute inset-0 opacity-[0.18]"
    style={{
      backgroundImage: "radial-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px)",
      backgroundSize: "clamp(22px, 3vw, 38px) clamp(22px, 3vw, 38px)",
      maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 0%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 0%, transparent 75%)"
    }}
  />}

      {
    /* drifting particles */
  }
      {particles && <div className="absolute inset-0">
          {PARTICLES.map((p, i) => <motion.span
    key={i}
    className="absolute rounded-full bg-white"
    style={{
      left: `${p.x}%`,
      top: `${p.y}%`,
      width: p.s,
      height: p.s,
      opacity: p.o * intensity,
      boxShadow: "0 0 6px oklch(0.7 0.22 300 / 0.7)"
    }}
    animate={{ y: [0, -p.d, 0], opacity: [p.o * 0.4, p.o, p.o * 0.4] }}
    transition={{
      duration: p.dur,
      repeat: Infinity,
      ease: "easeInOut",
      delay: p.delay
    }}
  />)}
        </div>}

      {
    /* top + edge vignette for depth */
  }
      <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(120% 100% at 50% 0%, transparent 55%, oklch(0.04 0.006 290 / 0.85) 100%)"
    }}
  />
    </div>;
}
const PARTICLES = [
  { x: 12, y: 30, s: 2, o: 0.6, d: 26, dur: 7, delay: 0 },
  { x: 82, y: 22, s: 2, o: 0.5, d: 32, dur: 9, delay: 1.2 },
  { x: 68, y: 70, s: 1.5, o: 0.7, d: 22, dur: 6.5, delay: 0.6 },
  { x: 28, y: 78, s: 2.5, o: 0.4, d: 34, dur: 10, delay: 2 },
  { x: 50, y: 16, s: 1.5, o: 0.6, d: 28, dur: 8, delay: 0.3 },
  { x: 90, y: 60, s: 2, o: 0.5, d: 30, dur: 7.5, delay: 1.8 },
  { x: 8, y: 55, s: 1.5, o: 0.55, d: 24, dur: 6.8, delay: 0.9 },
  { x: 40, y: 88, s: 2, o: 0.45, d: 36, dur: 9.5, delay: 2.4 },
  { x: 75, y: 40, s: 1.5, o: 0.6, d: 26, dur: 7.2, delay: 1.5 },
  { x: 20, y: 12, s: 2, o: 0.5, d: 30, dur: 8.4, delay: 0.4 }
];
export {
  AmbientBackground as default
};
