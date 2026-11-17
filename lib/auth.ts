/* ─────────────────────────────────────────────────────────────────────────────
   Authentication helpers. Edge-compatible (WebCrypto only), used by both the
   middleware and the API routes.

   Two roles:
   • "edit" — unlocked with EDIT_PASSWORD; grants access to /edit and write APIs.
   • "view" — unlocked with VIEW_PASSWORD (optional); gates the whole site.
   Tokens are HMAC-SHA256 signed `${role}.${expiry}` strings in httpOnly cookies.
   ──────────────────────────────────────────────────────────────────────────── */

export type Role = "edit" | "view";

export const COOKIE_EDIT = "sc_edit";
export const COOKIE_VIEW = "sc_view";
export const EDIT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
export const VIEW_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();

export function isEditEnabled(): boolean {
  return !!process.env.EDIT_PASSWORD;
}

export function isViewProtected(): boolean {
  return !!process.env.VIEW_PASSWORD;
}

/**
 * Signing secret. AUTH_SECRET should always be set in production; as a
 * fallback the passwords themselves seed the secret so a misconfigured
 * deployment still signs tokens rather than failing open.
 */
function secret(): string {
  const s =
    process.env.AUTH_SECRET ||
    `${process.env.EDIT_PASSWORD ?? ""}::${process.env.VIEW_PASSWORD ?? ""}::systems-connector`;
  return s;
}

function toBase64Url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  const b64 = typeof btoa === "function" ? btoa(bin) : Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(sig);
}

/** Constant-time string comparison. */
export function safeEqual(a: string, b: string): boolean {
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  let diff = ab.length ^ bb.length;
  const len = Math.max(ab.length, bb.length);
  for (let i = 0; i < len; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

export async function createToken(role: Role, maxAgeSeconds: number): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload = `${role}.${exp}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifyToken(token: string | undefined, role: Role): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [r, expStr, sig] = parts;
  if (r !== role) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = await sign(`${r}.${expStr}`);
  return safeEqual(sig, expected);
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

/* ── Best-effort login throttling (per serverless instance) ──────────────── */

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

export function tooManyAttempts(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export function clearAttempts(ip: string) {
  attempts.delete(ip);
}
