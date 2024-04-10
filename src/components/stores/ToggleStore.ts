import { atom } from "jotai";

const ToggleAtom = atom<boolean | undefined>(undefined);
const ToggleReadOnlyAtom = atom((get) => get(ToggleAtom));

export {ToggleAtom, ToggleReadOnlyAtom};