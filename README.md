# Youth Conclave 2026

Festival site for Youth Conclave 2026 at B. Borooah College (Autonomous), Guwahati —
six events across three days, with registration, UPI/cash payment and a downloadable
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
src/data/events.ts        The six events: copy, schedule, rules, accent colour, fee
src/lib/registration.ts   Registration model, ID format and the local store
src/lib/ticket.ts         Canvas renderer for the downloadable pass
src/components/           Sections, the event visual system, and the registration flow
src/app/                  Routes: /, /events, /events/[slug], /register, /privacy, /terms
```

### Before going live

`src/config/site.ts` ships with **placeholder payment details** (`youthconclave@upi`).
Replace `payment.upiId`, `payment.payeeName` and `payment.cashCounter` with the union's
real values — `upiId` is printed on screen and encoded into the payment QR.

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

- **No stock photography.** Each event kind gets a generated SVG visual
  (`src/components/event-visual.tsx`) — a ramp, argument blocks, a waveform, an idea
  graph, a woven geometric border, an aperture. They are a couple of kilobytes each,
  scale to any block, and animate on transform and opacity only.
- **Two hero compositions.** Below `lg` the wordmark stacks and runs edge to edge; from
  `lg` the year moves up beside YOUTH and CONCLAVE overruns the right edge.
- **Custom classes sit in `@layer components`** so Tailwind utilities can still override
  them. Unlayered rules would win against every utility.
- **Motion respects `prefers-reduced-motion`**, and the custom cursor, pointer-tracked
  gradient and page-transition wipe never mount for touch or reduced-motion users.
