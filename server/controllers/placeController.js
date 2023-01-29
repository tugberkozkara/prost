import Place from "../models/place.js";
import TagController from "./tagController.js";
import AuthController from "./authController.js";
import Tag from "../models/tag.js";

export default class PlaceController{
    
    static getAllPlaces = async (request, response) => {

        const tagParams = request.query.tag;
        const userParam = request.query.user;

        try {
            let allPlaces = await Place.find().populate([
                {
                    path: "createdBy",
                    select: "username"
                },
                {
                    path: "tags",
                    select: "name"
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
                return response.status(404).json({
                    message: "Not found!",
                });
            }
            return response.status(200).json(allPlaces);
        } catch (error) {
            return response.status(404).json({
                message: error.message,
            });
        }
    };

    static createPlace = async (request, response) => {
        const isPlaceExists = await Place.exists({name:request.body.name});
        if(isPlaceExists){
            return response.status(400).json({
                message: "Place already exists!",
            });
        }

        const userData = request.userData;

        const place = new Place({
            name: request.body.name,
            category: request.body.category,
            location: request.body.location,
            price: request.body.price,
            menu: request.body.menu,
            tags: await TagController.getTagsByArray(request.body.tags),
            createdBy: await AuthController.getUserByUsername(userData.username)
        });
        try {
            await place.save();
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
        return response.status(201).json({
            message: "Created successfully!",
        });
    };


    static getPlaceById = async (request, response) => {
        const { id } = request.params;
        const place = await Place.findOne({_id: id});
        
        if(!place){
            return response.status(404).json({
                message: "Not found!",
            });
        }
        return response.status(200).json(place);
    };

    static deletePlaceById = async (request, response) => {
        const { id } = request.params;
        let places = await Place.find({_id: {$ne : id }}).populate("tags");

        const tagsOfPlace = await TagController.getTagsOfPlaceByPlaceId(id);
        tagsOfPlace.forEach(async tag => {
            if(!TagController.isTagHasAnotherPlaces(tag._id, places)){
                await Tag.findByIdAndDelete(tag._id);
            }
        });
        try {
            await Place.findByIdAndDelete(id);
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
        return response.status(200).json({
                message: "Deleted successfully!",
            });
    };

}
