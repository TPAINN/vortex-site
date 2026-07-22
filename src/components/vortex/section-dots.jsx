import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "how", label: "How" },
  { id: "app", label: "App" },
  { id: "proof", label: "Proof" },
  { id: "platforms", label: "Platforms" },
  { id: "faq", label: "FAQ" },
  { id: "download", label: "Get" }
];

function SectionDots({ active }) {
  const [current, setCurrent] = useState("top");

  useEffect(() => {
    if (!active) return;

    // Sections in document order. The active one is the LAST section whose top
    // has crossed the probe line (40% down the viewport). Because we walk them
    // in order and stop at the first one still below the line, the highlight can
    // only ever move to an ADJACENT section as you scroll — it never jumps out
    // of order, and it never skips one. Reading live getBoundingClientRect (once
    // per frame, throttled by rAF) means no stale offsets when fonts/layout
    // settle, and no per-scroll forced reflow.
    const items = SECTIONS
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((x) => x.el);

    let ticking = false;
    const update = () => {
      ticking = false;
      const probe = window.innerHeight * 0.4;
      let best = items[0]?.id ?? "top";
      for (const { id, el } of items) {
        if (el.getBoundingClientRect().top <= probe) best = id;
        else break;
      }
      setCurrent(best);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  if (!active) return null;

  return <motion.nav
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    aria-label="Section navigation"
  >
      {SECTIONS.map((s) => {
    const isCurrent = current === s.id;
    return <a
      key={s.id}
      href={`#${s.id}`}
      className="group relative flex items-center justify-end gap-2.5"
      aria-label={`Go to ${s.label}`}
      aria-current={isCurrent ? "true" : void 0}
    >
            <span
      className={`pointer-events-none font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${isCurrent ? "text-ink opacity-100" : "text-ink-3 opacity-0 group-hover:opacity-100"}`}
    >
              {s.label}
            </span>
            <span className="relative grid h-3 w-3 place-items-center">
              <span
      className={`block rounded-full transition-all duration-300 ${isCurrent ? "h-2.5 w-2.5 gradient-violet" : "h-1.5 w-1.5 bg-ink-3/60 group-hover:bg-ink-2"}`}
    />
              {isCurrent && <motion.span
      layoutId="section-dot-ring"
      className="absolute inset-[-4px] rounded-full border border-violet/50"
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    />}
            </span>
          </a>;
  })}
    </motion.nav>;
}
export {
  SectionDots as default
};
