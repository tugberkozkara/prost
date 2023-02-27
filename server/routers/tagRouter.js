import express from "express";
import bodyParser from "body-parser";
import TagController from "../controllers/tagController.js";
import IDHandler from "../handlers/idHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", TagController.getAllTags);
router.post("/", jsonParser, TagController.createTag);
router.delete("/:id", IDHandler.getIdHandler,TagController.deleteTagById);

export default router;
