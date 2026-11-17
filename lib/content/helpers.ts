import type {
  AiStatus,
  Capability,
  Content,
  Exposure,
  Level,
  Ownership,
  Project,
  Review,
  Rotation,
} from "./schema";

/* ── Rotation identity ───────────────────────────────────────────────────── */

export const ROTATION_COLOR_VARS = ["--color-r1", "--color-r2", "--color-r3"] as const;

export function rotationColor(index: number): string {
  if (index < 0) return "var(--color-ink-500)";
  return `var(${ROTATION_COLOR_VARS[index % 3]})`;
}

export function rotationIndex(content: Content, id: string | undefined): number {
  if (!id) return -1;
  return content.rotations.findIndex((r) => r.id === id);
}

export function rotationById(content: Content, id: string | undefined): Rotation | undefined {
  return content.rotations.find((r) => r.id === id);
}

export function rotationShort(index: number): string {
  return index >= 0 ? `R${index + 1}` : "—";
}

export function rotationName(content: Content, id: string | undefined, fallback = "Across rotations"): string {
  return rotationById(content, id)?.teamName || fallback;
}

export function projectsFor(content: Content, rotationId: string): Project[] {
  return content.projects.filter((p) => p.rotationId === rotationId);
}

export function projectById(content: Content, id: string | undefined): Project | undefined {
  if (!id) return undefined;
  return content.projects.find((p) => p.id === id);
}

export function reviewFor(content: Content, rotationId: string): Review | undefined {
  return content.performance.find((r) => r.rotationId === rotationId);
}

/* ── Labels ──────────────────────────────────────────────────────────────── */

export const OWNERSHIP: Record<Ownership, { label: string; short: string; description: string }> = {
  owned: { label: "Personally owned", short: "Owned", description: "Work I personally owned end to end" },
  contributed: { label: "Contributed to", short: "Contributed", description: "Work where I delivered a defined part" },
  collaborated: { label: "Collaborated on", short: "Collaborated", description: "Joint work with named partners" },
  identified: {
    label: "Identified, not implemented",
    short: "Identified",
    description: "Opportunities I identified but did not implement",
  },
};

export const PROJECT_STATUS: Record<Project["status"], string> = {
  delivered: "Delivered",
  "in-progress": "In progress",
  prototype: "Prototype",
  proposed: "Proposed",
};

export const EXPOSURE: Record<Exposure, { label: string; rank: number; description: string }> = {
  familiar: { label: "Familiar", rank: 1, description: "Theoretical familiarity, limited hands-on use" },
  guided: { label: "Guided use", rank: 2, description: "Used with support from the team" },
  "hands-on": { label: "Hands-on", rank: 3, description: "Implemented myself in real work" },
  independent: { label: "Independent", rank: 4, description: "Designed and implemented end to end" },
};

export const LEVEL: Record<Level, { label: string; rank: number; short: string }> = {
  none: { label: "Not yet", rank: 0, short: "—" },
  introduced: { label: "Introduced", rank: 1, short: "I" },
  practiced: { label: "Practiced", rank: 2, short: "P" },
  applied: { label: "Independently applied", rank: 3, short: "A" },
};

export const AI_STATUS: Record<AiStatus, { label: string; description: string }> = {
  idea: { label: "Idea", description: "Use case identified, not yet built" },
  prototype: { label: "Prototype", description: "Working proof of concept, not relied on" },
  pilot: { label: "Pilot", description: "Used by a limited group under evaluation" },
  production: { label: "In production", description: "Relied on in day-to-day work" },
};

export const MOMENT_TYPE = {
  high: { label: "Highs", singular: "High", intro: "Work I am proud of and moments that mattered." },
  low: { label: "Lows & lessons", singular: "Low", intro: "What did not go to plan, and how I adapted." },
  turning: { label: "Turning points", singular: "Turning point", intro: "Moments that changed how I think about the work." },
} as const;

export const THEME_TYPE = {
  strength: { label: "Consistent strengths", short: "Strength" },
  improved: { label: "Skills that improved", short: "Improved" },
  developing: { label: "Still developing", short: "Developing" },
} as const;

/* ── Rules ───────────────────────────────────────────────────────────────── */

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Ratings may only be compared numerically when every rotation has a numeric
 * value on the same scale. Otherwise the viewer shows them side by side only.
 */
export function compatibleScales(reviews: Review[]): boolean {
  if (reviews.length < 2) return false;
  if (!reviews.every((r) => r.numericValue != null && r.scaleMax != null && r.scaleMax > 0)) return false;
  const max = reviews[0].scaleMax;
  const scale = norm(reviews[0].ratingScale);
  return reviews.every((r) => r.scaleMax === max && norm(r.ratingScale) === scale);
}

export function isPlaceholder(value: string | undefined): boolean {
  return !!value && /^\s*\[[^\]]*\]\s*$/.test(value);
}

export function hasText(value: string | undefined | null): value is string {
  return !!value && value.trim().length > 0;
}

/* ── Derived data ────────────────────────────────────────────────────────── */

export function levelCounts(capabilities: Capability[], rotationIds: string[]) {
  return rotationIds.map((rid) => {
    const counts = { introduced: 0, practiced: 0, applied: 0 };
    for (const c of capabilities) {
      const lvl = c.levels[rid];
      if (lvl && lvl !== "none") counts[lvl] += 1;
    }
    return { rotationId: rid, ...counts, total: capabilities.length };
  });
}

export function summaryStats(content: Content) {
  const technologies = new Set(content.techStack.map((t) => t.name));
  return {
    rotations: content.rotations.length,
    projects: content.projects.length,
    owned: content.projects.filter((p) => p.ownership === "owned").length,
    technologies: technologies.size,
    aiInitiatives: content.aiInitiatives.length,
    duration: content.profile.totalDurationLabel,
  };
}

export function featuredProjects(content: Content): Project[] {
  const featured = content.projects.filter((p) => p.featured);
  return featured.length ? featured : content.projects.slice(0, 3);
}
