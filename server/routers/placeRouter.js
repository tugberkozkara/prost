const express = require("express");
const bodyParser = require("body-parser");
const PlaceController = require("../controllers/placeController");
const IDHandler = require("../handlers/idHandler");
const AuthHandler = require("../handlers/authHandler");

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", PlaceController.getAllPlaces);
router.post("/", jsonParser, AuthHandler.checkAuth, PlaceController.createPlace);

router.get("/:id", IDHandler.getIdHandler, PlaceController.getPlaceById);
router.delete("/:id", AuthHandler.checkAuth, IDHandler.getIdHandler, PlaceController.deletePlaceById);

module.exports = router;
