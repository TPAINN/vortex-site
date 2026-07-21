"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
 * Phase flow:
 *   preloading → splash → revealing → site
 *
 * The reveal is a coordinated two-part animation:
 *   1. The splash curtain slides UP (exits, translateY -100%)
 *   2. SIMULTANEOUSLY, the landing page RISES FROM BELOW
 *      (the site container animates from y: 8vh, opacity: 0 → y: 0, opacity: 1)
 *
 * This creates a premium "curtain lift + content rise" effect where the
 * site content ascends into the space being revealed by the retreating
 * splash — a beautiful parallax-like reveal.
 *
 *  - `preloading`: Preloader overlay on top (z-100). Site hidden below.
 *  - `splash`:     Splash curtain on top (z-90). Site still hidden below.
 *                  Listens for wheel/swipe/keyboard/click → onReveal.
 *  - `revealing`:  Splash exits (slides up, ~1.15s). Site rises from below
 *                  (~1.3s). Both animate simultaneously. Scroll locked.
 *  - `site`:       Everything settled. Scroll unlocked. Lenis activates.
 */
type Phase = "preloading" | "splash" | "revealing" | "site";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("preloading");

  useEffect(() => {
    const locked = phase !== "site";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const handleReveal = useCallback(() => setPhase("revealing"), []);
  const handleSplashExitComplete = useCallback(() => setPhase("site"), []);

  // The site is "active" (content should animate in) during revealing + site
  const siteActive = phase === "revealing" || phase === "site";
  // The site is hidden below the viewport during preloading + splash
  const siteHidden = phase === "preloading" || phase === "splash";

  return (
    <div className="relative min-h-screen bg-[var(--vortex-black)]">
      <AmbientBackdrop />
      <div className="noise-overlay" aria-hidden="true" />

      {/* The site rises from below during the reveal */}
      <motion.div
        className="relative z-[1]"
        aria-hidden={!siteActive}
        initial={{ opacity: 0, y: "15vh", scale: 0.97 }}
        animate={siteHidden ? { opacity: 0, y: "15vh", scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: siteHidden ? 0 : 0.15 }}
      >
        <SmoothScroll enabled={phase === "site"} />
        <ScrollProgress />
        <SectionDots active={phase === "site"} />
        <CustomCursor />
        <Nav active={siteActive} />
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
      <div
        className="absolute -left-[15%] top-[30%] h-[55vmin] w-[55vmin] rounded-full opacity-25 blur-[120px]"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.25 293 / 0.6), transparent 70%)",
          animation: "float-orb 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[15%] top-[60%] h-[50vmin] w-[50vmin] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.17 256 / 0.55), transparent 70%)",
          animation: "float-orb 32s ease-in-out infinite",
          animationDelay: "-8s",
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
