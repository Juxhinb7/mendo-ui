import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WorkspaceItemComponentProps from "../../interfaces/workspaceItems/WorkspaceItemComponentProps";
import { Link } from "react-router-dom";

const WorkspaceItem = ({title, url, icon}: WorkspaceItemComponentProps): JSX.Element => {
    return (
    <Link to={url}>
        <div className="rounded-lg shadow-md h-64 w-18 2k:w-[30rem] 2k:h-[20vh] 2xl:h-32 2xl:w-72 bg-white border border-gray-400 mt-12 hover:shadow hover:shadow-cyan-600 cursor-pointer flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:scale-105">
            <FontAwesomeIcon icon={icon} size="3x" className="mr-4"/>
            <p className="flex text-lg 2xl:text-2xl font-semibold">
                {title}
            </p>
        </div>
    </Link>
    )

}

export default WorkspaceItem;