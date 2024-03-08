const SectionContainer = (props: any): JSX.Element => {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 shadow-md ${props.twHeight ? props.twHeight : ""}`}>
            <h1 className="text-xl font-medium sm:text-2xl text-gray-600">{props.title}</h1>
            {props.children}
        </div>
    )
}

export default SectionContainer;
