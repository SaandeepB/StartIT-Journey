import { z } from "zod";
import { getMeta, newId, type FieldMeta } from "@/lib/content/schema";

/* Zod v3 introspection helpers used by the schema-driven editor. */

export type Unwrapped = {
  inner: z.ZodTypeAny;
  meta: FieldMeta;
  nullable: boolean;
  optional: boolean;
  hasDefault: boolean;
  defaultValue?: unknown;
};

type AnyDef = Record<string, unknown> & { typeName?: string };

function defOf(s: z.ZodTypeAny): AnyDef {
  return (s as unknown as { _def: AnyDef })._def;
}

export function typeName(s: z.ZodTypeAny): string {
  return String(defOf(s).typeName ?? "");
}

export function unwrap(schema: z.ZodTypeAny): Unwrapped {
  let s = schema;
  let meta: FieldMeta = {};
  let nullable = false;
  let optional = false;
  let hasDefault = false;
  let defaultValue: unknown;
  for (let i = 0; i < 8; i++) {
    const m = getMeta(s);
    if (m) meta = { ...m, ...meta };
    const t = typeName(s);
    const def = defOf(s);
    if (t === "ZodDefault") {
      if (!hasDefault) {
        hasDefault = true;
        defaultValue = (def.defaultValue as () => unknown)();
      }
      s = def.innerType as z.ZodTypeAny;
      continue;
    }
    if (t === "ZodOptional") {
      optional = true;
      s = def.innerType as z.ZodTypeAny;
      continue;
    }
    if (t === "ZodNullable") {
      nullable = true;
      s = def.innerType as z.ZodTypeAny;
      continue;
    }
    break;
  }
  return { inner: s, meta, nullable, optional, hasDefault, defaultValue };
}

export function shapeOf(s: z.ZodTypeAny): Record<string, z.ZodTypeAny> {
  return (s as z.ZodObject<z.ZodRawShape>).shape;
}

export function elementOf(s: z.ZodTypeAny): z.ZodTypeAny {
  return (s as z.ZodArray<z.ZodTypeAny>).element;
}

export function optionsOf(s: z.ZodTypeAny): string[] {
  return [...(s as z.ZodEnum<[string, ...string[]]>).options];
}

export function recordValueOf(s: z.ZodTypeAny): z.ZodTypeAny {
  return defOf(s).valueType as z.ZodTypeAny;
}

/** Build a sensible empty value for a schema (used when adding list items). */
export function defaultFor(schema: z.ZodTypeAny, idPrefix = "item", key?: string): unknown {
  const u = unwrap(schema);
  if (u.meta.widget === "readonly" && key === "id") return newId(idPrefix);
  switch (typeName(u.inner)) {
    case "ZodObject": {
      const out: Record<string, unknown> = {};
      for (const [k, child] of Object.entries(shapeOf(u.inner))) out[k] = defaultFor(child, idPrefix, k);
      if (u.hasDefault && u.defaultValue && typeof u.defaultValue === "object") Object.assign(out, u.defaultValue as object);
      return out;
    }
    case "ZodArray":
      return [];
    case "ZodString":
      return u.hasDefault ? u.defaultValue : "";
    case "ZodNumber":
      return u.hasDefault ? u.defaultValue : u.nullable ? null : 0;
    case "ZodBoolean":
      return u.hasDefault ? u.defaultValue : false;
    case "ZodEnum":
      return u.hasDefault ? u.defaultValue : optionsOf(u.inner)[0];
    case "ZodRecord":
      return {};
    default:
      return u.hasDefault ? u.defaultValue : u.nullable ? null : undefined;
  }
}

export function humanize(option: string): string {
  return option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, " ");
}

const TITLE_KEYS = ["title", "name", "teamName", "theme", "label", "roleTitle", "headline"];

export function itemTitle(item: unknown, fallback: string): string {
  if (item && typeof item === "object") {
    for (const k of TITLE_KEYS) {
      const v = (item as Record<string, unknown>)[k];
      if (typeof v === "string" && v.trim()) return v;
    }
  }
  return fallback;
}

export const ID_PREFIX: Record<string, string> = {
  rotations: "rotation",
  projects: "project",
  learning: "domain",
  aiInitiatives: "ai",
};

export function singular(label: string): string {
  if (/ies$/i.test(label)) return label.replace(/ies$/i, "y");
  if (/s$/i.test(label)) return label.replace(/s$/i, "");
  return label;
}
