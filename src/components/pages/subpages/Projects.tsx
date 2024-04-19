import { useEffect, useState } from "react";
import TableContainer from "../../containers/TableContainer";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../hooks/useToken";
import { Link } from "react-router-dom";
import SectionContainer from "../../containers/SectionContainer";
import {faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../elements/Modal";
import ProjectCreation from "../../widgets/crudForms/ProjectCreation";
import ProjectEdit from "../../widgets/crudForms/ProjectEdit";
import ModalComponentProps from "../../../interfaces/modals/ModalComponentProps";
import ProjectCreationComponentProps from "../../../interfaces/widgets/ProjectCreationComponentProps";
import {EventNotificationAtom} from "../../stores/EventNotificationStore";
import { useAtomValue, useSetAtom } from "jotai";
import { ProjectDescriptionReadOnlyAtom, ProjectTitleReadOnlyAtom } from "../../stores/ProjectDetailStore";
import {ToggleAtom} from "../../stores/ToggleStore";
import ConfirmModal from "../../elements/ConfirmModal";
import ConfirmationDialog from "../../widgets/ConfirmationDialog";
import ShowSadFaceIfDataNotExists from "../../elements/ShowSadFaceIfDataNotExists";


const Projects: React.FC = (): JSX.Element => {
    const projectsURL = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";
    const [data, setData] = useState<{[key: string]: string}[] | undefined>();

    const HEADINGS = ["#", "User", "Project Title", "Action"];
    const {token} = useToken();
    const projectTitle = useAtomValue(ProjectTitleReadOnlyAtom);
    const projectDescription = useAtomValue(ProjectDescriptionReadOnlyAtom);
    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    useEffect(() => {
        axios({
            method: "GET",
            url: projectsURL,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setData(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error.response);
        })
    }, [token, projectTitle, projectDescription]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response: AxiosResponse = await axios({method: "POST", 
                url: projectsURL, 
                data: {
                    title: projectTitle, 
                    description: projectDescription
                }, 
                headers: {
                    Authorization: "Bearer " + token
                }});
            data && setData([
                ...data,
                response.data
            ]);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Project succesfully added",
                    isSuccess: true
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false)
            }, 1000);
        } catch (error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed adding project",
                    isSuccess: false
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }


    }

    const handleRemove = async (entry: {[key: string]: string}, event: React.MouseEvent) => {
        try {
            const response = await axios({method: "DELETE", url: projectsURL + entry.id + "/", headers: {Authorization: "Bearer " + token}});
            console.log(response);
            setData(data?.filter((m: {[key: string]: string}) => m.id != entry.id));
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Project successfully removed",
                    isSuccess: true
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        } catch(error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed removing project",
                    isSuccess: false
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);

        }
        event.preventDefault();
    }

    const projectCreationProps: ProjectCreationComponentProps = {
        submitHandler: handleSubmit,
    }


    const projectCreationModalProps: ModalComponentProps = {
        type: "button",
        buttonTitle: "Add project",
        dialogTitle: "Add project",
        children: <ProjectCreation {...projectCreationProps}/>

    }


    return (
        <SectionContainer title="Browse Projects">
            <div className="flex items-end justify-end">
                <div className="mr-2">
                    <Modal {...projectCreationModalProps} />
                </div>

            </div>
            <TableContainer data={data} twHeight="max-h-[60vh]">
                <thead className="bg-gray-50 sticky top-0">
                    <tr className="hover:bg-gray-50">
                    {HEADINGS.map((heading: string) => (
                        <th className="px-1 sm:px-6 py-4 font-medium text-gray-900">{heading}</th>
                    ))}
                    </tr>
                </thead>
                <tbody className="border-t divide-y">
                    {data != undefined && data.map((entry: {[key: string]: string}, index: number) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                            <td className="px-1 sm:px-6 py-4">{index}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.user}</td>
                            <td className="px-1 sm:px-6 py-4"><Link to={`/my-environment/workspace/projects/${entry.id}/`}>{entry.title}</Link></td>
                            <td className="px-1 sm:px-6 py-4 space-x-4">
                                <Modal type="fontAwesome" dialogTitle="Edit project" icon={faEdit}>
                                    <ProjectEdit id={entry.id} projectsURL={projectsURL} data={data} setData={setData}/>
                                </Modal>
                                <ConfirmModal dialogTitle="Apply changes">
                                    <ConfirmationDialog handleRemove={(event: React.MouseEvent) => handleRemove(entry, event)} />
                                </ConfirmModal>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <>
                        <ShowSadFaceIfDataNotExists data={data} />
                </>

                
            </TableContainer>
        </SectionContainer>
    )
}

export default Projects;