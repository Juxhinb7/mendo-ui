import ReactQuill from "react-quill";
import Form from "../../elements/Form";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import { useSetAtom } from "jotai";
import { EpicDescriptionAtom, EpicEndDateAtom, EpicEstimateAtom, EpicHashtagIdAtom, EpicPriorityAtom, EpicProjectIdAtom, EpicStartDateAtom, EpicStatusAtom, EpicTitleAtom } from "../../stores/EpicDetailStore";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../hooks/useToken";
import EpicCreationComponentProps from "../../../interfaces/widgets/EpicCreationComponentProps";


const EpicCreation: React.FC<EpicCreationComponentProps> = (props): JSX.Element => {
    
    const setTitle = useSetAtom(EpicTitleAtom);
    const setDescription = useSetAtom(EpicDescriptionAtom);
    const setStartDate = useSetAtom(EpicStartDateAtom);
    const setEndDate = useSetAtom(EpicEndDateAtom);
    const setStatus = useSetAtom(EpicStatusAtom);
    const setPriority = useSetAtom(EpicPriorityAtom);
    const setEstimate = useSetAtom(EpicEstimateAtom);
    const setHashtagId = useSetAtom(EpicHashtagIdAtom);
    const setProjectId = useSetAtom(EpicProjectIdAtom);
    const hashtagsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/";
    const projectsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";
    const { token } = useToken();
    const [hashtagsData, setHashtagsData] = useState<{[key: string]: string}[]>();
    const [projectsData, setProjectsData] = useState<{[key: string]: string}[]>();

    useEffect(() => {
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

    useEffect(() => {
        axios({
            method: "GET",
            url: projectsUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setProjectsData(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token])

    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={props.submitHandler}>
                <div>
                    <Input type="text" placeholder="Title" onChange={event => setTitle(event.target.value)} />
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
                    <Input type="datetime-local" onChange={ event => setEndDate(event.target.value) } />
                </div>
                <div className="mt-4">
                    <select onChange={event => setStatus(event.target.value)}>
                        <>
                        <option selected disabled>Select Status</option>
                        <option value={1}>To Do</option>
                        <option value={2}>In Progress</option>
                        <option value={3}>Done</option>
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <select onChange={event => setPriority(event.target.value)}>
                        <>
                        <option selected disabled>Select Priority</option>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <Input type="number" placeholder="Estimate" onChange={event => setEstimate(event.target.value)} />
                </div>
                <div className="mt-4">
                    <select onChange={event => setHashtagId(event.target.value)}>
                        <>
                        <option selected disabled>Select Hashtag</option>
                        {hashtagsData && hashtagsData.map((entry: {[key: string]: string}, index: number) => (
                            <option key={index} value={entry.id}>{entry.title}</option>
                        ))}
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <select onChange={event => setProjectId(event.target.value)}>
                        <>
                        <option selected disabled>Select Project</option>
                        {projectsData && projectsData.map((entry: {[key: string]: string}, index) => (
                            <option key={index} value={entry.id}>{entry.title}</option>
                        ))}
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <Button type="submit" title="Save"/>
                </div>
            </Form>
        </div>
    )
}

export default EpicCreation;