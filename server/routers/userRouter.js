import express from 'express';
import bodyParser from 'body-parser';
import { getUsers, createUser } from '../controllers/userController.js'

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', getUsers);

router.post('/', jsonParser, (request, result) => {
    console.log(request.body);
    if(!request.body._id){
        createUser(request, result);
    }
})

export default router;