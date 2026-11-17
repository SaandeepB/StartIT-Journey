"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Label } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { useContent } from "./ContentContext";
import { Chips, MetricTile, OwnershipBadge, RotationBadge } from "./ProjectBits";
import { OWNERSHIP, PROJECT_STATUS, hasText, rotationIndex } from "@/lib/content/helpers";
import type { Project } from "@/lib/content/schema";

function Field({
  n,
  label,
  text,
  children,
}: {
  n: string;
  label: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="print-avoid">
      <Label>
        <span className="text-ink-500">{n}</span>&nbsp;&nbsp;{label}
      </Label>
      <div className="mt-2.5 space-y-3 text-[15px] leading-relaxed text-ink-200">
        {text !== undefined && <Paragraphs text={text} />}
        {children}
      </div>
    </div>
  );
}

export function ProjectCaseStudy({ project, standalone }: { project: Project; standalone?: boolean }) {
  const content = useContent();
  const rIdx = rotationIndex(content, project.rotationId);
  const metrics = project.metrics.filter((m) => m.label.trim());

  return (
    <article className="px-6 pb-10 pt-8 sm:px-10 sm:pt-10">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <RotationBadge rotationId={project.rotationId} />
          <OwnershipBadge ownership={project.ownership} long />
          <Badge variant={project.status === "delivered" ? "neutral" : "warning"}>{PROJECT_STATUS[project.status]}</Badge>
          {project.isSample && content.settings.showSampleBadges && (
            <Badge variant="sample">Sample — replace with your project</Badge>
          )}
        </div>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          <Text>{project.title}</Text>
        </h2>
        {hasText(project.subtitle) && (
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-300">
            <Text>{project.subtitle}</Text>
          </p>
        )}
      </header>

      {metrics.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <MetricTile key={i} metric={m} />
          ))}
        </div>
      )}

      {project.images.filter((im) => im.url).length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.images
            .filter((im) => im.url)
            .map((im, i) => (
              <figure key={i} className="card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.url} alt={im.caption || project.title} className="h-56 w-full object-cover" loading="lazy" />
                {im.caption && <figcaption className="px-4 py-2.5 text-xs text-ink-400">{im.caption}</figcaption>}
              </figure>
            ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
        <Field n="02" label="Business context" text={project.businessContext} />
        <Field n="03" label="Problem statement" text={project.problemStatement} />
        <Field n="04" label="Why the problem mattered" text={project.whyItMattered} />
        <Field n="05" label="My role and ownership" text={project.myRole}>
          <p className="text-xs text-ink-500">{OWNERSHIP[project.ownership].description}.</p>
        </Field>
        <Field n="06" label="Approach and methodology" text={project.approach} />
        <div className="space-y-9">
          <Field n="07" label="Tools and technologies">
            <Chips items={project.tools} />
          </Field>
          {hasText(project.aiInvolvement) && <Field n="08" label="AI involvement" text={project.aiInvolvement} />}
        </div>
        <Field n="09" label="Challenges encountered" text={project.challenges} />
        <Field n="10" label="Solution implemented" text={project.solution} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="card border-electric-400/25 bg-electric-500/[0.06] p-6 lg:col-span-3">
          <Label>
            <span className="text-ink-500">11</span>&nbsp;&nbsp;Business impact
          </Label>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-100">
            <Paragraphs text={project.businessImpact} />
          </div>
        </div>
        <div className="card p-6 lg:col-span-2">
          <Label>
            <span className="text-ink-500">12</span>&nbsp;&nbsp;Key learning
          </Label>
          <blockquote className="mt-3 text-lg leading-snug text-white">
            <Text>{project.keyLearning}</Text>
          </blockquote>
        </div>
      </div>

      {standalone && rIdx >= 0 && (
        <footer className="no-print mt-10 flex flex-wrap items-center gap-4 border-t border-white/8 pt-6 text-sm">
          <Link href={`/rotations/${rIdx + 1}`} className="inline-flex items-center gap-1 text-electric-300 hover:text-white">
            Rotation {rIdx + 1} portfolio <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/#projects" className="text-ink-400 hover:text-white">
            All projects
          </Link>
        </footer>
      )}
    </article>
  );
}
