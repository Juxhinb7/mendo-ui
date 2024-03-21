import { useParams } from "react-router-dom"
import SectionContainer from "../containers/SectionContainer"
import useFetchData from "../../hooks/useFetchData";
import useToken from "../../hooks/useToken";
import TextInfoContainer from "../containers/TextInfoContainer";
import DescriptionBox from "../elements/DescriptionBox";
import CommentSection from "../widgets/CommentSection";
import DetailContainer from "../containers/DetailContainer";

const EpicDetail: React.FC = (): JSX.Element => {
    const { id } = useParams();
    const { token } = useToken();
    const URL = `http://127.0.0.1:8000/project_management/epics/${id}`
    const {fetchedData, fetchData} = useFetchData(URL, token);
    fetchData();
  
    return (
        <SectionContainer title={(fetchedData as any)?.title} twHeight="max-content">
            <DetailContainer>
                <TextInfoContainer>
                    <DescriptionBox title="Description" description={(fetchData as any)?.description}/>
                    <CommentSection comments={[]}/>
                </TextInfoContainer>
            </DetailContainer>
        </SectionContainer>
    )
}

export default EpicDetail;