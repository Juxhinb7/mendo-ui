import { atom, useAtom } from "jotai"
import { useMemo } from "react";

const useDescription = () => {
    const descriptionAtom = useMemo(() => atom<string>(""), []);
    const [description, setDescription] = useAtom(descriptionAtom);

    return {
        description,
        setDescription
    }
}

export default useDescription;