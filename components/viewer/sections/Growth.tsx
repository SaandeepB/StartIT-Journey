"use client";

import { Block } from "@/components/ui/SectionHeading";
import { Performance } from "./Performance";
import { Learning } from "./Learning";

export function Growth() {
  return (
    <Block
      id="growth"
      number="04"
      eyebrow="Growth & Feedback"
      title="How each team saw my work, and how I grew."
      intro="Formal feedback from every rotation, followed by how my capabilities moved from first exposure to independent use."
    >
      <Performance part />
      <Learning part />
    </Block>
  );
}
