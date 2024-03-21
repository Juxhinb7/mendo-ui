import { useParams } from "react-router-dom";
import SectionContainer from "../containers/SectionContainer";
import useToken from "../../hooks/useToken";
import useFetchData from "../../hooks/useFetchData";

const HashtagDetail: React.FC = (): JSX.Element => {
    const {id} = useParams();
    const {token} = useToken();
    const url = `http://127.0.0.1:8000/project_management/hashtags/${id}`;
    const {fetchedData, fetchData} = useFetchData(url, token);
    fetchData();

    return (
        <SectionContainer title={(fetchedData as any)?.title} twHeight="max-content">
            <h1>Hello</h1>
        </SectionContainer>
    )
}

export default HashtagDetail;