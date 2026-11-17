import { NextResponse } from "next/server";
import { getStore, normalise } from "@/lib/content/store";
import { isEditor } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

/** GET /api/content/history → list; GET ?index=n → that earlier version. */
export async function GET(req: Request) {
  if (!(await isEditor())) {
    return NextResponse.json({ error: "Editing requires sign-in." }, { status: 401 });
  }
  const url = new URL(req.url);
  const index = url.searchParams.get("index");
  const store = getStore();
  if (index !== null) {
    const raw = await store.getHistoryItem(Number(index));
    if (!raw) return NextResponse.json({ error: "Version not found." }, { status: 404 });
    return NextResponse.json(normalise(raw));
  }
  return NextResponse.json({ history: await store.history() });
}
