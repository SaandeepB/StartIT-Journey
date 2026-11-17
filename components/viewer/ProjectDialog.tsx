"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { useContent } from "./ContentContext";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { projectById } from "@/lib/content/helpers";

const Ctx = createContext<{ openProject: (id: string) => void }>({ openProject: () => {} });

export function ProjectDialogProvider({ children }: { children: React.ReactNode }) {
  const content = useContent();
  const [id, setId] = useState<string | null>(null);
  const project = projectById(content, id ?? undefined);
  const close = useCallback(() => setId(null), []);
  const value = useMemo(() => ({ openProject: (pid: string) => setId(pid) }), []);
  return (
    <Ctx.Provider value={value}>
      {children}
      <Dialog open={!!project} onClose={close} size="xl" label={project?.title}>
        {project && <ProjectCaseStudy project={project} />}
      </Dialog>
    </Ctx.Provider>
  );
}

export const useProjectDialog = () => useContext(Ctx);
