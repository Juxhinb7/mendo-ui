import { ReactElement } from "react";


export interface DropdownMenuItemComponentProps {
    title: string;
    url: string;
}

export interface DropdownItemContainerComponentProps {
    children: ReactElement<DropdownMenuItemComponentProps> | ReactElement<DropdownMenuItemComponentProps>[];
}

export interface DropdownContainerComponentProps {
    children: ReactElement<DropdownItemContainerComponentProps> | ReactElement<DropdownItemContainerComponentProps>[];
}