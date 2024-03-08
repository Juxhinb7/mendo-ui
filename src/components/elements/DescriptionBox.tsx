import DescriptionBoxComponentProps from "../../interfaces/descriptionBoxes/DescriptionBoxComponentProps";

const DescriptionBox: React.FC<DescriptionBoxComponentProps> = (props): JSX.Element => {
    return (
        <div>
            <h1 className="text-xl font-medium sm:text-2xl text-gray-600 flex">{props.title}</h1>
            <p className="2xl:w-[60rem] md:w-[40rem] border h-96 resize-none mt-2 text-left">
                {props.description}
            </p>

        </div>
    )
}

export default DescriptionBox;