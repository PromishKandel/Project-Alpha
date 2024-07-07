const express = require('express');
const router = express.Router();
const LoginData = require('../models/Login');

router.post('/addLogin', async (req, res) => {
    const { username, password } = req.body;
    try {
      console.log('Received data:', {username, password});
      const Login = new LoginData({username, password});
      await Login.save();
      console.log('Saved New Agent Login:', Login );
      res.status(201).json(Login);
    } catch (error) {
      console.error('Error saving new agent login:', error);
      res.status(500).json({ error: 'Failed to add login' });
    }
  });

  router.post('/getLogin', async (req, res) => {
    const { username, password } = req.body;
    try {
      const login = await LoginData.findOne({ username, password });
      if (login) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error validating login:', error);
      res.status(500).json({ error: 'Failed to validate login' });
    }
  });
  
  module.exports = router;