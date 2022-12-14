import express from 'express';
import bodyParser from 'body-parser';
import UserController from '../controllers/userController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', UserController.getAllUsers);
router.post('/register', jsonParser, UserController.createUser);
router.post('/login', jsonParser, UserController.loginUser);

export default router;
