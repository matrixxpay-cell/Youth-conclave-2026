export type EventKind =
  | "fashion"
  | "debate"
  | "music"
  | "startup"
  | "cultural"
  | "lens";

export type ConclaveEvent = {
  slug: string;
  /** Three-letter code used inside registration IDs, e.g. YC26-FAR-00421 */
  code: string;
  index: string;
  kind: EventKind;
  /** Rendered as separate lines in the oversized display type. */
  title: string[];
  category: string;
  blurb: string;
  description: string;
  accent: string;
  fee: number;
  teamSize: string;
  duration: string;
  venue: string;
  day: string;
  slot: string;
  rules: string[];
};

export const events: ConclaveEvent[] = [
  {
    slug: "fashion-for-a-reason",
    code: "FAR",
    index: "01",
    kind: "fashion",
    title: ["Fashion", "for a", "Reason"],
    category: "Fashion Show",
    blurb: "A runway that argues. Handloom, protest, and silhouette.",
    description:
      "Six teams, six statements. Build a collection around a cause you cannot stop thinking about — climate, gender, language, land — and walk it. Handloom and upcycled material score higher than a rented gown.",
    accent: "#FF4D2E",
    fee: 100,
    teamSize: "6 — 10 per team",
    duration: "8 min on the ramp",
    venue: "Main Auditorium",
    day: "Day 02",
    slot: "6:00 PM",
    rules: [
      "One theme per team, declared at registration.",
      "Eight minutes on the ramp, including the reveal.",
      "Own soundtrack, submitted 24 hours before.",
      "No live flame, no glitter, nothing that stains the ramp.",
    ],
  },
  {
    slug: "the-last-word",
    code: "TLW",
    index: "02",
    kind: "debate",
    title: ["The", "Last", "Word"],
    category: "Parliamentary Debate",
    blurb: "Three rounds. Fifteen minutes of prep. No notes on stage.",
    description:
      "Asian parliamentary format, motions released fifteen minutes before each round. Two speakers a team, seven minutes each, and a floor that is allowed to be merciless during points of information.",
    accent: "#2F6DF6",
    fee: 100,
    teamSize: "2 per team",
    duration: "3 rounds + final",
    venue: "Seminar Hall B",
    day: "Day 01",
    slot: "10:30 AM",
    rules: [
      "Asian parliamentary format, two speakers per team.",
      "Motions released 15 minutes before each round.",
      "Seven minutes per speaker, POIs after the first minute.",
      "Printed notes allowed in prep, not on stage.",
    ],
  },
  {
    slug: "battle-of-the-bands",
    code: "BOB",
    index: "03",
    kind: "music",
    title: ["Battle", "of the", "Bands"],
    category: "Live Music",
    blurb: "Twenty minutes, full backline, one original mandatory.",
    description:
      "The loudest night of the conclave. Full backline provided, twenty-minute sets including changeover, and at least one original composition — covers alone will not get you past the shortlist.",
    accent: "#C542F5",
    fee: 100,
    teamSize: "3 — 8 per band",
    duration: "20 min set",
    venue: "Open Air Stage",
    day: "Day 03",
    slot: "7:30 PM",
    rules: [
      "Twenty-minute set, changeover included.",
      "At least one original composition.",
      "Backline provided; bring your own pedals and sticks.",
      "Shortlist by demo link submitted at registration.",
    ],
  },
  {
    slug: "ignite-pitch",
    code: "IGN",
    index: "04",
    kind: "startup",
    title: ["Ignite", "the", "Pitch"],
    category: "Startup Pitch",
    blurb: "Five slides. Five minutes. One problem worth solving.",
    description:
      "Bring a problem you have actually watched someone struggle with. Five slides, five minutes, five minutes of questions from a panel that has built things in the Northeast and will ask about unit economics.",
    accent: "#12A594",
    fee: 100,
    teamSize: "1 — 4 per team",
    duration: "5 min pitch + 5 Q&A",
    venue: "Innovation Lab",
    day: "Day 02",
    slot: "11:00 AM",
    rules: [
      "Five slides maximum, submitted as PDF.",
      "Five-minute pitch, five-minute panel Q&A.",
      "Prototypes welcome, mockups accepted.",
      "Idea must be unregistered or under 12 months old.",
    ],
  },
  {
    slug: "loom-and-lineage",
    code: "LNL",
    index: "05",
    kind: "cultural",
    title: ["Loom", "and", "Lineage"],
    category: "Cultural Showcase",
    blurb: "Folk forms of the seven states, staged without a museum label.",
    description:
      "Bihu, Sattriya, Bamboo dance, Hojagiri — brought to a contemporary stage on their own terms. Ensembles are judged on form, live accompaniment, and how honestly the piece is credited to where it comes from.",
    accent: "#E4A11B",
    fee: 100,
    teamSize: "4 — 15 per group",
    duration: "10 min performance",
    venue: "Main Auditorium",
    day: "Day 01",
    slot: "5:00 PM",
    rules: [
      "Ten minutes including entry and exit.",
      "Live accompaniment scores higher than a track.",
      "Credit the form and the community it belongs to.",
      "Props cleared with the stage manager a day prior.",
    ],
  },
  {
    slug: "shutter-north",
    code: "SHN",
    index: "06",
    kind: "lens",
    title: ["Shutter", "North"],
    category: "Photo & Film",
    blurb: "Forty-eight hours. One prompt. Shot inside the city.",
    description:
      "A prompt drops at midnight and you have forty-eight hours to answer it — a photo essay of six frames or a film under four minutes. Everything must be shot during the conclave, inside Guwahati.",
    accent: "#6B7280",
    fee: 100,
    teamSize: "1 — 3 per entry",
    duration: "48 hr window",
    venue: "City-wide",
    day: "Day 01 — 03",
    slot: "Prompt at 12:00 AM",
    rules: [
      "All footage shot within the 48-hour window.",
      "Six frames for a photo essay, under four minutes for film.",
      "Phone cameras are entirely welcome.",
      "No stock, no archive, no generated imagery.",
    ],
  },
];

export const eventBySlug = (slug: string) =>
  events.find((event) => event.slug === slug);
