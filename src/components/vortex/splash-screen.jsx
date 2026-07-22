import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, MousePointerClick } from "lucide-react";
import { VortexLogo } from "./vortex-logo";
import AmbientBackground from "./ambient-background";
function SplashScreen({ onReveal }) {
  const revealedRef = useRef(false);
  const [hintPulse, setHintPulse] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const logoX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const logoY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    onReveal();
  }, [onReveal]);
  useEffect(() => {
    const startY = { current: null };
    const onWheel = (e) => {
      if (e.deltaY > 12) reveal();
    };
    const onTouchStart = (e) => {
      startY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? null;
      if (startY.current != null && y != null) {
        const dy = startY.current - y;
        if (dy > 45) reveal();
      }
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        reveal();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [reveal]);
  useEffect(() => {
    const t = setInterval(() => setHintPulse((p) => p + 1), 2600);
    return () => clearInterval(t);
  }, []);
  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return <motion.div
    className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-[var(--vortex-black)]"
    onMouseMove={handleMouseMove}
    initial={{ y: 0 }}
    exit={{ y: "-100%", transition: { duration: 1.15, ease: [0.76, 0, 0.24, 1] } }}
  >
      {
    /* rich layered ambient background */
  }
      <AmbientBackground intensity={1} grid particles />

      {
    /* top-left wordmark */
  }
      <motion.div
    className="absolute left-5 top-5 sm:left-10 sm:top-8"
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
        <span className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-ink">
          <VortexLogo size={22} animated />
          Vor<span className="text-violet">tex</span>
        </span>
      </motion.div>

      {
    /* top-right version pill */
  }
      <motion.div
    className="absolute right-5 top-6 font-mono text-[11px] text-ink-3 sm:right-10 sm:top-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.6 }}
  >
        v1.2.2 · 2026
      </motion.div>

      {
    /* center content */
  }
      <div className="relative z-10 flex max-w-[92vw] flex-col items-center px-4 text-center">
        {
    /* logo with orbiting rings (responsive sizes) */
  }
        <motion.div
    style={{ x: logoX, y: logoY }}
    initial={{ scale: 0.6, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="relative mb-7 grid place-items-center sm:mb-8"
  >
          <motion.span
    className="pointer-events-none absolute h-[115px] w-[115px] rounded-full border border-violet/25 sm:h-[140px] sm:w-[140px]"
    initial={{ rotate: 0, opacity: 0 }}
    animate={{ rotate: 360, opacity: 1 }}
    transition={{ rotate: { duration: 14, repeat: Infinity, ease: "linear" }, opacity: { duration: 1 } }}
  >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--vortex-violet-bright)] shadow-[0_0_12px_oklch(0.7_0.22_300_/_0.9)]" />
          </motion.span>
          <motion.span
    className="pointer-events-none absolute h-[145px] w-[145px] rounded-full border border-blue/15 sm:h-[178px] sm:w-[178px]"
    initial={{ rotate: 0, opacity: 0 }}
    animate={{ rotate: -360, opacity: 1 }}
    transition={{ rotate: { duration: 22, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 0.2 } }}
  >
            <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--vortex-blue)] shadow-[0_0_10px_oklch(0.65_0.17_256_/_0.9)]" />
          </motion.span>
          <VortexLogo size={72} animated />
        </motion.div>

        <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="mb-5 flex items-center gap-2 rounded-full border border-glass bg-glass px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2 backdrop-blur-md sm:text-[11px]"
  >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--vortex-green)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--vortex-green)]" />
          </span>
          Free · No ads · No watermark
        </motion.div>

        <motion.h1
    className="font-display text-[clamp(2.4rem,9vw,5.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink"
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
          Paste a link.
          <br />
          <span className="gradient-vortex-text">Keep the video.</span>
        </motion.h1>

        <motion.p
    className="mt-5 max-w-[44ch] font-display text-[clamp(0.95rem,1.6vw,1.12rem)] text-ink-2 sm:mt-6"
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.45, duration: 0.8 }}
  >
          A free Android app that pulls video &amp; audio from 10+ platforms —
          straight into your Downloads folder. No ads, no accounts, no watermarks.
        </motion.p>

        {
    /* prominent enter CTA */
  }
        <motion.button
    type="button"
    onClick={reveal}
    className="group relative mt-10 flex flex-col items-center gap-4 outline-none sm:mt-12"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9, duration: 0.6 }}
    aria-label="Enter the site"
  >
          <span className="relative flex items-center gap-2.5 overflow-hidden rounded-2xl gradient-violet px-7 py-3.5 font-display text-[15px] font-bold text-ink glow-violet transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0 sm:gap-3 sm:px-8 sm:py-4 sm:text-[16px]">
            <span
    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
    aria-hidden="true"
  />
            <MousePointerClick className="h-5 w-5" />
            Enter Vortex
            <span className="hidden font-mono text-[11px] font-normal text-white/75 sm:inline">
              scroll · swipe · tap
            </span>
          </span>
          <motion.span
    key={hintPulse}
    initial={{ y: 0, opacity: 0.4 }}
    animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
    className="flex flex-col items-center text-ink-3"
  >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.button>
      </div>

      {
    /* bottom platform ticker */
  }
      <motion.div
    className="absolute bottom-6 left-1/2 max-w-[90vw] -translate-x-1/2 truncate text-center font-mono text-[9px] uppercase tracking-[0.3em] text-ink-3 sm:bottom-7 sm:text-[10px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.1, duration: 0.6 }}
  >
        youtube · tiktok · instagram · x · reddit · spotify
      </motion.div>
    </motion.div>;
}
export {
  SplashScreen as default
};
