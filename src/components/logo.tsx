import { cn } from "@/lib/utils";

/**
 * The conclave mark: a filled core inside an open ring, split by a horizon —
 * a sun coming up over the Brahmaputra, reduced to two strokes.
 */
export function Logo({ className, spin = false }: { className?: string; spin?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn(spin && "motion-safe:animate-[spin_18s_linear_infinite]", className)}
    >
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M1.5 16a14.5 14.5 0 0 1 29 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="5.5" fill="currentColor" />
    </svg>
  );
}
