import { SiteFooter } from "@/components/site-footer";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealLines } from "@/components/ui/reveal-words";

export function LegalPage({
  index,
  eyebrow,
  title,
  updated,
  sections,
}: {
  index: string;
  eyebrow: string;
  title: string[];
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <section className="mx-auto max-w-[88rem] px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-10">
        <SectionLabel index={index}>{eyebrow}</SectionLabel>
        <h1 className="display type-lg mt-8">
          <RevealLines lines={title} />
        </h1>
        <p className="label mt-6 opacity-40">Last updated {updated}</p>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-5">
            <ul className="border-t border-paper/10">
              {sections.map((section, i) => (
                <li key={section.heading} className="border-b border-paper/10 py-8">
                  <div className="flex gap-5">
                    <span className="label tabular pt-1 opacity-30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-xl tracking-tight sm:text-2xl">
                        {section.heading}
                      </h2>
                      <p className="mt-3 leading-relaxed text-paper/65">{section.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
