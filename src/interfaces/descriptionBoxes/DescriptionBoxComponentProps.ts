interface DescriptionBoxComponentProps {
    title: string;
    description: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default DescriptionBoxComponentProps;