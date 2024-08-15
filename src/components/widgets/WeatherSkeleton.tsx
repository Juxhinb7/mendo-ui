const WeatherSkeleton = () => {
    return (
        <div className="flex items-center gap-4">
            <div className="skeleton h-28 w-28 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-64"></div>
                <div className="skeleton h-4 w-64"></div>
                <div className="skeleton h-4 w-64"></div>
                <div className="skeleton h-4 w-64"></div>
            </div>
        </div>
    )
}

export default WeatherSkeleton;