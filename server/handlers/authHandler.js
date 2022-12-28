import jwt from 'jsonwebtoken';

export default class AuthHandler{

    static checkAuth = (request, response, next) => {
        /*
        JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
        try {
            const token = request.headers.authorization.split(" ")[1];
            console.log(token);
            const decodedToken = jwt.verify(token, 'secret_key');
            request.userData = decodedToken;
            next();
        }catch(error) {
            return response.status(401).send({
                message: 'Auth failed'
            });
        }
    }
}