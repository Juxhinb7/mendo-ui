import CardComponentProps from "../../interfaces/cards/CardComponentProps"

const Card: React.FC<CardComponentProps> = ({title, children}): JSX.Element => {
    return (
        <div className="mt-6 text-xl 2xl:text-2xl w-full h-[25rem] bg-white rounded-lg border-2 border-gray-200 text-gray-600">
            <h1>{title}</h1>
            {children}


        </div>
    )
}

export default Card;