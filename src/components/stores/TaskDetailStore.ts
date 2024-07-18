import { atom } from "jotai";

const TasksAtom = atom<{[key: string]: string}[] | undefined>(undefined);
const TasksReadOnlyAtom = atom(get => get(TasksAtom));

const TaskTitleAtom = atom("");
const TaskDescriptionAtom = atom("");
const TaskStartDateAtom = atom("");
const TaskEndDateAtom = atom("");
const TaskPriorityAtom = atom("");
const TaskEstimateAtom = atom("");
const TaskStatusAtom = atom("");
const TaskStateAtom = atom("");
const TaskHashtagIdAtom = atom("");
const TaskEpicIdAtom = atom("");
const TaskSprintIdAtom = atom("");

const TaskTitleReadOnlyAtom = atom(get => get(TaskTitleAtom));
const TaskDescriptionReadOnlyAtom = atom(get => get(TaskDescriptionAtom));
const TaskStartDateReadOnlyAtom = atom(get => get(TaskStartDateAtom));
const TaskEndDateReadOnlyAtom = atom(get => get(TaskEndDateAtom));
const TaskPriorityReadOnlyAtom = atom(get => get(TaskPriorityAtom));
const TaskEstimateReadOnlyAtom = atom(get => get(TaskEstimateAtom));
const TaskStatusReadOnlyAtom = atom(get => get(TaskStatusAtom));
const TaskStateReadOnlyAtom = atom(get => get(TaskStateAtom));
const TaskHashtagIdReadOnlyAtom = atom(get => get(TaskHashtagIdAtom));
const TaskEpicIdReadOnlyAtom = atom(get => get(TaskEpicIdAtom));
const TaskSprintIdReadOnlyAtom = atom(get => get(TaskSprintIdAtom));

export {
    TasksAtom,
    TasksReadOnlyAtom,
    TaskTitleAtom,
    TaskDescriptionAtom,
    TaskStartDateAtom,
    TaskEndDateAtom,
    TaskPriorityAtom,
    TaskEstimateAtom,
    TaskStatusAtom,
    TaskStateAtom,
    TaskHashtagIdAtom,
    TaskEpicIdAtom,
    TaskSprintIdAtom,
    TaskTitleReadOnlyAtom,
    TaskDescriptionReadOnlyAtom,
    TaskStartDateReadOnlyAtom,
    TaskEndDateReadOnlyAtom,
    TaskPriorityReadOnlyAtom,
    TaskEstimateReadOnlyAtom,
    TaskStatusReadOnlyAtom,
    TaskStateReadOnlyAtom,
    TaskHashtagIdReadOnlyAtom,
    TaskEpicIdReadOnlyAtom,
    TaskSprintIdReadOnlyAtom
}