import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { ActionLink } from "@/components/ui/magnetic";
import { Arrow } from "@/components/hero";
import { SectionLabel } from "@/components/ui/section-label";

export default function NotFound() {
  return (
    <>
      <section className="mx-auto flex min-h-[80svh] max-w-[88rem] flex-col justify-center px-4 py-32 sm:px-6 lg:px-10">
        <SectionLabel index="404">Off the map</SectionLabel>
        <h1 className="display type-xl mt-8">
          Nothing
          <br />
          <span className="text-accent">here.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/65">
          This page has either moved or never existed. The five events are all
          still where you left them.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ActionLink href="/" variant="paper" cursorLabel="Home →">
            Back home
            <Arrow />
          </ActionLink>
          <Link
            href="/events"
            data-cursor="Events →"
            className="label inline-flex min-h-12 items-center gap-2.5 rounded-full border border-paper/25 px-7 transition-colors duration-300 hover:border-paper/60"
          >
            See the events
            <Arrow />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
