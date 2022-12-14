import { isValidObjectId } from 'mongoose';
import ResponseHandler from './responseHandler.js';

export default class PlaceHandler{
    
    static getPlaceHandler = (request, response, next) => {
        if(!isValidObjectId(request.params.placeId)){
            return ResponseHandler.NotFound(request, response);
        }
        next();
    }
}
