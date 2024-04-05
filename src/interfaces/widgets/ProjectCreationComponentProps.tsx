interface ProjectCreationComponentProps {
    submitHandler: (event: React.FormEvent<Element>, entry?: {[key: string]: string}) => Promise<void>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default ProjectCreationComponentProps;