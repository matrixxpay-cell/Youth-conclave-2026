"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fixed `03 / 06` indicator plus a hairline progress bar. Reads whichever
 * `[data-section]` currently owns the middle of the viewport.
 */
export function SectionRail() {
  const [sections, setSections] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    // Read the section list after the first paint, so the measurement reflects
    // the laid-out page and no state is written during the effect itself.
    const frame = requestAnimationFrame(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section]"),
      );
      if (nodes.length === 0) return;
      setSections(nodes.map((node) => node.dataset.section ?? ""));

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          setCurrent(nodes.indexOf(visible.target as HTMLElement));
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5] },
      );
      nodes.forEach((node) => observer?.observe(node));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  if (sections.length === 0) return null;

  // The indicator retires on the last section, where it would otherwise sit on
  // top of the closing call to action.
  const atEnd = current >= sections.length - 1;

  return (
    <motion.div
      aria-hidden
      animate={{ opacity: atEnd ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed bottom-6 right-4 z-[100] hidden flex-col items-end gap-3 lg:flex"
    >
      <span className="label tabular opacity-45">
        {String(current + 1).padStart(2, "0")}
        <span className="opacity-40"> / {String(sections.length).padStart(2, "0")}</span>
      </span>
      <span className="label max-w-[9rem] truncate text-right opacity-30">
        {sections[current]}
      </span>
      <div className="h-24 w-px overflow-hidden bg-current/15">
        <motion.div
          className="h-full w-full origin-top bg-accent"
          style={{ scaleY: progress }}
        />
      </div>
    </motion.div>
  );
}
