import { site } from "@/config/site";
import { Marquee } from "@/components/ui/marquee";

export function MarqueeBand() {
  return (
    <div className="border-y border-paper/10 bg-ink/60">
      <Marquee
        duration={46}
        items={[
          `${site.name} ${site.year}`,
          site.dates,
          site.tagline,
          `${site.city} • ${site.state}`,
          site.registrationsOpen ? "Registrations open" : "Coming soon",
          site.region,
        ]}
      />
    </div>
  );
}
