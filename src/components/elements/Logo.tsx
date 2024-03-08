import LogoComponentProps from "../../interfaces/logos/LogoComponentProps";

const Logo: React.FC<LogoComponentProps> = (props): JSX.Element => {
    return (
        <div>
            <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0ddbdb] to-[#14a2c9] text-4xl font-sans">{props.title}</h1>
        </div>
    )
}

export default Logo;