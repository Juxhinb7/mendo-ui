import { atom } from "jotai";

// get set fields
const SprintTitleAtom = atom("");
const SprintGoalAtom = atom("");
const SprintStartDateAtom = atom("");
const SprintEndDateAtom = atom("");
const ProjectIdAtom = atom("");

//read only fields
const SprintTitleReadOnlyAtom = atom(get => get(SprintTitleAtom));
const SprintGoalReadOnlyAtom = atom(get => get(SprintGoalAtom));
const SprintStartDateReadOnlyAtom = atom(get => get(SprintStartDateAtom));
const SprintEndDateReadOnlyAtom = atom(get => get(SprintEndDateAtom));
const ProjectIdReadOnlyAtom = atom(get => get(ProjectIdAtom));

export {
    SprintTitleAtom,
    SprintGoalAtom,
    SprintStartDateAtom,
    SprintEndDateAtom,
    ProjectIdAtom,
    SprintTitleReadOnlyAtom,
    SprintGoalReadOnlyAtom,
    SprintStartDateReadOnlyAtom,
    SprintEndDateReadOnlyAtom,
    ProjectIdReadOnlyAtom
}
