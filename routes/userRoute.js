const {User, validate} = require('../models/userModel'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt'); 

//ENDPOINT/api/users 200
router.get('/:id', async (req, res) => {
  //VALIDATION
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  //AUTHENICATE USER
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).send('Wrong email or password');  
  //use bcrypt for authentication
  const validPassword = await bcrypt.compare(req.params.id, user.password); 
  if (!validPassword) return res.status(400).send('Wrong email or password');  

  res.send(user); 
});


router.post('/', async (req, res, next) => {
  //VALIDATION
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  let user = new User(req.body);
  user = await user.save().catch(next);
  res.location('/');  
  //PASSWORD SECURITY
  //const salt = await bcrypt.genSalt(10);
  //user.password = await bcrypt.hash(user.password, salt); 
  next();
});



module.exports = router; 