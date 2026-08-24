"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ConclaveEvent, EventKind } from "@/data/events";
import { cn, assetPath } from "@/lib/utils";

type ArtProps = { active: boolean; accent: string };

/**
 * Every event carries its own background rather than a shared photograph:
 * a tinted field, a texture built from the event itself, and line art on top.
 * All of it is SVG — a couple of kilobytes, scales to any block, and animates
 * on transform, opacity and path length only.
 *
 * Set `image` on an event and that photograph takes over instead, everywhere
 * the event appears.
 */
export function EventVisual({
  event,
  active,
  className,
}: {
  event: ConclaveEvent;
  active: boolean;
  className?: string;
}) {
  const { kind, accent, image } = event;
  const Art = artwork[kind];

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Field kind={kind} accent={accent} active={active} />
      {image ? (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active ? 1 : 0.55, scale: active ? 1.03 : 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={assetPath(image.src)}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      ) : (
        <Art active={active} accent={accent} />
      )}
    </div>
  );
}

/** Where each event's tint sits, so no two blocks light up the same way. */
const fieldOrigin: Record<EventKind, string> = {
  beats: "20% 90%",
  seminar: "78% 22%",
  ink: "30% 20%",
  shutter: "50% 50%",
  fashion: "62% 100%",
};

function Field({ kind, accent, active }: ArtProps & { kind: EventKind }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: active ? 0.5 : 0.22 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: `radial-gradient(70% 90% at ${fieldOrigin[kind]}, ${accent}, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px)",
          backgroundSize: "12.5% 100%",
        }}
      />
    </>
  );
}

const svgProps = {
  viewBox: "0 0 400 300",
  preserveAspectRatio: "xMidYMid slice",
  className: "absolute inset-0 size-full",
} as const;

const ease = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- beats -- */

const bars = Array.from({ length: 34 }, (_, i) => i);

/** Instrumental: sound rippling out of a waveform that never quite settles. */
function Beats({ active, accent }: ArtProps) {
  return (
    <svg {...svgProps} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx={40}
          cy={280}
          r={70 + i * 62}
          fill="none"
          stroke={accent}
          strokeWidth={1}
          initial={false}
          animate={{ opacity: active ? 0.32 - i * 0.05 : 0.14, scale: active ? 1.04 : 1 }}
          transition={{ duration: 1, delay: i * 0.06, ease }}
          style={{ transformOrigin: "40px 280px" }}
        />
      ))}
      {bars.map((i) => {
        const seed = Math.abs(Math.sin(i * 1.7)) * 0.85 + 0.15;
        const height = seed * (active ? 190 : 84);
        return (
          <motion.rect
            key={i}
            x={12 + i * 11.4}
            width={5}
            rx={2.5}
            fill={accent}
            initial={false}
            animate={{
              height: [height * 0.45, height, height * 0.6],
              y: [150 - height * 0.22, 150 - height / 2, 150 - height * 0.3],
              opacity: active ? 0.95 : 0.4,
            }}
            transition={{
              duration: 1.1 + (i % 5) * 0.22,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------- seminar -- */

const seats = Array.from({ length: 4 }, (_, row) =>
  Array.from({ length: 11 }, (_, col) => [row, col] as const),
).flat();

/** Paper presentation: a slide, a beam, and a room that is listening. */
function Seminar({ active, accent }: ArtProps) {
  return (
    <svg {...svgProps} aria-hidden>
      {/* projection beam */}
      <motion.path
        d="M188 214 L152 118 L330 118 L286 214 Z"
        fill={accent}
        initial={false}
        animate={{ opacity: active ? 0.12 : 0.04 }}
        transition={{ duration: 0.6, ease }}
      />
      {/* the slide */}
      <motion.g
        initial={false}
        animate={{ y: active ? -6 : 0, opacity: active ? 1 : 0.45 }}
        transition={{ duration: 0.7, ease }}
      >
        <rect
          x={150}
          y={34}
          width={186}
          height={112}
          rx={6}
          fill={accent}
          fillOpacity={0.1}
          stroke={accent}
          strokeWidth={1}
        />
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={168}
            y={58 + i * 20}
            height={5}
            rx={2.5}
            fill={accent}
            initial={{ width: 0 }}
            animate={{ width: [126, 96, 142, 74][i] }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease }}
          />
        ))}
      </motion.g>
      {/* lectern */}
      <motion.g
        initial={false}
        animate={{ opacity: active ? 0.95 : 0.4 }}
        transition={{ duration: 0.6, ease }}
      >
        {/* speaker */}
        <circle cx={84} cy={168} r={13} fill={accent} fillOpacity={0.65} />
        <path d="M66 214 C 66 192, 102 192, 102 214 Z" fill={accent} fillOpacity={0.45} />
        {/* lectern */}
        <rect x={54} y={214} width={60} height={11} rx={4} fill={accent} />
        <path d="M64 225 L104 225 L98 300 L70 300 Z" fill={accent} fillOpacity={0.3} />
      </motion.g>
      {/* the room */}
      {seats.map(([row, col], i) => (
        <motion.circle
          key={i}
          cx={168 + col * 19}
          cy={222 + row * 22}
          r={4}
          fill={accent}
          initial={false}
          animate={{ opacity: active ? 0.55 - row * 0.07 : 0.16, y: active ? -2 : 0 }}
          transition={{ duration: 0.5, delay: i * 0.008, ease }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ ink -- */

const strokes = [
  { d: "M40 236 C 96 150, 120 92, 176 64", w: 7 },
  { d: "M74 262 C 150 214, 214 196, 300 150", w: 3.5 },
  { d: "M26 150 C 86 132, 128 168, 214 116", w: 2 },
  { d: "M204 268 C 258 232, 286 196, 372 178", w: 5 },
];

/** Drawing: strokes laid down wet, blots and all. */
function Ink({ active, accent }: ArtProps) {
  return (
    <svg {...svgProps} aria-hidden>
      {/* ruled sheet */}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={0}
          x2={400}
          y1={20 + i * 34}
          y2={20 + i * 34}
          stroke={accent}
          strokeWidth={0.6}
          opacity={0.14}
        />
      ))}
      {strokes.map((stroke, i) => (
        <motion.path
          key={i}
          d={stroke.d}
          fill="none"
          stroke={accent}
          strokeWidth={stroke.w}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: active ? 0.9 : 0.35,
            x: active ? (i % 2 ? 8 : -8) : 0,
          }}
          transition={{ duration: 1.1, delay: i * 0.12, ease }}
        />
      ))}
      {[
        [312, 232, 13],
        [128, 96, 8],
        [246, 84, 5],
      ].map(([cx, cy, r], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          fill={accent}
          initial={false}
          animate={{ r: active ? r : r * 0.6, opacity: active ? 0.8 : 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
        />
      ))}
      {/* nib */}
      <motion.path
        d="M352 44 L372 84 L332 84 Z"
        fill="none"
        stroke={accent}
        strokeWidth={1.6}
        initial={false}
        animate={{ opacity: active ? 0.85 : 0.25, rotate: active ? -8 : 0 }}
        transition={{ duration: 0.7, ease }}
        style={{ transformOrigin: "352px 64px" }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------- shutter -- */

const blades = Array.from({ length: 6 }, (_, i) => i);
const sprockets = Array.from({ length: 7 }, (_, i) => i);

/** Photography: an aperture closing down between two strips of film. */
function Shutter({ active, accent }: ArtProps) {
  return (
    <svg {...svgProps} aria-hidden>
      {sprockets.map((i) =>
        [10, 378].map((x) => (
          <motion.rect
            key={`${x}-${i}`}
            x={x}
            y={14 + i * 41}
            width={12}
            height={20}
            rx={3}
            fill={accent}
            initial={false}
            animate={{ opacity: active ? 0.5 : 0.18 }}
            transition={{ duration: 0.5, delay: i * 0.03, ease }}
          />
        )),
      )}
      <motion.g
        initial={false}
        animate={{ rotate: active ? 26 : 0, scale: active ? 1.06 : 1 }}
        transition={{ duration: 0.9, ease }}
        style={{ transformOrigin: "200px 150px" }}
      >
        {blades.map((i) => (
          <motion.path
            key={i}
            d="M 200 62 L 276 106 L 200 150 Z"
            fill={accent}
            initial={false}
            animate={{ opacity: active ? 0.24 + i * 0.05 : 0.12 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            style={{ transformOrigin: "200px 150px", rotate: `${i * 60}deg` }}
          />
        ))}
      </motion.g>
      <g stroke={accent} strokeWidth={1.4} fill="none">
        {[
          "M62 62 L62 94 M62 62 L94 62",
          "M338 62 L338 94 M338 62 L306 62",
          "M62 238 L62 206 M62 238 L94 238",
          "M338 238 L338 206 M338 238 L306 238",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={false}
            animate={{ opacity: active ? 0.9 : 0.25, scale: active ? 1 : 0.9 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease }}
            style={{ transformOrigin: "200px 150px" }}
          />
        ))}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------- fashion -- */

/** Fashion show: draped silhouettes crossing a lit ramp. */
function Fashion({ active, accent }: ArtProps) {
  return (
    <svg {...svgProps} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={`beam-${i}`}
          d={`M ${58 + i * 98} 0 L ${20 + i * 98} 300 L ${96 + i * 98} 300 Z`}
          fill={accent}
          initial={false}
          animate={{ opacity: active ? 0.12 : 0.05 }}
          transition={{ duration: 0.7, delay: i * 0.05, ease }}
        />
      ))}
      <g stroke={accent} fill="none" strokeWidth={1.1}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.path
            key={i}
            d={`M ${40 + i * 44} 300 C ${20 + i * 44} 190, ${70 + i * 44} 150, ${44 + i * 44} 40`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: active ? 0.85 : 0.3,
              x: active ? Math.sin(i) * 10 : 0,
            }}
            transition={{ duration: 0.9, delay: i * 0.04, ease }}
          />
        ))}
      </g>
      {/* the ramp */}
      <motion.rect
        y={228}
        width={400}
        height={2}
        fill={accent}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, opacity: active ? 1 : 0.35 }}
        transition={{ duration: 0.8, ease }}
        style={{ transformOrigin: "0px 229px" }}
      />
    </svg>
  );
}

const artwork: Record<EventKind, (props: ArtProps) => React.JSX.Element> = {
  beats: Beats,
  seminar: Seminar,
  ink: Ink,
  shutter: Shutter,
  fashion: Fashion,
};
