const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  petName: { type: String, required: true },
  petType: { type: String, required: true }, // e.g., Dog, Cat, Bird
  breed: { type: String },
  age: { type: Number },
  weight: { type: Number },
  medicalNotes: { type: String },
  image: { type: String } // URL from Cloudinary
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);