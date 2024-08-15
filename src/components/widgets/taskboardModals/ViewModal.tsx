import { faBookmark, faBug, faCheck, faEye, faListCheck } from "@fortawesome/free-solid-svg-icons"
import Modal from "../../elements/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priority, priorityStyle, status, statusStyle } from "../../../data/styles/issueData";
import { Priority, PriorityBadge, Status, StatusBadge } from "../../../types/styles/issueTypes";
import { useContext } from "react";
import { TaskboardTypeContext } from "../../pages/subpages/Taskboard";

const ViewModal = ({data}: {data: {[key: string]: any}}): JSX.Element => {
    const taskboardType = useContext(TaskboardTypeContext);

    return (
        <Modal type="fontAwesome" icon={faEye}>
            <div>

                <div className="flex">
                    {taskboardType === "Stories" && <FontAwesomeIcon icon={faBookmark} className="text-white bg-green-500 rounded p-2" size="1x"/>}
                    {taskboardType === "Subtasks" && <FontAwesomeIcon icon={faListCheck} className="text-white bg-sky-400 rounded p-2" size="1x"/>}
                    {taskboardType === "Tasks" && <FontAwesomeIcon icon={faCheck} className="text-white bg-blue-400 rounded p-2" size="1x"/>}
                    {taskboardType === "Bugs" && <FontAwesomeIcon icon={faBug} className="text-white bg-red-500 rounded p-2" size="1x"/> }
                    <h1 className="ml-2 p-1">{data.title}</h1>
                </div>
                <p className="ql-editor mt-2">
                    <div className="mt-4" dangerouslySetInnerHTML={{__html: data.description}} />
                </p>
                <p>Start date: {data.start_date.split("-").join("/").replace("T", " ")}</p>
                <p>End date: {data.end_date.split("-").join("/").replace("T", " ")}</p>
                <div className="mt-2">
                    <span>Priority: </span>
                    <p className={`${priorityStyle[Number(data.priority) as keyof PriorityBadge]}`}>
                        {priority[Number(data.priority) as keyof Priority]}
                    </p>
                </div>
                {data.state !== 1 && (
                    <div className="mt-2">
                        <span>Status: </span>
                        <p className={`${statusStyle[Number(data.status) as keyof StatusBadge]}`}>
                            {status[Number(data.status) as keyof Status]}
                        </p>
                    </div>                
                )}

            </div>
        </Modal>
    )
}

export default ViewModal;