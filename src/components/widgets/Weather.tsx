import { useEffect } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import useWeather from "../../hooks/useWeather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudMoon, faCloudRain, faCloudSun, faMoon, faRefresh, faSmog, faSnowflake, faSpinner, faSun } from "@fortawesome/free-solid-svg-icons";

const Weather: React.FC = (): JSX.Element => {
    const {userLocation, getUserLocation, error} = useGeoLocation();
    const {weatherData, processing, fetchData} = useWeather();

    useEffect(() => {
        getUserLocation();
        fetchData({latitude: userLocation.latitude, longitude: userLocation.longitude});
                
    }, [userLocation.latitude]);
    
    const Data = <div>
        <p>Temperature: {(weatherData as any)?.weather?.temperature}°C</p>
        <p>Cloud cover: {(weatherData as any)?.weather?.cloud_cover}%</p>
        <p>Condition: {(weatherData as any)?.weather?.condition}</p>
        <p>Relative humidity: {(weatherData as any)?.weather?.relative_humidity}%</p>
    </div>
   

    return (
        <div>
            <div className="flex justify-end">
                <FontAwesomeIcon className="mr-6 cursor-pointer p-2 hover:bg-gray-200 rounded-lg" icon={faRefresh} onClick={() => fetchData({latitude: userLocation.latitude, longitude: userLocation.longitude})}/>
            </div>
            {error ? <p>{error}</p> : (
            <div className="flex flex-row justify-evenly mt-20">
                {!processing ? (
                <>
                <div className="flex">
                    {((weatherData as any)?.weather?.icon === "cloudy" || (weatherData as any)?.weather?.icon === "sleet")  && (
                        <div className="flex flex-row text-left space-x-6">
                            <FontAwesomeIcon icon={faCloud} size="5x"/>
                            {Data}

                        </div>
                    )}
                    {(weatherData as any)?.weather?.icon === "fog" && (
                        <div className="flex flex-row text-left space-x-6">
                            <FontAwesomeIcon icon={faSmog} size="5x"/>
                            {Data}
                        </div>
                    )}
                    {(weatherData as any)?.weather?.icon === "rain" && (
                        <div className="flex flex-row text-left space-x-6">
                            <FontAwesomeIcon icon={faCloudRain} size="5x"/>
                            {Data}
                        </div>
                    )}
                    {(weatherData as any)?.weather?.icon === "clear-day" && (
                        <div className="flex flex-row text-left space-x-6">
                            <FontAwesomeIcon icon={faSun} size="5x" />
                            {Data}
                        </div>

                    )}
                    {(weatherData as any)?.weather?.icon === "snow" && (
                        <div>
                            <FontAwesomeIcon icon={faSnowflake} size="5x" />
                            {Data}
                        </div>

                    )}
                    {(weatherData as any)?.weather?.icon === "partly-cloudy-night" && (
                        <div className="flex flex-row text-left space-x-6">
                            <FontAwesomeIcon icon={faCloudMoon} size="5x"/>
                            {Data}
                        </div>
                    )}
                    {(weatherData as any)?.weather?.icon === "partly-cloudy-day" && (
                        <div className="flex flex-row text-left space-x-6">
                            <FontAwesomeIcon icon={faCloudSun} size="5x" />
                            {Data}
                        </div>

                    )}
                    {(weatherData as any)?.weather?.icon === "clear-night" && (
                        <div className="flex flex-row text-left space-x-6">
                            <FontAwesomeIcon icon={faMoon} size="5x" />
                            {Data}
                        </div>

                    )}
                </div>                  
                </>
                ) : <FontAwesomeIcon icon={faSpinner} className="text-cyan-600" spin size="5x"/>}
            </div>
            )}
        </div>
    )
}

export default Weather;