"use client";

import Link from "next/link";
import type { Content } from "@/lib/content/schema";
import { ContentProvider, useContent } from "./ContentContext";
import { ProjectDialogProvider } from "./ProjectDialog";
import { Nav, Mark } from "./Nav";
import { BackToTop } from "./BackToTop";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { Container } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
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

export function Footer() {
  const content = useContent();
  return (
    <footer className="no-print border-t border-white/8 py-10">
      <Container className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Mark className="h-7 w-7" />
          <div>
            <div className="text-sm font-medium text-white">
              <Text>{content.profile.themeTitle}</Text>
            </div>
            <div className="text-xs text-ink-500">
              <Text>{content.profile.name}</Text> · <Text>{content.profile.programName}</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-500">
          <Link href="/summary" className="hover:text-white">
            Executive summary
          </Link>
          <Link href="/present" className="hover:text-white">
            Presentation mode
          </Link>
          <span>Unlisted portfolio · please do not forward without permission</span>
        </div>
      </Container>
    </footer>
  );
}

export function PortfolioViewer({ content }: { content: Content }) {
  return (
    <ContentProvider content={content}>
      <ProjectDialogProvider>
        <Nav />
        <main>
          <Intro />
          <Journey />
          <Projects />
          <Performance />
          <Learning />
          <Moments />
          <TechStack />
          <AIInAction />
          <Connecting />
          <Role />
        </main>
        <Footer />
        <BackToTop />
        <KeyboardShortcuts />
      </ProjectDialogProvider>
    </ContentProvider>
  );
}
