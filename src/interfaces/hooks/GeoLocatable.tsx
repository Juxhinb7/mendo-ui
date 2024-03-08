interface GeoLocatable {
    userLocation: {[key: string] : number};
    getUserLocation: () => void;
    error: string | undefined;
}

export default GeoLocatable;