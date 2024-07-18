import { useAtom, useAtomValue, useSetAtom } from "jotai";
import StoryCreation from "../crudForms/taskboardForms/StoryCreation";
import { StoriesAtom, StoryDescriptionReadOnlyAtom, StoryEndDateReadOnlyAtom, StoryEpicIdReadOnlyAtom, StoryEstimateReadOnlyAtom, StoryHashtagIdReadOnlyAtom, StoryPriorityReadOnlyAtom, StorySprintIdReadOnlyAtom, StoryStartDateReadOnlyAtom, StoryStateReadOnlyAtom, StoryStatusReadOnlyAtom, StoryTitleReadOnlyAtom } from "../../stores/StoryDetailStore";
import axios from "axios";
import useToken from "../../../hooks/useToken";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

const StoryModal = () => {
    const storiesUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/stories/";
    const {token} = useToken();

    const [stories, setStories] = useAtom(StoriesAtom);

    const title = useAtomValue(StoryTitleReadOnlyAtom);
    const description = useAtomValue(StoryDescriptionReadOnlyAtom);
    const startDate = useAtomValue(StoryStartDateReadOnlyAtom);
    const endDate = useAtomValue(StoryEndDateReadOnlyAtom);
    const priority = useAtomValue(StoryPriorityReadOnlyAtom);
    const estimate = useAtomValue(StoryEstimateReadOnlyAtom);
    const status = useAtomValue(StoryStatusReadOnlyAtom);
    const state = useAtomValue(StoryStateReadOnlyAtom);
    const hashtagId = useAtomValue(StoryHashtagIdReadOnlyAtom);
    const epicId = useAtomValue(StoryEpicIdReadOnlyAtom);
    const sprintId = useAtomValue(StorySprintIdReadOnlyAtom);

    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);
    


    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        try{
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
                url: storiesUrl,
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            stories && setStories([
                ...stories,
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
                setToggle(false);
            }, 1000);
            
        } 
        catch(error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
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
            <StoryCreation submitHandler={handleSubmit}/>
        </div>
    )
}

export default StoryModal;