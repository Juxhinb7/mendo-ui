import { useSetAtom } from "jotai";
import ProjectCreationComponentProps from "../../../interfaces/widgets/ProjectCreationComponentProps";
import Button from "../../elements/Button";
import Form from "../../elements/Form";
import Input from "../../elements/Input";
import ReactQuill from "react-quill";
import { ProjectDescriptionAtom, ProjectTitleAtom } from "../../stores/ProjectDetailStore";

const ProjectCreation: React.FC<ProjectCreationComponentProps> = (props): JSX.Element => {

    const setProjectTitle = useSetAtom(ProjectTitleAtom);
    const setDescription = useSetAtom(ProjectDescriptionAtom);

    return (
        <div className="text-sm text-gray-600 mt-4">
            <Form withoutStyle={true} submitHandler={props.submitHandler}>
                <div>
                    <label className="ml-2">
                        Title
                    </label>
                    <Input type="text"onChange={event => setProjectTitle(event.target.value)}/>
                </div>

                <div className="mt-4">
                    <label className="ml-2">
                        Description
                    </label>
                    <ReactQuill className="h-64" onChange={setDescription}/>
                </div>

                <div className="mt-24">
                    <Button type="submit" title="Save"/>
                </div>
            </Form>



        </div>
    )
}

export default ProjectCreation;