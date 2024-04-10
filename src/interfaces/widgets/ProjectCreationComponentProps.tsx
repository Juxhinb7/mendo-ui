interface ProjectCreationComponentProps {
    submitHandler: (event: React.FormEvent<Element>, entry?: {[key: string]: string}) => Promise<void>;
}

export default ProjectCreationComponentProps;