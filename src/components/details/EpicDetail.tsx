import { useParams } from "react-router-dom"
import SectionContainer from "../containers/SectionContainer"
import { useEffect } from "react";
import axios from "axios";

const EpicDetail: React.FC = (): JSX.Element => {
    const { id } = useParams();

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/project_management/epics/${id}`
        })
    })

    return (
        <SectionContainer title={id} twHeight="max-content">
            <div className="flex flex-col">

            </div>
        </SectionContainer>
    )
}

export default EpicDetail;