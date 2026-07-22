import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });
  useEffect(() => {
    if (typeof window === "undefined" || matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target;
      setHovering(
        !!el.closest("a, button, input, textarea, [role='button'], [data-cursor='hover']")
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);
  return <div
    className="pointer-events-none fixed inset-0 z-[80] hidden transition-opacity duration-200 md:block"
    style={{ opacity: visible ? 1 : 0 }}
    aria-hidden="true"
  >
      <motion.div
    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--vortex-violet-bright)]"
    style={{ x, y, scale: down ? 0.6 : 1 }}
  />
      <motion.div
    className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/60"
    style={{ x: ringX, y: ringY, scale: hovering ? 1.6 : 1, opacity: hovering ? 1 : 0.5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  />
    </div>;
}
export {
  CustomCursor as default
};
