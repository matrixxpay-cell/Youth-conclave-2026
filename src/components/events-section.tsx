import Link from "next/link";
import { events } from "@/data/events";
import { EventList } from "@/components/event-list";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealLines } from "@/components/ui/reveal-words";
import { Arrow } from "@/components/hero";

export function EventsSection() {
  return (
    <section id="events" className="relative py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index="03">The line-up</SectionLabel>
            <h2 className="display type-xl mt-8">
              <RevealLines lines={["What's", "happening?"]} step={0.08} />
            </h2>
          </div>
          <p className="label max-w-xs leading-relaxed opacity-45">
            Five events across three days. Pick one, pick all of them — each is
            registered separately.
          </p>
        </div>
      </div>

      <div className="mt-14 lg:mt-20">
        <EventList events={events} />
      </div>

      <div className="mx-auto mt-10 max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <Link
          href="/events"
          data-cursor="All events →"
          className="label group inline-flex items-center gap-3 opacity-60 transition-opacity hover:opacity-100"
        >
          All five events, in detail
          <Arrow className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  );
}
