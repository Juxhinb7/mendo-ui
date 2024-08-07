import Input from "../../elements/Input";
import ReactQuill from "react-quill";
import EpicEditComponentProps from "../../../interfaces/widgets/EpicEditComponentProps";
import Form from "../../elements/Form";
import Button from "../../elements/Button";
import { useAtom, useSetAtom } from "jotai";
import { EpicDescriptionAtom, EpicEndDateAtom, EpicEstimateAtom, EpicHashtagIdAtom, EpicPriorityAtom, EpicProjectIdAtom, EpicStartDateAtom, EpicStatusAtom, EpicTitleAtom } from "../../stores/EpicDetailStore";
import useToken from "../../../hooks/useToken";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

const EpicEdit: React.FC<EpicEditComponentProps> = (props): JSX.Element => {
    const [title, setTitle] = useAtom(EpicTitleAtom);
    const [description, setDescription] = useAtom(EpicDescriptionAtom);
    const [startDate, setStartDate] = useAtom(EpicStartDateAtom);
    const [endDate, setEndDate] = useAtom(EpicEndDateAtom);
    const [status, setStatus] = useAtom(EpicStatusAtom);
    const [priority, setPriority] = useAtom(EpicPriorityAtom);
    const [estimate, setEstimate] = useAtom(EpicEstimateAtom);
    const [hashtagId, setHashtagId] = useAtom(EpicHashtagIdAtom);
    const [projectId, setProjectId] = useAtom(EpicProjectIdAtom);
    const hashtagsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/";
    const projectsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";
    const { token } = useToken();
    const [hashtagsData, setHashtagsData] = useState<{[key: string]: string}[]>();
    const [projectsData, setProjectsData] = useState<{[key: string]: string}[]>();
    const setEventNotificationAtom = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    useEffect(() => {
        axios({method: "GET", url: props.epicsUrl + props.id + "/", headers: { Authorization: "Bearer " + token }})
            .then((response: AxiosResponse) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setStartDate(response.data.start_date);
                setEndDate(response.data.end_date);
                setStatus(response.data.status);
                setPriority(response.data.priority);
                setEstimate(response.data.estimate);
                setHashtagId(response.data.hashtag);
                setProjectId(response.data.project);
            })
    }, [props.id, props.epicsUrl, setTitle, setDescription, setStartDate, setEndDate, setStatus, setPriority, setEstimate, setHashtagId, setProjectId, token]);

    useEffect(() => {
        axios({method: "GET", url: hashtagsUrl, headers: { Authorization: "Bearer " + token }})
            .then((response: AxiosResponse) => {
                setHashtagsData(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error.response);
            })
    }, [token, setHashtagsData]);

    useEffect(() => {
        axios({method: "GET", url: projectsUrl, headers: { Authorization: "Bearer " + token }})
            .then((response: AxiosResponse) => {
                setProjectsData(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error.response);
            })
    }, [token]);

    const handleEdit = (event: React.FormEvent) => {
        event.preventDefault();
        axios({
            method: "PUT",
            url: props.epicsUrl + props.id + "/",
            data: {
                title: title,
                description: description,
                start_date: startDate,
                end_date: endDate,
                status: status,
                priority: priority,
                estimate: estimate,
                hashtag: hashtagId,
                project: projectId,
            },
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
            props.setData && props.setData(
                props.data && props.data.map((entry: {[key: string]: string}) => {
                    if (entry.id === props.id) {
                        return {...entry, 
                            title: response.data.title,
                            description: response.data.description,
                            start_date: response.data.start_date,
                            end_date: response.data.end_date,
                            status: response.data.status,
                            priority: response.data.priority,
                            estimate: response.data.estimate,
                            hashtag: response.data.hashtag,
                            project: response.data.project
                        }
                    } else {
                        return entry;
                    }
                })
            );
            setEventNotificationAtom((prevState) => {
                return {
                    ...prevState,
                    text: "Epic succesfully updated",
                    isSuccess: true,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);

        }).catch((error: AxiosError) => {
            console.log(error.response);
            setEventNotificationAtom((prevState) => {
                return {
                    ...prevState,
                    text: "Failed updating epic",
                    isSuccess: false,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        });
    }
    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={handleEdit} method="PUT">
                <div>
                    <Input type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
                </div>
                <div className="mt-4">
                    <ReactQuill className="h-64" placeholder="Description" value={description} onChange={setDescription}/>
                </div>
                <div className="mt-24">
                    <label className="ml-2">
                        Start Date
                    </label>
                    <Input type="datetime-local" value={startDate} onChange={event => setStartDate(event.target.value)} />
                </div>
                <div className="mt-4">
                    <label className="ml-2">
                        End Date
                    </label>
                    <Input type="datetime-local" value={endDate} onChange={event => setEndDate(event.target.value)} />
                </div>
                <div className="mt-4">
                    <select value={status} onChange={event => setStatus(event.target.value)}>
                        <>
                        <option selected disabled>Select Status</option>
                        <option value={1}>To Do</option>
                        <option value={2}>In Progress</option>
                        <option value={3}>Done</option>
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <select value={priority} onChange={event => setPriority(event.target.value)}>
                        <>
                        <option selected disabled>Select Priority</option>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <Input type="number" value={estimate} placeholder="Estimate" onChange={ event => setEstimate(event.target.value)} />
                </div>
                <div className="mt-4">
                    <select value={hashtagId} onChange={event => setHashtagId(event.target.value)}>
                        <>
                        <option selected disabled>Select Hashtag</option>
                        {hashtagsData && hashtagsData.map((entry: {[key: string]: string}, index: number) => (
                            <option key={index} value={entry.id}>{entry.title}</option>
                        ))}
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <select value={projectId} onChange={event => setProjectId(event.target.value)}>
                        <>
                        <option selected disabled>Select Project</option>
                        {projectsData && projectsData.map((entry: {[key: string]: string}, index: number) => (
                            <option key={index} value={entry.id}>{entry.title}</option>
                        ))}
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <Button type="submit" title="Save" />
                </div>
            </Form>
        </div>
    )
}

export default EpicEdit;