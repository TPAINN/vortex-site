import { motion, useScroll, useSpring } from "framer-motion";
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 1e-3
  });
  return <motion.div
    style={{ scaleX }}
    className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left gradient-violet"
    aria-hidden="true"
  />;
}
export {
  ScrollProgress as default
};
