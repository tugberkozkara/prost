const { isValidObjectId } = require("mongoose");

class IDHandler{
    
    static getIdHandler = (request, response, next) => {
        if(!isValidObjectId(request.params.id)){
            return response.status(404).json({
                message: "Not found!",
            });
        }
        next();
    };
}

module.exports = IDHandler;
