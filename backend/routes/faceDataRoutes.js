const express = require('express');
const router = express.Router();
const FaceData = require('../models/FaceData');
const compareRoutes = require('./compareRoutes'); // Add this line

router.use('/compare', compareRoutes); // Mount the compare routes

router.post('/addFaceData', async (req, res) => {
  const { name, imageData, lastLocation, faceDescriptor } = req.body;
  try {
    console.log('Received data:', { name, imageData, lastLocation, faceDescriptor });
    const newFaceData = new FaceData({ name, imageData, lastLocation, faceDescriptor });
    await newFaceData.save();
    console.log('Saved data:', newFaceData);
    res.status(201).json(newFaceData);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to add face data' });
  }
});

// Route to get all face data
router.get('/getFaceData', async (req, res) => {
  try {
    const faceData = await FaceData.find();
    res.json(faceData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch face data' });
  }
});

module.exports = router;
