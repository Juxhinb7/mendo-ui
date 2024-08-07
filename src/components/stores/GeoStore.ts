import { atom } from "jotai";

export const errorAtom = atom("");
export const errorReadOnlyAtom = atom(get => get(errorAtom));