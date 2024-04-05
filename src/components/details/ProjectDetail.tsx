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
import DetailListComponentProps from "../../interfaces/detailLists/DetailListComponentProps";
import DescriptionBoxComponentProps from "../../interfaces/descriptionBoxes/DescriptionBoxComponentProps";

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

    const serverURL = "https://starfish-app-hso4j.ondigitalocean.app/project_management";

    const HEADINGS = ["Id", "Title", "Action"];

    useEffect(() => {
        axios({
            method: "GET",
            url: serverURL + `/projects/${id}/`,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response: AxiosResponse) => {
            console.log(response.data);
            setData((prevData: ProjectDetailStateFields) => {
                return {
                    ...prevData,
                    ...response.data
                }
            })
            
        })
        .catch((error: AxiosError) => {
            console.log(error.response);
        })
    }, [id, token]);


    const sectionContainerProps = {
        title: data.title,
        twHeight: "max-content"
    }


    const descriptionBoxProps: DescriptionBoxComponentProps = {
        title: "Description",
        value: data.description
    }

    const commentSectionProps = {
        comments: data.comments
    }

    const hashtagsDetailListProps: DetailListComponentProps = {
        headings: HEADINGS,
        title: "Hashtags",
        setData,
        data,
        subData: data.hashtags,
        someKey: "hashtags",
        url: "/my-environment/projects/hashtags/",
        serverURL,
        serverRoute: "/hashtags/",
        token,
        projectId: id
    }

    const sprintsDetailListProps: DetailListComponentProps = {
        headings: HEADINGS,
        title: "Sprints",
        setData,
        data,
        subData: data.sprints,
        someKey: "sprints",
        url: "/my-environment/projects/sprints/",
        serverURL,
        serverRoute: "/sprints/",
        token,
        projectId: id
    }

    const epicsDetailListProps: DetailListComponentProps = {
        headings: HEADINGS,
        title: "Epics",
        setData,
        data,
        subData: data.epics,
        someKey: "epics",
        url: "/my-environment/projects/epics/",
        serverURL,
        serverRoute: "/epics/",
        token,
        projectId: id
    }



    return (
        <SectionContainer {...sectionContainerProps} >
            <DetailContainer>
                <TextInfoContainer>
                    <DescriptionBox {...descriptionBoxProps} />
                    <CommentSection {...commentSectionProps}/>
                </TextInfoContainer>  
                <div className="justify-center flex flex-col">
                    <DetailList {...hashtagsDetailListProps} />
                    <DetailList {...sprintsDetailListProps} />
                    <DetailList {...epicsDetailListProps} />
                </div>
            </DetailContainer>

        </SectionContainer>
    )
}

export default ProjectDetail;