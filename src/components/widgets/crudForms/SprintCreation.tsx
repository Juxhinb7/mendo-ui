import { useSetAtom } from "jotai";
import SprintCreationComponentProps from "../../../interfaces/widgets/SprintCreationComponentProps";
import Button from "../../elements/Button";
import Form from "../../elements/Form";
import Input from "../../elements/Input";
import { ProjectIdAtom, SprintEndDateAtom, SprintGoalAtom, SprintStartDateAtom, SprintTitleAtom } from "../../stores/SprintDetailStore";
import { useEffect, useState } from "react";
import useToken from "../../../hooks/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";

const SprintCreation: React.FC<SprintCreationComponentProps> = (props) => {
    const setTitle = useSetAtom(SprintTitleAtom);
    const setGoal = useSetAtom(SprintGoalAtom);
    const setStartDate = useSetAtom(SprintStartDateAtom);
    const setEndDate = useSetAtom(SprintEndDateAtom);
    const setProjectId = useSetAtom(ProjectIdAtom);
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
                    <Input type="text" placeholder="Title" onChange={event => setTitle(event.target.value)}/>
                </div>
                <div className="mt-4">
                    <Input type="text" placeholder="Goal" onChange={event => setGoal(event.target.value)}/>
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
                    <select onChange={event => setProjectId(event.target.value)}>
                        <>
                        <option selected disabled>Select a project</option>
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

export default SprintCreation;