import { useState } from "react"
import GeoLocatable from "../interfaces/hooks/GeoLocatable";
import { useSetAtom } from "jotai";
import { errorAtom } from "../components/stores/GeoStore";

const useGeoLocation = (): GeoLocatable => {
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

    return {
        userLocation,
        getUserLocation,
    }
}

export default useGeoLocation;