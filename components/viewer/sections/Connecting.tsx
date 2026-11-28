"use client";

import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import { Dot } from "@/components/ui/Badge";
import { Block, Label } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { rotationColor, rotationIndex, rotationShort } from "@/lib/content/helpers";

export function Connecting({ part }: { part?: boolean }) {
  const content = useContent();
  const { pillars, insight, synthesis, crossBoundaryOpportunities } = content.connectingDots;
  const n = Math.max(pillars.length, 1);
  const cols: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
  };
  const colsClass = cols[Math.min(n, 6)] ?? "md:grid-cols-5";

  return (
    <Block id="connecting" part={part}
          eyebrow="Connecting the dots"
          title="Three rotations. One end-to-end view of marketing."
          intro="Each rotation showed one stage of the marketing workflow from the inside. Together they add up to a view no single team has."
        >

        <div className="relative mt-14">
          <ol className={`grid grid-cols-2 gap-3 md:gap-4 ${colsClass}`}>
            {pillars.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card p-4 sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex gap-1">
                    {p.rotationIds.map((rid) => {
                      const idx = rotationIndex(content, rid);
                      return idx >= 0 ? <Dot key={rid} color={rotationColor(idx)} size={7} /> : null;
                    })}
                  </span>
                </div>
                <div className="mt-3 text-sm font-semibold uppercase tracking-wide text-white">
                  <Text>{p.label}</Text>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-400">
                  <Text>{p.description}</Text>
                </p>
              </motion.li>
            ))}
          </ol>

          <svg className="hidden h-24 w-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="connect-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5b93ff" stopOpacity="0.6" />
                <stop offset="1" stopColor="#9a86ff" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {pillars.map((_, i) => {
              const x = ((i + 0.5) * 100) / n;
              return (
                <path
                  key={i}
                  d={`M ${x} 0 C ${x} 55, 50 45, 50 100`}
                  fill="none"
                  stroke="url(#connect-grad)"
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="4 6"
                  className="animate-dash"
                />
              );
            })}
          </svg>
          <div className="mx-auto h-10 w-px bg-gradient-to-b from-electric-400/60 to-violet-400/80 md:hidden" aria-hidden />

          <div className="mx-auto max-w-2xl rounded-2xl border border-electric-400/30 bg-gradient-to-br from-electric-500/10 via-navy-900 to-violet-500/10 p-6 text-center shadow-glow sm:p-8">
            <div className="eyebrow">The emerging strength</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              <Text>{content.profile.themeTitle}</Text>
            </div>
            <p className="mt-2 text-sm text-ink-300">
              Seeing how systems, data, processes and people connect — and where they don't.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-[11px] text-ink-500">
              {content.rotations.map((r, i) => (
                <span key={r.id} className="inline-flex items-center gap-1.5">
                  <Dot color={rotationColor(i)} size={7} /> {rotationShort(i)} <Text>{r.teamName}</Text>
                </span>
              ))}
            </div>
          </div>
        </div>

        <blockquote className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-balance text-2xl font-medium leading-snug text-white sm:text-3xl">
            <Text>{insight}</Text>
          </p>
        </blockquote>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Label>Why the combination matters</Label>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-200">
              <Paragraphs text={synthesis} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <Label>Opportunities I can now see across boundaries</Label>
            <ol className="mt-3 space-y-2">
              {crossBoundaryOpportunities.map((o, i) => (
                <li key={i} className="card flex gap-3 p-4 text-sm text-ink-200">
                  <span className="font-mono text-[11px] text-electric-300">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <Text>{o}</Text>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Block>
  );
}
