import { ReactNode } from "react"

interface FormComponentProps {
    title?: string;
    submitHandler: ((event: React.FormEvent, entry?: {[key: string]: string}) => Promise<void>) | ((event: React.FormEvent, entry?: {[key: string]: string}) => void);
    children: ReactNode;
    withoutStyle?: boolean;
    method?: string
}

export default FormComponentProps;