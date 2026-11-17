import { cookies, headers } from "next/headers";
import { COOKIE_EDIT, verifyToken } from "@/lib/auth";

/** True when the current request carries a valid editor cookie. */
export async function isEditor(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE_EDIT)?.value, "edit");
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}
