import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
     name: {
          type: String,
          unique: true,
          required: true
     }
});


const Location = mongoose.model("Location", locationSchema);
export default Location;
