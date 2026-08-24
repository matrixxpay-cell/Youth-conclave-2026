import Image from "next/image";
import { collegeLogo, conclaveLogo, site } from "@/config/site";
import { cn, assetPath } from "@/lib/utils";

/**
 * The full conclave lockup. It carries the wordmark, the year and the tagline,
 * so it is only ever used at a width where those can actually be read — the
 * hero and the footer. Anywhere smaller gets `ConclaveMark` instead.
 *
 * The artwork is a rectangle with its own painted background, so it sits on a
 * rounded plate with a hairline rather than floating loose on the dark ground.
 */
export function ConclaveLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "block overflow-hidden rounded-lg ring-1 ring-paper/15",
        "shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <Image
        src={assetPath(conclaveLogo.banner.src)}
        alt={conclaveLogo.banner.alt}
        width={conclaveLogo.banner.width}
        height={conclaveLogo.banner.height}
        priority
        className="h-auto w-full"
      />
    </span>
  );
}

/** The square Y-over-the-window crop, for navigation and other small slots. */
export function ConclaveMark({ className }: { className?: string }) {
  return (
    <Image
      src={assetPath(conclaveLogo.mark.src)}
      alt=""
      aria-hidden
      width={conclaveLogo.mark.width}
      height={conclaveLogo.mark.height}
      className={cn("rounded-[0.3rem] object-cover", className)}
    />
  );
}

/**
 * The college emblem. Until `collegeLogo` points at the real file this is a
 * plain monogram standing in for it — deliberately generic rather than an
 * invented crest.
 */
export function CollegeMark({ className }: { className?: string }) {
  if (collegeLogo) {
    return (
      <Image
        src={assetPath(collegeLogo.src)}
        alt={collegeLogo.alt}
        width={collegeLogo.width}
        height={collegeLogo.height}
        className={cn("object-contain", className)}
      />
    );
  }

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

/**
 * The conclave's logo over the line saying whose initiative it is. Opens the
 * landing page and closes the footer.
 */
export function LogoLockup({
  className,
  width = "w-[min(58vw,12.5rem)]",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5",
        className,
      )}
    >
      <ConclaveLogo className={cn(width, "shrink-0")} />
      <span aria-hidden className="hidden h-12 w-px bg-current opacity-15 sm:block" />
      <div className="flex items-center gap-3">
        <CollegeMark className="size-7 shrink-0 opacity-70" />
        <p className="label leading-relaxed opacity-55">
          An initiative by
          <br />
          <span className="opacity-80">
            {site.college} {site.collegeSuffix}
          </span>
        </p>
      </div>
    </div>
  );
}
