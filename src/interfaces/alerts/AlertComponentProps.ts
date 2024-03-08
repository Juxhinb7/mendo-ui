import { ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import StatusAlertComponentProps from "./StatusAlertComponentProps";

interface AlertComponentProps {
    alertIcon: IconProp
    customStyle: string;
    children: ReactElement<StatusAlertComponentProps>;
}

export default AlertComponentProps;