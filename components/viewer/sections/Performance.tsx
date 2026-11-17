"use client";

import { ArrowUpRight, Check, FileText, Quote } from "lucide-react";
import { useContent } from "../ContentContext";
import { RotationBadge } from "../ProjectBits";
import { Badge, Dot } from "@/components/ui/Badge";
import { Container, Label, SectionHeading } from "@/components/ui/SectionHeading";
import { Paragraphs, Text } from "@/components/ui/Text";
import { THEME_TYPE, compatibleScales, reviewFor, rotationColor, rotationShort } from "@/lib/content/helpers";
import type { Review } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

function ListBlock({ label, icon, items }: { label: string; icon: React.ReactNode; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <Label>{label}</Label>
      <ul className="mt-2.5 space-y-2">
        {items.map((s, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-ink-200">
            <span className="mt-0.5 shrink-0 text-electric-300">{icon}</span>
            <span>
              <Text>{s}</Text>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <article className="card relative flex h-full flex-col overflow-hidden p-6">
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: rotationColor(index) }} aria-hidden />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <RotationBadge rotationId={review.rotationId} />
        <span className="text-[11px] text-ink-500">
          <Text>{review.feedbackSource}</Text>
        </span>
      </div>

      <div className="mt-6">
        <div className="eyebrow">Final rating</div>
        <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
          <span className="text-4xl font-semibold tracking-tight text-white">
            <Text>{review.rating}</Text>
          </span>
          <span className="pb-1 text-xs text-ink-400">
            scale: <Text>{review.ratingScale}</Text>
          </span>
        </div>
        {review.category && (
          <Badge variant="accent" className="mt-3">
            <Text>{review.category}</Text>
          </Badge>
        )}
      </div>

      <blockquote className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <Quote className="h-4 w-4 text-violet-300" aria-hidden />
        <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-200">
          <Paragraphs text={review.managerFeedback} />
        </div>
        <footer className="mt-2 text-[11px] text-ink-500">Manager feedback</footer>
      </blockquote>

      <div className="mt-6 space-y-6">
        <ListBlock label="Key strengths recognised" icon={<Check className="h-4 w-4" />} items={review.strengths} />
        <ListBlock label="Areas for development" icon={<ArrowUpRight className="h-4 w-4" />} items={review.developmentAreas} />
        <ListBlock label="Supporting examples" icon={<FileText className="h-4 w-4" />} items={review.supportingExamples} />
      </div>
    </article>
  );
}

/** Single-series horizontal bars — only rendered when scales are identical and numeric. */
function RatingBars({ reviews }: { reviews: Review[] }) {
  const content = useContent();
  const max = reviews[0].scaleMax ?? 1;
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-sm font-semibold text-white">Ratings on a common scale</h4>
        <span className="text-xs text-ink-500">
          Scale: <Text>{reviews[0].ratingScale}</Text> · max {max}
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {reviews.map((r) => {
          const idx = content.rotations.findIndex((x) => x.id === r.rotationId);
          const v = r.numericValue ?? 0;
          const pct = Math.max(0, Math.min(100, (v / max) * 100));
          return (
            <div key={r.rotationId} className="group flex items-center gap-3" title={`${rotationShort(idx)}: ${v} of ${max}`}>
              <div className="w-28 shrink-0 truncate text-xs text-ink-300">
                <span className="font-mono text-ink-500">{rotationShort(idx)}</span>{" "}
                <Text>{content.rotations[idx]?.teamName ?? ""}</Text>
              </div>
              <div className="relative h-[22px] flex-1 border-l border-white/15">
                <div
                  className="h-full rounded-r-[4px] bg-r1 transition-[width] duration-500 group-hover:brightness-110"
                  style={{ width: `${pct}%` }}
                />
                <span className="absolute top-1/2 -translate-y-1/2 pl-2 text-xs text-ink-100" style={{ left: `${pct}%` }}>
                  {v}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Performance() {
  const content = useContent();
  const reviews = content.rotations
    .map((r) => reviewFor(content, r.id))
    .filter((r): r is Review => !!r);
  const comparable = compatibleScales(reviews);
  const groups = (["strength", "improved", "developing"] as const).map((type) => ({
    type,
    themes: content.feedbackThemes.filter((t) => t.type === type),
  }));

  return (
    <section id="performance" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          number="04"
          eyebrow="Performance and Team Feedback"
          title="Final ratings, in each team's own words."
          intro="Each rotation closed with a formal review. Ratings are shown on their original scale, alongside the feedback and the work that supports it."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {content.rotations.map((r, i) => {
            const review = reviewFor(content, r.id);
            return review ? (
              <ReviewCard key={r.id} review={review} index={i} />
            ) : (
              <div key={r.id} className="card flex items-center justify-center p-6 text-sm text-ink-500">
                No review recorded for rotation {i + 1} yet.
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <div className="eyebrow">Consolidated view</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Themes that recur across rotations</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">
              {comparable
                ? "All three reviews use the same numeric scale, so ratings are also shown side by side below."
                : "Rating scales differ or are not numeric, so ratings are shown side by side without numeric comparison. Themes below come from the written feedback."}
            </p>
          </div>

          <div className={cn("mt-8 grid grid-cols-1 gap-6", comparable && "lg:grid-cols-5")}>
            {comparable && (
              <div className="lg:col-span-2">
                <RatingBars reviews={reviews} />
              </div>
            )}
            <div className={cn("card relative overflow-x-auto", comparable && "lg:col-span-3")}>
              <table className="w-full min-w-[32rem] text-sm">
                <thead>
                  <tr className="border-b border-white/8 text-left">
                    <th className="px-5 py-3 text-xs font-medium text-ink-400">Feedback theme</th>
                    {content.rotations.map((r, i) => (
                      <th key={r.id} className="w-24 px-3 py-3 text-center text-xs font-medium text-ink-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Dot color={rotationColor(i)} /> {rotationShort(i)}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                {groups.map(
                  (g) =>
                    g.themes.length > 0 && (
                      <tbody key={g.type}>
                        <tr className="bg-white/[0.025]">
                          <td colSpan={content.rotations.length + 1} className="eyebrow px-5 py-2">
                            {THEME_TYPE[g.type].label}
                          </td>
                        </tr>
                        {g.themes.map((t, ti) => (
                          <tr key={ti} className="border-t border-white/6">
                            <td className="px-5 py-3 text-ink-200">
                              <Text>{t.theme}</Text>
                              {t.note && <div className="mt-0.5 text-xs text-ink-500">{t.note}</div>}
                            </td>
                            {content.rotations.map((r, i) => {
                              const included = t.rotationIds.includes(r.id);
                              return (
                                <td key={r.id} className="px-3 py-3 text-center">
                                  <span
                                    title={`${t.theme} — ${rotationShort(i)}: ${included ? "appeared in feedback" : "not noted"}`}
                                    className={cn(
                                      "inline-block h-3.5 w-3.5 rounded-full",
                                      !included && "border border-white/12",
                                    )}
                                    style={included ? { background: rotationColor(i) } : undefined}
                                  >
                                    <span className="sr-only">{included ? "Yes" : "No"}</span>
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    ),
                )}
              </table>
              {content.feedbackThemes.length === 0 && (
                <p className="p-6 text-sm text-ink-500">Add feedback themes in the editor to build the comparison.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
