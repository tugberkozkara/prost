import express from "express";
import bodyParser from "body-parser";
import TagController from "../controllers/tagController.js";
import AuthHandler from "../handlers/authHandler.js";
import IDHandler from "../handlers/idHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", TagController.getAllTags);
router.post("/", jsonParser, AuthHandler.checkAuth, TagController.createTag);
router.delete("/:id", AuthHandler.checkAuth, IDHandler.getIdHandler,TagController.deleteTagById);

export default router;
