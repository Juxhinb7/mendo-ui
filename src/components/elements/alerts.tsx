import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertComponentProps from "../../interfaces/alerts/AlertComponentProps";
import StatusAlertComponentProps from "../../interfaces/alerts/StatusAlertComponentProps";
import { faCheckCircle, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import ToggleAtom from "../stores/ToggleStore";

const Alert: React.FC<AlertComponentProps> = (props): JSX.Element => {
    const [toggle, setToggle] = useAtom(ToggleAtom);
    return (
        <div className={`py-1 font-medium rounded-md shadow-sm ${props.customStyle}`}>
            <div className="flex justify-between mx-3">
                <FontAwesomeIcon icon={props.alertIcon} className="py-1"/>
                
                {props.children}

                    <button onClick={() => setToggle(!toggle)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

            </div>


        </div>
    )
}

export const SuccessAlert: React.FC<StatusAlertComponentProps> = (props): JSX.Element => {
    return (
        <Alert alertIcon={faCheckCircle} customStyle="bg-lime-200 text-lime-800">
            <p>{props.message}</p>
        </Alert>
    )
}

export const ErrorAlert: React.FC<StatusAlertComponentProps> = (props): JSX.Element => {
    return (
        <Alert alertIcon={faTriangleExclamation} customStyle="bg-red-200 text-red-800">
            <p>{props.message}</p>
        </Alert>
    )
}