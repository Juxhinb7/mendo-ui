import FormContainerProps from "../../interfaces/forms/FormContainerProps";

const FormContainer: React.FC<FormContainerProps> = (props): JSX.Element => {
    return (
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-10rem)] flex justify-center items-center">
            <div className="mx-auto max-w-lg w-full">
                {props.children}
            </div>
        </div>
    )
}

export default FormContainer;