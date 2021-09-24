const mongoose = require('mongoose');
const express = require('express');
const config = require('config'); 
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

//https://joi.dev/api/?v=17.4.2

/*
in app.js add the code: 


//IN THE TERMINAL TYPE IN: 
// export courseapi_jwtPrivateKey=mySecureKey

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);//0 is success, any other are failures; YOU WANT TO EXIT IF THERE'S ERRORS
}
*/ 

//look at auth.js route
//GENERATE A TOKEN: users post
//GENERATING A TOKEN PLACE CODE IN USERS post ROUTE?
//const token = jwt.sign({_id: req.body._id, config.get('jwtPrivateKey')}); 
//res.send(token)

//SEND A HEADER: users post
//res.header('x-auth-token', token).send(_.pick(user['_id', 'name', 'email']));
//postman look at header to get token

//2: AUTHORIZATION MIDDLEWARE
//genres.js 
//const token = req.header('x-auth-token'); //name of the header is x-auth-token; it should contain jsonwebtoken
//next validate it: res.status(401);
//middleware module auth.js: 
/*
const jwt = require('jsonwebtoken');
const config = require('config'); 
function (req, res, next){
  const token = req.header('x-auth-token'); //name of the header is x-auth-token; it should contain jsonwebtoken
//next validate it: 
if(!token) return res.status(401).send('Access denied. No token provided'); 

try {
  //if there's a token verify it; if valid it'll return a decoded payload
const decoded = jwt.verify(token, jwt.config('jwtPrivateKey));
req.user = decoded; //payload put in the request
next(); 
}catch (err){
  res.status(400).send('invalid token'); 
}
}
*/ 

//PROTECTING ROUTES
//IN THE POST EX PUT THE NAME OF THE HEADER (E.G. x-auth-token) IN THE KEY
//NEXT PUT THE TOKEN IN THE VALUE
/*
  PUT AUTH MIDDLEWARE FOR THE FOLLOWING ROUTES:
  GET /api/users
  POST /api/courses
  PUT /api/courses/:id
  DELETE /api/courses/:id
*/ 
