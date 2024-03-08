import { useState } from "react";

const useBackground = () => {
    const getBackgroundColor = () => {
        const backgroundColor = localStorage.getItem("background");
        return backgroundColor && backgroundColor;
    }

    const [background, setBackground] = useState(getBackgroundColor());

    const saveBackground = (value?: string) => {
        value && localStorage.setItem("background", value);
        value && setBackground(value);
    }

    return {
        saveBackground,
        background
    }
}

export default useBackground;