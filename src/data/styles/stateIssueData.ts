import { State, StateBadge } from "../../types/styles/stateIssueTypes";

export const state: State = {
    1: "Backlog",
    2: "Active",
    3: "Completed"
} as const;

export const stateBadge: StateBadge = {
    1: "badge bg-gray-200 rounded-md text-gray-900 font-bold",
    2: "badge bg-sky-200 rounded-md text-sky-900 font-bold",
    3: "badge bg-green-200 rounded-md text-green-900 font-bold"
} as const;