const express = require("express");
const bodyParser = require("body-parser");
const TagController = require("../controllers/tagController");
const AuthHandler = require("../handlers/authHandler");
const IDHandler = require("../handlers/idHandler");

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", TagController.getAllTags);
router.post("/", jsonParser, AuthHandler.checkAuth, TagController.createTag);
router.delete("/:id", AuthHandler.checkAuth, IDHandler.getIdHandler,TagController.deleteTagById);

module.exports = router;
