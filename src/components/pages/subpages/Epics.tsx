import { useEffect, useState } from "react";
import SectionContainer from "../../containers/SectionContainer"
import TableContainer from "../../containers/TableContainer"
import Modal from "../../elements/Modal";
import useToken from "../../../hooks/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";
import EpicCreation from "../../widgets/crudForms/EpicCreation";
import { EpicDescriptionReadOnlyAtom, EpicEndDateReadOnlyAtom, EpicEstimateReadOnlyAtom, EpicHashtagIdReadOnlyAtom, EpicPriorityReadOnlyAtom, EpicProjectIdReadOnlyAtom, EpicStartDateReadOnlyAtom, EpicStatusReadOnlyAtom, EpicTitleReadOnlyAtom } from "../../stores/EpicDetailStore";
import { useAtomValue } from "jotai";
import { Priority, Status } from "../../../types/issueTypes";

const Epics: React.FC = (): JSX.Element => {
    const epicsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/epics/";
    const HEADINGS = ["#", "User", "Epic Title", "Start Date", "End Date", "Status", "Priority", "Estimate", "Action"]
    const {token} = useToken();
    const [data, setData] = useState<{[key: string]: string}[] | undefined>();
    const epicTitle = useAtomValue(EpicTitleReadOnlyAtom);
    const epicDescription = useAtomValue(EpicDescriptionReadOnlyAtom);
    const epicStartDate = useAtomValue(EpicStartDateReadOnlyAtom);
    const epicEndDate = useAtomValue(EpicEndDateReadOnlyAtom);
    const epicStatus = useAtomValue(EpicStatusReadOnlyAtom);
    const epicPriority = useAtomValue(EpicPriorityReadOnlyAtom);
    const epicEstimate = useAtomValue(EpicEstimateReadOnlyAtom);
    const epicHashtagId = useAtomValue(EpicHashtagIdReadOnlyAtom);
    const epicProjectId = useAtomValue(EpicProjectIdReadOnlyAtom);

    const status: Status = {
        1: "To Do",
        2: "In Progress",
        3: "Done"
    }

    const priority: Priority = {
        1: "Low",
        2: "Medium",
        3: "High"
    }
    
    useEffect(() => {
        axios({
            method: "GET",
            url: epicsUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            setData(response.data);
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                data: {
                    title: epicTitle,
                    description: epicDescription,
                    start_date: epicStartDate,
                    end_date: epicEndDate,
                    status: epicStatus,
                    priority: epicPriority,
                    estimate: epicEstimate,
                    hashtag: epicHashtagId,
                    project: epicProjectId
                },
                url: epicsUrl,
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            data && setData([
                ...data,
                response.data
            ]);
        } catch(error: unknown) {
            console.log(error);
        }
    }
    

    const epicsCreationModalProps = {
        type: "button",
        buttonTitle: "Add Epic",
        dialogTitle: "Add Epic",
        children: <EpicCreation submitHandler={handleSubmit}/>
    }
    return (
        <SectionContainer title="Browse Epics">
            <div className="flex items-end justify-end">
                <div className="mr-2">
                    <Modal {...epicsCreationModalProps}/>
                </div>
            </div>
            <TableContainer data={[]} twHeight="max-h-[60vh]">
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        {HEADINGS.map((heading: string) => (
                            <th className="px-1 sm:px-6 py-4 font-medium text-gray-900">{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="border-t divide-y">
                    {data != undefined && data.map((entry: {[key: string]: string}, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-1 sm:px-6 py-4">{index}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.user}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.title}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.start_date.replace("T", " ")}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.end_date.replace("T", " ")}</td>
                            <td className="px-1 sm:px-6 py-4">{status[Number(entry.status) as keyof Status]}</td>
                            <td className="px-1 sm:px-6 py-4">{priority[Number(entry.priority) as keyof Priority]}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.estimate}</td>
                            <td className="px-1 sm:px-6 py-4 space-x-4">

                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableContainer>
        </SectionContainer>
    )
}

export default Epics;