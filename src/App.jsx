import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  /**
   * How far the curtain has been pulled, 0 to 1, driven by the gesture itself.
   *
   * The reveal used to be a timed animation triggered by the first flick: one
   * scroll dismissed the splash, a 1.15s clip ran on its own clock, and the
   * document was forced back to 0 when the lock lifted. A firm scroll therefore
   * showed the page already moved and then snapped it to the hero — the jump.
   *
   * Now the gesture *is* the animation. The document stays locked at 0 for the
   * whole reveal, so there is never an offset to correct, and pulling back up
   * closes the curtain again.
   */
  const revealRaw = useMotionValue(0);
  const reveal = useSpring(revealRaw, { stiffness: 220, damping: 40, mass: 0.6 });

  // How much scrolling completes the reveal. Roughly one firm flick.
  const REVEAL_DISTANCE = 620;

  useEffect(() => {
    if (phase !== "splash") return;

    let acc = 0;
    let touchY = null;

    const advance = (delta) => {
      acc = Math.max(0, Math.min(REVEAL_DISTANCE, acc + delta));
      revealRaw.set(acc / REVEAL_DISTANCE);
      if (acc >= REVEAL_DISTANCE) setPhase("revealing");
    };

    // Not passive: a passive listener cannot preventDefault, and the document
    // would scroll underneath the splash while the curtain was still up.
    const onWheel = (e) => {
      e.preventDefault();
      advance(e.deltaY);
    };
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const y = e.touches[0]?.clientY ?? null;
      if (touchY != null && y != null) {
        advance((touchY - y) * 1.6);
        touchY = y;
      }
    };
    const onKey = (e) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        // Keyboard has no magnitude, so it commits in one press.
        advance(REVEAL_DISTANCE);
      }
    };
    const onClick = () => advance(REVEAL_DISTANCE);

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [phase, revealRaw]);

  // Once committed, carry the last of the curtain up on its own and hand over.
  useEffect(() => {
    if (phase !== "revealing") return;
    revealRaw.set(1);
    const t = setTimeout(() => setPhase("site"), 620);
    return () => clearTimeout(t);
  }, [phase, revealRaw]);

  // The site is uncovered from its bottom edge upward as the curtain rises.
  const siteClip = useTransform(reveal, (v) => `inset(${(1 - v) * 100}% 0% 0% 0%)`);
  const siteY = useTransform(reveal, [0, 1], ["14vh", "0vh"]);
  const siteOpacity = useTransform(reveal, [0, 0.25, 1], [0, 0.55, 1]);

  useEffect(() => {
    const root = document.documentElement;
    const locked = phase !== "site";

    // Lock the scroll on <html> as well as <body>: on most browsers the
    // scrolling element is <html>, so locking only <body> left the document
    // free to move behind the splash.
    root.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    root.style.overscrollBehavior = locked ? "none" : "";

    // No corrective scrollTo here on purpose. The document is held at 0 for the
    // entire reveal, so by the time the lock lifts there is no offset to undo —
    // and it was that correction the visitor saw as a jump back to the hero.
  }, [phase]);

  useEffect(() => () => {
    document.documentElement.style.overflow = "";
    document.documentElement.style.overscrollBehavior = "";
    document.body.style.overflow = "";
  }, []);

  const siteActive = phase === "revealing" || phase === "site";
  const siteHidden = phase === "preloading" || phase === "splash";

  return (
    // The motion IS the product here, so it runs regardless of the device's
    // system-wide reduce-motion / animation-scaling setting.
    <MotionConfig reducedMotion="never">
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
      {/* The page is uncovered from the bottom edge upwards: the clip's top inset
          travels 100% → 0 while the content rises to meet it. Once the reveal is
          done the clip is dropped entirely — a lingering clip-path would also
          turn any `position: fixed` descendant into an absolute one. */}
      <motion.div
        className="relative z-[1]"
        aria-hidden={phase === "preloading"}
        style={
          phase === "site"
            ? // Drop the clip and the transform once the reveal is done: either
              // one left on an ancestor turns every `position: fixed`
              // descendant into an absolute one.
              { clipPath: "none", opacity: 1 }
            : { clipPath: siteClip, y: siteY, opacity: siteOpacity }
        }
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

      <AnimatePresence>
        {(phase === "splash" || phase === "revealing") && (
          <SplashScreen key="splash" progress={reveal} />
        )}
      </AnimatePresence>

      <Toaster position="bottom-right" theme="dark" />
    </div>
    </MotionConfig>
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
