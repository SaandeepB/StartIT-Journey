"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import { useContent } from "./ContentContext";
import { Chips, OwnershipBadge, RotationBadge } from "./ProjectBits";
import { useProjectDialog } from "./ProjectDialog";
import { PROJECT_STATUS, rotationColor, rotationIndex } from "@/lib/content/helpers";
import type { Project } from "@/lib/content/schema";

export function ProjectCard({ project }: { project: Project }) {
  const content = useContent();
  const { openProject } = useProjectDialog();
  const idx = rotationIndex(content, project.rotationId);
  const measured = project.metrics.filter((m) => m.value.trim()).length;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openProject(project.id)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openProject(project.id))}
      className="card card-hover group relative flex h-full cursor-pointer flex-col overflow-hidden p-5 text-left"
    >
      <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: rotationColor(idx) }} aria-hidden />
      <div className="flex flex-wrap items-center gap-2 pl-1">
        <RotationBadge rotationId={project.rotationId} withName={false} />
        <OwnershipBadge ownership={project.ownership} />
        {project.status !== "delivered" && <Badge variant="warning">{PROJECT_STATUS[project.status]}</Badge>}
        {project.isSample && content.settings.showSampleBadges && <Badge variant="sample">Sample</Badge>}
      </div>
      <h3 className="mt-4 pl-1 text-lg font-semibold leading-snug tracking-tight text-white">
        <Text>{project.title}</Text>
      </h3>
      {project.subtitle && (
        <p className="mt-2 line-clamp-3 pl-1 text-sm leading-relaxed text-ink-300">
          <Text>{project.subtitle}</Text>
        </p>
      )}
      <div className="mt-auto pt-5 pl-1">
        <Chips items={project.tools} max={3} />
        <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
          <span>
            {project.metrics.length > 0
              ? `${measured}/${project.metrics.length} metrics measured`
              : "No metrics listed"}
          </span>
          <span className="inline-flex items-center gap-1 text-electric-300 transition group-hover:text-white">
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
