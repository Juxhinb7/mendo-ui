import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { status, statusStyle } from "../../data/styles/issueData";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useContext } from "react";
import Modal from "./Modal";
import TaskboardContent from "../widgets/crudForms/taskboardForms/taskboardContent";
import { TaskboardColumnContext } from "../pages/subpages/Taskboard";
import { Status, StatusBadge } from "../../types/styles/issueTypes";
import {state as dataState} from "../../data/styles/stateIssueData";

export default function TaskboardColumn({children}: {children: ReactNode}) {
	const taskboardColumnData = useContext(TaskboardColumnContext);
	const {state, statusKey} = taskboardColumnData;
	
	return (
		<div className="shadow-md bg-white rounded px-2 py-2">

		<div className="flex flex-row justify-between items-center mb-2 mx-1">
			<div className="flex items-center">
				{state === 1 && statusKey && <h2 className="mr-2">{dataState[state]}</h2>}
				{state === 2 && statusKey && (
					<h2>
						<p className={`${statusStyle[Number(statusKey) as keyof StatusBadge]} mr-2`}>
							{status[Number(statusKey) as keyof Status]}
						</p>
					</h2>
					)
				}
				
			</div>
			<FontAwesomeIcon icon={faEllipsis} className="cursor-pointer hover:text-gray-900 rounded-lg mx-1"/>
		</div>

		<div className="grid gap-2">
			{children}
		</div>
		
		<div className="flex flex-row items-center text-gray-500 mt-2 px-1">
				<div className="mx-1">
				<Modal type="fontAwesome" icon={faPlus}>
					<TaskboardContent />
				</Modal>
				</div>

		</div>
	</div>
	);
}