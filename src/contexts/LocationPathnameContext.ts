import { createContext } from "react";
import { useLocation } from "react-router-dom";

const location = useLocation();
const LocationPathnameContext = createContext(location.pathname);

export default LocationPathnameContext;