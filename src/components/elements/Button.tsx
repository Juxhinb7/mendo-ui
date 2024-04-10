import ButtonComponentProps from "../../interfaces/buttons/ButtonComponentProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Button: React.FC<ButtonComponentProps> = (props): JSX.Element => {

    return (
        <>
            <button onClick={props.onClick} type={props.type} className={`block py-2 w-full rounded-lg text-white font-medium ${props.customColor ? props.customColor : "bg-cyan-600"}  ${props.hoverCustomColor ? props.hoverCustomColor : "hover:bg-cyan-500"}  shadow-lg hover:shadow-none cursor-pointer`}>
                {!props.processing ? <p className="px-2">{props.title}</p> : <FontAwesomeIcon icon={faSpinner} spin/>}
            </button>
        </>

    )

}


export default Button;