import Sidebar from "../widgets/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faRobot } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import ContentContainer from "../containers/ContentContainer";
import HorizontalBar from "../widgets/HorizontalBar";
import useBackground from "../../hooks/useBackground";
import { BackgroundHandlerContext } from "../../contexts/BackgroundHandlerContext";
import ProjectDetail from "../details/ProjectDetail";
import HashtagDetail from "../details/HashtagDetail";
import SprintDetail from "../details/SprintDetail";
import EpicDetail from "../details/EpicDetail";
import { EventNotificationReadOnlyAtom } from "../stores/EventNotificationStore";
import { useAtomValue } from "jotai";
import { ErrorAlert, SuccessAlert } from "../elements/alerts";
import {ToggleReadOnlyAtom} from "../stores/ToggleStore";
import { lazy, useState } from "react";
import LazyComponent from "../lazy/LazyComponent";

const Home = lazy(() => import("./subpages/Home"));
const Projects = lazy(() => import("./subpages/Projects"));
const Workspace = lazy(() => import("./subpages/Workspace"));
const Settings = lazy(() => import("./subpages/Workspace"));
const Hashtags = lazy(() => import("./subpages/Hashtags"));
const Sprints = lazy(() => import("./subpages/Sprints"));
const Epics = lazy(() => import("./subpages/Epics"));
const Taskboard = lazy(() => import("./subpages/Taskboard"));
import 'react-quill/dist/quill.snow.css';


const MyEnvironment: React.FC = (): JSX.Element => {

    const { saveBackground, background } = useBackground();
    const eventNotification = useAtomValue(EventNotificationReadOnlyAtom);
    const toggle = useAtomValue(ToggleReadOnlyAtom);
    const [isRobotHovered, setIsRobotHovered] = useState(false);

    const loading = <h1 className="flex justify-center items-center sm:px-6 min-h-[calc(100vh-10rem)]">Loading...</h1>

    return (
            <div className="flex min-h-screen">

                <div className="hidden border-r-2 border-dotted 2xl:block w-[16rem] ">
                     <Sidebar />
                </div>
                <div className={`flex relative w-full flex-col ${background || "bg-gray-100"}`}>
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
                                        <LazyComponent fallback={loading} element={<Home />} />
                                    </BackgroundHandlerContext.Provider>
                                }/>
                                <Route path="/workspace" element={<LazyComponent fallback={loading} element={<Workspace />} />} />
                                <Route path="/workspace/projects" element={<LazyComponent fallback={loading} element={<Projects />} />} />
                                <Route path="/workspace/hashtags" element={<LazyComponent fallback={loading} element={<Hashtags />} />} />
                                <Route path="/workspace/sprints" element={<LazyComponent fallback={loading} element={<Sprints />} />} />
                                <Route path="/workspace/epics" element={<LazyComponent fallback={loading} element={<Epics />} />} />
                                <Route path="/workspace/taskboard" element={<LazyComponent fallback={loading} element={<Taskboard />} />} />
                                <Route path="/workspace/projects/:id" element={<ProjectDetail />}/>
                                <Route path="/workspace/projects/hashtags/:id" element={<HashtagDetail />} />
                                <Route path="/workspace/projects/sprints/:id" element={<SprintDetail />} />
                                <Route path="/workspace/projects/epics/:id" element={<EpicDetail />} />
                                <Route path ="/settings" element={<LazyComponent fallback={loading} element={<Settings />} />} /> 
                            </Routes>
                        </ContentContainer>
                    </div>
                    
                </div>

                <div className="fixed z-10 right-8 bottom-8">
                    <button onMouseEnter={() => setIsRobotHovered(true)} onMouseLeave={() => setIsRobotHovered(false)} className="rounded-full w-[4.5rem] h-[4.5rem] bg-gradient-to-r from-[#0ddbdb] to-[#14a2c9] z-10 shadow-2xl">
                        <FontAwesomeIcon icon={isRobotHovered ? faArrowCircleUp : faRobot} className="text-gray-900 py-4" size={"2x"}/>
                    </button>
                    <div className="absolute bg-gradient-to-r from-[#7a63a3] to-[#63a4ee] animate-scale blur -inset-1 rounded-full -z-10"></div>
                </div>


            </div>

    )
}

export default MyEnvironment;