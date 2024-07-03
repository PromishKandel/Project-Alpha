const express = require('express');
const router = express.Router();
const FaceData = require('../models/FaceData');
const faceapi = require('face-api.js');

// Load models from the file system (adjust path as needed)
const MODEL_URL = '/models';
faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);

router.post('/compareFace', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const image = await canvas.loadImage(imageUrl);
    const results = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
    
    if (!results.length) {
      return res.status(400).json({ error: 'No faces detected' });
    }

    const faceData = await FaceData.find({});
    const labeledDescriptors = faceData.map(fd => new faceapi.LabeledFaceDescriptors(fd.name, [new Float32Array(fd.faceDescriptor)]));

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    const bestMatch = faceMatcher.findBestMatch(results[0].descriptor);

    if (bestMatch.label === 'unknown') {
      return res.json({ name: 'Unknown', lastLocation: 'Unknown' });
    }

    const matchedFace = faceData.find(fd => fd.name === bestMatch.label);
    res.json({ name: matchedFace.name, lastLocation: matchedFace.lastLocation });
  } catch (error) {
    console.error('Error comparing face:', error);
    res.status(500).json({ error: 'Failed to compare face' });
  }
});

module.exports = router;
