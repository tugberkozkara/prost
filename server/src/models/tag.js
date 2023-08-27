const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
     name: {
          type: String,
          unique: true,
          required: true
     }
});


const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
