import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../../elements/Form";
import Input from "../../../elements/Input";
import ReactQuill from "react-quill";
import { TaskboardColumnContext } from "../../../pages/subpages/Taskboard";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { SubtaskDescriptionAtom, SubtaskEndDateAtom, SubtaskEstimateAtom, SubtaskHashtagIdAtom, SubtaskPriorityAtom, SubtaskStartDateAtom, SubtaskStateAtom, SubtaskStatusAtom, SubtaskStoryIdAtom, SubtaskTitleAtom } from "../../../stores/SubtaskDetailStore";
import useToken from "../../../../hooks/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";
import Button from "../../../elements/Button";

const SubtaskCreation = ({submitHandler}: {submitHandler: (event: React.FormEvent) => Promise<void>}): JSX.Element => {
    const hashtagsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/";
    const storiesUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/stories/";

    const taskboardColumnState = useContext(TaskboardColumnContext);
    const {state, statusKey} = taskboardColumnState;

    const setTitle= useSetAtom(SubtaskTitleAtom);
    const setDescription = useSetAtom(SubtaskDescriptionAtom);
    const setStartDate = useSetAtom(SubtaskStartDateAtom);
    const setEndDate = useSetAtom(SubtaskEndDateAtom);
    const setPriority = useSetAtom(SubtaskPriorityAtom);
    const setEstimate = useSetAtom(SubtaskEstimateAtom);
    const setStatus = useSetAtom(SubtaskStatusAtom);
    const setState = useSetAtom(SubtaskStateAtom);
    const setHashtagId = useSetAtom(SubtaskHashtagIdAtom);
    const setStoryId = useSetAtom(SubtaskStoryIdAtom);

    const [hashtagsData, setHashtagsData] = useState<{[key: string]: string}[]>();
    const [storiesData, setStoriesData] = useState<{[key: string]: string}[]>();
    
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

    const fetchStories = useCallback(() => {
        axios({
            method: "GET",
            url: storiesUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setStoriesData(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token]);

    useEffect(() => {
        fetchHashtags();
        fetchStories();
        setStatus(statusKey.toString());
        setState(state.toString());
    }, [fetchHashtags, fetchStories, setStatus, statusKey, setState, state]);

    return (
        <div>
            <div className="flex">
                <FontAwesomeIcon icon={faListCheck} className="text-white bg-sky-400 rounded p-2" size="1x"/>
                <p className="ml-2 p-1">Add Subtask</p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <Form withoutStyle={true} submitHandler={submitHandler}>
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
                        <Input type="datetime-local" onChange={event => setStartDate(event.target.value)} />
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
                        <select onChange={event => setStoryId(event.target.value)}>
                            <>
                            <option selected disabled>Select Story</option>
                            {storiesData && storiesData.map((entry: {[key: string]: string}) => (
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
}

export default SubtaskCreation;