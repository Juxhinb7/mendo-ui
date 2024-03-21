import { ProjectDetailStateFields } from "../fields/ProjectDetailStateFields";

interface DetailListComponentProps {
    title: string;
    headings: string[];
    setData: (value: React.SetStateAction<ProjectDetailStateFields>) => void;
    data: any;
    subData: {[key: string]: any};
    someKey: string;
    url: string;
    serverURL: string;
    serverRoute: string;
    token: string | null;
    projectId: string | undefined;

}

export default DetailListComponentProps;