import { faBolt, faChalkboardUser, faChartLine, faClipboard, faHashtag, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import WorkspaceItemContainer from "../../containers/WorkspaceItemContainer";
import WorkspaceItem from "../../elements/WorkspaceItem";
import { motion } from "framer-motion";

const Workspace: React.FC = (): JSX.Element => {
    const BASE_URL = "/my-environment/workspace";
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChidren: 0.1,
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <>
            <div className="mt-20">
                <motion.div
                        className="container"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                    <WorkspaceItemContainer>

                        <motion.div key={0} className="item" variants={item}>
                            <WorkspaceItem url={BASE_URL + "/projects"} title="Projects" icon={faClipboard}/>
                        </motion.div>

                        <motion.div key={1} className="item" variants={item}>
                            <WorkspaceItem url={BASE_URL + "/hashtags"} title="Hashtags" icon={faHashtag}/>
                        </motion.div>

                        <motion.div key={2} className="item" variants={item}>
                            <WorkspaceItem url={BASE_URL + "/sprints"} title="Sprints" icon={faPersonRunning}/>
                        </motion.div>
                        
                    </WorkspaceItemContainer>

                    <WorkspaceItemContainer>
                        <motion.div key={3} className="item" variants={item}>
                            <WorkspaceItem url={BASE_URL + "/epics"} title="Epics" icon={faBolt}/>
                        </motion.div>
                        
                        <motion.div key={4} className="item" variants={item}>
                            <WorkspaceItem url={BASE_URL + "/taskboard"} title="Taskboard" icon={faChalkboardUser}/>
                        </motion.div>
                        
                        <motion.div key={5} className="item" variants={item}>
                            <WorkspaceItem url={BASE_URL + "/reports"} title="Reports" icon={faChartLine}/>
                        </motion.div>

                    </WorkspaceItemContainer>
                </motion.div>
            </div>
        </>
    )
}

export default Workspace;