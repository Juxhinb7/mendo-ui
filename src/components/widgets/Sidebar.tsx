import { faChartSimple, faClipboardList, faGear, faHome} from "@fortawesome/free-solid-svg-icons";
import Person from "../../assets/thispersondoesnotexist.jpg";
import Profile from "../elements/Profile";
import Logo from "../elements/Logo";
import NavLink from "../elements/NavLink";
import { useLocation } from "react-router-dom";
import UserID from "../elements/UserID";

const Sidebar: React.FC = (): JSX.Element => {
    const NAVLINK_STYLE = "bg-gradient-to-l from-cyan-100 border-r-4 border-cyan-600 text-cyan-600";
    const location = useLocation();
    const paths = {
        homePath: "/my-environment/home",
        projectsPath: "/my-environment/projects",
        reportsPath: "/my-environment/reports",
        settingsPath: "/my-environment/settings"
    }
    return (
        <div className="flex flex-col space-y-9 mt-4 sm:mt-16 text-gray-600 font-medium">
                <Logo title="Mendo"/>
                <div>
                    <Profile width="w-24" height="h-24" img={Person} />
                    <br></br>
                    <UserID name="John Doe" email="johndoe@gmail.com"/>
                </div>

                <div className={`${location.pathname === paths.homePath ?  NAVLINK_STYLE : ""}`}>
                    <NavLink title="Home" currentPath={paths.homePath} icon={faHome}/>
                </div>
                <div className={`${location.pathname.includes("projects") ?  NAVLINK_STYLE : ""}`}>
                    <NavLink title="Projects" currentPath={paths.projectsPath} icon={faClipboardList}/>
                </div>
                <div className={`${location.pathname === paths.reportsPath ?  NAVLINK_STYLE : ""}`}>
                    <NavLink title="Reports" currentPath={paths.reportsPath} icon={faChartSimple}/>
                </div>
                <div className={`${location.pathname === paths.settingsPath ?  NAVLINK_STYLE : ""}`}>
                    <NavLink title="Settings" currentPath={paths.settingsPath} icon={faGear}/>
                </div>


        </div>
    )
}

export default Sidebar;