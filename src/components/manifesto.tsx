"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealLines } from "@/components/ui/reveal-words";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.16, 0.05]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 sm:py-36 lg:py-52">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
        style={{
          opacity: glow,
          background: "radial-gradient(circle, #ff4d2e 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <SectionLabel index="02">The pitch</SectionLabel>
        <motion.h2 style={{ y: drift }} className="display type-xl mt-10 lg:mt-16">
          <RevealLines lines={["This", "isn't just", "an event."]} step={0.09} />
        </motion.h2>
        <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:col-start-7" delay={0.1}>
            <p className="text-lg leading-relaxed text-paper/70 sm:text-xl">
              It is the week the college argues with itself in public. A ramp
              that carries a manifesto. A lectern that gets questioned back. A
              studio where the prompt only goes up once the clock has started.
            </p>
            <p className="label mt-8 opacity-40">
              Open to every college in {`Assam`} and the Northeast.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
