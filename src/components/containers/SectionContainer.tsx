import SectionContainerComponentProps from "../../interfaces/containers/SectionContainerComponentProps";

const SectionContainer = ({twHeight, title, children}: SectionContainerComponentProps): JSX.Element => {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 shadow-md ${twHeight ? twHeight : ""}`}>
            <h1 className="text-xl font-medium sm:text-2xl text-gray-600">{title}</h1>
            {children}
        </div>
    )
}

export default SectionContainer;
