type ColorName = "red" | "purple" | "blue" | "green";
type Luminance = 100 | 200 | 400 | 500 | 600 | 700 | 800 | 900;
type Color = `${ColorName}-${Luminance}`;

interface ButtonComponentProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    processing?: boolean | undefined;
    title?: string;
    type: "button" | "submit" | "reset" | undefined;
    customColor?: `bg-${Color}`;
    hoverCustomColor?: `hover:bg-${Color}`;
}

export default ButtonComponentProps;