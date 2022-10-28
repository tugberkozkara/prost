const express = require('express');
var bodyParser = require('body-parser');

const User = require('../models/user');

var router = express.Router();
var jsonParser = bodyParser.json();


router.get('/', async(req, res) => {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
});

router.post('/create', jsonParser, (req, res) => {
    console.log(req.body);
    if(!req.body._id){
        createUser(req, res);
    }
    // Update can be added here later
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

module.exports = router;