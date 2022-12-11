import express from 'express';
import bodyParser from 'body-parser';
import { getPlaces, createPlace } from '../controllers/placeController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', getPlaces);

router.post('/', jsonParser, (request, result) => {
    console.log(request.body);
    if(!request.body._id){
        createPlace(request, result);
    }
})

export default router;