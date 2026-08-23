"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Pulls its child a few pixels toward the pointer. Pointer devices only. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 label transition-colors duration-300";

const variants = {
  solid: "bg-accent text-white",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
  outline: "border border-current/25 text-current hover:border-current/60",
} as const;

export function ActionLink({
  href,
  children,
  variant = "solid",
  className,
  cursorLabel,
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  cursorLabel?: string;
  magnetic?: boolean;
}) {
  const content = (
    <Link
      href={href}
      data-cursor={cursorLabel}
      className={cn(base, variants[variant], className)}
    >
      <ButtonInner>{children}</ButtonInner>
    </Link>
  );
  return magnetic ? <Magnetic strength={0.25}>{content}</Magnetic> : content;
}

export function ActionButton({
  children,
  variant = "solid",
  className,
  cursorLabel,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  cursorLabel?: string;
}) {
  return (
    <button
      data-cursor={cursorLabel}
      className={cn(
        base,
        variants[variant],
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <ButtonInner>{children}</ButtonInner>
    </button>
  );
}

/** Label slides up and out while a duplicate rises into its place. */
function ButtonInner({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 flex translate-y-full items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
