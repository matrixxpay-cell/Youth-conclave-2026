"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { formatINR } from "@/lib/utils";

const faqs = [
  {
    q: "Who can register?",
    a: `Any student currently enrolled at a recognised college or university. Carry the same student ID you register with — it is checked at the gate.`,
  },
  {
    q: "How much does it cost?",
    a: `${formatINR(100)} per event, per participant. Team events are billed once per team member. There is no separate entry fee for the campus.`,
  },
  {
    q: "How do I pay?",
    a: `UPI at the end of registration, or cash at the ${site.payment.cashCounter}. Cash registrations stay provisional until the union marks them paid.`,
  },
  {
    q: "Can I enter more than one event?",
    a: "Yes. Register once per event — the schedule is built so the five events only overlap in one place, flagged on both event pages.",
  },
  {
    q: "What if my team changes after registering?",
    a: "Bring the updated list to the help desk on Day 01. Substitutions are free until the first round of your event begins.",
  },
  {
    q: "Is there accommodation?",
    a: `Limited dormitory space is held for participants travelling from outside ${site.city}. Ask for it at the help desk when you collect your pass.`,
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="on-paper">
      <div className="mx-auto max-w-[88rem] px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="04">Questions</SectionLabel>
            <Reveal delay={0.05}>
              <h2 className="display type-md mt-8">
                Before
                <br />
                you ask.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-ink/12">
              {faqs.map((faq, index) => {
                const isOpen = open === index;
                return (
                  <li key={faq.q} className="border-b border-ink/12">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      data-cursor={isOpen ? "Close" : "Open"}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span className="label tabular pt-1 opacity-35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-xl tracking-tight sm:text-2xl">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative mt-2 block size-4 shrink-0"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                        <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-7 pl-11 text-ink/65 sm:text-lg">{faq.a}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
