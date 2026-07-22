import { Github, Heart, Twitter } from "lucide-react";
import { VortexWordmark } from "./vortex-logo";
const COLS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "The app", href: "#app" },
      { label: "Platforms", href: "#platforms" },
      { label: "Download", href: "#download" }
    ]
  },
  {
    title: "Platforms",
    links: [
      { label: "YouTube", href: "#top" },
      { label: "TikTok", href: "#top" },
      { label: "Instagram", href: "#top" },
      { label: "Spotify & SoundCloud", href: "#top" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Install guide", href: "#download" },
      { label: "Privacy", href: "#top" },
      { label: "Contact", href: "#download" }
    ]
  }
];
function Footer() {
  return <footer className="border-t border-glass bg-[var(--vortex-black)]">
      <div className="mx-auto w-[min(1120px,100%-clamp(32px,6vw,80px))] py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <VortexWordmark size={26} />
            <p className="mt-4 max-w-[34ch] font-display text-[13.5px] leading-relaxed text-ink-3">
              Vortex is for saving content you have the right to keep: your own
              uploads, Creative Commons media, and personal offline use. Respect
              each platform's terms and creators' rights.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
    { icon: Twitter, label: "X" },
    { icon: Github, label: "GitHub" }
  ].map((s) => <a
    key={s.label}
    href="#top"
    aria-label={s.label}
    className="grid h-9 w-9 place-items-center rounded-full border border-glass bg-glass text-ink-2 transition-colors hover:border-violet/60 hover:text-ink"
  >
                  <s.icon className="h-4 w-4" />
                </a>)}
            </div>
          </div>

          {COLS.map((c) => <div key={c.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                {c.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => <li key={l.label}>
                    <a
    href={l.href}
    className="font-display text-[14px] text-ink-2 transition-colors hover:text-ink"
  >
                      {l.label}
                    </a>
                  </li>)}
              </ul>
            </div>)}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[12px] text-ink-3 sm:flex-row sm:items-center">
          <span>Built in Greece · v2.0.0 · 2026</span>
          <span className="flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 fill-[var(--vortex-violet-bright)] text-[var(--vortex-violet-bright)]" /> for offline media
          </span>
        </div>
      </div>
    </footer>;
}
export {
  Footer as default
};
