import Link from "next/link";
import { site } from "@/config/site";

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
        <div className="label leading-relaxed opacity-45">
          <p>
            {site.college} {site.collegeSuffix}
          </p>
          <p>
            {site.name} {site.year}
          </p>
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
