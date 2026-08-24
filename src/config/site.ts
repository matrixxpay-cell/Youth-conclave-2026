/**
 * Single source of truth for everything an organiser is likely to change.
 * Replace the placeholder payment details before going live.
 */
export const site = {
  name: "Youth Conclave",
  year: "2026",
  tagline: "Dreaming Beyond",
  college: "B. Borooah College",
  collegeSuffix: "(Autonomous)",
  city: "Guwahati",
  state: "Assam",
  region: "Northeast India",
  coords: "26.1445° N, 91.7362° E",
  dates: "12 — 14 February 2026",
  startsAt: "2026-02-12T09:00:00+05:30",
  registrationsOpen: true,
  contactEmail: "youthconclave@bborooahcollege.example",
  instagram: "https://instagram.com",
  /**
   * PLACEHOLDER payment details — swap for the union's real VPA and payee name.
   * `upiId` is rendered on screen and encoded into the payment QR.
   */
  payment: {
    upiId: "youthconclave@upi",
    payeeName: "Youth Conclave 2026",
    cashCounter: "College Union Office, Ground Floor",
  },
} as const;

export type LogoAsset = {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the file — used to reserve space and avoid layout shift. */
  width: number;
  height: number;
};

/**
 * The conclave's own artwork. `banner` is the full lockup and needs room to be
 * read; `mark` is the square Y-over-the-window crop of it, for places where the
 * banner would shrink to a smudge.
 */
export const conclaveLogo = {
  banner: {
    src: "/youth-conclave-logo.webp",
    alt: "Youth Conclave 2026 — Dreaming Beyond",
    width: 1600,
    height: 933,
  },
  mark: {
    src: "/youth-conclave-mark.webp",
    alt: "Youth Conclave 2026",
    width: 512,
    height: 512,
  },
} satisfies Record<string, LogoAsset>;

/**
 * The college's emblem. Drop the real file into /public and fill this in — e.g.
 *
 *   export const collegeLogo: LogoAsset | null = {
 *     src: "/b-borooah-college.png", alt: "B. Borooah College", width: 512, height: 512,
 *   };
 *
 * Left null it falls back to a plain B monogram, which is a stand-in and not the
 * college's actual emblem.
 */
export const collegeLogo: LogoAsset | null = null;

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/events" },
  { label: "FAQ", href: "/#faq" },
] as const;
