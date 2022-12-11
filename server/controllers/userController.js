import User from '../models/user.js';


export const getUsers = async (request, response) => {
    try {
        const allUsers = await User.find();
        response.status(200).json(allUsers);
    } catch (error) {
        response.status(404).json({
            message: error.message,
        })
    }
}


export const createUser = (request, response) => {
    const user = new User({
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    })
    try {
        user.save();
    } catch (error) {
        response.status(404).json({
            message: error.message,
        })
    }
    response.status(201).json("Created successfully!");
}
