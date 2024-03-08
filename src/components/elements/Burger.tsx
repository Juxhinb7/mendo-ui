import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Burger: React.FC = (): JSX.Element => {
    return (
        <div>
            <FontAwesomeIcon icon={faBars} className="w-6 h-6 p-1 text-gray-600"/>
        </div>
    )
}

export default Burger;