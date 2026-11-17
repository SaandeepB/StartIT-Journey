"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize, X } from "lucide-react";
import type { Content } from "@/lib/content/schema";
import { ContentProvider } from "./ContentContext";
import { ProjectDialogProvider } from "./ProjectDialog";
import { PresentationProvider } from "./PresentationContext";
import { Mark } from "./Nav";
import { SECTIONS } from "./sections";
import { Intro } from "./sections/Intro";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
import { Performance } from "./sections/Performance";
import { Learning } from "./sections/Learning";
import { Moments } from "./sections/Moments";
import { TechStack } from "./sections/TechStack";
import { AIInAction } from "./sections/AIInAction";
import { Connecting } from "./sections/Connecting";
import { Role } from "./sections/Role";
import { cn } from "@/lib/utils";

const SLIDES = [Intro, Journey, Projects, Performance, Learning, Moments, TechStack, AIInAction, Connecting, Role];

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

const variants = {
  enter: (d: number) => ({ opacity: 0, x: 48 * d }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: -48 * d }),
};

export function Presentation({ content }: { content: Content }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [controls, setControls] = useState(true);
  const idle = useRef<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
      setIndex((cur) => {
        setDir(clamped >= cur ? 1 : -1);
        return clamped;
      });
    },
    [],
  );

  // Restore the slide from the URL hash on load.
  useEffect(() => {
    const h = parseInt(window.location.hash.replace("#", ""), 10);
    if (Number.isFinite(h) && h >= 1 && h <= SLIDES.length) setIndex(h - 1);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${index + 1}`);
    scroller.current?.scrollTo({ top: 0 });
  }, [index]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || document.body.dataset.dialogOpen === "true") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "j":
          e.preventDefault();
          go(index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "k":
          e.preventDefault();
          go(index - 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(SLIDES.length - 1);
          break;
        case "f":
          toggleFullscreen();
          break;
        case "Escape":
          if (!document.fullscreenElement) router.push("/");
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, router, toggleFullscreen]);

  // Auto-hide controls while idle so the slide is all the audience sees.
  useEffect(() => {
    const wake = () => {
      setControls(true);
      if (idle.current) window.clearTimeout(idle.current);
      idle.current = window.setTimeout(() => setControls(false), 3500);
    };
    wake();
    window.addEventListener("pointermove", wake);
    window.addEventListener("keydown", wake);
    return () => {
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
      if (idle.current) window.clearTimeout(idle.current);
    };
  }, []);

  const api = useMemo(() => ({ active: true, next: () => go(index + 1), prev: () => go(index - 1) }), [go, index]);
  const Slide = SLIDES[index];

  return (
    <ContentProvider content={content}>
      <PresentationProvider value={api}>
        <ProjectDialogProvider>
          <div className="relative h-dvh overflow-hidden bg-navy-950">
            <div ref={scroller} className="relative h-full overflow-y-auto">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={index}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                  className="slide pb-20"
                >
                  <Slide />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute left-5 top-4 z-20 flex items-center gap-3 transition-opacity duration-500",
                controls ? "opacity-100" : "opacity-0",
              )}
            >
              <Mark className="h-7 w-7" />
              <span className="text-sm text-ink-300">{content.profile.themeTitle}</span>
            </div>

            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent px-5 pb-4 pt-12 transition-opacity duration-500 sm:px-8",
                controls ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="min-w-0 text-xs text-ink-400">
                <span className="font-mono text-white">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-1">/</span>
                {SLIDES.length}
                <span className="ml-2 hidden truncate sm:inline">· {SECTIONS[index].label}</span>
              </div>

              <div className="hidden items-center gap-1.5 md:flex" role="tablist" aria-label="Slides">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={SECTIONS[i].label}
                    onClick={() => go(i)}
                    className={cn("h-1.5 rounded-full transition-all", i === index ? "w-7 bg-white" : "w-3 bg-white/25 hover:bg-white/50")}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-navy-900/70 text-ink-200 hover:text-white disabled:opacity-30">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => go(index + 1)} disabled={index === SLIDES.length - 1} aria-label="Next slide" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-navy-900/70 text-ink-200 hover:text-white disabled:opacity-30">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit full screen" : "Full screen"} className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-navy-900/70 text-ink-200 hover:text-white">
                  {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </button>
                <button type="button" onClick={() => router.push("/")} aria-label="Exit presentation" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-navy-900/70 text-ink-200 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </ProjectDialogProvider>
      </PresentationProvider>
    </ContentProvider>
  );
}
