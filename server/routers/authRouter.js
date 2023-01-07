import express from "express";
import bodyParser from "body-parser";
import AuthController from "../controllers/authController.js";
import AuthHandler from "../handlers/authHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", AuthHandler.checkAuth, AuthController.getAllUsers);
router.post("/register", jsonParser, AuthController.createUser);
router.post("/login", jsonParser, AuthController.loginUser);

export default router;
