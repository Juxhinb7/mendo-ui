import { useParams } from "react-router-dom";
import SectionContainer from "../containers/SectionContainer";
import { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../hooks/useToken";

const HashtagDetail: React.FC = (): JSX.Element => {
    const {id} = useParams();
    const {token} = useToken();

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/project_management/hashtags/${id}`,
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response: AxiosResponse) => {
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error.response);
        });
    }, []);

    return (
        <SectionContainer title={id} twHeight="max-content">
            <h1>Hello</h1>
        </SectionContainer>
    )
}

export default HashtagDetail;