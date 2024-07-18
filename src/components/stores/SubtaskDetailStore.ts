import { atom } from "jotai";

const SubtasksAtom = atom<{[key: string]: string}[] | undefined>(undefined);
const SubtasksReadOnlyAtom = atom(get => get(SubtasksAtom));

const SubtaskTitleAtom = atom("");
const SubtaskDescriptionAtom = atom("");
const SubtaskStartDateAtom = atom("");
const SubtaskEndDateAtom = atom("");
const SubtaskPriorityAtom = atom("");
const SubtaskEstimateAtom = atom("");
const SubtaskStatusAtom = atom("");
const SubtaskStateAtom = atom("");
const SubtaskHashtagIdAtom = atom("");
const SubtaskStoryIdAtom = atom("");

const SubtaskTitleReadOnlyAtom = atom(get => get(SubtaskTitleAtom));
const SubtaskDescriptionReadOnlyAtom = atom(get => get(SubtaskDescriptionAtom));
const SubtaskStartDateReadOnlyAtom = atom(get => get(SubtaskStartDateAtom));
const SubtaskEndDateReadOnlyAtom = atom(get => get(SubtaskEndDateAtom));
const SubtaskPriorityReadOnlyAtom = atom(get => get(SubtaskPriorityAtom));
const SubtaskEstimateReadOnlyAtom = atom(get => get(SubtaskEstimateAtom));
const SubtaskStatusReadOnlyAtom = atom(get => get(SubtaskStatusAtom));
const SubtaskStateReadOnlyAtom = atom(get => get(SubtaskStateAtom));
const SubtaskHashtagIdReadOnlyAtom = atom(get => get(SubtaskHashtagIdAtom));
const SubtaskStoryIdReadOnlyAtom = atom(get => get(SubtaskStoryIdAtom));

export {
    SubtasksAtom,
    SubtasksReadOnlyAtom,
    SubtaskTitleAtom,
    SubtaskDescriptionAtom,
    SubtaskStartDateAtom,
    SubtaskEndDateAtom,
    SubtaskPriorityAtom,
    SubtaskEstimateAtom,
    SubtaskStatusAtom,
    SubtaskStateAtom,
    SubtaskHashtagIdAtom,
    SubtaskStoryIdAtom,
    SubtaskTitleReadOnlyAtom,
    SubtaskDescriptionReadOnlyAtom,
    SubtaskStartDateReadOnlyAtom,
    SubtaskEndDateReadOnlyAtom,
    SubtaskPriorityReadOnlyAtom,
    SubtaskEstimateReadOnlyAtom,
    SubtaskStatusReadOnlyAtom,
    SubtaskStateReadOnlyAtom,
    SubtaskHashtagIdReadOnlyAtom,
    SubtaskStoryIdReadOnlyAtom
}


