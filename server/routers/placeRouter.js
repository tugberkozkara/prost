import express from 'express';
import bodyParser from 'body-parser';
import PlaceController from '../controllers/placeController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', PlaceController.getPlaces);

router.post('/', jsonParser, PlaceController.createPlace);

export default router;
