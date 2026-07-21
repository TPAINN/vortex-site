"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { VortexWordmark } from "./vortex-logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#how", label: "How" },
  { href: "#app", label: "App" },
  { href: "#platforms", label: "Platforms" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
];

interface NavProps {
  /** Only animate in once the splash has fully exited. */
  active: boolean;
}

export default function Nav({ active }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={active ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-glass bg-[var(--vortex-black)]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-[var(--vortex-black)]/60 to-transparent"
      )}
    >
      <div className="mx-auto flex w-[min(1120px,100%-clamp(32px,6vw,80px))] items-center justify-between py-4">
        <a href="#top" aria-label="Vortex home" className="shrink-0">
          <VortexWordmark size={26} />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 font-display text-sm text-ink-2 transition-colors hover:bg-white/5 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#download"
            className="group hidden items-center gap-2 rounded-full border border-glass bg-glass px-4 py-2 font-mono text-[12px] text-ink backdrop-blur-md transition-all hover:border-violet/60 hover:bg-violet/10 sm:flex"
          >
            <ArrowDownToLine className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            Get the APK
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-glass bg-glass text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-glass bg-[var(--vortex-black)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex w-[min(1120px,100%-2rem)] flex-col gap-1 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-display text-base text-ink-2 hover:bg-white/5 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl gradient-violet px-3 py-3 text-center font-display font-semibold text-ink"
              >
                Get the APK
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
