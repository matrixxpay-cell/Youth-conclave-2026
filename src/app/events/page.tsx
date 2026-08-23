import type { Metadata } from "next";
import { events } from "@/data/events";
import { site } from "@/config/site";
import { EventCard } from "@/components/event-card";
import { SiteFooter } from "@/components/site-footer";
import { FinalCta } from "@/components/final-cta";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealLines } from "@/components/ui/reveal-words";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/magnetic";
import { Arrow } from "@/components/hero";

export const metadata: Metadata = {
  title: "Events",
  description: `The five events of ${site.name} ${site.year} — ${site.dates}, ${site.city}.`,
};

export default function EventsPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-10 lg:pt-48">
        <div className="mx-auto max-w-[88rem]">
          <SectionLabel index="—">Events / 26</SectionLabel>
          <h1 className="display type-xl mt-8">
            <RevealLines lines={["Five", "events."]} />
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 lg:col-start-7" delay={0.15}>
              <p className="text-lg leading-relaxed text-paper/65">
                Every event is registered separately at {`₹100`}. Read the rules
                before you pay — a few of them are stricter than you expect.
              </p>
              <p className="label mt-6 opacity-40">
                {site.dates} · {site.city}, {site.state}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[88rem] gap-14 sm:gap-16 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6">
          {events.map((event, index) => (
            <EventCard key={event.slug} event={event} position={index} />
          ))}
          {/* Five events leave an odd slot in a two-column grid — use it. */}
          <Reveal className="flex lg:[&:nth-child(even)]:translate-y-20" delay={0.1}>
            <div className="flex w-full flex-col justify-between gap-10 rounded-2xl border border-paper/10 p-8 lg:p-10">
              <p className="display type-md">
                Pick
                <br />
                more than
                <br />
                <span className="text-accent">one.</span>
              </p>
              <div className="space-y-6">
                <p className="text-paper/60">
                  Every event is registered on its own, so nothing stops you
                  entering three. The schedule only collides in one place, and
                  both pages say so.
                </p>
                <ActionLink href="/register" variant="paper" cursorLabel="Register →">
                  Start registering
                  <Arrow />
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <SiteFooter />
    </>
  );
}
