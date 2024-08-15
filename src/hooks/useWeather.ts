import { useCallback, useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useSetAtom } from "jotai";
import { errorAtom } from "../components/stores/GeoStore";

const useWeather = () => {
    const [weatherData, setWeatherData] = useState({});
    const [processing, setProcessing] = useState<undefined | boolean>();

    const [userLocation, setUserLocation] = useState<{[key: string]: number}>({latitude: 0, longitude: 0});

    const setError = useSetAtom(errorAtom);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const {latitude, longitude} = position.coords;
                    setUserLocation({latitude, longitude});
                }, (error: GeolocationPositionError) => {
                    setError("Error getting user location: " + error);
                }
            
            )
        } else {
            setError("Geolocation is not supported by this browser");
        }
    }

    const fetchData = useCallback((coordinates: {[key: string]: number | undefined} = {latitude: 0, longitude: 0}) => {
        setProcessing(true);
        coordinates.latitude && coordinates.longitude && axios({
            method: "GET",
            url: `https://api.brightsky.dev/current_weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`
        }).then((response: AxiosResponse) => {
            setWeatherData(response.data);
            setProcessing(false);
        }).catch((error: AxiosError) => {
            console.log(error);
            setProcessing(false);
        });

    }, [weatherData, processing]);

    useEffect(() => {
        getUserLocation();
        fetchData({latitude: userLocation.latitude, longitude: userLocation.longitude});
    }, [userLocation.latitude, userLocation.latitude]);

    return {
        weatherData,
        processing,
        userLocation,
        fetchData
    }


}

export default useWeather;