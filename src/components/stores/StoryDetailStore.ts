import {atom} from "jotai";

const StoriesAtom = atom<{[key: string]: string}[] | undefined>(undefined);
const StoriesReadOnlyAtom = atom(get => get(StoriesAtom));

const StoryTitleAtom = atom("");
const StoryDescriptionAtom = atom("");
const StoryStartDateAtom = atom("");
const StoryEndDateAtom = atom("");
const StoryPriorityAtom = atom("");
const StoryEstimateAtom = atom("");
const StoryStatusAtom = atom("");
const StoryStateAtom = atom("");
const StoryHashtagIdAtom = atom("");
const StoryEpicIdAtom = atom("");
const StorySprintIdAtom = atom("");
const StoryTitleReadOnlyAtom = atom(get => get(StoryTitleAtom));
const StoryDescriptionReadOnlyAtom = atom(get => get(StoryDescriptionAtom));
const StoryStartDateReadOnlyAtom = atom(get => get(StoryStartDateAtom));
const StoryEndDateReadOnlyAtom = atom(get => get(StoryEndDateAtom));
const StoryPriorityReadOnlyAtom = atom(get => get(StoryPriorityAtom));
const StoryEstimateReadOnlyAtom = atom(get => get(StoryEstimateAtom));
const StoryStatusReadOnlyAtom = atom(get => get(StoryStatusAtom));
const StoryStateReadOnlyAtom = atom(get => get(StoryStateAtom));
const StoryHashtagIdReadOnlyAtom = atom(get => get(StoryHashtagIdAtom));
const StoryEpicIdReadOnlyAtom = atom(get => get(StoryEpicIdAtom));
const StorySprintIdReadOnlyAtom = atom(get => get(StorySprintIdAtom));


export {
    StoriesAtom,
    StoriesReadOnlyAtom,
    StoryTitleAtom,
    StoryDescriptionAtom,
    StoryStartDateAtom,
    StoryEndDateAtom,
    StoryPriorityAtom,
    StoryEstimateAtom,
    StoryStatusAtom,
    StoryStateAtom,
    StoryHashtagIdAtom,
    StoryEpicIdAtom,
    StorySprintIdAtom,
    StoryTitleReadOnlyAtom,
    StoryDescriptionReadOnlyAtom,
    StoryStartDateReadOnlyAtom,
    StoryEndDateReadOnlyAtom,
    StoryPriorityReadOnlyAtom,
    StoryEstimateReadOnlyAtom,
    StoryStatusReadOnlyAtom,
    StoryStateReadOnlyAtom,
    StoryHashtagIdReadOnlyAtom,
    StoryEpicIdReadOnlyAtom,
    StorySprintIdReadOnlyAtom
}