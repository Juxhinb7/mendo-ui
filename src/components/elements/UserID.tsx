import UserIDComponentProps from "../../interfaces/users/UserIDComponentProps"

const UserID: React.FC<UserIDComponentProps> = (props): JSX.Element => {
    return (
        <>
            <h2 className="text-md font-bold text-gray-800">{props.name}</h2>
            <h2 className="text-xs font-bold text-gray-500">{props.email}</h2>
        </>
    )
}

export default UserID;