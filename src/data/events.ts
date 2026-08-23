export type EventKind = "beats" | "seminar" | "ink" | "shutter" | "fashion";

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
  /**
   * Optional photograph. Drop a file in /public and set it here and the event
   * renders that instead of its generated artwork, everywhere it appears —
   * rows, cards and the detail hero. Leave it off and the artwork is used.
   */
  image?: { src: string; alt: string };
};

export const events: ConclaveEvent[] = [
  {
    slug: "beats",
    code: "BTS",
    index: "01",
    kind: "beats",
    title: ["Beats"],
    category: "Instrumental",
    blurb: "No vocals. Just you, the instrument, and eight minutes.",
    description:
      "A stage with nothing to hide behind. Bring a guitar, a tabla, a keyboard, a flute, a laptop — anything that makes sound without a singer in front of it. Arrangement and control are marked harder than speed.",
    accent: "#C542F5",
    fee: 100,
    teamSize: "Solo or duo",
    duration: "8 min set",
    venue: "Open Air Stage",
    day: "Day 02",
    slot: "6:30 PM",
    rules: [
      "Eight minutes on stage, changeover included.",
      "Strictly instrumental — no vocals, no backing vocal track.",
      "Basic amplification provided; bring your own instrument and cables.",
      "One backing track allowed, submitted 24 hours before.",
    ],
  },
  {
    slug: "students-seminar",
    code: "SEM",
    index: "02",
    kind: "seminar",
    title: ["Students'", "Seminar"],
    category: "Paper Presentation",
    blurb: "Ten minutes to defend an idea in front of a room that will ask.",
    description:
      "Present work you have actually done — a study, a field survey, a project, a reading you cannot let go of. Ten minutes at the lectern, five with a panel that reads the paper before you speak, and a floor that is allowed to push back.",
    accent: "#2F6DF6",
    fee: 100,
    teamSize: "Solo or pairs",
    duration: "10 min + 5 Q&A",
    venue: "Seminar Hall B",
    day: "Day 01",
    slot: "10:30 AM",
    rules: [
      "Abstract of 250 words submitted at registration.",
      "Ten-minute presentation, five minutes of questions.",
      "Slides optional; a clear argument is not.",
      "Sources cited on the last slide or the last page.",
    ],
  },
  {
    slug: "ink-your-idea",
    code: "INK",
    index: "03",
    kind: "ink",
    title: ["Ink", "Your", "Idea"],
    category: "Drawing",
    blurb: "One prompt, three hours, whatever medium you carried in.",
    description:
      "The prompt goes up on the studio wall at eleven and you have three hours with it. Pencil, ink, charcoal, poster colour, digital on your own tablet — the medium is yours. Paper is provided; everything else you bring.",
    accent: "#E4A11B",
    fee: 100,
    teamSize: "Solo",
    duration: "3 hr on site",
    venue: "Fine Arts Studio",
    day: "Day 02",
    slot: "11:00 AM",
    rules: [
      "Work starts and finishes inside the studio.",
      "A4 and A3 sheets provided; bring your own instruments.",
      "Digital entries allowed on your own device, no reference images open.",
      "Nothing prepared in advance, nothing traced.",
    ],
  },
  {
    slug: "shutter",
    code: "SHT",
    index: "04",
    kind: "shutter",
    title: ["Shutter"],
    category: "Photography",
    blurb: "Forty-eight hours. One prompt. Shot inside the city.",
    description:
      "A prompt drops at midnight and you have forty-eight hours to answer it in six frames. Everything must be shot during the conclave, inside Guwahati. Phone cameras are entirely welcome and have won this before.",
    accent: "#12A594",
    fee: 100,
    teamSize: "Solo",
    duration: "48 hr window",
    venue: "City-wide",
    day: "Day 01 — 03",
    slot: "12:00 AM",
    rules: [
      "The prompt goes up at midnight; all frames shot inside the 48 hours after.",
      "Six frames submitted as a set, in the order you want them read.",
      "Colour correction and cropping fine; compositing is not.",
      "No stock, no archive, no generated imagery.",
    ],
  },
  {
    slug: "fashion-for-a-reason",
    code: "FAR",
    index: "05",
    kind: "fashion",
    title: ["Fashion", "for a", "Reason"],
    category: "Fashion Show",
    blurb: "A runway that argues. Handloom, protest, and silhouette.",
    description:
      "The closing night. Teams build a collection around a cause they cannot stop thinking about — climate, gender, language, land — and walk it. Handloom and upcycled material score higher than a rented gown.",
    accent: "#FF4D2E",
    fee: 100,
    teamSize: "6 — 10 per team",
    duration: "8 min on the ramp",
    venue: "Main Auditorium",
    day: "Day 03",
    slot: "6:00 PM",
    rules: [
      "One theme per team, declared at registration.",
      "Eight minutes on the ramp, including the reveal.",
      "Own soundtrack, submitted 24 hours before.",
      "No live flame, no glitter, nothing that stains the ramp.",
    ],
  },
];

export const eventBySlug = (slug: string) =>
  events.find((event) => event.slug === slug);
