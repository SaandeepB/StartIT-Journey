import { NextResponse } from "next/server";
import {
  COOKIE_VIEW,
  VIEW_MAX_AGE,
  clearAttempts,
  cookieOptions,
  createToken,
  safeEqual,
  tooManyAttempts,
} from "@/lib/auth";
import { clientIp } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const expected = process.env.VIEW_PASSWORD;
  if (!expected) return NextResponse.json({ ok: true, open: true });
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
  res.cookies.set(COOKIE_VIEW, await createToken("view", VIEW_MAX_AGE), cookieOptions(VIEW_MAX_AGE));
  return res;
}
