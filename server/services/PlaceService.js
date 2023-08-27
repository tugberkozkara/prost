const Place = require("../models/place");
const AuthService = require("./AuthService");
const TagService = require("./TagService");
const LocationService = require("./LocationService");

class PlaceService{

    static getAll = async (tagParams, userParam) => {
        try {
            let allPlaces = await Place.find().populate([{
                    path: "createdBy", select: "username"
                },{
                    path: "tags", select: "name"
                },{
                    path: "location", select: "name"
                }
            ]);

            if(tagParams !== undefined){
                const tagQueryArray = tagParams.split(",").map(e => e.trim());
                let checker = (arr, target) => target.every(element => arr.includes(element));
                allPlaces = allPlaces.filter(place => checker(place.tags.map(tag => tag.name), tagQueryArray));
            }

            if(userParam !== undefined){
                allPlaces = allPlaces.filter(place => place.createdBy.username == userParam);
            }
            
            if(allPlaces.length === 0){
                return null;
            }
            return allPlaces;
        } catch (error) {
            return null;
        }
    };

    static getAllExceptOne = async (id) => {
        try {
            const places = await Place.find({_id: {$ne : id }}).populate([{
                path: "createdBy", select: "username"
            },{
                path: "tags", select: "name"
            },{
                path: "location", select: "name"
            }
        ]);
            if(places.length === 0){
                return null;
            }
            return places;
        } catch (error) {
            return null;
        }
    };


    static create = async (body, userData) => {
        const isPlaceExists = await Place.exists({name: body.name});
        if(isPlaceExists){
            return null;
        }
        const place = new Place({
            name: body.name,
            category: body.category,
            price: body.price,
            menu: body.menu,
            location: await LocationService.getLocationByArray(body.location),
            tags: await TagService.getTagsByArray(body.tags),
            createdBy: await AuthService.getUserByUsername(userData.username)
        });
        try {
            await place.save();
            return place;
        } catch (error) {
            return null;
        }
    };

    static getById = async (id) => {
        try {
            const place = await Place.findOne({_id: id}).populate([{
                path: "createdBy", select: "username"
            },{
                path: "tags", select: "name"
            },{
                path: "location", select: "name"
            }
        ]);
            return place;
        } catch (error) {
            return null;
        }
    };

    static deleteById = async (id) => {
        await PlaceService.deleteTags(id);
        await PlaceService.deleteLocations(id);
        try {
            const place = await Place.findByIdAndDelete(id);
            return place;
        } catch (error) {
            return null;
        }
    };

    static isPlaceAndUserMatch = (place, user) => {
        if (place.createdBy.username !== user.username) {
            return false;
        }
        return true;
    };

    static getTagsOfPlace = async (id) => {
        const place = await PlaceService.getById(id);
        return place.tags;
    };

    static deleteTags = async (id) => {
        const remainingPlaces = await PlaceService.getAllExceptOne(id);
        const tagsOfPlace = await PlaceService.getTagsOfPlace(id);
        tagsOfPlace.forEach(async tag => {
            if(!TagService.isTagHasAnotherPlaces(tag._id, remainingPlaces)){
                await TagService.deleteById(tag._id);
            }
        });
    };

    static getLocationsOfPlace = async (id) => {
        const place = await PlaceService.getById(id);
        return place.location;
    };

    static deleteLocations = async (id) => {
        const remainingPlaces = await PlaceService.getAllExceptOne(id);
        const locationsOfPlace = await PlaceService.getLocationsOfPlace(id);
        locationsOfPlace.forEach(async loc => {
            if(!LocationService.isLocationHasAnotherPlaces(loc._id, remainingPlaces)){
                await LocationService.deleteById(loc._id);
            }
        });
    };

}

module.exports = PlaceService;
