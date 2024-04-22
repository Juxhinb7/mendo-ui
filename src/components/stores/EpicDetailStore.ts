import { atom } from "jotai";

const EpicTitleAtom = atom("");
const EpicDescriptionAtom = atom("");
const EpicStartDateAtom = atom("");
const EpicEndDateAtom = atom("");
const EpicStatusAtom = atom("");
const EpicPriorityAtom = atom("");
const EpicEstimateAtom = atom("");
const EpicHashtagIdAtom = atom("");
const EpicProjectIdAtom = atom("");
const EpicTitleReadOnlyAtom = atom(get => get(EpicTitleAtom));
const EpicDescriptionReadOnlyAtom = atom(get => get(EpicDescriptionAtom));
const EpicStartDateReadOnlyAtom = atom(get => get(EpicStartDateAtom));
const EpicEndDateReadOnlyAtom = atom(get => get(EpicEndDateAtom));
const EpicStatusReadOnlyAtom = atom(get => get(EpicStatusAtom));
const EpicPriorityReadOnlyAtom = atom(get => get(EpicPriorityAtom));
const EpicEstimateReadOnlyAtom = atom(get => get(EpicEstimateAtom));
const EpicHashtagIdReadOnlyAtom = atom(get => get(EpicHashtagIdAtom));
const EpicProjectIdReadOnlyAtom = atom(get => get(EpicProjectIdAtom));

export {
    EpicTitleAtom,
    EpicDescriptionAtom,
    EpicStartDateAtom,
    EpicEndDateAtom,
    EpicStatusAtom,
    EpicPriorityAtom,
    EpicEstimateAtom,
    EpicHashtagIdAtom,
    EpicProjectIdAtom,
    EpicTitleReadOnlyAtom,
    EpicDescriptionReadOnlyAtom,
    EpicStartDateReadOnlyAtom,
    EpicEndDateReadOnlyAtom,
    EpicStatusReadOnlyAtom,
    EpicPriorityReadOnlyAtom,
    EpicEstimateReadOnlyAtom,
    EpicHashtagIdReadOnlyAtom,
    EpicProjectIdReadOnlyAtom
}