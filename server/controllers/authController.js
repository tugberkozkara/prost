import AuthService from "../services/AuthService.js";

export default class AuthController {

    static getAllUsers = async (request, response) => {
        const allUsers = await AuthService.getAllUsers();
        if(allUsers === null){
            return response.status(404).json({
                message: "No users found!",
            });
        }
        return response.status(200).json(allUsers);
    };

    static createUser = async (request, response) => {
        const {email, username, password} = request.body;
        const user = await AuthService.register(email, username, password);
        if(user === null){
            return response.status(400).json({
                message: "User already exists!",
            });
        }
        const token = AuthService.createToken(user.username, user.password);
        return response.status(201).json({
            message: "Register Successful!",
            token: token
        });
    };

    static loginUser = async (request, response) => {
        const {username, password} = request.body;
        const token = await AuthService.login(username, password);
        if(token === null){
            return response.status(401).json({
                message: "Username or password is incorrect!",
            });
        }
        return response.status(200).json({
            message: "Login Successful!",
            token: token
        });
    };

}
