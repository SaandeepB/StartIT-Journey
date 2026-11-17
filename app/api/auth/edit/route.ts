import { NextResponse } from "next/server";
import {
  COOKIE_EDIT,
  EDIT_MAX_AGE,
  clearAttempts,
  cookieOptions,
  createToken,
  safeEqual,
  tooManyAttempts,
} from "@/lib/auth";
import { clientIp } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const expected = process.env.EDIT_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Editing is disabled: EDIT_PASSWORD is not configured on the server." },
      { status: 503 },
    );
  }
  const ip = await clientIp();
  if (tooManyAttempts(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!password || !safeEqual(password, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  clearAttempts(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_EDIT, await createToken("edit", EDIT_MAX_AGE), cookieOptions(EDIT_MAX_AGE));
  return res;
}

/** Sign out of the editor. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_EDIT, "", { ...cookieOptions(0), maxAge: 0 });
  return res;
}
