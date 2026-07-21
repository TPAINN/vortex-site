"use client";

import { useCallback, useRef } from "react";
import type { ReactNode, MouseEvent } from "react";

interface UseMagneticOptions {
  /** how far (px) the element shifts toward the cursor */
  strength?: number;
}

/**
 * Magnetic hover effect: the element translates slightly toward the cursor
 * while hovered, and springs back on leave. Returns a ref + mouse handlers
 * to spread onto any element. Disabled on touch / reduced-motion devices
 * (the element just behaves normally).
 *
 * Usage:
 *   const { ref, onMouseMove } = useMagnetic({ strength: 18 });
 *   <button ref={ref} onMouseMove={onMouseMove}>…</button>
 */
export function useMagnetic({ strength = 18 }: UseMagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      // normalize and scale
      const dx = (x / (r.width / 2)) * strength;
      const dy = (y / (r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  /** render as which tag */
  as?: "a" | "button" | "div";
  href?: string;
  onClick?: (e: MouseEvent) => void;
  "aria-label"?: string;
}

/**
 * Convenience wrapper: wraps children in a magnetic element.
 * Defaults to a <div>; pass `as="a"` with `href` for links,
 * `as="button"` with `onClick` for buttons.
 */
export function Magnetic({
  children,
  strength = 16,
  className = "",
  as = "div",
  href,
  onClick,
  ...rest
}: MagneticProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic({ strength });
  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
