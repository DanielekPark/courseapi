const {User, validate} = require('../models/userModel'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt'); 

//ENDPOINT/api/users 200
router.get('/:id', async (req, res) => {
  //AUTHENICATE USER
  const user = await User.findById(req.params.id);

  if (!user) return res.status(400).send('Invalid email or password.');  
  res.send(user); 
  /*
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  // res.send(user);
  */
});

router.post('/', async (req, res, next) => {
  //VALIDATION
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  //PASSWORD SECURITY; HASH PASSWORD

  let user = new User(req.body);
  
  user = await user.save().catch(next);
  res.location('/');
  res.send(user); 
  next();

});

module.exports = router; 