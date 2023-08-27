const jwt = require("jsonwebtoken");

class AuthHandler{

    static checkAuth = (request, response, next) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            request.userData = decodedToken;
            next();
        }catch(error) {
            return response.status(401).send({
                message: "Auth failed"
            });
        }
    };
}

module.exports = AuthHandler;
