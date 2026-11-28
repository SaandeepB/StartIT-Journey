import { z } from "zod";

/* ─────────────────────────────────────────────────────────────────────────────
   Content schema
   One zod schema describes the entire portfolio document. The viewer renders
   from it, the editor generates its forms from it, and the API validates
   against it. Field-level editor hints (widgets, multiline, help) are attached
   via `meta()` so the schema stays the single source of truth.
   ──────────────────────────────────────────────────────────────────────────── */

export type Widget =
  | "image"
  | "rotation"
  | "rotations"
  | "project"
  | "month"
  | "levels"
  | "readonly"
  | "hidden";

export type FieldMeta = {
  label?: string;
  help?: string;
  multiline?: boolean;
  rows?: number;
  widget?: Widget;
};

const metaMap = new WeakMap<z.ZodTypeAny, FieldMeta>();

export function meta<T extends z.ZodTypeAny>(schema: T, m: FieldMeta): T {
  metaMap.set(schema, m);
  return schema;
}

export function getMeta(schema: z.ZodTypeAny): FieldMeta | undefined {
  return metaMap.get(schema);
}

const text = (help?: string, label?: string) =>
  meta(z.string().default(""), { help, label });
const longText = (help?: string, rows = 4, label?: string) =>
  meta(z.string().default(""), { multiline: true, help, rows, label });
const strList = (help?: string, label?: string) =>
  meta(z.array(z.string()).default([]), { help, label });
const id = () => meta(z.string(), { widget: "readonly", label: "ID" });
const month = (help?: string) =>
  meta(z.string().default(""), { widget: "month", help });
const rotationRef = (help?: string) =>
  meta(z.string().default(""), { widget: "rotation", help, label: "Rotation" });
const rotationRefs = (help?: string) =>
  meta(z.array(z.string()).default([]), {
    widget: "rotations",
    help,
    label: "Rotations",
  });
const projectRef = (help?: string) =>
  meta(z.string().default(""), { widget: "project", help, label: "Example project" });

/* ── Enums ───────────────────────────────────────────────────────────────── */

export const OwnershipEnum = z.enum([
  "owned",
  "contributed",
  "collaborated",
  "identified",
]);
export type Ownership = z.infer<typeof OwnershipEnum>;

export const ProjectStatusEnum = z.enum([
  "delivered",
  "in-progress",
  "prototype",
  "proposed",
]);

export const LevelEnum = z.enum(["none", "introduced", "practiced", "applied"]);
export type Level = z.infer<typeof LevelEnum>;

export const MomentTypeEnum = z.enum(["high", "low", "turning"]);

export const AiStatusEnum = z.enum(["idea", "prototype", "pilot", "production"]);
export type AiStatus = z.infer<typeof AiStatusEnum>;

export const ThemeTypeEnum = z.enum(["strength", "improved", "developing"]);

/* ── Building blocks ─────────────────────────────────────────────────────── */

export const MetricSchema = z.object({
  label: text("What is measured, e.g. Hours saved per week"),
  value: text(
    "Enter the measured value only once verified, e.g. “6 hrs/week”. Leave blank or use [TBD] otherwise.",
  ),
  note: text("Optional: how it was measured, or the source"),
});
export type Metric = z.infer<typeof MetricSchema>;

export const ImageSchema = z.object({
  url: meta(z.string().default(""), {
    widget: "image",
    label: "Image",
    help: "Upload an image or paste a URL (screenshots, diagrams, dashboards)",
  }),
  caption: text(),
});

/* ── Rotation ────────────────────────────────────────────────────────────── */

export const RotationSchema = z.object({
  id: id(),
  teamName: text("Official team name"),
  businessFunction: text("e.g. Marketing Operations, Analytics, Technology"),
  startDate: month("Month the rotation started"),
  endDate: month("Month the rotation ended (or expected end)"),
  durationLabel: text("e.g. 6 months"),
  manager: text("Manager name and title"),
  mentor: text("Mentor name and title (optional)"),
  summary: longText("Two or three sentences on what the team does and what you focused on", 3),
  responsibilities: strList("Primary responsibilities, one per line"),
  technologies: strList("Technologies used in this rotation"),
  learnings: strList("Important learnings from this rotation"),
  rank: meta(z.number().nullable().default(null), {
    label: "My ranking",
    help: "Your preference ranking of this rotation (1 = top pick). Leave empty to hide the ranking.",
  }),
  rankReason: longText("One or two sentences on why it sits at this rank", 2, "Why this rank"),
});
export type Rotation = z.infer<typeof RotationSchema>;

/* ── Project ─────────────────────────────────────────────────────────────── */

export const ProjectSchema = z.object({
  id: id(),
  rotationId: rotationRef("Which rotation this project belongs to"),
  title: text(),
  subtitle: text("One-line summary shown on the card"),
  ownership: meta(OwnershipEnum.default("owned"), {
    help: "Owned = you personally owned it · Contributed = you delivered part · Collaborated = joint work · Identified = opportunity you spotted but did not implement",
  }),
  status: meta(ProjectStatusEnum.default("delivered"), {
    help: "Never mark a prototype as delivered",
  }),
  featured: meta(z.boolean().default(false), {
    help: "Featured projects appear in the executive summary",
  }),
  isSample: meta(z.boolean().default(false), {
    label: "Sample content",
    help: "Sample projects display a “replace me” badge until you turn this off",
  }),
  businessContext: longText("Where this work sits in the business"),
  problemStatement: longText("The specific problem, stated plainly"),
  whyItMattered: longText("Why the problem mattered to the team or business"),
  myRole: longText("Your role and what you were accountable for", 3),
  approach: longText("Approach and methodology"),
  tools: strList("Tools and technologies"),
  aiInvolvement: longText("How AI was involved, if applicable. Leave blank if not.", 3),
  challenges: longText("Challenges encountered"),
  solution: longText("Solution implemented"),
  businessImpact: longText("Business impact — only what you can evidence"),
  keyLearning: longText("Key learning", 3),
  metrics: meta(z.array(MetricSchema).default([]), {
    help: "Measurable outcomes. Never estimate — leave the value blank until you can verify it.",
  }),
  images: z.array(ImageSchema).default([]),
});
export type Project = z.infer<typeof ProjectSchema>;

/* ── Performance review ──────────────────────────────────────────────────── */

export const ReviewSchema = z.object({
  rotationId: rotationRef(),
  rating: text("Exactly as written on the review, e.g. “Exceeds Expectations” or “4”"),
  ratingScale: text("The scale used, e.g. “1–5” or “Below / Meets / Exceeds”"),
  numericValue: meta(z.number().nullable().default(null), {
    help: "Only if the scale is numeric. Used for the comparison chart when all scales match.",
  }),
  scaleMax: meta(z.number().nullable().default(null), {
    help: "Top of the numeric scale, e.g. 5",
  }),
  category: text("Performance category / band, e.g. “Strong Performer”"),
  managerFeedback: longText("Manager feedback — quote or faithful paraphrase", 5),
  feedbackSource: text("e.g. Final rotation review, March 2026"),
  strengths: strList("Key strengths recognised in the review"),
  developmentAreas: strList("Areas for development named in the review"),
  supportingExamples: strList("Examples of work that support the feedback"),
});
export type Review = z.infer<typeof ReviewSchema>;

export const FeedbackThemeSchema = z.object({
  theme: text("A recurring theme, e.g. “Takes ownership of ambiguous work”"),
  type: meta(ThemeTypeEnum.default("strength"), {
    help: "Strength = consistent · Improved = got measurably better · Developing = still growing",
  }),
  rotationIds: rotationRefs("Rotations where this theme appeared in feedback"),
  note: text("Optional supporting note"),
});
export type FeedbackTheme = z.infer<typeof FeedbackThemeSchema>;

/* ── Learning curve ──────────────────────────────────────────────────────── */

export const CapabilitySchema = z.object({
  name: text(),
  levels: meta(z.record(z.string(), LevelEnum).default({}), {
    widget: "levels",
    label: "Level by rotation",
    help: "Introduced = first exposure · Practiced = used with guidance · Applied = used independently",
  }),
  evidence: text("Optional: a project or example that evidences the level"),
});
export type Capability = z.infer<typeof CapabilitySchema>;

export const LearningDomainSchema = z.object({
  id: id(),
  title: text(),
  description: text(),
  isSample: meta(z.boolean().default(false), {
    label: "Sample levels",
    help: "Shows a “sample progression” note until you have set your real levels",
  }),
  capabilities: z.array(CapabilitySchema).default([]),
});
export type LearningDomain = z.infer<typeof LearningDomainSchema>;

/* ── Highs, lows, turning points ─────────────────────────────────────────── */

export const MomentSchema = z.object({
  type: MomentTypeEnum.default("high"),
  isSample: meta(z.boolean().default(false), {
    label: "Sample content",
    help: "Sample items display a “replace me” badge until you turn this off",
  }),
  title: text(),
  rotationId: rotationRef("Optional"),
  description: longText("What happened — keep it specific and honest"),
  lesson: longText("What you learned or how you adapted", 3),
});
export type Moment = z.infer<typeof MomentSchema>;

/* ── Beyond the rotations ────────────────────────────────────────────────── */

export const BeyondKindEnum = z.enum(["activity", "memory"]);

export const BeyondSchema = z.object({
  kind: meta(BeyondKindEnum.default("activity"), {
    help: "Activity = a role you took on outside your rotations · Memory = a moment worth remembering",
  }),
  isSample: meta(z.boolean().default(false), {
    label: "Sample content",
    help: "Sample items display a “replace me” badge until you turn this off",
  }),
  title: text("e.g. Trainer — Siemens GPT"),
  context: text("Where or when, e.g. Realize LIVE 2026"),
  description: longText("What you did and why it mattered", 4),
  images: z.array(ImageSchema).default([]),
});
export type BeyondItem = z.infer<typeof BeyondSchema>;

/* ── AI initiatives ──────────────────────────────────────────────────────── */

const WorkflowStateSchema = z.object({
  title: text("Short label, e.g. “Manual weekly report”"),
  steps: strList("Steps in the workflow, in order"),
  metrics: z.array(MetricSchema).default([]),
});

export const AiInitiativeSchema = z.object({
  id: id(),
  title: text(),
  isSample: meta(z.boolean().default(false), {
    label: "Sample content",
    help: "Sample items display a “replace me” badge until you turn this off",
  }),
  status: meta(AiStatusEnum.default("prototype"), {
    help: "Idea → Prototype → Pilot → Production. Never claim production for a proof of concept.",
  }),
  rotationId: rotationRef("Optional"),
  existingWorkflow: longText("1. Existing workflow", 3),
  friction: longText("2. Problem or friction point", 3),
  opportunity: longText("3. AI / automation opportunity", 3),
  architecture: strList(
    "4. Architecture as ordered steps, e.g. Business systems → Data sources → APIs → Analytics → AI layer → Insight → Action",
  ),
  technologies: strList("5. Technologies involved"),
  implemented: longText("6. What you personally implemented", 3),
  results: longText("7. Results or current development status", 3),
  nextOpportunity: longText("8. Next opportunity", 3),
  before: meta(WorkflowStateSchema, { label: "Before" }),
  after: meta(WorkflowStateSchema, { label: "After" }),
});
export type AiInitiative = z.infer<typeof AiInitiativeSchema>;

/* ── Connecting the dots & proposed role ─────────────────────────────────── */

export const ConnectingDotsSchema = z.object({
  pillars: z
    .array(
      z.object({
        label: text(),
        description: text("One line on what this perspective gave you"),
        rotationIds: rotationRefs("Where this perspective was built"),
      }),
    )
    .default([]),
  insight: longText("The bigger question you find yourself asking", 3),
  synthesis: longText("How the combination of experiences lets you see across boundaries", 4),
  crossBoundaryOpportunities: strList(
    "Opportunities you have identified that span more than one team or system",
  ),
});

export const PillarSchema = z.object({
  title: text(),
  description: longText("", 3),
  evidence: text("Which rotation or project demonstrates this"),
});

export const RoadmapPhaseSchema = z.object({
  label: text("e.g. First 30 days"),
  title: text("Short theme for the phase"),
  items: strList("Concrete activities"),
});

export const ProposedRoleSchema = z.object({
  roleTitle: text("Working title — can be refined with leadership"),
  positioning: text("One line on what the role connects"),
  pillars: z.array(PillarSchema).default([]),
  roadmap: z.array(RoadmapPhaseSchema).default([]),
  closingStatement: longText("", 4),
  asks: strList("What you need from leadership to make this real (optional)"),
});

/* ── Profile & summary ───────────────────────────────────────────────────── */

export const ProfileSchema = z.object({
  name: text(),
  designation: text("Professional designation, e.g. Rotational Analyst"),
  programName: text("Rotational program name"),
  organization: text(),
  programStart: month(),
  programEnd: month(),
  totalDurationLabel: text("e.g. 18 months"),
  headline: text("Landing page headline"),
  supportingStatement: text(),
  themeTitle: text("Storytelling theme"),
  themeSubtitle: text(),
  narrative: longText("The central narrative — keep it to four or five short sentences", 6),
  keyCapabilities: strList("Key capabilities developed (5–8 short phrases)"),
  photoUrl: meta(z.string().default(""), {
    widget: "image",
    label: "Photo",
    help: "Optional portrait",
  }),
  email: text("Optional — shown on the closing section"),
  linkedin: text("Optional — full URL"),
});

export const ExecutiveSummarySchema = z.object({
  headline: text(),
  summary: longText("Three or four sentences a senior leader can read in 30 seconds", 5),
  highlights: strList("Up to six evidence-backed highlights"),
});

export const SettingsSchema = z.object({
  highlightPlaceholders: meta(z.boolean().default(true), {
    label: "Highlight placeholders",
    help: "Outline any [bracketed] placeholder text so you can spot what still needs filling in. Turn off before presenting.",
  }),
  showSampleBadges: meta(z.boolean().default(true), {
    label: "Show sample badges",
    help: "Mark sample projects and initiatives until you replace them",
  }),
  showMetricsWithoutValues: meta(z.boolean().default(true), {
    label: "Show metrics without values",
    help: "Display metric labels whose value is still blank (as “to be measured”)",
  }),
});

/* ── Root document ───────────────────────────────────────────────────────── */

export const ContentSchema = z.object({
  meta: z
    .object({
      version: z.number().default(1),
      updatedAt: z.string().default(""),
    })
    .default({ version: 1, updatedAt: "" }),
  profile: ProfileSchema,
  rotations: z.array(RotationSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  performance: z.array(ReviewSchema).default([]),
  feedbackThemes: z.array(FeedbackThemeSchema).default([]),
  learning: z.array(LearningDomainSchema).default([]),
  moments: z.array(MomentSchema).default([]),
  beyond: z.array(BeyondSchema).default([]),
  aiInitiatives: z.array(AiInitiativeSchema).default([]),
  connectingDots: ConnectingDotsSchema,
  proposedRole: ProposedRoleSchema,
  executiveSummary: ExecutiveSummarySchema,
  settings: SettingsSchema.default({}),
});

export type Content = z.infer<typeof ContentSchema>;

/* ── Editor section registry ─────────────────────────────────────────────── */

export type SectionKey = Exclude<keyof Content, "meta">;

export const EDITOR_SECTIONS: {
  key: SectionKey;
  title: string;
  description: string;
  group: string;
}[] = [
  { group: "01 Introduction", key: "profile", title: "Profile & introduction", description: "Name, program, headline, narrative, key capabilities and photo." },
  { group: "02 The Journey", key: "rotations", title: "Rotations", description: "The three teams: dates, people, responsibilities, tools, learnings and your ranking." },
  { group: "02 The Journey", key: "moments", title: "Highs, lows & turning points", description: "Shown inside each rotation. Pick the rotation each moment belongs to." },
  { group: "02 The Journey", key: "beyond", title: "Beyond the rotations", description: "Roles outside your rotations and memories worth sharing, with photos." },
  { group: "03 Projects & Impact", key: "projects", title: "Projects", description: "Case studies organised by rotation. The most important section." },
  { group: "03 Projects & Impact", key: "aiInitiatives", title: "AI initiatives", description: "Before/after workflows, what you built, status and next steps." },
  { group: "04 Growth & Feedback", key: "performance", title: "Performance reviews", description: "Final ratings, scales, manager feedback and supporting evidence." },
  { group: "04 Growth & Feedback", key: "feedbackThemes", title: "Feedback themes", description: "Recurring strengths, improvements and development areas." },
  { group: "04 Growth & Feedback", key: "learning", title: "Learning curve", description: "Capabilities and the level reached in each rotation." },
  { group: "05 What's Next", key: "connectingDots", title: "Connecting the dots", description: "The strategic synthesis across rotations." },
  { group: "05 What's Next", key: "proposedRole", title: "Proposed role", description: "Pillars, 30-60-90 roadmap and closing message." },
  { group: "Other", key: "executiveSummary", title: "Executive summary", description: "The one-page version for leadership (/summary)." },
  { group: "Other", key: "settings", title: "Settings", description: "Placeholder highlighting and sample badges." },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const PLACEHOLDER_RE = /\[[^\]]+\]/g;

/** True when the string contains [bracketed] placeholder text. */
export function hasPlaceholder(value: string): boolean {
  return PLACEHOLDER_RE.test(value) && !!value.match(PLACEHOLDER_RE);
}

/** Count placeholders anywhere in the document (for the editor's checklist). */
export function countPlaceholders(value: unknown): number {
  if (typeof value === "string") return (value.match(PLACEHOLDER_RE) ?? []).length;
  if (Array.isArray(value)) return value.reduce<number>((n, v) => n + countPlaceholders(v), 0);
  if (value && typeof value === "object")
    return Object.values(value as Record<string, unknown>).reduce<number>(
      (n, v) => n + countPlaceholders(v),
      0,
    );
  return 0;
}

export function newId(prefix = "item"): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${rand}`;
}
