import { NextResponse } from "next/server";
import { resetContent } from "@/lib/content/store";
import { isEditor } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

/** POST — restore the sample content. The previous version is kept in history. */
export async function POST() {
  if (!(await isEditor())) {
    return NextResponse.json({ error: "Editing requires sign-in." }, { status: 401 });
  }
  return NextResponse.json(await resetContent());
}
