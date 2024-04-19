interface HashtagEditComponentProps {
    id: string;
    hashtagsUrl: string;
    data: {[key: string]: string}[] | undefined;
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}[] | undefined>>;
}

export default HashtagEditComponentProps;