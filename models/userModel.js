//const Joi = require('Joi'); 
const createError = require('http-errors'); 
const mongoose = require('mongoose'); 

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
  },  
}); 

const User = mongoose.model('user', userSchema); 

exports.User = User;
exports.userSchema = userSchema;