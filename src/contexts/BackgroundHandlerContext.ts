import { createContext } from "react";

const setSomething = (): void => console.log("Does nothing"); 

export const BackgroundHandlerContext = createContext(setSomething);
