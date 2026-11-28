"use client";

import Link from "next/link";
import { Bot, ChartColumn, FileText, Link2, Mail, Network, Users, Workflow } from "lucide-react";
import { useContent } from "../ContentContext";
import { ButtonLink } from "@/components/ui/Button";
import { Block, Label } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { hasText } from "@/lib/content/helpers";

const icons = [Network, Workflow, ChartColumn, Bot, Users];

export function Role({ part }: { part?: boolean }) {
  const content = useContent();
  const role = content.proposedRole;
  const { profile } = content;

  return (
    <Block id="role" part={part}
          eyebrow="The role I'm aiming for"
          title="A role that connects marketing, analytics and AI."
          intro={<Text>{role.positioning}</Text>}
        >

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <div className="eyebrow">Proposed role — working title</div>
            <div className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              <Text>{role.roleTitle}</Text>
            </div>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-ink-400">
            The exact title can be refined with leadership. The pillars below describe the scope and the value.
          </p>
        </div>

        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {role.pillars.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={i} className="card card-hover flex flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric-500/15 text-electric-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[11px] text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-white">
                  <Text>{p.title}</Text>
                </h3>
                <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-300">
                  <Paragraphs text={p.description} />
                </div>
                {hasText(p.evidence) && (
                  <div className="mt-auto pt-4">
                    <Label>Evidence</Label>
                    <p className="mt-1 text-xs text-ink-400">
                      <Text>{p.evidence}</Text>
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-16">
          <Label>Proposed 30 · 60 · 90-day roadmap</Label>
          <div className="relative mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-electric-400/60 via-violet-400/60 to-electric-400/20 md:block" aria-hidden />
            {role.roadmap.map((phase, i) => {
              const num = phase.label.match(/\d+/)?.[0] ?? String((i + 1) * 30);
              return (
                <div key={i} className="relative">
                  <div className="relative z-10 mb-4 inline-flex h-12 items-center gap-3 rounded-full border border-white/10 bg-navy-950 pl-1.5 pr-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-violet-500 text-sm font-semibold text-white">
                      {num}
                    </span>
                    <span className="text-sm text-ink-200">
                      <Text>{phase.label}</Text>
                    </span>
                  </div>
                  <div className="card h-full p-5">
                    <h4 className="font-semibold text-white">
                      <Text>{phase.title}</Text>
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {phase.items.map((it, j) => (
                        <li key={j} className="flex gap-2.5 text-sm text-ink-300">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-electric-300" aria-hidden />
                          <span>
                            <Text>{it}</Text>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="glow-field" aria-hidden />
          <div className="relative">
            <div className="eyebrow">Closing message</div>
            <blockquote className="mt-4 max-w-3xl text-balance text-2xl font-medium leading-snug text-white sm:text-3xl">
              <Text>{role.closingStatement}</Text>
            </blockquote>
            {role.asks.filter(hasText).length > 0 && (
              <div className="mt-8 max-w-2xl">
                <Label>What would make this real</Label>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-300">
                  {role.asks.filter(hasText).map((a, i) => (
                    <li key={i}>
                      <Text>{a}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/summary" variant="primary" size="lg">
                <FileText className="h-4 w-4" /> Executive summary
              </ButtonLink>
              {hasText(profile.email) && (
                <a href={`mailto:${profile.email}`} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-ink-100 hover:bg-white/[0.06]">
                  <Mail className="h-4 w-4" /> {profile.email}
                </a>
              )}
              {hasText(profile.linkedin) && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-ink-100 hover:bg-white/[0.06]">
                  <Link2 className="h-4 w-4" /> LinkedIn
                </a>
              )}
              <Link href="#intro" className="text-sm text-ink-400 hover:text-white">
                Back to the start
              </Link>
            </div>
          </div>
        </div>
      </Block>
  );
}
