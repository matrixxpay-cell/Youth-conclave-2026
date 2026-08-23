"use client";

import { motion } from "framer-motion";
import { site } from "@/config/site";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { RevealLines, RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";
import { viewportOnce } from "@/lib/motion";

const stats = [
  { value: 5, suffix: "", label: "Events" },
  { value: 3, suffix: "", label: "Days" },
  { value: 24, suffix: "+", label: "Colleges" },
  { value: 1200, suffix: "+", label: "Participants" },
];

export function Intro() {
  return (
    <section id="about" className="on-paper relative overflow-hidden">
      <div className="mx-auto max-w-[88rem] px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-44">
        <SectionLabel index="01">The idea</SectionLabel>

        {/* Asymmetric editorial split: statement left, argument dropped low right. */}
        <div className="mt-12 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="display type-xl">
              <RevealLines lines={["A space for"]} />
              <RevealLines
                lines={["ideas.", "expression.", "culture."]}
                delay={0.1}
                lineClassName="text-accent"
              />
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9 lg:pb-4">
            <p className="text-lg leading-relaxed text-ink/70 sm:text-xl">
              <RevealWords text="Three days where the campus stops being a campus. Musicians, researchers, illustrators, photographers and designers take over every hall, and nobody is asked to pick between being serious and being loud." />
            </p>
            <Reveal delay={0.2}>
              <p className="label opacity-45">
                {site.college} {site.collegeSuffix}
                <br />
                {site.city}, {site.state}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Counters */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden border-y border-ink/10 lg:mt-32 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 pr-6 lg:py-12"
            >
              <p className="display text-5xl leading-[0.85] lg:text-7xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="label mt-3 opacity-45">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
