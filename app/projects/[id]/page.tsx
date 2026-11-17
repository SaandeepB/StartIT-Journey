import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content/store";
import { projectById } from "@/lib/content/helpers";
import { ProjectView } from "@/components/viewer/StandaloneViews";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const project = projectById(await getContent(), id);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const content = await getContent();
  const project = projectById(content, id);
  if (!project) notFound();
  return <ProjectView content={content} project={project} />;
}
