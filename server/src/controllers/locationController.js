const LocationService = require("../services/LocationService");

class LocationController{

    static getAllLocations = async (request, response) => {
        const allLocations = await LocationService.getAll();
        if(allLocations === null){
            return response.status(404).json({
                message: "No locations found!",
            });
        }
        return response.status(200).json(allLocations);
    };

    static createLocation = async (request, response) => {
        const { name } = request.body;
        const location = await LocationService.create(name);
        if(location === null){
            return response.status(400).json({
                message: "Location already exists!",
            });
        }
        return response.status(201).json({
            location: location,
            message: "Created successfully!",
        });
    };

    static deleteLocationById = async (request, response) => {
        const { id } = request.params;
        const isDeleted = await LocationService.deleteById(id);
        if (!isDeleted) {
            return response.status(404).json({
                message: "Not found!",
            });
        }
        return response.status(200).json({
            message: "Deleted successfully!",
        });
    };
}

module.exports = LocationController;
