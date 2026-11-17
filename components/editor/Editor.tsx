"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Check,
  Download,
  ExternalLink,
  History,
  LogOut,
  MoreHorizontal,
  Play,
  RotateCcw,
  Save,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { ContentSchema, EDITOR_SECTIONS, countPlaceholders, type Content, type SectionKey } from "@/lib/content/schema";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Mark } from "@/components/viewer/Nav";
import { cn } from "@/lib/utils";
import { Field } from "./Field";
import { ID_PREFIX } from "./schema-utils";

export type EditorStatus = {
  kind: "kv" | "file" | "memory";
  persistent: boolean;
  blobConfigured: boolean;
  viewProtected: boolean;
  authSecretSet: boolean;
};

type Notice = { kind: "ok" | "error" | "warn"; text: string; issues?: string[] };
type HistoryEntry = { savedAt: string; version: number };

const DRAFT_KEY = "systems-connector:draft";

function fmt(iso: string) {
  if (!iso) return "unknown time";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

export function Editor({ initial, status }: { initial: Content; status: EditorStatus }) {
  const router = useRouter();
  const [doc, setDoc] = useState<Content>(initial);
  const [saved, setSaved] = useState<Content>(initial);
  const [section, setSection] = useState<SectionKey>("profile");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [conflict, setConflict] = useState(false);
  const [menu, setMenu] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [draft, setDraft] = useState<{ savedAt: string; doc: Content } | null>(null);
  const importInput = useRef<HTMLInputElement>(null);

  const dirty = useMemo(() => JSON.stringify(doc) !== JSON.stringify(saved), [doc, saved]);
  const placeholderCounts = useMemo(
    () => Object.fromEntries(EDITOR_SECTIONS.map((s) => [s.key, countPlaceholders(doc[s.key])])) as Record<SectionKey, number>,
    [doc],
  );
  const totalPlaceholders = Object.values(placeholderCounts).reduce((a, b) => a + b, 0);

  /* ── Draft safety net (localStorage) ─────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw) as { version: number; savedAt: string; doc: Content };
      if (d.version === initial.meta.version && JSON.stringify(d.doc) !== JSON.stringify(initial)) setDraft({ savedAt: d.savedAt, doc: d.doc });
      else localStorage.removeItem(DRAFT_KEY);
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, [initial]);

  useEffect(() => {
    if (!dirty) return;
    const t = window.setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ version: saved.meta.version, savedAt: new Date().toISOString(), doc }));
    }, 600);
    return () => window.clearTimeout(t);
  }, [doc, dirty, saved]);

  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  /* ── Save / reload ───────────────────────────────────────────────────── */
  const save = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setNotice(null);
    const parsed = ContentSchema.safeParse(doc);
    if (!parsed.success) {
      setNotice({
        kind: "error",
        text: "Some fields are invalid — fix them and save again.",
        issues: parsed.error.issues.slice(0, 8).map((i) => `${i.path.join(".")}: ${i.message}`),
      });
      setBusy(false);
      return;
    }
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: parsed.data, expectedVersion: saved.meta.version }),
      });
      if (res.status === 409) {
        setConflict(true);
        setNotice({ kind: "warn", text: "This portfolio was updated from another device since you opened the editor." });
      } else if (res.status === 401) {
        router.push("/edit/login");
      } else if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string; issues?: string[] };
        setNotice({ kind: "error", text: j.error ?? `Save failed (${res.status}).`, issues: j.issues });
      } else {
        const savedDoc = (await res.json()) as Content;
        setDoc(savedDoc);
        setSaved(savedDoc);
        setConflict(false);
        localStorage.removeItem(DRAFT_KEY);
        setNotice({ kind: "ok", text: `Saved — version ${savedDoc.meta.version}${status.persistent ? "" : " (not persistent: no database connected)"}` });
      }
    } catch {
      setNotice({ kind: "error", text: "Network error while saving. Your draft is kept in this browser." });
    }
    setBusy(false);
  }, [busy, doc, saved, router, status.persistent]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [save]);

  async function reloadLatest() {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (!res.ok) return;
    const latest = (await res.json()) as Content;
    setDoc(latest);
    setSaved(latest);
    setConflict(false);
    setNotice({ kind: "ok", text: `Loaded version ${latest.meta.version}. Your unsaved edits were discarded.` });
  }

  /* ── Tools ───────────────────────────────────────────────────────────── */
  function exportJson() {
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-content-v${doc.meta.version}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMenu(false);
  }

  async function importJson(file: File) {
    try {
      const parsed = ContentSchema.safeParse(JSON.parse(await file.text()));
      if (!parsed.success) {
        setNotice({ kind: "error", text: "That file is not a valid portfolio export.", issues: parsed.error.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`) });
        return;
      }
      setDoc({ ...parsed.data, meta: saved.meta });
      setNotice({ kind: "ok", text: "Imported. Review the content, then save to publish it." });
    } catch {
      setNotice({ kind: "error", text: "Could not read that file." });
    }
    setMenu(false);
  }

  async function openHistory() {
    setMenu(false);
    const res = await fetch("/api/content/history", { cache: "no-store" });
    const data = (await res.json().catch(() => ({ history: [] }))) as { history?: HistoryEntry[] };
    setHistory(data.history ?? []);
  }

  async function loadVersion(index: number) {
    const res = await fetch(`/api/content/history?index=${index}`, { cache: "no-store" });
    if (!res.ok) return;
    const v = (await res.json()) as Content;
    setDoc({ ...v, meta: saved.meta });
    setHistory(null);
    setNotice({ kind: "ok", text: `Loaded the version from ${fmt(v.meta.updatedAt)} into the editor. Save to make it current.` });
  }

  async function resetToSample() {
    setMenu(false);
    if (!window.confirm("Replace ALL content with the sample content? The current version is kept in history.")) return;
    const res = await fetch("/api/content/reset", { method: "POST" });
    if (!res.ok) return;
    const fresh = (await res.json()) as Content;
    setDoc(fresh);
    setSaved(fresh);
    setNotice({ kind: "ok", text: "Sample content restored." });
  }

  async function signOut() {
    await fetch("/api/auth/edit", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  const current = EDITOR_SECTIONS.find((s) => s.key === section)!;
  const sectionSchema = ContentSchema.shape[section];

  return (
    <div className="min-h-dvh bg-navy-950 text-ink-100">
      <input ref={importInput} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />

      <header className="sticky top-0 z-40 border-b border-white/8 bg-navy-950/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Mark className="h-7 w-7" />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-semibold text-white">Content editor</div>
              <div className="truncate text-[11px] text-ink-500">
                {doc.profile.themeTitle} · v{saved.meta.version}
                {saved.meta.updatedAt && ` · saved ${fmt(saved.meta.updatedAt)}`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("hidden rounded-full border px-2.5 py-0.5 text-[11px] sm:inline-flex", dirty ? "border-warning/50 text-ink-100" : "border-white/10 text-ink-500")}>
              {dirty ? "Unsaved changes" : "All changes saved"}
            </span>
            <Link href="/" target="_blank" className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs text-ink-300 hover:bg-white/[0.06] hover:text-white sm:inline-flex">
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </Link>
            <Link href="/present" target="_blank" className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs text-ink-300 hover:bg-white/[0.06] hover:text-white md:inline-flex">
              <Play className="h-3.5 w-3.5" /> Present
            </Link>
            <Button variant="primary" size="sm" onClick={() => void save()} disabled={busy || !dirty}>
              <Save className="h-3.5 w-3.5" /> {busy ? "Saving…" : "Save"}
            </Button>
            <div className="relative">
              <button type="button" onClick={() => setMenu((m) => !m)} aria-label="More actions" aria-expanded={menu} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-300 hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </button>
              {menu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} aria-hidden />
                  <div className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-navy-900 py-1 text-sm shadow-2xl">
                    {[
                      { icon: <Download className="h-4 w-4" />, label: "Export JSON backup", onClick: exportJson },
                      { icon: <Upload className="h-4 w-4" />, label: "Import JSON", onClick: () => importInput.current?.click() },
                      { icon: <History className="h-4 w-4" />, label: "Version history", onClick: () => void openHistory() },
                      { icon: <RotateCcw className="h-4 w-4" />, label: "Reset to sample content", onClick: () => void resetToSample() },
                      { icon: <LogOut className="h-4 w-4" />, label: "Sign out", onClick: () => void signOut() },
                    ].map((item) => (
                      <button key={item.label} type="button" onClick={item.onClick} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-ink-200 hover:bg-white/[0.06] hover:text-white">
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-2 px-4 pt-4 sm:px-6">
        {!status.persistent && (
          <Banner tone="warn">
            No database is connected, so saved changes live in server memory only and will disappear on the next deploy or restart.
            Connect Upstash Redis (Vercel Marketplace → “Upstash for Redis”) and redeploy. Use “Export JSON backup” meanwhile.
          </Banner>
        )}
        {!status.authSecretSet && (
          <Banner tone="info">Set AUTH_SECRET in your hosting environment so sign-in cookies are signed with a dedicated secret.</Banner>
        )}
        {draft && (
          <Banner tone="info">
            You have an unsaved draft from {fmt(draft.savedAt)} in this browser.{" "}
            <button type="button" className="underline" onClick={() => { setDoc(draft.doc); setDraft(null); }}>Restore it</button>
            {" · "}
            <button type="button" className="underline" onClick={() => { localStorage.removeItem(DRAFT_KEY); setDraft(null); }}>Discard</button>
          </Banner>
        )}
        {conflict && (
          <Banner tone="warn">
            Someone saved a newer version. <button type="button" className="underline" onClick={() => void reloadLatest()}>Load the latest version</button> (your unsaved edits will be lost) or export your JSON first.
          </Banner>
        )}
        {notice && (
          <Banner tone={notice.kind === "ok" ? "ok" : notice.kind === "warn" ? "warn" : "error"} onClose={() => setNotice(null)}>
            {notice.text}
            {notice.issues && (
              <ul className="mt-1 list-disc pl-5 text-xs">
                {notice.issues.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </Banner>
        )}
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="mb-3 flex items-center justify-between text-xs text-ink-500">
            <span>Sections</span>
            <span title="Bracketed placeholders remaining">{totalPlaceholders} placeholders left</span>
          </div>
          <nav className="no-scrollbar flex gap-1 overflow-x-auto lg:flex-col" aria-label="Editor sections">
            {EDITOR_SECTIONS.map((s) => {
              const active = s.key === section;
              const n = placeholderCounts[s.key];
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSection(s.key)}
                  className={cn(
                    "flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                    active ? "bg-white/[0.08] text-white" : "text-ink-400 hover:bg-white/[0.04] hover:text-ink-100",
                  )}
                >
                  <span className="whitespace-nowrap">{s.title}</span>
                  {n > 0 && <span className="rounded-full bg-warning/15 px-1.5 font-mono text-[10px] text-ink-200">{n}</span>}
                </button>
              );
            })}
          </nav>
          <p className="mt-4 hidden text-[11px] leading-relaxed text-ink-600 lg:block">
            Tip: ⌘S / Ctrl+S saves. Bracketed text like [Team Name] is a placeholder and is outlined on the live site until replaced.
          </p>
        </aside>

        <main>
          <div className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-white">{current.title}</h1>
            <p className="mt-1 text-sm text-ink-400">{current.description}</p>
          </div>
          <div className="card p-5 sm:p-6">
            <Field
              schema={sectionSchema}
              value={doc[section]}
              onChange={(v) => setDoc((d) => ({ ...d, [section]: v }))}
              name={section}
              doc={doc}
              idPrefix={ID_PREFIX[section] ?? section}
              bare
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <span className="text-xs text-ink-500">{dirty ? "You have unsaved changes." : "Everything is saved."}</span>
            <Button variant="primary" onClick={() => void save()} disabled={busy || !dirty}>
              <Save className="h-4 w-4" /> Save changes
            </Button>
          </div>
        </main>
      </div>

      <Dialog open={history !== null} onClose={() => setHistory(null)} size="md" label="Version history">
        <div className="p-8">
          <div className="eyebrow">Version history</div>
          <h3 className="mt-2 text-xl font-semibold text-white">Earlier versions</h3>
          <p className="mt-1 text-sm text-ink-400">The last {history?.length ?? 0} saved versions. Loading one puts it in the editor; save to make it current.</p>
          <ul className="mt-5 divide-y divide-white/8">
            {history?.map((h, i) => (
              <li key={i} className="flex items-center justify-between py-3 text-sm">
                <span className="text-ink-200">
                  Version {h.version} <span className="text-ink-500">· {fmt(h.savedAt)}</span>
                </span>
                <Button size="sm" onClick={() => void loadVersion(i)}>
                  Load
                </Button>
              </li>
            ))}
            {history?.length === 0 && <li className="py-3 text-sm text-ink-500">No earlier versions yet.</li>}
          </ul>
        </div>
      </Dialog>
    </div>
  );
}

function Banner({ tone, children, onClose }: { tone: "ok" | "warn" | "error" | "info"; children: React.ReactNode; onClose?: () => void }) {
  const styles = {
    ok: "border-good/40 bg-good/10",
    warn: "border-warning/40 bg-warning/10",
    error: "border-critical/40 bg-critical/10",
    info: "border-electric-400/30 bg-electric-500/10",
  }[tone];
  const icon = {
    ok: <Check className="h-4 w-4" />,
    warn: <TriangleAlert className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
    info: <AlertCircle className="h-4 w-4" />,
  }[tone];
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border px-4 py-3 text-sm text-ink-100", styles)}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button type="button" onClick={onClose} className="text-xs text-ink-400 hover:text-white">
          Dismiss
        </button>
      )}
    </div>
  );
}
