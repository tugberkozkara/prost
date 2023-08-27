const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGO_CONNECT;

async function connect() {
    await mongoose.connect(uri, {useNewUrlParser:true, dbName: "wheretogo"}, (err) => {
        if (err) throw err;
        console.log("Connected to Mongo DB Successfully!!");
    });
}

module.exports.connect = connect;
