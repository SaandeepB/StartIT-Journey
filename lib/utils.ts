import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "2025-03" → "Mar 2025". Returns the input unchanged when it is not a month. */
export function formatMonth(value: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(value ?? "");
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function dateRange(start: string, end: string, fallback = "[Dates]"): string {
  const s = start ? formatMonth(start) : "";
  const e = end ? formatMonth(end) : "";
  if (!s && !e) return fallback;
  if (s && !e) return `${s} – Present`;
  if (!s && e) return `Until ${e}`;
  return `${s} – ${e}`;
}

export function monthsBetween(start: string, end: string): number | null {
  const a = /^(\d{4})-(\d{2})$/.exec(start ?? "");
  const b = /^(\d{4})-(\d{2})$/.exec(end ?? "");
  if (!a || !b) return null;
  return (Number(b[1]) - Number(a[1])) * 12 + (Number(b[2]) - Number(a[2])) + 1;
}

export function titleCase(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/\bId\b/g, "ID")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bUrl\b/g, "URL")
    .replace(/\bApi\b/g, "API");
}

/** Shorten to about n characters, cutting at a word boundary. */
export function truncate(value: string, n: number): string {
  if (value.length <= n) return value;
  const cut = value.slice(0, n - 1);
  const space = cut.lastIndexOf(" ");
  return (space > n * 0.6 ? cut.slice(0, space) : cut).trimEnd() + "…";
}
