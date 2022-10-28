const mongoose = require('mongoose');
const user = require('../models/user');
require('dotenv').config();
const uri = process.env.MONGO_CONNECT;

mongoose.connect(uri,
    {
        useNewUrlParser:true,
        dbName: 'wheretogo'
    },
    (err) => {
    if (err) throw err;
    console.log('Connected to Mongo DB Successfully!!');
    
});