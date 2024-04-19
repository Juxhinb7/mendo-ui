import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submittable from "../interfaces/hooks/Submittable";

const useSubmitCredentials = (url: string, 
    data: {}, setToken?: any, 
    options: {[key: string]: string} = {redirectUrl: ""}): Submittable => {
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorObject, setErrorObject] = useState(null);
    const [toggle, setToggle] = useState<undefined | boolean>();
    const [processing, setProcessing] = useState<undefined | boolean>();
    
    const navigate = useNavigate();

    const submitData = (event: React.FormEvent) => {

        setProcessing(true);
        axios({
            method: "POST",
            url: url,
            data: data
        }).then((response: AxiosResponse) => {
            setSuccessMessage(response.data?.message);
            setToggle(true);
            setProcessing(false);
            response.data.access && setToken && setToken(response.data.access);
            options.redirectUrl && navigate(options.redirectUrl, {replace: true});
        }).catch((error: any) => {
            error.response.status !== 500 && setErrorMessage((Object.values(error.response.data) as any)[0]);
            error.response.status === 500 && setErrorMessage(error.response.status);
            setErrorObject(error.response.data);
            console.log(error.response);
            setToggle(true);
            setProcessing(false);
        });
        setSuccessMessage("");
        setErrorMessage("");
        setToggle(false);
        setErrorObject(null);

        event.preventDefault();

    }

    return {
        processing,
        successMessage,
        errorMessage,
        errorObject,
        toggle,
        setProcessing,
        setToggle,
        submitData
    }

}

export default useSubmitCredentials;