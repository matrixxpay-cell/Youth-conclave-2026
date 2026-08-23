"use client";

import { motion } from "framer-motion";
import type { EventKind } from "@/data/events";
import { cn } from "@/lib/utils";

type VisualProps = { active: boolean; accent: string; className?: string };

/**
 * Every event gets its own generated visual instead of a stock photograph —
 * drawn as SVG so it is a couple of kilobytes, scales to any block size, and
 * animates on transform/opacity only.
 */
export function EventVisual({
  kind,
  active,
  accent,
  className,
}: VisualProps & { kind: EventKind }) {
  const Visual = visuals[kind];
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Visual active={active} accent={accent} />
    </div>
  );
}

const svgProps = {
  viewBox: "0 0 400 300",
  preserveAspectRatio: "xMidYMid slice",
  className: "size-full",
} as const;

/** Fashion — draped silhouettes crossing a ramp line. */
function Fashion({ active, accent }: VisualProps) {
  return (
    <svg {...svgProps} aria-hidden>
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
            transition={{ duration: 0.9, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "0px 229px" }}
      />
    </svg>
  );
}

/** Debate — two blocks of argument passing the floor back and forth. */
function Debate({ active, accent }: VisualProps) {
  return (
    <svg {...svgProps} aria-hidden>
      <motion.g
        initial={false}
        animate={{ x: active ? 12 : 0, opacity: active ? 1 : 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x={26} y={54} width={150} height={86} rx={10} fill={accent} opacity={0.16} />
        <path d="M54 140 L54 168 L82 140 Z" fill={accent} opacity={0.16} />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={46}
            y={76 + i * 18}
            width={[110, 92, 66][i]}
            height={5}
            rx={2.5}
            fill={accent}
          />
        ))}
      </motion.g>
      <motion.g
        initial={false}
        animate={{ x: active ? -12 : 0, opacity: active ? 1 : 0.4 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x={220} y={150} width={154} height={86} rx={10} fill={accent} opacity={0.16} />
        <path d="M346 236 L346 264 L318 236 Z" fill={accent} opacity={0.16} />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={240}
            y={172 + i * 18}
            width={[70, 114, 96][i]}
            height={5}
            rx={2.5}
            fill={accent}
          />
        ))}
      </motion.g>
    </svg>
  );
}

const bars = Array.from({ length: 34 }, (_, i) => i);

/** Music — a waveform that keeps breathing even when idle. */
function Music({ active, accent }: VisualProps) {
  return (
    <svg {...svgProps} aria-hidden>
      {bars.map((i) => {
        const seed = Math.abs(Math.sin(i * 1.7)) * 0.85 + 0.15;
        const height = seed * (active ? 190 : 80);
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
              opacity: active ? 0.9 : 0.35,
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

const nodes = [
  [70, 80], [160, 46], [252, 96], [332, 60],
  [46, 190], [136, 156], [232, 208], [330, 172],
  [186, 258], [286, 268],
] as const;
const edges = [
  [0, 1], [1, 2], [2, 3], [0, 5], [1, 5], [4, 5],
  [5, 6], [2, 6], [6, 7], [3, 7], [6, 8], [8, 9], [7, 9],
] as const;

/** Startup — an idea graph wiring itself together. */
function Startup({ active, accent }: VisualProps) {
  return (
    <svg {...svgProps} aria-hidden>
      <g stroke={accent} strokeWidth={1}>
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: active ? 0.7 : 0.22 }}
            transition={{ duration: 0.7, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </g>
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          fill={accent}
          initial={false}
          animate={{ r: active ? 5 : 3, opacity: active ? 1 : 0.45 }}
          transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}

/**
 * Cultural — a geometric border motif in the spirit of the woven bands on a
 * mekhela sador, redrawn as plain geometry rather than copied from a textile.
 */
function Cultural({ active, accent }: VisualProps) {
  const cols = Array.from({ length: 9 }, (_, i) => i);
  const rows = Array.from({ length: 5 }, (_, i) => i);
  return (
    <svg {...svgProps} aria-hidden>
      {rows.map((row) =>
        cols.map((col) => {
          const i = row * 9 + col;
          const cx = 24 + col * 44;
          const cy = 34 + row * 60;
          return (
            <motion.g
              key={i}
              initial={false}
              animate={{
                opacity: active ? (row % 2 ? 0.95 : 0.55) : 0.28,
                scale: active ? 1 : 0.78,
              }}
              transition={{ duration: 0.6, delay: i * 0.012, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <path
                d={`M ${cx} ${cy - 15} L ${cx + 15} ${cy} L ${cx} ${cy + 15} L ${cx - 15} ${cy} Z`}
                fill={row % 2 ? accent : "none"}
                stroke={accent}
                strokeWidth={1}
              />
              <path
                d={`M ${cx} ${cy - 6} L ${cx + 6} ${cy} L ${cx} ${cy + 6} L ${cx - 6} ${cy} Z`}
                fill={row % 2 ? "none" : accent}
              />
            </motion.g>
          );
        }),
      )}
    </svg>
  );
}

/** Photo & film — an aperture closing down with focus brackets. */
function Lens({ active, accent }: VisualProps) {
  const blades = Array.from({ length: 6 }, (_, i) => i);
  return (
    <svg {...svgProps} aria-hidden>
      <motion.g
        initial={false}
        animate={{ rotate: active ? 26 : 0, scale: active ? 1.06 : 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "200px 150px" }}
      >
        {blades.map((i) => (
          <motion.path
            key={i}
            d="M 200 62 L 276 106 L 200 150 Z"
            fill={accent}
            initial={false}
            animate={{ opacity: active ? 0.22 + i * 0.05 : 0.12 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            style={{ transformOrigin: "200px 150px", rotate: `${i * 60}deg` }}
          />
        ))}
      </motion.g>
      <g stroke={accent} strokeWidth={1.4} fill="none" opacity={0.7}>
        {[
          "M 60 60 L 60 92 M 60 60 L 92 60",
          "M 340 60 L 340 92 M 340 60 L 308 60",
          "M 60 240 L 60 208 M 60 240 L 92 240",
          "M 340 240 L 340 208 M 340 240 L 308 240",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={false}
            animate={{ opacity: active ? 0.9 : 0.25, scale: active ? 1 : 0.9 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            style={{ transformOrigin: "200px 150px" }}
          />
        ))}
      </g>
    </svg>
  );
}

const visuals: Record<EventKind, (props: VisualProps) => React.JSX.Element> = {
  fashion: Fashion,
  debate: Debate,
  music: Music,
  startup: Startup,
  cultural: Cultural,
  lens: Lens,
};
