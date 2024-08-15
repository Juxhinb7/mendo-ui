import { useAtom, useSetAtom } from "jotai";
import useToken from "../../../hooks/useToken";
import TaskboardContainer from "../../containers/TaskboardContainer"
import TaskboardColumn from "../../elements/TaskboardColumn";
import { TaskboardColumnContext, TaskboardTypeContext } from "../../pages/subpages/Taskboard";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";
import { BugsAtom } from "../../stores/BugDetailStore";
import { useCallback, useEffect, useMemo } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import TaskboardCard from "../../elements/TaskboardCard";
import ConfirmationDialog from "../ConfirmationDialog";
import ConfirmModal from "../../elements/ConfirmModal";
import ViewModal from "../taskboardModals/ViewModal";

const BugsTaskboard = (): JSX.Element => {
    const bugsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/bugs/";
    const { token } = useToken();

    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    const [bugs, setBugs] = useAtom(BugsAtom);

    const fetchBugs = useCallback(() => {
        axios({
            method: "GET",
            url: bugsUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setBugs(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token, setBugs]);

    useEffect(() => {
        fetchBugs();
    }, [fetchBugs]);

    const handleRemove = async (entryId: string, event: React.MouseEvent) => {
        try {
            const response = await axios({method: "DELETE", url: bugsUrl + entryId + "/", headers: { Authorization: "Bearer " + token }})
            console.log(response.data);
            setBugs(bugs?.filter((m: {[key: string]: string}) => m.id != entryId));
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
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed removing entry",
                    isSuccess: false
                }
            })
        }
        event.preventDefault();
    };

    const backlogItemsCount: number = useMemo(() => bugs ?  bugs.filter((item: {[key: string]: string}) => (item.state as unknown) === 1).length : 0, [bugs]);
    const toDoItemsCount: number = useMemo(() => bugs ? bugs.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 1).length : 0, [bugs]);
    const inProgressItemsCount: number = useMemo(() => bugs ? bugs.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 2).length : 0, [bugs]);
    const doneItemsCount: number = useMemo(() => bugs ? bugs.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 3).length : 0 , [bugs]);

    const handleOnDrag = (e: React.DragEvent, entry: {[key: string]: string}) => {
        let jsonEntry = JSON.stringify(entry);
        e.dataTransfer.setData("bug", jsonEntry);
        console.log(`Bug with id ${entry.id} is being dragged.`);
    } 

    const handleOnDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const handleOnDrop = (e: React.DragEvent, state: number, statusKey: number) => {
        console.log(`Bug with id ${JSON.parse(e.dataTransfer.getData("bug")).id} finished.`);
        let bug = JSON.parse(e.dataTransfer.getData("bug"));
        axios({
            method: "PUT",
            url: bugsUrl + bug.id + "/",
            data: {
                title: bug.title,
                description: bug.description,
                start_date: bug.start_date,
                end_date: bug.end_date,
                priority: bug.priority,
                status: statusKey,
                state: state,
                estimate: bug.estimate,
                hashtag: bug.hashtag,
                epic: bug.epic,
                sprint: bug.sprint
            },
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
            setBugs && setBugs(
                bugs?.map((entry: {[key: string]: string}) => {
                    if (entry.id === bug.id) {
                        return {...entry,
                            title: response.data.title,
                            description: response.data.description,
                            start_date: response.data.start_date,
                            end_date: response.data.end_date,
                            priority: response.data.priority,
                            status: response.data.status,
                            state: response.data.state,
                            estimate: response.data.estimate,
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
            <TaskboardTypeContext.Provider value="Bugs">
                
                <TaskboardColumnContext.Provider value={{state: 1, statusKey: 1, itemsCount: backlogItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 1, 1)}>
                        {bugs?.filter((item: {[key: string]: string}) => (item.state as unknown) === 1).map((entry: {[key: string]: string}) =>(
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
                        {bugs?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 1).map((entry: {[key: string]: string}) => (
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

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 2, itemsCount: inProgressItemsCount}}>
                    <TaskboardColumn onDragOver={handleOnDragOver} onDrop={e => handleOnDrop(e, 2, 2)}>
                        {bugs?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 2).map((entry: {[key: string]: string}) => (
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
                        {bugs?.filter((item: {[key: string]: string}) => (item.state as unknown) === 2 && (item.status as unknown) === 3).map((entry: {[key: string]: string}) => (
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

            </TaskboardTypeContext.Provider>
        </TaskboardContainer>
    )
}

export default BugsTaskboard;