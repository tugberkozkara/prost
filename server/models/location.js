const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
     name: {
          type: String,
          unique: true,
          required: true
     }
});


const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
