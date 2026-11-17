"use client";

import { createContext, useContext } from "react";

type PresentationApi = { active: boolean; next: () => void; prev: () => void };

const Ctx = createContext<PresentationApi>({ active: false, next: () => {}, prev: () => {} });

export const PresentationProvider = Ctx.Provider;
export const usePresentation = () => useContext(Ctx);
