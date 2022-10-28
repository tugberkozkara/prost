const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
     name: {
          type: String,
          unique: true,
          required: true
     }
})


module.exports = mongoose.model('Tag', tagSchema);