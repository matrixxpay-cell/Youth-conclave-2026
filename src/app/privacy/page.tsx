import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} ${site.year} handles the details you give us when you register.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      index="—"
      eyebrow="Privacy"
      title={["What we", "keep."]}
      updated="August 2025"
      sections={[
        {
          heading: "What we collect",
          body: "Your name, phone number, student ID and college — the four things needed to check you in at the gate — plus the event you registered for and how you paid.",
        },
        {
          heading: "Why we collect it",
          body: "To verify that participants are enrolled students, to reconcile payments with the college union, and to reach you if a schedule changes. Nothing else.",
        },
        {
          heading: "Payment proof",
          body: `Payment screenshots are used only to confirm a UPI transfer against the ${site.name} account. They are not stored beyond the conclave and are never shared with the other participants.`,
        },
        {
          heading: "Who sees it",
          body: `The organising committee at ${site.college} and the volunteers running check-in. We do not sell, rent or pass participant data to sponsors or third parties.`,
        },
        {
          heading: "How long we keep it",
          body: "Registration records are deleted within ninety days of the closing ceremony, except for aggregate counts used in the event report.",
        },
        {
          heading: "Your choices",
          body: `Write to ${site.contactEmail} to see, correct or delete what we hold about you. Deleting a record before the conclave cancels the registration.`,
        },
      ]}
    />
  );
}
