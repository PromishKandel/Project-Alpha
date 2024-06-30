const mongoose = require('mongoose');

// Define the Face Data schema
const FaceDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageData: {
    type: String, // Assuming you are storing image data as a Base64 string
    required: true
  },
  lastlocation:{
    type:String,
    required: true
  },
});

// Create the Face Data model from the schema
const FaceData = mongoose.model('FaceData', FaceDataSchema);

// Export the Face Data model
module.exports = FaceData;
