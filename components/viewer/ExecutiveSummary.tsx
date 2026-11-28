"use client";

import Link from "next/link";
import { ArrowLeft, Play, Printer } from "lucide-react";
import type { Content } from "@/lib/content/schema";
import { ContentProvider } from "./ContentContext";
import { MiniTimeline } from "./sections/Intro";
import { OwnershipBadge } from "./ProjectBits";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container, Label } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { AI_STATUS, featuredProjects, hasText, reviewFor, rotationShort } from "@/lib/content/helpers";
import { dateRange, truncate } from "@/lib/utils";

export function ExecutiveSummary({ content }: { content: Content }) {
  const { profile, executiveSummary, proposedRole } = content;
  const featured = featuredProjects(content);
  const programDates = dateRange(profile.programStart, profile.programEnd, "");

  return (
    <ContentProvider content={content}>
      <div className="min-h-dvh">
        <div className="no-print border-b border-white/8">
          <Container className="flex h-14 items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Full portfolio
            </Link>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4" /> Print / save as PDF
              </Button>
              <ButtonLink href="/present" variant="primary" size="sm">
                <Play className="h-3.5 w-3.5" /> Present
              </ButtonLink>
            </div>
          </Container>
        </div>

        <main>
          <Container className="max-w-4xl py-12">
            <header>
              <div className="eyebrow">
                Executive summary · <Text>{profile.programName}</Text> · <Text>{profile.organization}</Text>
              </div>
              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <Text>{executiveSummary.headline}</Text>
              </h1>
              <p className="mt-3 text-sm text-ink-400">
                <Text>{profile.name}</Text> · <Text>{profile.designation}</Text>
                {programDates && <> · {programDates}</>} · <Text>{profile.totalDurationLabel}</Text>
              </p>
            </header>

            <section className="mt-8 space-y-3 text-[15px] leading-relaxed text-ink-200">
              <Paragraphs text={executiveSummary.summary} />
            </section>

            <section className="mt-8 print-avoid">
              <Label>Highlights</Label>
              <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {executiveSummary.highlights.map((h, i) => (
                  <li key={i} className="card flex gap-3 p-4 text-sm text-ink-200">
                    <span className="font-mono text-[11px] text-electric-300">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <Text>{h}</Text>
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10 print-avoid">
              <Label>The journey</Label>
              <div className="mt-3">
                <MiniTimeline compact />
              </div>
              <div className="card relative mt-4 overflow-x-auto">
                <table className="w-full min-w-[36rem] text-sm">
                  <thead>
                    <tr className="border-b border-white/8 text-left text-xs text-ink-400">
                      <th className="px-4 py-2.5 font-medium">Rotation</th>
                      <th className="px-4 py-2.5 font-medium">Function</th>
                      <th className="px-4 py-2.5 font-medium">Duration</th>
                      <th className="px-4 py-2.5 font-medium">Manager</th>
                      <th className="px-4 py-2.5 font-medium">Final rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.rotations.map((r, i) => {
                      const review = reviewFor(content, r.id);
                      return (
                        <tr key={r.id} className="border-t border-white/6 align-top">
                          <td className="px-4 py-2.5 text-ink-100">
                            <span className="font-mono text-xs text-ink-500">{rotationShort(i)}</span> <Text>{r.teamName}</Text>
                          </td>
                          <td className="px-4 py-2.5 text-ink-300"><Text>{r.businessFunction}</Text></td>
                          <td className="px-4 py-2.5 text-ink-300"><Text>{r.durationLabel}</Text></td>
                          <td className="px-4 py-2.5 text-ink-300"><Text>{r.manager}</Text></td>
                          <td className="px-4 py-2.5 text-ink-100">
                            {review ? (
                              <>
                                <Text>{review.rating}</Text>{" "}
                                <span className="text-xs text-ink-500">
                                  (<Text>{review.ratingScale}</Text>)
                                </span>
                              </>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-10">
              <Label>Selected projects</Label>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {featured.map((p) => {
                  const measured = p.metrics.filter((m) => m.value.trim());
                  return (
                    <div key={p.id} className="card print-avoid p-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[11px] text-ink-500">
                          {rotationShort(content.rotations.findIndex((r) => r.id === p.rotationId))}
                        </span>
                        <OwnershipBadge ownership={p.ownership} />
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-snug text-white">
                        <Link href={`/projects/${p.id}`} className="hover:text-electric-300">
                          <Text>{p.title}</Text>
                        </Link>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-ink-400">
                        <Text>{truncate(p.businessImpact || p.subtitle, 180)}</Text>
                      </p>
                      {measured.length > 0 && (
                        <ul className="mt-3 space-y-1 text-xs text-ink-200">
                          {measured.map((m, i) => (
                            <li key={i}>
                              <span className="font-semibold text-white"><Text>{m.value}</Text></span> <Text>{m.label}</Text>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="print-avoid">
                <Label>Key capabilities developed</Label>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {profile.keyCapabilities.map((c, i) => (
                    <li key={i} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-200">
                      <Text>{c}</Text>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="print-avoid">
                <Label>Beyond the rotations</Label>
                <ul className="mt-3 space-y-2">
                  {content.beyond.map((b, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 text-sm text-ink-200">
                      <span><Text>{b.title}</Text></span>
                      {b.context && <span className="shrink-0 text-xs text-ink-500"><Text>{b.context}</Text></span>}
                    </li>
                  ))}
                  {content.aiInitiatives
                    .filter((a) => !a.isSample)
                    .map((a) => (
                      <li key={a.id} className="flex items-center justify-between gap-3 text-sm text-ink-200">
                        <span><Text>{a.title}</Text></span>
                        <Badge variant="outline">{AI_STATUS[a.status].label}</Badge>
                      </li>
                    ))}
                </ul>
              </div>
            </section>

            <section className="mt-10 print-break print-avoid">
              <Label>Proposed full-time role</Label>
              <div className="mt-2 text-xl font-semibold text-white"><Text>{proposedRole.roleTitle}</Text></div>
              <p className="mt-1 text-sm text-ink-300"><Text>{proposedRole.positioning}</Text></p>
              <ol className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {proposedRole.pillars.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-mono text-[11px] text-electric-300">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="font-medium text-white"><Text>{p.title}</Text></span>
                      <span className="text-ink-400"> — <Text>{truncate(p.description, 120)}</Text></span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {proposedRole.roadmap.map((phase, i) => (
                  <div key={i} className="card p-4">
                    <div className="eyebrow"><Text>{phase.label}</Text></div>
                    <div className="mt-1 text-sm font-medium text-white"><Text>{phase.title}</Text></div>
                    <ul className="mt-2 space-y-1 text-xs text-ink-300">
                      {phase.items.map((it, j) => (
                        <li key={j}>· <Text>{it}</Text></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 print-avoid">
              <blockquote className="border-l-2 border-electric-400 pl-5 text-lg font-medium leading-snug text-white">
                <Text>{proposedRole.closingStatement}</Text>
              </blockquote>
              {(hasText(profile.email) || hasText(profile.linkedin)) && (
                <p className="mt-4 text-sm text-ink-400">
                  {hasText(profile.email) && <span>{profile.email}</span>}
                  {hasText(profile.email) && hasText(profile.linkedin) && " · "}
                  {hasText(profile.linkedin) && <span>{profile.linkedin}</span>}
                </p>
              )}
            </section>

            <footer className="mt-12 border-t border-white/8 pt-4 text-xs text-ink-500">
              Unlisted document · <Text>{profile.name}</Text> · <Text>{profile.themeTitle}</Text>
            </footer>
          </Container>
        </main>
      </div>
    </ContentProvider>
  );
}
