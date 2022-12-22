import express from 'express';
import bodyParser from 'body-parser';
import TagController from '../controllers/tagController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', TagController.getAllTags);
router.post('/', jsonParser, TagController.createTag);

export default router;
