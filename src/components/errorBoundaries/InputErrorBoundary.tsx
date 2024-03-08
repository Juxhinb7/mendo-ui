import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputErrorBoundaryComponentProps from "../../interfaces/inputs/InputErrorBoundaryComponentProps";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const InputErrorBoundary: React.FC<InputErrorBoundaryComponentProps> = (props) => {
    return (
        <>
            {props.children}
            {props.error && (
            <div className="flex text-red-500">
                <FontAwesomeIcon className="ml-4 py-1" icon={faTriangleExclamation}/>
                <p className="flex ml-2">{props.error}</p>
            </div>
            )}
        </>
    )
}

export default InputErrorBoundary;