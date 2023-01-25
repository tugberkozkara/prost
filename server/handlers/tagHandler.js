import { isValidObjectId } from "mongoose";

export default class TagHandler{
    
    static getTagHandler = (request, response, next) => {
        if(!isValidObjectId(request.params.id)){
            return response.status(404).json({
                message: "Not found!",
            });
        }
        next();
    };
}
