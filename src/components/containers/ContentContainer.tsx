import { PropsWithChildren } from "react";

const ContentContainer = (props: PropsWithChildren) => {
    return (
        <div className="w-full mr-2 ml-2 xl:mr-96 xl:ml-96  lg:mr-56 lg:ml-56 mt-16 mb-8">
            {props.children}
        </div>
    )
}

export default ContentContainer;