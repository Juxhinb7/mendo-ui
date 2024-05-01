import { status, statusStyle } from "../../data/styles/issueData";
import { state as dataState } from "../../data/styles/stateIssueData";
import TaskboardCardComponentProps from "../../interfaces/taskboards/TaskboardCardComponentProps";

const TaskboardCard = ({title, state, statusKey, user, createdAt, trashComponent}: TaskboardCardComponentProps): JSX.Element => {
    return (
        <div className="p-2 rounded shadow-md border-gray-100 border-2">
            <h3 className="text-sm mb-3 text-gray-700">{title}</h3>
            {state === 1 ? <p className="flex text-xs w-max p-1 rounded mr-2 text-gray-700">{dataState[state]}</p> : <p className={`${statusStyle[statusKey]} flex text-xs w-max p-1 rounded mr-2 text-gray-700`}>{status[statusKey]}</p>}
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