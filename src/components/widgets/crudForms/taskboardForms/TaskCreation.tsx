import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../../elements/Form";
import Input from "../../../elements/Input";
import ReactQuill from "react-quill";
import { useSetAtom } from "jotai";
import { TaskDescriptionAtom, TaskEndDateAtom, TaskEpicIdAtom, TaskEstimateAtom, TaskHashtagIdAtom, TaskPriorityAtom, TaskSprintIdAtom, TaskStartDateAtom, TaskStateAtom, TaskStatusAtom, TaskTitleAtom } from "../../../stores/TaskDetailStore";
import Button from "../../../elements/Button";
import { TaskboardColumnContext } from "../../../pages/subpages/Taskboard";
import { useCallback, useContext, useEffect, useState } from "react";
import useToken from "../../../../hooks/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";

const TaskCreation = ({submitHandler}: {submitHandler: (event: React.FormEvent) => Promise<void>}): JSX.Element => {
    const hashtagsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/";
    const epicsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/epics/";
    const sprintsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/sprints/";

    const taskboardColumnState = useContext(TaskboardColumnContext);
    const {state, statusKey} = taskboardColumnState;

    const setTitle = useSetAtom(TaskTitleAtom);
    const setDescription = useSetAtom(TaskDescriptionAtom);
    const setStartDate = useSetAtom(TaskStartDateAtom);
    const setEndDate = useSetAtom(TaskEndDateAtom);
    const setPriority = useSetAtom(TaskPriorityAtom);
    const setEstimate = useSetAtom(TaskEstimateAtom);
    const setStatus = useSetAtom(TaskStatusAtom);
    const setState = useSetAtom(TaskStateAtom);
    const setHashtagId = useSetAtom(TaskHashtagIdAtom);
    const setEpicId = useSetAtom(TaskEpicIdAtom);
    const setSprintId = useSetAtom(TaskSprintIdAtom);

    const [hashtagsData, setHashtagsData] = useState<{[key: string]: string}[]>();
    const [epicsData, setEpicsData] = useState<{[key: string]: string}[]>();
    const [sprintsData, setSprintsData] = useState<{[key: string]: string}[]>();

    const {token} = useToken();

    const fetchHashtags = useCallback(() => {
        axios({
            method: "GET",
            url: hashtagsUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setHashtagsData(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token]);

    const fetchEpics = useCallback(() => {
        axios({
            method: "GET",
            url: epicsUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setEpicsData(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token]);

    const fetchSprints = useCallback(() => {
        axios({
            method: "GET",
            url: sprintsUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setSprintsData(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token]);

    useEffect(() => {
        fetchHashtags();
        fetchEpics();
        fetchSprints();
        setStatus(statusKey.toString());
        setState(state.toString());
    }, [fetchHashtags, fetchEpics, fetchSprints, setStatus, statusKey, setState, state]);



    return (
        <div>
            <div className="flex">
                <FontAwesomeIcon icon={faCheck} className="text-white bg-blue-400 rounded p-2" size="1x"/>
                <p className="ml-2 p-1">Add Task</p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <Form withoutStyle={true} submitHandler={submitHandler}>
                    <div>
                        <Input type="text" placeholder="Title" onChange={event => setTitle(event.target.value)} />
                    </div>
                    <div className="mt-4">
                        <ReactQuill className="h-64" placeholder="Description" onChange={setDescription}/>
                    </div>
                    <div className="mt-24">
                        <label className="ml-2">
                            Start Date
                        </label>
                        <Input type="datetime-local" onChange={event => setStartDate(event.target.value)}/>
                    </div>
                    <div className="mt-4">
                        <label className="ml-2">
                            End Date
                        </label>
                        <Input type="datetime-local" onChange={event => setEndDate(event.target.value)}/>
                    </div>
                    <div className="mt-4">
                        <select onChange={event => setPriority(event.target.value)}>
                            <option selected disabled>Select Priority</option>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <Input type="number" placeholder="Estimate" onChange={event => setEstimate(event.target.value)}/>
                    </div>

                    {state === 2 && (
                        <div className="mt-4">
                            <select value={statusKey} onChange={event => setStatus(event.target.value)}>
                                <option value={1}>To Do</option>
                                <option value={2}>In Progress</option>
                                <option value={3}>Done</option>
                            </select>
                        </div>
                    )}

                    <div className="mt-4">
                        <select onChange={event => setHashtagId(event.target.value)}>
                            <>
                            <option selected disabled>Select Hashtag</option>
                            {hashtagsData && hashtagsData.map((entry: {[key: string]: string}) => (
                                <option key={entry.id} value={entry.id}>{entry.title}</option>
                            ))}
                            </>
                        </select>
                    </div>

                    <div className="mt-4">
                        <select onChange={event => setEpicId(event.target.value)}>
                            <>
                            <option disabled selected>Select Epic</option>
                            {epicsData && epicsData.map((entry: {[key: string]: string}) => (
                                <option key={entry.id} value={entry.id}>{entry.title}</option>
                            ))}
                            </>
                        </select>
                    </div>

                    <div className="mt-4">
                        <select onChange={event => setSprintId(event.target.value)}>
                            <>
                            <option disabled selected>Select Sprint</option>
                            {sprintsData && sprintsData.map((entry: {[key: string]: string}) => (
                                <option key={entry.id} value={entry.id}>{entry.title}</option>
                            ))}
                            </>
                        </select>
                    </div>


                    <div className="mt-4"> 
                        <Button type="submit" title="Save" />
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default TaskCreation;