import bcrypt from 'bcrypt';
import User from '../models/user.js';

export default class UserController{

    static getUsers = async (request, response) => {
        try {
            const allUsers = await User.find();
            response.status(200).json(allUsers);
        } catch (error) {
            response.status(404).json({
                message: error.message,
            })
        }
    }
    

    static createUser = async (request, response) => {

        const isUserExists = await User.exists({email: request.body.email});
        if(isUserExists){
            return response.status(400).json({
                message: "Email already registered!",
            })
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = new User({
            email: request.body.email,
            username: request.body.username,
            password: hashedPassword
        })

        try {
            await user.save();
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            })
        }
        return response.status(201).json("Created successfully!");
    }

}
