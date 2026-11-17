"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = {
  md: "sm:max-w-2xl",
  lg: "sm:max-w-4xl",
  xl: "sm:max-w-6xl",
};

export function Dialog({
  open,
  onClose,
  children,
  size = "lg",
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: keyof typeof sizes;
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.dataset.dialogOpen = "true";
    const t = window.setTimeout(() => panel.current?.focus(), 30);
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.body.dataset.dialogOpen;
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            initial={{ y: 28, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={cn(
              "relative w-full max-h-[94dvh] overflow-y-auto rounded-t-3xl border border-white/10 bg-navy-900 shadow-2xl outline-none sm:rounded-3xl",
              sizes[size],
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="sticky top-3 z-10 ml-auto mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-navy-900/80 text-ink-300 backdrop-blur hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="-mt-9">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
