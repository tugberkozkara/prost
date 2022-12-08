import express from 'express';
import bodyParser from 'body-parser';
import { getUsers, createUser } from '../controllers/userController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', getUsers);

router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    if(!req.body._id){
        createUser(req, res);
    }
})

export default router;