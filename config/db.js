const mongoose = require('mongoose');
const user = require('../models/user');
const uri = "mongodb+srv://tugberk:nodejs@where-to-go.xcxe9iz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri,
    {
        useNewUrlParser:true,
        dbName: 'wheretogo'
    },
    (err) => {
    if (err) throw err;
    console.log('Connected to Mongo DB Successfully!!');
    
});