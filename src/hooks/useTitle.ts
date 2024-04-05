import { atom, useAtom } from "jotai"
import { useMemo } from "react";

const useTitle = () => {
    const titleAtom = useMemo(() => atom<string>(""), []);
    const [title, setTitle] = useAtom(titleAtom);

    return {
        title, 
        setTitle
    }
}

export default useTitle;