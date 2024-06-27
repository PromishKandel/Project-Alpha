const express = require('express');
const router = express.Router();
const FaceData = require('../models/FaceData');

// Route to add new face data
router.post('/addFaceData', async (req, res) => {
  const { name, imageData } = req.body;
  try {
    // Create a new face data instance
    const newFaceData = new FaceData({ name, imageData });
    // Save the face data to the database
    await newFaceData.save();
    res.status(201).json(newFaceData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add face data' });
  }
});

// Route to get all face data
router.get('/faceData', async (req, res) => {
  try {
    const faceData = await FaceData.find();
    res.json(faceData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch face data' });
  }
});

// Export the router
module.exports = router;
