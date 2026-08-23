"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { expo, viewportOnce } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...expo, delay }}
    >
      {children}
    </Tag>
  );
}
