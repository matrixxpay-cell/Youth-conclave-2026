"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A single cream panel wipes down over the viewport and lifts away as the new
 * route paints — ~550ms end to end. Skipped on first load so it never delays
 * the initial render, and skipped entirely under reduced-motion.
 */
export function PageTransition() {
  const pathname = usePathname();
  const [seen, setSeen] = useState(pathname);
  const [key, setKey] = useState<string | null>(null);

  // Adjusting state during render is the supported way to react to a changed
  // value without an extra commit — this only ever runs on a client navigation.
  if (seen !== pathname) {
    setSeen(pathname);
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setKey(reduced ? null : pathname);
  }

  useEffect(() => {
    if (!key) return;
    const timer = window.setTimeout(() => setKey(null), 700);
    return () => window.clearTimeout(timer);
  }, [key]);

  return (
    <AnimatePresence>
      {key ? (
        <motion.div
          key={key}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[180] bg-paper"
          initial={{ y: "0%" }}
          animate={{ y: "-102%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      ) : null}
    </AnimatePresence>
  );
}
