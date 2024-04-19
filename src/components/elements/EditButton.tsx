import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLProps } from "react";

const EditButton = (props: HTMLProps<HTMLDivElement>): JSX.Element => {
    return (
        <div {...props}>
            <FontAwesomeIcon icon={faEdit} className="cursor-pointer text-gray-600" />
        </div>
    )
}

export default EditButton;