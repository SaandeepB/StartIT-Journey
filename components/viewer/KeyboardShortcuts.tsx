"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Keyboard } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { SECTION_IDS, currentSectionIndex, scrollToSection } from "./sections";

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

const SHORTCUTS: [string, string][] = [
  ["→ / J", "Next section"],
  ["← / K", "Previous section"],
  ["Home / End", "First / last section"],
  ["P", "Open presentation mode"],
  ["S", "Open executive summary"],
  ["?", "Show this help"],
  ["Esc", "Close dialogs"],
];

export function KeyboardShortcuts() {
  const router = useRouter();
  const [help, setHelp] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || document.body.dataset.dialogOpen === "true") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const idx = currentSectionIndex();
      switch (e.key) {
        case "ArrowRight":
        case "j":
          e.preventDefault();
          scrollToSection(SECTION_IDS[Math.min(idx + 1, SECTION_IDS.length - 1)]);
          break;
        case "ArrowLeft":
        case "k":
          e.preventDefault();
          scrollToSection(SECTION_IDS[Math.max(idx - 1, 0)]);
          break;
        case "Home":
          e.preventDefault();
          scrollToSection(SECTION_IDS[0]);
          break;
        case "End":
          e.preventDefault();
          scrollToSection(SECTION_IDS[SECTION_IDS.length - 1]);
          break;
        case "p":
          router.push("/present");
          break;
        case "s":
          router.push("/summary");
          break;
        case "?":
          setHelp((h) => !h);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <>
      <button
        type="button"
        onClick={() => setHelp(true)}
        aria-label="Keyboard shortcuts"
        className="no-print fixed bottom-6 left-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-navy-900/80 text-ink-400 shadow-lg backdrop-blur hover:text-white sm:left-8 md:flex"
      >
        <Keyboard className="h-4 w-4" />
      </button>
      <Dialog open={help} onClose={() => setHelp(false)} size="md" label="Keyboard shortcuts">
        <div className="p-8">
          <div className="eyebrow">Navigation</div>
          <h3 className="mt-2 text-2xl font-semibold text-white">Keyboard shortcuts</h3>
          <dl className="mt-6 divide-y divide-white/8">
            {SHORTCUTS.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-3">
                <dt className="text-sm text-ink-300">{v}</dt>
                <dd className="font-mono text-xs text-white">
                  <kbd className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-1">{k}</kbd>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Dialog>
    </>
  );
}
