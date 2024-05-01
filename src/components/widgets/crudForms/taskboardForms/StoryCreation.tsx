import ReactQuill from "react-quill";
import Form from "../../../elements/Form";
import Input from "../../../elements/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../elements/Button";
import { useCallback, useContext, useEffect, useState } from "react";
import { TaskboardColumnContext } from "../../../pages/subpages/Taskboard";
import { useSetAtom } from "jotai";
import { StoryDescriptionAtom, StoryEndDateAtom, StoryEpicIdAtom, StoryEstimateAtom, StoryHashtagIdAtom, StoryPriorityAtom, StorySprintIdAtom, StoryStartDateAtom, StoryStateAtom, StoryStatusAtom, StoryTitleAtom } from "../../../stores/StoryDetailStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../../hooks/useToken";

const StoryCreation = (props: any): JSX.Element => {
    const hashtagsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/";
    const epicsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/epics/";
    const sprintsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/sprints/";

    const taskboardColumnData = useContext(TaskboardColumnContext);
    const {state, statusKey} = taskboardColumnData;

    const setTitle = useSetAtom(StoryTitleAtom);
    const setDescription = useSetAtom(StoryDescriptionAtom);
    const setStartDate = useSetAtom(StoryStartDateAtom);
    const setEndDate = useSetAtom(StoryEndDateAtom);
    const setPriority = useSetAtom(StoryPriorityAtom);
    const setEstimate = useSetAtom(StoryEstimateAtom);
    const setStatus = useSetAtom(StoryStatusAtom);
    const setState = useSetAtom(StoryStateAtom);
    const setHashtagId = useSetAtom(StoryHashtagIdAtom);
    const setEpicId = useSetAtom(StoryEpicIdAtom);
    const setSprintId = useSetAtom(StorySprintIdAtom);

    const [hashtagsData, setHashtagsData] = useState<{[key: string]: string}[]>();
    const [epicsData, setEpicsData] = useState<{[key: string]: string}[]>();
    const [sprintsData, setSprintsData] = useState<{[key: string]: string}[]>();


    const { token } = useToken();

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
                <FontAwesomeIcon icon={faBookmark} className="text-white bg-green-500 rounded p-2" size="1x"/>
                <p className="ml-2 p-1">Add Story</p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <Form withoutStyle={true} submitHandler={props.submitHandler}>
                    <div>
                        <Input type="text" placeholder="Title" onChange={event => setTitle(event.target.value)}/>
                    </div>
                    <div className="mt-4">
                        <ReactQuill className="h-64" placeholder="Description" onChange={setDescription} />
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
                        <Input type="datetime-local" onChange={event => setEndDate(event.target.value)} />
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
                        <Input type="number" placeholder="Estimate"  onChange={event => setEstimate(event.target.value)}/>
                    </div>
                    {state === 2 && (
                    <div className="mt-4">
                        <select value={statusKey} onChange={event => setStatus(event.target.value)}>
                            <option value={1}>To Do</option>
                            <option value={2}>In progress</option>
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
                            <option selected disabled>Select Epic</option>
                            {epicsData && epicsData.map((entry: {[key: string]: string}) => (
                                <option key={entry.id} value={entry.id}>{entry.title}</option>
                            ))}
                            </>
                        </select>
                    </div>

                    <div className="mt-4">
                        <select onChange={event => setSprintId(event.target.value)}>
                            <>
                            <option selected disabled>Select Sprint</option>
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

export default StoryCreation;
