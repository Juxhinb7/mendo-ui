const TextInfoContainer = (props: any): JSX.Element => {
    return (
        <div className="justify-center items-center flex flex-col">
            {props.children}
        </div>
    )
}

export default TextInfoContainer;