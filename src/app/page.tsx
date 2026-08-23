import { Hero } from "@/components/hero";
import { MarqueeBand } from "@/components/marquee-band";
import { Intro } from "@/components/intro";
import { Manifesto } from "@/components/manifesto";
import { EventsSection } from "@/components/events-section";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";
import { SectionRail } from "@/components/section-rail";

export default function HomePage() {
  return (
    <>
      <div data-section="Hero">
        <Hero />
      </div>
      <MarqueeBand />
      <div data-section="The idea">
        <Intro />
      </div>
      <div data-section="The pitch">
        <Manifesto />
      </div>
      <div data-section="Line-up">
        <EventsSection />
      </div>
      <div data-section="Questions">
        <Faq />
      </div>
      <div data-section="Register">
        <FinalCta />
      </div>
      <SiteFooter />
      <SectionRail />
    </>
  );
}
