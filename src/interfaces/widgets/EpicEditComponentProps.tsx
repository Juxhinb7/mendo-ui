interface EpicEditComponentProps {
    id: string;
    epicsUrl: string;
    data: {[key: string]: string}[] | undefined;
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}[] | undefined>>;
}

export default EpicEditComponentProps;