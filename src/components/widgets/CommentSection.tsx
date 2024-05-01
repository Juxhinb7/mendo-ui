import Person from "../../assets/thispersondoesnotexist.jpg";
import Comment from "../elements/Comment";

const CommentSection = (props: any): JSX.Element => {
    return (
        <div>
            <h1 className="text-xl font-medium sm:text-2xl mt-20 text-gray-600 flex">Comments</h1>
            <div className="h-[22rem] overflow-scroll border rounded-lg shadow-md mt-2 mb-8">
                <p className="2xl:w-[50rem] w-[15rem] md:w-[30rem] resize-none text-left">
                    {props.comments.map((comment: {[key: string]: string}) => (
                        <Comment profileImage={Person} title={comment.title} text={comment.text} />
                    ))}
                </p>
            </div>
        </div>

    )
}

export default CommentSection;