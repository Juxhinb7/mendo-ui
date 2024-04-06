import FormComponentProps from "../../interfaces/forms/FormComponentProps";

const Form: React.FC<FormComponentProps> = (props): JSX.Element => {
    return (
        <form className={`${props.withoutStyle ? "" : "mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"}`} onSubmit={props.submitHandler} method={props.method ? props.method : "POST"}>
            <p className="text-center text-lg font-medium text-gray-600">{props.title}</p>
            {props.children}
        </form>
    )

}

export default Form;