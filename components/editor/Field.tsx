"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import { ChevronDown, ChevronUp, Copy, ImagePlus, Plus, Trash2, Upload, X } from "lucide-react";
import type { Content } from "@/lib/content/schema";
import { LEVEL } from "@/lib/content/helpers";
import { cn, titleCase } from "@/lib/utils";
import {
  defaultFor,
  elementOf,
  humanize,
  itemTitle,
  optionsOf,
  recordValueOf,
  shapeOf,
  singular,
  typeName,
  unwrap,
  type Unwrapped,
} from "./schema-utils";

export type FieldProps = {
  schema: z.ZodTypeAny;
  value: unknown;
  onChange: (v: unknown) => void;
  name: string;
  doc: Content;
  idPrefix?: string;
  /** Hide the field's own label (used for roots). */
  bare?: boolean;
};

export const inputCls =
  "w-full rounded-lg border border-white/10 bg-navy-950/70 px-3 py-2 text-sm text-white placeholder:text-ink-600 focus:border-electric-400 focus:outline-none disabled:opacity-60";

function Wrap({
  label,
  help,
  children,
  bare,
}: {
  label: string;
  help?: string;
  children: React.ReactNode;
  bare?: boolean;
}) {
  if (bare) return <>{children}</>;
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-ink-300">{label}</div>
      {children}
      {help && <p className="mt-1.5 text-[11px] leading-relaxed text-ink-500">{help}</p>}
    </div>
  );
}

const iconBtn =
  "flex h-7 w-7 items-center justify-center rounded-md text-ink-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent";

/* ── Leaf widgets ────────────────────────────────────────────────────────── */

function StringList({ value, onChange, label }: { value: string[]; onChange: (v: string[]) => void; label: string }) {
  const items = value ?? [];
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const update = (i: number, v: string) => onChange(items.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const insertAfter = (i: number) => {
    const next = [...items];
    next.splice(i + 1, 0, "");
    onChange(next);
    window.setTimeout(() => refs.current[i + 1]?.focus(), 20);
  };
  return (
    <div className="space-y-1.5">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-1">
          <input
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={inputCls}
            value={it}
            aria-label={`${label} ${i + 1}`}
            onChange={(e) => update(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                insertAfter(i);
              }
              if (e.key === "Backspace" && it === "" && items.length > 1) {
                e.preventDefault();
                remove(i);
                window.setTimeout(() => refs.current[Math.max(0, i - 1)]?.focus(), 20);
              }
            }}
          />
          <button type="button" className={iconBtn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button type="button" className={iconBtn} onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button type="button" className={iconBtn} onClick={() => remove(i)} aria-label="Remove">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => insertAfter(items.length - 1)}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-electric-300 hover:bg-white/[0.05]"
      >
        <Plus className="h-3.5 w-3.5" /> Add line
      </button>
    </div>
  );
}

function ImageField({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (res.ok && data.url) onChange(data.url);
    else setError(data.error ?? "Upload failed.");
    setBusy(false);
  }

  return (
    <div className="flex gap-3">
      <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-navy-950/60">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImagePlus className="h-5 w-5 text-ink-600" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <input className={inputCls} value={value ?? ""} placeholder="https://… or upload" aria-label={label} onChange={(e) => onChange(e.target.value)} />
        <div className="mt-1.5 flex items-center gap-2">
          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-ink-200 hover:bg-white/[0.05] disabled:opacity-50"
          >
            <Upload className="h-3.5 w-3.5" /> {busy ? "Uploading…" : "Upload image"}
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className="text-xs text-ink-500 hover:text-white">
              Clear
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-[11px] text-serious">{error}</p>}
      </div>
    </div>
  );
}

function RotationSelect({ value, onChange, doc, label }: { value: string; onChange: (v: string) => void; doc: Content; label: string }) {
  return (
    <select className={inputCls} value={value ?? ""} aria-label={label} onChange={(e) => onChange(e.target.value)}>
      <option value="">— none —</option>
      {doc.rotations.map((r, i) => (
        <option key={r.id} value={r.id}>
          R{i + 1} · {r.teamName || r.id}
        </option>
      ))}
    </select>
  );
}

function ProjectSelect({ value, onChange, doc, label }: { value: string; onChange: (v: string) => void; doc: Content; label: string }) {
  return (
    <select className={inputCls} value={value ?? ""} aria-label={label} onChange={(e) => onChange(e.target.value)}>
      <option value="">— none —</option>
      {doc.projects.map((p) => {
        const idx = doc.rotations.findIndex((r) => r.id === p.rotationId);
        return (
          <option key={p.id} value={p.id}>
            {idx >= 0 ? `R${idx + 1} · ` : ""}
            {p.title || p.id}
          </option>
        );
      })}
    </select>
  );
}

function RotationChecks({ value, onChange, doc }: { value: string[]; onChange: (v: string[]) => void; doc: Content }) {
  const selected = value ?? [];
  return (
    <div className="flex flex-wrap gap-2">
      {doc.rotations.map((r, i) => {
        const on = selected.includes(r.id);
        return (
          <label
            key={r.id}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-xs",
              on ? "border-electric-400/50 bg-electric-500/15 text-white" : "border-white/10 text-ink-400",
            )}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={on}
              onChange={(e) =>
                onChange(e.target.checked ? [...selected, r.id] : selected.filter((x) => x !== r.id))
              }
            />
            R{i + 1} · {r.teamName || r.id}
          </label>
        );
      })}
    </div>
  );
}

function LevelsField({
  value,
  onChange,
  doc,
  options,
}: {
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
  doc: Content;
  options: string[];
}) {
  const current = value ?? {};
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {doc.rotations.map((r, i) => (
        <label key={r.id} className="block">
          <span className="text-[11px] text-ink-500">
            R{i + 1} · {r.teamName || r.id}
          </span>
          <select
            className={cn(inputCls, "mt-1")}
            value={current[r.id] ?? "none"}
            onChange={(e) => onChange({ ...current, [r.id]: e.target.value })}
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {LEVEL[o as keyof typeof LEVEL]?.label ?? humanize(o)}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}

/* ── Composite widgets ───────────────────────────────────────────────────── */

function ObjectFields({ u, value, onChange, doc, idPrefix }: { u: Unwrapped; value: unknown; onChange: (v: unknown) => void; doc: Content; idPrefix?: string }) {
  const shape = shapeOf(u.inner);
  const obj = (value ?? {}) as Record<string, unknown>;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Object.entries(shape).map(([key, child]) => {
        const cu = unwrap(child);
        if (cu.meta.widget === "hidden") return null;
        const t = typeName(cu.inner);
        const wide =
          cu.meta.multiline || ["ZodArray", "ZodObject", "ZodRecord"].includes(t) || cu.meta.widget === "image";
        return (
          <div key={key} className={cn(wide && "sm:col-span-2")}>
            <Field schema={child} value={obj[key]} onChange={(v) => onChange({ ...obj, [key]: v })} name={key} doc={doc} idPrefix={idPrefix} />
          </div>
        );
      })}
    </div>
  );
}

function ObjectList({ u, value, onChange, name, doc, idPrefix, label, help }: { u: Unwrapped; value: unknown; onChange: (v: unknown) => void; name: string; doc: Content; idPrefix?: string; label: string; help?: string }) {
  const el = elementOf(u.inner);
  const items = ((value ?? []) as unknown[]).map((x) => (x && typeof x === "object" ? x : {})) as Record<string, unknown>[];
  const [open, setOpen] = useState<number | null>(items.length === 1 ? 0 : null);
  const itemLabel = singular(label);

  const set = (next: Record<string, unknown>[]) => onChange(next);
  const add = () => {
    const next = [...items, defaultFor(el, idPrefix ?? name) as Record<string, unknown>];
    set(next);
    setOpen(next.length - 1);
  };
  const remove = (i: number) => {
    if (!window.confirm(`Remove “${itemTitle(items[i], `${itemLabel} ${i + 1}`)}”? This cannot be undone after saving.`)) return;
    set(items.filter((_, j) => j !== i));
    setOpen(null);
  };
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
    setOpen(j);
  };
  const duplicate = (i: number) => {
    const copy = JSON.parse(JSON.stringify(items[i])) as Record<string, unknown>;
    if (typeof copy.id === "string") copy.id = `${(defaultFor(el, idPrefix ?? name, "id") as string) ?? copy.id}`;
    if (typeof copy.title === "string") copy.title = `${copy.title} (copy)`;
    const next = [...items];
    next.splice(i + 1, 0, copy);
    set(next);
    setOpen(i + 1);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-ink-300">
            {label} <span className="text-ink-600">· {items.length}</span>
          </div>
          {help && <p className="mt-0.5 text-[11px] text-ink-500">{help}</p>}
        </div>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 rounded-full border border-electric-400/40 bg-electric-500/10 px-3 py-1 text-xs font-medium text-electric-300 hover:bg-electric-500/20"
        >
          <Plus className="h-3.5 w-3.5" /> Add {itemLabel.toLowerCase()}
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={cn("rounded-xl border bg-white/[0.02]", isOpen ? "border-electric-400/40" : "border-white/10")}>
              <div className="flex items-center gap-1 pr-2">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="font-mono text-[11px] text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                  <span className="truncate text-sm font-medium text-white">{itemTitle(item, `${itemLabel} ${i + 1}`)}</span>
                  <ChevronDown className={cn("ml-auto h-4 w-4 shrink-0 text-ink-500 transition", isOpen && "rotate-180")} />
                </button>
                <button type="button" className={iconBtn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button type="button" className={iconBtn} onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button type="button" className={iconBtn} onClick={() => duplicate(i)} aria-label="Duplicate">
                  <Copy className="h-4 w-4" />
                </button>
                <button type="button" className={cn(iconBtn, "hover:text-critical")} onClick={() => remove(i)} aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-white/8 p-4">
                  <Field schema={el} value={item} onChange={(v) => set(items.map((x, j) => (j === i ? (v as Record<string, unknown>) : x)))} name={itemLabel} doc={doc} idPrefix={idPrefix ?? name} bare />
                </div>
              )}
            </div>
          );
        })}
        {items.length === 0 && <p className="rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-ink-500">Nothing here yet.</p>}
      </div>
    </div>
  );
}

/* ── Dispatcher ──────────────────────────────────────────────────────────── */

export function Field(props: FieldProps) {
  const { schema, value, onChange, name, doc, idPrefix, bare } = props;
  const u = unwrap(schema);
  const { meta } = u;
  if (meta.widget === "hidden") return null;
  const label = meta.label ?? titleCase(name);
  const t = typeName(u.inner);

  if (t === "ZodObject") {
    const body = <ObjectFields u={u} value={value} onChange={onChange} doc={doc} idPrefix={idPrefix} />;
    if (bare) return body;
    return (
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-1 text-xs font-medium text-ink-300">{label}</legend>
        {meta.help && <p className="mb-3 text-[11px] text-ink-500">{meta.help}</p>}
        {body}
      </fieldset>
    );
  }

  if (t === "ZodArray") {
    const el = elementOf(u.inner);
    const eu = unwrap(el);
    if (meta.widget === "rotations") {
      return (
        <Wrap label={label} help={meta.help} bare={bare}>
          <RotationChecks value={(value ?? []) as string[]} onChange={onChange} doc={doc} />
        </Wrap>
      );
    }
    if (typeName(eu.inner) === "ZodString") {
      return (
        <Wrap label={label} help={meta.help} bare={bare}>
          <StringList value={(value ?? []) as string[]} onChange={onChange} label={label} />
        </Wrap>
      );
    }
    return <ObjectList u={u} value={value} onChange={onChange} name={name} doc={doc} idPrefix={idPrefix} label={label} help={meta.help} />;
  }

  if (t === "ZodRecord" && meta.widget === "levels") {
    return (
      <Wrap label={label} help={meta.help} bare={bare}>
        <LevelsField value={(value ?? {}) as Record<string, string>} onChange={onChange} doc={doc} options={optionsOf(unwrap(recordValueOf(u.inner)).inner)} />
      </Wrap>
    );
  }

  if (t === "ZodBoolean") {
    const on = !!value;
    return (
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-3">
        <span
          role="switch"
          aria-checked={on}
          className={cn("relative mt-0.5 inline-flex h-5 w-9 shrink-0 rounded-full transition", on ? "bg-electric-500" : "bg-white/15")}
        >
          <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition", on ? "left-[18px]" : "left-0.5")} />
        </span>
        <input type="checkbox" className="sr-only" checked={on} onChange={(e) => onChange(e.target.checked)} />
        <span>
          <span className="block text-sm text-white">{label}</span>
          {meta.help && <span className="block text-[11px] text-ink-500">{meta.help}</span>}
        </span>
      </label>
    );
  }

  if (t === "ZodEnum") {
    return (
      <Wrap label={label} help={meta.help} bare={bare}>
        <select className={inputCls} value={String(value ?? "")} aria-label={label} onChange={(e) => onChange(e.target.value)}>
          {optionsOf(u.inner).map((o) => (
            <option key={o} value={o}>
              {humanize(o)}
            </option>
          ))}
        </select>
      </Wrap>
    );
  }

  if (t === "ZodNumber") {
    return (
      <Wrap label={label} help={meta.help} bare={bare}>
        <input
          type="number"
          step="any"
          className={inputCls}
          aria-label={label}
          value={value === null || value === undefined ? "" : String(value)}
          placeholder={u.nullable ? "leave blank if not numeric" : ""}
          onChange={(e) => onChange(e.target.value === "" ? (u.nullable ? null : 0) : Number(e.target.value))}
        />
      </Wrap>
    );
  }

  if (t === "ZodString") {
    const str = (value ?? "") as string;
    let control: React.ReactNode;
    switch (meta.widget) {
      case "image":
        control = <ImageField value={str} onChange={onChange} label={label} />;
        break;
      case "month":
        control = <input type="month" className={inputCls} aria-label={label} value={str} onChange={(e) => onChange(e.target.value)} />;
        break;
      case "rotation":
        control = <RotationSelect value={str} onChange={onChange} doc={doc} label={label} />;
        break;
      case "project":
        control = <ProjectSelect value={str} onChange={onChange} doc={doc} label={label} />;
        break;
      case "readonly":
        control = <input className={cn(inputCls, "font-mono text-xs")} aria-label={label} value={str} readOnly disabled />;
        break;
      default:
        control = meta.multiline ? (
          <textarea className={cn(inputCls, "leading-relaxed")} aria-label={label} rows={meta.rows ?? 4} value={str} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input className={inputCls} aria-label={label} value={str} onChange={(e) => onChange(e.target.value)} />
        );
    }
    return (
      <Wrap label={label} help={meta.help} bare={bare}>
        {control}
      </Wrap>
    );
  }

  return (
    <Wrap label={label} bare={bare}>
      <p className="text-xs text-ink-500">Unsupported field type ({t}).</p>
    </Wrap>
  );
}
