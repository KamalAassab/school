"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 22, once = true }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

export function RevealGroup({ children, className, stagger = 0.08 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 18,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
} & Omit<React.ComponentProps<typeof motion.div>, "className" | "children" | "variants">) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <motion.div className={className} variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}
