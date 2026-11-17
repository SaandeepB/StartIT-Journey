import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isEditor } from "@/lib/request-auth";
import { PasswordForm } from "@/components/auth/PasswordForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Editor sign-in" };

export default async function EditLoginPage() {
  if (await isEditor()) redirect("/edit");
  return (
    <PasswordForm
      endpoint="/api/auth/edit"
      title="Editor sign-in"
      description="Enter the editing password to update the portfolio. Viewers never see this screen."
      successHref="/edit"
      footer={
        <Link href="/" className="hover:text-white">
          ← Back to the portfolio
        </Link>
      }
    />
  );
}
