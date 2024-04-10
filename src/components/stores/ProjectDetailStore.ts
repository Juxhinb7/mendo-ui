import { atom } from "jotai";

const ProjectTitleAtom = atom("");
const ProjectDescriptionAtom = atom("");
const ProjectTitleReadOnlyAtom = atom((get) => get(ProjectTitleAtom));
const ProjectDescriptionReadOnlyAtom = atom((get) => get(ProjectDescriptionAtom));


export {ProjectTitleAtom, ProjectDescriptionAtom, ProjectTitleReadOnlyAtom, ProjectDescriptionReadOnlyAtom};