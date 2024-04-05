import { faBolt, faChalkboardUser, faClipboard, faHashtag, faList, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import SectionContainer from "../../containers/SectionContainer";
import WorkspaceItemContainer from "../../containers/WorkspaceItemContainer";
import WorkspaceItem from "../../elements/WorkspaceItem";

const Workspace: React.FC = (): JSX.Element => {
    return (
        <SectionContainer title="Workspace" twHeight="xs:h-[80vh] 2xl:h-[75vh]">
            <div className="mt-20">
                <WorkspaceItemContainer>
                    <WorkspaceItem title="Projects" icon={faClipboard}/>
                    <WorkspaceItem title="Hashtags" icon={faHashtag}/>
                    <WorkspaceItem title="Sprints" icon={faPersonRunning}/>
                </WorkspaceItemContainer>
                <WorkspaceItemContainer>
                    <WorkspaceItem title="Epics" icon={faBolt}/>
                    <WorkspaceItem title="MyBoard" icon={faChalkboardUser}/>
                    <WorkspaceItem title="Product Backlog" icon={faList}/>
                </WorkspaceItemContainer>
            </div>
        </SectionContainer>
    )
}

export default Workspace;