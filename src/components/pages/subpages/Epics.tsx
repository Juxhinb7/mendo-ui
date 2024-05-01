import { useEffect, useState } from "react";
import SectionContainer from "../../containers/SectionContainer"
import TableContainer from "../../containers/TableContainer"
import Modal from "../../elements/Modal";
import useToken from "../../../hooks/useToken";
import axios, { AxiosError, AxiosResponse } from "axios";
import EpicCreation from "../../widgets/crudForms/EpicCreation";
import { EpicDescriptionReadOnlyAtom, EpicEndDateReadOnlyAtom, EpicEstimateReadOnlyAtom, EpicHashtagIdReadOnlyAtom, EpicPriorityReadOnlyAtom, EpicProjectIdReadOnlyAtom, EpicStartDateReadOnlyAtom, EpicStatusReadOnlyAtom, EpicTitleReadOnlyAtom } from "../../stores/EpicDetailStore";
import { useAtomValue, useSetAtom } from "jotai";
import { Priority, PriorityBadge, Status, StatusBadge } from "../../../types/styles/issueTypes";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../elements/ConfirmModal";
import EpicEdit from "../../widgets/crudForms/EpicEdit";
import { estimateStyle, priority, priorityStyle, status, statusStyle } from "../../../data/styles/issueData";
import ConfirmationDialog from "../../widgets/ConfirmationDialog";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";
import ShowSadFaceIfDataNotExists from "../../elements/ShowSadFaceIfDataNotExists";

const Epics: React.FC = (): JSX.Element => {
    const epicsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/epics/";
    const HEADINGS = ["User", "Epic Title", "Status", "Priority", "Estimate", "Action"]
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
    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);


    
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
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Epic successfully added",
                    isSuccess: true,
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
                    text: "Failed adding epic",
                    isSuccess: false,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }
    }

    const handleRemove = async (entryId: string, event: React.MouseEvent) => {
        try {
            const response = await axios({method: "DELETE", url: epicsUrl + entryId + "/", headers: { Authorization: "Bearer " + token}})
            console.log(response.data);
            setData(data?.filter((m: {[key: string]: string}) => m.id != entryId));
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Epic successfully removed",
                    isSuccess: true,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        } catch (error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed removing epic",
                    isSuccess: false,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }
        event.preventDefault();
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
            <TableContainer data={data} twHeight="max-h-[60vh]">
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
                            <td className="px-1 sm:px-6 py-4">
                                <p>
                                    {entry.user}
                                </p>
                            </td>
                            <td className="px-1 sm:px-6 py-4">
                                <p className="tooltip" data-tip={entry.title}>
                                    {entry.title.length > 15 ? entry.title.substring(0, 12) + "..." : entry.title}
                                </p>
                            </td>
                            <td className="px-1 sm:px-6 py-4">
                                <p className={`${statusStyle[Number(entry.status) as keyof StatusBadge]}`}>{status[Number(entry.status) as keyof Status]}</p>
                            </td>
                            <td className="px-1 sm:px-6 py-4">
                                <p className={`${priorityStyle[Number(entry.priority) as keyof PriorityBadge]}`}>
                                    {priority[Number(entry.priority) as keyof Priority]}
                                </p>
                            </td>
                            <td className="px-1 sm:px-6 py-4">
                                <p className={`${estimateStyle}`}>
                                    {entry.estimate}
                                </p>
                            </td>
                            <td className="px-1 sm:px-6 py-4 space-x-4">
                                <Modal type="fontAwesome" dialogTitle="Edit Epic" icon={faEdit}>
                                    <EpicEdit id={entry.id} epicsUrl={epicsUrl} data={data} setData={setData}/>
                                </Modal>
                                <ConfirmModal dialogTitle="Apply Changes">
                                    <ConfirmationDialog handleRemove={(event: React.MouseEvent) => handleRemove(entry.id, event)}/>
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

export default Epics;