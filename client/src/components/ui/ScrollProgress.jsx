import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  // scrollYProgress is a value from 0 to 1 representing how far down the page you've scrolled
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-2 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}