import { useContext } from "react";
import { status, statusStyle } from "../../data/styles/issueData";
import { state as dataState } from "../../data/styles/stateIssueData";
import TaskboardCardComponentProps from "../../interfaces/taskboards/TaskboardCardComponentProps";
import { TaskboardColumnContext } from "../pages/subpages/Taskboard";
import { Status, StatusBadge } from "../../types/styles/issueTypes";

const TaskboardCard = ({title, user, createdAt, trashComponent}: TaskboardCardComponentProps): JSX.Element => {
    const taskboardColumnState = useContext(TaskboardColumnContext);
    const {state, statusKey} = taskboardColumnState;
    return (
        <div className="p-2 rounded shadow-md border-gray-100 border-2">
            <h3 className="text-sm mb-3 text-gray-700">{title}</h3>
            {state === 1 ? <p className="flex text-xs w-max p-1 rounded mr-2 text-gray-700">{dataState[state]}</p> : <p className={`${statusStyle[Number(statusKey) as keyof StatusBadge]} flex text-xs w-max p-1 rounded mr-2 text-gray-700`}>{status[Number(statusKey) as keyof Status]}</p>}
            <div className="flex flex-row items-center mt-2">
                <div className="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
                <a href="#" className="text-xs text-gray-500">{user}</a>
            </div>
            <p className="text-xs text-gray-500 mt-2">{createdAt}</p>
            <p className="flex justify-end">{trashComponent}</p>
        </div>  
    )
}

export default TaskboardCard;