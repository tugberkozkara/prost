import express from "express";
import bodyParser from "body-parser";
import PlaceController from "../controllers/placeController.js";
import PlaceHandler from "../handlers/placeHandler.js";
import AuthHandler from "../handlers/authHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", PlaceController.getAllPlaces);
router.post("/", jsonParser, AuthHandler.checkAuth, PlaceController.createPlace);
router.get("/:id", PlaceHandler.getPlaceHandler, PlaceController.getPlaceById);
// router.put('/:id', PlaceHandler.getPlaceHandler, PlaceController.editPlace);
router.delete("/:id", AuthHandler.checkAuth, PlaceHandler.getPlaceHandler, PlaceController.deletePlaceById);

export default router;
