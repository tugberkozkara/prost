import { isValidObjectId } from "mongoose";

export default class PlaceHandler{
    
    static placeIdHandler = (request, response, next) => {
        if(!isValidObjectId(request.params.id)){
            return response.status(404).json({
                message: "Not found!",
            });
        }
        next();
    };
}
