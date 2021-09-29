const config = require('config'); 
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken'); 
const app = express();
const users = require('./routes/userRoute'); 
const courses = require('./routes/courseRoute'); 

mongoose.connect('mongodb://localhost:27017/fsjstd-restapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());  
app.use('/api/users', users); 
app.use('/api/courses', courses); 

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));