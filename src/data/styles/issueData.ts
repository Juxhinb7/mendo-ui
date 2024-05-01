import { EstimateBadge, Priority, PriorityBadge, Status, StatusBadge } from "../../types/styles/issueTypes"

export const status: Status = {
    1: "To Do",
    2: "In Progress",
    3: "Done"
} as const;

export const statusStyle: StatusBadge = {
    1: "badge bg-gray-200 rounded-md text-gray-900 font-bold",
    2: "badge bg-sky-200 rounded-md text-sky-900 font-bold",
    3: "badge bg-green-200 rounded-md text-green-900 font-bold"
} as const;

export const priority: Priority = {
    1: "Low",
    2: "Medium",
    3: "High"
} as const;

export const priorityStyle: PriorityBadge = {
    1: "badge bg-sky-200 font-bold",
    2: "badge bg-amber-200 font-bold",
    3: "badge bg-red-200 font-bold"
} as const;

export const estimateStyle: EstimateBadge = "badge bg-gray-200" as const;