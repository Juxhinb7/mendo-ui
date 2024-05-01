import { Status } from "../../types/styles/issueTypes";
import { State } from "../../types/styles/stateIssueTypes";

interface TaskboardCardComponentProps {
    title: string;
    state: keyof State;
    statusKey: keyof Status;
    user: string;
    createdAt: string;
    trashComponent: JSX.Element

}

export default TaskboardCardComponentProps;