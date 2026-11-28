"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useContent } from "../ContentContext";
import { Chips, MetricTile, RotationBadge } from "../ProjectBits";
import { Badge } from "@/components/ui/Badge";
import { Block, Label } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { Paragraphs, Text } from "@/components/ui/Text";
import { AI_STATUS, hasText } from "@/lib/content/helpers";
import type { AiInitiative, AiStatus } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

const statusVariant: Record<AiStatus, "outline" | "warning" | "accent" | "good"> = {
  idea: "outline",
  prototype: "warning",
  pilot: "accent",
  production: "good",
};

export function Pipeline({ steps, small }: { steps: string[]; small?: boolean }) {
  return (
    <ol className={cn("flex flex-wrap items-center", small ? "gap-1.5" : "gap-2")}>
      {steps.map((s, i) => (
        <li key={i} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 font-medium whitespace-nowrap",
              small ? "border-white/10 bg-white/[0.04] text-xs text-ink-200" : "border-electric-400/25 bg-electric-500/[0.08] text-sm text-ink-100",
              !small && i === 4 && "border-violet-400/40 bg-violet-500/15 text-white",
            )}
          >
            <Text>{s}</Text>
          </span>
          {i < steps.length - 1 && <ArrowRight className={cn("shrink-0 text-ink-600", small ? "h-3 w-3" : "h-4 w-4")} aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

function BeforeAfter({ initiative }: { initiative: AiInitiative }) {
  const [state, setState] = useState<"before" | "after">("before");
  const current = initiative[state];
  const other = initiative[state === "before" ? "after" : "before"];
  const metrics = current.metrics.filter((m) => m.label.trim());
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          tabs={[
            { id: "before" as const, label: "Before", count: initiative.before.steps.length },
            { id: "after" as const, label: "After", count: initiative.after.steps.length },
          ]}
          value={state}
          onChange={setState}
          ariaLabel="Before or after"
        />
        <span className="text-xs text-ink-500">
          {initiative.before.steps.length} steps → {initiative.after.steps.length} steps
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, x: state === "after" ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: state === "after" ? -16 : 16 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          <div className="text-sm font-semibold text-white">
            <Text>{current.title || (state === "before" ? "Existing workflow" : "Improved workflow")}</Text>
          </div>
          <ol className="mt-3 space-y-1.5">
            {current.steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink-200">
                <span className={cn("w-5 shrink-0 font-mono text-[11px]", state === "after" ? "text-electric-300" : "text-ink-500")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <Text>{s}</Text>
                </span>
              </li>
            ))}
          </ol>
          {metrics.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {metrics.map((m, i) => (
                <MetricTile key={i} metric={m} compact />
              ))}
            </div>
          )}
          {other.steps.length > 0 && current.steps.length > 0 && state === "after" && (
            <p className="mt-3 text-xs text-ink-500">
              Manual steps removed: {Math.max(initiative.before.steps.length - initiative.after.steps.length, 0)}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Detail({ n, label, text, children }: { n: string; label: string; text?: string; children?: React.ReactNode }) {
  return (
    <div>
      <Label>
        <span className="text-ink-500">{n}</span>&nbsp;&nbsp;{label}
      </Label>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-200">
        {text !== undefined && <Paragraphs text={text} />}
        {children}
      </div>
    </div>
  );
}

function InitiativeCard({ initiative }: { initiative: AiInitiative }) {
  const content = useContent();
  const [open, setOpen] = useState(false);
  const status = AI_STATUS[initiative.status];
  return (
    <article className="card overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusVariant[initiative.status]} title={status.description}>
            {status.label}
          </Badge>
          <RotationBadge rotationId={initiative.rotationId} />
          {initiative.isSample && content.settings.showSampleBadges && <Badge variant="sample">Sample</Badge>}
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
          <Text>{initiative.title}</Text>
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <Detail n="02" label="Friction point" text={initiative.friction} />
            <Detail n="03" label="AI / automation opportunity" text={initiative.opportunity} />
            <Detail n="05" label="Technologies">
              <Chips items={initiative.technologies} />
            </Detail>
          </div>
          <BeforeAfter initiative={initiative} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between border-t border-white/8 px-6 py-3 text-sm text-ink-300 transition hover:bg-white/[0.03] hover:text-white sm:px-8"
      >
        <span>{open ? "Hide" : "Show"} full breakdown — workflow, architecture, implementation, results</span>
        <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/8 bg-white/[0.02] p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <Detail n="01" label="Existing workflow" text={initiative.existingWorkflow} />
                <Detail n="04" label="Architecture / workflow">
                  {initiative.architecture.length > 0 ? <Pipeline steps={initiative.architecture} small /> : <p className="text-ink-500">Not described yet.</p>}
                </Detail>
                <div className="rounded-xl border border-electric-400/25 bg-electric-500/[0.06] p-5 lg:col-span-2">
                  <Detail n="06" label="What I personally implemented" text={initiative.implemented} />
                </div>
                <Detail n="07" label="Results / current status">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant[initiative.status]}>{status.label}</Badge>
                    <span className="text-xs text-ink-500">{status.description}</span>
                  </div>
                  <Paragraphs text={initiative.results} />
                </Detail>
                <Detail n="08" label="Next opportunity" text={initiative.nextOpportunity} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function AIInAction({ part }: { part?: boolean }) {
  const content = useContent();
  if (part && content.aiInitiatives.length === 0) return null;
  return (
    <Block
      id="ai"
      part={part}
      eyebrow="AI in Action"
      title="Where AI changed how the work gets done."
      intro="Each initiative shows the workflow before and after, what I personally built, and an honest status: Idea → Prototype → Pilot → In production."
    >
      <div className="mt-10 space-y-6">
        {content.aiInitiatives.map((init) => (
          <InitiativeCard key={init.id} initiative={init} />
        ))}
        {content.aiInitiatives.length === 0 && <p className="text-sm text-ink-500">No AI initiatives added yet.</p>}
      </div>
    </Block>
  );
}
