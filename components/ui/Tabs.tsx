"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab<T extends string> = { id: T; label: React.ReactNode; count?: number; color?: string };

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
  ariaLabel,
}: {
  tabs: Tab<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  ariaLabel?: string;
}) {
  const layoutId = useId();

  function onKeyDown(e: React.KeyboardEvent) {
    const idx = tabs.findIndex((t) => t.id === value);
    if (e.key === "ArrowRight") onChange(tabs[(idx + 1) % tabs.length].id);
    if (e.key === "ArrowLeft") onChange(tabs[(idx - 1 + tabs.length) % tabs.length].id);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        "no-scrollbar relative inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1",
        className,
      )}
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition",
              active ? "text-white" : "text-ink-400 hover:text-ink-100",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {t.color && <span className="h-2 w-2 rounded-full" style={{ background: t.color }} aria-hidden />}
              {t.label}
              {typeof t.count === "number" && (
                <span className="font-mono text-[11px] text-ink-500">{t.count}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
