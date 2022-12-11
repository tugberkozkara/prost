import User from '../models/user.js';


export const getUsers = async (request, result) => {
    try {
        const allUsers = await User.find();
        result.status(200).json(allUsers);
    } catch (error) {
        result.status(404).json({
            message: error.message,
        })
    }
}


export const createUser = (request, result) => {
    const user = new User({
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    })
    user.save((err, doc) => {
        if(err){
            result.status(404).json({
                message: error.message,
            })
        }
        result.status(201).json("Created successfully!");
    });
}
