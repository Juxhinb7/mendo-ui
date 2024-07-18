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

    return (
        <TaskboardContainer>
            <TaskboardTypeContext.Provider value="Subtasks">
                <TaskboardColumnContext.Provider value={{state: 1, statusKey: 1, itemsCount: backlogItemsCount}}>
                    <TaskboardColumn>
                        {subtasks && subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 1).map((entry: {[key: string]: string}) => (
                            <div>
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
                    <TaskboardColumn>
                        {subtasks && subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 1).map((entry: {[key: string]: string}) => (
                            <div>
                                <TaskboardCard 
                                    title={entry.title}
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
                                />
                            </div>
                        ))}
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 2, itemsCount: inProgressItemsCount}}>
                    <TaskboardColumn>
                        {subtasks && subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 2).map((entry: {[key: string]: string}) => (
                            <div>
                                <TaskboardCard 
                                    title={entry.title}
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
                                />
                            </div>
                        ))}
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 3, itemsCount: doneItemsCount}}>
                    <TaskboardColumn>
                        <div>
                            {subtasks && subtasks.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 3).map((entry: {[key: string]: string}) => (
                                <TaskboardCard 
                                    title={entry.title}
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
                                />
                            ))}
                        </div>
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>
            
            </TaskboardTypeContext.Provider>
        </TaskboardContainer>
    )
}

export default SubtasksTaskboard;