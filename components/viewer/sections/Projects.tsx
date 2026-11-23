"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "../ContentContext";
import { ProjectCard } from "../ProjectCard";
import { OwnershipBadge } from "../ProjectBits";
import { Block } from "@/components/ui/SectionHeading";
import { AIInAction } from "./AIInAction";
import { Tabs } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import { OWNERSHIP, rotationColor } from "@/lib/content/helpers";
import { OwnershipEnum, type Ownership } from "@/lib/content/schema";

type OwnFilter = Ownership | "all";

export function Projects({ part }: { part?: boolean }) {
  const content = useContent();
  const [rot, setRot] = useState<string>("all");
  const [own, setOwn] = useState<OwnFilter>("all");

  const rotationTabs = useMemo(
    () => [
      { id: "all", label: "All rotations", count: content.projects.length },
      ...content.rotations.map((r, i) => ({
        id: r.id,
        label: <span className="max-w-[9rem] truncate sm:max-w-none">R{i + 1}</span>,
        count: content.projects.filter((p) => p.rotationId === r.id).length,
        color: rotationColor(i),
      })),
    ],
    [content],
  );

  const ownTabs = useMemo(
    () => [
      { id: "all" as OwnFilter, label: "Any involvement" },
      ...OwnershipEnum.options.map((o) => ({
        id: o as OwnFilter,
        label: OWNERSHIP[o].short,
        count: content.projects.filter((p) => p.ownership === o).length,
      })),
    ],
    [content],
  );

  const filtered = content.projects.filter(
    (p) => (rot === "all" || p.rotationId === rot) && (own === "all" || p.ownership === own),
  );

  return (
    <Block id="projects" part={part} number="03"
          eyebrow="Projects & Impact"
          title="What I delivered, and exactly how I was involved."
          intro="Each project is a short case study: the problem, my role, what was built and what changed. Ownership is stated plainly, and numbers appear only once measured."
        >

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {OwnershipEnum.options.map((o) => (
            <div key={o} className="card flex items-start gap-3 p-4">
              <OwnershipBadge ownership={o} />
              <p className="text-xs leading-relaxed text-ink-400">{OWNERSHIP[o].description}.</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Tabs tabs={rotationTabs} value={rot} onChange={setRot} ariaLabel="Filter by rotation" />
          <Tabs tabs={ownTabs} value={own} onChange={setOwn} ariaLabel="Filter by involvement" />
        </div>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-ink-500">No projects match these filters yet.</p>
        )}

        {content.projects.some((p) => p.isSample) && content.settings.showSampleBadges && (
          <p className="mt-8 text-center text-xs text-ink-500">
            <Text>
              Projects marked “Sample” illustrate the case-study structure. Replace them with your own work in the editor.
            </Text>
          </p>
        )}
        <AIInAction part />
    </Block>
  );
}
