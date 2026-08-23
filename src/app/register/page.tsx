import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterFlow } from "@/components/register/register-flow";
import { RegisterFlowFromQuery } from "@/components/register/register-from-query";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Register",
  description: `Register for ${site.name} ${site.year} — ${site.dates}, ${site.city}. Under a minute, UPI or cash.`,
  robots: { index: false },
};

/**
 * `?event=` and `?ref=` are read on the client so this page can be prerendered
 * — including into a static export, which has no server to hand them over.
 * The fallback is the same flow with its event picker showing.
 */
export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFlow />}>
      <RegisterFlowFromQuery />
    </Suspense>
  );
}
