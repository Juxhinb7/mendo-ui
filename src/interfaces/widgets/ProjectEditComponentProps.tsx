interface ProjectEditComponentProps {
    id: string;
    projectsURL: string;
    data: {[key: string]: string}[];
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}[]>>;
    
}

export default ProjectEditComponentProps;