import { atom } from "jotai";

const HashtagTitleAtom = atom("");
const ProjectIdAtom = atom("");
const HashtagTitleReadOnlyAtom = atom(get => get(HashtagTitleAtom));
const ProjectIdAtomReadOnlyAtom = atom(get => get(ProjectIdAtom));

export {HashtagTitleAtom, ProjectIdAtom, ProjectIdAtomReadOnlyAtom, HashtagTitleReadOnlyAtom};
