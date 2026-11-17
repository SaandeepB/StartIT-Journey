"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { useContent } from "../ContentContext";
import { scrollToSection } from "../sections";
import { usePresentation } from "../PresentationContext";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Card";
import { Container } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { rotationColor, summaryStats } from "@/lib/content/helpers";
import { dateRange } from "@/lib/utils";

export function MiniTimeline({ compact }: { compact?: boolean }) {
  const content = useContent();
  const n = Math.max(content.rotations.length, 1);
  return (
    <div>
      <div className="flex gap-0.5" aria-hidden>
        {content.rotations.map((r, i) => (
          <div key={r.id} className="h-1.5 flex-1 rounded-full" style={{ background: rotationColor(i) }} />
        ))}
      </div>
      <ol className="mt-3 grid grid-cols-1 gap-3" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {content.rotations.map((r, i) => {
          const dates = dateRange(r.startDate, r.endDate, "");
          const label = [dates, r.durationLabel].filter(Boolean).join(" · ");
          return (
            <li key={r.id} className="min-w-0">
              <div className="eyebrow">Rotation {i + 1}</div>
              <div className="mt-1 truncate text-xs font-medium text-white sm:text-sm">
                <Text>{r.teamName}</Text>
              </div>
              {!compact && (
                <div className="mt-0.5 truncate text-[11px] text-ink-400 sm:text-xs">
                  <Text>{label || "[Dates]"}</Text>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } }),
};

export function Intro() {
  const content = useContent();
  const { profile } = content;
  const stats = summaryStats(content);
  const presentation = usePresentation();
  const words = profile.headline.trim().split(" ");
  const last = words.pop() ?? "";

  return (
    <section id="intro" className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28">
      <div className="glow-field" aria-hidden />
      <div className="grid-field" aria-hidden />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="eyebrow">
              <Text>{profile.programName}</Text> <span className="text-ink-600">·</span> <Text>{profile.organization}</Text>
            </motion.div>
            <motion.h1
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-6 text-balance text-5xl font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl"
            >
              <Text>{words.join(" ")}</Text> <span className="text-gradient"><Text>{last}</Text></span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300 sm:text-xl"
            >
              <Text>{profile.supportingStatement}</Text>
            </motion.p>
            <motion.div custom={3} variants={fade} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-3">
              {!presentation.active && (
                <ButtonLink href="/present" variant="primary" size="lg">
                  <Play className="h-4 w-4" /> Start presentation
                </ButtonLink>
              )}
              <Button
                variant={presentation.active ? "primary" : "secondary"}
                size="lg"
                onClick={() => (presentation.active ? presentation.next() : scrollToSection("journey"))}
              >
                Explore the journey <ArrowDown className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div custom={4} variants={fade} initial="hidden" animate="show" className="mt-10 flex items-center gap-4">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photoUrl} alt={profile.name} className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric-500/40 to-violet-500/40 ring-1 ring-white/15 text-sm font-semibold text-white">
                  {profile.name.replace(/[[\]]/g, "").split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("")}
                </div>
              )}
              <div>
                <div className="font-medium text-white">
                  <Text>{profile.name}</Text>
                </div>
                <div className="text-sm text-ink-400">
                  <Text>{profile.designation}</Text> <span className="text-ink-600">·</span> <Text>{profile.programName}</Text>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div custom={2} variants={fade} initial="hidden" animate="show" className="lg:col-span-5">
            <div className="card p-6 sm:p-7">
              <div className="eyebrow">Storytelling theme</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
                <Text>{profile.themeTitle}</Text>
              </div>
              <p className="mt-1 text-sm text-ink-400">
                <Text>{profile.themeSubtitle}</Text>
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Stat label="Duration" value={<Text>{stats.duration}</Text>} />
                <Stat label="Rotations" value={stats.rotations} />
                <Stat label="Projects" value={stats.projects} note={`${stats.owned} personally owned`} />
                <Stat label="Technologies" value={stats.technologies} note={`${stats.aiInitiatives} AI initiatives`} />
              </div>
              <div className="mt-6">
                <div className="eyebrow">Key capabilities developed</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {profile.keyCapabilities.map((c, i) => (
                    <li key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-ink-200">
                      <Text>{c}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div custom={5} variants={fade} initial="hidden" animate="show" className="mt-16">
          <div className="mb-3 flex items-center justify-between">
            <div className="eyebrow">The journey at a glance</div>
            <button
              type="button"
              onClick={() => (presentation.active ? presentation.next() : scrollToSection("journey"))}
              className="text-xs text-ink-400 hover:text-white"
            >
              Open the interactive timeline →
            </button>
          </div>
          <MiniTimeline />
        </motion.div>
      </Container>
    </section>
  );
}
