import Place from '../models/place.js';
import Tag from '../models/tag.js';

export default class PlaceController{
    
    static getAllPlaces = async (request, response) => {
        try {
            const allPlaces = await Place.find().populate([
                {
                    path: 'createdBy',
                    select: 'username'
                },
                {
                    path: 'tags',
                    select: 'name'
                }
            ]);
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
            name: request.body.name,
            category: request.body.category,
            location: request.body.location,
            price: request.body.price,
            menu: request.body.menu,
            tags: request.body.tags,
            createdBy: request.body.createdBy
        })
        try {
            await place.save();
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                message: error.message,
            })
        }
        return response.status(201).json({
            message: "Created successfully!",
        });
    }


    static getPlace = async (request, response) => {
        const { placeId } = request.params;
        const place = await Place.findOne({_id: placeId});
        
        if(!place){
            return response.status(404).json({
                message: "Not found!",
            });
        }

        return response.status(200).json(place);
    }
}
