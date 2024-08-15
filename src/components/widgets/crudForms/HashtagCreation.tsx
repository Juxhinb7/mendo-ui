import { useSetAtom } from "jotai";
import HashtagCreationComponentProps from "../../../interfaces/widgets/HashtagCreationComponentProps";
import Form from "../../elements/Form";
import Input from "../../elements/Input";
import { HashtagTitleAtom, ProjectIdAtom } from "../../stores/HashtagDetailStore";
import Button from "../../elements/Button";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useToken from "../../../hooks/useToken";

const HashtagCreation: React.FC<HashtagCreationComponentProps> = (props) => {
    const setHashtagTitle = useSetAtom(HashtagTitleAtom);
    const [projectsData, setProjectsData] = useState<{[key: string]: string}[]>();
    const setProjectId = useSetAtom(ProjectIdAtom);
    const {token} = useToken();
    const projectsURL = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";

    useEffect(() => {
        axios({
            method: "GET",
            url: projectsURL,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setProjectsData(response.data);
            console.log(response.data);
        }).catch((error: unknown) => {
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
                    <Input type="text" onChange={event => setHashtagTitle(event.target.value)} />
                </div>
                <div className="mt-4">
                    <select className="select w-full select-bordered border-gray-200" onChange={event => setProjectId(event.target.value)}>
                        <>
                        <option selected disabled>Select Project</option>
                        {projectsData && projectsData.map((entry: {[key: string]: string}) => (
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
    )
}

export default HashtagCreation;