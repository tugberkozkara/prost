import Location from "../models/location.js";

export default class LocationService{

    static getAll = async () => {
        try {
            const locations = await Location.find();
            return locations;   
        } catch (error) {
            return null;
        }
    };

    static create = async (name) => {
        const isLocationExists = await Location.exists({name: name});
        if(isLocationExists){
            return null;
        }
        const location = new Location({
            name: name
        });
        try {
            await location.save();
            return location;
        } catch (error) {
            return null;
        }
    };

    static getLocationByArray = async (locationsString) => {
        const locationStringArray = locationsString.split(",").map(e => e.trim());
        const allLocations = await Location.find();
        const locationObjectArray = [];
    
        for (let index = 0; index < locationStringArray.length; index++) {
            let name = locationStringArray[index];
            name = name.toLowerCase();
            name = name.charAt(0).toUpperCase() + name.slice(1);
    
            if(!allLocations.some(e => e.name === name)){
                const location = new Location({ name: name });
                const newLocation = await location.save();
                locationObjectArray.push(newLocation);
            }
            else{
                const location = allLocations.find(e => e.name === name);
                locationObjectArray.push(location);
            }
        }
        return locationObjectArray;
    };

    static deleteById = async (id) => {
        try {
            await Location.findByIdAndDelete(id);
            return true;
        } catch (error) {
            return false;
        }
    };

    static isLocationHasAnotherPlaces = (id, places) => {
        if (places === null || places === undefined || places.length === 0) {
            return false;
        }
        return places.some(place => place.location.some(loc => String(loc._id) === String(id)));
    };
}
