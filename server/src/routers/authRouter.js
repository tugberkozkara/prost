const express = require("express");
const bodyParser = require("body-parser");
const AuthController = require("../controllers/authController");
const AuthHandler = require("../handlers/authHandler");

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/users", AuthHandler.checkAuth, AuthController.getAllUsers);
router.post("/register", jsonParser, AuthController.createUser);
router.post("/login", jsonParser, AuthController.loginUser);

module.exports = router;
