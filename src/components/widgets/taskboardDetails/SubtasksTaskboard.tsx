import { useAtom, useSetAtom } from "jotai";
import useToken from "../../../hooks/useToken";
import TaskboardContainer from "../../containers/TaskboardContainer"
import TaskboardColumn from "../../elements/TaskboardColumn";
import { TaskboardColumnContext, TaskboardTypeContext } from "../../pages/subpages/Taskboard";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";
import { useCallback, useEffect, useMemo } from "react";
import { SubtasksAtom } from "../../stores/SubtaskDetailStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import TaskboardCard from "../../elements/TaskboardCard";
import ConfirmModal from "../../elements/ConfirmModal";
import ConfirmationDialog from "../ConfirmationDialog";
import ViewModal from "../taskboardModals/ViewModal";

const SubtasksTaskboard = (): JSX.Element => {
    const subtasksUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/subtasks/";
    const { token } = useToken();

    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    const [subtasks, setSubtasks] = useAtom(SubtasksAtom);

    const fetchSubtasks = useCallback(() => {
        axios({
            method: "GET",
            url: subtasksUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setSubtasks(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })

    }, [token, setSubtasks]);

    useEffect(() => {
        fetchSubtasks();
    }, [fetchSubtasks]);


    const handleRemove = async (entryId: string, event: React.MouseEvent) => {
        try {
            const response = await axios({method: "DELETE", url: subtasksUrl + entryId + "/", headers: { Authorization: "Bearer " + token }});
            console.log(response.data);
            setSubtasks(subtasks?.filter((m: {[key: string]: string}) => m.id != entryId));
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Entry succesfully removed",
                    isSuccess: true
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }
        catch (error: unknown) {
            console.log(error);
        }
        event.preventDefault();
    }

    const backlogItemsCount: number = useMemo(() => subtasks ? subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 1).length : 0, [subtasks]);
    const toDoItemsCount: number = useMemo(() => subtasks ? subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 1).length : 0, [subtasks]);
    const inProgressItemsCount: number = useMemo(() => subtasks ? subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 2).length : 0, [subtasks]);
    const doneItemsCount: number = useMemo(() => subtasks ? subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 3).length : 0, [subtasks]);

    const handleOnDrag = (e: React.DragEvent, entry: {[key: string]: string}) => {
        let jsonEntry = JSON.stringify(entry);
        e.dataTransfer.setData("subtask", jsonEntry);
        console.log(`Subtask with id ${entry.id} is being dragged.`);
    };

    const handleOnDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const handleOnDrop = (e: React.DragEvent, state: number, statusKey: number) => {
        console.log(`Subtask with id ${JSON.parse(e.dataTransfer.getData("subtask")).id} finished`);
        let subtask = JSON.parse(e.dataTransfer.getData("subtask"));
        axios({
            method: "PUT",
            url: subtasksUrl + subtask.id + "/",
            data: {
                title: subtask.title,
                description: subtask.description,
                start_date: subtask.start_date,
                end_date: subtask.end_date,
                priority: subtask.priority,
                estimate: subtask.estimate,
                status: statusKey,
                state: state,
                hashtag: subtask.hashtag,
                story: subtask.story
            },
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
            setSubtasks && setSubtasks(
                subtasks?.map((entry: {[key: string]: string}) => {
                    if (entry.id === subtask.id) {
                        return {...entry, 
                            title: response.data.title,
                            description: response.data.title,
                            start_date: response.data.start_date,
                            end_date: response.data.end_date,
                            priority: response.data.priority,
                            estimate: response.data.estimate,
                            status: response.data.status,
                            state: response.data.state,
                            hashtag: response.data.hashtag,
                            story: response.data.story
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
        })
    }

    return (
        <TaskboardContainer>
            <TaskboardTypeContext.Provider value="Subtasks">
                <TaskboardColumnContext.Provider value={{state: 1, statusKey: 1, itemsCount: backlogItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 1, 1)}>
                        {subtasks?.filter((item: {[key: string]: string}) => (item.state as unknown) === 1).map((entry: {[key: string]: string}) => (
                            <div
                                draggable
                                onDragStart={e => handleOnDrag(e, entry)}
                                key={entry.id}
                            >
                                <TaskboardCard 
                                    title={entry.title}
                                    priority={entry.priority}
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
                                    viewComponent={
                                        <ViewModal data={entry} />
                                    }
                                />
                            </div>
                        ))}
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 1, itemsCount: toDoItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 2, 1)}>
                        {subtasks?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 1).map((entry: {[key: string]: string}) => (
                            <div
                                draggable
                                onDragStart={e => handleOnDrag(e, entry)}
                                key={entry.id}
                            >
                                <TaskboardCard 
                                    title={entry.title}
                                    priority={entry.priority}
                                    user={entry.user}
                                    createdAt={entry.created}
                                    trashComponent={
                                        <ConfirmModal
                                            dialogTitle="Apply Changes"
                                        >
                                            <ConfirmationDialog 
                                                handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}
                                            />
                                        </ConfirmModal>
                                    }
                                    viewComponent={
                                        <ViewModal data={entry} />
                                    }
                                />
                            </div>
                        ))}
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 2, itemsCount: inProgressItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 2, 2)}>
                        {subtasks?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 2).map((entry: {[key: string]: string}) => (
                            <div
                                draggable
                                onDragStart={e => handleOnDrag(e, entry)}
                                key={entry.id}
                            >
                                <TaskboardCard 
                                    title={entry.title}
                                    priority={entry.priority}
                                    user={entry.user}
                                    createdAt={entry.created}
                                    trashComponent={
                                        <ConfirmModal
                                            dialogTitle="Apply Changes"
                                        >
                                            <ConfirmationDialog
                                                handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}
                                            />
                                        </ConfirmModal>
                                    }
                                    viewComponent={
                                        <ViewModal data={entry} /> 
                                    }
                                />
                            </div>
                        ))}
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 3, itemsCount: doneItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 2, 3)}>
                            {subtasks?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 3).map((entry: {[key: string]: string}) => (
                                <div
                                    draggable
                                    onDragStart={e => handleOnDrag(e, entry)}
                                    key={entry.id}
                                >
                                    <TaskboardCard 
                                        title={entry.title}
                                        priority={entry.priority}
                                        user={entry.user}
                                        createdAt={entry.created}
                                        trashComponent={
                                            <ConfirmModal
                                                dialogTitle="Apply changes"
                                            >
                                                <ConfirmationDialog 
                                                    handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}
                                                />
                                            </ConfirmModal>
                                        }
                                        viewComponent={
                                            <ViewModal data={entry} />
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

export default SubtasksTaskboard;