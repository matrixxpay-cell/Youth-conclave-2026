export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Prefixes a /public asset with the deployment's base path.
 *
 * Next rewrites the URLs it generates itself — routes, chunks, metadata icons —
 * but an `unoptimized` next/image passes `src` through untouched, so anything
 * under /public 404s on a project page served from a subdirectory unless it
 * goes through here.
 */
export function assetPath(src: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || !src.startsWith("/") || src.startsWith(base + "/")) return src;
  return `${base}${src}`;
}
