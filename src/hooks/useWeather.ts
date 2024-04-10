import { useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"

const useWeather = () => {
    const [weatherData, setWeatherData] = useState({});
    const [processing, setProcessing] = useState<undefined | boolean>();

    const fetchData = (coordinates: {[key: string]: number | undefined} = {latitude: 0, longitude: 0}) => {
        setProcessing(true);
        axios({
            method: "GET",
            url: `https://api.brightsky.dev/current_weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`
        }).then((response: AxiosResponse) => {
            setWeatherData(response.data);
            setProcessing(false);
        }).catch((error: AxiosError) => {
            console.log(error);
            setProcessing(false);
        });

    }

    return {
        weatherData,
        processing,
        fetchData
    }


}

export default useWeather;