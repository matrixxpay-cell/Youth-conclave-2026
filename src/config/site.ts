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

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/events" },
  { label: "FAQ", href: "/#faq" },
] as const;
