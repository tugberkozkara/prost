const PlaceService = require("../services/PlaceService");

class PlaceController{
    
    static getAllPlaces = async (request, response) => {
        const tagParams = request.query.tag;
        const userParam = request.query.user;
        const places = await PlaceService.getAll(tagParams, userParam);
        if(places === null){
            return response.status(404).json({
                message: "No places found!",
            });
        }
        return response.status(200).json(places);
    };

    static createPlace = async (request, response) => {
        const place = await PlaceService.create(request.body, request.userData);
        if(place === null){
            return response.status(400).json({
                message: "Place already exists!",
            });
        }
        return response.status(201).json({
            message: "Created successfully!",
            place: place
        });
    };


    static getPlaceById = async (request, response) => {
        const { id } = request.params;
        const place = await PlaceService.getById(id);
        if(place === null){
            return response.status(404).json({
                message: "Not found!",
            });
        }
        return response.status(200).json(place);
    };

    static deletePlaceById = async (request, response) => {
        const { id } = request.params;
        const place = await PlaceService.getById(id);
        if (place === null) {
            return response.status(404).json({
                message: "Not found!",
            });
        }
        const isPlaceAndUserMatch = PlaceService.isPlaceAndUserMatch(place, request.userData);
        if (!isPlaceAndUserMatch) {
            return response.status(401).json({
                message: "Unauthorized!",
            });
        }
        try {
            const deletedPlace = await PlaceService.deleteById(id);
            return response.status(200).json({
                message: "Deleted successfully!",
                place: deletedPlace
            });
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    };

}

module.exports = PlaceController;
