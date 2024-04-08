import { atom, useAtom } from "jotai";
import { useMemo} from "react";
import { useLocation } from "react-router-dom";



const useToken = () => {
    const getToken = () => {
        const userToken = localStorage.getItem("token");
        return userToken && userToken;
    }
    const location = useLocation();
    
    const tokenAtom = useMemo(() => atom(getToken()), [location.pathname]); 
    const [token, setToken] = useAtom(tokenAtom);

    const saveToken = (userToken?: string) => {
        userToken && localStorage.setItem("token", userToken);
        userToken && setToken(userToken);
    }

    const removeToken = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken
    }
}

export default useToken;