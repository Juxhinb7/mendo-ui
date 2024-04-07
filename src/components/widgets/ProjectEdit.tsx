import { useEffect } from "react";
import ProjectEditComponentProps from "../../interfaces/widgets/ProjectEditComponentProps";
import axios, { AxiosError, AxiosResponse } from "axios";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Form from "../elements/Form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const ProjectEdit: React.FC<ProjectEditComponentProps> = (props): JSX.Element => {

    useEffect(() => {
        axios({method: "GET", url: props.projectsURL + props.id + "/", headers: {Authorization: "Bearer " + props.token}})
        .then(res => {
            props.setTitle(res.data.title);
            props.setDescription(res.data.description);
        })
        .catch(err => {console.log(err)});
    }, []);

    const handleEdit = (event: React.FormEvent) => {
        event.preventDefault();
        axios({
            method: "PUT",
            url: props.projectsURL + props.id + "/",
            data: {
                title: props.title,
                description: props.description
            },
            headers: {
                Authorization: "Bearer " + props.token
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
            props.setData(
                props.data.map((entry: {[key: string]: string}) => {
                    if (entry.id == props.id) {
                        return {...entry, id: props.id, title: response.data.title, description: response.data.description}
                    } else {
                        return entry;
                    }
                })
            );
        }).catch((error: AxiosError) => {
            console.log(error.response);
        } )

    }



    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={handleEdit} method="PUT">
                <div>
                    <Input type="text" placeholder="Title" value={props.title} onChange={event => props.setTitle(event.target.value)}/>
                </div>

                <div className="mt-4">
                    <ReactQuill className="h-64" placeholder="Description" value={props.description} onChange={props.setDescription} />
                </div>  

                <div className="mt-14">
                    <Button type="submit" title="Save"/>
                </div>
            </Form>
        </div>
    )
}

export default ProjectEdit;