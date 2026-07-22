import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownToLine, ShieldCheck, Zap } from "lucide-react";
import { VortexLogo } from "./vortex-logo";
import { Magnetic } from "./use-magnetic";
const PLATFORMS = [
  "YouTube",
  "TikTok",
  "Instagram",
  "X / Twitter",
  "Reddit",
  "SoundCloud",
  "Spotify",
  "Threads",
  "Facebook",
  "Twitch",
  "Vimeo"
];
function Hero({ active }) {
  // Fade + drift driven by GLOBAL scrollY (not a target measurement, which the
  // reveal transform would distort). The bands are deliberately wide in px so
  // the sub-pixel settle from smooth-scroll can't flip opacity back on — that
  // rebound is what made the headline "reappear". The single site-wide ambient
  // backdrop (in App) shows through the transparent hero, so there's no second
  // heavy background painting here every frame.
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], [0, 64]);
  const contentOpacity = useTransform(scrollY, [0, 460], [1, 0]);
  const ease = [0.22, 1, 0.36, 1];
  return <header
    id="top"
    className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 text-center sm:pb-20 sm:pt-32"
  >
      {
    /*
      Hero content stays INVISIBLE (opacity 0) while the splash is covering
      the viewport. It only animates in once `active` flips to true — which
      happens AFTER the splash has fully exited. This eliminates the
      overlap/duplicate-headline glitch during the curtain lift.
    */
  }
      <motion.div
    style={{ y: contentY, opacity: contentOpacity }}
    className="relative z-10 flex w-[min(900px,100%)] flex-col items-center gap-6 sm:gap-7"
  >
        <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
    transition={{ delay: 0.15, duration: 0.7, ease }}
    className="flex items-center gap-2 rounded-full border border-glass bg-white/[0.06] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2 sm:px-4 sm:text-[11px]"
  >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--vortex-green)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--vortex-green)]" />
          </span>
          New build · v2.0.0
        </motion.div>

        <motion.h1
    initial={{ opacity: 0, y: 24 }}
    animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
    transition={{ delay: 0.3, duration: 0.9, ease }}
    className="font-display text-[clamp(2.4rem,8.5vw,5.8rem)] font-extrabold leading-[1.03] tracking-[-0.04em] text-ink"
    style={{ fontVariationSettings: '"opsz" 96' }}
  >
          Paste a link.{" "}
          <span className="gradient-vortex-text">Keep the video.</span>
        </motion.h1>

        <motion.p
    initial={{ opacity: 0, y: 18 }}
    animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
    transition={{ delay: 0.5, duration: 0.8, ease }}
    className="max-w-[52ch] font-display text-[clamp(1rem,1.6vw,1.18rem)] text-ink-2"
  >
          Vortex is a free Android app that pulls video and audio from YouTube,
          TikTok, Instagram, X, Reddit, SoundCloud, Spotify and Threads straight
          into your Downloads folder.{" "}
          <span className="text-ink">No ads, no accounts, no watermarks.</span>
        </motion.p>

        <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
    transition={{ delay: 0.65, duration: 0.7, ease }}
    className="flex flex-wrap items-center justify-center gap-3"
  >
          <Magnetic
    as="a"
    href="#download"
    strength={16}
    aria-label="Download the Vortex APK"
    className="btn-apk group inline-flex items-center gap-3 rounded-2xl gradient-violet px-6 py-3.5 font-display text-base font-bold text-ink glow-violet hover:glow-violet-lg sm:px-7 sm:py-4 sm:text-[17px]"
  >
            <ArrowDownToLine className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            Download APK
            <span className="hidden font-mono text-[11px] font-normal text-white/75 sm:inline">
              v2.0.0 · free
            </span>
          </Magnetic>
          <Magnetic
    as="a"
    href="#how"
    strength={10}
    aria-label="See how Vortex works"
    className="inline-flex items-center gap-2 rounded-2xl border border-glass bg-white/[0.06] px-5 py-3.5 font-display text-[15px] font-medium text-ink-2 transition-colors hover:border-violet/50 hover:text-ink sm:px-6 sm:py-4"
  >
            See how it works
          </Magnetic>
        </motion.div>

        <motion.div
    initial={{ opacity: 0 }}
    animate={active ? { opacity: 1 } : { opacity: 0 }}
    transition={{ delay: 0.9, duration: 0.7 }}
    className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] text-ink-3 sm:gap-x-6 sm:text-[11.5px]"
  >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--vortex-green)]" /> No trackers
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-violet" /> MP4 1080p · MP3 320kbps
          </span>
          <span className="flex items-center gap-1.5">
            <VortexLogo size={14} /> Android 8.0+
          </span>
        </motion.div>
      </motion.div>

      {
    /* marquee — also waits for active to avoid showing during splash lift */
  }
      <motion.div
    initial={{ opacity: 0 }}
    animate={active ? { opacity: 1 } : { opacity: 0 }}
    transition={{ delay: 1, duration: 0.6 }}
    className="marquee-mask relative mt-12 w-full overflow-hidden sm:mt-14"
  >
        <div
    className="flex w-max gap-8 py-1.5 font-mono text-sm text-ink-3 sm:gap-11"
    style={{ animation: "marquee-slide 30s linear infinite" }}
  >
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => <span key={i} className="flex items-center gap-8 whitespace-nowrap sm:gap-11">
              <b className="font-medium text-ink-2">{p}</b>
              <span className="text-ink-3/60">·</span>
            </span>)}
        </div>
      </motion.div>
    </header>;
}
export {
  Hero as default
};
