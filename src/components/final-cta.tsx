"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/config/site";
import { ActionLink, Magnetic } from "@/components/ui/magnetic";
import { RevealLines } from "@/components/ui/reveal-words";
import { Arrow } from "@/components/hero";
import { StatusDot } from "@/components/ui/section-label";
import { ConclaveMark } from "@/components/logo";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(255,77,46,0.22) 0%, transparent 70%)",
        }}
      />
      <motion.div
        style={{ scale, y: lift }}
        className="relative mx-auto max-w-[88rem] px-4 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-36 lg:px-10 lg:pb-40 lg:pt-52"
      >
        <div className="flex items-center gap-4">
          <ConclaveMark spin className="size-6 text-accent" />
          <StatusDot label={site.registrationsOpen ? "Registrations open" : "Opening soon"} />
        </div>

        <h2 className="display type-hero mt-8">
          <RevealLines lines={["Ready?"]} />
        </h2>

        <div className="mt-10 flex flex-col gap-10 border-t border-paper/10 pt-10 sm:flex-row sm:items-end sm:justify-between lg:mt-16">
          <div>
            <p className="display type-md">
              {site.name}
              <br />
              <span className="text-accent">{site.year}</span>
            </p>
            <p className="label mt-5 opacity-45">
              {site.dates} · {site.city}, {site.state}
            </p>
          </div>

          <Magnetic strength={0.2}>
            <ActionLink
              href="/register"
              variant="paper"
              magnetic={false}
              cursorLabel="Register →"
              className="px-9 py-5 text-sm"
            >
              Register now
              <Arrow />
            </ActionLink>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
