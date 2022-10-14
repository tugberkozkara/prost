const express = require('express');
var bodyParser = require('body-parser');

const User = require('../models/user');
const user = require('../models/user');

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
});



router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    if(!req.body._id){
        createUser(req, res);
    } else {
        updateUser(req, res);
    }
})


function createUser(req, res){
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    user.save((err, doc) => {
        if(err) res.status(400);
        res.status(201).json("Created successfully!");
    });
}

// TO:DO - Solve HERE!

function updateUser(req, res){
    filter = {
        _id: req.body._id
    };
    update = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    user.findOneAndUpdate(filter, update);
    res.status(200).json("Updated successfully!");
}

module.exports = router;