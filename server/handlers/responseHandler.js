export default class ResponseHandler{
    
    static NotFound = (request, response) => {
        return response.status(404).json({
            message: "Not found!",
        });
    }

    static Forbidden = (request, response) => {
        return response.status(403).json({
            message: "Username or password is incorrect!",
        });
    }

    static Created = (request, response) => {
        return response.status(201).json({
            message: "Created successfully!",
        });
    }

    static OK = (request, response, returnData) => {
        return response.status(200).json(returnData);
    }
}
