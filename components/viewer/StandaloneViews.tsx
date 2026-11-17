"use client";

import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import type { Content, Project } from "@/lib/content/schema";
import { ContentProvider } from "./ContentContext";
import { ProjectDialogProvider } from "./ProjectDialog";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { ProjectCard } from "./ProjectCard";
import { RotationDetail } from "./sections/Journey";
import { ReviewCard } from "./sections/Performance";
import { Footer } from "./PortfolioViewer";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { projectsFor, reviewFor, rotationColor } from "@/lib/content/helpers";

function Bar({ back, backLabel }: { back: string; backLabel: string }) {
  return (
    <div className="no-print border-b border-white/8">
      <Container className="flex h-14 items-center justify-between">
        <Link href={back} className="inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </Link>
        <ButtonLink href="/present" variant="primary" size="sm">
          <Play className="h-3.5 w-3.5" /> Present
        </ButtonLink>
      </Container>
    </div>
  );
}

export function RotationView({ content, index }: { content: Content; index: number }) {
  const rotation = content.rotations[index];
  const review = reviewFor(content, rotation.id);
  const projects = projectsFor(content, rotation.id);
  return (
    <ContentProvider content={content}>
      <ProjectDialogProvider>
        <Bar back="/#journey" backLabel="Rotational journey" />
        <main>
          <Container className="py-12">
            <div className="eyebrow flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: rotationColor(index) }} aria-hidden />
              Rotation {index + 1} portfolio
            </div>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              <Text>{rotation.teamName}</Text>
            </h1>
            <p className="mt-2 text-ink-400">
              <Text>{rotation.businessFunction}</Text>
            </p>
            <div className="mt-10">
              <RotationDetail index={index} standalone />
            </div>
            <h2 className="mt-16 text-2xl font-semibold tracking-tight text-white">Projects in this rotation</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
              {projects.length === 0 && <p className="text-sm text-ink-500">No projects recorded yet.</p>}
            </div>
            {review && (
              <>
                <h2 className="mt-16 text-2xl font-semibold tracking-tight text-white">Performance review</h2>
                <div className="mt-6 max-w-xl">
                  <ReviewCard review={review} index={index} />
                </div>
              </>
            )}
          </Container>
        </main>
        <Footer />
      </ProjectDialogProvider>
    </ContentProvider>
  );
}

export function ProjectView({ content, project }: { content: Content; project: Project }) {
  return (
    <ContentProvider content={content}>
      <ProjectDialogProvider>
        <Bar back="/#projects" backLabel="Project portfolio" />
        <main>
          <Container className="max-w-5xl py-8">
            <div className="card">
              <ProjectCaseStudy project={project} standalone />
            </div>
          </Container>
        </main>
        <Footer />
      </ProjectDialogProvider>
    </ContentProvider>
  );
}
