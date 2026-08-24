"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/config/site";
import { LogoLockup } from "@/components/logo";
import { ActionLink } from "@/components/ui/magnetic";
import { StatusDot } from "@/components/ui/section-label";
import { expo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layered parallax — the type drifts up faster than the metadata around it.
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const metaY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-4 pb-6 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:pt-24"
    >
      <AmbientField />

      {/* Top metadata row */}
      <motion.div
        style={{ y: metaY, opacity: fade }}
        className="relative z-10 flex items-start justify-between gap-4"
      >
        <FloatIn delay={0.1}>
          <LogoLockup />
        </FloatIn>
        <FloatIn delay={0.16} className="text-right">
          <p className="label leading-relaxed opacity-55">
            {site.city} • {site.state}
            {/* On a 360px screen the dates move down beside the status instead. */}
            <span className="hidden sm:inline">
              <br />
              <span className="tabular">{site.dates}</span>
              <br />
              <span className="tabular opacity-60">{site.coords}</span>
            </span>
          </p>
        </FloatIn>
      </motion.div>

      {/* The type */}
      <motion.div style={{ y: typeY, opacity: fade }} className="relative z-10 py-8 lg:py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[70vw] max-w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,238,229,0.045) 0%, rgba(242,238,229,0.02) 55%, transparent 72%)",
          }}
        />

        {/*
          Two compositions, one heading. Below lg the three lines stack and the
          wordmark runs edge to edge; from lg the year moves up beside YOUTH and
          CONCLAVE is scaled past the right edge of the viewport.
        */}
        <h1 className="display type-hero">
          <Line delay={0.18}>
            <span className="flex items-baseline justify-between gap-6 lg:text-[min(13vw,15vh)]">
              <span>Youth</span>
              <span className="hidden text-[0.62em] lg:inline-block">
                <Year />
              </span>
            </span>
          </Line>
          <Line delay={0.26}>
            <span className="-ml-[0.035em] block whitespace-nowrap lg:text-[23vw]">
              Conclave
            </span>
          </Line>
          <Line delay={0.34} className="lg:hidden">
            <span className="block">
              <Year />
            </span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...expo, delay: 0.55 }}
          className="label mt-6 max-w-xs opacity-70 sm:ml-[2vw] sm:mt-8"
        >
          {site.tagline}
          <span className="text-accent">…</span>
        </motion.p>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <FloatIn delay={0.62} className="order-2 sm:order-1">
          <div className="flex flex-col gap-3">
            {site.registrationsOpen ? (
              <StatusDot label="Registrations open" />
            ) : (
              <span className="label opacity-55">Coming soon</span>
            )}
            <Clock />
            <span className="label tabular opacity-40 sm:hidden">{site.dates}</span>
          </div>
        </FloatIn>

        <div className="order-1 flex items-end gap-10 sm:order-2">
          <FloatIn delay={0.7} className="hidden lg:block">
            <p className="label max-w-[14rem] leading-relaxed opacity-45">
              Five events. Three days. One campus in {site.region}.
            </p>
          </FloatIn>
          <FloatIn delay={0.5}>
            <ActionLink href="/register" variant="paper" cursorLabel="Register →">
              Register now
              <Arrow />
            </ActionLink>
          </FloatIn>
        </div>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

function Year() {
  return (
    <span
      className="tabular text-transparent"
      style={{ WebkitTextStroke: "0.035em rgba(242,238,229,0.7)" }}
    >
      2026
    </span>
  );
}

function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden pb-[0.04em]", className)}>
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatIn({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...expo, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className ?? "size-3.5"}>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Live IST clock — one of the small "this page is awake" details. */
function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="label tabular opacity-40">
      {time ?? "--:--:--"} IST
    </span>
  );
}

/**
 * Two slow gradient blooms plus a pointer-tracked highlight. All transform and
 * opacity, nothing repainting, and the pointer layer never mounts on touch.
 */
function AmbientField() {
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 22, mass: 1.2 });
  const sy = useSpring(y, { stiffness: 60, damping: 22, mass: 1.2 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - window.innerWidth / 2);
      y.set(event.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [fine, x, y]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-[0.35] text-paper" />
      <motion.div
        className="absolute -left-[20%] top-[6%] size-[58vmax] rounded-full opacity-[0.16] blur-[90px]"
        style={{ background: "radial-gradient(circle, #ff4d2e 0%, transparent 62%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.12, 0.96, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] bottom-[2%] size-[46vmax] rounded-full opacity-[0.14] blur-[90px]"
        style={{ background: "radial-gradient(circle, #e4a11b 0%, transparent 62%)" }}
        animate={{ x: [0, -50, 25, 0], y: [0, 35, -25, 0], scale: [1, 0.94, 1.1, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      {fine ? (
        <motion.div
          className="absolute left-1/2 top-1/2 size-[34vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[70px]"
          style={{
            x: sx,
            y: sy,
            background: "radial-gradient(circle, #12a594 0%, transparent 60%)",
          }}
        />
      ) : null}
    </div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.8 }}
      className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
    >
      <div className="flex flex-col items-center gap-2 opacity-35">
        <span className="label">Scroll</span>
        <motion.span
          className="h-8 w-px bg-paper"
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
