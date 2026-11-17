import { cn } from "@/lib/utils";

export function Card({
  className,
  hover,
  children,
  style,
  onClick,
  role,
  tabIndex,
  onKeyDown,
}: {
  className?: string;
  hover?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cn("card", hover && "card-hover", className)}
      style={style}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}

/** Stat tile: label · value · optional note. Proportional figures by design. */
export function Stat({
  label,
  value,
  note,
  className,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  note?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card p-4 sm:p-5", className)}>
      <div className="eyebrow">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{value}</div>
      {note && <div className="mt-1 text-xs text-ink-400">{note}</div>}
    </div>
  );
}
