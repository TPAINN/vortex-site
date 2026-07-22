import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./reveal";
const STATS = [
  { value: 10, suffix: "+", label: "Platforms supported" },
  { value: 1080, suffix: "p", label: "Max video quality" },
  { value: 320, suffix: "kbps", label: "MP3 audio bitrate" },
  { value: 0, prefix: "$", label: "Cost \xB7 forever free" }
];
function useCountUp(target, run, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}
function StatItem({ stat, run, index }) {
  const v = useCountUp(stat.value, run);
  const display = stat.decimals ? v.toFixed(stat.decimals) : Math.round(v).toString();
  return <Reveal delay={index * 0.1} y={20}>
      <div className="group relative h-full overflow-hidden rounded-3xl border border-glass bg-glass p-7 backdrop-blur-md transition-colors hover:border-violet/40">
        <div
    className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
    style={{ background: "radial-gradient(circle, oklch(0.65 0.17 256 / 0.5), transparent 70%)" }}
  />
        <div className="relative font-display text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-none tracking-[-0.03em] text-ink tabular-nums">
          {stat.prefix}
          {display}
          {stat.suffix && <span className="gradient-vortex-text">{stat.suffix}</span>}
        </div>
        <div className="relative mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-3">
          {stat.label}
        </div>
      </div>
    </Reveal>;
}
function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return <section ref={ref} className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto grid w-[min(1120px,100%)] grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => <StatItem key={s.label} stat={s} run={inView} index={i} />)}
      </div>
    </section>;
}
export {
  Stats as default
};
