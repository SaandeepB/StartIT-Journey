import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { ContentSchema, type Content } from "./schema";
import { DEFAULT_CONTENT } from "./defaults";

/* ─────────────────────────────────────────────────────────────────────────────
   Content store — a single JSON document plus a short version history.

   Adapters (chosen automatically from the environment):
   • kv     — Upstash Redis / Vercel KV via REST. Persistent, cross-device.
   • file   — data/content.json. Local development only.
   • memory — fallback when deployed without a database. NOT persistent; the
              editor shows a warning so nobody loses work unknowingly.
   All database access happens server-side; no credentials reach the browser.
   ──────────────────────────────────────────────────────────────────────────── */

export type StoreKind = "kv" | "file" | "memory";

export interface HistoryEntry {
  savedAt: string;
  version: number;
}

export interface ContentStore {
  kind: StoreKind;
  persistent: boolean;
  get(): Promise<unknown | null>;
  set(content: Content, previous: Content | null): Promise<void>;
  history(): Promise<HistoryEntry[]>;
  getHistoryItem(index: number): Promise<unknown | null>;
}

const KEY = "portfolio:content";
const HISTORY_KEY = "portfolio:history";
const HISTORY_LIMIT = 10;

/* ── KV adapter ──────────────────────────────────────────────────────────── */

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

function kvStore(env: { url: string; token: string }): ContentStore {
  const redis = new Redis({ url: env.url, token: env.token, automaticDeserialization: false });
  return {
    kind: "kv",
    persistent: true,
    async get() {
      const raw = await redis.get<string>(KEY);
      return raw ? JSON.parse(raw) : null;
    },
    async set(content, previous) {
      const pipeline = redis.pipeline();
      pipeline.set(KEY, JSON.stringify(content));
      if (previous) {
        pipeline.lpush(HISTORY_KEY, JSON.stringify(previous));
        pipeline.ltrim(HISTORY_KEY, 0, HISTORY_LIMIT - 1);
      }
      await pipeline.exec();
    },
    async history() {
      const items = await redis.lrange<string>(HISTORY_KEY, 0, HISTORY_LIMIT - 1);
      return items.map((raw) => {
        const c = JSON.parse(raw) as Content;
        return { savedAt: c.meta?.updatedAt ?? "", version: c.meta?.version ?? 0 };
      });
    },
    async getHistoryItem(index) {
      const items = await redis.lrange<string>(HISTORY_KEY, index, index);
      return items[0] ? JSON.parse(items[0]) : null;
    },
  };
}

/* ── File adapter (development) ──────────────────────────────────────────── */

function fileStore(): ContentStore {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "content.json");
  const historyDir = path.join(dir, "history");

  async function listHistoryFiles(): Promise<string[]> {
    try {
      const files = await fs.readdir(historyDir);
      return files.filter((f) => f.endsWith(".json")).sort().reverse();
    } catch {
      return [];
    }
  }

  return {
    kind: "file",
    persistent: true,
    async get() {
      try {
        return JSON.parse(await fs.readFile(file, "utf8"));
      } catch {
        return null;
      }
    },
    async set(content, previous) {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(file, JSON.stringify(content, null, 2), "utf8");
      if (previous) {
        await fs.mkdir(historyDir, { recursive: true });
        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        await fs.writeFile(path.join(historyDir, `${stamp}.json`), JSON.stringify(previous), "utf8");
        const files = await listHistoryFiles();
        await Promise.all(files.slice(HISTORY_LIMIT).map((f) => fs.unlink(path.join(historyDir, f))));
      }
    },
    async history() {
      const files = await listHistoryFiles();
      const entries: HistoryEntry[] = [];
      for (const f of files) {
        try {
          const c = JSON.parse(await fs.readFile(path.join(historyDir, f), "utf8")) as Content;
          entries.push({ savedAt: c.meta?.updatedAt ?? "", version: c.meta?.version ?? 0 });
        } catch {
          /* skip unreadable */
        }
      }
      return entries;
    },
    async getHistoryItem(index) {
      const files = await listHistoryFiles();
      const f = files[index];
      if (!f) return null;
      return JSON.parse(await fs.readFile(path.join(historyDir, f), "utf8"));
    },
  };
}

/* ── Memory adapter (deployed without a database) ────────────────────────── */

const memory: { content: Content | null; history: Content[] } = { content: null, history: [] };

function memoryStore(): ContentStore {
  return {
    kind: "memory",
    persistent: false,
    async get() {
      return memory.content;
    },
    async set(content, previous) {
      memory.content = content;
      if (previous) memory.history = [previous, ...memory.history].slice(0, HISTORY_LIMIT);
    },
    async history() {
      return memory.history.map((c) => ({ savedAt: c.meta.updatedAt, version: c.meta.version }));
    },
    async getHistoryItem(index) {
      return memory.history[index] ?? null;
    },
  };
}

/* ── Selection ───────────────────────────────────────────────────────────── */

let cached: ContentStore | null = null;

export function getStore(): ContentStore {
  if (cached) return cached;
  const kv = kvEnv();
  if (kv) cached = kvStore(kv);
  else if (process.env.VERCEL || process.env.FORCE_MEMORY_STORE) cached = memoryStore();
  else cached = fileStore();
  return cached;
}

export function storeStatus() {
  const s = getStore();
  return {
    kind: s.kind,
    persistent: s.persistent,
    blobConfigured: !!process.env.BLOB_READ_WRITE_TOKEN,
    editEnabled: !!process.env.EDIT_PASSWORD,
    viewProtected: !!process.env.VIEW_PASSWORD,
    authSecretSet: !!process.env.AUTH_SECRET,
  };
}

/* ── Normalisation ───────────────────────────────────────────────────────── */

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/** Deep-merge defaults into a stored document so new fields get sensible values. */
function mergeDefaults(base: unknown, stored: unknown): unknown {
  if (Array.isArray(stored)) return stored;
  if (isObject(base) && isObject(stored)) {
    const out: Record<string, unknown> = { ...base };
    for (const [k, v] of Object.entries(stored)) {
      out[k] = k in base ? mergeDefaults(base[k], v) : v;
    }
    return out;
  }
  return stored === undefined ? base : stored;
}

export function normalise(raw: unknown): Content {
  const direct = ContentSchema.safeParse(raw);
  if (direct.success) return direct.data;
  const merged = ContentSchema.safeParse(mergeDefaults(DEFAULT_CONTENT, raw));
  if (merged.success) return merged.data;
  return DEFAULT_CONTENT;
}

/* ── Public API ──────────────────────────────────────────────────────────── */

/** Read the current document. Deduplicated per request in server components. */
export const getContent = cache(async (): Promise<Content> => {
  try {
    const raw = await getStore().get();
    return raw ? normalise(raw) : DEFAULT_CONTENT;
  } catch (err) {
    console.error("[content] read failed, serving defaults:", err);
    return DEFAULT_CONTENT;
  }
});

export class ConflictError extends Error {
  constructor() {
    super("The portfolio was updated elsewhere. Reload to get the latest version before saving.");
    this.name = "ConflictError";
  }
}

export async function saveContent(input: unknown, expectedVersion?: number): Promise<Content> {
  const parsed = ContentSchema.parse(input);
  const store = getStore();
  const currentRaw = await store.get();
  const current = currentRaw ? normalise(currentRaw) : null;
  if (
    current &&
    typeof expectedVersion === "number" &&
    current.meta.version !== expectedVersion
  ) {
    throw new ConflictError();
  }
  const next: Content = {
    ...parsed,
    meta: {
      version: (current?.meta.version ?? parsed.meta.version ?? 0) + 1,
      updatedAt: new Date().toISOString(),
    },
  };
  await store.set(next, current);
  return next;
}

export async function resetContent(): Promise<Content> {
  const store = getStore();
  const currentRaw = await store.get();
  const current = currentRaw ? normalise(currentRaw) : null;
  const next: Content = {
    ...DEFAULT_CONTENT,
    meta: { version: (current?.meta.version ?? 0) + 1, updatedAt: new Date().toISOString() },
  };
  await store.set(next, current);
  return next;
}
