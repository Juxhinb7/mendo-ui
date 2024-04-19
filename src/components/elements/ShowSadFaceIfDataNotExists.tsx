import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ShowSadFaceIfDataNotExistsProps = {
    data: {[key: string]: string}[] | undefined;
}

const ShowSadFaceIfDataNotExists = ({data}: ShowSadFaceIfDataNotExistsProps) => {
    return (
        <>
            {data && data.length == 0 && (
                <div className="absolute right-0 left-0 mt-4">
                    <FontAwesomeIcon className="text-gray-600" icon={faFaceSadTear} size="2xl"/>
                        <p className="">No entries were found</p>
                </div>
            )}
        </>
    )
}

export default ShowSadFaceIfDataNotExists;