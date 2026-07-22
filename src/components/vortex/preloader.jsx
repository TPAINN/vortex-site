import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VortexLogo } from "./vortex-logo";
function Preloader({ onComplete, duration = 2e3 }) {
  const durSec = duration / 1e3;
  return <motion.div
    id="vortex-preloader"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--vortex-black)]"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
  >
      {
    /* single soft ambient glow behind the logo */
  }
      <motion.div
    className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
    style={{ background: "radial-gradient(circle, oklch(0.55 0.25 293 / 0.35), transparent 70%)" }}
    animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.92, 1.05, 0.92] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />

      <motion.div
    className="relative flex flex-col items-center"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
        {
    /* logo with gentle scale-in */
  }
        <motion.div
    initial={{ scale: 0.85, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
          <VortexLogo size={64} animated />
        </motion.div>

        {
    /* wordmark */
  }
        <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
    className="mt-5 font-display text-base font-semibold tracking-tight text-ink"
  >
          Vor<span className="text-violet">tex</span>
        </motion.div>

        {
    /* thin elegant progress bar with glowing tip */
  }
        <div className="relative mt-7 h-px w-[160px] overflow-visible bg-white/[0.08]">
          <div
    id="vortex-pre-bar"
    className="absolute inset-y-0 left-0 gradient-violet"
    style={{ width: "100%", transformOrigin: "left center" }}
  />
        </div>

        {
    /* minimal status line */
  }
        <ProgressReadout duration={duration} onComplete={onComplete} />
      </motion.div>
    </motion.div>;
}
const ProgressReadout = memo(function ProgressReadout2({
  duration,
  onComplete
}) {
  const pctRef = useRef(null);
  const doneRef = useRef(false);
  const durSec = duration / 1e3;
  const css = `
@keyframes vortexpre-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
#vortex-pre-bar {
  transform-origin: left center;
  animation: vortexpre-fill ${durSec}s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
`;
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (pctRef.current) {
        pctRef.current.textContent = `${Math.round(eased * 100)}%`;
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(onComplete, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete]);
  return <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
        <span ref={pctRef} className="tabular-nums text-ink-2">0%</span>
        <span className="mx-2 text-ink-3/40">/</span>
        <span>loading</span>
      </div>
    </>;
});
export {
  Preloader as default
};
