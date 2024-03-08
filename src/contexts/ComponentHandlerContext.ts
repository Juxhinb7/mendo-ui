import { createContext } from "react";

export const ComponentHandlerContext = createContext<(React.Dispatch<React.SetStateAction<boolean | undefined>>)>(null!);