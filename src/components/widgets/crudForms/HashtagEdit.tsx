import { useEffect, useState } from "react"
import Form from "../../elements/Form"
import axios, { AxiosError, AxiosResponse } from "axios";
import HashtagEditComponentProps from "../../../interfaces/widgets/HashtagEditComponentProps";
import useToken from "../../../hooks/useToken";
import { useAtom, useSetAtom } from "jotai";
import { HashtagTitleAtom, ProjectIdAtom } from "../../stores/HashtagDetailStore";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import { EventNotificationAtom } from "../../stores/EventNotificationStore";
import { ToggleAtom } from "../../stores/ToggleStore";

const HashtagEdit: React.FC<HashtagEditComponentProps> = (props) => {
    const [hashtagTitle, setHashtagTitle] = useAtom(HashtagTitleAtom);
    const [projectId, setProjectId] = useAtom(ProjectIdAtom);
    const projectsURL = "https://starfish-app-hso4j.ondigitalocean.app/project_management/projects/";
    const [projectsData, setProjectsData] = useState<{[key: string]: string}[]>();
    const setEventNotification = useSetAtom(EventNotificationAtom);
    const setToggle = useSetAtom(ToggleAtom);


    const {token} = useToken()

    useEffect(() => {
        axios({method: "GET", url: props.hashtagsUrl + props.id + "/", headers: {Authorization: "Bearer " + token}})
            .then(res => {
                setHashtagTitle(res.data.title);
                setProjectId(res.data.project);

            }).catch((error: AxiosError) => {
                console.log(error.response);
            })
    }, [props.hashtagsUrl, props.id, setHashtagTitle, setProjectId, token]);

    useEffect(() => {
        axios({method: "GET", url: projectsURL, headers: {Authorization: "Bearer " + token}})
            .then((response: AxiosResponse) => {
                setProjectsData(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [token])

    const handleEdit = (event: React.FormEvent) => {
        event.preventDefault();
        axios({
            method: "PUT",
            url: props.hashtagsUrl + props.id + "/",
            data: {
                title: hashtagTitle,
                project: projectId
            },
            headers: {
                Authorization: "Bearer " + token
            }

        }).then((response: AxiosResponse) => {
            console.log(response.data);
            props.setData && props.setData(
                props.data && props.data.map((entry: {[key: string]: string}) => {
                    if (entry.id == props.id) {
                        return {...entry, id: props.id, title: response.data.title, project: response.data.project}
                    } else {
                        return entry
                    }
                })
            
            );
            setEventNotification((prevState) => {
                return {
                    ...prevState,
                    text: "Hashtag successfully updated",
                    isSuccess: true
                }
            });
            setToggle(true);
            setTimeout(() => {
                setToggle(false);
            }, 1000);



        }).catch((error: AxiosError) => {
            console.log(error.response);
        })

    }

    return (
        <Form withoutStyle={true} submitHandler={handleEdit} method="PUT">
            <div>
                <Input type="text" placeholder="Title" value={hashtagTitle} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHashtagTitle(event.target.value)} />
            </div>
            <div className="mt-4">
                <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setProjectId(event.target.value)}>
                <>
                <option selected disabled>Select a Hashtag</option>
                    {projectsData?.map((entry: {[key: string]: string}) => (
                        <option key={entry.id} value={entry.id}>{entry.title}</option>
                    ))}
                </>
                </select>


            </div>
            <div className="mt-4">
                <Button type="submit" title="Save" />
            </div>
        </Form>
    )
}

export default HashtagEdit;