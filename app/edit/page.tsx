import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isEditEnabled } from "@/lib/auth";
import { isEditor } from "@/lib/request-auth";
import { getContent, storeStatus } from "@/lib/content/store";
import { Editor } from "@/components/editor/Editor";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Editor" };

export default async function EditPage() {
  if (!isEditEnabled()) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-5">
        <div className="card max-w-lg p-8">
          <div className="eyebrow">Editor</div>
          <h1 className="mt-2 text-xl font-semibold text-white">Editing is not enabled yet</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-300">
            Set an <code className="rounded bg-white/10 px-1">EDIT_PASSWORD</code> environment variable (and an{" "}
            <code className="rounded bg-white/10 px-1">AUTH_SECRET</code>) in your hosting settings or your local{" "}
            <code className="rounded bg-white/10 px-1">.env.local</code>, then restart or redeploy. The README walks through it.
          </p>
          <Link href="/" className="mt-5 inline-block text-sm text-electric-300 hover:text-white">
            Back to the portfolio
          </Link>
        </div>
      </div>
    );
  }
  if (!(await isEditor())) redirect("/edit/login");
  const content = await getContent();
  return <Editor initial={content} status={storeStatus()} />;
}
