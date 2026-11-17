import type { Metadata } from "next";
import { getContent } from "@/lib/content/store";
import { Presentation } from "@/components/viewer/Presentation";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Presentation" };

export default async function PresentPage() {
  const content = await getContent();
  return <Presentation content={content} />;
}
