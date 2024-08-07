import { useAtom, useSetAtom } from "jotai";
import useToken from "../../../hooks/useToken";
import TaskboardContainer from "../../containers/TaskboardContainer";
import TaskboardColumn from "../../elements/TaskboardColumn";
import { TaskboardColumnContext, TaskboardTypeContext } from "../../pages/subpages/Taskboard";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";
import { StoriesAtom } from "../../stores/StoryDetailStore";
import { useCallback, useEffect, useMemo } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import TaskboardCard from "../../elements/TaskboardCard";
import ConfirmModal from "../../elements/ConfirmModal";
import ConfirmationDialog from "../ConfirmationDialog";

const StoriesTaskboard = (): JSX.Element => {
    const storiesUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/stories/";
    const {token} = useToken();

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

    const backlogItemsCount: number = useMemo(() => stories ? stories.filter((item: {[key: string]: string}) => (item.state as unknown) === 1).length : 0, [stories]);
    const toDoItemsCount: number = useMemo(() => stories ? stories.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 1).length : 0, [stories]);
    const inProgressItemsCount: number = useMemo(() => stories ? stories.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 2).length : 0, [stories]);
    const doneItemsCount: number = useMemo(() => stories ? stories.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 3).length : 0, [stories]);

    const handleOnDrag = (e: React.DragEvent, entry: {[key: string]: string}) => {
        let jsonEntry = JSON.stringify(entry);
        e.dataTransfer.setData("story", jsonEntry);
        console.log(`Story with id ${entry.id} is being dragged.`);
    }

    const handleOnDragOver = (e: React.DragEvent) => {
        console.log(`Story with id ${JSON.parse(e.dataTransfer.getData("story")).id} is being dragged over`);
        e.preventDefault();
        
    }

    const handleOnDrop = (e: React.DragEvent, state: number, statusKey: number) => {
        console.log(`Story with id ${JSON.parse(e.dataTransfer.getData("story")).id} finished.`);
        let story = JSON.parse(e.dataTransfer.getData("story"));
        axios({
            method: "PUT",
            url: storiesUrl + story.id + "/",
            data: {
                title: story.title,
                description: story.description,
                start_date: story.start_date,
                end_date: story.end_date,
                priority: story.priority,
                estimate: story.estimate,
                status: statusKey,
                state: state,
                hashtag: story.hashtag,
                epic: story.epic,
                sprint: story.sprint
            },
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
            setStories && setStories(
                stories?.map((entry: {[key: string]: string}) => {
                    if (entry.id === story.id) {
                        return {...entry, 
                            title: response.data.title,
                            description: response.data.description,
                            start_date: response.data.start_date,
                            end_date: response.data.end_date,
                            priority: response.data.priority,
                            estimate: response.data.estimate,
                            status: response.data.status,
                            state: response.data.state,
                            hashtag: response.data.hashtag,
                            epic: response.data.epic,
                            sprint: response.data.sprint
                        }
                    } else {
                        return entry;
                    }
            }));
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Entry succesfully updated",
                    isSuccess: true
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }).catch((error: AxiosError) => {
            console.log(error.response);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed updating entry",
                    isSuccess: false
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        });

    }

    return (
        <TaskboardContainer>
            <TaskboardTypeContext.Provider value="Stories">
                
                <TaskboardColumnContext.Provider value={{state: 1, statusKey: 1, itemsCount: backlogItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 1, 1)}>
                            {stories?.filter((item: {[key: string]: string}) => (item.state as unknown) === 1).map((entry: {[key: string]: string}) => (
                                <div
                                    draggable
                                    onDragStart={e => handleOnDrag(e, entry)}
                                    key={entry.id}
                                >
                                    <TaskboardCard
                                        title={entry.title}  
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

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 1, itemsCount: toDoItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 2, 1)}>
                            {stories?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 1).map((entry: {[key: string]: string}) => (
                                    <div
                                        draggable
                                        onDragStart={e => handleOnDrag(e, entry)}
                                        key={entry.id}
                                    >
                                        <TaskboardCard 
                                            title={entry.title}  
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

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 2, itemsCount: inProgressItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 2, 2)}>
                        {stories?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 2).map((entry: {[key: string]: string}) => (
                            <div 
                                draggable
                                onDragStart={e => handleOnDrag(e, entry)}
                                key={entry.id}
                            >
                                <TaskboardCard 
                                    title={entry.title}  
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

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 3, itemsCount: doneItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 2, 3)}>
                        {stories?.filter(item => (item.state as unknown) === 2 && (item.status as unknown) === 3).map((entry: {[key: string]: string}) => (
                            <div
                                draggable
                                onDragStart={e => handleOnDrag(e, entry)}
                                key={entry.id}
                            >
                                <TaskboardCard 
                                    title={entry.title}
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
            </TaskboardTypeContext.Provider>
            

        </TaskboardContainer>
    )
}

export default StoriesTaskboard;