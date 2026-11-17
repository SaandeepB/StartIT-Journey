import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content/store";
import { RotationView } from "@/components/viewer/StandaloneViews";

export const dynamic = "force-dynamic";

type Params = Promise<{ n: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { n } = await params;
  const content = await getContent();
  const rotation = content.rotations[Number(n) - 1];
  return { title: rotation ? `Rotation ${n} · ${rotation.teamName}` : "Rotation" };
}

export default async function RotationPage({ params }: { params: Params }) {
  const { n } = await params;
  const content = await getContent();
  const index = Number(n) - 1;
  if (!Number.isInteger(index) || !content.rotations[index]) notFound();
  return <RotationView content={content} index={index} />;
}
