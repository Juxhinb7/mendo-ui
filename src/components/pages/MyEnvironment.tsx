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
import { EventNotificationReadOnlyAtom } from "../stores/EventNotificationStore";
import { useAtomValue } from "jotai";
import { ErrorAlert, SuccessAlert } from "../elements/alerts";
import {ToggleReadOnlyAtom} from "../stores/ToggleStore";
import { useRef } from "react";
import Hashtags from "./subpages/Hashtags";
import Sprints from "./subpages/Sprints";


const MyEnvironment: React.FC = (): JSX.Element => {

    const { saveBackground, background } = useBackground();
    const eventNotification = useAtomValue(EventNotificationReadOnlyAtom);
    const toggle = useAtomValue(ToggleReadOnlyAtom);
    
    const sidebarContainer = useRef<HTMLDivElement>(null!);

    return (
            <div className="flex min-h-screen">

                
                <div onClick={() => sidebarContainer.current?.setAttribute("hidden", "hidden")} ref={sidebarContainer} className="hidden border-r-2 border-dotted 2xl:block w-[16rem]">
                     <Sidebar />
                </div>
                <div className={`flex relative w-full flex-col ${background}`}>
                    {eventNotification.isSuccess && (
                        <>
                            {toggle && (
                                <div className="absolute z-10 left-0 right-0">
                                    <SuccessAlert message={eventNotification.text}/>
                                </div>
                    )}
                        </>
                    )}

                    {!eventNotification.isSuccess && (
                        <>
                            {toggle && (
                                <div className="absolute z-10 left-0 right-0">
                                    <ErrorAlert message={eventNotification.text} />
                                </div>
                            )}

                        </>
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
                                <Route path="/workspace/hashtags" element={<Hashtags />} />
                                <Route path="/workspace/sprints" element={<Sprints />} />
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