import express from "express";
import bodyParser from "body-parser";
import PlaceController from "../controllers/placeController.js";
import IDHandler from "../handlers/idHandler.js";
import AuthHandler from "../handlers/authHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", PlaceController.getAllPlaces);
router.post("/", jsonParser, AuthHandler.checkAuth, PlaceController.createPlace);

router.get("/:id", IDHandler.getIdHandler, PlaceController.getPlaceById);
router.delete("/:id", AuthHandler.checkAuth, IDHandler.getIdHandler, PlaceController.deletePlaceById);


export default router;
