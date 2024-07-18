import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useToken from "../../../hooks/useToken";
import TaskCreation from "../crudForms/taskboardForms/TaskCreation";
import { TaskDescriptionReadOnlyAtom, TaskEndDateReadOnlyAtom, TaskEpicIdReadOnlyAtom, TaskEstimateReadOnlyAtom, TaskHashtagIdReadOnlyAtom, TaskPriorityReadOnlyAtom, TaskSprintIdReadOnlyAtom, TaskStartDateReadOnlyAtom, TaskStateReadOnlyAtom, TaskStatusReadOnlyAtom, TaskTitleReadOnlyAtom, TasksAtom } from "../../stores/TaskDetailStore";
import axios from "axios";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

const TaskModal = () => {
    const tasksUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/tasks/";
    const {token} = useToken();

    const [tasks, setTasks] = useAtom(TasksAtom);

    const title = useAtomValue(TaskTitleReadOnlyAtom);
    const description = useAtomValue(TaskDescriptionReadOnlyAtom);
    const startDate = useAtomValue(TaskStartDateReadOnlyAtom);
    const endDate = useAtomValue(TaskEndDateReadOnlyAtom);
    const priority = useAtomValue(TaskPriorityReadOnlyAtom);
    const estimate = useAtomValue(TaskEstimateReadOnlyAtom);
    const status = useAtomValue(TaskStatusReadOnlyAtom);
    const state = useAtomValue(TaskStateReadOnlyAtom);
    const hashtagId = useAtomValue(TaskHashtagIdReadOnlyAtom);
    const epicId = useAtomValue(TaskEpicIdReadOnlyAtom);
    const sprintId = useAtomValue(TaskSprintIdReadOnlyAtom);

    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios({
                method: "POST",
                data: {
                    title: title,
                    description: description,
                    start_date: startDate,
                    end_date: endDate,
                    priority: priority,
                    estimate: estimate,
                    status: status,
                    state: state,
                    hashtag: hashtagId,
                    epic: epicId,
                    sprint: sprintId
                },
                url: tasksUrl,
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            tasks && setTasks([
                ...tasks,
                response.data
            ]);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Entry succesfully added",
                    isSuccess: true,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false)
            }, 1000);

        } catch (error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed removing entry",
                    isSuccess: false,
                }
            })
            setToggle(true);
            setTimeout(() => {
                setToggle(false)
            }, 1000);
        }
    }




    return (
        <div>
            <TaskCreation submitHandler={handleSubmit} />
        </div>
    )
}

export default TaskModal;