export const SECTIONS = [
  { id: "intro", number: "01", label: "Introduction", short: "Intro" },
  { id: "journey", number: "02", label: "The Rotational Journey", short: "Journey" },
  { id: "projects", number: "03", label: "Project Portfolio", short: "Projects" },
  { id: "performance", number: "04", label: "Performance & Team Feedback", short: "Performance" },
  { id: "learning", number: "05", label: "The Learning Curve", short: "Learning" },
  { id: "moments", number: "06", label: "Highs, Lows & Turning Points", short: "Moments" },
  { id: "stack", number: "07", label: "Technology Stack", short: "Stack" },
  { id: "ai", number: "08", label: "AI in Action", short: "AI" },
  { id: "connecting", number: "09", label: "Connecting the Dots", short: "Synthesis" },
  { id: "role", number: "10", label: "Proposed Full-Time Role", short: "Next" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
export const SECTION_IDS: readonly SectionId[] = SECTIONS.map((s) => s.id);

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Index of the section currently nearest the top of the viewport. */
export function currentSectionIndex(): number {
  const offset = window.scrollY + window.innerHeight * 0.35;
  let idx = 0;
  SECTION_IDS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= offset) idx = i;
  });
  return idx;
}
