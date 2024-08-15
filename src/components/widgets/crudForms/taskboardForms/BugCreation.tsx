import { useCallback, useContext, useEffect, useState } from "react";
import { TaskboardColumnContext } from "../../../pages/subpages/Taskboard";
import { BugDescriptionAtom, BugEndDateAtom, BugEpicIdAtom, BugEstimateAtom, BugHashtagIdAtom, BugPriorityAtom, BugSprintIdAtom, BugStartDateAtom, BugStateAtom, BugStatusAtom, BugTitleAtom } from "../../../stores/BugDetailStore";
import { useSetAtom } from "jotai";
import useToken from "../../../../hooks/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import Form from "../../../elements/Form";
import Input from "../../../elements/Input";
import ReactQuill from "react-quill";
import Button from "../../../elements/Button";

const BugCreation = ({submitHandler}: {submitHandler: (event: React.FormEvent) => Promise<void>}) => {
    const hashtagsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/";
    const epicsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/epics/";
    const sprintsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/sprints/";
    
    const taskboardColumnData = useContext(TaskboardColumnContext);
    const {state, statusKey} = taskboardColumnData;

    const setTitle = useSetAtom(BugTitleAtom);
    const setDescription = useSetAtom(BugDescriptionAtom);
    const setStartDate = useSetAtom(BugStartDateAtom);
    const setEndDate = useSetAtom(BugEndDateAtom);
    const setStatus = useSetAtom(BugStatusAtom);
    const setState = useSetAtom(BugStateAtom);
    const setPriority = useSetAtom(BugPriorityAtom);
    const setEstimate = useSetAtom(BugEstimateAtom);
    const setHashtagId = useSetAtom(BugHashtagIdAtom);
    const setEpicId = useSetAtom(BugEpicIdAtom);
    const setSprintId = useSetAtom(BugSprintIdAtom);

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
        });
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
        });  
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
        });
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
                <FontAwesomeIcon icon={faBug} className="text-white bg-red-500 rounded p-2" size="1x"/>
                <p className="ml-2 p-1">Add Bug</p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <Form withoutStyle={true} submitHandler={submitHandler}>
                    <div>
                        <label className="ml-2">
                            Title
                        </label>
                        <Input type="text" onChange={event => setTitle(event.target.value)}/>
                    </div>
                    <div className="mt-4">
                        <label className="ml-2">
                            Description
                        </label>
                        <ReactQuill className="h-64" onChange={setDescription}/>
                    </div>
                    <div className="mt-24">
                        <label className="ml-2">
                            Start Date
                        </label>
                        <Input type="datetime-local" onChange={event => setStartDate(event.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label className="ml-2">
                            End Date
                        </label>
                        <Input type="datetime-local" onChange={event => setEndDate(event.target.value)}/>
                    </div>
                    <div className="mt-4">
                        <select className="select w-full select-bordered border-gray-200" onChange={event => setPriority(event.target.value)}>
                            <option selected disabled>Select Priority</option>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="ml-2">
                            Estimate
                        </label>
                        <Input type="number" onChange={event => setEstimate(event.target.value)} />
                    </div>

                    {state === 2 && (
                    <div className="mt-4">
                    <select className="select w-full select-bordered border-gray-200" value={statusKey} onChange={event => setStatus(event.target.value)}>
                        <option selected disabled>Select Status</option>
                        <option value={1}>To Do</option>
                        <option value={2}>In Progress</option>
                        <option value={3}>Done</option>
                    </select>
                    </div>
                    )}

                    <div className="mt-4">
                        <select className="select w-full select-bordered border-gray-200" onChange={event => setHashtagId(event.target.value)}>
                            <>
                            <option selected disabled>Select Hashtag</option>
                            {hashtagsData?.map((entry: {[key: string]: string}) => (
                                <option key={entry.id} value={entry.id}>{entry.title}</option>
                            ))}
                            </>
                        </select>
                    </div>

                    <div className="mt-4">
                        <select className="select w-full select-bordered border-gray-200" onChange={event => setEpicId(event.target.value)}>
                            <>
                            <option selected disabled>Select Epic</option>
                            {epicsData?.map((entry: {[key: string]: string}) => (
                                <option key={entry.id} value={entry.id}>{entry.title}</option>
                            ))}
                            </>
                        </select>
                    </div>

                    <div className="mt-4">
                        <select className="select w-full select-bordered border-gray-200" onChange={event => setSprintId(event.target.value)}>
                            <>
                            <option selected disabled>Select Sprint</option>
                            {sprintsData?.map((entry: {[key: string]: string}) => (
                                <option key={entry.id} value={entry.id}>{entry.title}</option>
                            ))}
                            </>
                        </select>
                    </div>

                    <div className="mt-4">
                        <Button type="submit" title="Save"/>
                    </div>

                </Form>
            </div>
        </div>
    )
};

export default BugCreation;