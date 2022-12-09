import Place from '../models/place.js';


export const getPlaces = async (req, res) => {
    try {
        const allPlaces = await Place.find();
        res.status(200).json(allPlaces);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}


export const createPlace = (req, res) => {
    const place = new Place({
        _id: req.body._id,
        name: req.body.name,
        category: req.body.category,
        location: req.body.location,
        price: req.body.price,
        menu: req.body.menu,
        tags: req.body.tags
    })
    place.save((err, doc) => {
        if(err){
            res.status(400);
        } 
        res.status(201).json("Created successfully!");
    });
}
