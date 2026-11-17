import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ConflictError, getContent, saveContent } from "@/lib/content/store";
import { isEditor } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function PUT(req: Request) {
  if (!(await isEditor())) {
    return NextResponse.json({ error: "Editing requires sign-in." }, { status: 401 });
  }
  let body: { content?: unknown; expectedVersion?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  try {
    const saved = await saveContent(body.content, body.expectedVersion);
    return NextResponse.json(saved);
  } catch (err) {
    if (err instanceof ConflictError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    if (err instanceof ZodError) {
      const issues = err.issues.slice(0, 10).map((i) => `${i.path.join(".")}: ${i.message}`);
      return NextResponse.json({ error: "Content failed validation.", issues }, { status: 422 });
    }
    console.error("[content] save failed:", err);
    return NextResponse.json({ error: "Save failed. Check the server logs." }, { status: 500 });
  }
}
