import { PropsWithChildren } from "react"

const TaskboardContainer = ({children}: PropsWithChildren): JSX.Element => {
    return (
        <div className="grid 1k:grid-cols-4 sm:grid-cols-2 gap-5 items-start">
            {children}
        </div>
    )
}

export default TaskboardContainer;