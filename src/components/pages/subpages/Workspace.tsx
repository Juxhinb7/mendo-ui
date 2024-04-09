import { faBolt, faChalkboardUser, faClipboard, faHashtag, faList, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import WorkspaceItemContainer from "../../containers/WorkspaceItemContainer";
import WorkspaceItem from "../../elements/WorkspaceItem";

const Workspace: React.FC = (): JSX.Element => {
    const BASE_URL = "/my-environment/workspace";
    return (
        <>
            <div className="mt-20">
                <WorkspaceItemContainer>
                    <WorkspaceItem url={BASE_URL + "/projects"} title="Projects" icon={faClipboard}/>
                    <WorkspaceItem url={BASE_URL + "/hashtags"} title="Hashtags" icon={faHashtag}/>
                    <WorkspaceItem url={BASE_URL + "/sprints"} title="Sprints" icon={faPersonRunning}/>
                </WorkspaceItemContainer>
                <WorkspaceItemContainer>
                    <WorkspaceItem url={BASE_URL + "/epics"} title="Epics" icon={faBolt}/>
                    <WorkspaceItem url={BASE_URL + "/my-board"} title="My Board" icon={faChalkboardUser}/>
                    <WorkspaceItem url={BASE_URL + "/product-backlog"} title="Product Backlog" icon={faList}/>
                </WorkspaceItemContainer>
            </div>
        </>
    )
}

export default Workspace;