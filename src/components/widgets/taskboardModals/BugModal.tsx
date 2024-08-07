import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useToken from "../../../hooks/useToken";
import BugCreation from "../crudForms/taskboardForms/BugCreation";
import { BugDescriptionReadOnlyAtom, BugEndDateReadOnlyAtom, BugEpicIdReadOnlyAtom, BugEstimateAtom, BugHashtagIdAtom, BugPriorityReadOnlyAtom, BugsAtom, BugSprintIdReadOnlyAtom, BugStartDateReadOnlyAtom, BugStateReadOnlyAtom, BugStatusReadOnlyAtom, BugTitleReadOnlyAtom } from "../../stores/BugDetailStore";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";
import axios from "axios";

const BugModal = () => {
    const bugsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/bugs/";
    const { token } = useToken();

    const [bugs, setBugs] = useAtom(BugsAtom);

    const title = useAtomValue(BugTitleReadOnlyAtom);
    const description = useAtomValue(BugDescriptionReadOnlyAtom);
    const startDate = useAtomValue(BugStartDateReadOnlyAtom);
    const endDate = useAtomValue(BugEndDateReadOnlyAtom);
    const priority = useAtomValue(BugPriorityReadOnlyAtom);
    const status = useAtomValue(BugStatusReadOnlyAtom);
    const state = useAtomValue(BugStateReadOnlyAtom);
    const estimate = useAtomValue(BugEstimateAtom);
    const hashtagId = useAtomValue(BugHashtagIdAtom);
    const epicId = useAtomValue(BugEpicIdReadOnlyAtom);
    const sprintId = useAtomValue(BugSprintIdReadOnlyAtom);

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
                    status: status,
                    state: state,
                    estimate: estimate,
                    hashtag: hashtagId,
                    epic: epicId,
                    sprint: sprintId
                },
                url: bugsUrl,
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            bugs && setBugs([
                ...bugs,
                response.data
            ]);
            setEventNotification((prevState) => {
                return {
                    ...prevState, 
                    text: "Entry succesfully added",
                    isSuccess: true,
                }
            })
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        } 
        catch (error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed adding entry",
                    isSuccess: false,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }
    }


    return (
        <div>
            <BugCreation submitHandler={handleSubmit}/>
        </div>
    )
};

export default BugModal;