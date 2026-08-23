"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = ["Your details", "Payment", "Done"];

export function StepProgress({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-3 sm:gap-5">
      {steps.map((step, index) => {
        const state = index === current ? "current" : index < current ? "done" : "todo";
        return (
          <li key={step} className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "label tabular transition-opacity duration-500",
                  state === "todo" ? "opacity-30" : "opacity-100",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "label hidden transition-opacity duration-500 sm:inline",
                  state === "current" ? "opacity-100" : "opacity-35",
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span className="relative block h-px w-8 bg-current/20 sm:w-14">
                <motion.span
                  className="absolute inset-y-0 left-0 block bg-accent"
                  initial={false}
                  animate={{ width: index < current ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
