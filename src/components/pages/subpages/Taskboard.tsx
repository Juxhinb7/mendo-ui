import { createContext, useCallback, useEffect } from "react";
import TaskboardContainer from "../../containers/TaskboardContainer";
import TaskboardColumn from "../../elements/TaskboardColumn";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../hooks/useToken";
import { useAtom, useSetAtom } from "jotai";
import { StoriesAtom } from "../../stores/StoryDetailStore";
import TaskboardCard from "../../elements/TaskboardCard";
import ConfirmationDialog from "../../widgets/ConfirmationDialog";
import ConfirmModal from "../../elements/ConfirmModal";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

export const TaskboardColumnContext = createContext<{state: number, statusKey: number}>({
    state: 1,
    statusKey: 1
})

const Taskboard = () => {
    const {token} = useToken(); 
    const storiesUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/stories/";

    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    const [stories, setStories] = useAtom(StoriesAtom);
    
    const fetchStories = useCallback(() => {
        axios({
            method: "GET",
            url: storiesUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setStories(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token, setStories]);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    const handleRemove = async (entryId: string, event: React.MouseEvent) => {
        try {
            const response = await axios({method: "DELETE", url: storiesUrl + entryId + "/", headers: { Authorization: "Bearer " + token}});
            console.log(response.data);
            setStories(stories?.filter((m: {[key: string]: string}) => m.id != entryId));
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Entry succesfully removed",
                    isSuccess: true,
                }
            });
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
                    text: "Failed removing entry",
                    isSuccess: false,
                }
            })
        }

        event.preventDefault();
    }

    return (
        <TaskboardContainer>
            <TaskboardColumnContext.Provider value={{state: 1, statusKey: 1}}>
                <TaskboardColumn>
                    {stories && stories.filter(item => (item.state as unknown) === 1).map((entry: {[key: string]: string}) => (
                        <div>
                        <TaskboardCard 
                            title={entry.title} 
                            state={1} 
                            statusKey={1} 
                            user={entry.user} 
                            createdAt={entry.created}
                            trashComponent={
                                <ConfirmModal 
                                    dialogTitle="Apply Changes">
                                        <ConfirmationDialog 
                                            handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}
                                        />
                                </ConfirmModal>
                            }
                        />
                        </div>

                    ))}
                </TaskboardColumn>
            </TaskboardColumnContext.Provider>

            <TaskboardColumnContext.Provider value={{state: 2, statusKey: 1}}>
                <TaskboardColumn>
                    {stories && stories.filter(item => (item.state as unknown) === 2 && (item.status as unknown) === 1).map((entry: {[key: string]: string}) => (
                        <TaskboardCard 
                            title={entry.title} 
                            state={2} statusKey={1} 
                            user={entry.user} 
                            createdAt={entry.created}
                            trashComponent={
                                <ConfirmModal
                                    dialogTitle="Apply Changes">
                                        <ConfirmationDialog 
                                            handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}
                                        />
                                </ConfirmModal>
                            }
                        />
                    ))}
                </TaskboardColumn>
            </TaskboardColumnContext.Provider>

            <TaskboardColumnContext.Provider value={{state: 2, statusKey: 2}}>
                <TaskboardColumn>
                    {stories && stories.filter(item => (item.state as unknown) === 2 && (item.status as unknown) === 2).map((entry: {[key: string]: string}) => (
                        <TaskboardCard 
                            title={entry.title} 
                            state={2} 
                            statusKey={2} 
                            user={entry.user} 
                            createdAt={entry.created}
                            trashComponent={
                                <ConfirmModal
                                    dialogTitle="Apply Changes">
                                    <ConfirmationDialog 
                                        handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}
                                    />
                                </ConfirmModal>
                            }
                        />
                    ))}
                </TaskboardColumn>
            </TaskboardColumnContext.Provider>

            <TaskboardColumnContext.Provider value={{state: 2, statusKey: 3}}>
                <TaskboardColumn>
                    {stories && stories.filter(item => (item.state as unknown) === 2 && (item.status as unknown) === 3).map((entry: {[key: string]: string}) => (
                        <TaskboardCard 
                            title={entry.title}
                            state={2}
                            statusKey={3}
                            user={entry.user}
                            createdAt={entry.created}
                            trashComponent={
                                <ConfirmModal
                                    dialogTitle="Apply Changes">
                                        <ConfirmationDialog 
                                            handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}
                                        />
                                </ConfirmModal>
                            }
                        />
                    ))}
                </TaskboardColumn>
            </TaskboardColumnContext.Provider>

        </TaskboardContainer>
    )
}
export default Taskboard;