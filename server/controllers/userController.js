import User from '../models/user.js';


export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}


export const createUser = (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    user.save((err, doc) => {
        if(err){
            res.status(400);
        }
        res.status(201).json("Created successfully!");
    });
}
