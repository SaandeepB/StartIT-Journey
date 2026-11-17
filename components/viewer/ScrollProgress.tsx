"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="no-print fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-electric-400 to-violet-400"
      style={{ scaleX }}
    />
  );
}
