import express from 'express';
import bodyParser from 'body-parser';
import UserController from '../controllers/userController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', UserController.getUsers);

router.post('/', jsonParser, UserController.createUser);

export default router;
