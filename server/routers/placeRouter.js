import express from 'express';
import bodyParser from 'body-parser';
import PlaceController from '../controllers/placeController.js'
import PlaceHandler from '../handlers/placeHandler.js';

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', PlaceController.getAllPlaces);
router.post('/', jsonParser, PlaceController.createPlace);
router.get('/:placeId', PlaceHandler.getPlaceHandler, PlaceController.getPlaceById);
// router.put('/:placeId', PlaceHandler.getPlaceHandler, PlaceController.editPlace);
// router.delete('/:placeId', PlaceHandler.getPlaceHandler, PlaceController.deletePlace);

export default router;
