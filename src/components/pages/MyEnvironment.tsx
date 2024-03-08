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
import Reports from "./subpages/Reports";
import Settings from "./subpages/Settings";
import ProjectDetail from "../details/ProjectDetail";
import HashtagDetail from "../details/HashtagDetail";
import SprintDetail from "../details/SprintDetail";
import EpicDetail from "../details/EpicDetail";

const MyEnvironment: React.FC = (): JSX.Element => {

    const { saveBackground, background } = useBackground();

    return (
            <div className="flex min-h-screen">

                <div className="hidden border-r-2 border-dotted 2xl:block w-[16rem]">
                     <Sidebar />
                </div>

                <div className={`flex w-full flex-col ${background}`}>
                    <HorizontalBar />

                    <div className="flex">
                        <ContentContainer>
                            <Routes>
                                <Route path="/home" element={
                                    <BackgroundHandlerContext.Provider value={saveBackground}>
                                        <Home />
                                    </BackgroundHandlerContext.Provider>
                                }/>
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/projects/:id" element={<ProjectDetail />}/>
                                <Route path="/projects/hashtags/:id" element={<HashtagDetail />} />
                                <Route path="/projects/sprints/:id" element={<SprintDetail />} />
                                <Route path="/projects/epics/:id" element={<EpicDetail />} />
                                <Route path="/reports" element={<Reports />} />
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