"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { ConclaveEvent } from "@/data/events";
import { EventVisual } from "@/components/event-visual";
import { Arrow } from "@/components/hero";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { expo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function EventList({ events }: { events: ConclaveEvent[] }) {
  return (
    <div className="border-t border-current/10">
      {events.map((event, index) => (
        <EventRow key={event.slug} event={event} position={index} />
      ))}
    </div>
  );
}

function EventRow({ event, position }: { event: ConclaveEvent; position: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const [hovered, setHovered] = useState(false);
  // On touch, the row that sits in the middle of the screen lights up instead.
  const centred = useInView(ref, { amount: 0.55 });
  const active = fine ? hovered : centred;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...expo, delay: Math.min(position, 4) * 0.05 }}
    >
      <Link
        ref={ref}
        href={`/events/${event.slug}`}
        data-cursor="View event →"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group relative block overflow-hidden border-b border-current/10"
        style={{ ["--accent" as string]: event.accent }}
      >
        {/* Generated visual, clipped inside the row */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active ? 1 : 0.22 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-y-0 right-0 w-full md:w-[46%]">
            <EventVisual kind={event.kind} active={active} accent={event.accent} />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55 md:from-ink md:via-ink/60 md:to-transparent" />
          </div>
        </motion.div>

        {/* Accent wash */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active ? 0.08 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: `linear-gradient(90deg, ${event.accent}, transparent 65%)` }}
        />

        <motion.div
          className="relative flex flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:gap-10 md:py-14 lg:px-10"
          initial={false}
          animate={{ x: active && fine ? 10 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="label tabular w-10 shrink-0"
            initial={false}
            animate={{ y: active ? -8 : 0, color: active ? event.accent : "currentColor" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {event.index}
          </motion.span>

          <h3 className="display type-lg flex-1">
            {event.title.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={false}
                animate={{ x: active && fine ? i * 12 : 0 }}
                transition={{ duration: 0.6, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h3>

          <div className="flex items-end justify-between gap-6 md:w-56 md:flex-col md:items-start md:justify-center">
            <div className="space-y-1.5">
              <p className="label opacity-70">{event.category}</p>
              <p className="label tabular opacity-40">
                {event.day} · {event.slot}
              </p>
            </div>
            <motion.span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full border border-current/20",
                "md:size-12",
              )}
              initial={false}
              animate={{
                backgroundColor: active ? event.accent : "rgba(0,0,0,0)",
                borderColor: active ? event.accent : "rgba(242,238,229,0.2)",
                color: active ? "#0b0b0c" : "#f2eee5",
                rotate: active ? -45 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Arrow className="size-4" />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
