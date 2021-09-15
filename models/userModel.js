const mongoose = require('mongoose'); 
const Joi = require('Joi'); 

const userSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 50
  },
  lastName: {
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 50
  }, 
  emailAddress: {
    type: String, 
    required: true, 
    minlength: 5, 
    maxlength: 100
  }, 
  password: {
    type: String, 
    required: true, 
    minlength: 8, 
    maxlength: 50
  },  
}); 

const User = mongoose.model('user', userSchema); 

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(8).max(50).required()
  };

  return Joi.validate(user, schema);
}

exports.validate = validateUser; 
exports.User = User;
exports.userSchema = userSchema;