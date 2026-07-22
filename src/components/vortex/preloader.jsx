import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VortexLogo } from "./vortex-logo";

const BAR_W = 180; // px — bar track width, also the tip's travel distance

function Preloader({ onComplete, duration = 2e3 }) {
  return (
    <motion.div
      id="vortex-preloader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--vortex-black)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* soft ambient glow — a wide radial gradient is already soft, no
          filter:blur needed (huge GPU saving on weak devices) */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.25 293 / 0.30), transparent 62%)", willChange: "transform, opacity" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.94, 1.05, 0.94] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* logo with gentle scale-in */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <VortexLogo size={64} animated />
        </motion.div>

        {/* wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-5 font-display text-base font-semibold tracking-tight text-ink"
        >
          Vor<span className="text-violet">tex</span>
        </motion.div>

        {/* progress bar + readout — both driven by the SAME rAF loop below,
            so the fill, the glowing tip and the percentage always agree */}
        <ProgressCore duration={duration} onComplete={onComplete} />
      </motion.div>
    </motion.div>
  );
}

const ProgressCore = memo(function ProgressCore({ duration, onComplete }) {
  const pctRef = useRef(null);
  const barRef = useRef(null);
  const tipRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (pctRef.current) pctRef.current.textContent = `${Math.round(eased * 100)}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (tipRef.current) tipRef.current.style.transform = `translate(${eased * BAR_W}px, -50%)`;
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

  return (
    <>
      <div className="relative mt-7 h-[3px] rounded-full bg-white/10" style={{ width: BAR_W }}>
        {/* fill */}
        <div
          ref={barRef}
          className="gradient-vortex absolute inset-0 rounded-full"
          style={{
            transform: "scaleX(0)",
            transformOrigin: "left center",
            boxShadow: "0 0 14px oklch(0.55 0.25 293 / 0.55)",
            willChange: "transform",
          }}
        />
        {/* glowing tip that rides the end of the fill */}
        <div
          ref={tipRef}
          className="absolute left-0 top-1/2 h-[7px] w-[7px] rounded-full bg-[var(--vortex-violet-bright)]"
          style={{
            transform: "translate(0px, -50%)",
            boxShadow: "0 0 12px 2px oklch(0.7 0.22 300 / 0.9)",
            willChange: "transform",
          }}
        />
      </div>

      <div className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
        <span ref={pctRef} className="tabular-nums text-ink-2">0%</span>
        <span className="mx-2 text-ink-3/40">/</span>
        <span>loading</span>
      </div>
    </>
  );
});

export { Preloader as default };
