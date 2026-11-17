"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Lightbulb } from "lucide-react";
import { useContent } from "../ContentContext";
import { useProjectDialog } from "../ProjectDialog";
import { Chips, OwnershipBadge } from "../ProjectBits";
import { Badge } from "@/components/ui/Badge";
import { Container, Label, SectionHeading } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { projectsFor, reviewFor, rotationColor } from "@/lib/content/helpers";
import { cn, dateRange } from "@/lib/utils";

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1 text-sm text-ink-100">{children}</dd>
    </div>
  );
}

export function RotationDetail({ index, standalone }: { index: number; standalone?: boolean }) {
  const content = useContent();
  const { openProject } = useProjectDialog();
  const rotation = content.rotations[index];
  if (!rotation) return null;
  const review = reviewFor(content, rotation.id);
  const projects = projectsFor(content, rotation.id);
  const color = rotationColor(index);
  const dates = dateRange(rotation.startDate, rotation.endDate, "");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="card relative overflow-hidden p-6 lg:col-span-4">
        <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: color }} aria-hidden />
        <div className="eyebrow">Rotation {index + 1}</div>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          <Text>{rotation.teamName}</Text>
        </h3>
        <dl className="mt-6 grid grid-cols-2 gap-5">
          <Meta label="Business function">
            <Text>{rotation.businessFunction}</Text>
          </Meta>
          <Meta label="Duration">
            <Text>{rotation.durationLabel}</Text>
            {dates && <div className="text-xs text-ink-400">{dates}</div>}
          </Meta>
          <Meta label="Manager">
            <Text>{rotation.manager}</Text>
          </Meta>
          <Meta label="Mentor">
            <Text>{rotation.mentor}</Text>
          </Meta>
        </dl>
        {review && (
          <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="eyebrow">Final performance rating</div>
            <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="text-2xl font-semibold text-white">
                <Text>{review.rating}</Text>
              </span>
              <span className="pb-0.5 text-xs text-ink-400">
                on <Text>{review.ratingScale}</Text>
              </span>
            </div>
            {review.category && (
              <Badge variant="accent" className="mt-2">
                <Text>{review.category}</Text>
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="card p-6 lg:col-span-5">
        <div className="space-y-3 text-[15px] leading-relaxed text-ink-200">
          <Paragraphs text={rotation.summary} />
        </div>
        <div className="mt-6">
          <Label>Primary responsibilities</Label>
          <ul className="mt-3 space-y-2">
            {rotation.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric-300" />
                <span>
                  <Text>{r}</Text>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Label>Important learnings</Label>
          <ul className="mt-3 space-y-2">
            {rotation.learnings.map((l, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink-200">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <span>
                  <Text>{l}</Text>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-3">
        <div className="card flex-1 p-6">
          <Label>Key projects</Label>
          {projects.length === 0 ? (
            <p className="mt-3 text-sm text-ink-500">No projects added for this rotation yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {projects.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => openProject(p.id)}
                    className="group w-full rounded-lg border border-white/8 bg-white/[0.03] p-3 text-left transition hover:border-electric-400/40"
                  >
                    <div className="text-sm font-medium leading-snug text-white group-hover:text-electric-300">
                      <Text>{p.title}</Text>
                    </div>
                    <div className="mt-1.5">
                      <OwnershipBadge ownership={p.ownership} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card p-6">
          <Label>Technologies used</Label>
          <Chips items={rotation.technologies} className="mt-3" />
        </div>
        {!standalone && (
          <Link
            href={`/rotations/${index + 1}`}
            className="inline-flex items-center gap-1.5 text-sm text-electric-300 hover:text-white"
          >
            Open rotation {index + 1} portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function Journey() {
  const content = useContent();
  const [active, setActive] = useState(0);
  const n = content.rotations.length;

  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          number="02"
          eyebrow="The Rotational Journey"
          title="Three teams. Three vantage points on the same organisation."
          intro="Each rotation covered a different business function, with its own workflows, stakeholders and technologies. Select a rotation to see what it involved."
        />

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[9px] h-px bg-white/10" aria-hidden />
          <motion.div
            className="absolute left-0 top-[9px] h-px bg-gradient-to-r from-electric-400 to-violet-400"
            animate={{ width: n > 1 ? `${(active / (n - 1)) * 100}%` : "0%" }}
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
            aria-hidden
          />
          <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: `repeat(${Math.max(n, 1)}, minmax(0, 1fr))` }} role="tablist">
            {content.rotations.map((r, i) => {
              const isActive = i === active;
              const color = rotationColor(i);
              return (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="group relative text-left"
                >
                  <span
                    className={cn(
                      "relative block h-[19px] w-[19px] rounded-full border-2 transition",
                      isActive ? "scale-110 bg-navy-950" : "bg-navy-950 group-hover:scale-105",
                    )}
                    style={{ borderColor: color, boxShadow: isActive ? `0 0 0 6px ${"rgba(255,255,255,0.06)"}` : undefined }}
                  >
                    <span
                      className={cn("absolute inset-[3px] rounded-full transition", isActive ? "opacity-100" : "opacity-0")}
                      style={{ background: color }}
                    />
                  </span>
                  <span className="mt-4 block eyebrow">Rotation {i + 1}</span>
                  <span
                    className={cn(
                      "mt-1 block truncate text-sm font-semibold sm:text-base",
                      isActive ? "text-white" : "text-ink-300 group-hover:text-white",
                    )}
                  >
                    <Text>{r.teamName}</Text>
                  </span>
                  <span className="mt-0.5 hidden text-xs text-ink-500 sm:block">
                    {dateRange(r.startDate, r.endDate, "") || <Text>{r.durationLabel}</Text>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <RotationDetail index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
