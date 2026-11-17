import { cn } from "@/lib/utils";

type Variant =
  | "neutral"
  | "accent"
  | "violet"
  | "outline"
  | "good"
  | "warning"
  | "serious"
  | "critical"
  | "sample";

const styles: Record<Variant, string> = {
  neutral: "bg-white/[0.06] text-ink-200 border-white/10",
  accent: "bg-electric-500/15 text-electric-300 border-electric-400/30",
  violet: "bg-violet-500/15 text-violet-300 border-violet-400/30",
  outline: "bg-transparent text-ink-200 border-white/15",
  good: "bg-good/15 text-ink-100 border-good/40",
  warning: "bg-warning/15 text-ink-100 border-warning/40",
  serious: "bg-serious/15 text-ink-100 border-serious/40",
  critical: "bg-critical/15 text-ink-100 border-critical/40",
  sample: "bg-warning/10 text-ink-200 border-dashed border-warning/50",
};

export function Badge({
  variant = "neutral",
  color,
  icon,
  children,
  className,
  title,
}: {
  variant?: Variant;
  /** Optional swatch colour (e.g. rotation colour) shown as a dot before the text. */
  color?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-5 whitespace-nowrap",
        styles[variant],
        className,
      )}
    >
      {color && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} aria-hidden />}
      {icon}
      {children}
    </span>
  );
}

export function Dot({ color, className, size = 8 }: { color: string; className?: string; size?: number }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 rounded-full", className)}
      style={{ background: color, width: size, height: size }}
    />
  );
}
