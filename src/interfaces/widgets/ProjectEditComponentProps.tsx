interface ProjectEditComponentProps {
    id: string;
    projectsURL: string;
    token: string | null;
    title: string;
    description: string;
    data: {[key: string]: string}[];
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}[]>>;
    
}

export default ProjectEditComponentProps;