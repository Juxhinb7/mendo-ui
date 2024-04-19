import { HTMLInputTypeAttribute } from "react";

type TwMarginTop ="mt-2" | "mt-4" | "mt-6" | "mt-8";

interface InputComponentProps {
    marginTop?: TwMarginTop;
    type: HTMLInputTypeAttribute;
    name?: string;
    placeholder?: string;
    value?: string | number | readonly string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default InputComponentProps;