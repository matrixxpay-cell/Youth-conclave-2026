"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Underline-only field. The label sits above at label size so the input keeps
 * a large tap target and the value is always the loudest thing in the row.
 */
export function Field({
  label,
  hint,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div className={cn("group", className)}>
      <label htmlFor={id} className="label flex items-baseline justify-between opacity-50">
        <span>{label}</span>
        {hint ? <span className="opacity-60">{hint}</span> : null}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className={cn(
          "mt-3 w-full border-b bg-transparent pb-3 font-display text-2xl tracking-tight",
          "placeholder:text-current/25 focus:outline-none sm:text-3xl",
          "transition-colors duration-300",
          error
            ? "border-accent"
            : "border-current/20 hover:border-current/40 focus:border-current",
        )}
        {...props}
      />
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="label mt-2.5 text-accent"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
