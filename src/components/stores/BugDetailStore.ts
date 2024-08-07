import { atom } from "jotai";

const BugsAtom = atom<{[key: string]: string}[] | undefined>(undefined);
const BugsReadOnlyAtom = atom(get => get(BugsAtom));

const BugTitleAtom = atom("");
const BugDescriptionAtom = atom("");
const BugStartDateAtom = atom("");
const BugEndDateAtom = atom("");
const BugStatusAtom = atom("");
const BugStateAtom = atom("");
const BugPriorityAtom = atom("");
const BugEstimateAtom = atom("");
const BugHashtagIdAtom = atom("");
const BugEpicIdAtom = atom("");
const BugSprintIdAtom = atom("");
const BugTitleReadOnlyAtom = atom(get => get(BugTitleAtom));
const BugDescriptionReadOnlyAtom = atom(get => get(BugDescriptionAtom));
const BugStartDateReadOnlyAtom = atom(get => get(BugStartDateAtom));
const BugEndDateReadOnlyAtom = atom(get => get(BugEndDateAtom));
const BugStatusReadOnlyAtom = atom(get => get(BugStatusAtom));
const BugStateReadOnlyAtom = atom(get => get(BugStateAtom));
const BugPriorityReadOnlyAtom = atom(get => get(BugPriorityAtom));
const BugEstimateReadOnlyAtom = atom(get => get(BugEstimateAtom));
const BugHashtagIdReadOnlyAtom = atom(get => get(BugHashtagIdAtom));
const BugEpicIdReadOnlyAtom = atom(get => get(BugEpicIdAtom));
const BugSprintIdReadOnlyAtom = atom(get => get(BugSprintIdAtom));

export {
    BugsAtom,
    BugsReadOnlyAtom,
    BugTitleAtom,
    BugDescriptionAtom,
    BugStartDateAtom,
    BugEndDateAtom,
    BugStatusAtom,
    BugStateAtom,
    BugPriorityAtom,
    BugEstimateAtom,
    BugHashtagIdAtom,
    BugEpicIdAtom,
    BugSprintIdAtom,
    BugTitleReadOnlyAtom,
    BugDescriptionReadOnlyAtom,
    BugStartDateReadOnlyAtom,
    BugEndDateReadOnlyAtom,
    BugStatusReadOnlyAtom,
    BugStateReadOnlyAtom,
    BugPriorityReadOnlyAtom,
    BugEstimateReadOnlyAtom,
    BugHashtagIdReadOnlyAtom,
    BugEpicIdReadOnlyAtom,
    BugSprintIdReadOnlyAtom
}