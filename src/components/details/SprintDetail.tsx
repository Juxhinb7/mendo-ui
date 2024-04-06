import { useParams } from "react-router-dom";
import SectionContainer from "../containers/SectionContainer"
import TextInfoContainer from "../containers/TextInfoContainer";
import DescriptionBox from "../elements/DescriptionBox";
import CommentSection from "../widgets/CommentSection";
import DetailContainer from "../containers/DetailContainer";
import useFetchData from "../../hooks/useFetchData";
import useToken from "../../hooks/useToken";

const SprintDetail: React.FC = (): JSX.Element => {
    const { id } = useParams();
    const { token } = useToken();
    const URL = `https://starfish-app-hso4j.ondigitalocean.app/project_management/sprints/${id}`;
    const {fetchedData, fetchData} = useFetchData(URL, token);
    fetchData()

    return (
        <SectionContainer title={fetchedData.title} twHeight="max-content">
            <DetailContainer>
                <TextInfoContainer>
                    <DescriptionBox title="Description" value=""/>
                    <CommentSection comments={[]}/>
                </TextInfoContainer>
            </DetailContainer>
        </SectionContainer>
    )
}

export default SprintDetail;