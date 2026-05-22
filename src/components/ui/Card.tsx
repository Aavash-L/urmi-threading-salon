"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverable = false,
  glass = false,
}: CardProps) {
  const shouldReduce = useReducedMotion();

  const hoverProps =
    hoverable && !shouldReduce
      ? {
          whileHover: { y: -6, scale: 1.02 },
          transition: { type: "spring" as const, stiffness: 300, damping: 20 },
        }
      : {};

  return (
    <motion.div
      {...hoverProps}
      className={`rounded-2xl ${glass ? "glass" : "bg-white"} card-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
}
