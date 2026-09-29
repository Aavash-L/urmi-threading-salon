"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface GradientBlobProps {
  color?: "pink" | "purple";
  className?: string;
  size?: number;
}

export default function GradientBlob({
  color = "pink",
  className = "",
  size = 600,
}: GradientBlobProps) {
  const shouldReduce = useReducedMotion();

  const colors = {
    pink: "rgba(255, 79, 162, 0.15)",
    purple: "rgba(168, 85, 247, 0.15)",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
      animate={
        shouldReduce
          ? {}
          : {
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6],
            }
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
