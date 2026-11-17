import type { Metadata } from "next";
import { getContent } from "@/lib/content/store";
import { ExecutiveSummary } from "@/components/viewer/ExecutiveSummary";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Executive summary" };

export default async function SummaryPage() {
  const content = await getContent();
  return <ExecutiveSummary content={content} />;
}
