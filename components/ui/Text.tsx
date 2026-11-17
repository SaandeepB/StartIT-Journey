"use client";

import { useSettings } from "@/components/viewer/ContentContext";

const SPLIT = /(\[[^\]]+\])/g;
const IS_PLACEHOLDER = /^\[[^\]]+\]$/;

/** Renders a content string, outlining [bracketed] placeholders when enabled. */
export function Text({ children, className }: { children: string | null | undefined; className?: string }) {
  const settings = useSettings();
  const value = children ?? "";
  if (!settings.highlightPlaceholders || !value.includes("[")) {
    return className ? <span className={className}>{value}</span> : <>{value}</>;
  }
  const nodes = value
    .split(SPLIT)
    .filter(Boolean)
    .map((part, i) =>
      IS_PLACEHOLDER.test(part) ? (
        <span key={i} className="ph" title="Placeholder — fill in via the editor">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  return className ? <span className={className}>{nodes}</span> : <>{nodes}</>;
}

/** Splits on blank lines / newlines into paragraphs. */
export function Paragraphs({ text, className }: { text: string | null | undefined; className?: string }) {
  const paras = (text ?? "")
    .split(/\n\s*\n|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className={className}>
          <Text>{p}</Text>
        </p>
      ))}
    </>
  );
}
