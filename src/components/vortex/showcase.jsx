import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Download, Music2 } from "lucide-react";
import { VortexLogo } from "./vortex-logo";
import Reveal from "./reveal";
const SPECS = [
  { k: "platforms", v: <><b>10+ sites</b> handled natively, hundreds more through the yt-dlp engine underneath.</> },
  { k: "audio", v: <><b>MP3 at 320 kbps</b> with embedded cover art, artist and title tags. Spotify links resolve to full tracks automatically.</> },
  { k: "video", v: <>Best-available quality with audio merged in, or capped at <b>1080p / 720p</b> when you want smaller files.</> },
  { k: "background", v: <>Downloads keep running when you leave: a live notification shows <b>progress, speed and ETA</b>, with one-tap cancel.</> },
  { k: "private posts", v: <>Sign in once through the built-in browser and Vortex reuses the session for <b>age-gated and follower-only</b> content.</> },
  { k: "history", v: <>Everything you've saved, with thumbnails, one tap from replaying or deleting.</> },
  { k: "cost", v: <><b>Free.</b> No ads, no trackers, no account, no watermark on anything.</> }
];
function PhoneMock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 40, rotateX: 8 }}
    animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="relative"
    style={{ perspective: 1200 }}
  >
      {
    /* glow */
  }
      <div
    className="absolute inset-0 -z-10 rounded-[50px] opacity-60 blur-3xl"
    style={{ background: "radial-gradient(circle at 50% 40%, oklch(0.55 0.25 293 / 0.45), transparent 70%)" }}
  />
      <div
    className="relative flex aspect-[9/19] w-[min(300px,86vw)] flex-col gap-3 overflow-hidden rounded-[44px] border border-white/22 bg-black p-5"
    style={{
      boxShadow: "0 0 0 9px oklch(0.13 0.01 290), 0 0 0 10px oklch(1 0 0 / 0.08), 0 36px 90px oklch(0.55 0.25 293 / 0.28)"
    }}
    role="img"
    aria-label="The Vortex app UI showing a download in progress"
  >
        {
    /* notch */
  }
        <div className="absolute left-1/2 top-3 h-[7px] w-[84px] -translate-x-1/2 rounded-full bg-[oklch(0.2_0_0)]" />

        <div className="mt-6 flex items-center justify-between">
          <span className="font-display text-[21px] font-extrabold tracking-tight text-ink">
            Vor<span className="text-violet">tex</span>
          </span>
          <VortexLogo size={20} animated />
        </div>

        {
    /* url chip */
  }
        <div className="flex items-center gap-2.5 overflow-hidden rounded-2xl border border-glass bg-glass px-3.5 py-2.5 font-mono text-[11.5px] text-ink-2 whitespace-nowrap">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--vortex-green)]" />
          youtube.com/watch?v=dQw4w9…
        </div>

        {
    /* media card */
  }
        <div className="rounded-2xl border border-glass bg-glass p-3.5">
          <div className="mb-1 font-display text-[13.5px] font-semibold text-ink">
            Never Gonna Give You Up
          </div>
          <div className="mb-2.5 font-mono text-[11px] text-ink-3">Rick Astley · 3:32</div>
          {
    /* audio waveform */
  }
          <Waveform active={inView} />
        </div>

        {
    /* format chips */
  }
        <div className="flex flex-wrap gap-1.5">
          {["Best", "1080p", "720p"].map((c) => <span key={c} className="rounded-full border border-glass px-2.5 py-1.5 font-mono text-[10.5px] text-ink-3">
              {c}
            </span>)}
          <span className="flex items-center gap-1 rounded-full gradient-violet px-2.5 py-1.5 font-mono text-[10.5px] font-medium text-ink">
            <Music2 className="h-3 w-3" /> MP3
          </span>
          <span className="rounded-full border border-glass px-2.5 py-1.5 font-mono text-[10.5px] text-ink-3">M4A</span>
        </div>

        {
    /* progress */
  }
        <div className="rounded-2xl border border-glass bg-glass p-3.5">
          <div className="flex items-center justify-between font-mono text-[11px] text-ink-3">
            <span className="flex items-center gap-1.5">
              <Download className="h-3 w-3" /> Downloading…
            </span>
            <span>67%</span>
          </div>
          <div className="mt-2.5 h-[7px] overflow-hidden rounded-full bg-white/10">
            <motion.div
    className="h-full rounded-full gradient-violet"
    initial={{ width: "30%" }}
    animate={inView ? { width: ["34%", "88%", "60%"] } : {}}
    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
  />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10.5px]">
            <b className="font-medium text-[var(--vortex-green)]">8.4 MB/s</b>
            <span className="text-ink-3">ETA 4s</span>
          </div>
        </div>

        {
    /* done row */
  }
        <div className="mt-auto flex items-center gap-2 rounded-2xl border border-glass bg-black/30 px-3 py-2.5 font-mono text-[10.5px] text-ink-3">
          <Check className="h-3.5 w-3.5 text-[var(--vortex-green)]" />
          247 files saved · 1.2 GB
        </div>
      </div>
    </motion.div>;
}
function Showcase() {
  return <section id="app" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto grid w-[min(1120px,100%)] items-center gap-14 lg:grid-cols-[minmax(280px,380px)_1fr]">
        <div className="flex justify-center lg:justify-start">
          <PhoneMock />
        </div>

        <div>
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-violet">
              02 — The app
            </p>
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
              The same screen, <span className="gradient-vortex-text">nothing in the way</span>
            </h2>
          </Reveal>

          <dl className="mt-10 flex flex-col gap-0">
            {SPECS.map((s, i) => <Reveal key={s.k} delay={i * 0.06} y={18}>
                <div className="grid grid-cols-1 gap-1 border-t border-white/10 py-4 sm:grid-cols-[minmax(120px,168px)_1fr] sm:gap-5">
                  <dt className="font-mono text-[12px] text-violet">{s.k}</dt>
                  <dd className="font-display text-[15px] text-ink-2 [&_b]:font-semibold [&_b]:text-ink">
                    {s.v}
                  </dd>
                </div>
              </Reveal>)}
            <div className="border-b border-white/10" />
          </dl>
        </div>
      </div>
    </section>;
}
function Waveform({ active }) {
  const BARS = 28;
  return <div className="flex h-7 items-end gap-[2px]" aria-hidden="true">
      {Array.from({ length: BARS }).map((_, i) => {
    const base = 30 + (Math.sin(i * 1.7) * 0.5 + 0.5) * 60;
    return <motion.span
      key={i}
      className="flex-1 rounded-full"
      style={{
        background: i < BARS * 0.55 ? "linear-gradient(180deg, var(--vortex-violet-bright), var(--vortex-blue))" : "oklch(1 0 0 / 0.12)",
        minHeight: 3
      }}
      animate={active ? { height: [`${base * 0.35}%`, `${base}%`, `${base * 0.45}%`] } : { height: `${base * 0.4}%` }}
      transition={{
        duration: 1.1 + i % 5 * 0.12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i % 7 * 0.08
      }}
    />;
  })}
    </div>;
}
export {
  Showcase as default
};
