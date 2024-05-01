import DescriptionBoxComponentProps from "../../interfaces/descriptionBoxes/DescriptionBoxComponentProps";

const DescriptionBox: React.FC<DescriptionBoxComponentProps> = (props): JSX.Element => {
    return (
        <div>
            <div className="flex flex-row justify-between mt-20">
                {props.title && <h1 className="text-xl font-medium sm:text-2xl text-gray-600 flex">{props.title}</h1>}
            </div>

            <p className="ql-editor border shadow-md mt-4 rounded-lg 2xl:w-[50rem] md:w-[30rem] h-96 resize-none text-left pt-2 mb-2">
                <div dangerouslySetInnerHTML={{__html: props.value}} />
            </p>
        </div>
    )
}

export default DescriptionBox;