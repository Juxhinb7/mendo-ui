import { ReactElement } from "react";

type twHeight = "max-h-[10vh]" | "max-h-[15vh]" | "max-h-[20vh]" | "max-h-[30vh]" | "max-h-[40vh]" | "max-h-[50vh]" | "max-h-[60vh]" | "max-h-[70vh]"

interface TableContainerComponentProps {
    twHeight: twHeight;
    children: ReactElement | ReactElement[];
}

export default TableContainerComponentProps;