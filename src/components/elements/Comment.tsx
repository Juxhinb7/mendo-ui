import Profile from "./Profile";
import UserID from "./UserID";

const Comment = (props: any): JSX.Element => {
    return (
        <div className="mb-8 text-xs 2xl:text-lg">
            <div className="flex flex-row">
                <div className="mr-2">
                    <Profile img={props.profileImage} width="w-12" height="h-12"/>
                </div>

                <div className="flex flex-col">
                    <UserID name="John Doe" email="johndoe@gmail.com"/>
                    <div className="font-semibold text-gray-700 mt-2">{props.title}</div>
                    <div>{props.text}</div>
                </div>
            </div>
            
        </div>
    )
}

export default Comment;