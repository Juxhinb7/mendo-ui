import { PropsWithChildren } from "react";

const TextInfoContainer = (props: PropsWithChildren): JSX.Element => {
    return (
        <div className="justify-center items-center flex flex-col">
            {props.children}
        </div>
    )
}

export default TextInfoContainer;