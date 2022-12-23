import Place from '../models/place.js';

export default class PlaceController{
    
    static getAllPlaces = async (request, response) => {

        const tagParams = request.query.tags;
        const userParam = request.query.user;

        try {
            let allPlaces = await Place.find().populate([
                {
                    path: 'createdBy',
                    select: 'username'
                },
                {
                    path: 'tags',
                    select: 'name'
                }
            ]);

            if(tagParams !== undefined){
                const tagQueryArray = tagParams.split(',').map(e => e.trim());
                let checker = (arr, target) => target.every(element => arr.includes(element));
                allPlaces = allPlaces.filter(place => checker(place.tags.map(tag => tag.name), tagQueryArray));
            }

            if(userParam !== undefined){
                allPlaces = allPlaces.filter(place => place.createdBy.username == userParam);
            }
            
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


    static getPlaceById = async (request, response) => {
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
