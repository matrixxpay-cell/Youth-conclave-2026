import type { Metadata, Viewport } from "next";
import { Inter_Tight, Space_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { Cursor } from "@/components/cursor";
import { GrainOverlay } from "@/components/ui/grain";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/config/site";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const title = `${site.name} ${site.year} — ${site.college}`;
const description = `${site.dates} · ${site.city}, ${site.state}. Five events, three days, one campus. ${site.tagline}.`;

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${site.name} ${site.year}` },
  description,
  applicationName: `${site.name} ${site.year}`,
  openGraph: { title, description, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <PageTransition />
        <GrainOverlay />
        <Cursor />
      </body>
    </html>
  );
}
