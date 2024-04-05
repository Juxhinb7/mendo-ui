import { ReactNode } from "react"

interface FormComponentProps {
    title?: string;
    submitHandler: (event: React.FormEvent, entry?: {[key: string]: string}) => Promise<void>;
    children: ReactNode;
    withoutStyle?: boolean;
    method?: string
}

export default FormComponentProps;