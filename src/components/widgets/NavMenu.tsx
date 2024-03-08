import { Menu } from "@headlessui/react";
import Burger from "../elements/Burger"
import { DropdownContainer, DropdownItem, DropdownItemContainer } from "../elements/dropdowns"

const NavMenu: React.FC = (): JSX.Element => {
    return (
        <div>
            <DropdownContainer>
                <Menu.Button>
                    <Burger />
                </Menu.Button>
                <DropdownItemContainer>
                    <div>
                        <DropdownItem title="Home" url="/my-environment/home" />
                        <DropdownItem title="Workspaces" url="/my-environment/workspaces" />
                        <DropdownItem title="Calendar" url="/my-environment/calendar" />
                        <DropdownItem title="Settings" url="/my-environment/settings" />
                    </div>

                </DropdownItemContainer>
            </DropdownContainer>
        </div>
    )
}

export default NavMenu;