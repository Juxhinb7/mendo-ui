interface GeoLocatable {
    userLocation: {[key: string] : number};
    getUserLocation: () => void;
}

export default GeoLocatable;