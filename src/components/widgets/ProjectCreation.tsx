import ProjectCreationComponentProps from "../../interfaces/widgets/ProjectCreationComponentProps";
import Button from "../elements/Button";
import Form from "../elements/Form";
import Input from "../elements/Input";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const ProjectCreation: React.FC<ProjectCreationComponentProps> = (props): JSX.Element => {

    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={props.submitHandler}>
                <div>
                    <Input type="text" placeholder="Title" onChange={event => props.setTitle(event.target.value)}/>
                </div>

                <div className="mt-4">
                    <ReactQuill className="h-64" placeholder="Description" onChange={props.setDescription}/>
                </div>

                <div className="mt-14">
                    <Button type="submit" title="Save"/>
                </div>
            </Form>



        </div>
    )
}

export default ProjectCreation;