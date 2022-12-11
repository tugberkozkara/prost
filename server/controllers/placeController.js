import Place from '../models/place.js';


export const getPlaces = async (request, response) => {
    try {
        const allPlaces = await Place.find();
        response.status(200).json(allPlaces);
    } catch (error) {
        response.status(404).json({
            message: error.message,
        })
    }
}


export const createPlace = (request, response) => {
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
        place.save();
    } catch (error) {
        console.log(error)
        response.status(400).json({
            message: error.message,
        })
    }
    response.status(201).json("Created successfully!");
}
