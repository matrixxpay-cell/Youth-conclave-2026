import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eventBySlug, events } from "@/data/events";
import { site } from "@/config/site";
import { EventHero } from "@/components/event-hero";
import { SiteFooter } from "@/components/site-footer";
import { ActionLink } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Arrow } from "@/components/hero";
import { formatINR } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title.join(" "),
    description: `${event.category} · ${event.day}, ${event.slot} · ${event.blurb}`,
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();

  const position = events.findIndex((item) => item.slug === event.slug);
  const next = events[(position + 1) % events.length];

  const facts = [
    { label: "Day", value: event.day },
    { label: "Starts", value: event.slot },
    { label: "Venue", value: event.venue },
    { label: "Team", value: event.teamSize },
    { label: "Format", value: event.duration },
    { label: "Fee", value: `${formatINR(event.fee)} / head` },
  ];

  return (
    <>
      <EventHero event={event} />

      {/* Fact strip */}
      <section className="border-y border-paper/10">
        <div className="mx-auto grid max-w-[88rem] grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-r border-paper/10 px-4 py-6 last:border-r-0 sm:px-6 lg:border-b-0 lg:px-5"
            >
              <p className="label opacity-35">{fact.label}</p>
              <p className="mt-2 font-display text-base tracking-tight sm:text-lg">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionLabel index="01">The brief</SectionLabel>
            <Reveal delay={0.05}>
              <p className="mt-8 text-xl leading-relaxed text-paper/80 sm:text-2xl sm:leading-relaxed">
                {event.description}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel index="02">Rules</SectionLabel>
            <ul className="mt-8 border-t border-paper/10">
              {event.rules.map((rule, index) => (
                <Reveal as="li" key={rule} delay={index * 0.05} className="block">
                  <div className="flex gap-5 border-b border-paper/10 py-5">
                    <span className="label tabular pt-1 opacity-30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-paper/70">{rule}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-paper/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <div>
            <p className="display type-md">
              {formatINR(event.fee)}
              <span className="label ml-3 align-middle opacity-40">per head</span>
            </p>
            <p className="label mt-3 opacity-40">
              UPI or cash at the {site.payment.cashCounter.toLowerCase()}
            </p>
          </div>
          <ActionLink
            href={`/register?event=${event.slug}`}
            variant="paper"
            cursorLabel="Register →"
            className="px-8 py-5"
          >
            Register for this
            <Arrow />
          </ActionLink>
        </div>
      </section>

      {/* Next event */}
      <section className="border-t border-paper/10">
        <Link
          href={`/events/${next.slug}`}
          data-cursor="Next event →"
          className="group mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-4 py-14 sm:px-6 lg:px-10 lg:py-20"
        >
          <div>
            <p className="label opacity-35">Next up · {next.index}</p>
            <p className="display type-md mt-4 transition-colors duration-500 group-hover:text-accent">
              {next.title.join(" ")}
            </p>
          </div>
          <Arrow className="size-7 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
        </Link>
      </section>

      <SiteFooter />
    </>
  );
}
