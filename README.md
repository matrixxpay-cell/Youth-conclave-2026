# Youth Conclave 2026

Festival site for Youth Conclave 2026 at B. Borooah College (Autonomous), Guwahati —
five events across three days, with registration, UPI/cash payment and a downloadable
gate pass.

Built as a Next.js App Router project: React 19, TypeScript, Tailwind CSS v4 and
Framer Motion.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Where things live

```
src/config/site.ts        Dates, venue, contact and payment details — edit this first
src/data/events.ts        The five events: copy, schedule, rules, accent colour, fee
src/lib/registration.ts   Registration model, ID format and the local store
src/lib/ticket.ts         Canvas renderer for the downloadable pass
src/components/           Sections, the event visual system, and the registration flow
src/app/                  Routes: /, /events, /events/[slug], /register, /privacy, /terms
```

### Before going live

**Logos.** `src/config/site.ts` exports a `logos` object with both marks set to `null`.
Drop the real files into `/public` and fill it in:

```ts
export const logos = {
  college: { src: "/b-borooah-college.png", alt: "B. Borooah College", width: 512, height: 512 },
  conclave: { src: "/youth-conclave.svg", alt: "Youth Conclave 2026", width: 512, height: 512 },
};
```

They then take over everywhere a mark appears — the hero lockup, the navigation, the
footer and the closing call to action. Until then the conclave falls back to its drawn
mark and the college to a plain `B` monogram; that monogram is a stand-in, **not** the
college's emblem, and has to be replaced.

**Payment.** `src/config/site.ts` also ships **placeholder payment details**
(`youthconclave@upi`). Replace `payment.upiId`, `payment.payeeName` and
`payment.cashCounter` with the union's real values — `upiId` is printed on screen and
encoded into the payment QR.

## How registration works today

The flow is complete end to end in the browser: details → payment → confirmation,
including the UPI intent QR, proof upload, provisional cash references and the
PNG pass. Records are written to `localStorage` through a small store in
`src/lib/registration.ts`, and registration IDs (`YC26-FAR-00421`) are numbered from a
counter local to the device.

There is no backend yet. When one exists, three functions in that file are the seam:
`nextSequence` (hand out server-side sequence numbers), `saveRegistration` (POST the
record) and `getRegistration` (fetch by ID). The payment step also assumes UPI is
settled the moment a participant confirms — a server would keep that record in
`verifying` until the union reconciles it, which the `RegistrationStatus` type already
allows for. Nothing in the UI needs to change for either.

Uploaded payment proof is currently held in the browser only; it is never transmitted.

## Design notes

- **Each event carries its own background.** A tinted field, a texture built from the
  event itself, and line art on top — a rippling waveform for Beats, a lectern and a
  listening room for the Students' Seminar, wet strokes and blots for Ink Your Idea,
  an aperture between two strips of film for Shutter, lit silhouettes on a ramp for
  Fashion for a Reason (`src/components/event-visual.tsx`). A couple of kilobytes each,
  they scale to any block, and animate on transform, opacity and path length only.
- **Photographs drop straight in.** Put a file in `/public` and set `image` on the event
  in `src/data/events.ts`; that photograph then replaces the generated artwork
  everywhere the event appears — rows, cards and the detail hero. No other change.
- **Two hero compositions.** Below `lg` the wordmark stacks and runs edge to edge; from
  `lg` the year moves up beside YOUTH, YOUTH steps back to `min(13vw,15vh)` and CONCLAVE
  scales to `23vw` so it overruns the right edge by 120–190px at every desktop width
  while the whole lockup still clears the fold.
- **The attribution lockup** — college mark, divider, conclave mark, then "An initiative
  by B. Borooah College" — opens the landing page and closes the footer. It stacks below
  `sm` and runs as a row above it.
- **Custom classes sit in `@layer components`** so Tailwind utilities can still override
  them. Unlayered rules would win against every utility.
- **Motion respects `prefers-reduced-motion`**, and the custom cursor, pointer-tracked
  gradient and page-transition wipe never mount for touch or reduced-motion users.
