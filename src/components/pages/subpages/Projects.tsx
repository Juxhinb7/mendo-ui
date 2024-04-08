import { useEffect, useState } from "react";
import TableContainer from "../../containers/TableContainer";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../hooks/useToken";
import { Link } from "react-router-dom";
import SectionContainer from "../../containers/SectionContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../elements/Modal";
import ProjectCreation from "../../widgets/ProjectCreation";
import ProjectEdit from "../../widgets/ProjectEdit";
import ModalComponentProps from "../../../interfaces/modals/ModalComponentProps";
import ProjectCreationComponentProps from "../../../interfaces/widgets/ProjectCreationComponentProps";

const Projects: React.FC = (): JSX.Element => {
    const projectsURL = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";
    const [data, setData] = useState<{[key: string]: string}[]>([]);

    const HEADINGS = ["Id", "User", "Project Title", "Action"];
    const {token} = useToken();
    const [projectTitle, setProjectTitle] = useState<string>("");
    const [projectDescription, setProjectDescription] = useState<string>("");

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
            const response: AxiosResponse = await axios({method: "POST", url: projectsURL, data: {title: projectTitle, description: projectDescription}, headers: {Authorization: "Bearer " + token}});
            setData([
                ...data,
                response.data
            ]);
        } catch (error: unknown) {
            console.log(error);
        }


    }

    const handleRemove = async (entry: {[key: string]: string}, event: React.MouseEvent) => {
        const response = await axios({method: "DELETE", url: projectsURL + entry.id + "/", headers: {Authorization: "Bearer " + token}});
        console.log(response);
        setData(
            data?.filter((m: {[key: string]: string}) => m.id != entry.id)
        );
        event.preventDefault();
    }

    const projectCreationProps: ProjectCreationComponentProps = {
        submitHandler: handleSubmit,
        setTitle: setProjectTitle,
        setDescription: setProjectDescription
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
            <TableContainer twHeight="max-h-[60vh]">
                <thead className="bg-gray-50 sticky top-0">
                    <tr className="hover:bg-gray-50">
                    {HEADINGS.map((heading: string) => (
                        <th className="px-1 sm:px-6 py-4 font-medium text-gray-900">{heading}</th>
                    ))}
                    </tr>
                </thead>
                <tbody className="border-t divide-y">
                    {data != undefined && data.map((entry: {[key: string]: string}) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                            <td className="px-1 sm:px-6 py-4">{entry.id}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.user}</td>
                            <td className="px-1 sm:px-6 py-4"><Link to={`/my-environment/projects/${entry.id}/`}>{entry.title}</Link></td>
                            <td className="px-1 sm:px-6 py-4 space-x-4">
                                <Modal type="fontAwesome" dialogTitle="Edit project" icon={faEdit}>
                                    <ProjectEdit id={entry.id} projectsURL={projectsURL} token={token} title={projectTitle} description={projectDescription} setDescription={setProjectDescription} setTitle={setProjectTitle} data={data} setData={setData}/>
                                </Modal>
                                <FontAwesomeIcon icon={faTrash} className=" text-red-600 cursor-pointer" onClick={(event: React.MouseEvent) => handleRemove(entry, event)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableContainer>
        </SectionContainer>
    )
}

export default Projects;