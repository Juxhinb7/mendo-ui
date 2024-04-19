import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertComponentProps from "../../interfaces/alerts/AlertComponentProps";
import StatusAlertComponentProps from "../../interfaces/alerts/StatusAlertComponentProps";
import { faCheckCircle, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
const Alert: React.FC<AlertComponentProps> = (props): JSX.Element => {
    return (
        <div className={`py-1 font-medium rounded-md shadow-sm ${props.customStyle}`}>
            <div className="flex justify-center space-x-2">
                <FontAwesomeIcon icon={props.alertIcon} className="py-1"/>
                
                {props.children}

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