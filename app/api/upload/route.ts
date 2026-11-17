import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isEditor } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]);

/**
 * Image upload for the editor.
 * • With BLOB_READ_WRITE_TOKEN → Vercel Blob (persistent, CDN-served).
 * • Local development → public/uploads/ (gitignored).
 * • Deployed without Blob → explain how to enable it; URLs can still be pasted.
 */
export async function POST(req: Request) {
  if (!(await isEditor())) {
    return NextResponse.json({ error: "Editing requires sign-in." }, { status: 401 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Only PNG, JPEG, WebP, GIF or SVG images are accepted." }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`portfolio/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  }

  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          "Image storage is not configured. Add the Vercel Blob store (Storage → Create → Blob) to enable uploads, or paste an image URL instead.",
      },
      { status: 501 },
    );
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const name = `${Date.now()}-${safeName}`;
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}` });
}
