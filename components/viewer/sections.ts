export const SECTIONS = [
  { id: "intro", number: "01", label: "Introduction", short: "Intro" },
  { id: "journey", number: "02", label: "The Journey", short: "Journey" },
  { id: "projects", number: "03", label: "Projects & Impact", short: "Projects" },
  { id: "growth", number: "04", label: "Growth & Feedback", short: "Growth" },
  { id: "next", number: "05", label: "What's Next", short: "Next" },
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
