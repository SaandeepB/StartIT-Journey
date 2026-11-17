"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, Play, X } from "lucide-react";
import { useContent } from "./ContentContext";
import { SECTIONS, SECTION_IDS, scrollToSection } from "./sections";
import { useActiveSection } from "./useActiveSection";
import { ScrollProgress } from "./ScrollProgress";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-8 w-8", className)} aria-hidden>
      <rect width="64" height="64" rx="14" fill="#0f1729" />
      <path d="M16 44 L32 20 L48 44" stroke="#5b93ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
      <path d="M16 44 L48 44" stroke="#9a86ff" strokeWidth="2.5" strokeLinecap="round" opacity=".9" />
      <circle cx="16" cy="44" r="5" fill="#3987e5" />
      <circle cx="32" cy="20" r="5" fill="#199e70" />
      <circle cx="48" cy="44" r="5" fill="#c98500" />
    </svg>
  );
}

export function Nav() {
  const content = useContent();
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "no-print fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "border-b border-white/8 bg-navy-950/75 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("intro")}
            className="flex min-w-0 items-center gap-3 text-left lg:shrink-0"
            aria-label="Back to introduction"
          >
            <Mark className="shrink-0" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold text-white">{content.profile.themeTitle}</span>
              <span className="hidden truncate text-[11px] text-ink-400 sm:block">{content.profile.name}</span>
            </span>
          </button>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Sections">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSection(s.id)}
                  title={s.label}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] transition",
                    isActive ? "bg-white/[0.08] text-white" : "text-ink-500 hover:text-ink-200",
                  )}
                >
                  {s.number}
                  <span className={cn("hidden font-sans text-[11px] xl:inline", isActive ? "text-ink-100" : "text-ink-500")}>
                    {s.short}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink href="/summary" variant="ghost" size="sm" className="max-sm:hidden">
              <FileText className="h-4 w-4" /> Summary
            </ButtonLink>
            <ButtonLink href="/present" variant="primary" size="sm">
              <Play className="h-3.5 w-3.5" /> Present
            </ButtonLink>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-200 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-navy-950/95 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="text-sm font-semibold text-white">Sections</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-8" aria-label="Sections">
              <ul className="divide-y divide-white/8">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        window.setTimeout(() => scrollToSection(s.id), 50);
                      }}
                      className={cn(
                        "flex w-full items-center gap-4 py-4 text-left",
                        active === s.id ? "text-white" : "text-ink-300",
                      )}
                    >
                      <span className="font-mono text-xs text-ink-500">{s.number}</span>
                      <span className="text-base font-medium">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/summary" className="text-sm text-ink-300 underline-offset-4 hover:underline">
                  Executive summary
                </Link>
                <Link href="/present" className="text-sm text-ink-300 underline-offset-4 hover:underline">
                  Presentation mode
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
