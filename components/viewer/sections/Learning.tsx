"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "../ContentContext";
import { Badge } from "@/components/ui/Badge";
import { Block } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import { LEVEL, levelCounts, rotationShort } from "@/lib/content/helpers";
import type { Level } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

const levelFill: Record<Level, string> = {
  none: "transparent",
  introduced: "var(--color-level-1)",
  practiced: "var(--color-level-2)",
  applied: "var(--color-level-3)",
};

function LevelCell({ level, title }: { level: Level; title: string }) {
  const info = LEVEL[level];
  return (
    <span
      title={title}
      className={cn(
        "inline-flex h-7 w-9 items-center justify-center rounded-md font-mono text-[11px] transition hover:brightness-110",
        level === "none" && "border border-white/10 text-ink-600",
        (level === "introduced" || level === "practiced") && "text-white",
        level === "applied" && "text-navy-950",
      )}
      style={{ background: levelFill[level] }}
    >
      {info.short}
      <span className="sr-only">{info.label}</span>
    </span>
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-400">
      {(["introduced", "practiced", "applied"] as const).map((l) => (
        <li key={l} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ background: levelFill[l] }} aria-hidden />
          {LEVEL[l].label}
        </li>
      ))}
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm border border-white/15" aria-hidden /> Not yet
      </li>
    </ul>
  );
}

function ProgressionChart({ domainTitle, rows }: { domainTitle: string; rows: ReturnType<typeof levelCounts> }) {
  const content = useContent();
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="card p-6">
      <h4 className="text-sm font-semibold text-white">Capabilities by level</h4>
      <p className="mt-1 text-xs text-ink-500">
        <Text>{domainTitle}</Text> · how many capabilities reached each level in each rotation
      </p>
      <div className="mt-6 space-y-4">
        {rows.map((row, i) => {
          const total = Math.max(row.total, 1);
          const segs: [Level, number][] = [
            ["introduced", row.introduced],
            ["practiced", row.practiced],
            ["applied", row.applied],
          ];
          const any = row.introduced + row.practiced + row.applied;
          return (
            <div
              key={row.rotationId}
              className="relative"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              aria-label={`${rotationShort(i)}: ${row.introduced} introduced, ${row.practiced} practiced, ${row.applied} independently applied`}
            >
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="truncate text-ink-300">
                  <span className="font-mono text-ink-500">{rotationShort(i)}</span>{" "}
                  <Text>{content.rotations[i]?.teamName ?? ""}</Text>
                </span>
                <span className="text-ink-400">{row.applied} applied</span>
              </div>
              <div className="flex h-[20px] gap-[2px] border-l border-white/15">
                {segs.map(([lvl, count], si) =>
                  count > 0 ? (
                    <div
                      key={lvl}
                      className={cn("h-full transition-[width] duration-500", si === segs.length - 1 || any === count ? "rounded-r-[4px]" : "")}
                      style={{ width: `${(count / total) * 100}%`, background: levelFill[lvl] }}
                    />
                  ) : null,
                )}
              </div>
              <AnimatePresence>
                {hover === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute right-0 top-0 z-10 -translate-y-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-xs shadow-xl"
                  >
                    {segs.map(([lvl, count]) => (
                      <div key={lvl} className="flex items-center gap-2">
                        <span className="h-0.5 w-3" style={{ background: levelFill[lvl] }} />
                        <span className="font-semibold text-white">{count}</span>
                        <span className="text-ink-400">{LEVEL[lvl].label}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <Legend />
      </div>
    </div>
  );
}

export function Learning({ part }: { part?: boolean }) {
  const content = useContent();
  const [domainId, setDomainId] = useState(content.learning[0]?.id ?? "");
  const domain = content.learning.find((d) => d.id === domainId) ?? content.learning[0];
  const rotationIds = content.rotations.map((r) => r.id);
  const rows = useMemo(() => (domain ? levelCounts(domain.capabilities, rotationIds) : []), [domain, rotationIds]);

  if (!domain) return null;

  return (
    <Block id="learning" part={part}
          eyebrow="Learning curve"
          title="How my capabilities moved across the three rotations."
          intro="The level each capability reached in every rotation: introduced, practiced, or applied independently on real work."
        >

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {content.learning.length > 1 && (
            <Tabs
              tabs={content.learning.map((d) => ({ id: d.id, label: d.title, count: d.capabilities.length }))}
              value={domain.id}
              onChange={setDomainId}
              ariaLabel="Learning domain"
            />
          )}
          {domain.isSample && content.settings.showSampleBadges && (
            <Badge variant="sample">Sample progression — set your real levels in the editor</Badge>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="card relative overflow-x-auto lg:col-span-7">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-400 sm:px-5">
                    <Text>{domain.title}</Text>
                    {domain.description && <div className="mt-0.5 font-normal text-ink-500">{domain.description}</div>}
                  </th>
                  {content.rotations.map((r, i) => (
                    <th key={r.id} className="w-12 px-1 py-3 sm:w-16 sm:px-2 text-center font-mono text-xs font-medium text-ink-400">
                      {rotationShort(i)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {domain.capabilities.map((c, ci) => (
                  <tr key={ci} className="border-t border-white/6">
                    <td className="px-4 py-2.5 text-ink-200 sm:px-5">
                      <Text>{c.name}</Text>
                      {c.evidence && (
                        <div className="mt-0.5 text-xs text-ink-500">
                          <Text>{c.evidence}</Text>
                        </div>
                      )}
                    </td>
                    {content.rotations.map((r, i) => {
                      const lvl = (c.levels[r.id] ?? "none") as Level;
                      return (
                        <td key={r.id} className="px-1 py-2.5 text-center sm:px-2">
                          <LevelCell level={lvl} title={`${c.name} — ${rotationShort(i)}: ${LEVEL[lvl].label}`} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-white/8 px-5 py-4">
              <Legend />
            </div>
          </div>
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div key={domain.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <ProgressionChart domainTitle={domain.title} rows={rows} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              Introduced = first exposure · Practiced = used with guidance · Independently applied = used without support on real work.
            </p>
          </div>
        </div>
      </Block>
  );
}
