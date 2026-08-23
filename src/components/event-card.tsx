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
import { formatINR } from "@/lib/utils";

/** The taller, image-forward treatment used on the events index. */
export function EventCard({
  event,
  position,
}: {
  event: ConclaveEvent;
  position: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const [hovered, setHovered] = useState(false);
  const centred = useInView(ref, { amount: 0.5 });
  const active = fine ? hovered : centred;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...expo, delay: (position % 2) * 0.08 }}
      className={cn(
        // Every other card drops down a step, so the grid never reads as a row of boxes.
        "lg:[&:nth-child(even)]:translate-y-20",
      )}
    >
      <Link
        ref={ref}
        href={`/events/${event.slug}`}
        data-cursor="View event →"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-paper/10 bg-ink-soft sm:aspect-[16/10]">
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: active ? 1.04 : 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <EventVisual event={event} active={active} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

          <motion.span
            className="label tabular absolute left-5 top-5"
            initial={false}
            animate={{ color: active ? event.accent : "#f2eee5", y: active ? -3 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {event.index}
          </motion.span>

          <motion.span
            className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-paper/25"
            initial={false}
            animate={{
              backgroundColor: active ? event.accent : "rgba(0,0,0,0)",
              borderColor: active ? event.accent : "rgba(242,238,229,0.25)",
              color: active ? "#0b0b0c" : "#f2eee5",
              rotate: active ? -45 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Arrow className="size-3.5" />
          </motion.span>

          <div className="absolute inset-x-5 bottom-5">
            <h3 className="display text-3xl leading-[0.85] sm:text-4xl lg:text-5xl">
              {event.title.join(" ")}
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <p className="label" style={{ color: event.accent }}>
                {event.category}
              </p>
              <p className="text-sm leading-relaxed text-paper/55">{event.blurb}</p>
            </div>
            <p className="label tabular shrink-0 text-right opacity-45">
              {formatINR(event.fee)}
              <br />
              <span className="opacity-60">per head</span>
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-paper/10 pt-4">
            <Detail label="When" value={`${event.day} · ${event.slot}`} />
            <Detail label="Where" value={event.venue} />
            <Detail label="Format" value={event.duration} />
            <Detail label="Entry" value={event.teamSize} />
          </dl>
        </div>
      </Link>
    </motion.div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label opacity-30">{label}</dt>
      <dd className="label tabular mt-1.5 opacity-70">{value}</dd>
    </div>
  );
}
