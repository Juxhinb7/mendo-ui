import { createContext } from "react";
import StoriesTaskboard from "../../widgets/taskboardDetails/StoriesTaskboard";
import SubtasksTaskboard from "../../widgets/taskboardDetails/SubtasksTaskboard";
import TasksTaskboard from "../../widgets/taskboardDetails/TasksTaskboard";
import BugsTaskboard from "../../widgets/taskboardDetails/BugsTaskboard";
import {motion} from "framer-motion";

export const TaskboardColumnContext = createContext<{state: number, statusKey: number, itemsCount: number}>({
    state: 1,
    statusKey: 1,
    itemsCount: 0,
});

export const TaskboardTypeContext = createContext<"Stories" | "Subtasks" | "Tasks" | "Bugs">("Stories");

const Taskboard = () => {
    
    const container = {
        hidden: { y: 20, opacity: 0, scale: 0},
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
        },

    }

    return (
        <motion.div
            className="container"
            variants={container}
            initial="hidden"
            animate="visible"
        >


        <div role="tablist" className="tabs tabs-lifted">
            <input type="radio" role="tab" name="my_tasks_1" className="tab font-bold [--tab-bg:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))]" aria-label="Stories" defaultChecked />
            <div role="tabpanel" className="tab-content p-6 bg-base-200 border-base-300 rounded-box">
                <StoriesTaskboard />
            </div>

            <input type="radio" role="tab" name="my_tasks_1" className="tab font-bold [--tab-bg:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))]" aria-label="Subtasks" />
            <div role="tabpanel" className="tab-content p-6 bg-base-200 border-base-300 rounded-box">
                <SubtasksTaskboard />
            </div>

            <input type="radio" role="tab" name="my_tasks_1" className="tab font-bold [--tab-bg:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))]" aria-label="Tasks"/>
            <div role="tabpanel" className="tab-content p-6 bg-base-200 border-base-300 rounded-box">
                <TasksTaskboard />
            </div>

            <input type="radio" role="tab" name="my_tasks_1" className="tab font-bold [--tab-bg:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))]" aria-label="Bugs"/>
            <div role="tabpanel" className="tab-content p-6 bg-base-200 border-base-300 rounded-box">
                <BugsTaskboard />
            </div>
        </div>
        </motion.div>
    )
}
export default Taskboard;