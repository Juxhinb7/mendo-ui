import { Menu } from "@headlessui/react"
import { DropdownContainerComponentProps, DropdownItemContainerComponentProps, DropdownMenuItemComponentProps } from "../../interfaces/dropdowns/dropdowns"
import { Link } from "react-router-dom"

export const DropdownContainer: React.FC<DropdownContainerComponentProps> = (props): JSX.Element => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            {props.children}
        </Menu>
    )
}

export const DropdownItemContainer: React.FC<DropdownItemContainerComponentProps> = (props): JSX.Element => {
    return (
        <Menu.Items className="z-50 absolute mt-2 right-0 w-36 sm:w-56 divide-y divide-gray-100 origin-top-right bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {props.children}
        </Menu.Items>
    )
}

export const DropdownItem: React.FC<DropdownMenuItemComponentProps> = (props): JSX.Element => {
    return (
        <Menu.Item>
            <div className="px-1 py-1 hover:bg-gray-50">
                <Link className="w-full flex ml-2" to={props.url}>{props.title}</Link>
            </div>
        </Menu.Item>
    )
}