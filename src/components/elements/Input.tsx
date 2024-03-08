import InputComponentProps from "../../interfaces/inputs/InputComponentProps";

const Input: React.FC<InputComponentProps> = (props): JSX.Element => {
    return (
        <>
            <div className={`relative ${props.marginTop? props.marginTop: ""}`}>
                <input 
                    type={props.type}
                    className="focus:outline-none ring-1 ring-gray-200 w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    required
                />
            </div>
        </>
    )
}

export default Input;