import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton = (props: any): JSX.Element => {
    return (
        <div {...props}>
            <FontAwesomeIcon icon={faEdit} className="cursor-pointer text-gray-600" />
        </div>
    )
}

export default EditButton;