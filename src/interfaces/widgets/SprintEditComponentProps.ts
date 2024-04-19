interface SprintEditComponentProps {
    id: string;
    sprintsUrl: string;
    data: {[key: string]: string}[] | undefined;
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}[] | undefined>>;

}

export default SprintEditComponentProps;