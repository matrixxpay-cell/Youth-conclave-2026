import Link from "next/link";
import { site } from "@/config/site";
import { CollegeMark, ConclaveMark } from "@/components/logo";

const columns = [
  { label: "Instagram", href: site.instagram, external: true },
  { label: "Contact", href: `mailto:${site.contactEmail}`, external: true },
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Terms", href: "/terms", external: false },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="flex items-center gap-4">
          <CollegeMark className="size-8 shrink-0 opacity-45" />
          <span aria-hidden className="h-8 w-px bg-current opacity-15" />
          <ConclaveMark className="size-8 shrink-0 text-accent opacity-70" />
          <div className="label ml-1 leading-relaxed opacity-45">
            <p>
              {site.name} {site.year}
            </p>
            <p>
              An initiative by {site.college} {site.collegeSuffix}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {columns.map((column) =>
            column.external ? (
              <a
                key={column.label}
                href={column.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor={column.label}
                className="label opacity-60 transition-opacity hover:opacity-100"
              >
                {column.label}
              </a>
            ) : (
              <Link
                key={column.label}
                href={column.href}
                data-cursor={column.label}
                className="label opacity-60 transition-opacity hover:opacity-100"
              >
                {column.label}
              </Link>
            ),
          )}
        </nav>

        <p className="label tabular opacity-25">{site.coords}</p>
      </div>
    </footer>
  );
}
