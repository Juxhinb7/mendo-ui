import axios, { AxiosResponse } from "axios"
import {useCallback, useEffect, useState } from "react"

const useFetchData = (url: string, token: string | null) => {
    const [fetchedData, setFetchedData] = useState<{[key: string]: string}>({});

    const fetchCallback = useCallback(async () => {
        try {
            const response: AxiosResponse = await axios({method: "GET", url: url, headers: {Authorization: "Bearer " + token}});
            setFetchedData(response.data);
        }
        catch (error: any) {
            console.log(error.response);
        }

    }, [token, url]);

    const fetchData = async () => {
        
        useEffect(() => {
            fetchCallback();
        }, []);

    }

    return {
        fetchedData,
        fetchData
    }
}

export default useFetchData;