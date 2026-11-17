"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useContent } from "../ContentContext";
import { useProjectDialog } from "../ProjectDialog";
import { Badge, Dot } from "@/components/ui/Badge";
import { Container, Label, SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { Paragraphs, Text } from "@/components/ui/Text";
import { EXPOSURE, hasText, projectById, rotationColor, rotationShort } from "@/lib/content/helpers";
import { TechCategoryEnum, type Tech, type TechCategory } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

function ExposureMeter({ rank }: { rank: number }) {
  return (
    <span className="inline-flex gap-[2px]" aria-hidden>
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={cn("h-1.5 w-4 rounded-sm", n <= rank ? "bg-electric-400" : "bg-electric-400/15")}
        />
      ))}
    </span>
  );
}

function TechCard({ tech, open, onToggle }: { tech: Tech; open: boolean; onToggle: () => void }) {
  const content = useContent();
  const { openProject } = useProjectDialog();
  const exposure = EXPOSURE[tech.exposure];
  const example = projectById(content, tech.exampleProjectId);
  const handsOn = exposure.rank >= 3;

  return (
    <article className={cn("card card-hover flex flex-col", open && "border-electric-400/40")}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full flex-col p-5 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate text-base font-semibold text-white">
              <Text>{tech.name}</Text>
            </h4>
            <div className="mt-0.5 text-[11px] text-ink-500">{tech.category}</div>
          </div>
          <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-ink-500 transition", open && "rotate-180")} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="flex items-center gap-2 text-xs text-ink-300" title={exposure.description}>
            <ExposureMeter rank={exposure.rank} />
            {exposure.label}
          </span>
          <span className="flex items-center gap-1.5" aria-label="Rotations used">
            {content.rotations.map((r, i) => {
              const used = tech.rotationIds.includes(r.id);
              return (
                <span
                  key={r.id}
                  title={`${rotationShort(i)} ${used ? "— used" : "— not used"}`}
                  className={cn("flex items-center gap-1 font-mono text-[10px]", used ? "text-ink-200" : "text-ink-600")}
                >
                  <Dot color={used ? rotationColor(i) : "transparent"} className={cn(!used && "border border-white/15")} size={7} />
                  {rotationShort(i)}
                </span>
              );
            })}
          </span>
        </div>
        {hasText(tech.usedFor) && (
          <p className="mt-3 text-sm leading-relaxed text-ink-300">
            <Text>{tech.usedFor}</Text>
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={handsOn ? "accent" : "outline"}>{handsOn ? "Hands-on implementation" : "Familiarity"}</Badge>
          {tech.isSample && content.settings.showSampleBadges && <Badge variant="sample">Sample</Badge>}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/8 px-5 pb-5 pt-4 text-sm">
              <Label>Level of practical exposure</Label>
              <p className="mt-1 text-ink-200">
                {exposure.label} — {exposure.description}.
              </p>
              {hasText(tech.description) && (
                <div className="mt-4 space-y-2 leading-relaxed text-ink-300">
                  <Paragraphs text={tech.description} />
                </div>
              )}
              {example && (
                <button
                  type="button"
                  onClick={() => openProject(example.id)}
                  className="mt-4 inline-flex items-center gap-1 text-electric-300 hover:text-white"
                >
                  Example: <Text>{example.title}</Text> <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function TechStack() {
  const content = useContent();
  const [cat, setCat] = useState<"all" | TechCategory>("all");
  const [open, setOpen] = useState<string | null>(null);
  const categories = TechCategoryEnum.options.filter((c) => content.techStack.some((t) => t.category === c));
  const visible = cat === "all" ? categories : categories.filter((c) => c === cat);

  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          number="07"
          eyebrow="My Technology Stack"
          title="A technology map, honest about depth."
          intro="Every tool shows where I used it, what for, and how deep the exposure went. Hands-on implementation is distinguished from familiarity."
        />

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Tabs
            tabs={[
              { id: "all" as const, label: "All", count: content.techStack.length },
              ...categories.map((c) => ({ id: c, label: c, count: content.techStack.filter((t) => t.category === c).length })),
            ]}
            value={cat}
            onChange={setCat}
            ariaLabel="Technology category"
          />
        </div>

        <div className="card mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 p-4 text-xs text-ink-400">
          <span className="eyebrow">Exposure</span>
          {(Object.keys(EXPOSURE) as (keyof typeof EXPOSURE)[]).map((k) => (
            <span key={k} className="flex items-center gap-2" title={EXPOSURE[k].description}>
              <ExposureMeter rank={EXPOSURE[k].rank} /> {EXPOSURE[k].label}
            </span>
          ))}
        </div>

        <div className="mt-8 space-y-10">
          {visible.map((c) => (
            <div key={c}>
              <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold text-white">
                {c}
                <span className="h-px flex-1 bg-white/8" aria-hidden />
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {content.techStack
                  .map((t, i) => ({ t, key: `${i}-${t.name}` }))
                  .filter(({ t }) => t.category === c)
                  .map(({ t, key }) => (
                    <TechCard key={key} tech={t} open={open === key} onToggle={() => setOpen(open === key ? null : key)} />
                  ))}
              </div>
            </div>
          ))}
          {visible.length === 0 && <p className="text-sm text-ink-500">No technologies added yet.</p>}
        </div>
      </Container>
    </section>
  );
}
