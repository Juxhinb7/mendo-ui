import { useParams } from "react-router-dom";
import SectionContainer from "../containers/SectionContainer";
import useToken from "../../hooks/useToken";
import useFetchData from "../../hooks/useFetchData";

const HashtagDetail: React.FC = (): JSX.Element => {
    const {id} = useParams();
    const {token} = useToken();
    const url = `https://starfish-app-hso4j.ondigitalocean.app/project_management/hashtags/${id}`;
    const {fetchedData, fetchData} = useFetchData(url, token);
    fetchData();

    return (
        <SectionContainer title={fetchedData.title} twHeight="max-content">
            <h1>Hello</h1>
        </SectionContainer>
    )
}

export default HashtagDetail;