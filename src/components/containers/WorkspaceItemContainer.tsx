const WorkspaceItemContainer = (props: any) => {
    return (
        <div className="flex flex-col 2xl:flex-row  justify-around">
            {props.children}
        </div>
    )
}

export default WorkspaceItemContainer;