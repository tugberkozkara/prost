const mongoose = require('mongoose');

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
     location: {
          type: String,
          required: true
     },
     price: {
          type: String,
          required: true
     },
     menu: {
          type: String,
          required: false
     },
     tags : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tag',
        required: false
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('Place', placeSchema);