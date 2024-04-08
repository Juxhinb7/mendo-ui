import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactElement } from "react";

interface ModalComponentProps {
    type: string;
    icon?: IconProp;
    buttonTitle?: string;
    dialogTitle?: string;
    children: ReactElement;
}

export default ModalComponentProps;