import type { Metadata } from "next";
import { getContent } from "@/lib/content/store";
import { PortfolioViewer } from "@/components/viewer/PortfolioViewer";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return { title: { absolute: `${c.profile.themeTitle} — ${c.profile.name}` } };
}

export default async function Page() {
  const content = await getContent();
  return <PortfolioViewer content={content} />;
}
