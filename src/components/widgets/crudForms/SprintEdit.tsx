import { useAtom, useSetAtom } from "jotai";
import Button from "../../elements/Button";
import Form from "../../elements/Form"
import Input from "../../elements/Input";
import { ProjectIdAtom, SprintEndDateAtom, SprintGoalAtom, SprintStartDateAtom, SprintTitleAtom, StateIdAtom } from "../../stores/SprintDetailStore";
import useToken from "../../../hooks/useToken";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import SprintEditComponentProps from "../../../interfaces/widgets/SprintEditComponentProps";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

const SprintEdit: React.FC<SprintEditComponentProps> = (props): JSX.Element => {
    const [sprintTitle, setSprintTitle] = useAtom(SprintTitleAtom);
    const [sprintGoal, setSprintGoal] = useAtom(SprintGoalAtom);
    const [startDate, setStartDate] = useAtom(SprintStartDateAtom);
    const [endDate, setEndDate] = useAtom(SprintEndDateAtom);
    const [projectId, setProjectId] = useAtom(ProjectIdAtom);
    const [stateId, setStateId] = useAtom(StateIdAtom);
    const projectsURL = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";
    const [projectsData, setProjectsData] = useState<{[key: string]: string}[]>();
    const setEventNotificationAtom = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    const { token } = useToken();

    useEffect(() => {
        axios({method: "GET", url: props.sprintsUrl + props.id + "/", headers: { Authorization: "Bearer " + token }})
            .then((response: AxiosResponse) => {
                setSprintTitle(response.data.title);
                setSprintGoal(response.data.goal);
                setStartDate(response.data.start_date);
                setEndDate(response.data.end_date);
                setProjectId(response.data.project);
                setStateId(response.data.state);
            })
    }, [props.id, props.sprintsUrl, setSprintTitle, setSprintGoal, setStartDate, setEndDate, setProjectId, setStateId, token]);

    useEffect(() => {
        axios({method: "GET", url: projectsURL, headers: { Authorization: "Bearer " + token }})
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
            url: props.sprintsUrl + props.id + "/",
            data: {
                title: sprintTitle,
                goal: sprintGoal,
                start_date: startDate,
                end_date: endDate,
                project: projectId,
                state: stateId
            },
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
            props.setData && props.setData(
                props.data && props.data.map((entry: {[key: string]: string}) => {
                    if (entry.id == props.id) {
                        return {...entry, 
                            id: props.id, 
                            title: response.data.title, 
                            goal: response.data.goal,
                            start_date: response.data.start_date,
                            end_date: response.data.end_date,
                            project: response.data.project,
                            state: response.data.state
                        }
                    } else {
                        return entry;
                    }
                }));
            setEventNotificationAtom((prevState) => {
                return {
                    ...prevState,
                    text: "Sprint successfully updated",
                    isSuccess: true,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000)
            
            
            
        }).catch((error: AxiosError) => {
            console.log(error.response);
            setEventNotificationAtom((prevState) => {
                return {
                    ...prevState,
                    text: "Failed updating sprint",
                    isSuccess: false,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        })

    }

    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={handleEdit} method="PUT">
                <div>
                    <label className="ml-2">
                        Title
                    </label>
                    <Input type="text" value={sprintTitle} onChange={event => setSprintTitle(event.target.value)}/>
                </div>
                <div className="mt-4">
                    <label className="ml-2">
                        Goal
                    </label>
                    <Input type="text" value={sprintGoal} onChange={event => setSprintGoal(event.target.value)} />
                </div>
                <div className="mt-4">
                    <label className="ml-2">
                        Start date
                    </label>
                    <Input type="datetime-local" value={startDate} onChange={event => setStartDate(event.target.value)}/>
                </div>
                <div className="mt-4">
                    <label className="ml-2">
                        End date
                    </label>
                    <Input type="datetime-local" value={endDate} onChange={event => setEndDate(event.target.value)}/>
                </div>
                <div className="mt-4">
                    <select className="select w-full select-bordered border-gray-200" value={projectId} onChange={event => setProjectId(event.target.value)}>
                        <>
                           <option selected disabled>Select Project</option>
                           {projectsData && projectsData.map((entry: {[key: string]: string}, index) => (
                                <option key={index} value={entry.id}>{entry.title}</option>
                           ))}
                        </>
                    </select>
                </div>
                <div className="mt-4">
                    <select className="select w-full select-bordered border-gray-200" value={stateId} onChange={event => setStateId(event.target.value)}>
                        <>
                        <option selected disabled>Select State</option>
                        <option value={1}>Backlog</option>
                        <option value={2}>Active</option>
                        <option value={3}>Completed</option>
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

export default SprintEdit;