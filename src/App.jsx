import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";

import Preloader from "@/components/vortex/preloader";
import SplashScreen from "@/components/vortex/splash-screen";
import SmoothScroll from "@/components/vortex/smooth-scroll";
import ScrollProgress from "@/components/vortex/scroll-progress";
import SectionDots from "@/components/vortex/section-dots";
import CustomCursor from "@/components/vortex/custom-cursor";
import Nav from "@/components/vortex/nav";
import Hero from "@/components/vortex/hero";
import Steps from "@/components/vortex/steps";
import Showcase from "@/components/vortex/showcase";
import Stats from "@/components/vortex/stats";
import Platforms from "@/components/vortex/platforms";
import Faq from "@/components/vortex/faq";
import Download from "@/components/vortex/download";
import Footer from "@/components/vortex/footer";

/**
 * Phase flow: preloading → splash → revealing → site.
 * The splash curtain slides up while the site rises from below — a
 * "curtain lift + content rise" reveal.
 */
export default function App() {
  const [phase, setPhase] = useState("preloading");

  useEffect(() => {
    const locked = phase !== "site";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const handleReveal = useCallback(() => setPhase("revealing"), []);
  const handleSplashExitComplete = useCallback(() => setPhase("site"), []);

  const siteActive = phase === "revealing" || phase === "site";
  const siteHidden = phase === "preloading" || phase === "splash";

  return (
    <div className="relative min-h-screen bg-[var(--vortex-black)]">
      <AmbientBackdrop />
      <div className="noise-overlay" aria-hidden="true" />

      {/*
        Fixed chrome lives OUTSIDE the reveal wrapper on purpose: a lingering
        transform on an ancestor turns `position: fixed` into `absolute`, so
        keeping these siblings means the nav / dots / progress bar stay pinned
        to the viewport and the browser can composite them independently.
      */}
      <SmoothScroll enabled={phase === "site"} />
      <ScrollProgress active={phase === "site"} />
      <SectionDots active={phase === "site"} />
      <CustomCursor />
      <Nav active={siteActive} />

      {/* The document that "rises" during the reveal — transform + opacity only,
          both composite-friendly (no scale: scaling a full-page layer is what
          made the lift stutter). */}
      <motion.div
        className="relative z-[1]"
        aria-hidden={!siteActive}
        initial={{ opacity: 0, y: "12vh" }}
        animate={siteHidden ? { opacity: 0, y: "12vh" } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: siteHidden ? 0 : 0.1 }}
      >
        <main>
          <Hero active={siteActive} />
          <Steps />
          <Showcase />
          <Stats />
          <Platforms />
          <Faq />
          <Download />
        </main>
        <Footer />
      </motion.div>

      <AnimatePresence>
        {phase === "preloading" && (
          <Preloader key="preloader" onComplete={() => setPhase("splash")} />
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={handleSplashExitComplete}>
        {phase === "splash" && (
          <SplashScreen key="splash" onReveal={handleReveal} />
        )}
      </AnimatePresence>

      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 70% at 50% -5%, oklch(0.13 0.045 292 / 0.85), transparent 55%), linear-gradient(180deg, oklch(0.06 0.012 290) 0%, var(--vortex-black) 50%)",
        }}
      />
      {/* Orbs are pure soft radial-gradients — no filter:blur. A gradient is
          already smooth, and dropping the 120px Gaussian blurs saves a huge
          amount of GPU time every frame (they float continuously). */}
      <div
        className="absolute -left-[15%] top-[30%] h-[55vmin] w-[55vmin] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.25 293 / 0.55) 0%, oklch(0.55 0.25 293 / 0.18) 38%, transparent 68%)",
          animation: "float-orb 26s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute -right-[15%] top-[60%] h-[50vmin] w-[50vmin] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.17 256 / 0.5) 0%, oklch(0.65 0.17 256 / 0.16) 38%, transparent 68%)",
          animation: "float-orb 32s ease-in-out infinite",
          animationDelay: "-8s",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(1 0 0 / 0.45) 1px, transparent 1px)",
          backgroundSize: "clamp(26px, 3.4vw, 44px) clamp(26px, 3.4vw, 44px)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 0%, transparent 80%)",
        }}
      />
    </div>
  );
}
