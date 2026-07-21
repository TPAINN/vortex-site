"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "./reveal";

const FAQS = [
  {
    q: "Is Vortex really free?",
    a: "Yes. No ads, no trackers, no account, no watermark. The app is built and signed by an independent developer in Greece and released as a direct APK install.",
  },
  {
    q: "Which platforms are supported?",
    a: "YouTube, TikTok, Instagram, X / Twitter, Reddit, SoundCloud, Spotify, Threads, Facebook, Twitch and Vimeo natively — plus hundreds more through the yt-dlp engine underneath. If a site serves video or audio, Vortex can usually grab it.",
  },
  {
    q: "Why an APK and not the Play Store?",
    a: "Google Play's policy restricts core downloader functionality. Sideloaded APKs let Vortex stay the app you actually want — no neutered features, no ads injected to comply with store rules.",
  },
  {
    q: "How do I install the APK?",
    a: "On Android 8.0+, tap the downloaded file and allow installs from your browser when prompted. The package is signed and verified. arm64 and arm32 builds are available.",
  },
  {
    q: "Can it download private or age-gated content?",
    a: "Yes. Sign in once through Vortex's built-in browser and the app reuses that session for age-gated and follower-only posts. Credentials stay on your device — nothing is sent anywhere.",
  },
  {
    q: "What about audio quality?",
    a: "MP3 at 320 kbps with embedded cover art, artist and title tags. M4A is available for lossless AAC. Spotify links resolve to full tracks automatically.",
  },
  {
    q: "Is it legal?",
    a: "Vortex is for content you have the right to keep: your own uploads, Creative Commons media, and personal offline use. Respect each platform's terms and creators' rights.",
  },
  {
    q: "Does it work offline / in the background?",
    a: "Downloads keep running when you leave the app. A live notification shows progress, speed and ETA with one-tap cancel. Everything you've saved lives in the in-app History with thumbnails.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto grid w-[min(1120px,100%)] gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-violet">
            05 — FAQ
          </p>
          <h2 className="max-w-[14ch] font-display text-[clamp(2rem,4.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            Questions, <span className="gradient-vortex-text">answered</span>
          </h2>
          <p className="mt-5 max-w-[34ch] font-display text-[15px] text-ink-2">
            Still curious? Drop a line in the waitlist and we'll get back before the
            next build ships.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-glass bg-glass px-5 backdrop-blur-md data-[state=open]:border-violet/40"
              >
                <AccordionTrigger className="py-5 text-left font-display text-[16px] font-semibold text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 font-display text-[14.5px] leading-relaxed text-ink-2">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
