import Sidebar from "../widgets/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import Home from "./subpages/Home";
import ContentContainer from "../containers/ContentContainer";
import HorizontalBar from "../widgets/HorizontalBar";
import useBackground from "../../hooks/useBackground";
import { BackgroundHandlerContext } from "../../contexts/BackgroundHandlerContext";
import Projects from "./subpages/Projects";
import Workspace from "./subpages/Workspace";
import Settings from "./subpages/Settings";
import ProjectDetail from "../details/ProjectDetail";
import HashtagDetail from "../details/HashtagDetail";
import SprintDetail from "../details/SprintDetail";
import EpicDetail from "../details/EpicDetail";
import { EventNotificationReadOnlyAtom } from "../stores/EventNotificationAtom";
import { useAtom } from "jotai";


const MyEnvironment: React.FC = (): JSX.Element => {

    const { saveBackground, background } = useBackground();
    const [eventNotificationText] = useAtom(EventNotificationReadOnlyAtom);

    return (
            <div className="flex min-h-screen">
                
                <div className="hidden border-r-2 border-dotted 2xl:block w-[16rem]">
                     <Sidebar />
                </div>

                <div className={`flex relative w-full flex-col ${background}`}>
                    {eventNotificationText && (
                        <div className="absolute z-10 left-0 right-0">
                            {eventNotificationText}
                        </div>
                    )}

                    <HorizontalBar />

                    <div className="flex">
                        <ContentContainer>
                            <Routes>
                                <Route path="/home" element={
                                    <BackgroundHandlerContext.Provider value={saveBackground}>
                                        <Home />
                                    </BackgroundHandlerContext.Provider>
                                }/>
                                <Route path="/workspace" element={<Workspace />} />
                                <Route path="/workspace/projects" element={<Projects />} />
                                <Route path="/workspace/projects/:id" element={<ProjectDetail />}/>
                                <Route path="/workspace/projects/hashtags/:id" element={<HashtagDetail />} />
                                <Route path="/workspace/projects/sprints/:id" element={<SprintDetail />} />
                                <Route path="/workspace/projects/epics/:id" element={<EpicDetail />} />
                                <Route path ="/settings" element={<Settings />} /> 
                            </Routes>
                        </ContentContainer>
                    </div>
                    
                </div>

                <div className="fixed z-10 right-8 bottom-8">
                    <FontAwesomeIcon icon={faRobot} className="text-gray-600" size={"4x"}/>
                </div>
            </div>

    )
}

export default MyEnvironment;