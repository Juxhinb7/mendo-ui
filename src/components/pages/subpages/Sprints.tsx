import SectionContainer from "../../containers/SectionContainer"
import TableContainer from "../../containers/TableContainer";
import Modal from "../../elements/Modal";
import { useEffect, useState } from "react";
import ShowSadFaceIfDataNotExists from "../../elements/ShowSadFaceIfDataNotExists";
import SprintCreation from "../../widgets/crudForms/SprintCreation";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../hooks/useToken";
import { useAtomValue, useSetAtom } from "jotai";
import { ProjectIdReadOnlyAtom, SprintEndDateReadOnlyAtom, SprintGoalReadOnlyAtom, SprintStartDateReadOnlyAtom, SprintTitleReadOnlyAtom, StateIdReadOnlyAtom } from "../../stores/SprintDetailStore";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../elements/ConfirmModal";
import SprintEdit from "../../widgets/crudForms/SprintEdit";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";
import ConfirmationDialog from "../../widgets/ConfirmationDialog";
import { state, stateBadge } from "../../../data/styles/stateIssueData";
import { State, StateBadge } from "../../../types/styles/stateIssueTypes";

const Sprints = () => {
    const sprintsUrl = "https://starfish-app-hso4j.ondigitalocean.app/project_management/sprints/"
    const HEADINGS = ["User", "Sprint Title", "State", "Action"];
    const [data, setData] = useState<{[key: string]: string}[] | undefined>();
    const {token} = useToken();
    const sprintTitle = useAtomValue(SprintTitleReadOnlyAtom);
    const sprintGoal = useAtomValue(SprintGoalReadOnlyAtom);
    const sprintStartDate = useAtomValue(SprintStartDateReadOnlyAtom);
    const sprintEndDate = useAtomValue(SprintEndDateReadOnlyAtom);
    const projectId = useAtomValue(ProjectIdReadOnlyAtom);
    const stateId = useAtomValue(StateIdReadOnlyAtom);
    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);

    useEffect(() => {
        axios({
            method: "GET",
            url: sprintsUrl,
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
                    title: sprintTitle,
                    goal: sprintGoal,
                    start_date: sprintStartDate,
                    end_date: sprintEndDate,
                    project: projectId,
                    state: stateId
                },
                url: sprintsUrl,
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            data && setData([
                ...data,
                response.data
            ]);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Sprint succesfully added",
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
                    text: "Failed adding sprint",
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
            const response = await axios({method: "DELETE", url: sprintsUrl + entryId + "/", headers: { Authorization: "Bearer " + token }});
            console.log(response.data);
            setData(data?.filter((m: {[key: string]: string}) => m.id != entryId));
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Sprint successfully removed",
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
                    text: "Failed removing sprint",
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

    const sprintCreationProps = {
        submitHandler: handleSubmit
    }

    const sprintCreationModalProps = {
        type: "button",
        buttonTitle: "Add Sprint",
        dialogTitle: "Add Sprint",
        children: <SprintCreation {...sprintCreationProps} />
    }

    return (
        <SectionContainer title="Browse Sprints">
            <div className="flex items-end justify-end">
                <div className="mr-2">
                    <Modal {...sprintCreationModalProps}/>
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
                                    {entry.title.length > 15 ? entry.title.substring(0, 15) + "..." : entry.title}
                                </p>
                            </td>
                            <td className="px-1 sm:px-6 py-4">
                                <p className={`${stateBadge[Number(entry.state) as keyof StateBadge]}`}>
                                    {state[Number(entry.state) as keyof State]}
                                </p>
                            </td>
                            <td className="px-1 sm:px-6 py-4 space-x-4">
                                <Modal type="fontAwesome" dialogTitle="Edit Sprint" icon={faEdit}>
                                    <SprintEdit id={entry.id} sprintsUrl={sprintsUrl} data={data} setData={setData}/>
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

export default Sprints;