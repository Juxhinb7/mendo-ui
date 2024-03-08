import { Link } from "react-router-dom";
import NavLinkComponentProps from "../../interfaces/navlinks/NavLinkComponentProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLink: React.FC<NavLinkComponentProps> = (props): JSX.Element => {

    return (
        <Link to={props.currentPath} className="flex hover:text-cyan-600">
            <FontAwesomeIcon className="ml-4 p-1" icon={props.icon} size="2xl"/>
            <p className="text-md p-2 mr-4">{props.title}</p>
        </Link>

    )
}

export default NavLink;