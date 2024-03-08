import ProfileComponentProps from "../../interfaces/profiles/ProfileComponentProps";

const Profile: React.FC<ProfileComponentProps> = (props): JSX.Element => {
    return (
        <div>
            <img src={props.img} className={`${props.width} ${props.height} rounded-full mx-auto border-2 border-white shadow-md`}/>
        </div>
    )
}

export default Profile;