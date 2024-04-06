interface ButtonComponentProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    processing?: boolean | undefined;
    title?: string;
    type: "button" | "submit" | "reset" | undefined;
}

export default ButtonComponentProps;