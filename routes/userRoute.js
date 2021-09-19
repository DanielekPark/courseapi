const {User, validate} = require('../models/userModel'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt'); 

router.get('/', async (req, res) => {
  //AUTHENICATE USER
  const user = await User.find(); 
  res.send(user);
});

//ENDPOINT/api/users 200
router.get('/:id', async (req, res) => {
  //AUTHENICATE USER
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).send('NOT FOUND');  
  //used bcrypt for authentication
  // const validPassword = await bcrypt.compare(req.params.id, user.password); 
  // if (!validPassword) return res.status(400).send('Wrong email or password');  
  res.send(user);
});


router.post('/', async (req, res, next) => {
  //VALIDATION
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  //CHECKS IF USER EXISTS IN DB
  let user = await User.findOne({ email: req.body.emailAddress });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    password: req.body.password
  });

  user = await user.save();
  res.location('/');  
  //PASSWORD SECURITY
  //const salt = await bcrypt.genSalt(10);
  //user.password = await bcrypt.hash(user.password, salt); 
  //GENERATED TOKEN    
  //const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
  //res.header('x-auth-token', token);
  next();
});



module.exports = router; 