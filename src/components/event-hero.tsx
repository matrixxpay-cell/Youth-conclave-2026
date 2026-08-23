"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ConclaveEvent } from "@/data/events";
import { EventVisual } from "@/components/event-visual";
import { RevealLines } from "@/components/ui/reveal-words";

export function EventHero({ event }: { event: ConclaveEvent }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y: visualY }} className="absolute inset-0 -z-10">
        <EventVisual event={event} active />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{ background: `linear-gradient(180deg, ${event.accent}, transparent 55%)` }}
        />
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="mx-auto flex min-h-[82svh] max-w-[88rem] flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-10"
      >
        <div className="flex items-center gap-4">
          <span className="label tabular" style={{ color: event.accent }}>
            {event.index}
          </span>
          <span className="h-px w-10 opacity-30" style={{ background: event.accent }} />
          <span className="label opacity-70">{event.category}</span>
        </div>

        <h1 className="display type-xl mt-6">
          <RevealLines lines={event.title} step={0.08} />
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 sm:text-xl">
          {event.blurb}
        </p>
      </motion.div>
    </div>
  );
}
