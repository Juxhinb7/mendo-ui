import { useSetAtom } from "jotai";
import SprintCreationComponentProps from "../../../interfaces/widgets/SprintCreationComponentProps";
import Button from "../../elements/Button";
import Form from "../../elements/Form";
import Input from "../../elements/Input";
import { ProjectIdAtom, SprintEndDateAtom, SprintGoalAtom, SprintStartDateAtom, SprintTitleAtom, StateIdAtom } from "../../stores/SprintDetailStore";
import { useEffect, useState } from "react";
import useToken from "../../../hooks/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";

const SprintCreation: React.FC<SprintCreationComponentProps> = (props) => {
    const setTitle = useSetAtom(SprintTitleAtom);
    const setGoal = useSetAtom(SprintGoalAtom);
    const setStartDate = useSetAtom(SprintStartDateAtom);
    const setEndDate = useSetAtom(SprintEndDateAtom);
    const setProjectId = useSetAtom(ProjectIdAtom);
    const setStateId = useSetAtom(StateIdAtom);
    const projectsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";
    const { token } = useToken();
    const [projectsData, setProjectsData] = useState<{[key: string]: string}[]>();

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
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token]);



    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={props.submitHandler}>
                <div>
                    <label className="ml-2">
                        Title
                    </label>
                    <Input type="text" onChange={event => setTitle(event.target.value)}/>
                </div>
                <div className="mt-4">
                    <label className="ml-2">
                        Goal
                    </label>
                    <Input type="text" onChange={event => setGoal(event.target.value)}/>
                </div>

                <div className="mt-4">
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
                    <select className="select w-full select-bordered border-gray-200" onChange={event => setProjectId(event.target.value)}>
                        <>
                        <option selected disabled>Select a project</option>
                        {projectsData && projectsData.map((entry: {[key: string]: string}, index) => (
                            <option key={index} value={entry.id}>{entry.title}</option>
                        ))}
                        </>

                    </select>
                </div>
                <div className="mt-4">
                    <select className="select w-full select-bordered border-gray-200" onChange={event => setStateId(event.target.value)}>
                        <>
                        <option selected disabled>Select State</option>
                        <option value={1}>Backlog</option>
                        <option value={2}>Active</option>
                        <option value={3}>Completed</option>
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

export default SprintCreation;