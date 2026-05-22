"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduce) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration, shouldReduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
