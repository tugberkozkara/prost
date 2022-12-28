import bcrypt from 'bcrypt';
import User from '../models/user.js';

export default class AuthController{

    static getAllUsers = async (request, response) => {
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
        const {email, username, password} = request.body;
        const isUserExists = await User.exists({email: email});
        if(isUserExists){
            return response.status(400).json({
                message: "Email already registered!",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const lastLoginDate = Date.now();
        const user = new User({
            email: email,
            username: username,
            password: hashedPassword,
            lastLoginDate: lastLoginDate
        })

        try {
            await user.save();
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            })
        }
        return response.status(201).json({
            user: user,
            message: "Created successfully!",
        });
    }


    static loginUser = async (request, response) => {
        const {username, password} = request.body;
        const user = await User.findOne({username: username});
        if(!user){
            return response.status(401).json({
                message: "Username or password is incorrect!",
            });
        }

        const isPasswordTrue = await bcrypt.compare(password, user.password);
        if(!isPasswordTrue){
            return response.status(401).json({
                message: "Username or password is incorrect!",
            });
        }

        const lastLoginDate = Date.now();

        try {
            await user.updateOne({lastLoginDate: lastLoginDate});
        } catch (error) {
            console.log(error.message);
        }

        return response.status(200).json({
            user: user,
            message: "Login Successful!",
        });
    }

}
