import mongoose from 'mongoose';

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
     image:{
          data: Buffer,
          contentType: String
     },
     tags : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tag',
        required: false
     }],
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref:'User',
    }
},{
    timestamps: true
})

const Place = mongoose.model('Place', placeSchema);
export default Place;