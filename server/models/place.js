const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
     name: { 
          type: String,
          unique: true,
          required: true
     },
     category: {
          type: String,
          required: true
     },
     location: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Location",
          required: true
     }],
     price: {
          type: String,
          required: true
     },
     menu: {
          type: String,
          required: false
     },
     image:{
          data: Buffer,
          contentType: String
     },
     tags : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tag",
        required: false
     }],
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"User",
    }
},{
    timestamps: true
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
