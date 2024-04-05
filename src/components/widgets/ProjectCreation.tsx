import ProjectCreationComponentProps from "../../interfaces/widgets/ProjectCreationComponentProps";
import Button from "../elements/Button";
import Form from "../elements/Form";
import Input from "../elements/Input";

const ProjectCreation: React.FC<ProjectCreationComponentProps> = (props): JSX.Element => {

    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={props.submitHandler}>
                <div>
                    <Input type="text" placeholder="Title" onChange={event => props.setTitle(event.target.value)}/>
                </div>

                <div className="mt-4">
                    <Input type="text" placeholder="Description" onChange={event => props.setDescription(event.target.value)}/>
                </div>

                <div className="mt-4">
                    <Button type="submit" title="Save"/>
                </div>
            </Form>



        </div>
    )
}

export default ProjectCreation;