"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/viewer/Nav";

export function PasswordForm({
  endpoint,
  title,
  description,
  successHref,
  footer,
}: {
  endpoint: string;
  title: string;
  description: string;
  successHref: string;
  footer?: React.ReactNode;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push(successHref);
      router.refresh();
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setError(data.error ?? "Something went wrong.");
    setBusy(false);
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5">
      <div className="glow-field" aria-hidden />
      <form onSubmit={submit} className="card relative w-full max-w-sm p-8">
        <Mark />
        <h1 className="mt-5 text-xl font-semibold text-white">{title}</h1>
        <p className="mt-1 text-sm text-ink-400">{description}</p>
        <label className="mt-6 block">
          <span className="eyebrow">Password</span>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/12 bg-navy-950/60 px-3 focus-within:border-electric-400">
            <Lock className="h-4 w-4 text-ink-500" />
            <input
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full bg-transparent text-sm text-white outline-none"
              required
            />
          </div>
        </label>
        {error && <p className="mt-3 text-sm text-serious">{error}</p>}
        <Button type="submit" variant="primary" className="mt-5 w-full" disabled={busy}>
          {busy ? "Checking…" : "Continue"}
        </Button>
        {footer && <div className="mt-5 text-xs text-ink-500">{footer}</div>}
      </form>
    </div>
  );
}
