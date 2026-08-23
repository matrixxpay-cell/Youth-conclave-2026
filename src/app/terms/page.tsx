import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/config/site";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms",
  description: `Participation terms for ${site.name} ${site.year}.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      index="—"
      eyebrow="Terms"
      title={["The", "rules."]}
      updated="August 2025"
      sections={[
        {
          heading: "Eligibility",
          body: "Open to students currently enrolled at a recognised college or university. The student ID used at registration must be produced at check-in; entry is refused without it.",
        },
        {
          heading: "Registration and fees",
          body: `${formatINR(100)} per participant, per event. A registration is confirmed only once payment is received — cash registrations stay provisional until the union marks them paid.`,
        },
        {
          heading: "Refunds",
          body: "Fees are refundable up to seven days before the conclave opens. After that they are non-refundable, including for no-shows, but a registration may be transferred to another eligible student.",
        },
        {
          heading: "Conduct",
          body: `Harassment, plagiarised work, and abuse of volunteers or venues end your participation immediately, without refund. Judges' decisions on all five events are final.`,
        },
        {
          heading: "Media",
          body: `Photography and filming take place throughout the conclave. By attending you allow ${site.college} to use that footage in coverage of the event. Tell the media desk if you would rather not appear.`,
        },
        {
          heading: "Changes",
          body: "Schedules, venues and formats may change. Anything material is announced on this site and to the phone number you registered with.",
        },
      ]}
    />
  );
}
