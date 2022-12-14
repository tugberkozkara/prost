import Place from '../models/place.js';

export default class PlaceController{
    
    static getPlaces = async (request, response) => {
        try {
            const allPlaces = await Place.find();
            response.status(200).json(allPlaces);
        } catch (error) {
            response.status(404).json({
                message: error.message,
            })
        }
    }

    static createPlace = async (request, response) => {
        const isPlaceExists = await Place.exists({name:request.body.name});
        if(isPlaceExists){
            return response.status(400).json({
                message: "Place already exists!",
            })
        }
        const place = new Place({
            _id: request.body._id,
            name: request.body.name,
            category: request.body.category,
            location: request.body.location,
            price: request.body.price,
            menu: request.body.menu,
            tags: request.body.tags
        })
        try {
            await place.save();
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                message: error.message,
            })
        }
        return response.status(201).json("Created successfully!");
    }

}
