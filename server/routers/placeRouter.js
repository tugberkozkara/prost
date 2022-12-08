import express from 'express';
import bodyParser from 'body-parser';
import { getPlaces, createPlace } from '../controllers/placeController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', getPlaces);

router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    if(!req.body._id){
        createPlace(req, res);
    }
})

export default router;