import { cn } from "@/lib/utils";

/** The tiny `01 / Events ————` marker that sits above every section. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 opacity-60", className)}>
      <span className="label tabular">{index}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      <span className="label">{children}</span>
    </div>
  );
}

export function StatusDot({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="pulse-dot size-1.5 rounded-full bg-accent" />
      <span className="label">{label}</span>
    </span>
  );
}
