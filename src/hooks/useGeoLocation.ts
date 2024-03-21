import { useState } from "react"
import GeoLocatable from "../interfaces/hooks/GeoLocatable";

const useGeoLocation = (): GeoLocatable => {
    const [userLocation, setUserLocation] = useState<{[key: string]: number}>({latitude: 0, longitude: 0});
    const [error, setError] = useState<string>("");

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
        error
    }
}

export default useGeoLocation;