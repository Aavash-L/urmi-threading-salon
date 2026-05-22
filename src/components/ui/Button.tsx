"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  external = false,
}: ButtonProps) {
  const shouldReduce = useReducedMotion();

  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-brand-gradient text-white shadow-md hover:shadow-lg hover:opacity-90",
    outline:
      "border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white",
    ghost: "text-charcoal hover:bg-lavender-50",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const motionProps = shouldReduce
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 400, damping: 17 },
      };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
