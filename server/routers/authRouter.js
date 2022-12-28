import express from 'express';
import bodyParser from 'body-parser';
import AuthController from '../controllers/authController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', AuthController.getAllUsers);
router.post('/register', jsonParser, AuthController.createUser);
router.post('/login', jsonParser, AuthController.loginUser);

export default router;
