const express = require('express');
var bodyParser = require('body-parser');

const Place = require('../models/place');
const { Model } = require('mongoose');

var router = express.Router();
var jsonParser = bodyParser.json();


router.get('/', async(req, res) => {
    const allPlaces = await Place.find();
    res.status(200).json(allPlaces);
});

router.post('/create', jsonParser, (req, res) => {
    console.log(req.body);
    if(!req.body._id){
        createPlace(req, res);
    }
    updatePlace(req, res);
    // Update is not working!
})


function createPlace(req, res){
    const place = new Place({
        _id: req.body._id,
        name: req.body.name,
        category: req.body.category,
        location: req.body.location,
        price: req.body.price,
        menu: req.body.menu,
        tags: req.body.tags
    })
    place.save((err, doc) => {
        if(err) res.status(400);
        res.status(201).json("Created successfully!");
    });
}

//TO:DO - Solve Here
function updatePlace(req, res){
    filter = {
        _id : req.body._id
    }
    update = {
        name: req.body.name,
        category: req.body.category,
        location: req.body.location,
        price: req.body.price,
        menu: req.body.menu
    }
    Place.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
      });
    res.status(200).json("Updated successfully!");
}



module.exports = router;