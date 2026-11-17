import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isViewProtected } from "@/lib/auth";
import { PasswordForm } from "@/components/auth/PasswordForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Private portfolio" };

function safeNext(value: string | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export default async function UnlockPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (!isViewProtected()) redirect("/");
  const { next } = await searchParams;
  return (
    <PasswordForm
      endpoint="/api/auth/view"
      title="This portfolio is private"
      description="Enter the access password you were given to continue."
      successHref={safeNext(next)}
    />
  );
}
