"use client";

import { Compass, Milestone, Trophy } from "lucide-react";
import { useContent } from "../ContentContext";
import { Badge } from "@/components/ui/Badge";
import { Label } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { MOMENT_TYPE, hasText, momentsFor } from "@/lib/content/helpers";
import type { Moment } from "@/lib/content/schema";

type MomentType = Moment["type"];

const ORDER: MomentType[] = ["high", "low", "turning"];

const icon: Record<MomentType, React.ReactNode> = {
  high: <Trophy className="h-4 w-4" />,
  low: <Compass className="h-4 w-4" />,
  turning: <Milestone className="h-4 w-4" />,
};

const lessonLabel: Record<MomentType, string> = {
  high: "What it showed me",
  low: "How I adapted",
  turning: "What changed",
};

const tone: Record<MomentType, string> = {
  high: "text-electric-300 bg-electric-500/15",
  low: "text-ink-200 bg-white/[0.08]",
  turning: "text-violet-300 bg-violet-500/15",
};

export function MomentCard({ moment }: { moment: Moment }) {
  const content = useContent();
  return (
    <article className="card flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`flex h-7 w-7 items-center justify-center rounded-full ${tone[moment.type]}`}>{icon[moment.type]}</span>
        <span className="eyebrow">{MOMENT_TYPE[moment.type].singular}</span>
        {moment.isSample && content.settings.showSampleBadges && <Badge variant="sample">Sample</Badge>}
      </div>
      <h4 className="mt-3 text-base font-semibold leading-snug tracking-tight text-white">
        <Text>{moment.title}</Text>
      </h4>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-300">
        <Paragraphs text={moment.description} />
      </div>
      {hasText(moment.lesson) && (
        <div className="mt-auto pt-4">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3.5">
            <Label>{lessonLabel[moment.type]}</Label>
            <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-ink-100">
              <Paragraphs text={moment.lesson} />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

/** Highs, lows and turning points for one rotation, in that order. */
export function RotationMoments({ rotationId }: { rotationId: string }) {
  const content = useContent();
  const items = momentsFor(content, rotationId).sort((a, b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type));
  if (items.length === 0) return null;
  return (
    <div>
      <Label>Highs, lows &amp; turning points</Label>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((m, i) => (
          <MomentCard key={i} moment={m} />
        ))}
      </div>
    </div>
  );
}
