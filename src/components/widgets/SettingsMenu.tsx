import { Menu } from "@headlessui/react"
import Profile from "../elements/Profile"
import Person from "../../assets/thispersondoesnotexist.jpeg";
import UserID from "../elements/UserID";
import { DropdownContainer, DropdownItem, DropdownItemContainer } from "../elements/dropdowns";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";

const SettingsMenu: React.FC = (): JSX.Element => {

    const {token, removeToken} = useToken();
    const navigate = useNavigate();

    const logMeOut = () => {
        axios({
            method: "POST",
            url: "https://starfish-app-hso4j.ondigitalocean.app/users/api/logout/",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response: AxiosResponse) => {
            console.log(response);
            removeToken();
            navigate("/");

        }).catch((error: AxiosError)=> {
            console.log(error); 
        }) 
    }

    return (
        <div className="z-50">
            <DropdownContainer>
                <Menu.Button>
                    <Profile img={Person} width="w-8" height="h-8"/>
                </Menu.Button>
                <DropdownItemContainer>
                    <div className="px-1 py-1">
                        <p className="ml-2">
                            <UserID name="John Doe" email="johndoe@gmail.com"/>
                        </p>
                    </div>

                    <div>
                        <DropdownItem title="Profile" url="/my-environment/profile"/>
                        <DropdownItem title="Settings" url="/my-environment/settings"/>
                    </div>

                    <div className="px-1 py-1 hover:bg-gray-50 text-red-500">
                        <Menu.Item>
                            <button onClick={logMeOut} className="w-full flex ml-2">Logout</button>
                        </Menu.Item>
                    </div>
                </DropdownItemContainer>
            </DropdownContainer>
        </div>
    )
}

export default SettingsMenu;