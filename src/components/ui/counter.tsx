"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Counts up once, when it first scrolls into view. */
export function Counter({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion lands on the final value in the first frame rather than
    // skipping the animation path entirely.
    const span = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : duration;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = span === 0 ? 1 : Math.min((now - start) / span, 1);
      // ease-out-expo, so it lands softly instead of stopping dead
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular">
      {value}
      {suffix}
    </span>
  );
}
