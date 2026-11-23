"use client";

import { GraduationCap, Sparkles } from "lucide-react";
import { useContent } from "../ContentContext";
import { Badge } from "@/components/ui/Badge";
import { Block } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { hasText } from "@/lib/content/helpers";
import type { BeyondItem } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

function Photos({ images, large }: { images: BeyondItem["images"]; large?: boolean }) {
  const shown = images.filter((img) => hasText(img.url));
  if (shown.length === 0) return null;
  return (
    <div className={cn("grid gap-3", shown.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
      {shown.map((img, i) => (
        <figure key={i} className="overflow-hidden rounded-xl border border-white/8 bg-white/[0.02]">
          <a href={img.url} target="_blank" rel="noreferrer" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption || ""}
              loading="lazy"
              className={cn("w-full object-cover transition hover:brightness-110", large ? "aspect-square" : "aspect-video")}
            />
          </a>
          {hasText(img.caption) && (
            <figcaption className="px-3.5 py-2.5 text-xs text-ink-400">
              <Text>{img.caption}</Text>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function SampleBadge({ item }: { item: BeyondItem }) {
  const content = useContent();
  return item.isSample && content.settings.showSampleBadges ? <Badge variant="sample">Sample</Badge> : null;
}

export function Beyond() {
  const content = useContent();
  const activities = content.beyond.filter((b) => b.kind === "activity");
  const memories = content.beyond.filter((b) => b.kind === "memory");
  if (activities.length + memories.length === 0) return null;

  return (
    <Block
      id="beyond"
      part
      eyebrow="Beyond the rotations"
      title="What I took on outside my three teams."
      intro="Roles I picked up alongside the rotations, and the moment I remember most."
    >
      {activities.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {activities.map((a, i) => (
            <article key={i} className="card flex flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-500/15 text-electric-300">
                  <GraduationCap className="h-4 w-4" />
                </span>
                {hasText(a.context) && (
                  <span className="text-xs text-ink-400">
                    <Text>{a.context}</Text>
                  </span>
                )}
                <SampleBadge item={a} />
              </div>
              <h4 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white">
                <Text>{a.title}</Text>
              </h4>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-300">
                <Paragraphs text={a.description} />
              </div>
              {a.images.some((img) => hasText(img.url)) && (
                <div className="mt-5">
                  <Photos images={a.images} />
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {memories.map((m, i) => (
        <article key={i} className="card relative mt-6 overflow-hidden p-6 sm:p-8">
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-electric-400 to-violet-400" aria-hidden />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="eyebrow">Best memory</span>
                <SampleBadge item={m} />
              </div>
              <h4 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-white">
                <Text>{m.title}</Text>
              </h4>
              {hasText(m.context) && (
                <div className="mt-1 text-sm text-ink-400">
                  <Text>{m.context}</Text>
                </div>
              )}
              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-200">
                <Paragraphs text={m.description} />
              </div>
            </div>
            <div className="lg:col-span-7">
              <Photos images={m.images} large />
            </div>
          </div>
        </article>
      ))}
    </Block>
  );
}
