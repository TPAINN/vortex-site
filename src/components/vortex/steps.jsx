import { ClipboardPaste, SlidersHorizontal, FolderDown } from "lucide-react";
import Reveal from "./reveal";
const STEPS = [
  {
    icon: ClipboardPaste,
    title: "Paste or share the link",
    body: "Copy any video URL, or hit Share \u2192 Vortex straight from the platform's own app. Vortex reads the title, thumbnail and length before you commit.",
    code: "Share \u2192 Vortex"
  },
  {
    icon: SlidersHorizontal,
    title: "Pick your format",
    body: "Video as MP4 up to 1080p, or audio only as MP3 320 kbps / M4A \u2014 with cover art and track metadata baked in automatically.",
    code: "MP4 \xB7 MP3 \xB7 M4A"
  },
  {
    icon: FolderDown,
    title: "It lands in Downloads",
    body: "A live notification tracks speed and ETA while you do something else. The file appears in Downloads/Vortex, ready for any player or gallery.",
    code: "Downloads/Vortex"
  }
];
function Steps() {
  return <section id="how" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto w-[min(1120px,100%)]">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-violet">
            01 — How it works
          </p>
          <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            Three taps, <span className="gradient-vortex-text">start to saved</span>
          </h2>
        </Reveal>

        <ol className="mt-12 grid list-none gap-5 sm:grid-cols-3" style={{ margin: 0, padding: 0 }}>
          {STEPS.map((s, i) => <Reveal key={s.title} delay={i * 0.12}>
              <li className="group relative h-full overflow-hidden rounded-3xl border border-glass bg-glass p-6 backdrop-blur-md transition-all duration-300 hover:border-violet/40 hover:bg-white/[0.07] sm:p-7">
                <div
    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
    style={{ background: "radial-gradient(circle, oklch(0.55 0.25 293 / 0.5), transparent 70%)" }}
  />
                <div className="relative flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-violet text-ink">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-[3.5rem] font-extrabold leading-none text-white/[0.07] transition-colors group-hover:text-white/[0.13]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 font-display text-[14.5px] leading-relaxed text-ink-2">
                  {s.body}
                </p>
                <code className="mt-4 inline-block rounded-md border border-glass bg-black/30 px-2.5 py-1 font-mono text-[11.5px] text-ink-2">
                  {s.code}
                </code>
              </li>
            </Reveal>)}
        </ol>
      </div>
    </section>;
}
export {
  Steps as default
};
