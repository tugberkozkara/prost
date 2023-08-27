const express = require("express");
const bodyParser = require("body-parser");
const LocationController = require("../controllers/locationController");
const AuthHandler = require("../handlers/authHandler");
const IDHandler = require("../handlers/idHandler");

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", LocationController.getAllLocations);
router.post("/", jsonParser, AuthHandler.checkAuth, LocationController.createLocation);
router.delete("/:id", AuthHandler.checkAuth, IDHandler.getIdHandler, LocationController.deleteLocationById);

module.exports = router;
