import { useParams } from "react-router-dom";
import SectionContainer from "../containers/SectionContainer"

const SprintDetail: React.FC = (): JSX.Element => {
    const {id} = useParams();
    return (
        <SectionContainer title={id}>
            <h1>Hello</h1>
        </SectionContainer>
    )
}

export default SprintDetail;