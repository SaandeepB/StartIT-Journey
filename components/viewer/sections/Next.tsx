"use client";

import { useContent } from "../ContentContext";
import { Block, Label } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { hasText, rotationColor } from "@/lib/content/helpers";
import { Connecting } from "./Connecting";
import { Role } from "./Role";

function Ranking() {
  const content = useContent();
  const ranked = content.rotations
    .map((r, index) => ({ r, index }))
    .filter(({ r }) => r.rank != null)
    .sort((a, b) => (a.r.rank ?? 0) - (b.r.rank ?? 0));
  if (ranked.length === 0) return null;

  return (
    <div className="mt-16">
      <Label>My rotation ranking</Label>
      <ol className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {ranked.map(({ r, index }) => (
          <li key={r.id} className="card relative overflow-hidden p-5">
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: rotationColor(index) }} aria-hidden />
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl font-semibold text-white">#{r.rank}</span>
              <span className="eyebrow">Rotation {index + 1}</span>
            </div>
            <div className="mt-2 text-base font-semibold leading-snug text-white">
              <Text>{r.teamName}</Text>
            </div>
            {hasText(r.rankReason) && (
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-300">
                <Paragraphs text={r.rankReason} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Next() {
  return (
    <Block
      id="next"
      number="05"
      eyebrow="What's Next"
      title="Where I can create the most value next."
      intro="What the three rotations add up to, which team I'd choose, and the role I'm aiming for."
    >
      <Ranking />
      <Connecting part />
      <Role part />
    </Block>
  );
}
