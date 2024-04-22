import { useEffect, useState } from "react";
import SectionContainer from "../../containers/SectionContainer"
import TableContainer from "../../containers/TableContainer"
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../../hooks/useToken";
import ShowSadFaceIfDataNotExists from "../../elements/ShowSadFaceIfDataNotExists";
import Modal from "../../elements/Modal";
import HashtagCreation from "../../widgets/crudForms/HashtagCreation";
import { useAtomValue, useSetAtom } from "jotai";
import { HashtagTitleReadOnlyAtom, ProjectIdAtomReadOnlyAtom } from "../../stores/HashtagDetailStore";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import HashtagEdit from "../../widgets/crudForms/HashtagEdit";
import ConfirmModal from "../../elements/ConfirmModal";
import ConfirmationDialog from "../../widgets/ConfirmationDialog";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

const Hashtags = () => {
    const hashtagsURL = "https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/";
    const [data, setData] = useState<{[key: string]: string}[] | undefined>();
    const hashtagTitle = useAtomValue(HashtagTitleReadOnlyAtom);
    const projectId = useAtomValue(ProjectIdAtomReadOnlyAtom);
    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);
    const HEADINGS = ["#", "User", "Hashtag Title", "Action"];
    const {token} = useToken()

    useEffect(() => {
        axios({
            method: "GET",
            url: hashtagsURL,
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response: AxiosResponse) => {
            console.log(response.data);
            setData(response.data)
        }).catch((error: AxiosError) => {
            console.log(error);
        })
    }, [token]);

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                data: {
                    title: hashtagTitle,
                    project: projectId
                },
                url: hashtagsURL,
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            console.log(response.data);
            data && setData([
                ...data,
                response.data
            ]);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Hashtag successfully added",
                    isSuccess: true,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false)
            }, 1000);
        } catch(error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed adding hashtag",
                    isSuccess: false,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);
        }
    }
    
    const handleRemove = async(entry: {[key: string]: string}, event: React.MouseEvent) => {
        try {
            const response = await axios({method: "DELETE", url: hashtagsURL + entry.id + "/", headers: { Authorization: "Bearer " + token }});
            console.log(response.data);
            setData(data?.filter((m: {[key: string]: string}) => m.id != entry.id ));
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Hashtag successfully removed",
                    isSuccess: true,
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false)
            }, 1000);
            
        } catch(error: unknown) {
            console.log(error);
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Failed removing hashtag",
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

    const hashtagCreationProps = {
        submitHandler: handleSubmit  
    }

    const hashtagCreationModalProps = {
        type: "button",
        buttonTitle: "Add Hashtag",
        dialogTitle: "Add Hashtag",
        children: <HashtagCreation {...hashtagCreationProps}/>
    }

    return (
        <SectionContainer title="Browse Hashtags">
            <div className="flex items-end justify-end">
                <div className="mr-2">
                    <Modal {...hashtagCreationModalProps}/>
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
                    { data != undefined && data.map((entry: {[key: string]: string}, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-1 sm:px-6 py-4">{index}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.user}</td>
                            <td className="px-1 sm:px-6 py-4">{entry.title}</td>
                            <td className="px-1 sm:px-6 py-4 space-x-4">
                                <Modal type="fontAwesome" dialogTitle="Edit hashtag" icon={faEdit}>
                                    <HashtagEdit id={entry.id} hashtagsUrl={hashtagsURL} data={data} setData={setData}/>
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

export default Hashtags;