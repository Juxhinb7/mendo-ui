import { useParams } from "react-router-dom";
import SectionContainer from "../containers/SectionContainer";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../hooks/useToken";
import { ProjectDetailStateFields } from "../../interfaces/fields/ProjectDetailStateFields";
import DetailList from "../detailLists/DetailList";
import DescriptionBox from "../elements/DescriptionBox";
import CommentSection from "../widgets/CommentSection";

const ProjectDetail = () => {
    const {id} = useParams();
    const {token} = useToken();
    const [data, setData] = useState<ProjectDetailStateFields>({
        id: "",
        user: "",
        title: "",
        description: "",
        hashtags: [],
        sprints: [],
        epics: [],
        comments: []

    });

    const HEADINGS = ["Id", "Title", "Action"];

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/project_management/projects/${id}`,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            console.log(response.data);
            setData((prevData: any) => {
                return {
                    ...prevData,
                    ...response.data
                }
            })
            
        })
        .catch((error: AxiosError) => {
            console.log(error.response);
        })
    }, []);

    const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData((prevData: any) => {
            return {
                ...prevData,
                description: event.target.value
            }
        })
    }

    return (


        <SectionContainer title={data.title} twHeight="max-content">
            <div className="flex flex-col 2xl:flex-row justify-center 2xl:space-x-12">
                <div className="justify-center items-center flex flex-col">
                    <DescriptionBox title="Description" onChange={event => changeDescription(event)} description={data.description} />
                    <CommentSection comments={data.comments}/>
                </div>  
                <div className="justify-center flex flex-col">
                    <DetailList headings={HEADINGS} title="Hashtags" data={data.hashtags} url={`/my-environment/projects/hashtags/`} />
                    <DetailList headings={HEADINGS} title="Sprints" data={data.sprints} url={`/my-environment/projects/sprints/`} />
                    <DetailList headings={HEADINGS} title="Epics"data={data.epics} url={`/my-environment/projects/epics/`} />
                </div>
            </div>

        </SectionContainer>
    )
}

export default ProjectDetail;