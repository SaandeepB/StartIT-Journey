"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Milestone, Trophy } from "lucide-react";
import { useContent } from "../ContentContext";
import { RotationBadge } from "../ProjectBits";
import { Badge } from "@/components/ui/Badge";
import { Container, Label, SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { Paragraphs, Text } from "@/components/ui/Text";
import { MOMENT_TYPE, hasText } from "@/lib/content/helpers";
import type { Moment } from "@/lib/content/schema";

type MomentType = Moment["type"];

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

export function Moments() {
  const content = useContent();
  const [type, setType] = useState<MomentType>("high");
  const items = content.moments.filter((m) => m.type === type);

  return (
    <section id="moments" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          number="06"
          eyebrow="Highs, Lows and Turning Points"
          title="What the Job Description Didn't Teach Me."
          intro="The parts of the programme that shaped how I work: the projects I am proud of, the ones that did not go to plan, and the moments that changed my approach."
        />

        <div className="mt-10">
          <Tabs
            tabs={(Object.keys(MOMENT_TYPE) as MomentType[]).map((t) => ({
              id: t,
              label: MOMENT_TYPE[t].label,
              count: content.moments.filter((m) => m.type === t).length,
            }))}
            value={type}
            onChange={setType}
            ariaLabel="Moment type"
          />
          <p className="mt-3 text-sm text-ink-400">{MOMENT_TYPE[type].intro}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {items.map((m, i) => (
              <article key={i} className="card flex h-full flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full ${tone[m.type]}`}>{icon[m.type]}</span>
                  <RotationBadge rotationId={m.rotationId} withName={false} />
                  {m.isSample && content.settings.showSampleBadges && <Badge variant="sample">Sample</Badge>}
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white">
                  <Text>{m.title}</Text>
                </h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-ink-300">
                  <Paragraphs text={m.description} />
                </div>
                {hasText(m.lesson) && (
                  <div className="mt-auto pt-5">
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                      <Label>{lessonLabel[m.type]}</Label>
                      <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-100">
                        <Paragraphs text={m.lesson} />
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
            {items.length === 0 && (
              <p className="text-sm text-ink-500">Nothing recorded here yet — add moments in the editor.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
