import { ReactNode } from "react"

interface FormComponentProps {
    title: string;
    submitHandler: (event: React.FormEvent) => void;
    children: ReactNode;
}

export default FormComponentProps;