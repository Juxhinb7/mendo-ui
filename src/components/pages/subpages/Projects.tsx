import { useEffect, useState } from "react";
import TableContainer from "../../containers/TableContainer";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../hooks/useToken";
import { Link } from "react-router-dom";
import SectionContainer from "../../containers/SectionContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash } from "@fortawesome/free-solid-svg-icons";

const Projects: React.FC = (): JSX.Element => {
    const [data, setData] = useState<{[key: string]: string}[]>();

    const HEADINGS = ["Id", "User", "Project Title", "Action"];
    const {token} = useToken();

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/project_management/projects/",
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
    }, []);
    return (
        <SectionContainer title="Browse Projects">
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
                                <FontAwesomeIcon icon={faTrash} className=" text-red-600 cursor-pointer"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableContainer>
        </SectionContainer>
    )
}

export default Projects;