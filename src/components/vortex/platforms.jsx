import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Reveal from "./reveal";
import {
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  XIcon,
  RedditIcon,
  SoundCloudIcon,
  SpotifyIcon,
  ThreadsIcon,
  TwitchIcon,
  FacebookIcon,
  VimeoIcon
} from "./brand-icons";
const PLATFORMS = [
  { name: "YouTube", icon: YouTubeIcon, color: "#ff0000", note: "1080p \xB7 MP3" },
  { name: "TikTok", icon: TikTokIcon, color: "#25f4ee", note: "no watermark" },
  { name: "Instagram", icon: InstagramIcon, color: "#e1306c", note: "reels \xB7 stories" },
  { name: "X", icon: XIcon, color: "#ffffff", note: "videos & gifs" },
  { name: "Reddit", icon: RedditIcon, color: "#ff4500", note: "hosted video" },
  { name: "SoundCloud", icon: SoundCloudIcon, color: "#ff5500", note: "MP3 320" },
  { name: "Spotify", icon: SpotifyIcon, color: "#1db954", note: "full tracks" },
  { name: "Threads", icon: ThreadsIcon, color: "#ffffff", note: "video posts" },
  { name: "Twitch", icon: TwitchIcon, color: "#9146ff", note: "clips" },
  { name: "Facebook", icon: FacebookIcon, color: "#1877f2", note: "reels & video" },
  { name: "Vimeo", icon: VimeoIcon, color: "#1ab7ea", note: "up to 4K" }
];
function Platforms() {
  return <section id="platforms" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto w-[min(1120px,100%)]">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-violet">
            03 — Platforms
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[20ch] font-display text-[clamp(2rem,4.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
              One app, <span className="gradient-vortex-text">every platform you use</span>
            </h2>
            <p className="max-w-[36ch] font-display text-[14.5px] text-ink-3">
              Native support for the big names — and a yt-dlp engine underneath
              that quietly handles hundreds more.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {PLATFORMS.map((p, i) => <Reveal key={p.name} delay={i % 4 * 0.06} y={20}>
              <div className="group relative flex h-full items-center gap-3.5 overflow-hidden rounded-2xl border border-glass bg-glass p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-white/[0.07]">
                {
    /* hover glow */
  }
                <div
    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
    style={{ background: `radial-gradient(circle, ${p.color}55, transparent 70%)` }}
  />
                <div
    className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-glass bg-black/30 transition-transform duration-300 group-hover:scale-110"
    style={{ boxShadow: `0 0 18px ${p.color}22` }}
  >
                  <p.icon className="h-5 w-5" style={{ color: p.color }} />
                </div>
                <div className="relative min-w-0">
                  <div className="truncate font-display text-[14.5px] font-semibold text-ink">
                    {p.name}
                  </div>
                  <div className="truncate font-mono text-[11px] text-ink-3">
                    {p.note}
                  </div>
                </div>
                {
    /* bottom accent line on hover */
  }
                <span
    className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
    style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
  />
              </div>
            </Reveal>)}

          {
    /* "and more!" special card — distinct gradient design */
  }
          <Reveal delay={11 % 4 * 0.06} y={20}>
            <div className="group relative flex h-full cursor-default items-center gap-3.5 overflow-hidden rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/15 via-blue/10 to-transparent p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/60">
              {
    /* animated gradient glow */
  }
              <motion.div
    className="pointer-events-none absolute inset-0 opacity-50"
    style={{ background: "radial-gradient(circle at 30% 50%, oklch(0.55 0.25 293 / 0.25), transparent 60%)" }}
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
              <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-violet">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="font-display text-[14.5px] font-bold text-ink">
                  and more!
                </div>
                <div className="truncate font-mono text-[11px] text-ink-3">
                  1000+ via yt-dlp
                </div>
              </div>
              <ArrowRight className="relative h-4 w-4 shrink-0 text-ink-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet" />
            </div>
          </Reveal>
        </div>

        {
    /* footnote */
  }
        <Reveal delay={0.1}>
          <p className="mt-8 text-center font-mono text-[11.5px] text-ink-3">
            Don't see your site? Vortex probably handles it anyway — the yt-dlp
            engine supports <span className="text-ink-2">1000+</span> domains.
          </p>
        </Reveal>
      </div>
    </section>;
}
export {
  Platforms as default
};
