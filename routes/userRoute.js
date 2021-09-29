const {User} = require('../models/userModel');
const auth = require('../middleware/auth'); 
const mongoose = require('mongoose');
const express = require('express');
const createError = require('http-errors'); 
const router = express.Router();
const bcrypt = require('bcrypt'); 
const _ = require('lodash'); 
const jwt = require('jsonwebtoken'); 
const config = require('config'); 

//ENDPOINT/api/users 200
router.get('/:id', auth, async (req, res) => {
  //AUTHENICATE USER
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).send('BAD REQUEST');  
  res.send(user);
});

router.post('/', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.emailAddress });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    });
    //hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);    
    user = await user.save();

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey')); 
    res.header('auth-token', token).location(`/`).send(_.pick(user['_id', 'name', 'email']));
  }catch (err) {
    next(createError(400, `there was a problem with ${err}`));
  }

});

module.exports = router; 