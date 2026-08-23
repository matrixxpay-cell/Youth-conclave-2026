"use client";

import { useSearchParams } from "next/navigation";
import { RegisterFlow } from "@/components/register/register-flow";

export function RegisterFlowFromQuery() {
  const params = useSearchParams();
  return (
    <RegisterFlow
      initialEventSlug={params.get("event") ?? undefined}
      lookupId={params.get("ref") ?? undefined}
    />
  );
}
