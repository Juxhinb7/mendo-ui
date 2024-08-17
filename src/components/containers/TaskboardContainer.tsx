import { PropsWithChildren } from "react"

const TaskboardContainer = ({children}: PropsWithChildren): JSX.Element => {
    return (
        <div className="grid 2k:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 gap-5 items-start">
            {children}
        </div>
    )
}

export default TaskboardContainer;