import { useAtom, useAtomValue, useSetAtom } from "jotai";
import StoryCreation from "./StoryCreation";
import { StoriesAtom, StoryDescriptionReadOnlyAtom, StoryEndDateReadOnlyAtom, StoryEpicIdReadOnlyAtom, StoryEstimateReadOnlyAtom, StoryHashtagIdReadOnlyAtom, StoryPriorityReadOnlyAtom, StorySprintIdReadOnlyAtom, StoryStartDateReadOnlyAtom, StoryStateReadOnlyAtom, StoryStatusReadOnlyAtom, StoryTitleReadOnlyAtom } from "../../../stores/StoryDetailStore";
import axios from "axios";
import useToken from "../../../../hooks/useToken";
import { EventNotificationAtom } from "../../../stores/EventNotificationStore";
import { ToggleAtom } from "../../../stores/ToggleStore";

const TaskboardContent = () => {
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
        <div role="tablist" className="tabs tabs-lifted overflow-auto">
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Story" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <StoryCreation submitHandler={handleSubmit}/>
            </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Subtask"  />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Task" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Bug" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 4</div>
        </div>
    )
}

export default TaskboardContent;