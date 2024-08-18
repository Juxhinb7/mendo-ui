import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { status, statusStyle } from "../../data/styles/issueData";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DragEventHandler, ReactNode, useContext } from "react";
import Modal from "./Modal";
import StoryModal from "../widgets/taskboardModals/StoryModal";
import { TaskboardColumnContext, TaskboardTypeContext } from "../pages/subpages/Taskboard";
import { Status, StatusBadge } from "../../types/styles/issueTypes";
import {state as dataState} from "../../data/styles/stateIssueData";
import SubtaskModal from "../widgets/taskboardModals/SubtaskModal";
import TaskModal from "../widgets/taskboardModals/TaskModal";
import BugModal from "../widgets/taskboardModals/BugModal";

type DragEvents = {
	children: ReactNode;
	onDragOver?: DragEventHandler;
	onDrop?: DragEventHandler;
}

export default function TaskboardColumn({children, ...restProps}: DragEvents) {
	const taskboardColumnState = useContext(TaskboardColumnContext);
	const taskboardType = useContext(TaskboardTypeContext);
	const {state, statusKey, itemsCount} = taskboardColumnState;
	
	return (
		<div className="shadow-md bg-white rounded px-2 py-2 min-h-20 max-h-[60rem] overflow-clip hover:overflow-auto" {...restProps}>
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
				<p className="badge">{itemsCount}</p>
			</div>

			<FontAwesomeIcon icon={faEllipsis} className="cursor-pointer hover:text-gray-900 rounded-lg mx-1"/>
			
		</div>
		
		<div className="grid gap-2">
			{children}
		</div>
		
		<div className="flex flex-row items-center text-gray-500 mt-2 px-1">
				<div className="mx-1">
				<Modal type="fontAwesome" icon={faPlus}>
					<>
						{taskboardType ==="Stories" && <StoryModal />}
						{taskboardType === "Subtasks" && <SubtaskModal />}
						{taskboardType === "Tasks" && <TaskModal />}
						{taskboardType === "Bugs" && <BugModal />}
					</>
				</Modal>
				</div>

		</div>
	</div>
	);
}