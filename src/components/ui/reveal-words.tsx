"use client";

import { motion, type Variants } from "framer-motion";
import { expo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A masked line starts translated fully outside its own clip box, so an
 * IntersectionObserver attached to it would measure zero area and never fire.
 * The trigger therefore lives on the visible wrapper and the lines follow it
 * through variants.
 */
const container = (step: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

const line: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: expo },
};

const word: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { ...expo, duration: 0.7 } },
};

/**
 * Oversized headline where each line rises out of a mask, one after another.
 * Lines are passed pre-split so the composition never depends on where the
 * browser happens to wrap.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  step = 0.08,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={container(step, delay)}
    >
      {lines.map((text, index) => (
        <span key={`${text}-${index}`} className="block overflow-hidden pb-[0.06em]">
          <motion.span className={cn("block", lineClassName)} variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Word-level reveal for running editorial copy. */
export function RevealWords({
  text,
  className,
  delay = 0,
  step = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={container(step, delay)}
    >
      {words.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span className="inline-block" variants={word}>
            {value}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
