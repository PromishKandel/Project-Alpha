const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const faceDataRoutes = require('./routes/faceDataRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api', faceDataRoutes); // Use the face data routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
