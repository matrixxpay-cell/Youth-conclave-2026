import type { Metadata } from "next";
import { RegisterFlow } from "@/components/register/register-flow";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Register",
  description: `Register for ${site.name} ${site.year} — ${site.dates}, ${site.city}. Under a minute, UPI or cash.`,
  robots: { index: false },
};

type PageProps = {
  searchParams: Promise<{ event?: string; ref?: string }>;
};

export default async function RegisterPage({ searchParams }: PageProps) {
  const { event, ref } = await searchParams;
  return <RegisterFlow initialEventSlug={event} lookupId={ref} />;
}
