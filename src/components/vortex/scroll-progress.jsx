import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress({ active = true }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 1e-3
  });
  if (!active) return null;
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    style={{ scaleX }}
    className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left gradient-violet"
    aria-hidden="true"
  />;
}
export {
  ScrollProgress as default
};
