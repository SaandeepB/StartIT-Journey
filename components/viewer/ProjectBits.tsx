"use client";

import { Lightbulb, Puzzle, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import { useContent, useSettings } from "./ContentContext";
import { OWNERSHIP, rotationColor, rotationIndex, rotationShort } from "@/lib/content/helpers";
import type { Metric, Ownership } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

const ownershipVariant: Record<Ownership, "accent" | "violet" | "neutral" | "outline"> = {
  owned: "accent",
  contributed: "violet",
  collaborated: "neutral",
  identified: "outline",
};

const ownershipIcon: Record<Ownership, React.ReactNode> = {
  owned: <UserCheck className="h-3 w-3" />,
  contributed: <Puzzle className="h-3 w-3" />,
  collaborated: <Users className="h-3 w-3" />,
  identified: <Lightbulb className="h-3 w-3" />,
};

export function OwnershipBadge({ ownership, long }: { ownership: Ownership; long?: boolean }) {
  const o = OWNERSHIP[ownership];
  return (
    <Badge
      variant={ownershipVariant[ownership]}
      icon={ownershipIcon[ownership]}
      title={o.description}
      className={cn(ownership === "identified" && "border-dashed")}
    >
      {long ? o.label : o.short}
    </Badge>
  );
}

export function RotationBadge({ rotationId, withName = true }: { rotationId: string | undefined; withName?: boolean }) {
  const content = useContent();
  const idx = rotationIndex(content, rotationId);
  const rotation = content.rotations[idx];
  if (!rotation) return <Badge variant="outline">Across rotations</Badge>;
  return (
    <Badge variant="outline" color={rotationColor(idx)}>
      <span className="font-mono">{rotationShort(idx)}</span>
      {withName && (
        <>
          <span className="text-ink-500">·</span>
          <span className="max-w-[12rem] truncate">
            <Text>{rotation.teamName}</Text>
          </span>
        </>
      )}
    </Badge>
  );
}

/** A metric tile that is honest about missing values. */
export function MetricTile({ metric, compact }: { metric: Metric; compact?: boolean }) {
  const settings = useSettings();
  const empty = !metric.value.trim();
  if (empty && !settings.showMetricsWithoutValues) return null;
  return (
    <div className={cn("card", compact ? "p-3" : "p-4", empty && "border-dashed")}>
      <div className="eyebrow leading-snug" title={metric.label}>
        <Text>{metric.label}</Text>
      </div>
      {empty ? (
        <div className={cn("mt-1.5 italic text-ink-500", compact ? "text-sm" : "text-base")}>To be measured</div>
      ) : (
        <div className={cn("mt-1.5 font-semibold tracking-tight text-white", compact ? "text-lg" : "text-2xl")}>
          <Text>{metric.value}</Text>
        </div>
      )}
      {metric.note && <div className="mt-1 text-[11px] text-ink-500">{metric.note}</div>}
    </div>
  );
}

export function Chips({ items, max, className }: { items: string[]; max?: number; className?: string }) {
  const shown = max ? items.slice(0, max) : items;
  const rest = max ? items.length - shown.length : 0;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((t, i) => (
        <span key={i} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-ink-200">
          <Text>{t}</Text>
        </span>
      ))}
      {rest > 0 && <span className="px-1 text-xs text-ink-500">+{rest}</span>}
    </div>
  );
}
