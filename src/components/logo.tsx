import Image from "next/image";
import { logos, site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The conclave mark: a filled core inside an open ring, split by a horizon —
 * a sun coming up over the Brahmaputra, reduced to two strokes. Replaced by the
 * real artwork as soon as `logos.conclave` points at a file.
 */
export function ConclaveMark({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  if (logos.conclave) return <MarkImage asset={logos.conclave} className={className} />;

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

/**
 * The college mark. Until `logos.college` points at the real emblem this is a
 * plain monogram standing in for it — deliberately generic rather than an
 * invented crest.
 */
export function CollegeMark({ className }: { className?: string }) {
  if (logos.college) return <MarkImage asset={logos.college} className={className} />;

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeOpacity="0.4" />
      <text
        x="16"
        y="22.5"
        textAnchor="middle"
        className="font-display"
        fontSize="17"
        fontWeight="700"
        letterSpacing="-0.03em"
        fill="currentColor"
      >
        B
      </text>
    </svg>
  );
}

function MarkImage({ asset, className }: { asset: NonNullable<typeof logos.college>; className?: string }) {
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      className={cn("h-full w-auto object-contain", className)}
    />
  );
}

/**
 * College mark and conclave mark side by side, over the line that says how the
 * two relate. This is the site's primary attribution lockup — it opens the
 * landing page and closes the footer.
 */
export function LogoLockup({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const mark = size === "sm" ? "size-7" : "size-9 sm:size-11";

  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <CollegeMark className={cn(mark, "shrink-0 opacity-80")} />
        <span aria-hidden className="h-7 w-px bg-current opacity-20 sm:h-9" />
        <ConclaveMark className={cn(mark, "shrink-0 text-accent")} />
      </div>
      <p className="label leading-relaxed opacity-55">
        An initiative by
        <br />
        <span className="opacity-80">
          {site.college} {site.collegeSuffix}
        </span>
      </p>
    </div>
  );
}
