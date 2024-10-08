import { useEffect } from "react";
import ProjectEditComponentProps from "../../../interfaces/widgets/ProjectEditComponentProps";
import axios, { AxiosError, AxiosResponse } from "axios";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import Form from "../../elements/Form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useAtom, useSetAtom } from "jotai";
import {EventNotificationAtom} from "../../stores/EventNotificationStore";
import { ProjectDescriptionAtom, ProjectTitleAtom } from "../../stores/ProjectDetailStore";
import useToken from "../../../hooks/useToken";
import { ToggleAtom } from "../../stores/ToggleStore";

const ProjectEdit: React.FC<ProjectEditComponentProps> = (props): JSX.Element => {
    const {token} = useToken();
    const [projectTitle, setProjectTitle] = useAtom(ProjectTitleAtom);
    const [projectDescription, setProjectDescription] = useAtom(ProjectDescriptionAtom)
    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    useEffect(() => {
        axios({method: "GET", url: props.projectsURL + props.id + "/", headers: {Authorization: "Bearer " + token}})
        .then(res => {
            setProjectTitle(res.data.title);
            setProjectDescription(res.data.description);
        })
        .catch(err => {console.log(err)});
    }, [props.id, props.projectsURL, setProjectDescription, setProjectTitle, token]);

    const handleEdit = (event: React.FormEvent) => {
        event.preventDefault();
        axios({
            method: "PUT",
            url: props.projectsURL + props.id + "/",
            data: {
                title: projectTitle,
                description: projectDescription
            },
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
            props.setData && props.setData(
                props.data && props.data.map((entry: {[key: string]: string}) => {
                    if (entry.id == props.id) {
                        return {...entry, id: props.id, title: response.data.title, description: response.data.description}
                    } else {
                        return entry;
                    }
                })
            );
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Project successfully updated",
                    isSuccess: true
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }).catch((error: AxiosError) => {
            console.log(error.response);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed updating project",
                    isSuccess: false
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            })
        } )

    }



    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={handleEdit} method="PUT">
                <div>
                    <label className="ml-2">
                        Title
                    </label>
                    <Input type="text" value={projectTitle} onChange={event => setProjectTitle(event.target.value)}/>
                </div>

                <div className="mt-4">
                    <label className="ml-2">
                        Description
                    </label>
                    <ReactQuill className="h-64" value={projectDescription} onChange={setProjectDescription} />
                </div>  

                <div className="mt-24">
                    <Button type="submit" title="Save"/>
                </div>
            </Form>
        </div>
    )
}

export default ProjectEdit;