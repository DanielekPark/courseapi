const mongoose = require('mongoose');
const express = require('express');
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//3 returns the currently authenicated user

//Joi validation
//https://joi.dev/api/?v=17.4.2