import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "how", label: "How" },
  { id: "app", label: "App" },
  { id: "platforms", label: "Platforms" },
  { id: "proof", label: "Proof" },
  { id: "faq", label: "FAQ" },
  { id: "download", label: "Get" }
];

function SectionDots({ active }) {
  const [current, setCurrent] = useState("top");

  useEffect(() => {
    if (!active) return;

    // Cache each section's offset ONCE (and on resize). The old code read
    // offsetTop/offsetHeight for every section on every scroll tick, forcing a
    // synchronous layout each time — a real source of scroll jank up top.
    const items = SECTIONS
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((x) => x.el);
    let offsets = [];
    const measure = () => {
      offsets = items.map(({ id, el }) => ({ id, center: el.offsetTop + el.offsetHeight / 2 }));
    };
    measure();

    let ticking = false;
    const update = () => {
      ticking = false;
      const probe = window.scrollY + window.innerHeight * 0.42;
      let best = offsets[0]?.id ?? "top";
      let bestDist = Infinity;
      for (const o of offsets) {
        const d = Math.abs(probe - o.center);
        if (d < bestDist) {
          bestDist = d;
          best = o.id;
        }
      }
      setCurrent(best);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
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
