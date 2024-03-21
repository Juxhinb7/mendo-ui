import { useParams } from "react-router-dom";
import SectionContainer from "../containers/SectionContainer";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../hooks/useToken";
import { ProjectDetailStateFields } from "../../interfaces/fields/ProjectDetailStateFields";
import DetailList from "../detailLists/DetailList";
import DescriptionBox from "../elements/DescriptionBox";
import CommentSection from "../widgets/CommentSection";
import TextInfoContainer from "../containers/TextInfoContainer";
import DetailContainer from "../containers/DetailContainer";

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
            <DetailContainer>
                <TextInfoContainer>
                    <DescriptionBox title="Description" onChange={event => changeDescription(event)} description={data.description} />
                    <CommentSection comments={data.comments}/>
                </TextInfoContainer>  
                <div className="justify-center flex flex-col">
                    <DetailList headings={HEADINGS} title="Hashtags" setData={setData} data={data} subData={data.hashtags} someKey={"hashtags"} url={`/my-environment/projects/hashtags/`} serverURL="http://127.0.0.1:8000/project_management" serverRoute="/hashtags/" token={token} projectId={id}/>
                    <DetailList headings={HEADINGS} title="Sprints" setData={setData} data={data} subData={data.sprints} someKey={"sprints"} url={`/my-environment/projects/sprints/`} serverURL="http://127.0.0.1:8000/project_management" serverRoute="/sprints/" token={token} projectId={id}/>
                    <DetailList headings={HEADINGS} title="Epics" setData={setData} data={data} subData={data.epics} someKey={"epics"} url={`/my-environment/projects/epics/`} serverURL="http://127.0.0.1:8000/project_management" serverRoute="/epics/" token={token} projectId={id}/>
                </div>
            </DetailContainer>

        </SectionContainer>
    )
}

export default ProjectDetail;