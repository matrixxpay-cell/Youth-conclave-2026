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

**Logos.** The conclave's own artwork is in place — `public/youth-conclave-logo.webp`
is the full lockup, used at the top of the landing page and in the footer, and
`public/youth-conclave-mark.webp` is a square crop of the Y-over-the-window for
navigation and the browser tab, where the full banner would be a smudge. Both are
declared in `conclaveLogo` in `src/config/site.ts`.

The **college emblem is still a stand-in**: `collegeLogo` in that same file is
`null`, so a plain `B` monogram renders instead. Drop the real file into
`/public` and fill it in:

```ts
export const collegeLogo: LogoAsset | null = {
  src: "/b-borooah-college.png", alt: "B. Borooah College", width: 512, height: 512,
};
```

**Payment.** `src/config/site.ts` also ships **placeholder payment details**
(`youthconclave@upi`). Replace `payment.upiId`, `payment.payeeName` and
`payment.cashCounter` with the union's real values — `upiId` is printed on screen and
encoded into the payment QR.

## Deploying

Two workflows live in `.github/workflows`:

- **CI** runs lint, typecheck and build on every pull request.
- **Deploy to GitHub Pages** builds a static export and publishes it.

### Turning Pages on (once, by a repository admin)

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

This step cannot be automated. The Actions token may deploy to Pages but not
create the Pages site — `actions/configure-pages` with `enablement: true` fails
with *Resource not accessible by integration*. Until an admin sets it, the
deploy job fails at its first step with *Get Pages site failed*.

Once it is set, re-run the failed job from the Actions tab; no new commit is
needed. The site lands at `https://<owner>.github.io/<repo>/`. Pages is free on
public repositories; a private one needs a paid plan.

It publishes from `main` and from `claude/**` branches, so the site can be looked
at before it merges — drop that second pattern from `deploy-pages.yml` once only
`main` should go live.

### How the static build works

`STATIC_EXPORT=1` switches `next.config.ts` to `output: "export"` with
`trailingSlash`, so `/events/beats/` resolves to an `index.html` on a plain file
host. `BASE_PATH` prefixes routes and assets for a project page served from
`/<repo>`; the workflow passes whatever `actions/configure-pages` reports. Neither
variable is set for `npm run dev` or `npm run build`, so a Node host (Vercel and
friends) gets an ordinary server build with no configuration at all.

Every route prerenders, `/register` included — it reads `?event=` and `?ref=` on
the client, inside a `Suspense` boundary, rather than from the server.

To reproduce the Pages build locally:

```bash
STATIC_EXPORT=1 BASE_PATH=/Youth-conclave-2026 npm run build
# serve ./out from a directory named Youth-conclave-2026
```

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
