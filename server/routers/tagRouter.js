import express from "express";
import bodyParser from "body-parser";
import TagController from "../controllers/tagController.js";
import TagHandler from "../handlers/tagHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", TagController.getAllTags);
router.post("/", jsonParser, TagController.createTag);
router.delete("/:id", TagHandler.getTagHandler,TagController.deleteTagById);

export default router;
