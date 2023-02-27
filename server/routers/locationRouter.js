import express from "express";
import bodyParser from "body-parser";
import LocationController from "../controllers/locationController.js";
import AuthHandler from "../handlers/authHandler.js";
import IDHandler from "../handlers/idHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", LocationController.getAllLocations);
router.post("/", jsonParser, AuthHandler.checkAuth, LocationController.createLocation);
router.delete("/:id", AuthHandler.checkAuth, IDHandler.getIdHandler, LocationController.deleteLocationById);

export default router;
