import axios from "axios";
import SubtaskCreation from "../crudForms/taskboardForms/SubtaskCreation"
import useToken from "../../../hooks/useToken";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { SubtaskDescriptionReadOnlyAtom, SubtaskEndDateReadOnlyAtom, SubtaskEstimateReadOnlyAtom, SubtaskHashtagIdReadOnlyAtom, SubtaskPriorityReadOnlyAtom, SubtaskStartDateReadOnlyAtom, SubtaskStateReadOnlyAtom, SubtaskStatusReadOnlyAtom, SubtaskStoryIdReadOnlyAtom, SubtaskTitleReadOnlyAtom, SubtasksAtom } from "../../stores/SubtaskDetailStore";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

const SubtaskModal = (): JSX.Element => {
    const subtasksUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/subtasks/";
    const {token} = useToken();

    const [subtasks, setSubtasks] = useAtom(SubtasksAtom);

    const title = useAtomValue(SubtaskTitleReadOnlyAtom);
    const description = useAtomValue(SubtaskDescriptionReadOnlyAtom);
    const startDate = useAtomValue(SubtaskStartDateReadOnlyAtom);
    const endDate = useAtomValue(SubtaskEndDateReadOnlyAtom);
    const priority = useAtomValue(SubtaskPriorityReadOnlyAtom);
    const estimate = useAtomValue(SubtaskEstimateReadOnlyAtom);
    const status = useAtomValue(SubtaskStatusReadOnlyAtom);
    const state = useAtomValue(SubtaskStateReadOnlyAtom);
    const hashtagId = useAtomValue(SubtaskHashtagIdReadOnlyAtom);
    const storyId = useAtomValue(SubtaskStoryIdReadOnlyAtom);

    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    const handleSubmit = async(event: React.FormEvent) => {
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
                    story: storyId
                },
                url: subtasksUrl,
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            subtasks && setSubtasks([
                ...subtasks,
                response.data
            ]);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Entry successfully added",
                    isSuccess: true,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }

        catch(error: unknown) {
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
                setToggle(false);
            }, 1000);
        }
    }

    return (
        <div>
            <SubtaskCreation submitHandler={handleSubmit} />
        </div>
    )
}

export default SubtaskModal;