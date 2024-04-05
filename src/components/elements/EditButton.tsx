import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditButtonComponentProps from "../../interfaces/buttons/EditButtonComponentProps";

const EditButton: React.FC<EditButtonComponentProps> = (props): JSX.Element => {
    return (
        <div {...props}>
            <FontAwesomeIcon icon={faEdit} className="cursor-pointer text-gray-600" />
        </div>
    )
}

export default EditButton;