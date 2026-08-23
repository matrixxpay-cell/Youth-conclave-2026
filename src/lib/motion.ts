import type { Transition } from "framer-motion";

/** The site's one easing curve: a long, soft ease-out. */
export const expo: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

/** Shared viewport config so every reveal on the site triggers at the same point. */
export const viewportOnce = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -10% 0px",
} as const;
