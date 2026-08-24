import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1` emits a fully static site into ./out — what the GitHub
 * Pages workflow builds. `BASE_PATH` prefixes every route and asset for a
 * project page served from /<repo>. With neither set this is an ordinary
 * server build, so `npm run dev` and any Node host are unaffected.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const rawBasePath = process.env.BASE_PATH ?? "";
// A user or org page reports "/" as its base; Next rejects that as a basePath.
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Directory-style URLs, so /events/beats/ resolves to an index.html on a
  // plain file host.
  ...(staticExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // Nothing is optimising images behind a static export.
    unoptimized: staticExport,
  },
  // next/image leaves `src` alone when unoptimized, so basePath is never
  // prepended for us — `assetPath()` does it, and needs the value at build time.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
