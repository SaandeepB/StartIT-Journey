import { cn } from "@/lib/utils";

export function SectionHeading({
  number,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  number?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center")}>
        {number && (
          <>
            <span className="text-ink-500">{number}</span>
            <span className="h-px w-6 bg-electric-400/50" aria-hidden />
          </>
        )}
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {intro && <div className="mt-4 text-base leading-relaxed text-ink-300 sm:text-lg">{intro}</div>}
    </div>
  );
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

/** Small uppercase label used above field groups. */
export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("eyebrow", className)}>{children}</div>;
}
