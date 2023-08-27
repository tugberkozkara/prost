const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

class AuthService {

    static login = async (username, password) => {
        const user = await AuthService.getUserByUsername(username);
        if(user === null){
            return null;
        }
        const isPasswordCorrect = bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return null;
        }
        const lastLoginDate = Date.now();
        try {
            await user.updateOne({lastLoginDate: lastLoginDate});
        } catch (error) {
            console.log(error.message);
        }
        const token = AuthService.createToken(user.username, user.password);
        return token;
    };

    static register = async (email, username, password) => {
        const isUserExists = await User.exists({email: email});
        if(isUserExists){
            return null;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const lastLoginDate = Date.now();
        const user = new User({
            email: email,
            username: username,
            password: hashedPassword,
            lastLoginDate: lastLoginDate
        });

        try {
            await user.save();
            return user;
        } catch (error) {
            return null;
        }
    };

    static getAllUsers = async () => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            return null;
        }
    };

    static getUserByUsername = async (username) => {
        try {
            const user = await User.findOne({username: username});
            return user;
        } catch (error) {
            return null;
        }
    };

    static createToken = (username, password) => {
        const token = jwt.sign({
            username: username,
            password: password
        },
        process.env.SECRET_KEY, {
            expiresIn :"2h"
        });
        return token;
    };
}

module.exports = AuthService;
