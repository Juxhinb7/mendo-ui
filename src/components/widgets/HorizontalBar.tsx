import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import SettingsMenu from "./SettingsMenu";
import NavMenu from "./NavMenu";

const HorizontalBar = () => {
    return (
        <div>
            <div className="mt-6 absolute left-0 right-0 2xl:hidden">
                <NavMenu />
            </div>
            <div className="flex flex-row space-x-4 justify-end mt-6 ml-8 mr-8 lg:ml-12 lg:mr-12">
                <FontAwesomeIcon icon={faBell} className="text-gray-600 p-1 w-6 h-6" />
                <SettingsMenu />
            </div>
        </div>
    )
}

export default HorizontalBar;