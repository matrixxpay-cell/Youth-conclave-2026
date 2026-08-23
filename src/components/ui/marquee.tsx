import { cn } from "@/lib/utils";

/**
 * Duplicated track scrolled with a single CSS transform — no JS on the main
 * thread, and it keeps running while the rest of the page is idle.
 */
export function Marquee({
  items,
  className,
  duration = 40,
  separator = "◆",
}: {
  items: string[];
  className?: string;
  duration?: number;
  separator?: string;
}) {
  const track = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className="animate-marquee flex shrink-0 items-center whitespace-nowrap"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="label px-5 py-3">{item}</span>
            <span aria-hidden className="text-[0.5rem] opacity-40">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
