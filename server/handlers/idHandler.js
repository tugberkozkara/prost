import { isValidObjectId } from "mongoose";

export default class IDHandler{
    
    static getIdHandler = (request, response, next) => {
        if(!isValidObjectId(request.params.id)){
            return response.status(404).json({
                message: "Not found!",
            });
        }
        next();
    };
}
